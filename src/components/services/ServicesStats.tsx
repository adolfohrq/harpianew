import React from 'react';
import { Reveal } from '../Reveal';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: '150',
    label: 'Clientes Atendidos',
    suffix: '+',
  },
  {
    icon: Award,
    value: '98',
    label: 'Taxa de Satisfação',
    suffix: '%',
  },
  {
    icon: TrendingUp,
    value: '350',
    label: 'Projetos Entregues',
    suffix: '+',
  },
  {
    icon: Zap,
    value: '5',
    label: 'Anos de Experiência',
    suffix: '+',
  },
];

export const ServicesStats: React.FC = () => {
  return (
    <section className="relative py-24 bg-harpia-carbon border-y border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-white/3 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-white/2 rounded-full blur-[140px] animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 border border-white/20 px-6 py-3 rounded-full backdrop-blur-md bg-white/5">
              <TrendingUp size={16} className="text-white animate-pulse" />
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white font-semibold">
                Nossa Performance
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
              RESULTADOS QUE{' '}
              <span className="italic bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                FALAM
              </span>
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
              Números que comprovam nosso compromisso com excelência e a confiança dos nossos
              clientes.
            </p>
          </div>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label, suffix }, index) => (
            <Reveal key={label} delay={index * 100}>
              <div className="group relative p-8 bg-linear-to-br from-white/5 to-transparent border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-500 hover:scale-105">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                <div className="relative flex flex-col items-center text-center gap-6">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 flex items-center justify-center bg-white/10 border-2 border-white/20 rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500 group-hover:rotate-12">
                      <Icon
                        size={28}
                        strokeWidth={1.5}
                        className="text-white group-hover:text-harpia-black transition-colors duration-500"
                      />
                    </div>
                  </div>

                  {/* Value */}
                  <div>
                    <div className="font-serif text-5xl md:text-6xl mb-2 text-white group-hover:scale-110 transition-transform duration-300">
                      <span className="inline-block">
                        {value}
                        {suffix && (
                          <span className="text-gray-400 group-hover:text-white transition-colors">
                            {suffix}
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-300 transition-colors">
                      {label}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px bg-linear-to-r from-transparent via-white to-transparent transition-all duration-700" />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Tagline */}
        <Reveal delay={400}>
          <div className="mt-16 text-center">
            <p className="font-sans text-gray-500 font-light italic text-lg">
              "Cada projeto é uma oportunidade de superar expectativas"
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
