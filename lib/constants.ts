import { Type } from "@google/genai";
import { z } from "zod";

export const AIAnswerSchema = z.object({
  answer: z.string(),
  keyPoints: z.array(z.string()),
  assumptions: z.array(z.string()),
  limitations: z.array(z.string()),
  confidence: z.enum(["HIGH", "MEDIUM", "LOW"]),
});

export const EvaluationSchema = z.object({
  provider: z.string(),
  evaluation: z.object({
    accuracy: z.number().min(1).max(10),
    clarity: z.number().min(1).max(10),
    completeness: z.number().min(1).max(10),
  }),
  score: z.number().min(1).max(10),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  contribution: z.array(z.string()),
});

export const JudgeAnswerSchema = z.object({
  summary: z.string(),
  evaluations: z.array(EvaluationSchema),
  diagreements: z.array(z.string()),
});

export enum PROVIDERS {
  OpenAI = "OpenAI",
  Anthropic = "Anthropic",
  Gemini = "Gemini",
  Groq = "Groq"
}

export const AIAnswerSchemaGroq = {
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

export const AIAnswerSchemaGemini = {
  type: Type.OBJECT,
  properties: {
    answer: {
      type: Type.STRING,
    },
    keyPoints: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },
    assumptions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },
    limitations: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },
    confidence: {
      type: Type.STRING,
      enum: ["HIGH", "MEDIUM", "LOW"],
    },
  },
  required: ["answer", "keyPoints", "assumptions", "limitations", "confidence"],
};
