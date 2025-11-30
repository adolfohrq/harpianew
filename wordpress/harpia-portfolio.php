<?php
/**
 * Plugin Name: Harpia Portfolio
 * Plugin URI: https://harpiaagencia.com.br
 * Description: Custom Post Type e REST API para gerenciamento do portfolio da Harpia Agencia
 * Version: 1.0.0
 * Author: Harpia Agencia
 * Author URI: https://harpiaagencia.com.br
 * License: GPL v2 or later
 * Text Domain: harpia-portfolio
 *
 * INSTALACAO:
 * 1. Copie este arquivo para wp-content/mu-plugins/
 * 2. O plugin sera ativado automaticamente
 * 3. Configure os campos ACF conforme o arquivo acf-project-fields.json
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ============================================
 * CUSTOM POST TYPE: PROJETOS
 * ============================================
 */
function harpia_register_projects_cpt() {
    $labels = [
        'name'                  => 'Projetos',
        'singular_name'         => 'Projeto',
        'menu_name'             => 'Portfolio',
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
        'show_in_rest'       => true,
        'rest_base'          => 'projects',
        'query_var'          => true,
        'rewrite'            => ['slug' => 'projeto'],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => [
            'title',
            'editor',
            'thumbnail',
            'excerpt',
            'custom-fields',
        ],
    ];

    register_post_type('harpia_project', $args);
}
add_action('init', 'harpia_register_projects_cpt');

/**
 * ============================================
 * TAXONOMIA: CATEGORIAS DE PROJETO
 * ============================================
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
        'show_in_rest'      => true,
        'rest_base'         => 'project-categories',
        'query_var'         => true,
        'rewrite'           => ['slug' => 'categoria-projeto'],
    ];

    register_taxonomy('project_category', ['harpia_project'], $args);
}
add_action('init', 'harpia_register_project_category_taxonomy');

/**
 * Criar categorias padrao automaticamente
 */
function harpia_create_default_project_categories() {
    $categories = [
        'Fotografia & Video',
        'Branding & Identidade',
        'Conteudo & Design',
        'Marketing Digital',
    ];

    foreach ($categories as $category) {
        if (!term_exists($category, 'project_category')) {
            wp_insert_term($category, 'project_category');
        }
    }
}
add_action('init', 'harpia_create_default_project_categories', 20);

/**
 * ============================================
 * CONFIGURACAO DE CORS
 * ============================================
 */
function harpia_add_cors_headers() {
    // Dominios permitidos
    $allowed_origins = [
        'http://localhost:5020',
        'http://localhost:5173',
        'http://localhost:3000',
        'https://agenciaharpia.com.br',
        'https://www.agenciaharpia.com.br',
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
    }

    // Preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
}
add_action('rest_api_init', 'harpia_add_cors_headers', 15);

/**
 * ============================================
 * ENDPOINTS REST API CUSTOMIZADOS
 * ============================================
 */
function harpia_register_projects_endpoint() {
    // GET /wp-json/harpia/v1/projects
    register_rest_route('harpia/v1', '/projects', [
        'methods'             => 'GET',
        'callback'            => 'harpia_get_projects',
        'permission_callback' => '__return_true',
        'args'                => [
            'category' => [
                'required'          => false,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ],
    ]);

    // GET /wp-json/harpia/v1/projects/{slug}
    register_rest_route('harpia/v1', '/projects/(?P<slug>[a-zA-Z0-9-]+)', [
        'methods'             => 'GET',
        'callback'            => 'harpia_get_project_by_slug',
        'permission_callback' => '__return_true',
        'args'                => [
            'slug' => [
                'required'          => true,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_title',
            ],
        ],
    ]);
}
add_action('rest_api_init', 'harpia_register_projects_endpoint');

/**
 * Callback: Listar todos os projetos
 */
function harpia_get_projects($request) {
    $args = [
        'post_type'      => 'harpia_project',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'menu_order date',
        'order'          => 'ASC',
    ];

    // Filtro por categoria
    $category = $request->get_param('category');
    if ($category) {
        $args['tax_query'] = [
            [
                'taxonomy' => 'project_category',
                'field'    => 'name',
                'terms'    => $category,
            ],
        ];
    }

    $posts = get_posts($args);
    $projects = [];

    foreach ($posts as $post) {
        $projects[] = harpia_format_project($post);
    }

    // Headers de cache
    $response = rest_ensure_response($projects);
    $response->header('Cache-Control', 'public, max-age=300');

    return $response;
}

/**
 * Callback: Buscar projeto por slug
 */
function harpia_get_project_by_slug($request) {
    $slug = $request['slug'];

    // Primeiro tenta buscar pelo campo ACF 'slug'
    $args = [
        'post_type'      => 'harpia_project',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
        'meta_query'     => [
            [
                'key'     => 'slug',
                'value'   => $slug,
                'compare' => '=',
            ],
        ],
    ];

    $posts = get_posts($args);

    // Se nao encontrar pelo ACF, tenta pelo post_name
    if (empty($posts)) {
        $args = [
            'post_type'      => 'harpia_project',
            'posts_per_page' => 1,
            'post_status'    => 'publish',
            'name'           => $slug,
        ];
        $posts = get_posts($args);
    }

    if (empty($posts)) {
        return new WP_Error(
            'not_found',
            'Projeto nao encontrado',
            ['status' => 404]
        );
    }

    $response = rest_ensure_response(harpia_format_project($posts[0]));
    $response->header('Cache-Control', 'public, max-age=600');

    return $response;
}

/**
 * Formatar projeto para resposta da API
 */
function harpia_format_project($post) {
    // Verificar se ACF esta ativo
    if (!function_exists('get_fields')) {
        return harpia_format_project_without_acf($post);
    }

    $acf = get_fields($post->ID);
    $featured_image = get_the_post_thumbnail_url($post->ID, 'large');
    $categories = wp_get_post_terms($post->ID, 'project_category', ['fields' => 'names']);

    // Processar servicos (repeater)
    $services = [];
    if (!empty($acf['services'])) {
        foreach ($acf['services'] as $service) {
            if (!empty($service['service_name'])) {
                $services[] = $service['service_name'];
            }
        }
    }

    // Processar resultados (repeater)
    $results = [];
    if (!empty($acf['results'])) {
        foreach ($acf['results'] as $result) {
            $results[] = [
                'metric'      => $result['metric'] ?? '',
                'value'       => $result['value'] ?? '',
                'description' => $result['description'] ?? '',
            ];
        }
    }

    // Processar galeria
    $gallery = [];
    if (!empty($acf['gallery'])) {
        foreach ($acf['gallery'] as $image) {
            if (is_array($image) && isset($image['url'])) {
                $gallery[] = $image['url'];
            } elseif (is_string($image)) {
                $gallery[] = $image;
            }
        }
    }

    // Processar depoimento
    $testimonial = null;
    if (!empty($acf['testimonial_text'])) {
        $testimonial = [
            'text'   => $acf['testimonial_text'],
            'author' => $acf['testimonial_author'] ?? '',
            'role'   => $acf['testimonial_role'] ?? '',
        ];
    }

    return [
        'id'          => (string) $post->ID,
        'title'       => $post->post_title,
        'description' => wp_strip_all_tags($post->post_excerpt),
        'category'    => !empty($categories) ? $categories[0] : '',
        'image'       => $featured_image ?: '',
        'slug'        => $acf['slug'] ?? sanitize_title($post->post_title),
        'client'      => $acf['client'] ?? '',
        'year'        => $acf['year'] ?? '',
        'services'    => $services,
        'challenge'   => $acf['challenge'] ?? '',
        'solution'    => $acf['solution'] ?? '',
        'results'     => $results,
        'gallery'     => $gallery,
        'testimonial' => $testimonial,
    ];
}

/**
 * Fallback: Formatar projeto sem ACF
 */
function harpia_format_project_without_acf($post) {
    $featured_image = get_the_post_thumbnail_url($post->ID, 'large');
    $categories = wp_get_post_terms($post->ID, 'project_category', ['fields' => 'names']);

    return [
        'id'          => (string) $post->ID,
        'title'       => $post->post_title,
        'description' => wp_strip_all_tags($post->post_excerpt),
        'category'    => !empty($categories) ? $categories[0] : '',
        'image'       => $featured_image ?: '',
        'slug'        => sanitize_title($post->post_title),
        'client'      => get_post_meta($post->ID, 'client', true),
        'year'        => get_post_meta($post->ID, 'year', true),
        'services'    => [],
        'challenge'   => get_post_meta($post->ID, 'challenge', true),
        'solution'    => get_post_meta($post->ID, 'solution', true),
        'results'     => [],
        'gallery'     => [],
        'testimonial' => null,
    ];
}

/**
 * ============================================
 * SEGURANCA
 * ============================================
 */

// Restringir metodos HTTP na API
function harpia_restrict_rest_methods($result, $server, $request) {
    $route = $request->get_route();

    // Apenas GET permitido para endpoints publicos
    if (strpos($route, '/harpia/v1/') !== false) {
        if ($request->get_method() !== 'GET' && !is_user_logged_in()) {
            return new WP_Error(
                'rest_forbidden',
                'Metodo nao permitido',
                ['status' => 405]
            );
        }
    }

    return $result;
}
add_filter('rest_pre_dispatch', 'harpia_restrict_rest_methods', 10, 3);

// Esconder versao do WordPress
add_filter('the_generator', '__return_empty_string');

/**
 * ============================================
 * ADMIN: COLUNAS CUSTOMIZADAS
 * ============================================
 */
function harpia_project_columns($columns) {
    $new_columns = [];
    foreach ($columns as $key => $value) {
        if ($key === 'title') {
            $new_columns[$key] = $value;
            $new_columns['project_thumbnail'] = 'Imagem';
            $new_columns['project_client'] = 'Cliente';
            $new_columns['project_year'] = 'Ano';
        } else {
            $new_columns[$key] = $value;
        }
    }
    return $new_columns;
}
add_filter('manage_harpia_project_posts_columns', 'harpia_project_columns');

function harpia_project_column_content($column, $post_id) {
    switch ($column) {
        case 'project_thumbnail':
            $thumb = get_the_post_thumbnail($post_id, [60, 60]);
            echo $thumb ?: '<span style="color:#999">Sem imagem</span>';
            break;

        case 'project_client':
            $client = function_exists('get_field') ? get_field('client', $post_id) : get_post_meta($post_id, 'client', true);
            echo esc_html($client) ?: '-';
            break;

        case 'project_year':
            $year = function_exists('get_field') ? get_field('year', $post_id) : get_post_meta($post_id, 'year', true);
            echo esc_html($year) ?: '-';
            break;
    }
}
add_action('manage_harpia_project_posts_custom_column', 'harpia_project_column_content', 10, 2);

/**
 * ============================================
 * FLUSH REWRITE RULES NA ATIVACAO
 * ============================================
 */
function harpia_portfolio_activate() {
    harpia_register_projects_cpt();
    harpia_register_project_category_taxonomy();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'harpia_portfolio_activate');

function harpia_portfolio_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'harpia_portfolio_deactivate');
