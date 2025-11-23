import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../Reveal';

export const ContactCTA: React.FC = () => {
  return (
    <section className="py-32 relative bg-harpia-carbon overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <h2 className="font-serif text-5xl md:text-7xl mb-8">
            PRONTO PARA <span className="italic text-gray-400">DECOLAR?</span>
          </h2>
          <p className="font-sans font-light text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Nossa equipe está ansiosa para conhecer sua história e criar soluções que gerem impacto
            real.
          </p>
          <Link
            to="/"
            className="inline-block font-sans px-10 py-5 border border-harpia-white/20 hover:bg-harpia-accent hover:text-harpia-black transition-all duration-300 text-sm uppercase tracking-[0.2em]"
          >
            Voltar ao Início
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
