import React from 'react';
import { Reveal } from './Reveal';
import { OptimizedImage } from './ui/OptimizedImage';
import { SectionHeader } from './ui';

interface ClientLogo {
  name: string;
  image: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Cliente 1', image: '/clients/1 (3).webp' },
  { name: 'Cliente 2', image: '/clients/1 (4).webp' },
  { name: 'Cliente 3', image: '/clients/1 (5).webp' },
  { name: 'Cliente 4', image: '/clients/1 (6).webp' },
  { name: 'Cliente 5', image: '/clients/1 (7).webp' },
  { name: 'Cliente 6', image: '/clients/1 (8).webp' },
  { name: 'Cliente 7', image: '/clients/1 (9).webp' },
  { name: 'Cliente 8', image: '/clients/1 (10).webp' },
  { name: 'Cliente 9', image: '/clients/1 (11).webp' },
  { name: 'Cliente 10', image: '/clients/1 (12).webp' },
];

export const ClientLogos: React.FC = () => {
  return (
    <section className="py-32 bg-white relative border-t border-black/5 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[120px] translate-y-1/2 animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          label="Confiança"
          title={
            <>
              EMPRESAS QUE <span className="italic text-gray-400">VOAM CONOSCO</span>
            </>
          }
          description="Parceiros que confiam em nossa visão estratégica e expertise em marketing digital para alcançar novos horizontes."
          align="center"
          titleSize="small"
          descriptionSize="default"
          descriptionMaxWidth="2xl"
          className="mb-20"
        />

        {/* Grid de Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {CLIENT_LOGOS.map((client, index) => (
            <Reveal key={client.name} delay={index * 50}>
              <div className="group flex items-center justify-center h-28 relative">
                {/* Logo Container */}
                <div className="flex items-center justify-center bg-gray-50/50 border border-gray-200/80 rounded-lg p-6 w-full h-full grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 group-hover:border-harpia-black group-hover:bg-white group-hover:shadow-lg">
                  <OptimizedImage
                    src={client.image}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                    width={150}
                    height={80}
                    loading="lazy"
                  />
                </div>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
