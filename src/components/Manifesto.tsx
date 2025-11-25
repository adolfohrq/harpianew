import React from 'react';
import { Quote } from 'lucide-react';
import { Reveal } from './Reveal';
import { GradientLine } from './ui';

export const Manifesto: React.FC = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-harpia-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-harpia-gray/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-harpia-gray/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            {/* Label */}
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <GradientLine direction="right" />
              <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] text-white/40">
                Manifesto
              </span>
              <GradientLine direction="left" />
            </div>

            {/* Quote Block */}
            <div className="relative max-w-5xl">
              {/* Large decorative quotes */}
              <Quote
                className="absolute -top-6 -left-2 md:-top-12 md:-left-8 lg:-top-16 lg:-left-16 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-white/3 -scale-x-100"
                strokeWidth={1}
              />
              <Quote
                className="absolute -bottom-6 -right-2 md:-bottom-12 md:-right-8 lg:-bottom-16 lg:-right-16 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-white/3 rotate-180 -scale-x-100"
                strokeWidth={1}
              />

              {/* Main Quote */}
              <blockquote className="relative z-10 not-italic text-white text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-snug">
                Todo mundo tem uma <span className="italic text-white/40 font-light">história</span>{' '}
                para contar. Nós acreditamos que cada história importa, e queremos ajudar o seu
                negócio a comunicar de forma{' '}
                <span className="italic text-white/40 font-light">efetiva</span> e{' '}
                <span className="italic text-white/40 font-light">relevante</span>.
              </blockquote>
            </div>

            {/* Signature/Attribution */}
            <Reveal delay={0.2}>
              <div className="mt-12 md:mt-16 flex flex-col items-center gap-4">
                <div className="w-px h-8 bg-linear-to-b from-white/20 to-transparent" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/30">
                  Equipe Harpia
                </span>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
