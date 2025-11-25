import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { HeroSection } from '../components/ui/HeroSection';
import { AboutStatement } from '../components/AboutStatement';
import { AboutPillars } from '../components/AboutPillars';
import { AboutTimeline } from '../components/AboutTimeline';
import { AboutFeatures } from '../components/AboutFeatures';
import { CTASection } from '../components/CTASection';

export const AboutPage: React.FC = () => {
  useMetaTags({
    title: 'Sobre Nós - Harpia | Agência de Marketing Premium',
    description:
      'Conheça a Harpia. Somos mais que uma agência - somos seus parceiros na transformação digital e no voo extraordinário da sua marca.',
    keywords: 'sobre harpia, agência marketing, nossa história, missão, visão, valores',
    ogTitle: 'Sobre Nós - Harpia',
    ogDescription: 'Conectando visões. Voando mais alto. Enxergando mais longe.',
    canonical: `${window.location.origin}/#/sobre`,
  });

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
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
