import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { HeroSection } from '../components/ui';
import { ServicesGrid, ServicesBenefits, ServicesStats } from '../components/services';
import { CTASection } from '../components/CTASection';

export const Services: React.FC = () => {
  useMetaTags({
    title: 'Serviços - Harpia Agência',
    description:
      'Fotografia, Branding, Conteúdo e Marketing Digital. Soluções completas para elevar sua marca.',
    keywords: 'fotografia, branding, design, marketing digital, conteúdo',
  });

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        subtitle="Excelência em Cada Detalhe"
        title={
          <>
            SERVIÇOS QUE <br />
            <span className="italic text-white/40">ELEVAM SUA MARCA</span>
          </>
        }
        description="Combinamos estética refinada, estratégia de dados e execução impecável para criar experiências que transformam marcas em referências de mercado."
      />

      {/* Services Grid */}
      <ServicesGrid />

      {/* Benefits Section */}
      <ServicesBenefits />

      {/* Stats Section */}
      <ServicesStats />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
