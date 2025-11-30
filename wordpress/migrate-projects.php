<?php
/**
 * Script de Migracao de Projetos - Harpia Agencia
 *
 * Este script migra os dados estaticos do React para o WordPress.
 *
 * INSTRUCOES DE USO:
 *
 * Opcao 1 - Via Admin:
 * 1. Copie este arquivo para wp-content/mu-plugins/
 * 2. Acesse WordPress Admin > Ferramentas > Migrar Projetos Harpia
 * 3. Clique em "Executar Migracao"
 *
 * Opcao 2 - Via WP-CLI:
 * wp eval-file migrate-projects.php
 *
 * IMPORTANTE:
 * - Execute apenas UMA vez
 * - Faca backup do banco antes de executar
 * - Certifique-se de que o ACF PRO esta instalado e ativado
 */

if (!defined('ABSPATH')) {
    // Se executado via WP-CLI
    if (php_sapi_name() === 'cli') {
        require_once dirname(__FILE__) . '/../../../wp-load.php';
    } else {
        exit('Acesso direto nao permitido');
    }
}

/**
 * Dados dos projetos a serem migrados
 * (Copiados de src/data/projects.ts)
 */
function harpia_get_migration_data() {
    return [
        [
            'title'       => 'Essencia Minimalista',
            'description' => 'Ensaio fotografico de interiores com estetica minimalista e cinematografica.',
            'category'    => 'Fotografia & Video',
            'client'      => 'Studio Architettura',
            'year'        => '2024',
            'slug'        => 'essencia-minimalista',
            'services'    => ['Direcao de Arte', 'Fotografia de Interiores', 'Pos-producao'],
            'challenge'   => 'O cliente precisava de um material visual que capturasse a essencia dos seus projetos arquitetonicos de forma unica, destacando-se em um mercado saturado de imagens genericas de interiores.',
            'solution'    => 'Desenvolvemos uma linguagem visual propria baseada em luz natural e composicoes geometricas precisas. Cada ambiente foi fotografado em multiplos horarios para capturar a melhor iluminacao, resultando em imagens com forte impacto emocional.',
            'results'     => [
                ['metric' => 'Engajamento', 'value' => '+340%', 'description' => 'Aumento no engajamento das redes sociais'],
                ['metric' => 'Leads', 'value' => '+85', 'description' => 'Novos leads qualificados no primeiro mes'],
                ['metric' => 'Conversao', 'value' => '12%', 'description' => 'Taxa de conversao de visitantes'],
            ],
            'testimonial_text'   => 'A Harpia capturou perfeitamente a essencia do nosso trabalho. As imagens superaram todas as expectativas e se tornaram a base de toda nossa comunicacao visual.',
            'testimonial_author' => 'Ricardo Mendes',
            'testimonial_role'   => 'Diretor Criativo, Studio Architettura',
        ],
        [
            'title'       => 'Visao Urbana',
            'description' => 'Captura arquitetonica urbana com foco em linhas e perspectivas.',
            'category'    => 'Fotografia & Video',
            'client'      => 'Urban Construtora',
            'year'        => '2024',
            'slug'        => 'visao-urbana',
            'services'    => ['Fotografia Aerea', 'Fotografia Arquitetonica', 'Video Institucional'],
            'challenge'   => 'A construtora precisava documentar seu mais ambicioso empreendimento de forma que comunicasse inovacao e qualidade premium aos investidores e compradores em potencial.',
            'solution'    => 'Combinamos fotografia aerea com drone e capturas em nivel de rua para criar uma narrativa visual completa. O resultado e um conjunto de imagens que destaca tanto a grandiosidade do projeto quanto os detalhes de acabamento.',
            'results'     => [
                ['metric' => 'Vendas', 'value' => '100%', 'description' => 'Unidades vendidas em 6 meses'],
                ['metric' => 'Midia', 'value' => '15+', 'description' => 'Publicacoes em veiculos especializados'],
                ['metric' => 'Visualizacoes', 'value' => '2.5M', 'description' => 'Visualizacoes do video institucional'],
            ],
            'testimonial_text'   => 'O trabalho da Harpia foi fundamental para o sucesso de vendas do empreendimento. As imagens transmitiram exatamente o valor que queriamos comunicar.',
            'testimonial_author' => 'Fernanda Costa',
            'testimonial_role'   => 'Diretora de Marketing, Urban Construtora',
        ],
        [
            'title'       => 'Luz & Sombra',
            'description' => 'Design visual para campanha de produto com foco em contraste e elegancia.',
            'category'    => 'Conteudo & Design',
            'client'      => 'Lumiere Cosmeticos',
            'year'        => '2024',
            'slug'        => 'luz-sombra',
            'services'    => ['Design de Campanha', 'Fotografia de Produto', 'Direcao de Arte'],
            'challenge'   => 'Lancamento de uma nova linha de skincare premium que precisava se posicionar entre as marcas de luxo do mercado, competindo com players internacionais estabelecidos.',
            'solution'    => 'Criamos uma identidade visual para a campanha baseada em contrastes dramaticos de luz e sombra, evocando sofisticacao e misterio. Cada peca foi meticulosamente produzida para transmitir a qualidade premium dos produtos.',
            'results'     => [
                ['metric' => 'Awareness', 'value' => '+500%', 'description' => 'Aumento no reconhecimento de marca'],
                ['metric' => 'ROI', 'value' => '8.5x', 'description' => 'Retorno sobre investimento em midia'],
                ['metric' => 'Vendas', 'value' => '+220%', 'description' => 'Crescimento de vendas no trimestre'],
            ],
            'testimonial_text'   => 'A campanha da Harpia nos colocou em outro patamar. Passamos a ser percebidos como uma marca de luxo genuina, competindo de igual para igual com marcas internacionais.',
            'testimonial_author' => 'Marina Alves',
            'testimonial_role'   => 'CEO, Lumiere Cosmeticos',
        ],
        [
            'title'       => 'Identidade Forte',
            'description' => 'Construcao de identidade visual completa para marca de luxo.',
            'category'    => 'Branding & Identidade',
            'client'      => 'Maison Noir',
            'year'        => '2023',
            'slug'        => 'identidade-forte',
            'services'    => ['Brand Strategy', 'Identidade Visual', 'Guidelines de Marca', 'Aplicacoes'],
            'challenge'   => 'Uma nova marca de moda masculina de luxo precisava de uma identidade que comunicasse sofisticacao atemporal, sem cair nos cliches do segmento.',
            'solution'    => 'Desenvolvemos uma identidade baseada em minimalismo extremo e tipografia personalizada. O sistema visual e flexivel o suficiente para diferentes aplicacoes, mas mantem uma consistencia impecavel em todos os pontos de contato.',
            'results'     => [
                ['metric' => 'Valor de Marca', 'value' => 'R$2.5M', 'description' => 'Valuation apos 1 ano de operacao'],
                ['metric' => 'Reconhecimento', 'value' => '78%', 'description' => 'Entre o publico-alvo apos 6 meses'],
                ['metric' => 'Consistencia', 'value' => '100%', 'description' => 'Aplicacao correta em todos os canais'],
            ],
            'testimonial_text'   => 'A Harpia entendeu nossa visao desde o primeiro briefing. A identidade que criaram e exatamente o que sonhavamos - atemporal, sofisticada e unica.',
            'testimonial_author' => 'Andre Bastos',
            'testimonial_role'   => 'Fundador, Maison Noir',
        ],
        [
            'title'       => 'Campanha Altitude',
            'description' => 'Estrategia de trafego pago e posicionamento digital para e-commerce.',
            'category'    => 'Marketing Digital',
            'client'      => 'Altitude Sports',
            'year'        => '2024',
            'slug'        => 'campanha-altitude',
            'services'    => ['Estrategia de Midia', 'Trafego Pago', 'CRO', 'Analytics'],
            'challenge'   => 'E-commerce de artigos esportivos premium com alto custo de aquisicao e baixa taxa de conversao, competindo com marketplaces e grandes varejistas.',
            'solution'    => 'Implementamos uma estrategia omnichannel com foco em publicos qualificados, criativos de alta performance e otimizacao continua da jornada de compra. Redesenhamos paginas de produto e implementamos testes A/B sistematicos.',
            'results'     => [
                ['metric' => 'CAC', 'value' => '-65%', 'description' => 'Reducao no custo de aquisicao'],
                ['metric' => 'ROAS', 'value' => '4.2x', 'description' => 'Retorno sobre investimento em ads'],
                ['metric' => 'Receita', 'value' => '+180%', 'description' => 'Crescimento de receita em 12 meses'],
            ],
            'testimonial_text'   => 'Finalmente encontramos uma agencia que entende de numeros. A Harpia transformou nosso e-commerce em uma maquina de vendas previsivel e escalavel.',
            'testimonial_author' => 'Lucas Ferreira',
            'testimonial_role'   => 'COO, Altitude Sports',
        ],
        [
            'title'       => 'Narrativa Visual',
            'description' => 'Criacao de conteudo visual para redes sociais de marca premium.',
            'category'    => 'Conteudo & Design',
            'client'      => 'Casa Fina',
            'year'        => '2024',
            'slug'        => 'narrativa-visual',
            'services'    => ['Social Media', 'Producao de Conteudo', 'Design', 'Copywriting'],
            'challenge'   => 'Restaurante fine dining com presenca digital fraca, dependendo apenas de indicacoes para atrair novos clientes em um mercado cada vez mais competitivo.',
            'solution'    => 'Criamos uma estrategia de conteudo baseada em storytelling visual, destacando a experiencia gastronomica completa. Cada post foi pensado para transmitir a atmosfera unica do restaurante.',
            'results'     => [
                ['metric' => 'Seguidores', 'value' => '+15K', 'description' => 'Novos seguidores organicos em 6 meses'],
                ['metric' => 'Reservas', 'value' => '+95%', 'description' => 'Aumento nas reservas via Instagram'],
                ['metric' => 'Engajamento', 'value' => '8.5%', 'description' => 'Taxa media de engajamento'],
            ],
            'testimonial_text'   => 'Nossa presenca digital se transformou completamente. Hoje recebemos clientes que nos descobriram pelo Instagram e ja chegam encantados com a experiencia que vao ter.',
            'testimonial_author' => 'Chef Paulo Martins',
            'testimonial_role'   => 'Chef Executivo, Casa Fina',
        ],
    ];
}

/**
 * Executar migracao
 */
function harpia_run_migration() {
    $projects = harpia_get_migration_data();
    $results = [];
    $success_count = 0;
    $error_count = 0;

    foreach ($projects as $index => $project_data) {
        $result = harpia_migrate_single_project($project_data, $index + 1);

        if ($result['success']) {
            $success_count++;
        } else {
            $error_count++;
        }

        $results[] = $result;
    }

    return [
        'total'   => count($projects),
        'success' => $success_count,
        'errors'  => $error_count,
        'details' => $results,
    ];
}

/**
 * Migrar um unico projeto
 */
function harpia_migrate_single_project($data, $order) {
    // Verificar se ja existe um projeto com esse slug
    $existing = get_posts([
        'post_type'   => 'harpia_project',
        'meta_key'    => 'slug',
        'meta_value'  => $data['slug'],
        'numberposts' => 1,
    ]);

    if (!empty($existing)) {
        return [
            'success' => false,
            'title'   => $data['title'],
            'message' => 'Projeto ja existe (slug: ' . $data['slug'] . ')',
        ];
    }

    // Criar post
    $post_id = wp_insert_post([
        'post_type'    => 'harpia_project',
        'post_title'   => $data['title'],
        'post_excerpt' => $data['description'],
        'post_status'  => 'publish',
        'menu_order'   => $order,
    ]);

    if (is_wp_error($post_id)) {
        return [
            'success' => false,
            'title'   => $data['title'],
            'message' => 'Erro ao criar post: ' . $post_id->get_error_message(),
        ];
    }

    // Associar categoria
    $term = get_term_by('name', $data['category'], 'project_category');
    if ($term) {
        wp_set_object_terms($post_id, $term->term_id, 'project_category');
    }

    // Salvar campos ACF (se disponivel)
    if (function_exists('update_field')) {
        update_field('client', $data['client'], $post_id);
        update_field('year', $data['year'], $post_id);
        update_field('slug', $data['slug'], $post_id);
        update_field('challenge', $data['challenge'], $post_id);
        update_field('solution', $data['solution'], $post_id);
        update_field('testimonial_text', $data['testimonial_text'], $post_id);
        update_field('testimonial_author', $data['testimonial_author'], $post_id);
        update_field('testimonial_role', $data['testimonial_role'], $post_id);

        // Servicos (repeater)
        $services_data = [];
        foreach ($data['services'] as $service) {
            $services_data[] = ['service_name' => $service];
        }
        update_field('services', $services_data, $post_id);

        // Resultados (repeater)
        update_field('results', $data['results'], $post_id);
    } else {
        // Fallback: salvar como post meta
        update_post_meta($post_id, 'client', $data['client']);
        update_post_meta($post_id, 'year', $data['year']);
        update_post_meta($post_id, 'slug', $data['slug']);
        update_post_meta($post_id, 'challenge', $data['challenge']);
        update_post_meta($post_id, 'solution', $data['solution']);
    }

    return [
        'success' => true,
        'title'   => $data['title'],
        'post_id' => $post_id,
        'message' => 'Projeto migrado com sucesso',
    ];
}

/**
 * Adicionar pagina de admin para migracao
 */
function harpia_add_migration_page() {
    add_management_page(
        'Migrar Projetos Harpia',
        'Migrar Projetos Harpia',
        'manage_options',
        'harpia-migrate',
        'harpia_migration_page_content'
    );
}
add_action('admin_menu', 'harpia_add_migration_page');

/**
 * Conteudo da pagina de migracao
 */
function harpia_migration_page_content() {
    $migration_result = null;

    if (isset($_POST['run_migration']) && check_admin_referer('harpia_migrate_nonce')) {
        $migration_result = harpia_run_migration();
    }

    ?>
    <div class="wrap">
        <h1>Migrar Projetos Harpia</h1>

        <div class="card" style="max-width: 600px; padding: 20px;">
            <h2>Migracao de Dados</h2>
            <p>Este script ira migrar os 6 projetos estaticos do React para o WordPress.</p>

            <h3>Pre-requisitos:</h3>
            <ul style="list-style: disc; margin-left: 20px;">
                <li>ACF PRO instalado e ativado</li>
                <li>Campos ACF importados (acf-project-fields.json)</li>
                <li>Plugin harpia-portfolio.php ativo</li>
            </ul>

            <h3>Status:</h3>
            <ul style="list-style: none; margin-left: 0;">
                <li><?php echo function_exists('update_field') ? '' : 'L'; ?> ACF PRO</li>
                <li><?php echo post_type_exists('harpia_project') ? '' : 'L'; ?> Custom Post Type</li>
                <li><?php echo taxonomy_exists('project_category') ? '' : 'L'; ?> Taxonomia de Categorias</li>
            </ul>

            <?php if ($migration_result): ?>
                <div class="notice notice-<?php echo $migration_result['errors'] > 0 ? 'warning' : 'success'; ?>" style="padding: 10px;">
                    <h3>Resultado da Migracao</h3>
                    <p>
                        <strong>Total:</strong> <?php echo $migration_result['total']; ?> projetos<br>
                        <strong>Sucesso:</strong> <?php echo $migration_result['success']; ?><br>
                        <strong>Erros:</strong> <?php echo $migration_result['errors']; ?>
                    </p>

                    <h4>Detalhes:</h4>
                    <ul style="list-style: none;">
                        <?php foreach ($migration_result['details'] as $detail): ?>
                            <li>
                                <?php echo $detail['success'] ? '' : 'L'; ?>
                                <strong><?php echo esc_html($detail['title']); ?></strong>
                                - <?php echo esc_html($detail['message']); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form method="post" style="margin-top: 20px;">
                <?php wp_nonce_field('harpia_migrate_nonce'); ?>
                <button type="submit" name="run_migration" class="button button-primary button-large">
                    Executar Migracao
                </button>
            </form>
        </div>

        <div class="card" style="max-width: 600px; padding: 20px; margin-top: 20px;">
            <h2>Proximos Passos</h2>
            <ol>
                <li>Execute a migracao acima</li>
                <li>Acesse <a href="<?php echo admin_url('edit.php?post_type=harpia_project'); ?>">Portfolio > Todos os Projetos</a></li>
                <li>Adicione as imagens de cada projeto manualmente</li>
                <li>Teste a API: <a href="<?php echo rest_url('harpia/v1/projects'); ?>" target="_blank">/wp-json/harpia/v1/projects</a></li>
            </ol>
        </div>
    </div>
    <?php
}

// Se executado via WP-CLI
if (defined('WP_CLI') && WP_CLI) {
    $result = harpia_run_migration();
    WP_CLI::success("Migracao concluida: {$result['success']}/{$result['total']} projetos migrados");

    foreach ($result['details'] as $detail) {
        if ($detail['success']) {
            WP_CLI::log(" {$detail['title']} - {$detail['message']}");
        } else {
            WP_CLI::warning("L {$detail['title']} - {$detail['message']}");
        }
    }
}
