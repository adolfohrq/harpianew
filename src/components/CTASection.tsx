import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { OptimizedImage, GradientLine } from './ui';

export const CTASection: React.FC = () => {
  return (
    <section className="py-40 md:py-48 relative bg-harpia-carbon overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage src="/3.webp" alt="Harpia voando" className="w-full h-full object-cover" />
        {/* Overlay Gradient premium - leve para manter legibilidade */}
        <div className="absolute inset-0 bg-linear-to-b from-harpia-black/60 via-harpia-black/50 to-harpia-black/70" />
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent z-10"></div>

      {/* Animated corner decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-white/10 z-10 animate-pulse"></div>
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-white/10 z-10 animate-pulse"></div>

      {/* Glowing orb effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl z-0"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          {/* Subtitle */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <GradientLine direction="right" />
            <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-harpia-white/60">
              Pronto para decolar?
            </p>
            <GradientLine direction="left" />
          </div>

          {/* Main heading */}
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-white drop-shadow-2xl leading-tight">
            VAMOS VOAR
            <br />
            <span className="bg-linear-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              JUNTOS?
            </span>
          </h2>

          {/* Description */}
          <p className="font-sans text-base md:text-lg text-harpia-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Transforme sua visão em realidade. Vamos criar algo extraordinário juntos.
          </p>

          {/* CTA Button with premium effects */}
          <div className="relative inline-block group">
            {/* Glow effect behind button */}
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full group-hover:bg-white/30 transition-all duration-500"></div>

            <Link
              to="/contato"
              className="relative inline-flex items-center gap-3 font-sans px-12 py-6 border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white hover:text-harpia-black hover:border-white transition-all duration-500 text-sm uppercase tracking-[0.25em] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-harpia-carbon group shadow-2xl hover:shadow-white/20"
            >
              <span>Iniciar Projeto</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Bottom decorative element */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-8 h-px bg-linear-to-r from-white/40 to-transparent"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
          </div>
        </Reveal>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent z-10"></div>
    </section>
  );
};
