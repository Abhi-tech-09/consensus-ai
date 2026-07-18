'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { AIAnswer, ModelResponse } from '@/types/global.types'
import { Preahvihear } from 'next/font/google'
import { PrettifyContent } from './ConsensusCard'

export function AnswerCard({ providerName, modelName, modelResponse }: {
    providerName: string,
    modelName: string,
    modelResponse: ModelResponse<AIAnswer> | null
}) {
    const [copied, setCopied] = useState(false)


    const handleCopy = () => {
        if (modelResponse) {
            navigator.clipboard.writeText(modelResponse.response.answer)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <article className="stagger-item animate-slide-up group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            {/* Animated background glow on hover */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Provider</span>
                    <h3 className="text-lg font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors duration-200">{`${providerName}`}<span className="text-xs text-muted-foreground">
                        {` (${modelName})`}
                    </span></h3>
                </div>
                <button
                    onClick={handleCopy}
                    className="rounded-lg p-2 hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label="Copy answer"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <Check className="h-5 w-5 text-emerald-500 animate-scale-in" />
                    ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    )}
                </button>
            </div>

            {/* Answer Content */}
            <div className="relative flex flex-col gap-3 py-2">
                <div className="prose prose-sm max-w-none px-2  text-sm leading-relaxed text-card-foreground group-hover:text-foreground transition-colors duration-200 overflow-y-scroll max-h-72">
                    <PrettifyContent text={modelResponse?.response.answer ?? ''} />
                </div>
            </div>

            {/* Footer - Character Count and Duration */}
            {modelResponse && <div className="relative flex items-center justify-between pt-2 border-t border-border/40 group-hover:border-border/60 transition-colors">
                <span className="text-xs text-muted-foreground font-mono group-hover:text-primary/70 transition-colors duration-200">
                    {(modelResponse.duration / 1000).toFixed(2)}s
                </span>
                <span className="text-xs text-muted-foreground font-mono group-hover:text-primary/70 transition-colors duration-200">
                    {modelResponse.response.answer.length} characters
                </span>
            </div>}
        </article>
    )
}
