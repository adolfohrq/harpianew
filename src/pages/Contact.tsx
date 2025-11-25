import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { HeroSection } from '../components/ui';
import { ContactMain } from '../components/ContactMain';
import { CTASection } from '../components/CTASection';

export const Contact: React.FC = () => {
  useMetaTags({
    title: 'Contato - Harpia Agência',
    description: 'Entre em contato com a Harpia. Vamos transformar sua visão em realidade digital.',
    keywords: 'contato, orçamento, agência marketing',
  });

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        subtitle="Contato"
        title={
          <>
            VAMOS VOAR <br />
            <span className="italic text-white/40">JUNTOS?</span>
          </>
        }
        description="Transforme sua visão em realidade digital. Nossa equipe está pronta para elevar sua marca a novos patamares."
      />

      {/* Main Content Section */}
      <ContactMain />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
