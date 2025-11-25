import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import {
  useStructuredData,
  createPageSchema,
  createServiceSchema,
} from '../hooks/useStructuredData';
import { HeroSection } from '../components/ui';
import { ServicesGrid, ServicesBenefits, ServicesStats } from '../components/services';
import { CTASection } from '../components/CTASection';

const BASE_URL = 'https://agenciaharpia.com.br';

export const Services: React.FC = () => {
  useMetaTags({
    title: 'Serviços - Harpia Agência',
    description:
      'Fotografia, Branding, Conteúdo e Marketing Digital. Soluções completas para elevar sua marca.',
    keywords: 'fotografia, branding, design, marketing digital, conteúdo',
    ogImage: '/og/servicos.jpg',
    canonical: `${BASE_URL}/servicos`,
  });

  // Structured Data para a página de serviços
  useStructuredData([
    createPageSchema(
      'Serviços - Harpia Agência',
      'Serviços de fotografia, branding, conteúdo e marketing digital.',
      '/servicos',
      [{ name: 'Serviços', path: '/servicos' }]
    ),
    createServiceSchema('Fotografia Profissional', 'Fotografia de alta qualidade para sua marca.'),
    createServiceSchema(
      'Branding',
      'Desenvolvimento de identidade visual e posicionamento de marca.'
    ),
    createServiceSchema('Marketing Digital', 'Estratégias digitais para crescimento online.'),
  ]);

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
