import React from 'react';
import { Testimonials } from '../components/Testimonials';
import { Marquee } from '../components/Marquee';
import { Process } from '../components/Process';
import { Showreel } from '../components/Showreel';
import { Stats } from '../components/Stats';
import { WhyHarpia } from '../components/WhyHarpia';
import { ClientLogos } from '../components/ClientLogos';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useMetaTags } from '../hooks/useMetaTags';
import { Hero } from '../components/Hero';
import { Manifesto } from '../components/Manifesto';
import { ServicesHub } from '../components/ServicesHub';
import { PortfolioPreview } from '../components/PortfolioPreview';
import { CTASection } from '../components/CTASection';

export const Home: React.FC = () => {
  useMetaTags({
    title: 'Harpia - Agência de Marketing Premium | Conectando Visões',
    description:
      'Somos uma agência de marketing especializada em criar pontes entre empresas e seus clientes. Estratégia, design e tecnologia para impactar seu negócio.',
    keywords: 'agência marketing, design digital, branding, estratégia, digital agency',
    ogTitle: 'Harpia - Agência de Marketing Premium',
    ogDescription: 'Conectando visões. Voando mais alto. Enxergando mais longe.',
    canonical: window.location.origin,
  });

  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <Hero />

      {/* Manifesto Section */}
      <Manifesto />

      {/* Stats Section */}
      <ErrorBoundary sectionName="estatísticas">
        <Stats />
      </ErrorBoundary>

      {/* Why Harpia Section */}
      <ErrorBoundary sectionName="diferenciais">
        <WhyHarpia />
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
