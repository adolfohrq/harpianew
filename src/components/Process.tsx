import React, { useState } from 'react';
import { Reveal } from './Reveal';
import { Scan, Compass, Plane, BarChart2, ArrowUpRight } from 'lucide-react';
import { GradientLine } from './ui';

interface Step {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    id: '01',
    title: 'Radar',
    subtitle: 'Imersão',
    description:
      'Mapeamento do território, análise de concorrência e identificação de oportunidades estratégicas para sua marca.',
    icon: <Scan className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    id: '02',
    title: 'Rota',
    subtitle: 'Estratégia',
    description:
      'Definição do tom de voz, arquétipo da marca e canais de ataque para máximo impacto.',
    icon: <Compass className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    id: '03',
    title: 'Decolagem',
    subtitle: 'Criação',
    description:
      'Design, produção de conteúdo e execução visual de alto impacto que conecta com seu público.',
    icon: <Plane className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    id: '04',
    title: 'Cruzeiro',
    subtitle: 'Performance',
    description:
      'Análise de dados, otimização constante e escala para resultados sustentáveis e duradouros.',
    icon: <BarChart2 className="w-6 h-6" strokeWidth={1.5} />,
  },
];

export const Process: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #191919 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <GradientLine direction="right" variant="dark" size="lg" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-500 font-medium">
                Metodologia
              </span>
              <GradientLine direction="left" variant="dark" size="lg" />
            </div>

            <h2 className="text-harpia-black mb-6">
              MÉTODO DE
              <br />
              <span className="italic text-gray-400 font-light">Voo</span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
              Nossa metodologia proprietária para tirar ideias do papel e colocá-las em órbita.
            </p>
          </div>
        </Reveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map((step, index) => (
            <Reveal key={step.id} delay={index * 100}>
              <div
                className={`group relative h-full p-6 md:p-8 bg-gray-50 border border-gray-100 rounded-sm transition-all duration-500 cursor-default ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? 'opacity-50 scale-[0.98]'
                    : 'opacity-100 scale-100'
                } ${hoveredIndex === index ? 'border-gray-300 bg-white' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">
                    {step.id}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'bg-harpia-black text-white border-harpia-black'
                        : 'bg-white text-harpia-black border-gray-200'
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-harpia-black mb-4 transition-transform duration-500 ${
                    hoveredIndex === index ? 'translate-y-0' : 'translate-y-1'
                  }`}
                >
                  {step.title}
                  <br />
                  <span className="italic text-gray-400 font-light">{step.subtitle}</span>
                </h3>

                {/* Description */}
                <p
                  className={`text-gray-600 text-sm font-light leading-relaxed transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {step.description}
                </p>

                {/* Step Connector Line (desktop only) */}
                {index < STEPS.length - 1 && (
                  <div className="absolute top-1/2 -right-3 md:-right-3 w-6 h-px bg-gray-200 hidden lg:block" />
                )}

                {/* Bottom Line Accent */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] bg-harpia-black transition-all duration-700 ${
                    hoveredIndex === index ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Progress Indicator */}
        <Reveal delay={0.3}>
          <div className="mt-12 md:mt-16 relative">
            {/* Progress Line */}
            <div className="h-px bg-gray-200 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-harpia-black transition-all duration-700"
                style={{
                  width:
                    hoveredIndex !== null ? `${((hoveredIndex + 1) / STEPS.length) * 100}%` : '0%',
                }}
              />
              {/* Step markers */}
              <div className="absolute inset-0 flex justify-between">
                {STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full -translate-y-1/2 top-1/2 absolute transition-all duration-300 ${
                      hoveredIndex !== null && index <= hoveredIndex
                        ? 'bg-harpia-black scale-100'
                        : 'bg-gray-300 scale-75'
                    }`}
                    style={{
                      left: `${(index / (STEPS.length - 1)) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal delay={0.4}>
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/10">
            {/* Step Count */}
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-xs uppercase tracking-[0.2em]">{STEPS.length} Etapas</span>
              <div className="w-8 h-px bg-black/10" />
              <span className="text-xs uppercase tracking-[0.2em]">Processo Completo</span>
            </div>

            {/* CTA Link */}
            <a
              href="#contato"
              className="group/link flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-600 hover:text-harpia-black transition-colors duration-300"
            >
              Iniciar Projeto
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
