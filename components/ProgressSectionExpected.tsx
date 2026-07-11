import type { Results, ModelStatus } from '@/app/page'

interface ProgressSectionProps {
    results: Results
}

const STEPS = [
    { key: 'openai' as const, label: 'OpenAI', color: '#10a37f' },
    { key: 'claude' as const, label: 'Claude', color: '#d97706' },
    { key: 'gemini' as const, label: 'Gemini', color: '#4285f4' },
    { key: 'consensus' as const, label: 'Synthesis', color: '#6366f1' },
]

export default function ProgressSectionExpected({ results }: ProgressSectionProps) {
    return (
        <div className="mb-10 p-5 rounded-xl border border-border bg-card">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Generation Progress
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STEPS.map(step => {
                    const status = results[step.key].status
                    return (
                        <StepIndicator
                            key={step.key}
                            label={step.label}
                            status={status}
                            color={step.color}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function StepIndicator({
    label,
    status,
    color,
}: {
    label: string
    status: ModelStatus
    color: string
}) {
    return (
        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-(--secondary)/60">
            <StatusDot status={status} color={color} />
            <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{label}</p>
                <p className="text-[11px] text-muted-foreground capitalize">{statusLabel(status)}</p>
            </div>
        </div>
    )
}

function StatusDot({ status, color }: { status: ModelStatus; color: string }) {
    if (status === 'loading') {
        return (
            <span
                className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                style={{ backgroundColor: color }}
            />
        )
    }
    if (status === 'done') {
        return (
            <span
                className="w-2.5 h-2.5 rounded-full shrink-0 flex items-center justify-center"
                style={{ backgroundColor: color }}
            >
                <svg width="6" height="6" viewBox="0 0 8 8" fill="white">
                    <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            </span>
        )
    }
    return (
        <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-border" />
    )
}

function statusLabel(status: ModelStatus) {
    switch (status) {
        case 'idle': return 'Waiting'
        case 'loading': return 'Thinking…'
        case 'done': return 'Complete'
        case 'error': return 'Error'
    }
}
