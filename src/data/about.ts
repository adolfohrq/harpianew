import { AboutValue, MilestoneItem, TeamMember } from '../types';

export const ABOUT_HERO = {
  title: 'Sobre Nós',
  subtitle: 'Conectando visões. Voando mais alto. Enxergando mais longe.',
  description:
    'Somos uma agência de marketing que combina estratégia, design e tecnologia para criar conexões autênticas entre marcas e pessoas.',
};

export const ABOUT_VALUES: AboutValue[] = [
  {
    id: '1',
    title: 'Visão',
    description:
      'Enxergamos além do óbvio. Como a harpia que sobrevoa grandes altitudes, identificamos oportunidades onde outros veem apenas obstáculos.',
    icon: 'Eye',
  },
  {
    id: '2',
    title: 'Precisão',
    description:
      'Cada movimento é calculado. Cada estratégia é desenhada com precisão cirúrgica para atingir resultados extraordinários.',
    icon: 'Target',
  },
  {
    id: '3',
    title: 'Autenticidade',
    description:
      'Acreditamos em conexões genuínas. Trabalhamos para criar narrativas que ressoam verdadeiramente com seu público.',
    icon: 'Heart',
  },
  {
    id: '4',
    title: 'Excelência',
    description:
      'Não nos contentamos com o mediano. Buscamos a excelência em cada projeto, em cada detalhe, em cada entrega.',
    icon: 'Award',
  },
];

export const ABOUT_STORY = {
  title: 'Nossa História',
  paragraphs: [
    'A Harpia nasceu da observação de um padrão no mercado: agências que prometem resultados extraordinários, mas entregam soluções genéricas. Decidimos voar diferente.',
    'Inspirados pela harpia, a ave de rapina mais poderosa das Américas, construímos uma agência que combina visão estratégica aguçada com execução impecável. Assim como a harpia domina os céus da floresta, dominamos o universo do marketing digital.',
    'Nosso nome não é apenas uma referência à ave. É um compromisso com a forma como trabalhamos: com visão ampla, precisão no ataque e resultados que impressionam.',
  ],
};

export const ABOUT_MILESTONES: MilestoneItem[] = [
  {
    year: '2020',
    title: 'Fundação',
    description: 'Início da jornada com foco em estratégia digital e branding premium.',
  },
  {
    year: '2021',
    title: 'Expansão',
    description: 'Crescimento da equipe e diversificação dos serviços oferecidos.',
  },
  {
    year: '2022',
    title: 'Reconhecimento',
    description: 'Primeiros prêmios e reconhecimento no mercado nacional.',
  },
  {
    year: '2023',
    title: 'Consolidação',
    description: 'Portfólio robusto com marcas de destaque em diversos segmentos.',
  },
  {
    year: '2024',
    title: 'Inovação',
    description: 'Integração de IA e novas tecnologias aos processos criativos.',
  },
];

export const ABOUT_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'CEO & Estrategista',
    image: '/images/team/ana-silva.jpg',
    bio: '15 anos de experiência em marketing estratégico e branding.',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    role: 'Diretor Criativo',
    image: '/images/team/carlos-mendes.jpg',
    bio: 'Designer premiado com foco em identidade visual e design de alto impacto.',
  },
  {
    id: '3',
    name: 'Mariana Costa',
    role: 'Head de Performance',
    image: '/images/team/mariana-costa.jpg',
    bio: 'Especialista em mídia paga e otimização de campanhas digitais.',
  },
  {
    id: '4',
    name: 'Rafael Torres',
    role: 'Tech Lead',
    image: '/images/team/rafael-torres.jpg',
    bio: 'Desenvolvedor full-stack com expertise em soluções web de alta performance.',
  },
];

export const ABOUT_MISSION = {
  title: 'Nossa Missão',
  description:
    'Transformar marcas em referências de mercado através de estratégias integradas que combinam criatividade, dados e tecnologia. Voamos alto para que nossos clientes alcancem resultados extraordinários.',
};

export const ABOUT_VISION = {
  title: 'Nossa Visão',
  description:
    'Ser reconhecida como a agência premium de referência em marketing estratégico, conhecida por elevar marcas a patamares inalcançáveis através de soluções inovadoras e resultados mensuráveis.',
};
