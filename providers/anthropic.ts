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
    };
  }

  async generate<T>(prompt: string): Promise<ModelResponse<T> | null> {
    const start = performance.now();
    this.appendSystemPrompt(EXTRA_RULE);
    const response = await this.client.messages.parse({
      model: this.modelName,
      max_tokens: 5000,
      system: this.getSystemPrompt() ?? "",
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

const EXTRA_RULE = `
Additional Instructions:

Approach the problem creatively while remaining factually accurate.

- Present ideas in an engaging way.
- Use memorable explanations.
- Make the response enjoyable to read.
- Rephrase concepts naturally instead of sounding textbook-like.
- Never invent facts for the sake of creativity.
`;
