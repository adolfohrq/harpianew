import React from 'react';
import { Reveal } from '../Reveal';

export const ContactHero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay - similar to Hero */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-harpia-gray/20 via-harpia-black to-harpia-black">
        {/* Subtle background decoration */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-harpia-gray/20 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-harpia-gray/10 rounded-full blur-[100px] opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-harpia-black/60 via-transparent to-harpia-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.4em] text-gray-500 mb-12 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            Contato
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 tracking-wide">
            VAMOS VOAR <span className="italic text-gray-400">JUNTOS?</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-sans font-light text-lg md:text-xl text-harpia-white max-w-2xl mx-auto leading-relaxed">
            Transforme sua visão em realidade digital. Nossa equipe está pronta para elevar sua
            marca a novos patamares.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
