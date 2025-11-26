import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  useStructuredData,
  HARPIA_ORGANIZATION,
  createPageSchema,
  createServiceSchema,
  createPortfolioSchema,
} from './useStructuredData';

describe('useStructuredData', () => {
  const SCRIPT_ID = 'structured-data-script';

  beforeEach(() => {
    // Remove any existing script
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      existingScript.remove();
    }
  });

  afterEach(() => {
    const script = document.getElementById(SCRIPT_ID);
    if (script) {
      script.remove();
    }
  });

  it('should add JSON-LD script to document head', () => {
    renderHook(() =>
      useStructuredData({
        type: 'Organization',
        name: 'Test Org',
        url: 'https://example.com',
      })
    );

    const script = document.getElementById(SCRIPT_ID);
    expect(script).not.toBeNull();
    expect(script?.getAttribute('type')).toBe('application/ld+json');
  });

  it('should generate valid JSON-LD for Organization schema', () => {
    renderHook(() =>
      useStructuredData({
        type: 'Organization',
        name: 'Test Company',
        url: 'https://test.com',
        description: 'A test company',
      })
    );

    const script = document.getElementById(SCRIPT_ID);
    const jsonLd = JSON.parse(script?.textContent || '{}');

    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Organization');
    expect(jsonLd.name).toBe('Test Company');
    expect(jsonLd.url).toBe('https://test.com');
    expect(jsonLd.description).toBe('A test company');
  });

  it('should generate valid JSON-LD for WebPage schema', () => {
    renderHook(() =>
      useStructuredData({
        type: 'WebPage',
        name: 'About Us',
        description: 'About page description',
        url: 'https://test.com/about',
      })
    );

    const script = document.getElementById(SCRIPT_ID);
    const jsonLd = JSON.parse(script?.textContent || '{}');

    expect(jsonLd['@type']).toBe('WebPage');
    expect(jsonLd.name).toBe('About Us');
  });

  it('should generate valid JSON-LD for Service schema', () => {
    renderHook(() =>
      useStructuredData({
        type: 'Service',
        name: 'Marketing Digital',
        description: 'Complete digital marketing service',
        provider: 'Harpia Agência',
        serviceType: 'Marketing',
      })
    );

    const script = document.getElementById(SCRIPT_ID);
    const jsonLd = JSON.parse(script?.textContent || '{}');

    expect(jsonLd['@type']).toBe('Service');
    expect(jsonLd.name).toBe('Marketing Digital');
    expect(jsonLd.provider['@type']).toBe('Organization');
    expect(jsonLd.provider.name).toBe('Harpia Agência');
  });

  it('should generate valid JSON-LD for CreativeWork schema', () => {
    renderHook(() =>
      useStructuredData({
        type: 'CreativeWork',
        name: 'Portfolio Project',
        description: 'A sample project',
        creator: 'Harpia Agência',
        image: '/images/project.jpg',
        dateCreated: '2024-01-15',
      })
    );

    const script = document.getElementById(SCRIPT_ID);
    const jsonLd = JSON.parse(script?.textContent || '{}');

    expect(jsonLd['@type']).toBe('CreativeWork');
    expect(jsonLd.name).toBe('Portfolio Project');
    expect(jsonLd.creator.name).toBe('Harpia Agência');
  });

  it('should handle array of schemas', () => {
    renderHook(() =>
      useStructuredData([
        { type: 'Organization', name: 'Org', url: 'https://org.com' },
        { type: 'WebPage', name: 'Page', description: 'Desc', url: 'https://org.com/page' },
      ])
    );

    const script = document.getElementById(SCRIPT_ID);
    const jsonLd = JSON.parse(script?.textContent || '[]');

    expect(Array.isArray(jsonLd)).toBe(true);
    expect(jsonLd).toHaveLength(2);
    expect(jsonLd[0]['@type']).toBe('Organization');
    expect(jsonLd[1]['@type']).toBe('WebPage');
  });

  it('should remove previous script when data changes', () => {
    const { rerender } = renderHook(
      ({ name }) =>
        useStructuredData({
          type: 'Organization',
          name,
          url: 'https://test.com',
        }),
      {
        initialProps: { name: 'Initial Name' },
      }
    );

    rerender({ name: 'Updated Name' });

    const scripts = document.querySelectorAll(`#${SCRIPT_ID}`);
    expect(scripts.length).toBe(1);

    const jsonLd = JSON.parse(scripts[0].textContent || '{}');
    expect(jsonLd.name).toBe('Updated Name');
  });

  it('should cleanup script on unmount', () => {
    const { unmount } = renderHook(() =>
      useStructuredData({
        type: 'Organization',
        name: 'Test',
        url: 'https://test.com',
      })
    );

    expect(document.getElementById(SCRIPT_ID)).not.toBeNull();

    unmount();

    expect(document.getElementById(SCRIPT_ID)).toBeNull();
  });
});

describe('HARPIA_ORGANIZATION', () => {
  it('should have correct structure', () => {
    expect(HARPIA_ORGANIZATION.type).toBe('Organization');
    expect(HARPIA_ORGANIZATION.name).toBe('Agência Harpia');
    expect(HARPIA_ORGANIZATION.url).toBe('https://agenciaharpia.com.br');
  });

  it('should have contact information', () => {
    expect(HARPIA_ORGANIZATION.contactPoint).toBeDefined();
    expect(HARPIA_ORGANIZATION.contactPoint?.email).toBeDefined();
    expect(HARPIA_ORGANIZATION.contactPoint?.telephone).toBeDefined();
  });

  it('should have address information', () => {
    expect(HARPIA_ORGANIZATION.address).toBeDefined();
    expect(HARPIA_ORGANIZATION.address?.addressLocality).toBe('Tubarão');
    expect(HARPIA_ORGANIZATION.address?.addressRegion).toBe('SC');
  });

  it('should have social media links', () => {
    expect(HARPIA_ORGANIZATION.sameAs).toBeDefined();
    expect(Array.isArray(HARPIA_ORGANIZATION.sameAs)).toBe(true);
  });
});

describe('createPageSchema', () => {
  it('should create WebPage schema', () => {
    const schema = createPageSchema('Services', 'Our services description', '/servicos');

    expect(schema.type).toBe('WebPage');
    expect(schema.name).toBe('Services');
    expect(schema.description).toBe('Our services description');
    expect(schema.url).toBe('https://agenciaharpia.com.br/servicos');
  });

  it('should include breadcrumb when provided', () => {
    const schema = createPageSchema('Services', 'Description', '/servicos', [
      { name: 'Services', path: '/servicos' },
    ]);

    expect(schema.breadcrumb).toBeDefined();
    expect(schema.breadcrumb?.type).toBe('BreadcrumbList');
    expect(schema.breadcrumb?.items).toHaveLength(2); // Home + Services
  });
});

describe('createServiceSchema', () => {
  it('should create Service schema', () => {
    const schema = createServiceSchema('Branding', 'Complete branding service', 'Marketing');

    expect(schema.type).toBe('Service');
    expect(schema.name).toBe('Branding');
    expect(schema.description).toBe('Complete branding service');
    expect(schema.provider).toBe('Agência Harpia');
    expect(schema.serviceType).toBe('Marketing');
    expect(schema.areaServed).toBe('Brasil');
  });
});

describe('createPortfolioSchema', () => {
  it('should create CreativeWork schema', () => {
    const schema = createPortfolioSchema(
      'Project X',
      'Project description',
      '/images/project.jpg',
      '2024'
    );

    expect(schema.type).toBe('CreativeWork');
    expect(schema.name).toBe('Project X');
    expect(schema.description).toBe('Project description');
    expect(schema.creator).toBe('Agência Harpia');
    expect(schema.image).toBe('/images/project.jpg');
    expect(schema.dateCreated).toBe('2024');
  });
});
