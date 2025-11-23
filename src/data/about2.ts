import { LucideIcon, Target, Users, Zap, Award } from 'lucide-react';

export interface AboutValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AboutStat {
  value: string;
  label: string;
}

export const ABOUT_HERO = {
  title: 'Elevando Marcas ao \nExtraordinário',
  subtitle: 'SOMOS A HARPIA',
  description:
    'Não somos apenas uma agência. Somos parceiros estratégicos obcecados pela excelência e pela estética que converte.',
};

export const ABOUT_MANIFESTO = {
  title: 'Nossa Filosofia',
  paragraphs: [
    'Acreditamos que o design não é apenas visual, é funcional. Cada pixel, cada linha de código e cada estratégia é pensada para posicionar sua marca no topo do mercado.',
    'Nascemos da necessidade de unir performance técnica com estética de alto padrão. Em um mundo digital saturado, apenas o extraordinário se destaca e perdura.',
  ],
};

export const ABOUT_STATS: AboutStat[] = [
  { value: '+150', label: 'Projetos Entregues' },
  { value: '98%', label: 'Satisfação dos Clientes' },
  { value: '5+', label: 'Anos de Experiência' },
  { value: '24/7', label: 'Suporte Dedicado' },
];

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: 'Visão Estratégica',
    description:
      'Olhamos para o horizonte. Antecipamos tendências para manter sua marca sempre à frente.',
    icon: Target,
  },
  {
    title: 'Excelência Visual',
    description:
      'O belo vende. Criamos experiências visuais imersivas que capturam a atenção instantaneamente.',
    icon: Zap,
  },
  {
    title: 'Parceria Real',
    description:
      'Seu sucesso é nosso combustível. Trabalhamos lado a lado como uma extensão do seu time.',
    icon: Users,
  },
  {
    title: 'Resultados',
    description:
      'Focamos em métricas que importam. Design que não converte é apenas arte, e nós fazemos negócios.',
    icon: Award,
  },
];
