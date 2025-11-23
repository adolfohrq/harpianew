import React from 'react';
import { Quote } from 'lucide-react';
import { Reveal } from '../Reveal';

export const ServicesManifesto: React.FC = () => {
  return (
    <section className="py-32 bg-harpia-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-harpia-gray/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-harpia-gray/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.4em] text-gray-500 mb-12 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              Nossa Filosofia
            </span>

            <div className="relative">
              {/* Decorative Quote Icon */}
              <Quote className="absolute -top-8 -left-4 md:-top-16 md:-left-20 w-12 h-12 md:w-32 md:h-32 text-harpia-gray/10 -scale-x-100" />

              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-tight text-harpia-white max-w-4xl mx-auto relative z-10">
                "Acreditamos que grandes marcas não são construídas apenas com{' '}
                <span className="italic text-gray-400 font-light">criatividade</span>, mas com{' '}
                <span className="italic text-gray-400 font-light">estratégia</span>,{' '}
                <span className="italic text-gray-400 font-light">consistência</span> e conexões{' '}
                <span className="italic text-gray-400 font-light">autênticas</span>."
              </h2>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
