import { MOCK_RESPONSES } from "@/app/page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { mock } from "./ConsensusCard"
import { Check, Plus, Sparkles, X } from "lucide-react"
import { CONSENSUS_CONFIG } from "@/config/consensus-config"
import { ConsensusProviderType } from "@/types/global.types"

const ResponseCards = () => {
  return (
    <div className="grid sm:grid-cols-4 grid-cols-1 gap-2 w-6xl mx-auto">
      {
        CONSENSUS_CONFIG.providers.map((model, index) => {
          return <ModelCard key={model.name} model={model} data={mock.data.response.evaluations[index]} />
        })
      }
    </div>
  )
}

const ModelCard = ({ model, data }: { model: ConsensusProviderType, data: any }) => {
  return (
    <Card className="p-0 overflow-hidden border-t-2" style={{ borderTopColor: model.color }}>
      <CardHeader className="px-4 py-2" style={{ backgroundColor: `${model.color}15` }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: model.color }}>{model.name}</p>
            <p className="text-[10px] text-muted-foreground truncate max-w-25">{model.model}</p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold">8.7</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-xs text-secondary-foreground p-4 space-y-4">
        <div className="flex flex-col gap-3 rounded-lg bg-muted/40 p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Evaluation Criteria
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <CriteriaBar label="Accuracy" value={4} />
            <CriteriaBar label="Clarity" value={5} />
            <CriteriaBar label="Completeness" value={7} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Section title="Strengths" items={data?.strengths} tone="positive" icon={<Check className="h-2.5 w-2.5" />} />
          <Section title="Weaknesses" items={data?.weaknesses} tone="negative" icon={<X className="h-2.5 w-2.5" />} />
          <Section title="Contribution" items={data?.contribution} tone="neutral" icon={<Plus className="h-2.5 w-2.5" />} />
        </div>
      </CardContent>
    </Card>
  )
}

function CriteriaBar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 10) * 100))

  const colorMap: Record<string, { bar: string; text: string }> = {
    "Accuracy": { bar: "bg-blue-500", text: "text-blue-600" },
    "Clarity": { bar: "bg-amber-500", text: "text-amber-600" },
    "Completeness": { bar: "bg-emerald-500", text: "text-emerald-600" },
  }

  const { bar, text } = colorMap[label] || { bar: "bg-foreground", text: "text-foreground" }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${bar}`} />
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        </div>
        <span className={`font-mono text-xs font-semibold tabular-nums ${text}`}>{value}/10</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={10} aria-label={label}>
        <div className={`h-full rounded-full ${bar} transition-all`} style={{ width: `${pct}%` }} />
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
            <span className="text-pretty text-xs">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResponseCards
