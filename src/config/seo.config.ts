/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRALIZADA DE SEO - HARPIA AGÊNCIA
 * ============================================================================
 *
 * Este arquivo contém todas as configurações de SEO do site.
 * Edite os valores abaixo para personalizar o SEO de todas as páginas.
 *
 * Após editar, execute `npm run build` para gerar o sitemap atualizado.
 */

// =============================================================================
// 1. INFORMAÇÕES DA EMPRESA (Schema.org Organization)
// =============================================================================

export const COMPANY_INFO = {
  // Nome da empresa (aparece no schema e meta tags)
  name: 'Agência Harpia',

  // URL base do site (SEM barra no final)
  url: 'https://agenciaharpia.com.br',

  // Slogan/tagline
  tagline: 'Enxergue Mais Longe. Você mais alto.',

  // Descrição da empresa (usada no schema Organization)
  description:
    'Agência de marketing digital especializada em fotografia, branding e estratégias digitais. Enxergue mais longe.',

  // Logo da empresa (caminho relativo ao public/)
  logo: '/harpia-logo.webp',

  // Imagem OG padrão (quando a página não especifica uma)
  defaultOgImage: '/og-image.jpg',

  // Idioma do site
  locale: 'pt_BR',

  // Ano de fundação (opcional)
  foundingYear: 2020,
};

// =============================================================================
// 2. CONTATO E LOCALIZAÇÃO
// =============================================================================

export const CONTACT_INFO = {
  // Email principal
  email: 'contato@agenciaharpia.com.br',

  // Telefone (formato internacional)
  phone: '+55 48 99966-1913',

  // WhatsApp (apenas números)
  whatsapp: '5548999661913',

  // Endereço
  address: {
    street: 'Tv. dos Comerciários, 31',
    neighborhood: 'Oficinas',
    city: 'Tubarão',
    state: 'SC',
    postalCode: '88702-120',
    country: 'BR',
  },

  // Horário de funcionamento
  openingHours: {
    weekdays: '09:00-18:00',
    saturday: '09:00-13:00',
    sunday: 'Fechado',
  },
};

// =============================================================================
// 3. REDES SOCIAIS (aparecem no schema Organization)
// =============================================================================

export const SOCIAL_LINKS = {
  // Instagram (URL completa)
  instagram: 'https://www.instagram.com/harpia.agencia',

  // Facebook (URL completa) - deixe vazio se não tiver
  facebook: '',

  // LinkedIn (URL completa)
  linkedin: '',

  // YouTube (URL completa)
  youtube: '',

  // TikTok (URL completa)
  tiktok: '',

  // Twitter/X (URL completa)
  twitter: '',

  // Behance (URL completa)
  behance: '',
};

// =============================================================================
// 4. CONFIGURAÇÕES DE PÁGINAS
// =============================================================================

export const PAGE_SEO = {
  // ----- HOME -----
  home: {
    title: 'Harpia - Agência de Marketing Premium | Conectando Visões',
    description:
      'Somos uma agência de marketing especializada em criar pontes entre empresas e seus clientes. Estratégia, design e tecnologia para impactar seu negócio.',
    keywords:
      'agência marketing, design digital, branding, estratégia, digital agency, marketing digital, fotografia profissional',
    ogTitle: 'Harpia - Agência de Marketing Premium',
    ogDescription: 'Conectando visões. Voando mais alto. Enxergando mais longe.',
    ogImage: '/og/home.jpg',
  },

  // ----- SERVIÇOS -----
  services: {
    title: 'Serviços - Harpia Agência',
    description:
      'Fotografia, Branding, Conteúdo e Marketing Digital. Soluções completas para elevar sua marca.',
    keywords:
      'fotografia profissional, branding, design, marketing digital, conteúdo, identidade visual',
    ogImage: '/og/servicos.jpg',
  },

  // ----- PACOTES -----
  packages: {
    title: 'Pacotes - Harpia Agência',
    description:
      'Pacotes de serviços personalizados para cada fase do seu negócio. Do essencial ao premium.',
    keywords: 'pacotes marketing, planos, preços, serviços de marketing',
    ogImage: '/og/pacotes.jpg',
  },

  // ----- PORTFOLIO -----
  portfolio: {
    title: 'Portfólio - Harpia Agência',
    description:
      'Conheça nossos projetos. Cases de sucesso em fotografia, branding, design e marketing digital.',
    keywords: 'portfolio, projetos, cases, fotografia, branding, design, marketing digital',
    ogImage: '/og/portfolio.jpg',
  },

  // ----- SOBRE -----
  about: {
    title: 'Sobre Nós - Harpia Agência',
    description:
      'Conheça a Harpia. Nossa história, valores e a equipe por trás de cada projeto de sucesso.',
    keywords: 'sobre, história, equipe, valores, missão, visão',
    ogImage: '/og/sobre.jpg',
  },

  // ----- CONTATO -----
  contact: {
    title: 'Contato - Harpia Agência',
    description:
      'Entre em contato conosco. Estamos prontos para transformar sua marca e impulsionar seu negócio.',
    keywords: 'contato, orçamento, fale conosco, whatsapp',
    ogImage: '/og/contato.jpg',
  },

  // ----- 404 -----
  notFound: {
    title: 'Página não encontrada - Harpia Agência',
    description: 'A página que você procura não existe ou foi movida.',
    noindex: true, // Não indexar página 404
  },
};

// =============================================================================
// 5. SERVIÇOS OFERECIDOS (para schema Service)
// =============================================================================

export const SERVICES_LIST = [
  {
    name: 'Fotografia Profissional',
    description:
      'Fotografia de alta qualidade para produtos, eventos, retratos corporativos e ensaios de moda.',
    serviceType: 'Photography',
  },
  {
    name: 'Branding e Identidade Visual',
    description:
      'Desenvolvimento completo de identidade visual, incluindo logo, paleta de cores, tipografia e manual de marca.',
    serviceType: 'Branding',
  },
  {
    name: 'Marketing Digital',
    description:
      'Estratégias digitais completas incluindo gestão de redes sociais, tráfego pago e SEO.',
    serviceType: 'Digital Marketing',
  },
  {
    name: 'Produção de Conteúdo',
    description:
      'Criação de conteúdo estratégico para redes sociais, blogs e materiais institucionais.',
    serviceType: 'Content Production',
  },
  {
    name: 'Design Gráfico',
    description: 'Design de peças gráficas, materiais impressos, embalagens e comunicação visual.',
    serviceType: 'Graphic Design',
  },
  {
    name: 'Consultoria de Marca',
    description:
      'Consultoria estratégica para posicionamento de marca, análise de mercado e planejamento.',
    serviceType: 'Brand Consulting',
  },
];

// =============================================================================
// 6. PROJETOS DO PORTFOLIO (slugs para sitemap)
// =============================================================================

export const PORTFOLIO_PROJECTS = [
  {
    slug: 'branding-cafe-origem',
    name: 'Café Origem - Branding Completo',
    description: 'Desenvolvimento de identidade visual para cafeteria artesanal.',
  },
  {
    slug: 'fotografia-moda-verao',
    name: 'Coleção Verão 2024',
    description: 'Ensaio fotográfico para coleção de moda verão.',
  },
  {
    slug: 'identidade-visual-tech',
    name: 'TechStart - Identidade Visual',
    description: 'Branding completo para startup de tecnologia.',
  },
  {
    slug: 'campanha-digital-fitness',
    name: 'FitLife - Campanha Digital',
    description: 'Campanha de marketing digital para academia.',
  },
  // Adicione novos projetos aqui...
];

// =============================================================================
// 7. CONFIGURAÇÕES DO SITEMAP
// =============================================================================

export const SITEMAP_CONFIG = {
  // Rotas estáticas com prioridade e frequência de atualização
  staticRoutes: [
    { path: '/', priority: 1.0, changefreq: 'weekly' as const },
    { path: '/servicos', priority: 0.9, changefreq: 'monthly' as const },
    { path: '/pacotes', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/portfolio', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/sobre', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/contato', priority: 0.8, changefreq: 'monthly' as const },
  ],

  // Prioridade padrão para páginas de portfolio
  portfolioPriority: 0.7,
  portfolioChangefreq: 'monthly' as const,
};

// =============================================================================
// 8. KEYWORDS GLOBAIS (adicionadas a todas as páginas)
// =============================================================================

export const GLOBAL_KEYWORDS = [
  'harpia',
  'agência',
  'marketing',
  'digital',
  'fotografia',
  'branding',
  'São Paulo',
  'Brasil',
];

// =============================================================================
// HELPERS - NÃO EDITAR ABAIXO DESTA LINHA
// =============================================================================

/**
 * Retorna array de URLs das redes sociais (para schema Organization)
 */
export const getSocialUrls = (): string[] => {
  return Object.values(SOCIAL_LINKS).filter((url) => url && url.length > 0);
};

/**
 * Retorna keywords combinadas (globais + específicas da página)
 */
export const getKeywords = (pageKeywords?: string): string => {
  const globalStr = GLOBAL_KEYWORDS.join(', ');
  return pageKeywords ? `${pageKeywords}, ${globalStr}` : globalStr;
};

/**
 * Retorna URL canônica completa
 */
export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${COMPANY_INFO.url}${cleanPath}`;
};

/**
 * Retorna URL completa da imagem OG
 */
export const getOgImageUrl = (imagePath?: string): string => {
  const image = imagePath || COMPANY_INFO.defaultOgImage;
  if (image.startsWith('http')) return image;
  return `${COMPANY_INFO.url}${image}`;
};

// Tipo para configuração de página
export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
}
