import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Target, Heart, Award, ArrowRight } from 'lucide-react';
import {
  ABOUT_HERO,
  ABOUT_VALUES,
  ABOUT_STORY,
  ABOUT_MILESTONES,
  ABOUT_MISSION,
  ABOUT_VISION,
} from '../data/about';
import { useMetaTags } from '../hooks/useMetaTags';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Reveal } from '../components/Reveal';
import { SectionHeader, HeroSection } from '../components/ui';

const iconMap = {
  Eye: Eye,
  Target: Target,
  Heart: Heart,
  Award: Award,
};

export const AboutPage: React.FC = () => {
  useMetaTags({
    title: 'Sobre Nós - Harpia | Agência de Marketing Premium',
    description:
      'Conheça a Harpia, agência de marketing que combina estratégia, design e tecnologia para criar conexões autênticas entre marcas e pessoas.',
    keywords: 'sobre harpia, agência marketing, nossa história, missão, visão, valores',
    ogTitle: 'Sobre Nós - Harpia',
    ogDescription: 'Conectando visões. Voando mais alto. Enxergando mais longe.',
    canonical: `${window.location.origin}/#/sobre`,
  });

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        subtitle="SOBRE NÓS"
        title={
          <>
            {ABOUT_HERO.title.split(' ')[0]}{' '}
            <span className="italic text-white/40">{ABOUT_HERO.title.split(' ')[1]}</span>
          </>
        }
        description={ABOUT_HERO.subtitle}
      />

      {/* Story Section - Similar to Manifesto */}
      <ErrorBoundary sectionName="história">
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gray-100 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gray-50 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="flex flex-col items-center text-center mb-16">
                <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.4em] text-gray-500 mb-12 border border-black/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  {ABOUT_STORY.title}
                </span>
              </div>
            </Reveal>

            <div className="space-y-8 max-w-4xl mx-auto">
              {ABOUT_STORY.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 100}>
                  <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed text-center">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Values Section - Similar to WhyHarpia with white background */}
      <ErrorBoundary sectionName="valores">
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[120px] -translate-y-1/2 animate-pulse"
              style={{ animationDuration: '8s' }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[100px] translate-y-1/2 animate-pulse"
              style={{ animationDuration: '10s' }}
            />
          </div>

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeader
              label="Valores"
              title={
                <>
                  O QUE NOS <span className="italic text-gray-400">MOVE</span>
                </>
              }
              description="Princípios que guiam cada decisão, cada projeto, cada voo."
              align="center"
              className="mb-20"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ABOUT_VALUES.map((value, index) => {
                const IconComponent = iconMap[value.icon as keyof typeof iconMap];
                return (
                  <Reveal key={value.id} delay={index * 100}>
                    <div className="group relative h-full flex flex-col">
                      {/* Card */}
                      <div className="relative flex-1 bg-white border border-black/10 p-8 transition-all duration-500 hover:border-black/20 hover:shadow-lg">
                        {/* Icon */}
                        <div className="mb-6">
                          <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                            <IconComponent className="w-7 h-7 text-black group-hover:text-white transition-colors duration-500" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-2xl text-harpia-black mb-4 group-hover:translate-y-1 transition-transform duration-300">
                          {value.title}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-sm text-gray-600 font-light leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Mission & Vision Section - Similar to Process layout */}
      <ErrorBoundary sectionName="missão e visão">
        <section className="py-32 bg-white border-t border-black/5 relative">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              label="Propósito"
              title="MISSÃO & VISÃO"
              description="Onde estamos e para onde voamos."
              align="left"
              titleSize="large"
              descriptionMaxWidth="2xl"
              className="mb-24"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal delay={0}>
                <div className="group relative">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 z-20">
                    <div className="w-12 h-12 rounded-full border-2 border-harpia-black bg-white flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 shadow-sm group-hover:bg-harpia-black group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] group-hover:-rotate-12">
                      01
                    </div>
                  </div>

                  <div className="border border-black/10 p-10 bg-white group-hover:border-black/20 group-hover:shadow-lg transition-all duration-500">
                    <h3 className="font-serif text-3xl md:text-4xl text-harpia-black mb-6 group-hover:translate-y-1 transition-transform duration-300">
                      {ABOUT_MISSION.title}
                    </h3>
                    <p className="font-sans text-base text-gray-600 font-light leading-relaxed">
                      {ABOUT_MISSION.description}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="group relative">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 z-20">
                    <div className="w-12 h-12 rounded-full border-2 border-harpia-black bg-white flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 shadow-sm group-hover:bg-harpia-black group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] group-hover:-rotate-12">
                      02
                    </div>
                  </div>

                  <div className="border border-black/10 p-10 bg-white group-hover:border-black/20 group-hover:shadow-lg transition-all duration-500">
                    <h3 className="font-serif text-3xl md:text-4xl text-harpia-black mb-6 group-hover:translate-y-1 transition-transform duration-300">
                      {ABOUT_VISION.title}
                    </h3>
                    <p className="font-sans text-base text-gray-600 font-light leading-relaxed">
                      {ABOUT_VISION.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Timeline Section - Similar to Stats */}
      <ErrorBoundary sectionName="trajetória">
        <section className="py-32 bg-harpia-black relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-harpia-gray/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-harpia-gray/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center mb-20">
                <span className="block font-sans text-xs uppercase tracking-[0.3em] text-harpia-accent mb-4">
                  Trajetória
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-harpia-white mb-6">
                  NOSSA <span className="italic text-gray-400">JORNADA</span>
                </h2>
                <p className="font-sans text-lg text-gray-400 max-w-2xl mx-auto font-light">
                  Marcos que definiram nossa evolução ao longo dos anos.
                </p>
              </div>
            </Reveal>

            {/* Timeline */}
            <div className="space-y-12">
              {ABOUT_MILESTONES.map((milestone, index) => (
                <Reveal key={milestone.year} delay={index * 100}>
                  <div className="flex flex-col md:flex-row gap-8 border-l-2 border-white/20 pl-8 pb-8 last:pb-0 group hover:border-harpia-accent transition-colors duration-500">
                    <div className="md:w-32 shrink-0">
                      <div className="inline-block">
                        <span className="font-serif text-4xl text-harpia-white group-hover:text-harpia-accent transition-colors duration-300">
                          {milestone.year}
                        </span>
                      </div>
                    </div>
                    <div className="grow">
                      <h3 className="font-serif text-2xl md:text-3xl text-harpia-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                        {milestone.title}
                      </h3>
                      <p className="font-sans text-base md:text-lg text-harpia-white/70 leading-relaxed font-light">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* CTA Section - Similar to CTASection */}
      <section className="py-40 md:py-48 relative bg-harpia-carbon overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-harpia-black/60 via-harpia-carbon to-harpia-black/60" />

        {/* Top decorative line */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent z-10"></div>

        {/* Animated corner decorations */}
        <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-white/10 z-10 animate-pulse"></div>
        <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-white/10 z-10 animate-pulse"></div>

        {/* Glowing orb effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl z-0"></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            {/* Subtitle */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-white/40"></div>
              <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-harpia-white/60">
                Pronto para decolar?
              </p>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-white/40"></div>
            </div>

            {/* Main heading */}
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-white drop-shadow-2xl leading-tight">
              VAMOS VOAR
              <br />
              <span className="bg-linear-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                JUNTOS?
              </span>
            </h2>

            {/* Description */}
            <p className="font-sans text-base md:text-lg text-harpia-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              Transforme sua visão em realidade. Vamos criar algo extraordinário juntos.
            </p>

            {/* CTA Button with premium effects */}
            <div className="relative inline-block group">
              {/* Glow effect behind button */}
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full group-hover:bg-white/30 transition-all duration-500"></div>

              <Link
                to="/contato"
                className="relative inline-flex items-center gap-3 font-sans px-12 py-6 border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white hover:text-harpia-black hover:border-white transition-all duration-500 text-sm uppercase tracking-[0.25em] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-harpia-carbon group shadow-2xl hover:shadow-white/20"
              >
                <span>Iniciar Projeto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Bottom decorative element */}
            <div className="mt-16 flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-white/40"></div>
              <div className="w-8 h-px bg-linear-to-r from-white/40 to-transparent"></div>
              <div className="w-1 h-1 rounded-full bg-white/40"></div>
            </div>
          </Reveal>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent z-10"></div>
      </section>
    </div>
  );
};
