import { AIAnswerSchema } from '@/lib/constants'
import {z} from 'zod'

export type AIAnswer = z.infer<typeof AIAnswerSchema>; 

export type ModelResponse = {
    provider: string, 
    model: string, 
    response: AIAnswer, 
    duration: number
}

export interface AIProvider {
    generate(prompt: string): Promise<ModelResponse | null>
}