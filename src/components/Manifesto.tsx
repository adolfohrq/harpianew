import React from 'react';
import { Reveal } from './Reveal';

export const Manifesto: React.FC = () => {
  return (
    <section className="py-24 bg-white relative border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <span className="block font-sans text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
            Manifesto
          </span>
          <h2 className="font-serif text-3xl md:text-4xl leading-relaxed text-harpia-black">
            "Todo mundo tem uma <span className="text-black italic">história</span> para contar. Nós
            acreditamos que cada história importa, e queremos ajudar o seu negócio a comunicar de
            forma <span className="text-black italic">efetiva</span> e{' '}
            <span className="text-black italic">relevante</span>."
          </h2>
        </Reveal>
      </div>
    </section>
  );
};
