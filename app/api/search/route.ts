import { NextRequest, NextResponse } from "next/server";
import { tavily } from "@tavily/core";

export async function POST(req: NextRequest) {
  try {
    const { url, companyName } = await req.json();

    if (!url && !companyName) {
      return NextResponse.json(
        { success: false, error: "Either 'url' or 'companyName' is required." },
        { status: 400 }
      );
    }

    const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

    // Derive a name if only URL is provided
    const name = companyName || new URL(url).hostname.replace('www.', '').split('.')[0];
    
    // Multi-faceted query for maximum intelligence
    const searchQuery = `"${name}" company overview, core products and services, target market, and unique value proposition`;

    const response = await tvly.search(searchQuery, {
      searchDepth: "advanced",
      maxResults: 6,
      includeAnswer: true, // Get a direct AI summary from Tavily
      includeRawContent: false,
    });

    // Aggregate snippets + the direct answer for the LLM
    const snippets = response.results
      .map((r, i) => `[Source ${i + 1}]: ${r.title}\nURL: ${r.url}\nContent: ${r.content}`)
      .join("\n\n---\n\n");

    const aggregatedContext = response.answer 
      ? `AI SUMMARY: ${response.answer}\n\nDETAILED SOURCES:\n${snippets}`
      : snippets;

    return NextResponse.json({
      success: true,
      query: searchQuery,
      answer: response.answer || null,
      results: response.results.map(r => ({
        title: r.title,
        url: r.url,
        content: r.content
      })),
      context: aggregatedContext
    });

  } catch (error: any) {
    console.error("Tavily Search Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Search failed" },
      { status: 500 }
    );
  }
}
