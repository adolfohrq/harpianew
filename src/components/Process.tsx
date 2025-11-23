import React from 'react';
import { Reveal } from './Reveal';
import { Scan, Compass, Plane, BarChart2 } from 'lucide-react';

const STEPS = [
  {
    id: '01',
    title: 'Radar',
    subtitle: 'Imersão',
    description: 'Mapeamento do território, análise de concorrência e identificação de oportunidades.',
    icon: <Scan size={24} strokeWidth={1.5} />,
  },
  {
    id: '02',
    title: 'Rota',
    subtitle: 'Estratégia',
    description: 'Definição do tom de voz, arquétipo da marca e canais de ataque.',
    icon: <Compass size={24} strokeWidth={1.5} />,
  },
  {
    id: '03',
    title: 'Decolagem',
    subtitle: 'Criação',
    description: 'Design, produção de conteúdo e execução visual de alto impacto.',
    icon: <Plane size={24} strokeWidth={1.5} />,
  },
  {
    id: '04',
    title: 'Cruzeiro',
    subtitle: 'Performance',
    description: 'Análise de dados, otimização constante e escala.',
    icon: <BarChart2 size={24} strokeWidth={1.5} />,
  },
];

export const Process: React.FC = () => {
  return (
    <section className="py-32 bg-harpia-black border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-24 max-w-2xl">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">MÉTODO DE VOO</h2>
            <p className="text-gray-400 font-light text-lg border-l border-white/20 pl-6">
              Nossa metodologia proprietária para tirar ideias do papel e colocá-las em órbita.
            </p>
          </Reveal>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 group/timeline">
            {STEPS.map((step, index) => (
              <Reveal key={step.id} delay={index * 150}>
                <div className="relative group/step md:pt-8 transition-all duration-500 hover:!opacity-100 group-hover/timeline:opacity-40">
                  
                  {/* Vertical Line (Mobile) */}
                  <div className="md:hidden absolute left-3 top-10 bottom-[-3rem] w-[1px] bg-white/10 -z-10 last:hidden"></div>

                  {/* Icon Marker */}
                  <div className="mb-6 relative z-10 flex items-center md:justify-center md:block">
                    <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-harpia-black border border-white/20 flex items-center justify-center text-white group-hover/step:bg-white group-hover/step:text-black group-hover/step:border-white transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,1)]">
                      <div className="md:hidden">{step.icon}</div>
                      <div className="hidden md:block w-2 h-2 bg-current rounded-full"></div>
                    </div>
                    {/* Mobile Title Layout */}
                    <span className="md:hidden ml-4 font-serif text-2xl text-white">{step.title}</span>
                  </div>

                  {/* Content */}
                  <div className="pl-14 md:pl-0 md:text-center">
                    <div className="mb-4">
                      <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                        {step.id}
                      </span>
                    </div>
                    
                    <h3 className="hidden md:block font-serif text-3xl mb-1 text-white group-hover/step:translate-y-1 transition-transform duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover/step:text-white transition-colors duration-300">
                      {step.subtitle}
                    </p>
                    
                    <p className="text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-4 group-hover/step:border-white/20 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};