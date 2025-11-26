import React from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import {
  useStructuredData,
  HARPIA_ORGANIZATION,
  createPageSchema,
} from '@/hooks/useStructuredData';
import { PAGE_SEO, getKeywords, getCanonicalUrl } from '@/config/seo.config';
import { HeroSection } from '@/components/ui';
import { ContactMain, CTASection } from '@/components';

export const Contact: React.FC = () => {
  useMetaTags({
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
    keywords: getKeywords(PAGE_SEO.contact.keywords),
    ogImage: PAGE_SEO.contact.ogImage,
    canonical: getCanonicalUrl('/contato'),
  });

  useStructuredData([
    HARPIA_ORGANIZATION,
    createPageSchema(PAGE_SEO.contact.title, PAGE_SEO.contact.description, '/contato', [
      { name: 'Contato', path: '/contato' },
    ]),
  ]);

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contato' }]}
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
