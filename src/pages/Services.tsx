import React from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import {
  useStructuredData,
  HARPIA_ORGANIZATION,
  createPageSchema,
  createServiceSchema,
} from '@/hooks/useStructuredData';
import { PAGE_SEO, getKeywords, getCanonicalUrl } from '@/config/seo.config';
import { HeroSection } from '@/components/ui';
import { ServicesGrid, ServicesBenefits, ServicesStats } from '@/components/services';
import { CTASection } from '@/components';

export const Services: React.FC = () => {
  useMetaTags({
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
    keywords: getKeywords(PAGE_SEO.services.keywords),
    ogImage: PAGE_SEO.services.ogImage,
    canonical: getCanonicalUrl('/servicos'),
  });

  useStructuredData([
    HARPIA_ORGANIZATION,
    createPageSchema(PAGE_SEO.services.title, PAGE_SEO.services.description, '/servicos', [
      { name: 'Serviços', path: '/servicos' },
    ]),
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
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Serviços' }]}
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
