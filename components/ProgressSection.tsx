import { CircleCheck } from 'lucide-react';
import React from 'react'

const ProgressSection = () => {
  const steps = ['OpenAI', 'Claude', 'Gemini', 'Synthesis'];
  return (
    <div className='border border-border rounded-xl w-full p-5 my-4'>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
        Generation Progress
      </p>
      <div className='flex items-center justify-start pb-4 gap-4 flex-wrap'>
        {
          steps.map(step => <StepSection key={step} step={step} />)
        }
      </div>
    </div>
  )
}

const StepSection = ({ step }: { step: string }) => {
  return (
    <div className='grow flex items-center justify-start gap-2 rounded-md p-4 bg-secondary'>
      <div className='text-xs'><CircleCheck className='size-3 text-muted' fill='green' fillOpacity={30} /></div>
      <div className='space-y-0.5'>
        <p className='text-xs font-medium leading-tight tracking-normal truncate'>{step}</p>
        <p className='text-[11px] text-muted-foreground tracking-wide capitalize'>Complete</p>
      </div>

    </div>
  )
}

export default ProgressSection
