import { CONSENSUS_CONFIG } from "@/config/consensus-config";
import { AIAnswer, JudgeAnswer, ModelResponse } from "@/types/global.types";
import { JUDGE_PROMPT, SYSTEM_PROMPT } from "./system-prompt";
import { AIProvider } from "@/providers/provider";
import { getJudgeSchema, getProviderSchema } from "./schema-factory";

export class Orchestrator {
    private userPrompt: string = ''; 
    private readonly providers: AIProvider[];
    private readonly judgeProvider: AIProvider;

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

    setUserPrompt(userPrompt: string) {
        this.userPrompt = userPrompt; 
    }

    async executeProviders(): Promise<ModelResponse<AIAnswer>[]|null> {
        const responses =  await Promise.allSettled(
            this.providers.map(provider => provider.generate<AIAnswer>(this.userPrompt))
        );
        return responses
          .filter(
            (result): result is PromiseFulfilledResult<ModelResponse<AIAnswer>> =>
              result.status === "fulfilled",
          )
          .map((result) => result.value);
    }

    buildJudgePrompt(modelResponses: ModelResponse<AIAnswer>[]): string {
        return ""
    }

    async generateResponse(): Promise<JudgeAnswer|null> {
        // main judge provider call
        const response = await this.executeProviders(); 
        console.log(response);  
        throw new Error(); 
    }

}