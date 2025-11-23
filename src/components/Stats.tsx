import React from 'react';
import { Reveal } from './Reveal';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const STATS: Stat[] = [
  {
    value: '150',
    suffix: '+',
    label: 'Projetos Entregues',
  },
  {
    value: '98',
    suffix: '%',
    label: 'Taxa de Satisfação',
  },
  {
    value: '50',
    suffix: '+',
    label: 'Clientes Ativos',
  },
  {
    value: '5',
    suffix: '+',
    label: 'Anos de Mercado',
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-harpia-carbon relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="block font-sans text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Impacto em Números
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-200">
              Resultados que <span className="text-white italic">Falam por Si</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="text-center group">
                <div className="mb-4">
                  <span className="font-serif text-5xl md:text-6xl lg:text-7xl text-white block leading-none group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-gray-400 text-4xl md:text-5xl">{stat.suffix}</span>
                    )}
                  </span>
                </div>
                <p className="font-sans text-sm md:text-base text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
