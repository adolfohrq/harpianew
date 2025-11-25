import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { HeroSection } from '../components/ui';
import { PortfolioPreview } from '../components/PortfolioPreview';
import { ClientLogos } from '../components/ClientLogos';
import { CTASection } from '../components/CTASection';

export const Portfolio: React.FC = () => {
  useMetaTags({
    title: 'Portfólio - Harpia Agência',
    description:
      'Conheça nossos projetos. Cases de sucesso em fotografia, branding, design e marketing digital.',
    keywords: 'portfolio, projetos, cases, fotografia, branding, design, marketing digital',
  });

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        subtitle="Nossos Trabalhos"
        title={
          <>
            PORTFÓLIO <br />
            <span className="italic text-white/40">COMPLETO</span>
          </>
        }
        description="Uma seleção curada de projetos que definem nossa visão de excelência. Cada trabalho representa nossa dedicação em transformar marcas em referências de mercado."
      />

      {/* Portfolio Grid */}
      <PortfolioPreview showAllProjects />

      {/* Client Logos */}
      <ClientLogos />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
