import React from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useStructuredData, HARPIA_ORGANIZATION } from '@/hooks/useStructuredData';
import { PAGE_SEO, getKeywords, getCanonicalUrl, COMPANY_INFO } from '@/config/seo.config';
import {
  Testimonials,
  Marquee,
  Process,
  Showreel,
  Stats,
  WhyHarpia,
  ClientLogos,
  Hero,
  Manifesto,
  ServicesHub,
  PortfolioPreview,
  CTASection,
} from '@/components';
import { ErrorBoundary } from '@/components/ui';

export const Home: React.FC = () => {
  useMetaTags({
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    keywords: getKeywords(PAGE_SEO.home.keywords),
    ogTitle: PAGE_SEO.home.ogTitle,
    ogDescription: PAGE_SEO.home.ogDescription,
    ogImage: PAGE_SEO.home.ogImage,
    canonical: getCanonicalUrl('/'),
  });

  // Structured Data para a página inicial
  useStructuredData([
    HARPIA_ORGANIZATION,
    {
      type: 'WebPage',
      name: 'Harpia Agência - Home',
      description: COMPANY_INFO.description,
      url: COMPANY_INFO.url,
    },
  ]);

  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <Hero />

      {/* Manifesto Section */}
      <Manifesto />

      {/* Why Harpia Section */}
      <ErrorBoundary sectionName="diferenciais">
        <WhyHarpia />
      </ErrorBoundary>

      {/* Stats Section */}
      <ErrorBoundary sectionName="estatísticas">
        <Stats />
      </ErrorBoundary>

      {/* Services Hub Preview */}
      <ServicesHub />

      {/* Showreel Section */}
      <ErrorBoundary sectionName="showreel">
        <Showreel />
      </ErrorBoundary>

      {/* Infinite Marquee */}
      <ErrorBoundary sectionName="marquee">
        <Marquee
          items={[
            'Estratégia',
            'Visão',
            'Posicionamento',
            'Autoridade',
            'Impacto',
            'Propósito',
            'Performance',
          ]}
        />
      </ErrorBoundary>

      {/* Process / Methodology Section */}
      <ErrorBoundary sectionName="processo">
        <Process />
      </ErrorBoundary>

      {/* Portfolio Preview */}
      <PortfolioPreview />

      {/* Client Logos Section */}
      <ErrorBoundary sectionName="logos de clientes">
        <ClientLogos />
      </ErrorBoundary>

      {/* Testimonials Section */}
      <ErrorBoundary sectionName="depoimentos">
        <Testimonials />
      </ErrorBoundary>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
