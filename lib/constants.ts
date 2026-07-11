import {z} from "zod";

export const AIAnswerSchema = z.object({
    answer: z.string(), 
    keyPoints: z.array(z.string()),
    assumptions: z.array(z.string()),
    limitations: z.array(z.string()),
    confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
})