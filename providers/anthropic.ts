import { PROVIDERS } from "@/lib/constants";
import { ModelResponse } from "@/types/global.types";
import Anthropic from "@anthropic-ai/sdk";
import { AIProvider } from "./provider";
import { ZodType } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.js";

export class AnthropicProvider<T> extends AIProvider {
  private readonly client: Anthropic;

  constructor(providerName: PROVIDERS, modelName: string) {
    super(providerName, modelName);
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  setSchema(schema: ZodType) {
    this.responseSchema = {
      output_config: {
            format: zodOutputFormat(schema),
          },
    }
  }

  async generate<T>(prompt: string): Promise<ModelResponse<T> | null> {
    const start = performance.now();
    const response = await this.client.messages.parse({
      model: this.modelName,
      max_tokens: 2048,
      system: this.systemPrompt ?? "",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      ...this.responseSchema,
    });

    const duration = performance.now() - start;
    if (response.parsed_output === null) return null;

    return {
      provider: this.providerName,
      model: this.modelName,
      response: response.parsed_output,
      duration,
    };
  }
}