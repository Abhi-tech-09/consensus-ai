import { AIProvider, ModelResponse } from "@/types/global.types";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { AIAnswerSchema } from "@/lib/constants";
export class GroqProvider implements AIProvider {
  private readonly modelName: string;
  private readonly client: Groq;

  constructor(modelName: string) {
    this.modelName = modelName;
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async generate(prompt: string): Promise<ModelResponse | null> {
    const start = performance.now();
    const response = await this.client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT + " " + EXTRA_RULE,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "AIAnswerSchema",
          strict: true,
          schema: AIAnswerSchemaGroq,
        },
      },
    });

    const duration = performance.now() - start;
    const result = AIAnswerSchema.parse(
      JSON.parse(response.choices[0].message.content || "{}"),
    );

    return {
      provider: "Groq",
      model: this.modelName,
      response: result,
      duration,
    };
  }
}

const AIAnswerSchemaGroq = {
  type: "object",
  properties: {
    answer: {
      type: "string",
    },
    keyPoints: {
      type: "array",
      items: {
        type: "string",
      },
    },
    assumptions: {
      type: "array",
      items: {
        type: "string",
      },
    },
    limitations: {
      type: "array",
      items: {
        type: "string",
      },
    },
    confidence: {
      type: "string",
      enum: ["HIGH", "MEDIUM", "LOW"],
    },
  },
  required: ["answer", "keyPoints", "assumptions", "limitations", "confidence"],
  additionalProperties: false,
} as const;

const EXTRA_RULE = `
Your response must satisfy the provided JSON schema.

Rules:
- Every required field must be present.
- Never omit a field.
- If a field has no applicable value, return an empty array.
- Always provide a confidence value.
- Return only valid JSON.
`;
