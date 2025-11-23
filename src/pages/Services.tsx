import React from 'react';
import { SERVICES } from '../data';
import { ServicesHero, ServiceDetail, ServicesStats, ServicesCTA } from '../components/services';
import { useMetaTags } from '../hooks/useMetaTags';

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

      {/* Services List Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-40">
            {SERVICES.map((service, index) => (
              <ServiceDetail key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ServicesStats />

      {/* CTA Section */}
      <ServicesCTA />
    </div>
  );
};
