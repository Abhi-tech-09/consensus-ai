import { AIAnswerSchema, JudgeAnswerSchema, PROVIDERS } from '@/lib/constants'
import {z} from 'zod'
import {AIProvider} from '@/providers/provider'

export type AIAnswer = z.infer<typeof AIAnswerSchema>; 

export type ModelResponse<T> = {
    provider: PROVIDERS, 
    model: string, 
    response: T, 
    duration: number
}

// export type OrchestratorResponse = {
//     provider: PROVIDERS,
//     response: ModelResponse[],
//     finalResponse: JudgeAnswer,
//     duration: number
// }

export type ModelStatus = "idle" | "loading" | "done" | "error";

export type JudgeAnswer = z.infer<typeof JudgeAnswerSchema>;

export type ConsensusProviderType = {
    name: PROVIDERS,
    model: string
    getProvider:() => AIProvider
}

export type ConsensusConfigType = {
    providers: ConsensusProviderType[],
    judgeProvider: ConsensusProviderType
}