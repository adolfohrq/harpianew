import React from 'react';
import { Reveal } from './Reveal';

// Placeholder logos - você pode substituir por logos reais dos clientes
const CLIENT_LOGOS = [
  { name: 'Cliente 1', width: 120 },
  { name: 'Cliente 2', width: 140 },
  { name: 'Cliente 3', width: 100 },
  { name: 'Cliente 4', width: 130 },
  { name: 'Cliente 5', width: 110 },
  { name: 'Cliente 6', width: 125 },
  { name: 'Cliente 7', width: 115 },
  { name: 'Cliente 8', width: 135 },
];

export const ClientLogos: React.FC = () => {
  return (
    <section className="py-24 bg-harpia-carbon relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="block font-sans text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Confiança
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-200">
              Empresas que <span className="text-white italic">Voam Conosco</span>
            </h2>
          </div>
        </Reveal>

        {/* Grid de Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {CLIENT_LOGOS.map((client, index) => (
            <Reveal key={client.name} delay={index * 50}>
              <div className="group flex items-center justify-center h-24 relative">
                {/* Placeholder para logo - substituir por <img> real */}
                <div
                  className="flex items-center justify-center bg-white/5 border border-white/10 rounded-lg p-6 w-full h-full grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 group-hover:border-white/30"
                  style={{ minWidth: `${client.width}px` }}
                >
                  <span className="font-sans text-xs text-gray-500 group-hover:text-white transition-colors uppercase tracking-wider">
                    {client.name}
                  </span>
                </div>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA Opcional */}
        <Reveal delay={400}>
          <div className="text-center mt-16">
            <p className="font-sans text-sm text-gray-500 uppercase tracking-wider">
              + Dezenas de outras empresas que confiam na nossa visão
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
