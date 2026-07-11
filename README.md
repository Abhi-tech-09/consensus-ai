# Consensus-AI

A Next.js application that implements the **Self-Consistency** prompting technique by orchestrating multiple Large Language Models (LLMs) to generate a higher-quality final response.

Instead of relying on a single AI model, the application gathers responses from multiple providers, compares their outputs, and synthesizes the best possible answer using a dedicated judge model.

---

## 🚀 Features

- Multiple AI providers
  - OpenAI
  - Anthropic Claude
  - Google Gemini

- Self-Consistency orchestration

- Structured responses using Zod schemas

- Judge model for final response synthesis

- Parallel API execution

- Loading and error handling

- Responsive UI built with Next.js and shadcn/ui

---

## 🏗️ Architecture

```text
                User Prompt
                     │
                     ▼
            Prompt Orchestrator
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
     OpenAI       Claude       Gemini
        │            │            │
        └────────────┼────────────┘
                     ▼
          Final Judge (Claude)
                     │
                     ▼
        Synthesized Final Response
```

---

## 🛠️ Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zod
- OpenAI SDK
- Anthropic SDK
- Google Gemini SDK

---

## 📂 Project Structure

```text
app/
├── api/
│   └── chat/
│       └── route.ts

providers/
├── openai.ts
├── anthropic.ts
├── gemini.ts

lib/
├── orchestrator.ts
├── constants.ts
├── systemPrompt.ts

schemas/
├── ai-answer.ts

types/
├── global.types.ts
```

---

## ⚙️ How It Works

1. The user submits a prompt through the UI.
2. The orchestrator sends the same prompt to:
   - OpenAI
   - Claude
   - Gemini
3. Each provider returns a structured response validated using Zod.
4. The orchestrator collects all responses.
5. A judge model analyzes the responses, identifies the strongest ideas, resolves inconsistencies, and produces a final synthesized answer.
6. The UI displays:
   - Individual model responses
   - Final synthesized response
   - Response times for each provider

---

## 🔄 Self-Consistency Flow

```text
User Prompt
      │
      ▼
──────────────────────────────
OpenAI
Claude
Gemini
──────────────────────────────
      │
      ▼
Structured Responses
      │
      ▼
Judge Model
      │
      ▼
Best Final Answer
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/multi-llm-orchestrator.git
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GEMINI_API_KEY=your_gemini_key
```

Run the development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

```env
OPENAI_API_KEY=

ANTHROPIC_API_KEY=

GEMINI_API_KEY=
```

---

## 📸 Screenshots

> Add screenshots of the application here.

- Landing Page
- Model Responses
- Final Synthesized Answer

---

## 🎯 Future Improvements

- Streaming responses
- Conversation history
- Prompt templates
- Retry and fallback mechanisms
- Response caching
- Cost and token usage analytics
- Model selection from the UI
- Support for additional providers (Groq, Mistral, Cohere, etc.)

---

## 📄 License

This project is licensed under the MIT License.