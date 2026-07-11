import { AIAnswerSchema } from "@/lib/constants";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { AIProvider, ModelResponse } from "@/types/global.types";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod.js";
import {z} from "zod";

export class OpenAIProvider implements AIProvider {
    private readonly modelName: string; 
    private readonly client: OpenAI; 
    
    constructor(modelName: string) {
        this.client  = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.modelName = modelName; 
    }

    async generate(prompt: string): Promise<ModelResponse | null> {
        const start = performance.now(); 
        const response = await this.client.responses.create({
            model: this.modelName,
            input: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            text: {
                format: zodTextFormat(AIAnswerSchema, "AIAnswer")
            }
        }); 
        // console.log("Your ai response", response.output_text)
        const duration = performance.now() - start; 
        const parsedResponse = AIAnswerSchema.parse(JSON.parse(response.output_text)) 

        return {
            provider: 'OpenAI',
            model: this.modelName, 
            response: parsedResponse,
            duration: duration
        };
    }
}