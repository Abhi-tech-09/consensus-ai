import { PROVIDERS } from "@/lib/constants";
import { ModelResponse } from "@/types/global.types";
import { ZodType } from "zod";

export abstract class AIProvider {
  protected readonly providerName: PROVIDERS; 
  protected readonly modelName: string;
  protected systemPrompt: string | null = null;
  protected responseSchema: Object= {};

  constructor(providerName: PROVIDERS, modelName: string) {
    this.providerName = providerName; 
    this.modelName = modelName;
  }

  setSystemPrompt(systemPrompt: string): void {
    this.systemPrompt = systemPrompt;
  }

  getProviderName() {
    return this.providerName; 
  }

  getModelName() {
    return this.modelName; 
  }

  getResponseSchema() {
    return this.responseSchema; 
  }

  abstract setSchema(
    schema: Object | ZodType
  ): void; 

  abstract generate<T>(
    prompt: string
  ): Promise<ModelResponse<T> | null>


}
