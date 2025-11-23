import React from 'react';
import { Eye, Target, Zap, Users } from 'lucide-react';
import { Reveal } from './Reveal';

interface Differential {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DIFFERENTIALS: Differential[] = [
  {
    icon: <Eye className="w-8 h-8" />,
    title: 'Visão Estratégica',
    description:
      'Enxergamos além do óbvio. Nossa abordagem estratégica garante que cada projeto tenha impacto duradouro.',
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Foco em Resultados',
    description:
      'Não entregamos apenas projetos bonitos. Entregamos soluções que geram resultados mensuráveis para seu negócio.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Agilidade & Qualidade',
    description:
      'Processos otimizados que combinam velocidade de entrega com excelência técnica e criativa.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Parceria Verdadeira',
    description:
      'Não somos apenas fornecedores. Somos parceiros comprometidos com o crescimento do seu negócio.',
  },
];

export const WhyHarpia: React.FC = () => {
  return (
    <section className="py-32 bg-harpia-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="block font-sans text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Diferenciais
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Por Que <span className="italic text-gray-400">Harpia?</span>
            </h2>
            <p className="font-sans text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Somos mais que uma agência. Somos seu parceiro estratégico para voar mais alto.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIFFERENTIALS.map((diff, index) => (
            <Reveal key={diff.title} delay={index * 100}>
              <div className="group relative p-8 bg-harpia-carbon border border-white/5 hover:border-white/20 transition-all duration-500">
                {/* Icon */}
                <div className="mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {diff.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{diff.title}</h3>

                {/* Description */}
                <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
                  {diff.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
