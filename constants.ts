import { NavLink, PricingPackage, Project, ServiceItem, Testimonial } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Serviços', path: '/servicos' },
  { label: 'Pacotes', path: '/pacotes' },
  { label: 'Contato', path: '/contato' },
];

export const PROJECTS: Project[] = [
  { id: '1', title: 'Essência Minimalista', category: 'Interiores', image: 'https://picsum.photos/seed/arch1/800/600' },
  { id: '2', title: 'Visão Urbana', category: 'Arquitetura', image: 'https://picsum.photos/seed/arch2/800/600' },
  { id: '3', title: 'Luz & Sombra', category: 'Produto', image: 'https://picsum.photos/seed/prod1/800/600' },
  { id: '4', title: 'Identidade Forte', category: 'Branding', image: 'https://picsum.photos/seed/brand1/800/600' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'foto',
    title: 'Fotografia & Vídeo',
    description: 'Capturamos a alma do seu negócio. Especialistas em fotografia de interiores, arquitetura e produtos com estética cinematográfica.',
    image: 'https://picsum.photos/seed/cam/1200/800'
  },
  {
    id: 'branding',
    title: 'Branding & Identidade',
    description: 'Construção de marcas que não apenas são vistas, mas sentidas. Do logotipo ao tom de voz.',
    image: 'https://picsum.photos/seed/brand/1200/800'
  },
  {
    id: 'content',
    title: 'Conteúdo & Design',
    description: 'Narrativas visuais e textuais que engajam. Design estratégico para redes sociais e mídias offline.',
    image: 'https://picsum.photos/seed/design/1200/800'
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Estratégias de tráfego e posicionamento para fazer sua marca voar mais alto e alcançar quem realmente importa.',
    image: 'https://picsum.photos/seed/mark/1200/800'
  }
];

export const PACKAGES: PricingPackage[] = [
  {
    id: 'filhote',
    name: 'Filhote',
    description: 'Para quem está começando a abrir as asas.',
    level: 'entry',
    features: [
      { text: '12 Posts / Mês (Design + Legenda)', included: true },
      { text: 'Agendamento de Posts', included: true },
      { text: 'Relatório Mensal Básico', included: true },
      { text: 'Sessão Fotográfica (Trimestral)', included: false },
      { text: 'Gestão de Comunidade', included: false },
    ]
  },
  {
    id: 'jovem',
    name: 'Jovem Harpia',
    description: 'Crescimento constante e presença marcante.',
    level: 'mid',
    features: [
      { text: '20 Posts / Mês (Design + Reels)', included: true },
      { text: 'Stories Semanais (Roteiro)', included: true },
      { text: 'Agendamento e Monitoramento', included: true },
      { text: 'Relatório de Performance', included: true },
      { text: '1 Sessão de Foto/Vídeo (Bimestral)', included: true },
    ]
  },
  {
    id: 'gaviao',
    name: 'Gavião-Real',
    description: 'Domínio total do território digital.',
    level: 'pro',
    features: [
      { text: 'Posts Diários (Estratégia Full)', included: true },
      { text: 'Produção de Reels Profissional', included: true },
      { text: 'Gestão Completa de Comunidade', included: true },
      { text: 'Sessão Mensal Foto & Vídeo', included: true },
      { text: 'Consultoria de Marca', included: true },
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    text: "A Harpia elevou nossa marca a um patamar que não imaginávamos ser possível. A estética minimalista e a estratégia afiada foram divisores de águas.",
    author: "Carlos Eduardo",
    company: "CEO, ArchDecor"
  },
  {
    id: '2',
    text: "Não é apenas sobre posts bonitos, é sobre consistência e visão de mercado. O time captou nossa essência na primeira reunião.",
    author: "Mariana Solis",
    company: "Diretora Criativa, Aura"
  },
  {
    id: '3',
    text: "O rebranding transformou a percepção do nosso produto. Vendas aumentaram 40% no primeiro mês de nova identidade.",
    author: "Felipe Andreoli",
    company: "Founder, UrbanTech"
  }
];