import { PricingPackage } from '../types';

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
    ],
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
    ],
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
    ],
  },
];
