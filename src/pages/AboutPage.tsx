import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { ErrorBoundary } from '../components/ErrorBoundary';
import {
  AboutHero,
  AboutStatement,
  AboutPillars,
  AboutTimeline,
  AboutFeatures,
  AboutCTA,
} from '../components/about';

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
      <AboutHero />

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
      <AboutCTA />
    </div>
  );
};
