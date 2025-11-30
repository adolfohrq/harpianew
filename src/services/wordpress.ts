/**
 * Serviço de comunicação com a API WordPress
 * @description Cliente HTTP para buscar projetos do CMS headless
 */

import { Project, ProjectResult } from '@/types';
import { API_CONFIG } from '@/config/api.config';

/**
 * Cache em memória para reduzir requisições
 */
const cache = new Map<string, { data: unknown; timestamp: number }>();

/**
 * Verifica se o cache está válido
 */
function isCacheValid(key: string, maxAge: number): boolean {
  const cached = cache.get(key);
  if (!cached) return false;
  return Date.now() - cached.timestamp < maxAge;
}

/**
 * Obtém dados do cache
 */
function getFromCache<T>(key: string): T | null {
  const cached = cache.get(key);
  return cached ? (cached.data as T) : null;
}

/**
 * Salva dados no cache
 */
function saveToCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Interface da resposta da API WordPress
 */
interface WPProjectResponse {
  id: string;
  title: string;
  description?: string;
  category: string;
  image: string;
  slug: string;
  client?: string;
  year?: string;
  services?: string[];
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  gallery?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  } | null;
}

/**
 * Transforma resposta da API no formato do React
 */
function transformProject(wpProject: WPProjectResponse): Project {
  return {
    id: wpProject.id,
    title: wpProject.title,
    description: wpProject.description,
    category: wpProject.category,
    image: wpProject.image,
    slug: wpProject.slug,
    client: wpProject.client,
    year: wpProject.year,
    services: wpProject.services,
    challenge: wpProject.challenge,
    solution: wpProject.solution,
    results: wpProject.results,
    gallery: wpProject.gallery,
    testimonial: wpProject.testimonial ?? undefined,
  };
}

/**
 * Fetch com timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Serviço WordPress API
 */
export const wordpressService = {
  /**
   * Busca todos os projetos
   */
  async getAllProjects(): Promise<Project[]> {
    const cacheKey = 'all-projects';

    // Verificar cache
    if (isCacheValid(cacheKey, API_CONFIG.cache.projects)) {
      const cached = getFromCache<Project[]>(cacheKey);
      if (cached) return cached;
    }

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.projects}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WPProjectResponse[] = await response.json();
    const projects = data.map(transformProject);

    // Salvar no cache
    saveToCache(cacheKey, projects);

    return projects;
  },

  /**
   * Busca projeto por slug
   */
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const cacheKey = `project-${slug}`;

    // Verificar cache
    if (isCacheValid(cacheKey, API_CONFIG.cache.singleProject)) {
      const cached = getFromCache<Project>(cacheKey);
      if (cached) return cached;
    }

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.projectBySlug(slug)}`;
    const response = await fetchWithTimeout(url);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WPProjectResponse = await response.json();
    const project = transformProject(data);

    // Salvar no cache
    saveToCache(cacheKey, project);

    return project;
  },

  /**
   * Busca projetos por categoria
   */
  async getProjectsByCategory(category: string): Promise<Project[]> {
    const cacheKey = `projects-category-${category}`;

    // Verificar cache
    if (isCacheValid(cacheKey, API_CONFIG.cache.projects)) {
      const cached = getFromCache<Project[]>(cacheKey);
      if (cached) return cached;
    }

    const url = new URL(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.projects}`);
    url.searchParams.set('category', category);

    const response = await fetchWithTimeout(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WPProjectResponse[] = await response.json();
    const projects = data.map(transformProject);

    // Salvar no cache
    saveToCache(cacheKey, projects);

    return projects;
  },

  /**
   * Limpa todo o cache
   */
  clearCache(): void {
    cache.clear();
  },

  /**
   * Invalida cache de um item específico
   */
  invalidateCache(key: string): void {
    cache.delete(key);
  },

  /**
   * Invalida todos os caches de projetos
   */
  invalidateAllProjectsCache(): void {
    for (const key of cache.keys()) {
      if (key.startsWith('project') || key === 'all-projects') {
        cache.delete(key);
      }
    }
  },
};

export default wordpressService;
