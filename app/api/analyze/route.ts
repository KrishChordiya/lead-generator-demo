import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const AnalysisSchema = z.object({
  industry: z.string().min(1),
  valueProposition: z.string().min(1),
  techStack: z.array(z.string()),
  likelyPainPoints: z.array(z.string()),
  matchRelevance: z.number().min(0).max(1),
  conversionStrategy: z.string().min(1),
  confidence: z.number().min(0).max(1),
});

export async function POST(req: NextRequest) {
  try {
    const { sourceContext, targetContext } = await req.json();

    if (!sourceContext || !targetContext) {
      return NextResponse.json(
        { success: false, error: "Both sourceContext and targetContext are required." },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
    });

    const systemPrompt = `
### 1. TASK CONTEXT
You are a World-Class Lead Qualification & GTM Strategist. Your goal is to analyze a Target Lead's digital footprint and determine exactly how a Source Company's value proposition intersects with the Target's current business needs. You are the "Matchmaker" between a solution and a problem.

### 2. TONE CONTEXT
Your analysis must be objective, analytical, and high-signal. Avoid fluff or generic marketing speak. Focus on "Economic Value" and "Operational Efficiency."

### 3. DETAILED TASK DESCRIPTION & RULES
- Analyze the Source context to understand their "Hammer" (what they solve).
- Analyze the Target context to find the "Nails" (their problems/gaps).
- Extract specific technologies mentioned or implied.
- Identify at least 3 high-probability pain points based on industry trends and company size.
- Define a "Conversion Strategy" that explains the specific angle a salesperson should take.

STRICT RULES:
- If data is sparse, use industry benchmarks to make educated assumptions.
- Do not use "unknown" or "N/A" for strings; provide your best strategic assessment.
- matchRelevance must be a decimal between 0 and 1 representing the synergy.

### 4. THINKING STEP-BY-STEP
1. **Source Audit**: What is the core value proposition of the source company?
2. **Target Mapping**: What industry is the target in, and what is their likely scale?
3. **Pain Point Synthesis**: Given the target's tech and industry, what are they likely struggling with that the source solves?
4. **Strategy Formulation**: How should the source approach this lead to get a meeting?

### 5. OUTPUT FORMAT
You must return ONLY valid JSON matching this schema:
{
  "industry": "Precise industry name",
  "valueProposition": "1-sentence core value of the Target lead",
  "techStack": ["Technology 1", "Technology 2"],
  "likelyPainPoints": ["Pain Point 1", "Pain Point 2"],
  "matchRelevance": 0.85,
  "conversionStrategy": "Detailed approach for the outreach",
  "confidence": 0.9
}`;

    const userMessage = `
SOURCE COMPANY DATA:
${sourceContext}

TARGET LEAD DATA (TRANSCRIPT/WEBSITE):
${targetContext.slice(0, 15000)}
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

    const jsonData = JSON.parse(rawResponse);
    const parsedData = AnalysisSchema.parse(jsonData);

    return NextResponse.json({
      success: true,
      data: parsedData,
    });

  } catch (error: any) {
    console.error("Analysis API Error:", error);
    const errorMessage = error instanceof z.ZodError 
      ? `Validation Error: ${JSON.stringify(error.issues)}` 
      : (error.message || "Analysis failed");
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
