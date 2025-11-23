import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import { Camera, Box, PenTool, Monitor, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    'Edição Profissional RAW',
    'Produção de Vídeo 4K',
  ],
  branding: [
    'Estratégia de Marca Completa',
    'Design de Logotipo e Identidade Visual',
    'Manual de Marca e Brandbook',
    'Posicionamento e Arquitetura de Marca',
    'Naming e Tom de Voz',
    'Sistema de Design Escalável',
  ],
  content: [
    'Copywriting Persuasivo e Estratégico',
    'Design para Redes Sociais',
    'Calendário Editorial Mensal',
    'Motion Design e Animações',
    'Storytelling de Marca',
    'Conteúdo para Blog e SEO',
  ],
  marketing: [
    'Estratégia de Tráfego Pago (Meta & Google Ads)',
    'SEO e Marketing de Conteúdo',
    'Analytics e Relatórios de Performance',
    'Email Marketing e Automação',
    'Growth Hacking e Otimização de Conversão',
    'Consultoria de Presença Digital',
  ],
};

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[service.id as keyof typeof iconMap] || Camera;
  const features = serviceFeatures[service.id] || [];
  const isEven = index % 2 === 0;

  return (
    <Reveal delay={index * 100}>
      <div
        className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="flex-1 w-full">
          <div className="relative aspect-[4/3] overflow-hidden bg-harpia-carbon border border-white/10 group-hover:border-white/30 transition-all duration-700">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <img
              src={`${service.image}?grayscale`}
              alt={service.title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-[0.3]"
            />

            {/* Overlay with Icon */}
            <div className="absolute inset-0 bg-linear-to-t from-harpia-black via-harpia-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

            {/* Floating Icon */}
            <div className="absolute top-8 right-8 w-16 h-16 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-500 group-hover:rotate-12">
              <Icon
                size={32}
                strokeWidth={1.5}
                className="text-white group-hover:text-harpia-black transition-colors duration-500"
              />
            </div>

            {/* Number Badge */}
            <div className="absolute bottom-8 left-8">
              <div
                className={`font-serif text-8xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-700 ${isHovered ? 'scale-110' : 'scale-100'} transition-transform`}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="relative">
            <div
              className={`absolute ${isEven ? '-left-4' : '-right-4'} top-0 w-1 h-24 bg-linear-to-b from-white/50 via-white/20 to-transparent`}
            />
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500">
                Serviço {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              {service.title.split('&')[0]}
              {service.title.includes('&') && (
                <>
                  <br />
                  <span className="italic bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                    & {service.title.split('&')[1].trim()}
                  </span>
                </>
              )}
            </h2>

            <p className="text-gray-400 font-light leading-relaxed text-lg lg:text-xl max-w-xl">
              {service.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <Reveal key={idx} delay={(index + 1) * 100 + idx * 50}>
                <div className="group/feature flex items-start gap-3 p-4 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 mt-0.5 text-green-400 group-hover/feature:scale-110 transition-transform duration-300"
                  />
                  <span className="font-sans text-sm text-gray-300 group-hover/feature:text-white transition-colors">
                    {feature}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA Button */}
          <Reveal delay={(index + 1) * 100 + 300}>
            <Link
              to="/contato"
              className="group/cta inline-flex items-center gap-3 px-8 py-5 bg-white text-harpia-black hover:bg-harpia-black hover:text-white border-2 border-white transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 font-sans text-sm uppercase tracking-[0.2em] font-semibold">
                Solicitar Orçamento
              </span>
              <ArrowRight
                size={20}
                className="relative z-10 group-hover/cta:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
};
