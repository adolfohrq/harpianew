import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Camera,
  Box,
  PenTool,
  Monitor,
  Check,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { SERVICES } from '../data';
import { useMetaTags } from '../hooks/useMetaTags';
import { Reveal } from '../components/Reveal';
import { OptimizedImage } from '../components/ui';

interface ServiceCardProps {
  service: (typeof SERVICES)[0];
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

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[service.id as keyof typeof iconMap] || Camera;
  const features = serviceFeatures[service.id] || [];

  return (
    <Reveal delay={index * 100}>
      <div
        className="group relative h-[600px] overflow-hidden bg-harpia-carbon border border-white/5 hover:border-white/20 transition-all duration-700 rounded-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 opacity-20 group-hover:opacity-30 grayscale group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-harpia-carbon via-harpia-carbon/90 to-harpia-carbon/40" />
        </div>

        {/* Content */}
        <div className="relative h-full p-8 md:p-10 flex flex-col">
          {/* Header */}
          <div className="space-y-6">
            {/* Icon */}
            <div className="inline-flex p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 transition-all duration-500">
              <Icon size={32} className="text-harpia-accent" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <div>
              <span className="font-sans text-xs text-harpia-white/50 tracking-[0.3em] uppercase mb-2 block">
                Serviço {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-harpia-accent leading-tight">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="font-sans text-base text-harpia-white/80 leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          {/* Features List - Appears on Hover */}
          <div
            className={`mt-auto pt-8 border-t border-white/10 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="grid grid-cols-1 gap-2">
              {features.slice(0, 3).map((feature, idx) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 text-sm text-harpia-white/70 font-light transition-all duration-300"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <Check size={16} className="text-harpia-accent mt-0.5 shrink-0" strokeWidth={2} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(255,255,255,0.05)]" />
          </div>
        </div>
      </div>
    </Reveal>
  );
};

// Animated Counter Component
interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (now < endTime) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="font-serif text-5xl md:text-7xl text-harpia-accent">
      {count}
      {suffix}
    </div>
  );
};

export const Services: React.FC = () => {
  useMetaTags({
    title: 'Serviços - Harpia Agência',
    description:
      'Fotografia, Branding, Conteúdo e Marketing Digital. Soluções completas para elevar sua marca.',
    keywords: 'fotografia, branding, design, marketing digital, conteúdo',
  });

  const benefits = [
    {
      title: 'Abordagem Estratégica',
      description: 'Cada projeto começa com análise profunda do mercado e objetivos claros.',
    },
    {
      title: 'Equipe Multidisciplinar',
      description:
        'Profissionais especializados trabalhando em sinergia para resultados excepcionais.',
    },
    {
      title: 'Resultados Mensuráveis',
      description: 'Acompanhamento de métricas e ROI em todas as etapas do projeto.',
    },
  ];

  const stats = [
    { value: 250, suffix: '+', label: 'Projetos Entregues' },
    { value: 98, suffix: '%', label: 'Satisfação dos Clientes' },
    { value: 50, suffix: '+', label: 'Marcas Atendidas' },
    { value: 5, suffix: 'x', label: 'ROI Médio' },
  ];

  return (
    <div className="w-full relative bg-harpia-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 md:py-40">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-white/2 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-white/1.5 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-harpia-accent/[0.02] rounded-full blur-[150px] animate-pulse"
            style={{ animationDelay: '4s', animationDuration: '8s' }}
          />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Diagonal Lines Decoration */}
        <div className="absolute top-20 left-0 w-64 h-px bg-linear-to-r from-white/10 to-transparent" />
        <div className="absolute bottom-20 right-0 w-64 h-px bg-linear-to-l from-white/10 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
              <Sparkles size={14} className="text-harpia-accent" />
              <span className="font-sans text-xs text-harpia-white/90 tracking-[0.2em] uppercase">
                Excelência em Cada Detalhe
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-harpia-accent">
              SERVIÇOS QUE
              <br />
              <span className="italic text-harpia-white/70">ELEVAM SUA MARCA</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-sans font-light text-lg md:text-xl text-harpia-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Combinamos estética refinada, estratégia de dados e execução impecável para criar
              experiências que transformam marcas em referências de mercado.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <Link
              to="/contato"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-harpia-accent text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-harpia-white hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-harpia-accent focus:ring-offset-2 focus:ring-offset-harpia-black rounded-sm shadow-xl hover:shadow-2xl"
            >
              Iniciar Projeto
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                strokeWidth={2.5}
              />
            </Link>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 relative bg-harpia-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-20">
            <Reveal>
              <span className="font-sans text-xs text-harpia-white/50 tracking-[0.3em] uppercase mb-4 block">
                O Que Fazemos
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-4xl md:text-6xl text-harpia-accent leading-tight mb-6">
                NOSSOS SERVIÇOS
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-sans text-lg text-harpia-white/70 leading-relaxed font-light">
                Cada serviço é pensado estrategicamente para gerar impacto real e resultados
                mensuráveis.
              </p>
            </Reveal>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 relative bg-harpia-carbon overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-harpia-accent/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl text-harpia-accent leading-tight mb-6">
                POR QUE <span className="italic text-harpia-white/70">HARPIA</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="font-sans text-lg text-harpia-white/70 leading-relaxed font-light max-w-2xl mx-auto">
                Nossa metodologia garante que cada projeto seja único e alinhado aos seus objetivos.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 100}>
                <div className="p-8 bg-harpia-black/40 border border-white/5 hover:border-white/20 hover:bg-harpia-black/60 transition-all duration-500 rounded-sm group">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                    <Check size={24} className="text-harpia-accent" strokeWidth={2} />
                  </div>
                  <h3 className="font-serif text-2xl text-harpia-accent mb-4">{benefit.title}</h3>
                  <p className="font-sans text-base text-harpia-white/70 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 relative bg-harpia-black overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-harpia-accent" strokeWidth={1.5} />
                <span className="font-sans text-xs text-harpia-white/50 tracking-[0.3em] uppercase">
                  Nossos Números
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-4xl md:text-5xl text-harpia-accent leading-tight">
                RESULTADOS QUE <span className="italic text-harpia-white/70">FALAM</span>
              </h2>
            </Reveal>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div className="text-center group">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <div className="font-sans text-sm md:text-base text-harpia-white/60 tracking-wider uppercase mt-4 group-hover:text-harpia-white/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 relative overflow-hidden group/cta">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="/1.jpg"
            alt="Harpia Agência - Transformação de Marcas"
            className="w-full h-full object-cover scale-110 group-hover/cta:scale-105 transition-transform duration-3000 ease-out grayscale-[0.3] group-hover/cta:grayscale-0"
            loading="lazy"
          />

          {/* Dramatic Vignette Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-harpia-black via-harpia-black/85 to-harpia-black/60" />
          <div className="absolute inset-0 bg-linear-to-b from-harpia-black/40 via-transparent to-harpia-black/80" />
          <div className="absolute inset-0 bg-linear-to-r from-harpia-black/50 via-transparent to-harpia-black/50" />

          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-30 group-hover/cta:opacity-40 transition-opacity duration-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-harpia-accent/10 rounded-full blur-[150px]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-harpia-accent leading-[1.1] mb-8 drop-shadow-2xl">
              PRONTO PARA
              <br />
              <span className="italic text-harpia-white">DECOLAR?</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-sans font-light text-lg md:text-2xl text-harpia-white/90 max-w-2xl mx-auto mb-14 leading-relaxed drop-shadow-lg">
              Vamos conversar sobre como podemos transformar sua marca e alcançar resultados
              extraordinários juntos.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contato"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-harpia-accent text-harpia-black font-sans font-bold tracking-widest uppercase text-sm hover:bg-harpia-white hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-harpia-accent focus:ring-offset-2 focus:ring-offset-harpia-black rounded-sm shadow-2xl hover:shadow-harpia-accent/50"
              >
                Falar com Especialista
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  strokeWidth={2.5}
                />
              </Link>
              <Link
                to="/portfolio"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-harpia-black/50 backdrop-blur-md text-harpia-accent border-2 border-harpia-accent/40 font-sans font-bold tracking-widest uppercase text-sm hover:border-harpia-accent hover:bg-harpia-black/70 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-harpia-accent focus:ring-offset-2 focus:ring-offset-harpia-black rounded-sm shadow-xl"
              >
                Ver Portfolio
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-harpia-accent/50 to-transparent" />
      </section>
    </div>
  );
};
