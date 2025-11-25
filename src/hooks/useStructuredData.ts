import { useEffect } from 'react';
import { COMPANY_INFO, CONTACT_INFO, getSocialUrls } from '../config/seo.config';

// Schema.org types para a agência
interface OrganizationSchema {
  type: 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
  sameAs?: string[];
}

interface WebPageSchema {
  type: 'WebPage';
  name: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbSchema;
}

interface ServiceSchema {
  type: 'Service';
  name: string;
  description: string;
  provider: string;
  serviceType?: string;
  areaServed?: string;
}

interface CreativeWorkSchema {
  type: 'CreativeWork';
  name: string;
  description: string;
  creator: string;
  image?: string;
  dateCreated?: string;
}

interface BreadcrumbSchema {
  type: 'BreadcrumbList';
  items: Array<{
    name: string;
    url: string;
  }>;
}

type StructuredDataType =
  | OrganizationSchema
  | WebPageSchema
  | ServiceSchema
  | CreativeWorkSchema
  | BreadcrumbSchema;

const SCRIPT_ID = 'structured-data-script';

/**
 * Converte o schema interno para formato JSON-LD do Schema.org
 */
const toJsonLd = (data: StructuredDataType): object => {
  const baseContext = { '@context': 'https://schema.org' };

  switch (data.type) {
    case 'Organization':
      return {
        ...baseContext,
        '@type': 'Organization',
        name: data.name,
        url: data.url,
        logo: data.logo,
        description: data.description,
        address: data.address
          ? {
              '@type': 'PostalAddress',
              ...data.address,
            }
          : undefined,
        contactPoint: data.contactPoint
          ? {
              '@type': 'ContactPoint',
              ...data.contactPoint,
            }
          : undefined,
        sameAs: data.sameAs,
      };

    case 'WebPage':
      return {
        ...baseContext,
        '@type': 'WebPage',
        name: data.name,
        description: data.description,
        url: data.url,
        breadcrumb: data.breadcrumb ? toJsonLd(data.breadcrumb) : undefined,
      };

    case 'Service':
      return {
        ...baseContext,
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: data.provider,
        },
        serviceType: data.serviceType,
        areaServed: data.areaServed,
      };

    case 'CreativeWork':
      return {
        ...baseContext,
        '@type': 'CreativeWork',
        name: data.name,
        description: data.description,
        creator: {
          '@type': 'Organization',
          name: data.creator,
        },
        image: data.image,
        dateCreated: data.dateCreated,
      };

    case 'BreadcrumbList':
      return {
        ...baseContext,
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return baseContext;
  }
};

/**
 * Hook para adicionar Structured Data (Schema.org) via JSON-LD
 *
 * @example
 * // Página de serviços
 * useStructuredData({
 *   type: 'Service',
 *   name: 'Marketing Digital',
 *   description: 'Serviço de marketing digital completo',
 *   provider: 'Harpia Agência',
 * });
 *
 * @example
 * // Página de portfolio
 * useStructuredData({
 *   type: 'CreativeWork',
 *   name: 'Projeto XYZ',
 *   description: 'Descrição do projeto',
 *   creator: 'Harpia Agência',
 * });
 */
export const useStructuredData = (data: StructuredDataType | StructuredDataType[]) => {
  useEffect(() => {
    // Remove script anterior
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      existingScript.remove();
    }

    // Cria novo script com JSON-LD
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';

    // Suporta array de schemas
    const schemas = Array.isArray(data) ? data.map(toJsonLd) : toJsonLd(data);
    script.textContent = JSON.stringify(Array.isArray(data) ? schemas : schemas);

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(SCRIPT_ID);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);
};

/**
 * Schema pré-configurado da organização Harpia (usando configuração centralizada)
 */
export const HARPIA_ORGANIZATION: OrganizationSchema = {
  type: 'Organization',
  name: COMPANY_INFO.name,
  url: COMPANY_INFO.url,
  logo: `${COMPANY_INFO.url}${COMPANY_INFO.logo}`,
  description: COMPANY_INFO.description,
  address: {
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.city,
    addressRegion: CONTACT_INFO.address.state,
    postalCode: CONTACT_INFO.address.postalCode,
    addressCountry: CONTACT_INFO.address.country,
  },
  contactPoint: {
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    contactType: 'customer service',
  },
  sameAs: getSocialUrls(),
};

/**
 * Helper para criar schema de página
 */
export const createPageSchema = (
  name: string,
  description: string,
  path: string,
  breadcrumbItems?: Array<{ name: string; path: string }>
): WebPageSchema => ({
  type: 'WebPage',
  name,
  description,
  url: `${COMPANY_INFO.url}${path}`,
  breadcrumb: breadcrumbItems
    ? {
        type: 'BreadcrumbList',
        items: [
          { name: 'Home', url: COMPANY_INFO.url },
          ...breadcrumbItems.map((item) => ({
            name: item.name,
            url: `${COMPANY_INFO.url}${item.path}`,
          })),
        ],
      }
    : undefined,
});

/**
 * Helper para criar schema de serviço
 */
export const createServiceSchema = (
  name: string,
  description: string,
  serviceType?: string
): ServiceSchema => ({
  type: 'Service',
  name,
  description,
  provider: COMPANY_INFO.name,
  serviceType,
  areaServed: 'Brasil',
});

/**
 * Helper para criar schema de trabalho criativo (portfolio)
 */
export const createPortfolioSchema = (
  name: string,
  description: string,
  image?: string,
  dateCreated?: string
): CreativeWorkSchema => ({
  type: 'CreativeWork',
  name,
  description,
  creator: COMPANY_INFO.name,
  image,
  dateCreated,
});

export type {
  OrganizationSchema,
  WebPageSchema,
  ServiceSchema,
  CreativeWorkSchema,
  BreadcrumbSchema,
  StructuredDataType,
};
