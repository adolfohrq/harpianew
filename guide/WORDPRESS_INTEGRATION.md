# Guia de Integração WordPress CMS - Harpia

Este guia detalha como integrar o WordPress como CMS headless para gerenciar o sistema de portfólio/projetos da Harpia.

## Índice

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Configuração do WordPress](#2-configuração-do-wordpress)
3. [Criando o Custom Post Type](#3-criando-o-custom-post-type)
4. [Configurando a REST API](#4-configurando-a-rest-api)
5. [Adaptações no React (Frontend)](#5-adaptações-no-react-frontend)
6. [Hook useWordPressProjects](#6-hook-usewordpressprojects)
7. [Serviço de API](#7-serviço-de-api)
8. [Cache e Performance](#8-cache-e-performance)
9. [Deploy e Produção](#9-deploy-e-produção)
10. [Migração dos Dados Atuais](#10-migração-dos-dados-atuais)

---

## 1. Visão Geral da Arquitetura

### Arquitetura Atual (Estática)

```
src/data/projects.ts  →  PortfolioPreview.tsx  →  Renderização
       ↓
  Array estático        Importa diretamente
```

### Arquitetura com WordPress (Headless CMS)

```
WordPress (CMS)  →  REST API  →  React (Frontend)
      ↓                              ↓
Custom Post Type           Hook useWordPressProjects
 + ACF Fields                        ↓
                           PortfolioPreview.tsx
```

### Benefícios

- Gerenciamento visual de conteúdo
- Upload de imagens integrado (Media Library)
- Usuários não-técnicos podem editar
- Versionamento e rascunhos
- SEO plugins (Yoast, RankMath)
- Scheduled posts (publicação agendada)

---

## 2. Configuração do WordPress

### 2.1 Instalação

Você pode instalar WordPress de duas formas:

**Opção A - Subdomínio (Recomendado)**

```
cms.agenciaharpia.com.br  →  WordPress
www.agenciaharpia.com.br  →  React (Frontend)
```

**Opção B - Subpasta**

```
agenciaharpia.com.br/cms  →  WordPress
agenciaharpia.com.br      →  React (Frontend)
```

### 2.2 Plugins Essenciais

| Plugin                               | Função                       | Link                                           |
| ------------------------------------ | ---------------------------- | ---------------------------------------------- |
| **Advanced Custom Fields (ACF) Pro** | Campos personalizados        | https://www.advancedcustomfields.com/          |
| **ACF to REST API**                  | Expõe campos ACF na REST API | https://wordpress.org/plugins/acf-to-rest-api/ |
| **WP REST Cache**                    | Cache da REST API            | https://wordpress.org/plugins/wp-rest-cache/   |
| **Application Passwords**            | Autenticação segura          | Nativo no WP 5.6+                              |

### 2.3 Configuração de CORS

Adicione ao `functions.php` do seu tema:

```php
<?php
// Permitir CORS para o frontend React
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = [
            'http://localhost:5020',
            'https://agenciaharpia.com.br',
            'https://www.agenciaharpia.com.br'
        ];

        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type');
        }

        return $value;
    });
}, 15);
```

---

## 3. Criando o Custom Post Type

### 3.1 Registrar o CPT "Projetos"

Adicione ao `functions.php`:

```php
<?php
/**
 * Custom Post Type: Projetos
 * Corresponde à interface Project do React
 */
function harpia_register_projects_cpt() {
    $labels = [
        'name'                  => 'Projetos',
        'singular_name'         => 'Projeto',
        'menu_name'             => 'Portfólio',
        'add_new'               => 'Adicionar Projeto',
        'add_new_item'          => 'Adicionar Novo Projeto',
        'edit_item'             => 'Editar Projeto',
        'new_item'              => 'Novo Projeto',
        'view_item'             => 'Ver Projeto',
        'search_items'          => 'Buscar Projetos',
        'not_found'             => 'Nenhum projeto encontrado',
        'not_found_in_trash'    => 'Nenhum projeto na lixeira',
        'all_items'             => 'Todos os Projetos',
        'featured_image'        => 'Imagem Principal',
        'set_featured_image'    => 'Definir imagem principal',
        'remove_featured_image' => 'Remover imagem principal',
    ];

    $args = [
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true, // Importante para REST API
        'rest_base'          => 'projects', // Endpoint: /wp-json/wp/v2/projects
        'query_var'          => true,
        'rewrite'            => ['slug' => 'projeto'],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => [
            'title',           // title
            'editor',          // description (conteúdo principal)
            'thumbnail',       // image (featured image)
            'excerpt',         // descrição curta
            'custom-fields',   // campos ACF
        ],
    ];

    register_post_type('harpia_project', $args);
}
add_action('init', 'harpia_register_projects_cpt');
```

### 3.2 Registrar Taxonomia "Categorias de Projeto"

```php
<?php
/**
 * Taxonomia: Categorias de Projeto
 * Corresponde ao campo category da interface Project
 */
function harpia_register_project_category_taxonomy() {
    $labels = [
        'name'              => 'Categorias',
        'singular_name'     => 'Categoria',
        'search_items'      => 'Buscar Categorias',
        'all_items'         => 'Todas as Categorias',
        'edit_item'         => 'Editar Categoria',
        'update_item'       => 'Atualizar Categoria',
        'add_new_item'      => 'Adicionar Nova Categoria',
        'new_item_name'     => 'Nome da Nova Categoria',
        'menu_name'         => 'Categorias',
    ];

    $args = [
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true, // Importante para REST API
        'rest_base'         => 'project-categories',
        'query_var'         => true,
        'rewrite'           => ['slug' => 'categoria-projeto'],
    ];

    register_taxonomy('project_category', ['harpia_project'], $args);
}
add_action('init', 'harpia_register_project_category_taxonomy');

// Criar categorias padrão automaticamente
function harpia_create_default_project_categories() {
    $categories = [
        'Fotografia & Vídeo',
        'Branding & Identidade',
        'Conteúdo & Design',
        'Marketing Digital',
    ];

    foreach ($categories as $category) {
        if (!term_exists($category, 'project_category')) {
            wp_insert_term($category, 'project_category');
        }
    }
}
add_action('init', 'harpia_create_default_project_categories');
```

---

## 4. Configurando a REST API

### 4.1 Campos ACF (Advanced Custom Fields)

Crie um grupo de campos no ACF com as seguintes configurações:

**Grupo: Detalhes do Projeto**

- Localização: Post Type = harpia_project

| Campo              | Tipo ACF | Nome do Campo        | Correspondência React        |
| ------------------ | -------- | -------------------- | ---------------------------- |
| Cliente            | Text     | `client`             | `project.client`             |
| Ano                | Text     | `year`               | `project.year`               |
| Slug               | Text     | `slug`               | `project.slug`               |
| Serviços           | Repeater | `services`           | `project.services[]`         |
| ↳ Serviço          | Text     | `service_name`       | -                            |
| Desafio            | Textarea | `challenge`          | `project.challenge`          |
| Solução            | Textarea | `solution`           | `project.solution`           |
| Resultados         | Repeater | `results`            | `project.results[]`          |
| ↳ Métrica          | Text     | `metric`             | `result.metric`              |
| ↳ Valor            | Text     | `value`              | `result.value`               |
| ↳ Descrição        | Text     | `description`        | `result.description`         |
| Galeria            | Gallery  | `gallery`            | `project.gallery[]`          |
| Depoimento - Texto | Textarea | `testimonial_text`   | `project.testimonial.text`   |
| Depoimento - Autor | Text     | `testimonial_author` | `project.testimonial.author` |
| Depoimento - Cargo | Text     | `testimonial_role`   | `project.testimonial.role`   |

### 4.2 Código ACF (JSON Export)

Se preferir importar via JSON no ACF:

```json
{
  "key": "group_harpia_project_details",
  "title": "Detalhes do Projeto",
  "fields": [
    {
      "key": "field_client",
      "label": "Cliente",
      "name": "client",
      "type": "text",
      "required": 1
    },
    {
      "key": "field_year",
      "label": "Ano",
      "name": "year",
      "type": "text",
      "required": 1
    },
    {
      "key": "field_slug",
      "label": "Slug (URL)",
      "name": "slug",
      "type": "text",
      "required": 1,
      "instructions": "Identificador único para URL. Ex: essencia-minimalista"
    },
    {
      "key": "field_services",
      "label": "Serviços",
      "name": "services",
      "type": "repeater",
      "sub_fields": [
        {
          "key": "field_service_name",
          "label": "Serviço",
          "name": "service_name",
          "type": "text"
        }
      ]
    },
    {
      "key": "field_challenge",
      "label": "Desafio",
      "name": "challenge",
      "type": "textarea",
      "rows": 4
    },
    {
      "key": "field_solution",
      "label": "Solução",
      "name": "solution",
      "type": "textarea",
      "rows": 4
    },
    {
      "key": "field_results",
      "label": "Resultados",
      "name": "results",
      "type": "repeater",
      "sub_fields": [
        {
          "key": "field_result_metric",
          "label": "Métrica",
          "name": "metric",
          "type": "text"
        },
        {
          "key": "field_result_value",
          "label": "Valor",
          "name": "value",
          "type": "text"
        },
        {
          "key": "field_result_description",
          "label": "Descrição",
          "name": "description",
          "type": "text"
        }
      ]
    },
    {
      "key": "field_gallery",
      "label": "Galeria de Imagens",
      "name": "gallery",
      "type": "gallery",
      "return_format": "array",
      "preview_size": "medium"
    },
    {
      "key": "field_testimonial_text",
      "label": "Depoimento - Texto",
      "name": "testimonial_text",
      "type": "textarea"
    },
    {
      "key": "field_testimonial_author",
      "label": "Depoimento - Autor",
      "name": "testimonial_author",
      "type": "text"
    },
    {
      "key": "field_testimonial_role",
      "label": "Depoimento - Cargo",
      "name": "testimonial_role",
      "type": "text"
    }
  ],
  "location": [
    [
      {
        "param": "post_type",
        "operator": "==",
        "value": "harpia_project"
      }
    ]
  ]
}
```

### 4.3 Customizar Resposta da REST API

Adicione ao `functions.php`:

```php
<?php
/**
 * Adicionar campos customizados à resposta da REST API
 */
function harpia_add_project_rest_fields() {
    // Adicionar campos ACF à resposta
    register_rest_field('harpia_project', 'project_data', [
        'get_callback' => function($post) {
            $acf = get_fields($post['id']);
            $featured_image = get_the_post_thumbnail_url($post['id'], 'large');
            $categories = wp_get_post_terms($post['id'], 'project_category', ['fields' => 'names']);

            // Processar serviços (repeater)
            $services = [];
            if (!empty($acf['services'])) {
                foreach ($acf['services'] as $service) {
                    $services[] = $service['service_name'];
                }
            }

            // Processar resultados (repeater)
            $results = [];
            if (!empty($acf['results'])) {
                foreach ($acf['results'] as $result) {
                    $results[] = [
                        'metric' => $result['metric'],
                        'value' => $result['value'],
                        'description' => $result['description'],
                    ];
                }
            }

            // Processar galeria
            $gallery = [];
            if (!empty($acf['gallery'])) {
                foreach ($acf['gallery'] as $image) {
                    $gallery[] = $image['url'];
                }
            }

            // Processar depoimento
            $testimonial = null;
            if (!empty($acf['testimonial_text'])) {
                $testimonial = [
                    'text' => $acf['testimonial_text'],
                    'author' => $acf['testimonial_author'] ?? '',
                    'role' => $acf['testimonial_role'] ?? '',
                ];
            }

            return [
                'id' => (string) $post['id'],
                'title' => $post['title']['rendered'],
                'description' => wp_strip_all_tags($post['excerpt']['rendered']),
                'category' => !empty($categories) ? $categories[0] : '',
                'image' => $featured_image ?: '',
                'slug' => $acf['slug'] ?? sanitize_title($post['title']['rendered']),
                'client' => $acf['client'] ?? '',
                'year' => $acf['year'] ?? '',
                'services' => $services,
                'challenge' => $acf['challenge'] ?? '',
                'solution' => $acf['solution'] ?? '',
                'results' => $results,
                'gallery' => $gallery,
                'testimonial' => $testimonial,
            ];
        },
        'schema' => null,
    ]);
}
add_action('rest_api_init', 'harpia_add_project_rest_fields');
```

### 4.4 Endpoint Personalizado (Opcional - Mais Limpo)

Para uma resposta mais limpa sem campos extras do WordPress:

```php
<?php
/**
 * Endpoint customizado: /wp-json/harpia/v1/projects
 */
function harpia_register_projects_endpoint() {
    register_rest_route('harpia/v1', '/projects', [
        'methods' => 'GET',
        'callback' => 'harpia_get_projects',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('harpia/v1', '/projects/(?P<slug>[a-zA-Z0-9-]+)', [
        'methods' => 'GET',
        'callback' => 'harpia_get_project_by_slug',
        'permission_callback' => '__return_true',
    ]);
}
add_action('rest_api_init', 'harpia_register_projects_endpoint');

function harpia_get_projects($request) {
    $args = [
        'post_type' => 'harpia_project',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'orderby' => 'menu_order date',
        'order' => 'ASC',
    ];

    // Filtro por categoria (opcional)
    $category = $request->get_param('category');
    if ($category) {
        $args['tax_query'] = [
            [
                'taxonomy' => 'project_category',
                'field' => 'name',
                'terms' => $category,
            ],
        ];
    }

    $posts = get_posts($args);
    $projects = [];

    foreach ($posts as $post) {
        $projects[] = harpia_format_project($post);
    }

    return rest_ensure_response($projects);
}

function harpia_get_project_by_slug($request) {
    $slug = $request['slug'];

    $args = [
        'post_type' => 'harpia_project',
        'posts_per_page' => 1,
        'post_status' => 'publish',
        'meta_query' => [
            [
                'key' => 'slug',
                'value' => $slug,
                'compare' => '=',
            ],
        ],
    ];

    $posts = get_posts($args);

    if (empty($posts)) {
        return new WP_Error('not_found', 'Projeto não encontrado', ['status' => 404]);
    }

    return rest_ensure_response(harpia_format_project($posts[0]));
}

function harpia_format_project($post) {
    $acf = get_fields($post->ID);
    $featured_image = get_the_post_thumbnail_url($post->ID, 'large');
    $categories = wp_get_post_terms($post->ID, 'project_category', ['fields' => 'names']);

    // Processar serviços
    $services = [];
    if (!empty($acf['services'])) {
        foreach ($acf['services'] as $service) {
            $services[] = $service['service_name'];
        }
    }

    // Processar resultados
    $results = [];
    if (!empty($acf['results'])) {
        foreach ($acf['results'] as $result) {
            $results[] = [
                'metric' => $result['metric'],
                'value' => $result['value'],
                'description' => $result['description'],
            ];
        }
    }

    // Processar galeria
    $gallery = [];
    if (!empty($acf['gallery'])) {
        foreach ($acf['gallery'] as $image) {
            $gallery[] = $image['url'];
        }
    }

    // Processar depoimento
    $testimonial = null;
    if (!empty($acf['testimonial_text'])) {
        $testimonial = [
            'text' => $acf['testimonial_text'],
            'author' => $acf['testimonial_author'] ?? '',
            'role' => $acf['testimonial_role'] ?? '',
        ];
    }

    return [
        'id' => (string) $post->ID,
        'title' => $post->post_title,
        'description' => wp_strip_all_tags($post->post_excerpt),
        'category' => !empty($categories) ? $categories[0] : '',
        'image' => $featured_image ?: '',
        'slug' => $acf['slug'] ?? sanitize_title($post->post_title),
        'client' => $acf['client'] ?? '',
        'year' => $acf['year'] ?? '',
        'services' => $services,
        'challenge' => $acf['challenge'] ?? '',
        'solution' => $acf['solution'] ?? '',
        'results' => $results,
        'gallery' => $gallery,
        'testimonial' => $testimonial,
    ];
}
```

---

## 5. Adaptações no React (Frontend)

### 5.1 Estrutura de Arquivos a Criar

```
src/
├── services/
│   └── wordpress.ts        # Serviço de API
├── hooks/
│   └── useWordPressProjects.ts  # Hook para buscar projetos
├── config/
│   └── api.config.ts       # Configurações de API
```

### 5.2 Configuração de API

Crie o arquivo `src/config/api.config.ts`:

```typescript
/**
 * Configurações da API WordPress
 */
export const API_CONFIG = {
  // URL base do WordPress (altere para seu domínio)
  baseUrl: import.meta.env.VITE_WP_API_URL || 'https://cms.agenciaharpia.com.br',

  // Endpoints
  endpoints: {
    projects: '/wp-json/harpia/v1/projects',
    projectBySlug: (slug: string) => `/wp-json/harpia/v1/projects/${slug}`,
    categories: '/wp-json/wp/v2/project-categories',
  },

  // Configurações de cache (em milissegundos)
  cache: {
    projects: 5 * 60 * 1000, // 5 minutos
    singleProject: 10 * 60 * 1000, // 10 minutos
  },

  // Fallback para dados estáticos em caso de erro
  useFallback: true,
};
```

### 5.3 Variáveis de Ambiente

Adicione ao `.env`:

```env
# WordPress API
VITE_WP_API_URL=https://cms.agenciaharpia.com.br
```

Adicione ao `.env.development`:

```env
# WordPress API (Local)
VITE_WP_API_URL=http://localhost:8080
```

---

## 6. Hook useWordPressProjects

Crie o arquivo `src/hooks/useWordPressProjects.ts`:

```typescript
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Project } from '@/types';
import { wordpressService } from '@/services/wordpress';
import { PROJECTS } from '@/data/projects'; // Fallback

interface UseWordPressProjectsOptions {
  category?: string;
  slug?: string;
  enabled?: boolean;
}

interface UseWordPressProjectsReturn {
  projects: Project[];
  project: Project | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  categories: string[];
}

/**
 * Hook para buscar projetos do WordPress
 * Fallback automático para dados estáticos em caso de erro
 */
export function useWordPressProjects(
  options: UseWordPressProjectsOptions = {}
): UseWordPressProjectsReturn {
  const { category, slug, enabled = true } = options;

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  const fetchProjects = useCallback(async () => {
    if (!enabled) return;

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
      setUseFallback(false);
    } catch (err) {
      console.error('Erro ao buscar projetos do WordPress:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));

      // Fallback para dados estáticos
      console.warn('Usando dados estáticos como fallback');
      setProjects(PROJECTS);
      setUseFallback(true);
    } finally {
      setIsLoading(false);
    }
  }, [category, slug, enabled]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Projeto único (quando buscando por slug)
  const project = useMemo(() => {
    if (slug && projects.length > 0) {
      return projects[0];
    }
    return null;
  }, [slug, projects]);

  // Categorias únicas extraídas dos projetos
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ['Todos', ...Array.from(cats)];
  }, [projects]);

  return {
    projects,
    project,
    isLoading,
    error,
    refetch: fetchProjects,
    categories,
  };
}

// Hook simplificado para buscar um único projeto
export function useWordPressProject(slug: string) {
  return useWordPressProjects({ slug, enabled: !!slug });
}

// Hook para buscar todos os projetos
export function useAllProjects() {
  return useWordPressProjects();
}
```

---

## 7. Serviço de API

Crie o arquivo `src/services/wordpress.ts`:

```typescript
import { Project, ProjectResult } from '@/types';
import { API_CONFIG } from '@/config/api.config';

// Cache em memória
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
      return cache.get(cacheKey)!.data as Project[];
    }

    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.projects}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WPProjectResponse[] = await response.json();
    const projects = data.map(transformProject);

    // Salvar no cache
    cache.set(cacheKey, { data: projects, timestamp: Date.now() });

    return projects;
  },

  /**
   * Busca projeto por slug
   */
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const cacheKey = `project-${slug}`;

    // Verificar cache
    if (isCacheValid(cacheKey, API_CONFIG.cache.singleProject)) {
      return cache.get(cacheKey)!.data as Project;
    }

    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.projectBySlug(slug)}`
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WPProjectResponse = await response.json();
    const project = transformProject(data);

    // Salvar no cache
    cache.set(cacheKey, { data: project, timestamp: Date.now() });

    return project;
  },

  /**
   * Busca projetos por categoria
   */
  async getProjectsByCategory(category: string): Promise<Project[]> {
    const cacheKey = `projects-category-${category}`;

    // Verificar cache
    if (isCacheValid(cacheKey, API_CONFIG.cache.projects)) {
      return cache.get(cacheKey)!.data as Project[];
    }

    const url = new URL(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.projects}`);
    url.searchParams.set('category', category);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WPProjectResponse[] = await response.json();
    const projects = data.map(transformProject);

    // Salvar no cache
    cache.set(cacheKey, { data: projects, timestamp: Date.now() });

    return projects;
  },

  /**
   * Limpa o cache
   */
  clearCache(): void {
    cache.clear();
  },

  /**
   * Limpa cache de um item específico
   */
  invalidateCache(key: string): void {
    cache.delete(key);
  },
};
```

---

## 8. Cache e Performance

### 8.1 Estratégias de Cache

```typescript
// src/config/api.config.ts - Estratégias avançadas

export const CACHE_STRATEGIES = {
  // Cache primeiro, depois rede (melhor para projetos que raramente mudam)
  CACHE_FIRST: 'cache-first',

  // Rede primeiro, fallback para cache (melhor para conteúdo dinâmico)
  NETWORK_FIRST: 'network-first',

  // Stale-while-revalidate (mostra cache imediatamente, atualiza em background)
  SWR: 'stale-while-revalidate',
};

// Implementação SWR (Stale-While-Revalidate)
export async function fetchWithSWR<T>(
  key: string,
  fetcher: () => Promise<T>,
  maxAge: number
): Promise<T> {
  const cached = cache.get(key);

  if (cached) {
    // Retorna cache imediatamente
    const isStale = Date.now() - cached.timestamp > maxAge;

    if (isStale) {
      // Revalida em background
      fetcher().then((data) => {
        cache.set(key, { data, timestamp: Date.now() });
      });
    }

    return cached.data as T;
  }

  // Sem cache, busca da rede
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

### 8.2 Prefetch de Dados

```typescript
// src/hooks/usePrefetchProjects.ts

import { useEffect } from 'react';
import { wordpressService } from '@/services/wordpress';

/**
 * Prefetch de projetos para melhorar UX
 * Use em páginas que linkam para o portfólio
 */
export function usePrefetchProjects() {
  useEffect(() => {
    // Prefetch após 2 segundos de inatividade
    const timeoutId = setTimeout(() => {
      wordpressService.getAllProjects().catch(() => {
        // Silenciosamente ignora erros de prefetch
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
}
```

### 8.3 Cache no WordPress

Adicione ao `functions.php`:

```php
<?php
/**
 * Adicionar headers de cache às respostas da REST API
 */
function harpia_add_cache_headers($response, $server, $request) {
    // Cache de 5 minutos para projetos
    if (strpos($request->get_route(), '/harpia/v1/projects') !== false) {
        $response->header('Cache-Control', 'public, max-age=300');
    }

    return $response;
}
add_filter('rest_post_dispatch', 'harpia_add_cache_headers', 10, 3);
```

---

## 9. Deploy e Produção

### 9.1 Checklist de Deploy

- [ ] WordPress instalado em subdomínio seguro (HTTPS)
- [ ] Plugins instalados (ACF Pro, ACF to REST API)
- [ ] Custom Post Type e campos configurados
- [ ] CORS configurado para domínios de produção
- [ ] Cache de REST API ativado
- [ ] Variáveis de ambiente configuradas no frontend
- [ ] Build de produção testado

### 9.2 Segurança

```php
<?php
// Restringir acesso à REST API apenas para leitura pública
function harpia_restrict_rest_api($result, $server, $request) {
    // Permitir apenas GET para endpoints públicos
    if ($request->get_method() !== 'GET') {
        $route = $request->get_route();

        // Se não é um usuário autenticado e não é GET, bloqueia
        if (!is_user_logged_in() && strpos($route, '/harpia/v1/') !== false) {
            return new WP_Error(
                'rest_forbidden',
                'Acesso não autorizado',
                ['status' => 403]
            );
        }
    }

    return $result;
}
add_filter('rest_pre_dispatch', 'harpia_restrict_rest_api', 10, 3);

// Esconder informações sensíveis do WordPress
function harpia_hide_wp_version() {
    return '';
}
add_filter('the_generator', 'harpia_hide_wp_version');

// Desabilitar XML-RPC
add_filter('xmlrpc_enabled', '__return_false');
```

### 9.3 Monitoramento

```typescript
// src/services/wordpress.ts - Adicionar logging

async function fetchWithLogging(url: string): Promise<Response> {
  const startTime = performance.now();

  try {
    const response = await fetch(url);
    const duration = performance.now() - startTime;

    // Log para analytics (opcional)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'api_request', {
        event_category: 'WordPress API',
        event_label: url,
        value: Math.round(duration),
      });
    }

    return response;
  } catch (error) {
    // Log de erro
    console.error('API Error:', { url, error });
    throw error;
  }
}
```

---

## 10. Migração dos Dados Atuais

### 10.1 Script de Migração (PHP)

Execute no WordPress para importar os dados atuais:

```php
<?php
/**
 * Script de migração de dados estáticos para WordPress
 * Execute uma única vez via WP-CLI ou admin
 */
function harpia_migrate_projects() {
    // Dados atuais do React (copiar de projects.ts)
    $projects = [
        [
            'title' => 'Essência Minimalista',
            'description' => 'Ensaio fotográfico de interiores com estética minimalista e cinematográfica.',
            'category' => 'Fotografia & Vídeo',
            'client' => 'Studio Architettura',
            'year' => '2024',
            'slug' => 'essencia-minimalista',
            'services' => ['Direção de Arte', 'Fotografia de Interiores', 'Pós-produção'],
            'challenge' => 'O cliente precisava de um material visual que capturasse a essência dos seus projetos arquitetônicos de forma única, destacando-se em um mercado saturado de imagens genéricas de interiores.',
            'solution' => 'Desenvolvemos uma linguagem visual própria baseada em luz natural e composições geométricas precisas. Cada ambiente foi fotografado em múltiplos horários para capturar a melhor iluminação, resultando em imagens com forte impacto emocional.',
            'results' => [
                ['metric' => 'Engajamento', 'value' => '+340%', 'description' => 'Aumento no engajamento das redes sociais'],
                ['metric' => 'Leads', 'value' => '+85', 'description' => 'Novos leads qualificados no primeiro mês'],
                ['metric' => 'Conversão', 'value' => '12%', 'description' => 'Taxa de conversão de visitantes'],
            ],
            'testimonial_text' => 'A Harpia capturou perfeitamente a essência do nosso trabalho. As imagens superaram todas as expectativas e se tornaram a base de toda nossa comunicação visual.',
            'testimonial_author' => 'Ricardo Mendes',
            'testimonial_role' => 'Diretor Criativo, Studio Architettura',
        ],
        // ... adicione os outros 5 projetos aqui
    ];

    foreach ($projects as $project_data) {
        // Criar post
        $post_id = wp_insert_post([
            'post_type' => 'harpia_project',
            'post_title' => $project_data['title'],
            'post_excerpt' => $project_data['description'],
            'post_status' => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            error_log('Erro ao criar projeto: ' . $project_data['title']);
            continue;
        }

        // Associar categoria
        $term = get_term_by('name', $project_data['category'], 'project_category');
        if ($term) {
            wp_set_object_terms($post_id, $term->term_id, 'project_category');
        }

        // Salvar campos ACF
        update_field('client', $project_data['client'], $post_id);
        update_field('year', $project_data['year'], $post_id);
        update_field('slug', $project_data['slug'], $post_id);
        update_field('challenge', $project_data['challenge'], $post_id);
        update_field('solution', $project_data['solution'], $post_id);
        update_field('testimonial_text', $project_data['testimonial_text'], $post_id);
        update_field('testimonial_author', $project_data['testimonial_author'], $post_id);
        update_field('testimonial_role', $project_data['testimonial_role'], $post_id);

        // Salvar serviços (repeater)
        $services_data = [];
        foreach ($project_data['services'] as $service) {
            $services_data[] = ['service_name' => $service];
        }
        update_field('services', $services_data, $post_id);

        // Salvar resultados (repeater)
        update_field('results', $project_data['results'], $post_id);

        error_log('Projeto migrado com sucesso: ' . $project_data['title']);
    }

    return 'Migração concluída!';
}

// Adicionar página de admin para executar migração
function harpia_add_migration_page() {
    add_management_page(
        'Migrar Projetos',
        'Migrar Projetos',
        'manage_options',
        'harpia-migrate',
        'harpia_migration_page_content'
    );
}
add_action('admin_menu', 'harpia_add_migration_page');

function harpia_migration_page_content() {
    if (isset($_POST['run_migration'])) {
        $result = harpia_migrate_projects();
        echo '<div class="notice notice-success"><p>' . esc_html($result) . '</p></div>';
    }
    ?>
    <div class="wrap">
        <h1>Migrar Projetos</h1>
        <p>Clique no botão abaixo para migrar os projetos do React para o WordPress.</p>
        <form method="post">
            <?php wp_nonce_field('harpia_migrate'); ?>
            <input type="submit" name="run_migration" class="button button-primary" value="Executar Migração">
        </form>
    </div>
    <?php
}
```

### 10.2 Atualizando os Componentes React

Após a integração, atualize o `PortfolioPreview.tsx`:

```tsx
// ANTES (dados estáticos)
import { PROJECTS } from '@/data/projects';

// DEPOIS (WordPress)
import { useWordPressProjects } from '@/hooks/useWordPressProjects';

export const PortfolioPreview = ({ showAllProjects = false }) => {
  const { projects, isLoading, error, categories } = useWordPressProjects();
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Loading state
  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  // Filtrar projetos
  const filteredProjects =
    activeCategory === 'Todos' ? projects : projects.filter((p) => p.category === activeCategory);

  // ... resto do componente
};
```

---

## Resumo Final

### Passo a Passo Completo

1. **Instalar WordPress** em subdomínio (cms.seusite.com)
2. **Instalar plugins**: ACF Pro, ACF to REST API
3. **Adicionar código PHP** ao functions.php (CPT + Taxonomia + REST API)
4. **Criar campos ACF** conforme especificação
5. **Configurar CORS** para seu domínio React
6. **Criar arquivos React**: api.config.ts, wordpress.ts, useWordPressProjects.ts
7. **Adicionar variáveis de ambiente** (.env)
8. **Migrar dados atuais** usando script PHP
9. **Atualizar componentes** para usar o hook WordPress
10. **Testar e deploy**

### Endpoints Finais

| Endpoint                                 | Método | Descrição               |
| ---------------------------------------- | ------ | ----------------------- |
| `/wp-json/harpia/v1/projects`            | GET    | Lista todos os projetos |
| `/wp-json/harpia/v1/projects?category=X` | GET    | Filtra por categoria    |
| `/wp-json/harpia/v1/projects/{slug}`     | GET    | Projeto por slug        |

### Tempo Estimado de Implementação

| Etapa                           | Tempo          |
| ------------------------------- | -------------- |
| Setup WordPress + Plugins       | 1-2 horas      |
| Configuração CPT + ACF          | 2-3 horas      |
| Código React (serviços + hooks) | 2-3 horas      |
| Migração de dados               | 1 hora         |
| Testes e ajustes                | 2-3 horas      |
| **Total**                       | **8-12 horas** |

---

## Próximos Passos Opcionais

- [ ] Implementar preview de rascunhos no React
- [ ] Adicionar webhook para invalidar cache quando projeto é atualizado
- [ ] Integrar com Yoast SEO para meta tags dinâmicas
- [ ] Adicionar busca full-text com Elasticsearch
- [ ] Implementar GraphQL com WPGraphQL
