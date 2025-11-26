import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useMetaTags } from './useMetaTags';

describe('useMetaTags', () => {
  // Store original head content
  let originalHead: string;

  beforeEach(() => {
    originalHead = document.head.innerHTML;
  });

  afterEach(() => {
    document.head.innerHTML = originalHead;
  });

  it('should set document title', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Test Page | Harpia',
        description: 'Test description',
      })
    );

    expect(document.title).toBe('Test Page | Harpia');
  });

  it('should set meta description', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Test Page',
        description: 'This is a test description',
      })
    );

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('This is a test description');
  });

  it('should set keywords meta tag', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Test Page',
        description: 'Test description',
        keywords: 'marketing, digital, branding',
      })
    );

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords?.getAttribute('content')).toBe('marketing, digital, branding');
  });

  it('should set Open Graph tags', () => {
    renderHook(() =>
      useMetaTags({
        title: 'OG Test',
        description: 'OG Description',
        ogTitle: 'Custom OG Title',
        ogDescription: 'Custom OG Description',
      })
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    expect(ogTitle?.getAttribute('content')).toBe('Custom OG Title');
    expect(ogDescription?.getAttribute('content')).toBe('Custom OG Description');
  });

  it('should use title as fallback for ogTitle', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Fallback Title',
        description: 'Test description',
      })
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Fallback Title');
  });

  it('should set canonical URL', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Test Page',
        description: 'Test description',
        canonical: 'https://agenciaharpia.com.br/test',
      })
    );

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    expect(canonicalLink?.getAttribute('href')).toBe('https://agenciaharpia.com.br/test');
    expect(ogUrl?.getAttribute('content')).toBe('https://agenciaharpia.com.br/test');
  });

  it('should set noindex when specified', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Private Page',
        description: 'This page should not be indexed',
        noindex: true,
      })
    );

    const robotsMeta = document.querySelector('meta[name="robots"]');
    expect(robotsMeta?.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('should set index, follow by default', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Public Page',
        description: 'This page should be indexed',
      })
    );

    const robotsMeta = document.querySelector('meta[name="robots"]');
    expect(robotsMeta?.getAttribute('content')).toBe('index, follow');
  });

  it('should set Twitter Card meta tags', () => {
    renderHook(() =>
      useMetaTags({
        title: 'Twitter Test',
        description: 'Twitter description',
        twitterCard: 'summary_large_image',
      })
    );

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');

    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
    expect(twitterTitle?.getAttribute('content')).toBe('Twitter Test');
  });

  it('should update meta tags when props change', () => {
    const { rerender } = renderHook(
      ({ title, description }) => useMetaTags({ title, description }),
      {
        initialProps: { title: 'Initial Title', description: 'Initial description' },
      }
    );

    expect(document.title).toBe('Initial Title');

    rerender({ title: 'Updated Title', description: 'Updated description' });

    expect(document.title).toBe('Updated Title');
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('Updated description');
  });
});
