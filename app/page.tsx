'use client'
import ConsensusCard from "@/components/ConsensusCard";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProgressSection from "@/components/ProgressSection";
import ProgressSectionExpected from "@/components/ProgressSectionExpected";
import PromptInput from "@/components/PromptInput";
import ResponseCards from "@/components/ResponseCards";
import axios from "axios";
import { useEffect, useState } from "react";


export type ModelStatus = 'idle' | 'loading' | 'done' | 'error'

export interface ModelResult {
  status: ModelStatus
  text: string
}

export interface Results {
  openai: ModelResult
  claude: ModelResult
  gemini: ModelResult
  consensus: ModelResult
}

const IDLE: ModelResult = { status: 'idle', text: '' }

export const MOCK_RESPONSES = {
  openai: `Based on the provided prompt, I can offer a comprehensive analysis. The core concept revolves around distributed intelligence — where multiple AI systems collaborate to surface a more robust and nuanced answer than any single model could produce alone.\n\nThis approach mirrors how expert committees function in high-stakes decision-making: each voice brings a distinct training distribution, architectural bias, and reasoning style. The synthesis of these perspectives reduces the risk of confident-but-wrong outputs.\n\nKey considerations include latency trade-offs, cost multipliers, and the challenge of detecting meaningful divergence versus superficial phrasing differences across model outputs.`,
  claude: `The question touches on a genuinely interesting challenge in applied AI: how do we combine outputs from models with fundamentally different architectures, training data, and alignment approaches?\n\nWhat I find compelling here is the meta-level problem — not just "what do the models say" but "how do we weight their responses?" A simple majority vote fails when one model is systematically better on a given domain. A weighted ensemble requires calibration data that may not exist.\n\nThe most honest synthesis acknowledges uncertainty explicitly: where models agree, confidence is higher; where they diverge, the disagreement itself is signal worth surfacing to the user rather than papering over.`,
  gemini: `This is a fascinating application of ensemble methods to large language models. From a systems perspective, the AI Consensus Engine architecture raises several important design questions.\n\nFirst, temporal coherence: models should ideally run in parallel, but their responses need to be reconciled without one model's output influencing another's (to avoid echo chambers). Second, domain-awareness: the synthesis layer should ideally know which model has stronger priors for a given topic category.\n\nThird — and most underexplored — is graceful disagreement. When models give genuinely different answers, the most valuable output may be a structured representation of that disagreement, not a forced consensus that loses the signal.`,
  consensus: `## Consensus Analysis\n\nAll three models converge on a central theme: **ensemble AI systems are valuable precisely because of their divergence**, not despite it.\n\n**Points of strong agreement:**\n- Parallel execution is preferable to sequential to avoid anchoring effects\n- Disagreement between models is meaningful signal, not noise to suppress\n- A weighted synthesis outperforms naive averaging when domain priors are known\n\n**Nuanced differences:**\nOpenAI emphasizes practical trade-offs (latency, cost). Claude focuses on the epistemics of weighting and calibration. Gemini brings a systems-design lens to the architecture.\n\n**Synthesized recommendation:**\nBuild the consensus layer to (1) run models in parallel, (2) surface disagreement to users with confidence indicators, and (3) apply domain-aware weighting when training signal is available. The goal is augmented judgment, not artificial certainty.`,
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<Results>({
    openai: IDLE,
    claude: IDLE,
    gemini: IDLE,
    consensus: IDLE,
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const handleOnGenerate = async (prompt: string) => {
    const res = await axios.post("api/v1/chat",{
      prompt
    }); 
    console.log(res.data)
  } 

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar dark={dark} onToggleDark={() => setDark(d => !d)} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 ">
        {prompt === '' ? <Hero /> : <ConsensusCard result={{ status: 'done', text: "hey" }} />}
        <PromptInput
          prompt={prompt}
          onChange={setPrompt}
          onGenerate={handleOnGenerate}
          generating={generating}
        />
        <ProgressSection />
        <ResponseCards />



      </main>
    </div>
  );
}
