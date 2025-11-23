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
    <div className="w-full relative bg-harpia-black">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
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
