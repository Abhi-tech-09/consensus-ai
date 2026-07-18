import { CONSENSUS_CONFIG } from '@/config/consensus-config';
import { AIAnswer, JudgeAnswer, ModelResponse } from '@/types/global.types'
import React, { useEffect, useState } from 'react'
import { AnswerCard } from './AnswerCard';
import ResponseCards from './ResponseCards';

const ModelResponseTabs = ({
    modelResponses,
    judgeResponse,
    showEvaluations = false,
}
    : {
        modelResponses: ModelResponse<AIAnswer>[],
        judgeResponse: ModelResponse<JudgeAnswer> | null,
        showEvaluations?: boolean
    }) => {
    const [activeTab, setActiveTab] = useState<'answers' | 'evaluations'>('answers');

    const getAnswerForModel = (modelName: string) => {
        return modelResponses.find(modelResponse => modelResponse.model === modelName);
    }

    useEffect(() => {
        if (showEvaluations) setActiveTab('evaluations');
    }, [showEvaluations])

    return (
        <div className="flex flex-col gap-6">
            {/* Tab Navigation */}
            <div className="flex gap-1 border-b border-border">
                <button
                    onClick={() => setActiveTab('answers')}
                    className={`px-4 py-3 font-mono text-sm font-medium uppercase tracking-wider transition-all duration-200 relative group ${activeTab === 'answers'
                        ? 'border-b-2 border-foreground text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                        } cursor-pointer`}
                >
                    Model Answers
                    {activeTab === 'answers' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-primary to-transparent animate-slide-in-left" />
                    )}
                </button>
                {showEvaluations && (
                    <button
                        onClick={() => setActiveTab('evaluations')}
                        className={`px-4 py-3 font-mono text-sm font-medium uppercase tracking-wider transition-all duration-200 relative group animate-slide-in-left ${activeTab === 'evaluations'
                            ? 'border-b-2 border-foreground text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                            } cursor-pointer`}
                    >
                        Evaluations
                        {activeTab === 'evaluations' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-primary to-transparent animate-slide-in-left" />
                        )}
                    </button>
                )}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
                {activeTab === 'answers' && (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {
                            CONSENSUS_CONFIG.providers.map(provider => (
                                <AnswerCard
                                    key={provider.name}
                                    providerName={provider.name}
                                    modelName={provider.model}
                                    modelResponse={getAnswerForModel(provider.model) ?? null}
                                />
                            ))
                        }
                    </div>
                )}
                {activeTab === 'evaluations' && showEvaluations && (judgeResponse !== null) && (
                    <ResponseCards evaluations={judgeResponse.response.evaluations} />
                )}
            </div>
        </div>
    )
}

export default ModelResponseTabs;
