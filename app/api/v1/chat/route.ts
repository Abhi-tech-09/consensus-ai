import { AnthropicProvider } from "@/providers/anthropic";
import { OpenAIProvider } from "@/providers/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const openaiProvider = new OpenAIProvider("gpt-5-mini");
  const anthropicProvider = new AnthropicProvider("claude-sonnet-5");
  try {
    const { prompt } = await request.json();
    console.log(prompt); 

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required." },
        { status: 400 },
      );
    }

    const result = await anthropicProvider.generate(prompt); 
    return NextResponse.json({
        data: result
    },{
        status: 200
    })
  } catch (error) {
    console.log(error);
    NextResponse.json({
      message: error
    }, {status: 500})
  }
}
