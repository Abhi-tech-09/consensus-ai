import { Check, X, Plus, Sparkles } from "lucide-react"

export type ModelEvaluation = {
  provider: string
  evaluation: {
    accuracy: number
    clarity: number
    completeness: number
  }
  score: number
  strengths: string[]
  weaknesses: string[]
  contribution: string[]
}

function CriteriaBar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 10) * 100))
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-mono text-xs font-semibold tabular-nums text-foreground">{value}/10</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={10} aria-label={label}>
        <div className="h-full rounded-full bg-foreground transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function Section({
  title,
  items,
  icon,
  tone,
}: {
  title: string
  items: string[]
  icon: React.ReactNode
  tone: "positive" | "negative" | "neutral"
}) {
  if (!items?.length) return null
  const toneClass =
    tone === "positive"
      ? "text-emerald-600 bg-emerald-50"
      : tone === "negative"
        ? "text-red-600 bg-red-50"
        : "text-blue-600 bg-blue-50"
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{title}</span>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${toneClass}`}>
              {icon}
            </span>
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ModelEvaluationCard({ data }: { data: ModelEvaluation }) {
  return (
    <article className="flex flex-col gap-6 rounded-xl border border-border bg-card pb-6 w-1/2 overflow-hidden">
      {/* Header */}
      <header className="flex items-start justify-between gap-4 bg-primary/30 p-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Provider</span>
          <h3 className="text-lg font-bold leading-tight text-card-foreground">{data.provider}</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Score</span>
          <span className="text-2xl font-bold tabular-nums text-card-foreground">{data.score.toFixed(1)}</span>
        </div>
      </header>

      {/* Evaluation criteria */}
      <div className="flex flex-col gap-3 rounded-lg bg-muted/40 p-4">
        <div className="flex items-center gap-2 px-6">
          <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Evaluation Criteria
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <CriteriaBar label="Accuracy" value={data.evaluation.accuracy} />
          <CriteriaBar label="Clarity" value={data.evaluation.clarity} />
          <CriteriaBar label="Completeness" value={data.evaluation.completeness} />
        </div>
      </div>

      {/* Qualitative sections */}
      <div className="flex flex-col gap-5 px-6">
        <Section title="Strengths" items={data.strengths} tone="positive" icon={<Check className="h-2.5 w-2.5" />} />
        <Section title="Weaknesses" items={data.weaknesses} tone="negative" icon={<X className="h-2.5 w-2.5" />} />
        <Section title="Contribution" items={data.contribution} tone="neutral" icon={<Plus className="h-2.5 w-2.5" />} />
      </div>
    </article>
  )
}
