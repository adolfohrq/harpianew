import React from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import {
  useStructuredData,
  HARPIA_ORGANIZATION,
  createPageSchema,
} from '@/hooks/useStructuredData';
import { PAGE_SEO, getKeywords, getCanonicalUrl } from '@/config/seo.config';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HeroSection } from '@/components/ui';
import { AboutStatement } from '@/components/AboutStatement';
import { AboutPillars } from '@/components/AboutPillars';
import { AboutTimeline } from '@/components/AboutTimeline';
import { AboutFeatures } from '@/components/AboutFeatures';
import { CTASection } from '@/components';

export const AboutPage: React.FC = () => {
  useMetaTags({
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    keywords: getKeywords(PAGE_SEO.about.keywords),
    ogImage: PAGE_SEO.about.ogImage,
    canonical: getCanonicalUrl('/sobre'),
  });

  useStructuredData([
    HARPIA_ORGANIZATION,
    createPageSchema(PAGE_SEO.about.title, PAGE_SEO.about.description, '/sobre', [
      { name: 'Sobre', path: '/sobre' },
    ]),
  ]);

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Sobre' }]}
        subtitle="Nossa História"
        title={
          <>
            Mais que uma <span className="italic text-white/40">agência</span>.
            <br />
            Uma <span className="italic text-white/30">parceria</span> de voo.
          </>
        }
        description="Transformamos visões em realidades extraordinárias. Desde 2019, ajudamos marcas a decolar, enxergar mais longe e conquistar altitudes inimagináveis."
      />

      {/* Statement Section */}
      <AboutStatement />

      {/* 4 Pillars Section */}
      <ErrorBoundary sectionName="diferenciais">
        <AboutPillars />
      </ErrorBoundary>

      {/* Timeline Section */}
      <ErrorBoundary sectionName="jornada">
        <AboutTimeline />
      </ErrorBoundary>

      {/* Features Section */}
      <ErrorBoundary sectionName="por-que-harpia">
        <AboutFeatures />
      </ErrorBoundary>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
