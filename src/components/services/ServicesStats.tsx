import React from 'react';
import { Reveal } from '../Reveal';

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

export const ServicesStats: React.FC = () => {
  return (
    <section className="py-32 bg-harpia-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-harpia-gray/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-harpia-gray/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <span className="block font-sans text-xs uppercase tracking-[0.3em] text-harpia-accent mb-4">
              Impacto em Números
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-harpia-white mb-6">
              RESULTADOS QUE <span className="text-harpia-accent italic">FALAM POR SI</span>
            </h2>
            <p className="font-sans text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Números que refletem nosso compromisso com a excelência e o crescimento dos nossos
              parceiros.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5 border-y border-white/5">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100} width="100%">
              <div className="group p-8 text-center relative hover:bg-white/2 transition-colors duration-500">
                <div className="mb-4 relative inline-block">
                  <span className="font-serif text-5xl md:text-6xl lg:text-7xl text-harpia-white block leading-none font-light">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-harpia-accent text-3xl md:text-4xl align-top ml-1 opacity-80">
                        {stat.suffix}
                      </span>
                    )}
                  </span>
                </div>
                <p className="font-sans text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] group-hover:text-harpia-white transition-colors duration-300">
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
