import { AIAnswerSchema } from "@/lib/constants";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { AIProvider, ModelResponse } from "@/types/global.types";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.js";

export class AnthropicProvider implements AIProvider {
    private readonly modelName: string; 
    private readonly client: Anthropic; 

    constructor(modelName: string) {
        this.client = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });
        this.modelName = modelName;
    }

    async generate(prompt: string): Promise<ModelResponse | null> {
        const start = performance.now(); 
        const response = await this.client.messages.parse({
            model: this.modelName,
            max_tokens: 2048, 
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ], 
            output_config: {
                format: zodOutputFormat(AIAnswerSchema)
            }
        })

        const duration = performance.now() - start; 
        if(response.parsed_output === null) return null; 
    
        return {
            provider: "Anthropic",
            model: this.modelName, 
            response: response.parsed_output,
            duration
        }

    }
    
}