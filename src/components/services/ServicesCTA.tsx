import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../Reveal';
import { ArrowRight, Mail, MessageSquare, Calendar } from 'lucide-react';

export const ServicesCTA: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white/5 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-8 border border-white/20 px-7 py-3.5 rounded-full backdrop-blur-md bg-white/5 shadow-2xl">
              <MessageSquare size={16} className="text-white animate-pulse" />
              <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-white font-semibold">
                Vamos Começar
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-10 leading-[0.95] tracking-tight">
              <span className="block">PRONTO PARA</span>
              <span className="block bg-clip-text text-transparent bg-linear-to-r from-white via-gray-200 to-gray-400 italic font-light">
                TRANSFORMAR
              </span>
              <span className="block">SUA MARCA?</span>
            </h2>

            {/* Description */}
            <p className="font-sans font-light text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-16">
              Entre em contato e descubra como podemos{' '}
              <span className="text-white font-normal">elevar sua presença digital</span> e gerar
              resultados que realmente importam.
            </p>
          </div>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
            {/* Primary CTA */}
            <Link
              to="/contato"
              className="group relative flex items-center gap-3 px-10 py-6 bg-white text-harpia-black hover:bg-harpia-black hover:text-white border-2 border-white transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Mail
                size={22}
                className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="relative z-10 font-sans text-sm uppercase tracking-[0.2em] font-semibold">
                Solicitar Orçamento
              </span>
              <ArrowRight
                size={22}
                className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>

            {/* Secondary CTA */}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-10 py-6 bg-transparent border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all duration-500"
            >
              <MessageSquare
                size={22}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
              <span className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
                Falar no WhatsApp
              </span>
            </a>

            {/* Tertiary CTA */}
            <Link
              to="/contato"
              className="group flex items-center gap-3 px-10 py-6 bg-transparent border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all duration-500"
            >
              <Calendar
                size={22}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
              <span className="font-sans text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
                Agendar Reunião
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Bottom Info */}
        <Reveal delay={300}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
              <span className="font-sans text-sm text-gray-300">Resposta em até 24h</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="font-sans text-sm text-gray-300">
                Orçamento <span className="text-white font-semibold">Gratuito</span>
              </span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="font-sans text-sm text-gray-300">
                Atendimento <span className="text-white font-semibold">Personalizado</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Decorative Lines */}
        <div className="absolute top-1/2 left-0 w-64 h-px bg-linear-to-r from-transparent to-white/10" />
        <div className="absolute top-1/2 right-0 w-64 h-px bg-linear-to-l from-transparent to-white/10" />
      </div>
    </section>
  );
};
