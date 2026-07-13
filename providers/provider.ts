import { PROVIDERS } from "@/lib/constants";
import { ModelResponse, ModelStatus } from "@/types/global.types";
import { ZodType } from "zod";

export abstract class AIProvider {
  protected readonly providerName: PROVIDERS;
  protected readonly modelName: string;
  protected systemPrompt: string | null = null;
  protected responseSchema: Object = {};
  modelStatus: ModelStatus = "idle";

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

  abstract setSchema(schema: Object | ZodType): void;

  abstract generate<T>(prompt: string): Promise<ModelResponse<T> | null>;

  async getResponse<T>(prompt: string) {
    try {
      this.modelStatus = "loading";
      console.log(this.modelName, " is loading the response");
      const res = await this.generate<T>(prompt);
      this.modelStatus = "done";
      console.log(this.modelName, " is done in ", res?.duration);
      return res;
    } catch (error: any) {
      this.modelStatus = "error";
      console.log(this.modelName, " failed while processing the prompt with error", ('message' in error ? error.message :''));
      throw new Error("Failed while invoking " + this.modelName + " " + error);
    }
  }
}
