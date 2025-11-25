import React from 'react';
import { Reveal } from '@/components';
import { SectionHeader, OptimizedImage, HeroSection } from '@/components/ui';
import { CTASection } from '@/components/CTASection';
import { ABOUT_HERO, ABOUT_STATS, ABOUT_VALUES } from '@/data/about2';
import { ArrowRight } from 'lucide-react';

export const About2 = () => {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-harpia-black selection:text-white">
      {/* Hero Section - Dark Mode */}
      <HeroSection
        subtitle={ABOUT_HERO.subtitle}
        title={
          <>
            Elevando Marcas <br />
            <span className="text-white/40 italic">ao Extraordinário</span>
          </>
        }
        description={ABOUT_HERO.description}
      />

      {/* Manifesto / Story - Light Mode - Editorial Layout */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Left Column: Images (Composition) */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <Reveal>
                <div className="relative z-10 mr-12 md:mr-24 mb-12">
                  <OptimizedImage
                    src="/2.jpeg"
                    alt="Workspace Detail"
                    className="w-full aspect-[4/5] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                  />
                </div>
                {/* Overlapping Image */}
                <div className="absolute bottom-0 right-0 w-[60%] z-20 shadow-2xl border-8 border-white">
                  <OptimizedImage
                    src="/5.jpeg"
                    alt="Creative Process"
                    className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                  />
                </div>
                {/* Decorative Box */}
                <div className="absolute top-12 -left-6 w-full h-full border border-black/5 -z-10" />
              </Reveal>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-6 relative z-10 order-1 lg:order-2">
              <Reveal delay={0.1}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-harpia-black" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-harpia-black/60">
                    Nossa Filosofia
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-harpia-black mb-10 leading-tight">
                  Design que não é apenas visto. <br />
                  <span className="italic text-gray-400">É sentido.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="space-y-6 text-lg text-gray-600 font-sans font-light leading-relaxed">
                  <p>
                    <span className="text-6xl float-left mr-4 mt-[-10px] font-serif text-harpia-black line-height-none">
                      A
                    </span>
                    creditamos que cada pixel deve ter um propósito. Na Harpia, não seguimos
                    tendências cegamente; nós estudamos o comportamento humano para criar interfaces
                    que convertem curiosidade em lealdade.
                  </p>
                  <p>
                    Nossa abordagem une a precisão analítica de dados com a sensibilidade artística.
                    É onde a engenharia encontra a emoção. Não construímos apenas páginas web;
                    construímos a infraestrutura digital para o crescimento exponencial da sua
                    marca.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-12 pt-10 border-t border-black/10 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
                  <div>
                    <p className="font-serif text-2xl text-harpia-black italic">O Extraordinário</p>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                      É o nosso padrão
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-harpia-black text-white text-xs uppercase tracking-[0.2em] hover:bg-harpia-carbon transition-colors duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform"
                  >
                    Iniciar Jornada
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Dark Strip */}
      <section className="py-24 bg-harpia-carbon text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/5">
            {ABOUT_STATS.map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="px-4">
                  <div className="text-4xl md:text-6xl font-serif mb-2 text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values - Light Mode Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader
              title="Pilares Fundamentais"
              label="VALORES"
              align="center"
              className="mb-20"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_VALUES.map((value, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white p-8 h-full shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                  <div className="w-12 h-12 bg-harpia-black text-white flex items-center justify-center mb-6 rounded-sm group-hover:scale-110 transition-transform duration-300">
                    <value.icon size={20} />
                  </div>
                  <h3 className="text-xl font-serif text-harpia-black mb-4">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
