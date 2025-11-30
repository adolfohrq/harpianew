/**
 * Configurações da API WordPress
 * @description Configuração centralizada para comunicação com o CMS headless
 */

export const API_CONFIG = {
  /**
   * URL base do WordPress
   * Em desenvolvimento: http://localhost:8080
   * Em produção: https://cms.agenciaharpia.com.br
   */
  baseUrl: import.meta.env.VITE_WP_API_URL || 'https://cms.agenciaharpia.com.br',

  /**
   * Endpoints da API
   */
  endpoints: {
    /** Lista todos os projetos */
    projects: '/wp-json/harpia/v1/projects',

    /** Busca projeto por slug */
    projectBySlug: (slug: string) => `/wp-json/harpia/v1/projects/${slug}`,

    /** Lista categorias de projeto */
    categories: '/wp-json/wp/v2/project-categories',
  },

  /**
   * Configurações de cache (em milissegundos)
   */
  cache: {
    /** Cache para lista de projetos: 5 minutos */
    projects: 5 * 60 * 1000,

    /** Cache para projeto individual: 10 minutos */
    singleProject: 10 * 60 * 1000,

    /** Cache para categorias: 30 minutos */
    categories: 30 * 60 * 1000,
  },

  /**
   * Usar dados estáticos como fallback em caso de erro
   */
  useFallback: true,

  /**
   * Timeout para requisições (em milissegundos)
   */
  timeout: 10000,
} as const;

/**
 * Verifica se está em ambiente de desenvolvimento
 */
export const isDevelopment = import.meta.env.DEV;

/**
 * Verifica se a API WordPress está configurada
 */
export const isWordPressConfigured = (): boolean => {
  return !!import.meta.env.VITE_WP_API_URL;
};
