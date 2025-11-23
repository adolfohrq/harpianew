import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

export const CTASection: React.FC = () => {
  return (
    <section className="py-32 relative bg-harpia-carbon overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <h2 className="font-serif text-5xl md:text-7xl mb-8">VAMOS VOAR JUNTOS?</h2>
          <Link
            to="/contato"
            className="inline-block font-sans px-10 py-5 border border-harpia-white/20 hover:bg-harpia-accent hover:text-harpia-black transition-all duration-300 text-sm uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-harpia-accent focus:ring-offset-2 focus:ring-offset-harpia-carbon"
          >
            Iniciar Projeto
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
