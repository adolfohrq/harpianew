import React from 'react';
import { Target, Users, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';

const benefits = [
  {
    icon: Target,
    title: 'Abordagem Estratégica',
    description:
      'Cada projeto começa com análise profunda do mercado, concorrentes e público-alvo para definir objetivos claros e mensuráveis.',
    highlight: 'Análise 360°',
  },
  {
    icon: Users,
    title: 'Equipe Multidisciplinar',
    description:
      'Profissionais especializados em diferentes áreas trabalhando em sinergia para entregar resultados excepcionais.',
    highlight: '+15 especialistas',
  },
  {
    icon: BarChart3,
    title: 'Resultados Mensuráveis',
    description:
      'Acompanhamento de métricas e ROI em todas as etapas do projeto com relatórios detalhados e transparentes.',
    highlight: 'KPIs claros',
  },
  {
    icon: Sparkles,
    title: 'Inovação Constante',
    description:
      'Utilizamos as mais recentes tendências e tecnologias do mercado para manter sua marca sempre à frente.',
    highlight: 'Tendências 2024',
  },
];

export const ServicesBenefits: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #191919 1px, transparent 1px), linear-gradient(to bottom, #191919 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-gray-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16 md:mb-24">
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-harpia-black/30" />
                <span className="font-sans text-xs text-harpia-black/50 tracking-[0.3em] uppercase">
                  Por Que Harpia
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-4xl md:text-6xl text-harpia-black leading-[1.1]">
                METODOLOGIA
                <br />
                <span className="italic text-gray-400">DE EXCELÊNCIA</span>
              </h2>
            </Reveal>
          </div>

          <div>
            <Reveal delay={200}>
              <p className="font-sans text-lg text-gray-600 leading-relaxed font-light">
                Nossa metodologia garante que cada projeto seja único e perfeitamente alinhado aos
                seus objetivos. Combinamos estratégia, criatividade e tecnologia para resultados
                extraordinários.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 100}>
              <div className="group relative p-8 lg:p-10 bg-gray-50 hover:bg-harpia-black border border-gray-100 hover:border-harpia-black transition-all duration-700 h-full">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-white/20 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-white/20 transition-colors duration-500" />

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-sm bg-harpia-black group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500">
                    <benefit.icon
                      size={24}
                      className="text-white group-hover:text-white transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Highlight Badge */}
                  <div className="px-3 py-1.5 bg-harpia-black/5 group-hover:bg-white/10 rounded-full transition-colors duration-500">
                    <span className="text-xs font-medium text-harpia-black group-hover:text-white tracking-wide transition-colors duration-500">
                      {benefit.highlight}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl text-harpia-black group-hover:text-white mb-4 transition-colors duration-500">
                  {benefit.title}
                </h3>
                <p className="font-sans text-base text-gray-600 group-hover:text-white/70 leading-relaxed font-light transition-colors duration-500">
                  {benefit.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-2 text-harpia-black/40 group-hover:text-white/60 transition-colors duration-500">
                  <span className="text-xs uppercase tracking-[0.2em] font-medium">Saiba mais</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
