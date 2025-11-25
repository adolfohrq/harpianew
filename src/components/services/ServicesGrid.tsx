import React, { useState } from 'react';
import { Camera, Box, PenTool, Monitor, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data';
import { Reveal } from '../Reveal';
import { OptimizedImage } from '../ui/OptimizedImage';

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

interface ServiceCardProps {
  service: (typeof SERVICES)[0];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[service.id as keyof typeof iconMap] || Camera;
  const features = serviceFeatures[service.id] || [];
  const isEven = index % 2 === 0;

  return (
    <Reveal delay={index * 100}>
      <div
        className={`group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 transition-all duration-700 ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } flex flex-col lg:flex`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Side */}
        <div className="relative lg:w-1/2 h-[300px] lg:h-[500px] overflow-hidden">
          <OptimizedImage
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-harpia-black/20 group-hover:bg-harpia-black/10 transition-all duration-500" />

          {/* Service Number Badge */}
          <div className="absolute top-6 left-6 z-10">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border border-white/50 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="font-serif text-xl text-harpia-black">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #191919 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Icon */}
          <div className="relative mb-6">
            <div className="inline-flex p-4 bg-harpia-black rounded-sm group-hover:bg-harpia-carbon transition-colors duration-500">
              <Icon size={28} className="text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-3xl lg:text-4xl text-harpia-black leading-tight mb-4 relative">
            {service.title}
          </h3>

          {/* Description */}
          <p className="font-sans text-base text-gray-600 leading-relaxed mb-8 relative">
            {service.description}
          </p>

          {/* Features List */}
          <div
            className={`space-y-3 transition-all duration-500 relative ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'
            }`}
          >
            {features.map((feature, idx) => (
              <div
                key={feature}
                className="flex items-start gap-3 text-sm text-gray-700"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="mt-0.5 w-5 h-5 rounded-full bg-harpia-black/5 flex items-center justify-center shrink-0 group-hover:bg-harpia-black/10 transition-colors duration-300">
                  <Check size={12} className="text-harpia-black" strokeWidth={2.5} />
                </div>
                <span className="font-light">{feature}</span>
              </div>
            ))}
          </div>

          {/* Hover Arrow */}
          <div
            className={`absolute bottom-8 right-8 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <div className="w-12 h-12 rounded-full border border-harpia-black/20 flex items-center justify-center group-hover:bg-harpia-black group-hover:border-harpia-black transition-all duration-300">
              <ArrowUpRight
                size={20}
                className="text-harpia-black group-hover:text-white transition-colors duration-300"
              />
            </div>
          </div>

          {/* Decorative Line */}
          <div
            className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-1 h-0 bg-harpia-black group-hover:h-32 transition-all duration-700`}
          />
        </div>
      </div>
    </Reveal>
  );
};

export const ServicesGrid: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-harpia-black/[0.02] rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-harpia-black/[0.02] rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-harpia-black/30" />
              <span className="font-sans text-xs text-harpia-black/50 tracking-[0.3em] uppercase">
                O Que Fazemos
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-6xl text-harpia-black leading-[1.1] mb-6">
              SOLUÇÕES QUE
              <br />
              <span className="italic text-gray-400">TRANSFORMAM</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-sans text-lg text-gray-600 leading-relaxed font-light">
              Cada serviço é pensado estrategicamente para gerar impacto real e resultados
              mensuráveis. Combinamos criatividade com dados para elevar sua marca.
            </p>
          </Reveal>
        </div>

        {/* Services Cards */}
        <div className="space-y-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
