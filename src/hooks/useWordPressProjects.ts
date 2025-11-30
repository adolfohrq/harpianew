/**
 * Hook para buscar projetos do WordPress
 * @description Gerencia estado de loading, erro e cache com fallback automático
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Project } from '@/types';
import { wordpressService } from '@/services/wordpress';
import { PROJECTS } from '@/data/projects';
import { API_CONFIG, isWordPressConfigured } from '@/config/api.config';

interface UseWordPressProjectsOptions {
  /** Filtrar por categoria */
  category?: string;
  /** Buscar projeto específico por slug */
  slug?: string;
  /** Habilitar/desabilitar busca */
  enabled?: boolean;
  /** Usar apenas dados estáticos (ignora API) */
  staticOnly?: boolean;
}

interface UseWordPressProjectsReturn {
  /** Lista de projetos */
  projects: Project[];
  /** Projeto único (quando buscando por slug) */
  project: Project | null;
  /** Estado de carregamento */
  isLoading: boolean;
  /** Erro da requisição */
  error: Error | null;
  /** Função para recarregar dados */
  refetch: () => void;
  /** Categorias disponíveis */
  categories: string[];
  /** Indica se está usando fallback (dados estáticos) */
  isUsingFallback: boolean;
}

/**
 * Hook principal para buscar projetos do WordPress
 * Com fallback automático para dados estáticos em caso de erro
 *
 * @example
 * ```tsx
 * // Buscar todos os projetos
 * const { projects, isLoading } = useWordPressProjects();
 *
 * // Buscar por categoria
 * const { projects } = useWordPressProjects({ category: 'Branding & Identidade' });
 *
 * // Buscar projeto específico
 * const { project } = useWordPressProjects({ slug: 'essencia-minimalista' });
 * ```
 */
export function useWordPressProjects(
  options: UseWordPressProjectsOptions = {}
): UseWordPressProjectsReturn {
  const { category, slug, enabled = true, staticOnly = false } = options;

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  /**
   * Busca projetos da API ou usa fallback
   */
  const fetchProjects = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    // Se staticOnly ou API não configurada, usa dados estáticos
    if (staticOnly || !isWordPressConfigured()) {
      setProjects(PROJECTS);
      setIsUsingFallback(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let data: Project[];

      if (slug) {
        // Buscar projeto único por slug
        const project = await wordpressService.getProjectBySlug(slug);
        data = project ? [project] : [];
      } else if (category && category !== 'Todos') {
        // Buscar por categoria
        data = await wordpressService.getProjectsByCategory(category);
      } else {
        // Buscar todos
        data = await wordpressService.getAllProjects();
      }

      setProjects(data);
      setIsUsingFallback(false);
    } catch (err) {
      console.error('[useWordPressProjects] Erro ao buscar projetos:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));

      // Fallback para dados estáticos
      if (API_CONFIG.useFallback) {
        console.warn('[useWordPressProjects] Usando dados estáticos como fallback');
        setProjects(PROJECTS);
        setIsUsingFallback(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [category, slug, enabled, staticOnly]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /**
   * Projeto único (quando buscando por slug)
   */
  const project = useMemo(() => {
    if (slug) {
      // Busca nos projetos carregados
      const found = projects.find((p) => p.slug === slug);
      if (found) return found;

      // Fallback: busca nos dados estáticos
      return PROJECTS.find((p) => p.slug === slug) || null;
    }
    return null;
  }, [slug, projects]);

  /**
   * Projetos filtrados por categoria
   */
  const filteredProjects = useMemo(() => {
    if (!category || category === 'Todos') {
      return projects;
    }
    return projects.filter((p) => p.category === category);
  }, [projects, category]);

  /**
   * Categorias únicas extraídas dos projetos
   */
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ['Todos', ...Array.from(cats)];
  }, [projects]);

  return {
    projects: slug ? projects : filteredProjects,
    project,
    isLoading,
    error,
    refetch: fetchProjects,
    categories,
    isUsingFallback,
  };
}

/**
 * Hook simplificado para buscar um único projeto por slug
 *
 * @example
 * ```tsx
 * const { project, isLoading } = useWordPressProject('essencia-minimalista');
 * ```
 */
export function useWordPressProject(slug: string) {
  const result = useWordPressProjects({ slug, enabled: !!slug });
  return {
    project: result.project,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch,
    isUsingFallback: result.isUsingFallback,
  };
}

/**
 * Hook para buscar todos os projetos
 *
 * @example
 * ```tsx
 * const { projects, categories, isLoading } = useAllProjects();
 * ```
 */
export function useAllProjects() {
  return useWordPressProjects();
}

/**
 * Hook para prefetch de projetos (melhora UX)
 * Use em páginas que linkam para o portfólio
 *
 * @example
 * ```tsx
 * // Na Home, prefetch dos projetos
 * usePrefetchProjects();
 * ```
 */
export function usePrefetchProjects() {
  useEffect(() => {
    // Prefetch após 2 segundos de inatividade
    const timeoutId = setTimeout(() => {
      if (isWordPressConfigured()) {
        wordpressService.getAllProjects().catch(() => {
          // Silenciosamente ignora erros de prefetch
        });
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
}

export default useWordPressProjects;
