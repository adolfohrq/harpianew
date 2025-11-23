import React from 'react';
import { Reveal } from './Reveal';

export const Manifesto: React.FC = () => {
  return (
    <section className="py-24 bg-harpia-black relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <span className="block font-sans text-xs uppercase tracking-[0.3em] text-harpia-accent mb-6">
            Manifesto
          </span>
          <h2 className="font-serif text-3xl md:text-4xl leading-relaxed text-harpia-white">
            "Todo mundo tem uma <span className="text-harpia-accent italic">história</span> para
            contar. Nós acreditamos que cada história importa, e queremos ajudar o seu negócio a
            comunicar de forma <span className="text-harpia-accent italic">efetiva</span> e{' '}
            <span className="text-harpia-accent italic">relevante</span>."
          </h2>
        </Reveal>
      </div>
    </section>
  );
};
