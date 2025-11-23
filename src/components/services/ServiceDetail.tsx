import React from 'react';
import { Reveal } from '../Reveal';
import { Camera, Box, PenTool, Monitor } from 'lucide-react';
import type { ServiceItem } from '../../types';

interface ServiceDetailProps {
  service: ServiceItem;
  index: number;
}

const iconMap = {
  foto: Camera,
  branding: Box,
  content: PenTool,
  marketing: Monitor,
};

const serviceFeatures: Record<string, string[]> = {
  foto: [
    'Fotografia de Interiores Premium',
    'Arquitetura e Espaços Corporativos',
    'Produto com Estética Cinematográfica',
    'Lifestyle e Campanha Publicitária',
  ],
  branding: [
    'Estratégia de Marca Completa',
    'Design de Logotipo e Identidade Visual',
    'Manual de Marca e Brandbook',
    'Posicionamento e Arquitetura de Marca',
  ],
  content: [
    'Copywriting Persuasivo e Estratégico',
    'Design para Redes Sociais',
    'Calendário Editorial Mensal',
    'Motion Design e Animações',
  ],
  marketing: [
    'Estratégia de Tráfego Pago (Meta & Google Ads)',
    'SEO e Marketing de Conteúdo',
    'Analytics e Relatórios de Performance',
    'Email Marketing e Automação',
  ],
};

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, index }) => {
  const Icon = iconMap[service.id as keyof typeof iconMap] || Camera;
  const features = serviceFeatures[service.id] || [];
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
    >
      {/* Text Content */}
      <div className="flex-1 space-y-6">
        <Reveal>
          <div className="text-gray-500 mb-4">
            <Icon size={32} strokeWidth={1} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-serif text-4xl text-white">{service.title}</h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-gray-400 font-light leading-relaxed text-lg">{service.description}</p>
        </Reveal>

        {/* Features List */}
        {features.length > 0 && (
          <Reveal delay={300}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 pt-8 border-t border-white/10">
              {features.map((feature) => (
                <li key={feature} className="text-sm text-harpia-accent font-light">
                  • {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>

      {/* Image */}
      <div className="flex-1 w-full">
        <Reveal delay={100}>
          <div className="relative aspect-[4/3] overflow-hidden group">
            <img
              src={`${service.image}?grayscale`}
              alt={service.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 border border-white/10" />
          </div>
        </Reveal>
      </div>
    </div>
  );
};
