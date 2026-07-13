import { Orchestrator } from "@/lib/orchestrator";
import { AnthropicProvider } from "@/providers/anthropic";
import { GeminiProvider } from "@/providers/gemini";
import { GroqProvider } from "@/providers/groq";
import { OpenAIProvider } from "@/providers/openai";
import { NextRequest, NextResponse } from "next/server";


const orchestrator = new Orchestrator(); 

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    console.log(prompt); 
    orchestrator.setUserPrompt(prompt); 
    
    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required." },
        { status: 400 },
      );
    }

    const result = await orchestrator.generateResponse(); 
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
