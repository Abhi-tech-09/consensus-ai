'use client'
import ConsensusCard from "@/components/ConsensusCard";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProgressSection from "@/components/ProgressSection";
import PromptInput from "@/components/PromptInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { AIAnswer, JudgeAnswer, ModelResponse } from "@/types/global.types";
import ModelResponseTabs from "@/components/ModelResponseTabs";



export default function Home() {
  const [dark, setDark] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<ModelResponse<JudgeAnswer> | null>(null);
  const [modelResults, setModelResults] = useState<ModelResponse<AIAnswer>[]>([]);
  const [showEvaluations, setShowEvaluations] = useState(false);


  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const startStreaming = async () => {
    const modelResultList: ModelResponse<AIAnswer>[] = [];
    const response = await fetch('/api/v1/models-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    while (!done) {
      const result = await reader?.read();
      const value = result?.value;
      if (value === null || value === undefined) { done = true; break; }
      console.log(decoder.decode(value));
      const res = JSON.parse(decoder.decode(value));
      console.log(res);
      if ('type' in res.data && res.data.type === 'done') done = true;
      else {
        setModelResults(modelResults => [...modelResults, res.data]);
        modelResultList.push(res.data);
      }
    }
    return modelResultList;
  }

  const getJudgeResponse = async (modelResponses: ModelResponse<AIAnswer>[]) => {
    const response = await axios.post('/api/v1/judge-response', {
      prompt,
      modelResponses
    });
    setResult(response.data.data);
  }


  const handleOnGenerate = async (userPrompt: string) => {
    setShowEvaluations(false);
    setModelResults([]);
    setResult(null);
    const modelResponses = await startStreaming();
    await getJudgeResponse(modelResponses);
    setShowEvaluations(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar dark={dark} onToggleDark={() => setDark(d => !d)} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 ">
        {/* {result === null ? <Hero /> : <ConsensusCard result={{ status: 'done', text: result.response.summary }} />} */}
        {showEvaluations ? <ConsensusCard judgeResult={result === null ? null : result.response} /> : <Hero />}
        <PromptInput
          prompt={prompt}
          onChange={setPrompt}
          onGenerate={handleOnGenerate}
          generating={result === null}
        />
        {/* <ProgressSection /> */}
        <ModelResponseTabs modelResponses={modelResults} judgeResponse={result!} showEvaluations={showEvaluations} />
      </main>
    </div>
  );
}
