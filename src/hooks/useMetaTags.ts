import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export const useMetaTags = ({
  title,
  description,
  keywords = 'harpia, agência, marketing, digital',
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
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

    // Set Open Graph tags for social sharing
    setMetaProperty('og:title', ogTitle || title);
    setMetaProperty('og:description', ogDescription || description);
    if (ogImage) {
      setMetaProperty('og:image', ogImage);
    }
    setMetaProperty('og:type', 'website');

    // Set canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    return () => {
      // Cleanup is optional - meta tags can persist
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical]);
};
