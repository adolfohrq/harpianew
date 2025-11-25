import { useEffect } from 'react';
import { COMPANY_INFO, GLOBAL_KEYWORDS, getOgImageUrl } from '../config/seo.config';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  canonical?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
}

/**
 * Hook para gerenciar meta tags de SEO
 *
 * @example
 * useMetaTags({
 *   title: 'Serviços | Harpia Agência',
 *   description: 'Nossos serviços de marketing digital',
 *   ogImage: '/og/services.jpg',
 *   canonical: 'https://agenciaharpia.com.br/servicos',
 * });
 */
export const useMetaTags = ({
  title,
  description,
  keywords = GLOBAL_KEYWORDS.join(', '),
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  canonical,
  twitterCard = 'summary_large_image',
  noindex = false,
}: MetaTagsProps) => {
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper function to set meta tags
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setMetaProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Set standard meta tags
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Robots meta tag
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      setMetaTag('robots', 'index, follow');
    }

    // Resolve OG image URL (relative to absolute)
    const resolvedOgImage = getOgImageUrl(ogImage);

    // Set Open Graph tags for social sharing
    setMetaProperty('og:title', ogTitle || title);
    setMetaProperty('og:description', ogDescription || description);
    setMetaProperty('og:image', resolvedOgImage);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:site_name', COMPANY_INFO.name);
    setMetaProperty('og:locale', COMPANY_INFO.locale);

    // Set canonical URL and og:url
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
      setMetaProperty('og:url', canonical);
    }

    // Twitter Card meta tags
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);
    setMetaTag('twitter:image', resolvedOgImage);

    return () => {
      // Cleanup is optional - meta tags can persist
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    canonical,
    twitterCard,
    noindex,
  ]);
};
