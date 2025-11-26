import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent, analytics } from './useAnalytics';

describe('useAnalytics', () => {
  let mockGtag: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGtag = vi.fn();
    window.gtag = mockGtag;
    window.dataLayer = [];
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // @ts-expect-error - cleaning up mock
    delete window.gtag;
  });

  describe('trackEvent', () => {
    it('should call gtag with event command', () => {
      trackEvent('test_event');

      expect(mockGtag).toHaveBeenCalledWith('event', 'test_event', undefined);
    });

    it('should pass params to gtag', () => {
      trackEvent('click', { button_name: 'submit', location: 'header' });

      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        button_name: 'submit',
        location: 'header',
      });
    });

    it('should not throw when gtag is not available', () => {
      // @ts-expect-error - testing undefined gtag
      delete window.gtag;

      expect(() => trackEvent('test_event')).not.toThrow();
    });

    it('should not call gtag when it is not a function', () => {
      // @ts-expect-error - testing non-function gtag
      window.gtag = 'not a function';

      expect(() => trackEvent('test_event')).not.toThrow();
    });
  });

  describe('analytics helpers', () => {
    it('should track contact form start', () => {
      analytics.contactFormStart();

      expect(mockGtag).toHaveBeenCalledWith('event', 'form_start', {
        form_name: 'contact',
      });
    });

    it('should track contact form submit', () => {
      analytics.contactFormSubmit();

      expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit', {
        form_name: 'contact',
      });
    });

    it('should track CTA click with name and location', () => {
      analytics.ctaClick('hero_button', 'homepage');

      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', {
        cta_name: 'hero_button',
        cta_location: 'homepage',
      });
    });

    it('should track portfolio view with project name', () => {
      analytics.portfolioView('Projeto ABC');

      expect(mockGtag).toHaveBeenCalledWith('event', 'portfolio_view', {
        project_name: 'Projeto ABC',
      });
    });

    it('should track WhatsApp click with source', () => {
      analytics.whatsappClick('footer');

      expect(mockGtag).toHaveBeenCalledWith('event', 'whatsapp_click', {
        click_source: 'footer',
      });
    });

    it('should track social click with platform', () => {
      analytics.socialClick('instagram');

      expect(mockGtag).toHaveBeenCalledWith('event', 'social_click', {
        platform: 'instagram',
      });
    });

    it('should track section view', () => {
      analytics.sectionView('services');

      expect(mockGtag).toHaveBeenCalledWith('event', 'section_view', {
        section_name: 'services',
      });
    });
  });
});
