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
      <div>
        <p className='text-[11px] text-foreground tracking-wide'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam ipsum hic dolores, asperiores facere quis quod suscipit a rerum nemo adipisci iure ad culpa labore minima possimus quaerat perferendis expedita. Voluptatem animi recusandae quod porro fuga impedit maxime nobis iste in pariatur deleniti sit, adipisci dolores nulla distinctio sint voluptatum, ab deserunt. Eligendi vitae nam quidem velit obcaecati at ratione harum dolor excepturi hic ipsam eveniet dicta, fugit labore cumque iure assumenda incidunt tempore? Unde eveniet blanditiis error nam nesciunt reprehenderit ipsum eius excepturi natus velit, cumque doloribus fugit sit. Officia quidem vero eius. Id expedita vel quae eos quam omnis! Totam facere nulla ipsa, mollitia laudantium sapiente qui molestias labore iure nam, corrupti quia corporis aut, nemo voluptatibus consequuntur animi? Alias recusandae beatae rerum totam exercitationem! Excepturi sed, nobis voluptas, officiis consectetur culpa quas praesentium, nulla iure laborum voluptatum deserunt at alias quibusdam. Neque assumenda sapiente atque incidunt quis impedit hic cum doloremque. Hic natus porro voluptate similique quidem earum, consectetur quas laborum consequuntur commodi repellat ratione deleniti veritatis distinctio mollitia perspiciatis dolorum odio eius. Sint id eius possimus corporis ratione, mollitia quo illo similique deleniti at laborum quam, quae iusto aspernatur consectetur! Non ratione placeat nulla laudantium quod aliquam, totam earum veritatis officia sunt animi possimus illum quaerat libero maiores dolorem reiciendis, nihil quibusdam minima asperiores sit iusto. Ex facilis, perferendis nam quis debitis tempora! Quasi repellendus hic voluptatum voluptate, quam veniam, distinctio cumque consequatur cum quas dolor tempora cupiditate soluta vitae, unde sapiente molestias! Sit qui nihil exercitationem facilis ex veritatis reiciendis deserunt ab sed unde, id molestiae iusto quasi, atque praesentium aliquid quidem et omnis modi odio assumenda quos, soluta voluptates? In iure beatae ad. Corporis ratione, amet numquam aliquid ducimus enim, nesciunt quia exercitationem nihil, id quas dicta non hic aspernatur error iste quaerat. Sequi eum assumenda vero molestias accusamus culpa natus explicabo atque. Nihil, hic dignissimos ex error vel ab animi. Eum odit placeat magni animi distinctio. Necessitatibus accusantium temporibus ducimus exercitationem sunt dignissimos praesentium molestias delectus deserunt illum perferendis mollitia quae architecto, doloribus ratione fugit ipsa? Repellendus quod cupiditate distinctio est quae quidem ipsam ipsa fugiat, illo aliquid optio quas ea explicabo laboriosam maiores obcaecati eligendi deleniti voluptates fuga! Cum eaque culpa architecto, optio quaerat, tempora labore hic eveniet omnis delectus ad voluptas exercitationem reprehenderit possimus est? Animi voluptatem ex corrupti, assumenda rerum accusantium? Quam enim in nostrum suscipit unde repellendus nihil illum labore ratione dolor perferendis soluta dolorum beatae error provident id consequatur delectus eum, neque, fugiat asperiores. Nostrum, maiores mollitia laboriosam nesciunt accusantium veniam tempore qui tenetur velit officiis rerum eligendi adipisci sint facilis magnam distinctio quos, ut eos dicta ducimus? Minima tempora aut accusantium soluta obcaecati laudantium? Voluptatibus sapiente possimus, earum autem ad itaque atque. Aspernatur reiciendis, voluptate aperiam magnam quidem commodi nam rerum reprehenderit debitis exercitationem ipsa officiis aliquid voluptatem minus tempora obcaecati saepe unde repellat optio ipsum, neque asperiores nisi molestias! Accusamus, quis? Asperiores molestiae corrupti repudiandae totam facere rem recusandae? Qui iure molestiae et laudantium nihil possimus?</p>
      </div>

    </div>
  )
}

const EvaluationSection = () => {

}

export default ProgressSection
