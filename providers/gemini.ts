import { AIAnswerSchema, PROVIDERS } from "@/lib/constants";
import { ModelResponse } from "@/types/global.types";
import { GoogleGenAI, Type } from "@google/genai";
import { AIProvider } from "./provider";
import { ZodType } from "zod";

export class GeminiProvider<T> extends AIProvider {
  private readonly client: GoogleGenAI;

  constructor(providerName: PROVIDERS, modelName: string) {
    super(providerName, modelName);
    this.client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  setSchema(schema: Object) {
    this.responseSchema = {
      responseSchema: schema
    }
  }

  async generate<T>(prompt: string): Promise<ModelResponse<T>> {
    const start = performance.now();
    const response = await this.client.models.generateContent({
      model: this.modelName,
      contents: prompt,
      config: {
        systemInstruction: this.systemPrompt ?? "",
        responseMimeType: "application/json",
        ...this.responseSchema,
      },
    });

    const duration = performance.now() - start;
    console.log(response.text);
    const parsedResponse = AIAnswerSchema.parse(
      JSON.parse(response.text ?? "{}"),
    );

    return {
      provider: this.providerName,
      model: this.modelName,
      response: parsedResponse as T,
      duration,
    };
  }
}
