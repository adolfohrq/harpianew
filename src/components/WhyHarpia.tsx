import React, { useState } from 'react';
import { Eye, Target, Zap, Users } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeader, DifferentialCard } from './ui';

interface Differential {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  color: string;
}

const DIFFERENTIALS: Differential[] = [
  {
    icon: <Eye className="w-8 h-8" />,
    title: 'Visão Estratégica',
    description:
      'Enxergamos além do óbvio. Nossa abordagem estratégica garante que cada projeto tenha impacto duradouro.',
    number: '01',
    color: 'from-blue-500/5 to-indigo-500/5',
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Foco em Resultados',
    description:
      'Não entregamos apenas projetos bonitos. Entregamos soluções que geram resultados mensuráveis para seu negócio.',
    number: '02',
    color: 'from-purple-500/5 to-pink-500/5',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Agilidade & Qualidade',
    description:
      'Processos otimizados que combinam velocidade de entrega com excelência técnica e criativa.',
    number: '03',
    color: 'from-amber-500/5 to-orange-500/5',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Parceria Verdadeira',
    description:
      'Não somos apenas fornecedores. Somos parceiros comprometidos com o crescimento do seu negócio.',
    number: '04',
    color: 'from-emerald-500/5 to-teal-500/5',
  },
];

export const WhyHarpia: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white relative overflow-hidden selection:bg-harpia-black selection:text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[120px] -translate-y-1/2 animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[100px] translate-y-1/2 animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Diagonal Lines Decoration */}
      <div className="absolute top-1/4 right-0 w-64 h-px bg-linear-to-l from-black/5 to-transparent opacity-50" />
      <div className="absolute bottom-1/4 left-0 w-64 h-px bg-linear-to-r from-black/5 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          label="Diferenciais"
          title={
            <>
              POR QUE <span className="italic text-gray-400">HARPIA?</span>
            </>
          }
          description="Somos mais que uma agência. Somos seu parceiro estratégico para voar mais alto."
          align="center"
          className="mb-20"
        />

        {/* Cards Grid with Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 group/cards items-stretch">
          {DIFFERENTIALS.map((diff, index) => (
            <Reveal key={diff.title} delay={index * 100}>
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative h-full flex flex-col"
              >
                {/* Colored Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-sm bg-linear-to-br ${diff.color} opacity-0 transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 z-20">
                  <div
                    className={`w-12 h-12 rounded-full border-2 border-harpia-black bg-white flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 shadow-sm ${
                      hoveredIndex === index
                        ? 'bg-harpia-black text-white scale-110 shadow-[0_8px_24px_rgba(0,0,0,0.15)] -rotate-12'
                        : 'text-harpia-black scale-100 rotate-0'
                    }`}
                  >
                    {diff.number}
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div
                  className={`absolute -inset-1 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-sm opacity-0 blur-xl transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                />

                {/* Shine Effect on Hover */}
                <div
                  className={`absolute inset-0 rounded-sm bg-linear-to-br from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Card with Enhanced Interactions */}
                <div
                  className={`relative flex-1 flex flex-col transition-all duration-500 ${
                    hoveredIndex !== null && hoveredIndex !== index
                      ? 'opacity-40 scale-[0.98]'
                      : 'opacity-100 scale-100'
                  }`}
                >
                  <DifferentialCard
                    icon={diff.icon}
                    title={diff.title}
                    description={diff.description}
                    index={index}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Accent Line */}
        <Reveal delay={500}>
          <div className="mt-20 flex items-center justify-center">
            <div className="flex items-center gap-4 opacity-30 group/accent">
              <div className="w-16 h-px bg-linear-to-r from-transparent to-black transition-all duration-700 group-hover/accent:w-24" />
              <div className="relative">
                <div className="w-2 h-2 bg-black rounded-full transition-all duration-700 group-hover/accent:scale-150" />
                <div className="absolute inset-0 w-2 h-2 bg-black rounded-full animate-ping opacity-20" />
              </div>
              <div className="w-16 h-px bg-linear-to-l from-transparent to-black transition-all duration-700 group-hover/accent:w-24" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
