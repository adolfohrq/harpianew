import React, { useState } from 'react';
import { Eye, Target, Zap, Users } from 'lucide-react';
import { Reveal } from './Reveal';
import { GradientLine } from './ui';

interface Differential {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  number: string;
}

const DIFFERENTIALS: Differential[] = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Visão',
    subtitle: 'Estratégica',
    description:
      'Enxergamos além do óbvio. Nossa abordagem estratégica garante que cada projeto tenha impacto duradouro.',
    number: '01',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Foco em',
    subtitle: 'Resultados',
    description:
      'Não entregamos apenas projetos bonitos. Entregamos soluções que geram resultados mensuráveis.',
    number: '02',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Agilidade',
    subtitle: '& Qualidade',
    description:
      'Processos otimizados que combinam velocidade de entrega com excelência técnica e criativa.',
    number: '03',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Parceria',
    subtitle: 'Verdadeira',
    description:
      'Não somos apenas fornecedores. Somos parceiros comprometidos com o crescimento do seu negócio.',
    number: '04',
  },
];

export const WhyHarpia: React.FC = () => {
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
                Diferenciais
              </span>
              <GradientLine direction="left" variant="dark" size="lg" />
            </div>

            <h2 className="text-harpia-black mb-6">
              POR QUE
              <br />
              <span className="italic text-gray-400 font-light">Harpia?</span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
              Somos mais que uma agência. Somos seu parceiro estratégico para voar mais alto.
            </p>
          </div>
        </Reveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {DIFFERENTIALS.map((diff, index) => (
            <Reveal key={diff.title} delay={index * 100}>
              <div
                className={`group relative h-full p-6 md:p-8 bg-gray-50 border border-gray-100 rounded-sm transition-all duration-500 ${
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

                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">
                    {diff.number}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'bg-harpia-black text-white border-harpia-black'
                        : 'bg-white text-harpia-black border-gray-200'
                    }`}
                  >
                    {diff.icon}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-harpia-black mb-3 transition-transform duration-500 ${
                    hoveredIndex === index ? 'translate-y-0' : 'translate-y-1'
                  }`}
                >
                  {diff.title}
                  <br />
                  <span className="italic text-gray-400 font-light">{diff.subtitle}</span>
                </h3>

                {/* Description */}
                <p
                  className={`text-gray-600 text-sm font-light transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {diff.description}
                </p>

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

        {/* Footer */}
        <Reveal delay={0.4}>
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-4 text-gray-400">
            <GradientLine direction="right" variant="subtle" />
            <span className="text-xs uppercase tracking-[0.2em]">
              {DIFFERENTIALS.length} Pilares
            </span>
            <div className="w-8 h-px bg-black/10" />
            <span className="text-xs uppercase tracking-[0.2em]">Nossa Essência</span>
            <GradientLine direction="left" variant="subtle" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
