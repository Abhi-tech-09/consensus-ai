import { AIAnswerSchema, PROVIDERS } from "@/lib/constants";
import { ModelResponse } from "@/types/global.types";
import OpenAI from "openai";
import { AIProvider } from "./provider";
import { zodTextFormat } from "openai/helpers/zod.js";
import { ZodType } from "zod";

export class OpenAIProvider extends AIProvider {
  private readonly client: OpenAI;

  constructor(providerName: PROVIDERS, modelName: string) {
    super(providerName, modelName);
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  setSchema(schema: ZodType) {
    this.responseSchema = {
        text: {
            format: zodTextFormat(schema, "AIschema"),
        }
    }
  }

  async generate<T>(prompt: string): Promise<ModelResponse<T>> {
    const start = performance.now();

    const response = await this.client.responses.create({
      model: this.modelName,
      input: [
        {
          role: "system",
          content: this.systemPrompt ?? "",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      ...this.getResponseSchema()
    });
    // console.log("Your ai response", response.output_text)
    const duration = performance.now() - start;
    const parsedResponse = AIAnswerSchema.parse(
      JSON.parse(response.output_text),
    );

    return {
      provider: this.providerName,
      model: this.modelName,
      response: parsedResponse as T,
      duration: duration,
    };
  }
}