import { ModelResponse } from "@/types/global.types";
import Groq from "groq-sdk";
import { AIAnswerSchema, PROVIDERS } from "@/lib/constants";
import { AIProvider } from "./provider";
import { ZodType } from "zod";
export class GroqProvider<T> extends AIProvider {
  private readonly client: Groq;

  constructor(providerName: PROVIDERS, modelName: string) {
    super(providerName, modelName);
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  setSchema(schema: Object) {
    this.responseSchema = {
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "AIAnswerSchema",
          strict: true,
          schema: schema,
        },
      },
    };
  }

  async generate<T>(prompt: string): Promise<ModelResponse<T>> {
    const start = performance.now();
    const response = await this.client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: this.systemPrompt ?? "",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      ...this.responseSchema,
    });

    const duration = performance.now() - start;
    const result = AIAnswerSchema.parse(
      JSON.parse(response.choices[0].message.content || "{}"),
    );

    return {
      provider: this.providerName,
      model: this.modelName,
      response: result as T,
      duration,
    };
  }
}

const EXTRA_RULE = `
Your response must satisfy the provided JSON schema.

Rules:
- Every required field must be present.
- Never omit a field.
- If a field has no applicable value, return an empty array.
- Always provide a confidence value.
- Return only valid JSON.
`;
