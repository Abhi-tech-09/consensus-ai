import { getOrchestrator } from "@/lib/orchestrator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const orchestrator = getOrchestrator();
    const { prompt, modelResponses } = await request.json();

    const judgePrompt = orchestrator.buildJudgePrompt(modelResponses, prompt);
    const judgeResponse = await orchestrator.generateResponse(judgePrompt);
    return NextResponse.json({
      data: judgeResponse,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        message: error,
      },
      { status: 500 },
    );
  }
}
