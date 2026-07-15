import { PROVIDERS } from "@/lib/constants";
import { AnthropicProvider } from "@/providers/anthropic";
import { GeminiProvider } from "@/providers/gemini";
import { GroqProvider } from "@/providers/groq";
import { OpenAIProvider } from "@/providers/openai";
import { ConsensusConfigType } from "@/types/global.types";

export const CONSENSUS_CONFIG: ConsensusConfigType = {
  providers: [
    {
      name: PROVIDERS.OpenAI,
      model: "gpt-5-mini",
      color: "#10a37f",
      getProvider() {
        return new OpenAIProvider(this.name, this.model);
      },
    },
    {
      name: PROVIDERS.Anthropic,
      model: "claude-haiku-4-5-20251001",
      color: "#D97757",
      getProvider() {
        return new AnthropicProvider(this.name, this.model);
      },
    },
    {
      name: PROVIDERS.Gemini,
      model: "gemini-3.5-flash",
      color: "#4285f4",
      getProvider() {
        return new GeminiProvider(this.name, this.model);
      },
    },
    {
      name: PROVIDERS.Groq,
      model: "qwen/qwen3.6-27b",
      color: "#f55036",
      getProvider() {
        return new GroqProvider(this.name, this.model);
      },
    },
  ],

  judgeProvider: {
    name: PROVIDERS.Anthropic,
    model: "claude-sonnet-5",
    color: "#D97757",
    getProvider() {
      return new AnthropicProvider(this.name, this.model);
    },
  },
};
