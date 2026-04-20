import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const DraftSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const { analysis, sourceContext, targetUrl } = await req.json();

    if (!analysis || !sourceContext) {
      return NextResponse.json(
        { success: false, error: "Analysis data and sourceContext are required." },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
    });

    const systemPrompt = `
### 1. TASK CONTEXT
You are a Senior Outbound Sales Copywriter specializing in "High-Response" B2B Email Outreach. Your goal is to write a personalized, compelling cold email that feels like a researched 1-on-1 message, not a bulk template.

### 2. TONE CONTEXT
The tone must be professional, helpful, and empathetic. Avoid being "salesy" or pushy. Focus on being a "Value Provider" who has done their homework.

### 3. DETAILED TASK DESCRIPTION & RULES
- Create a professional COLD EMAIL (Subject Line + Body).
- STICK TO EMAIL: Do not write a LinkedIn message or a DM.
- NO PLACEHOLDERS: Absolutely no [Name], [Company], or [brackets]. Use "Hi there" or "To the ${analysis.industry} team" if needed.
- HOOK: Start with a relevant observation about their business or tech stack.
- VALUE: Pivot quickly to how the source company solves a specific pain point identified in the analysis.
- CTA: End with a low-friction "Ask" (e.g., "Open to a quick exchange?" or "Should I send more info?").

STRICT RULES:
- Length: Maximum 150 words.
- Formatting: Use clear paragraphs. No markdown bolding inside the email body.
- Output: VALID JSON ONLY.

### 4. THINKING STEP-BY-STEP
1. **The Hook**: What is the most impressive or relevant thing we know about them? (Tech stack, industry move, etc.)
2. **The Connection**: How does the source company's "Hammer" hit their specific "Nail"?
3. **The Proof**: Reference the likely pain points we've identified.
4. **The CTA**: Make it so easy to say "yes" that they can't resist.

### 5. OUTPUT FORMAT
Return ONLY valid JSON:
{
  "subject": "A short, curiosity-driven subject line",
  "body": "The full, ready-to-send email body"
}`;

    const userMessage = `
SOURCE CONTEXT (The Sender):
${sourceContext}

TARGET ANALYSIS (The Recipient):
Industry: ${analysis.industry}
Value Proposition: ${analysis.valueProposition}
Likely Pain Points: ${analysis.likelyPainPoints?.join(", ")}
Conversion Strategy: ${analysis.conversionStrategy}
Target URL: ${targetUrl || "Not provided"}
    `;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL_NAME || "openrouter/elephant-alpha",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
    });

    let rawResponse = response.choices[0].message.content || "{}";
    
    // Clean markdown blocks if present
    if (rawResponse.includes("```json")) {
      rawResponse = rawResponse.split("```json")[1].split("```")[0].trim();
    } else if (rawResponse.includes("```")) {
      rawResponse = rawResponse.split("```")[1].split("```")[0].trim();
    }

    let jsonData = JSON.parse(rawResponse);

    // Normalize nested responses
    if (jsonData.email && typeof jsonData.email === 'object') {
      jsonData = jsonData.email;
    } else if (jsonData.draft && typeof jsonData.draft === 'object') {
      jsonData = jsonData.draft;
    }

    const parsedData = DraftSchema.parse(jsonData);

    return NextResponse.json({
      success: true,
      draft: parsedData,
    });

  } catch (error: any) {
    console.error("Drafting API Error:", error);
    const errorMessage = error instanceof z.ZodError 
      ? `Validation Error: ${JSON.stringify(error.errors)}` 
      : (error.message || "Failed to generate email draft");

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
