import { JudgeAnswer, ModelResponse } from "@/types/global.types"

export default function ConsensusCard({ judgeResponse }: { judgeResponse: ModelResponse<JudgeAnswer> | null }) {

    const judgeResult = judgeResponse?.response ?? null;
    return (
        <div className="mt-10 mb-6 rounded-2xl border border-(--primary)/30 bg-linear-to-br from-primary/5 via-background to-(--primary)/3 shadow-lg overflow-hidden transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-(--primary)/15">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l2 5h5l-4 3 1.5 5L12 12l-4.5 3L9 10 5 7h5z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-foreground tracking-tight">
                            Final Consensus Answer
                        </h2>
                        <p className="text-[11px] text-muted-foreground">
                            Synthesized from 4 independent model responses
                        </p>
                    </div>
                </div>

            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-scroll h-64 text-xs">
                {judgeResult === null && (
                    <div className="space-y-3 animate-pulse">
                        {[100, 88, 94, 76, 90, 82, 60].map((w, i) => (
                            <div
                                key={i}
                                className="h-3 rounded-full bg-(--primary)/12"
                                style={{ width: `${w}%` }}
                            />
                        ))}
                    </div>
                )}
                {judgeResult !== null && (
                    <PrettifyContent text={judgeResult.summary} />
                )}
            </div>

            {/* Footer badges */}
            {judgeResult !== null && (
                <div className='flex items-center justify-between gap-2'>
                    <div className="px-6 py-5 flex flex-wrap gap-2">
                        {judgeResult.evaluations.map(evaluation => (
                            <span
                                key={evaluation.provider}
                                className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border border-(--primary)/20 bg-(--primary)/10    text-primary"
                            >
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                                    <circle cx="4" cy="4" r="4" />
                                </svg>
                                {evaluation.provider}
                            </span>
                        ))}
                        <span className="text-[11px] text-muted-foreground self-center ml-1">
                            contributed to this synthesis
                        </span>


                    </div>
                    {judgeResult !== null && (
                        <div className="px-4 flex-col items-center gap-2">
                            <p className="text-xs text-muted-foreground tracking-tight">{(judgeResponse?.duration ?? 0 / 1000).toFixed(2)}s</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export function PrettifyContent({ text }: { text: string }) {
    // Render markdown-ish content: ## headings, **bold**, and bullet lists
    const lines = text.split('\n')
    const elements: React.ReactNode[] = []

    lines.forEach((line, i) => {
        if (line.startsWith('## ')) {
            elements.push(
                <h3 key={i} className="text-sm font-bold text-foreground mt-4 mb-1.5 first:mt-0">
                    {line.slice(3)}
                </h3>
            )
        } else if (line.startsWith('- ')) {
            elements.push(
                <li key={i} className="text-sm text-foreground leading-relaxed ml-4 list-disc marker:text-primary">
                    <InlineMarkdown text={line.slice(2)} />
                </li>
            )
        } else if (line.trim() === '') {
            elements.push(<div key={i} className="h-1" />)
        } else {
            elements.push(
                <p key={i} className="text-sm text-foreground leading-relaxed">
                    <InlineMarkdown text={line} />
                </p>
            )
        }
    })

    return <div className="space-y-1">{elements}</div>
}

function InlineMarkdown({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return (
        <>
            {parts.map((part, i) =>
                part.startsWith('**') && part.endsWith('**') ? (
                    <strong key={i} className="font-semibold text-foreground">
                        {part.slice(2, -2)}
                    </strong>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    )
}
