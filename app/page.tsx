'use client'
import ConsensusCard from "@/components/ConsensusCard";
import Hero from "@/components/Hero";
import { ModelEvaluation, ModelEvaluationCard } from "@/components/ModelEvaluationCard";
import Navbar from "@/components/Navbar";
import ProgressSection from "@/components/ProgressSection";
import ProgressSectionExpected from "@/components/ProgressSectionExpected";
import PromptInput from "@/components/PromptInput";
import ResponseCards from "@/components/ResponseCards";
import axios from "axios";
import { useEffect, useState } from "react";
import { mock } from "@/components/ConsensusCard";
import { Orchestrator } from "@/lib/orchestrator";
import { JudgeAnswer, ModelResponse } from "@/types/global.types";


type ModelStatus = "idle" | "loading" | "done" | "error";

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

export default function Home() {
  const [dark, setDark] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<ModelResponse<JudgeAnswer> | null>(null);


  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const handleOnGenerate = async (userPrompt: string) => {
    const res = await axios.post("/api/v1/chat", {
      prompt: userPrompt
    });
    setResult(res.data);
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar dark={dark} onToggleDark={() => setDark(d => !d)} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 ">
        {result === null ? <Hero /> : <ConsensusCard result={{ status: 'done', text: result.response.summary }} />}
        <PromptInput
          prompt={prompt}
          onChange={setPrompt}
          onGenerate={handleOnGenerate}
          generating={false}
        />
        <ProgressSection />
        {result !== null && <ResponseCards evaluations={result.response.evaluations} />}

      </main>
    </div>
  );
}
