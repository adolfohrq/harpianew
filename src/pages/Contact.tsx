import React from 'react';
import { ContactHero, ContactInfo, ContactForm, ContactCTA } from '../components/contact';
import { useMetaTags } from '../hooks/useMetaTags';

export const Contact: React.FC = () => {
  useMetaTags({
    title: 'Contato - Harpia Agência',
    description: 'Entre em contato com a Harpia. Vamos transformar sua visão em realidade digital.',
    keywords: 'contato, orçamento, agência marketing',
  });

  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content Section */}
      <section className="py-32 bg-harpia-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-harpia-gray/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-harpia-gray/10 rounded-full blur-[100px]" />
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
