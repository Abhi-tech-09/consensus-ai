import { getOrchestrator } from "@/lib/orchestrator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const orchestrator = getOrchestrator();
    const { prompt } = await request.json();
    const encoder = new TextEncoder();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required." },
        { status: 400 },
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const sendMessage = (res: Object) => {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                data: res,
              }),
            ),
          );
        };

        await orchestrator.executeProviders(prompt, sendMessage);
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
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
