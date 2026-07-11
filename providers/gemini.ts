import { AIAnswerSchema } from "@/lib/constants";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { AIProvider, ModelResponse } from "@/types/global.types";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.js";
import { GoogleGenAI, Type } from "@google/genai";
import { format } from "path";
import { text } from "stream/consumers";
import { zodToJsonSchema } from "zod-to-json-schema";


export class GeminiProvider implements AIProvider {
    private readonly modelName: string;
    private readonly client: GoogleGenAI;

    constructor(modelName: string) {
        this.client = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
        });
        this.modelName = modelName
    }
    
    async generate(prompt: string): Promise<ModelResponse | null> {
        const start = performance.now();
        const response = await this.client.models.generateContent({
          model: this.modelName,
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: "application/json",
            responseSchema: {
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
              required: [
                "answer",
                "keyPoints",
                "assumptions",
                "limitations",
                "confidence",
              ],
            },
          },
        });
        
        const duration = performance.now() - start; 
        console.log(response.text)
        const parsedResponse = AIAnswerSchema.parse(
            JSON.parse(response.text ?? "{}")
        ); 

        return {
            provider: 'Gemini', 
            model: this.modelName, 
            response: parsedResponse, 
            duration
        }
    }
        
}