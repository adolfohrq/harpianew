import React from 'react';
import { Reveal } from './Reveal';

const MILESTONES = [
  {
    year: '2019',
    title: 'O Primeiro Voo',
    description:
      'Harpia nasce com uma visão clara: ser a agência que não apenas cria, mas que transforma negócios através de estratégia e criatividade.',
  },
  {
    year: '2020',
    title: 'Expansão Digital',
    description:
      'Em tempos desafiadores, nos adaptamos rapidamente e entregamos resultados extraordinários. Nossos clientes não apenas sobreviveram, cresceram.',
  },
  {
    year: '2021',
    title: 'Consolidação',
    description:
      'Consolidamos nossa metodologia proprietária e expandimos nossa equipe de especialistas. 15+ prêmios e reconhecimentos em criatividade.',
  },
  {
    year: '2022',
    title: 'Escala Global',
    description:
      'Passamos a trabalhar com marcas nacionais e internacionais. Criamos um time verdadeiramente talentoso e diverso.',
  },
  {
    year: '2023',
    title: 'Inovação',
    description:
      'Investimos em IA, tecnologia e novos formatos. Mantemos a essência criativa enquanto abraçamos o futuro.',
  },
  {
    year: '2024',
    title: 'Altitude Máxima',
    description:
      'Hoje, somos parceiros de marcas que querem voar alto. Cada projeto é uma missão para enxergar mais longe.',
  },
];

export const AboutTimeline: React.FC = () => {
  return (
    <section className="py-32 md:py-40 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-100 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-linear-to-r from-transparent to-black/20" />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">
                Trajetória
              </span>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-black/20" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-harpia-black mb-6 leading-tight">
              Uma história de <span className="italic text-gray-400">crescimento</span> e
              <br />
              <span className="italic text-gray-400">transformação</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-12">
          {MILESTONES.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 100}>
              <div className="group relative">
                <div className="flex gap-8 md:gap-12 items-start">
                  {/* Year Badge */}
                  <div className="shrink-0 pt-2">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-harpia-black border-2 border-harpia-black flex items-center justify-center text-white font-serif text-xl font-bold group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                        {milestone.year.slice(-2)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 border-l-2 border-gray-200 pl-8 pb-8 last:pb-0 group-hover:border-harpia-black transition-colors duration-500">
                    <h3 className="text-2xl md:text-3xl font-serif text-harpia-black mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
