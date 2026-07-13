import type { ModelResult } from "@/app/page"
import { useEffect, useState } from "react";

interface ConsensusCardProps {
    result: ModelResult
}

export const mock = { "data": { "provider": "Anthropic", "model": "claude-sonnet-5", "response": { "summary": "All three models agree that, under current physics (Einstein's special relativity), an object with mass cannot reach the speed of light because the energy required approaches infinity as velocity approaches c—this is treated as a fundamental physical limit rather than merely a technological one. Light itself is massless, which is why photons can travel at c while matter cannot. However, all models note that approaching light speed (e.g., 0.1c–0.99c) is theoretically permissible and could become achievable through advanced propulsion technologies such as nuclear fusion rockets, antimatter engines, ion drives, Bussard ramjets, or beamed-energy lightsails (e.g., Breakthrough Starshot-style probes), especially for small, low-mass payloads. Human-scale relativistic travel faces additional practical barriers: enormous energy requirements, radiation/particle shielding, acceleration and deceleration limits, life support, and communication challenges. Speculative concepts like Alcubierre warp drives and traversable wormholes are mentioned as potential theoretical loopholes that could enable effective faster-than-light travel by manipulating spacetime rather than exceeding c locally, but these require exotic matter with negative energy density that has never been observed or proven to exist, and may violate causality. All models conclude that reaching literal light-speed travel for humans is not supported by current evidence and would require revolutionary new physics, while near-light-speed travel for small probes is more plausible in coming decades to centuries given sufficient resources and engineering progress. Predictions beyond this remain highly speculative due to the impossibility of forecasting unknown future scientific breakthroughs.", "evaluations": [{ "provider": "OpenAI (gpt-5-mini)", "evaluation": { "accuracy": 9, "clarity": 8, "completeness": 9 }, "score": 8.7, "strengths": ["Clearly distinguishes between human-scale and small-probe relativistic travel feasibility", "Provides concrete real-world reference (Breakthrough Starshot) grounding the discussion in an actual research program", "Balances physical limits with practical engineering/economic/political factors affecting timelines", "Well-structured key points, assumptions, and limitations sections"], "weaknesses": ["Slightly less explicit on the causality issues tied to warp drives/wormholes compared to other models", "Confidence rating (MEDIUM) not deeply justified beyond general uncertainty statement"], "contribution": ["Added the specific example of gram-scale probes and near-relativistic velocities (0.1–0.5c) via laser-driven lightsails", "Contributed the distinction between probe-scale and human-scale challenges (shielding, life support, acceleration limits)"] }, { "provider": "Anthropic (claude-sonnet-5)", "evaluation": { "accuracy": 9, "clarity": 9, "completeness": 9 }, "score": 9, "strengths": ["Most thorough explanation of why infinite energy is required, tying it directly to relativistic mass/energy increase", "Explicitly notes that speculative warp drives/wormholes achieve FTL by manipulating spacetime rather than violating local relativity, which is a nuanced and accurate distinction", "Explicitly flags causality violation concerns for exotic propulsion concepts", "Balanced tone encouraging skepticism of hype while remaining open to genuinely unresolved theoretical questions"], "weaknesses": ["Slightly more verbose/narrative style compared to the more structured bullet-style answers", "No concrete real-world example akin to Breakthrough Starshot"], "contribution": ["Added the important nuance that warp drives/wormholes would achieve effective FTL without locally violating relativity, and tied this to causality concerns", "Reinforced the assumption set with the clarification that the question pertains to matter/human travel rather than massless particles or information"] }, { "provider": "Groq (qwen3.6-27b)", "evaluation": { "accuracy": 8, "clarity": 7, "completeness": 6 }, "score": 6.8, "strengths": ["Concise summary of the core physical limitation and propulsion outlook", "Correctly notes that current empirical evidence does not support near-future light-speed travel"], "weaknesses": ["Less detailed than the other two responses—omits specific examples like Breakthrough Starshot or the nuanced warp-drive/wormhole causality discussion", "Does not address human-specific challenges (shielding, life support, acceleration effects) explicitly", "Self-reported confidence is LOW, and the response's relative brevity and lack of nuance support that lower confidence", "Less exploration of assumptions/limitations depth compared to peers"], "contribution": ["Reinforced the consensus view on infinite energy requirements and exotic matter constraints for warp/wormhole concepts, adding redundancy but confirming agreement across models"] }], "diagreements": ["Models show no substantive factual disagreement; differences are primarily in depth and framing rather than conclusions.", "Confidence levels self-reported differ (Model 1: MEDIUM, Model 2: MEDIUM, Model 3: LOW), reflecting slightly different levels of certainty about how the topic should be framed, though the underlying physics conclusions are consistent.", "Model 2 uniquely emphasizes that warp drives/wormholes would not violate relativity locally but achieve effective FTL via spacetime manipulation, a framing not explicitly stated by Models 1 and 3, though not contradicted by them either."] }, "duration": 25881.550554999965 } }

export default function ConsensusCard({ result }: ConsensusCardProps) {
    if (result.status === 'idle') return null;


    return (
        <div className="mt-10 mb-6 rounded-2xl border border-(--primary)/30 bg-linear-to-br from-(--primary)/5 via-background to-(--primary)/3 shadow-lg overflow-hidden transition-all duration-300">
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
                {result.status === 'done' && (
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            High confidence
                        </span>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-scroll h-64 text-xs">
                {result.status === 'loading' && (
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
                {result.status === 'done' && (
                    mock.data.response.summary
                )}
            </div>

            {/* Footer badges */}
            {result.status === 'done' && (
                <div className="px-6 pb-5 flex flex-wrap gap-2">
                    {['OpenAI', 'Claude', 'Gemini', 'Grok'].map(m => (
                        <span
                            key={m}
                            className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border border-(--primary)/20 bg-(--primary)/10    text-primary"
                        >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                                <circle cx="4" cy="4" r="4" />
                            </svg>
                            {m}
                        </span>
                    ))}
                    <span className="text-[11px] text-muted-foreground self-center ml-1">
                        contributed to this synthesis
                    </span>
                </div>
            )}
        </div>
    )
}

function ConsensusContent({ text }: { text: string }) {
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
