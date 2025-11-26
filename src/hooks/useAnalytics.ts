import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-NSQ9LPFYZQ';

// Declaração do tipo para o gtag global
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Hook para rastreamento de pageviews com React Router
 * Envia automaticamente um evento de pageview a cada mudança de rota
 */
export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
};

/**
 * Envia um evento customizado para o Google Analytics
 * @param eventName - Nome do evento (ex: 'form_submit', 'button_click')
 * @param params - Parâmetros adicionais do evento
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
): void => {
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, params);
};

// Eventos pré-definidos para o projeto Harpia
export const analytics = {
  // Formulário de contato
  contactFormStart: () => trackEvent('form_start', { form_name: 'contact' }),
  contactFormSubmit: () => trackEvent('form_submit', { form_name: 'contact' }),

  // Cliques em CTAs
  ctaClick: (ctaName: string, location: string) =>
    trackEvent('cta_click', { cta_name: ctaName, cta_location: location }),

  // Visualização de portfólio
  portfolioView: (projectName: string) =>
    trackEvent('portfolio_view', { project_name: projectName }),

  // Clique em WhatsApp
  whatsappClick: (source: string) => trackEvent('whatsapp_click', { click_source: source }),

  // Clique em redes sociais
  socialClick: (platform: string) => trackEvent('social_click', { platform }),

  // Scroll depth (para seções importantes)
  sectionView: (sectionName: string) => trackEvent('section_view', { section_name: sectionName }),
};
