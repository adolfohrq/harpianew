import React, { useState, useEffect } from 'react';
import { Reveal } from '../Reveal';
import { Mail, ArrowRight, Phone, Calendar, Zap, Target, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Target, value: '250+', label: 'Projetos Entregues' },
  { icon: TrendingUp, value: '98%', label: 'Taxa de Satisfação' },
  { icon: Zap, value: '24h', label: 'Tempo de Resposta' },
];

const reasons = [
  {
    title: 'Estratégia Personalizada',
    description: 'Cada projeto é único e merece uma abordagem sob medida',
  },
  {
    title: 'Equipe Especializada',
    description: 'Profissionais experientes dedicados ao seu sucesso',
  },
  {
    title: 'Resultados Mensuráveis',
    description: 'Métricas claras e ROI comprovado em cada entrega',
  },
];

export const ContactCTA: React.FC = () => {
  const [activeReason, setActiveReason] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReason((prev) => (prev + 1) % reasons.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Stats Section */}
      <section className="py-16 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="group relative p-8 bg-linear-to-br from-white/5 to-transparent border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-500 hover:scale-105"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-16 h-16 flex items-center justify-center bg-white/10 border border-white/20 rounded-full group-hover:rotate-12 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div>
                      <p className="font-serif text-4xl md:text-5xl text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                        {value}
                      </p>
                      <p className="font-sans text-xs uppercase tracking-[0.3em] text-gray-400">
                        {label}
                      </p>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/20 opacity-50" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative bg-harpia-carbon/20">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl mb-4">
                Por que escolher a <span className="italic text-gray-400">Harpia?</span>
              </h2>
              <p className="font-sans text-gray-500 max-w-2xl mx-auto">
                Combinamos experiência, criatividade e resultados para transformar sua presença
                digital
              </p>
            </div>
          </Reveal>

          <div className="relative h-64 md:h-48">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeReason
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="relative p-10 bg-linear-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
                        backgroundSize: '30px 30px',
                      }}
                    />
                  </div>

                  <div className="relative text-center">
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                      {reason.title}
                    </h3>
                    <p className="font-sans text-gray-400 text-lg">{reason.description}</p>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" />
                </div>
              </div>
            ))}

            {/* Indicators */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveReason(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === activeReason ? 'w-12 bg-white' : 'w-6 bg-white/30'
                  }`}
                  aria-label={`Motivo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative border-t border-white/5 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] animate-pulse"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="mb-12">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                Pronto para{' '}
                <span className="italic bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                  Decolar?
                </span>
              </h2>
              <p className="font-sans text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                Nossa equipe está ansiosa para conhecer sua história e criar soluções que gerem
                impacto real para o seu negócio.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {/* Primary CTA */}
              <a
                href="mailto:harpiagencia@gmail.com"
                className="group relative flex items-center gap-3 px-10 py-5 bg-white text-harpia-black hover:bg-harpia-black hover:text-white border-2 border-white transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Mail
                  size={20}
                  className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="relative z-10 font-sans text-sm uppercase tracking-[0.2em] font-semibold">
                  Enviar Email
                </span>
                <ArrowRight
                  size={20}
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
              </a>

              {/* Secondary CTA */}
              <a
                href="tel:+5511999999999"
                className="group flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all duration-500"
              >
                <Phone
                  size={20}
                  className="text-gray-400 group-hover:text-white transition-colors"
                />
                <span className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
                  Ligar Agora
                </span>
              </a>

              {/* Tertiary CTA */}
              <a
                href="#"
                className="group flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all duration-500"
              >
                <Calendar
                  size={20}
                  className="text-gray-400 group-hover:text-white transition-colors"
                />
                <span className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
                  Agendar Reunião
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex items-center justify-center gap-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Online Agora</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <span>Resposta em até 24h</span>
              <div className="w-px h-4 bg-white/10" />
              <span>Orçamento Gratuito</span>
            </div>
          </Reveal>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </section>
    </>
  );
};
