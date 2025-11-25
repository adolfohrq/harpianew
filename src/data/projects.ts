import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Essência Minimalista',
    category: 'Fotografia & Vídeo',
    image: 'https://picsum.photos/seed/arch1/800/600',
    slug: 'essencia-minimalista',
    description: 'Ensaio fotográfico de interiores com estética minimalista e cinematográfica.',
    client: 'Studio Architettura',
    year: '2024',
    services: ['Direção de Arte', 'Fotografia de Interiores', 'Pós-produção'],
    challenge:
      'O cliente precisava de um material visual que capturasse a essência dos seus projetos arquitetônicos de forma única, destacando-se em um mercado saturado de imagens genéricas de interiores.',
    solution:
      'Desenvolvemos uma linguagem visual própria baseada em luz natural e composições geométricas precisas. Cada ambiente foi fotografado em múltiplos horários para capturar a melhor iluminação, resultando em imagens com forte impacto emocional.',
    results: [
      {
        metric: 'Engajamento',
        value: '+340%',
        description: 'Aumento no engajamento das redes sociais',
      },
      {
        metric: 'Leads',
        value: '+85',
        description: 'Novos leads qualificados no primeiro mês',
      },
      {
        metric: 'Conversão',
        value: '12%',
        description: 'Taxa de conversão de visitantes',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/arch1-1/1200/800',
      'https://picsum.photos/seed/arch1-2/1200/800',
      'https://picsum.photos/seed/arch1-3/1200/800',
      'https://picsum.photos/seed/arch1-4/800/1200',
      'https://picsum.photos/seed/arch1-5/1200/800',
      'https://picsum.photos/seed/arch1-6/800/1200',
    ],
    testimonial: {
      text: 'A Harpia capturou perfeitamente a essência do nosso trabalho. As imagens superaram todas as expectativas e se tornaram a base de toda nossa comunicação visual.',
      author: 'Ricardo Mendes',
      role: 'Diretor Criativo, Studio Architettura',
    },
  },
  {
    id: '2',
    title: 'Visão Urbana',
    category: 'Fotografia & Vídeo',
    image: 'https://picsum.photos/seed/arch2/800/600',
    slug: 'visao-urbana',
    description: 'Captura arquitetônica urbana com foco em linhas e perspectivas.',
    client: 'Urban Construtora',
    year: '2024',
    services: ['Fotografia Aérea', 'Fotografia Arquitetônica', 'Vídeo Institucional'],
    challenge:
      'A construtora precisava documentar seu mais ambicioso empreendimento de forma que comunicasse inovação e qualidade premium aos investidores e compradores em potencial.',
    solution:
      'Combinamos fotografia aérea com drone e capturas em nível de rua para criar uma narrativa visual completa. O resultado é um conjunto de imagens que destaca tanto a grandiosidade do projeto quanto os detalhes de acabamento.',
    results: [
      {
        metric: 'Vendas',
        value: '100%',
        description: 'Unidades vendidas em 6 meses',
      },
      {
        metric: 'Mídia',
        value: '15+',
        description: 'Publicações em veículos especializados',
      },
      {
        metric: 'Visualizações',
        value: '2.5M',
        description: 'Visualizações do vídeo institucional',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/arch2-1/1200/800',
      'https://picsum.photos/seed/arch2-2/1200/800',
      'https://picsum.photos/seed/arch2-3/800/1200',
      'https://picsum.photos/seed/arch2-4/1200/800',
    ],
    testimonial: {
      text: 'O trabalho da Harpia foi fundamental para o sucesso de vendas do empreendimento. As imagens transmitiram exatamente o valor que queríamos comunicar.',
      author: 'Fernanda Costa',
      role: 'Diretora de Marketing, Urban Construtora',
    },
  },
  {
    id: '3',
    title: 'Luz & Sombra',
    category: 'Conteúdo & Design',
    image: 'https://picsum.photos/seed/prod1/800/600',
    slug: 'luz-sombra',
    description: 'Design visual para campanha de produto com foco em contraste e elegância.',
    client: 'Lumière Cosméticos',
    year: '2024',
    services: ['Design de Campanha', 'Fotografia de Produto', 'Direção de Arte'],
    challenge:
      'Lançamento de uma nova linha de skincare premium que precisava se posicionar entre as marcas de luxo do mercado, competindo com players internacionais estabelecidos.',
    solution:
      'Criamos uma identidade visual para a campanha baseada em contrastes dramáticos de luz e sombra, evocando sofisticação e mistério. Cada peça foi meticulosamente produzida para transmitir a qualidade premium dos produtos.',
    results: [
      {
        metric: 'Awareness',
        value: '+500%',
        description: 'Aumento no reconhecimento de marca',
      },
      {
        metric: 'ROI',
        value: '8.5x',
        description: 'Retorno sobre investimento em mídia',
      },
      {
        metric: 'Vendas',
        value: '+220%',
        description: 'Crescimento de vendas no trimestre',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/prod1-1/1200/800',
      'https://picsum.photos/seed/prod1-2/800/1200',
      'https://picsum.photos/seed/prod1-3/1200/800',
      'https://picsum.photos/seed/prod1-4/1200/800',
      'https://picsum.photos/seed/prod1-5/800/1200',
    ],
    testimonial: {
      text: 'A campanha da Harpia nos colocou em outro patamar. Passamos a ser percebidos como uma marca de luxo genuína, competindo de igual para igual com marcas internacionais.',
      author: 'Marina Alves',
      role: 'CEO, Lumière Cosméticos',
    },
  },
  {
    id: '4',
    title: 'Identidade Forte',
    category: 'Branding & Identidade',
    image: 'https://picsum.photos/seed/brand1/800/600',
    slug: 'identidade-forte',
    description: 'Construção de identidade visual completa para marca de luxo.',
    client: 'Maison Noir',
    year: '2023',
    services: ['Brand Strategy', 'Identidade Visual', 'Guidelines de Marca', 'Aplicações'],
    challenge:
      'Uma nova marca de moda masculina de luxo precisava de uma identidade que comunicasse sofisticação atemporal, sem cair nos clichês do segmento.',
    solution:
      'Desenvolvemos uma identidade baseada em minimalismo extremo e tipografia personalizada. O sistema visual é flexível o suficiente para diferentes aplicações, mas mantém uma consistência impecável em todos os pontos de contato.',
    results: [
      {
        metric: 'Valor de Marca',
        value: 'R$2.5M',
        description: 'Valuation após 1 ano de operação',
      },
      {
        metric: 'Reconhecimento',
        value: '78%',
        description: 'Entre o público-alvo após 6 meses',
      },
      {
        metric: 'Consistência',
        value: '100%',
        description: 'Aplicação correta em todos os canais',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/brand1-1/1200/800',
      'https://picsum.photos/seed/brand1-2/1200/800',
      'https://picsum.photos/seed/brand1-3/1200/800',
      'https://picsum.photos/seed/brand1-4/800/1200',
      'https://picsum.photos/seed/brand1-5/1200/800',
    ],
    testimonial: {
      text: 'A Harpia entendeu nossa visão desde o primeiro briefing. A identidade que criaram é exatamente o que sonhávamos - atemporal, sofisticada e única.',
      author: 'André Bastos',
      role: 'Fundador, Maison Noir',
    },
  },
  {
    id: '5',
    title: 'Campanha Altitude',
    category: 'Marketing Digital',
    image: 'https://picsum.photos/seed/mkt1/800/600',
    slug: 'campanha-altitude',
    description: 'Estratégia de tráfego pago e posicionamento digital para e-commerce.',
    client: 'Altitude Sports',
    year: '2024',
    services: ['Estratégia de Mídia', 'Tráfego Pago', 'CRO', 'Analytics'],
    challenge:
      'E-commerce de artigos esportivos premium com alto custo de aquisição e baixa taxa de conversão, competindo com marketplaces e grandes varejistas.',
    solution:
      'Implementamos uma estratégia omnichannel com foco em públicos qualificados, criativos de alta performance e otimização contínua da jornada de compra. Redesenhamos páginas de produto e implementamos testes A/B sistemáticos.',
    results: [
      {
        metric: 'CAC',
        value: '-65%',
        description: 'Redução no custo de aquisição',
      },
      {
        metric: 'ROAS',
        value: '4.2x',
        description: 'Retorno sobre investimento em ads',
      },
      {
        metric: 'Receita',
        value: '+180%',
        description: 'Crescimento de receita em 12 meses',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/mkt1-1/1200/800',
      'https://picsum.photos/seed/mkt1-2/1200/800',
      'https://picsum.photos/seed/mkt1-3/1200/800',
    ],
    testimonial: {
      text: 'Finalmente encontramos uma agência que entende de números. A Harpia transformou nosso e-commerce em uma máquina de vendas previsível e escalável.',
      author: 'Lucas Ferreira',
      role: 'COO, Altitude Sports',
    },
  },
  {
    id: '6',
    title: 'Narrativa Visual',
    category: 'Conteúdo & Design',
    image: 'https://picsum.photos/seed/cont1/800/600',
    slug: 'narrativa-visual',
    description: 'Criação de conteúdo visual para redes sociais de marca premium.',
    client: 'Casa Fina',
    year: '2024',
    services: ['Social Media', 'Produção de Conteúdo', 'Design', 'Copywriting'],
    challenge:
      'Restaurante fine dining com presença digital fraca, dependendo apenas de indicações para atrair novos clientes em um mercado cada vez mais competitivo.',
    solution:
      'Criamos uma estratégia de conteúdo baseada em storytelling visual, destacando a experiência gastronômica completa. Cada post foi pensado para transmitir a atmosfera única do restaurante.',
    results: [
      {
        metric: 'Seguidores',
        value: '+15K',
        description: 'Novos seguidores orgânicos em 6 meses',
      },
      {
        metric: 'Reservas',
        value: '+95%',
        description: 'Aumento nas reservas via Instagram',
      },
      {
        metric: 'Engajamento',
        value: '8.5%',
        description: 'Taxa média de engajamento',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/cont1-1/1200/800',
      'https://picsum.photos/seed/cont1-2/800/1200',
      'https://picsum.photos/seed/cont1-3/1200/800',
      'https://picsum.photos/seed/cont1-4/1200/800',
    ],
    testimonial: {
      text: 'Nossa presença digital se transformou completamente. Hoje recebemos clientes que nos descobriram pelo Instagram e já chegam encantados com a experiência que vão ter.',
      author: 'Chef Paulo Martins',
      role: 'Chef Executivo, Casa Fina',
    },
  },
];
