import React from 'react';
import { SERVICES } from '../data';
import {
  ServicesHero,
  ServiceDetail,
  ServicesManifesto,
  ServicesStats,
  ServicesCTA,
} from '../components/services';
import { useMetaTags } from '../hooks/useMetaTags';
import { Marquee } from '../components/Marquee';

export const Services: React.FC = () => {
  useMetaTags({
    title: 'Serviços - Harpia Agência',
    description:
      'Fotografia, Branding, Conteúdo e Marketing Digital. Soluções completas para elevar sua marca.',
    keywords: 'fotografia, branding, design, marketing digital, conteúdo',
  });

  return (
    <div className="w-full relative bg-harpia-black">
      {/* Hero Section */}
      <ServicesHero />

      {/* Manifesto Section */}
      <ServicesManifesto />

      {/* Services List Section */}
      <section className="py-32 relative bg-harpia-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {SERVICES.map((service, index) => (
              <ServiceDetail key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <Marquee
        items={['Photography', 'Branding', 'Content', 'Marketing', 'Strategy', 'Design', 'Growth']}
      />

      {/* Stats Section */}
      <ServicesStats />

      {/* CTA Section */}
      <ServicesCTA />
    </div>
  );
};
