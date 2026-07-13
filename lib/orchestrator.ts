import { CONSENSUS_CONFIG } from "@/config/consensus-config";
import { AIAnswer, JudgeAnswer, ModelResponse } from "@/types/global.types";
import { JUDGE_PROMPT, SYSTEM_PROMPT } from "./system-prompt";
import { AIProvider } from "@/providers/provider";
import { getJudgeSchema, getProviderSchema } from "./schema-factory";

export class Orchestrator {
    readonly providers: AIProvider[];
    readonly judgeProvider: AIProvider;

    constructor() {
        this.providers = CONSENSUS_CONFIG.providers.map(p => p.getProvider()); 
        this.judgeProvider = CONSENSUS_CONFIG.judgeProvider.getProvider();   
        
        // Set provider schema
        this.providers.forEach(provider => {
            provider.setSystemPrompt(SYSTEM_PROMPT); 
            provider.setSchema(getProviderSchema(provider.getProviderName()));
        }); 

        // Set judge schema
        this.judgeProvider.setSystemPrompt(JUDGE_PROMPT); 
        this.judgeProvider.setSchema(getJudgeSchema(this.judgeProvider.getProviderName())); 

    }

    async executeProviders(userPrompt: string): Promise<ModelResponse<AIAnswer>[]> {
        const responses =  await Promise.allSettled(
            this.providers.map(provider => provider.getResponse<AIAnswer>(userPrompt))
        );
        return responses
          .filter(
            (result): result is PromiseFulfilledResult<ModelResponse<AIAnswer>> =>
              result.status === "fulfilled",
          )
          .map((result) => result.value);
    }

    buildJudgePrompt(modelResponses: ModelResponse<AIAnswer>[], userPrompt: string): string {
        const formattedResponse = modelResponses.map((response, index) => {
            return `
            ==============================================================
                Model ${index+1}

                Provider: ${response.provider}
                Model: ${response.model}

                Response: ${JSON.stringify(response.response, null, 2)}
        `
        }).join("\n"); 

        return `
            Original Prompt: ${userPrompt}

            ${formattedResponse}
            ==============================

            Evaluate all responses according to the system instructions.

            Generate:
            - A synthesized summary.
            - An evaluation of each model.
            - Consensus points.
            - Disagreements.
            - An overall confidence score.

            Return ONLY valid JSON.
        `;
    }

    async generateResponse(userPrompt: string) {
        // main judge provider call
        const modelResponses = await this.executeProviders(userPrompt); 
        const judgePrompt = this.buildJudgePrompt(modelResponses, userPrompt);
        const judgeResponse = await this.judgeProvider.getResponse<JudgeAnswer>(judgePrompt);
        return judgeResponse; 
    }

}