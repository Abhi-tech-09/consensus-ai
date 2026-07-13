import { ZodType } from "zod";
import {
  AIAnswerSchema,
  AIAnswerSchemaGemini,
  AIAnswerSchemaGroq,
  JudgeAnswerSchema,
  PROVIDERS,
} from "./constants";

export const getProviderSchema = (provider: PROVIDERS): ZodType | Object => {
  switch (provider) {
    case PROVIDERS.OpenAI:
      return AIAnswerSchema;
    case PROVIDERS.Anthropic:
      return AIAnswerSchema;
    case PROVIDERS.Gemini:
      return AIAnswerSchemaGemini;
    case PROVIDERS.Groq:
      return AIAnswerSchemaGroq;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};

export const getJudgeSchema = (provider: PROVIDERS): ZodType | Object => {
  switch (provider) {
    case PROVIDERS.OpenAI:
      return JudgeAnswerSchema;
    case PROVIDERS.Anthropic:
      return JudgeAnswerSchema;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};
