import React from 'react';
import { ContactInfo, ContactForm, ContactCTA } from '../components/contact';
import { HeroSection } from '../components/ui';
import { useMetaTags } from '../hooks/useMetaTags';

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
        subtitle="CONTATO"
        title={
          <>
            VAMOS VOAR <br />
            <span className="italic text-white/40">JUNTOS?</span>
          </>
        }
        description="Transforme sua visão em realidade digital. Nossa equipe está pronta para elevar sua marca a novos patamares."
      />

      {/* Main Content Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gray-100 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gray-50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Left: Contact Info */}
            <ContactInfo />

            {/* Right: Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <ContactCTA />
    </div>
  );
};
