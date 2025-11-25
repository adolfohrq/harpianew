import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import { Reveal } from '../Reveal';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}) => {
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
    <div ref={ref} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none">
      {prefix}
      {count}
      {suffix}
    </div>
  );
};

const stats = [
  {
    value: 250,
    suffix: '+',
    label: 'Projetos Entregues',
    sublabel: 'nos últimos 5 anos',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfação',
    sublabel: 'dos clientes',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Marcas Atendidas',
    sublabel: 'em diversos segmentos',
  },
  {
    value: 5,
    suffix: 'x',
    label: 'ROI Médio',
    sublabel: 'retorno sobre investimento',
  },
];

export const ServicesStats: React.FC = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 relative bg-harpia-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/2 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/2 rounded-full blur-[120px]" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <TrendingUp size={18} className="text-white/60" strokeWidth={1.5} />
              </div>
              <span className="font-sans text-xs text-white/40 tracking-[0.3em] uppercase">
                Nossos Números
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-6">
              RESULTADOS QUE
              <br />
              <span className="italic text-white/40">FALAM POR SI</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-sans text-lg text-white/50 max-w-2xl mx-auto font-light">
              Números que refletem nossa dedicação em entregar excelência e resultados concretos
              para cada cliente.
            </p>
          </Reveal>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="group relative text-center p-6 lg:p-8">
                {/* Divider Line (except last) */}
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-px h-24 bg-white/10" />
                )}

                {/* Counter */}
                <div className="mb-4">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="space-y-1">
                  <p className="font-sans text-sm md:text-base text-white/80 tracking-wide uppercase">
                    {stat.label}
                  </p>
                  <p className="font-sans text-xs text-white/40 font-light">{stat.sublabel}</p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
