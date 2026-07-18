export default function Hero() {
    return (
        <div className="pt-16 pb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-muted-foreground text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Powered by OpenAI · Claude · Gemini · Groq
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                AI Consensus Engine
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Submit any prompt and receive independent responses from three leading AI models — then watch them synthesize into a single, higher-confidence answer.
            </p>
        </div>
    )
}
