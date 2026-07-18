interface PromptInputProps {
    prompt: string
    onChange: (val: string) => void
    onGenerate: (prompt: string) => void
    loadingStatus: 'model-loading' | 'judge-loading' | 'done' | 'idle'
}

export default function PromptInput({ prompt, onChange, onGenerate, loadingStatus }: PromptInputProps) {

    const getButtonTxt = () => {
        switch (loadingStatus) {
            case 'model-loading': return <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Generating responses…
            </span>
            case 'judge-loading': return <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Finalizing synthesis…
            </span>
            default: return <span>⌘ + Enter to generate</span>
        }
    }

    const generating = !['idle', 'done'].includes(loadingStatus);

    return (
        <div className="relative rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-shadow duration-200 focus-within:shadow-md focus-within:border-(--primary)/40 mb-10">
            <textarea
                value={prompt}
                onChange={e => onChange(e.target.value)}
                placeholder="Ask anything — the three models will respond independently and their answers will be synthesized..."
                rows={2}
                className="w-full p-5 text-sm text-foreground placeholder:text-muted-foreground bg-transparent resize-none outline-none font-(family-name:--font-sans) leading-relaxed"
                onKeyDown={e => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') onGenerate(prompt)
                }}
            />
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-(--secondary)/40">
                <span className="text-xs text-muted-foreground">
                    {getButtonTxt()}
                </span>
                <button
                    onClick={() => onGenerate(prompt)}
                    disabled={generating || !prompt.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 select-none"
                >
                    {generating ? (
                        <>
                            <SpinnerIcon />
                            Generating
                        </>
                    ) : (
                        <>
                            <SparkleIcon />
                            Generate
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

function SparkleIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
        </svg>
    )
}

function SpinnerIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
        </svg>
    )
}
