import React from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import {
  useStructuredData,
  HARPIA_ORGANIZATION,
  createPageSchema,
} from '@/hooks/useStructuredData';
import { PAGE_SEO, getKeywords, getCanonicalUrl } from '@/config/seo.config';
import { HeroSection } from '@/components/ui';
import { PortfolioPreview } from '@/components/PortfolioPreview';
import { ClientLogos } from '@/components/ClientLogos';
import { CTASection } from '@/components';

export const Portfolio: React.FC = () => {
  useMetaTags({
    title: PAGE_SEO.portfolio.title,
    description: PAGE_SEO.portfolio.description,
    keywords: getKeywords(PAGE_SEO.portfolio.keywords),
    ogImage: PAGE_SEO.portfolio.ogImage,
    canonical: getCanonicalUrl('/portfolio'),
  });

  useStructuredData([
    HARPIA_ORGANIZATION,
    createPageSchema(PAGE_SEO.portfolio.title, PAGE_SEO.portfolio.description, '/portfolio', [
      { name: 'Portfólio', path: '/portfolio' },
    ]),
  ]);

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Portfólio' }]}
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
