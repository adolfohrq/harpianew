import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, Users, Rocket, ArrowRight, Award } from 'lucide-react';
import { useMetaTags } from '../hooks/useMetaTags';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Reveal } from '../components/Reveal';

export const AboutPage: React.FC = () => {
  useMetaTags({
    title: 'Sobre Nós - Harpia | Agência de Marketing Premium',
    description:
      'Conheça a Harpia. Somos mais que uma agência - somos seus parceiros na transformação digital e no voo extraordinário da sua marca.',
    keywords: 'sobre harpia, agência marketing, nossa história, missão, visão, valores',
    ogTitle: 'Sobre Nós - Harpia',
    ogDescription: 'Conectando visões. Voando mais alto. Enxergando mais longe.',
    canonical: `${window.location.origin}/#/sobre`,
  });

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section - Dark with Bold Typography */}
      <ErrorBoundary sectionName="hero">
        <section className="py-32 md:py-48 bg-harpia-black relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="max-w-4xl">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/50 mb-8 font-medium">
                  Nossa História
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
                  Mais que uma <span className="italic text-white/40">agência</span>.
                  <br />
                  Uma <span className="italic text-white/30">parceria</span> de voo.
                </h1>
                <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed">
                  Transformamos visões em realidades extraordinárias. Desde 2019, ajudamos marcas a
                  decolar, enxergar mais longe e conquistar altitudes inimagináveis.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </ErrorBoundary>

      {/* Statement Section - White Background with Bold Quote */}
      <ErrorBoundary sectionName="declaração">
        <section className="py-32 md:py-40 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-100 rounded-full blur-[100px] translate-y-1/2" />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center">
                <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif text-harpia-black mb-8 leading-tight">
                  Não criamos campanhas.
                  <br />
                  <span className="italic text-gray-400">Criamos conexões</span> que transformam
                  <br />
                  negócios em <span className="italic text-gray-400">lendas</span>.
                </blockquote>
                <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                  Acreditamos que toda marca tem uma história extraordinária esperando para ser
                  contada. Nosso trabalho é encontrá-la, amplificá-la e fazê-la voar.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </ErrorBoundary>

      {/* The Harpia Difference - 4 Pillars */}
      <ErrorBoundary sectionName="diferenciais">
        <section className="py-32 md:py-40 bg-harpia-black relative overflow-hidden">
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center mb-20">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-medium">
                  O que nos torna únicos
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                  Os 4 Pilares do <span className="italic text-white/40">Voo</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  number: '01',
                  title: 'Estratégia',
                  subtitle: 'Sem comprometimentos',
                  description:
                    'Cada projeto começa com pesquisa profunda e planejamento estratégico. Não seguimos tendências, criamos direções.',
                },
                {
                  icon: Zap,
                  number: '02',
                  title: 'Execução',
                  subtitle: 'Com excelência',
                  description:
                    'Design excepcional, conteúdo impactante e tecnologia de ponta. Qualidade em cada detalhe, sempre.',
                },
                {
                  icon: Users,
                  number: '03',
                  title: 'Parceria',
                  subtitle: 'De verdade',
                  description:
                    'Você não é cliente, é parceiro. Nos importamos com seu sucesso tanto quanto você. Crescemos juntos.',
                },
                {
                  icon: Rocket,
                  number: '04',
                  title: 'Resultados',
                  subtitle: 'Que falam',
                  description:
                    'Métricas reais, impacto mensurável, crescimento sustentável. Seu sucesso é nosso sucesso.',
                },
              ].map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Reveal key={pillar.number} delay={index * 100}>
                    <div className="group relative h-full">
                      <div className="relative h-full p-8 bg-white/5 border border-white/10 rounded-sm hover:border-white/30 hover:bg-white/10 transition-all duration-500 cursor-default">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Number */}
                        <div className="text-sm font-mono text-white/40 mb-6">{pillar.number}</div>

                        {/* Icon */}
                        <Icon className="w-10 h-10 text-white/80 mb-6 group-hover:scale-110 transition-transform duration-300" />

                        {/* Title */}
                        <h3 className="text-white mb-2 transition-transform duration-500 group-hover:translate-y-0">
                          {pillar.title}
                          <br />
                          <span className="italic text-white/40 font-light text-base">
                            {pillar.subtitle}
                          </span>
                        </h3>

                        {/* Description */}
                        <p className="text-white/60 text-sm font-light leading-relaxed transition-all duration-500 group-hover:opacity-100 opacity-80">
                          {pillar.description}
                        </p>

                        {/* Bottom Line */}
                        <div className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-700 w-0 group-hover:w-full" />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Our Journey - Timeline */}
      <ErrorBoundary sectionName="jornada">
        <section className="py-32 md:py-40 bg-white relative overflow-hidden">
          {/* Subtle background */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-100 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center mb-20">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-medium">
                  Trajetória
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-harpia-black mb-6 leading-tight">
                  Uma história de <span className="italic text-gray-400">crescimento</span> e
                  <br />
                  <span className="italic text-gray-400">transformação</span>
                </h2>
              </div>
            </Reveal>

            <div className="space-y-12">
              {[
                {
                  year: '2019',
                  title: 'O Primeiro Voo',
                  description:
                    'Harpia nasce com uma visão clara: ser a agência que não apenas cria, mas que transforma negócios através de estratégia e criatividade.',
                },
                {
                  year: '2020',
                  title: 'Expansão Digital',
                  description:
                    'Em tempos desafiadores, nos adaptamos rapidamente e entregamos resultados extraordinários. Nossos clientes não apenas sobreviveram, cresceram.',
                },
                {
                  year: '2021',
                  title: 'Consolidação',
                  description:
                    'Consolidamos nossa metodologia proprietária e expandimos nossa equipe de especialistas. 15+ prêmios e reconhecimentos em criatividade.',
                },
                {
                  year: '2022',
                  title: 'Escala Global',
                  description:
                    'Passamos a trabalhar com marcas nacionais e internacionais. Criamos um time verdadeiramente talentoso e diverso.',
                },
                {
                  year: '2023',
                  title: 'Inovação',
                  description:
                    'Investimos em IA, tecnologia e novos formatos. Mantemos a essência criativa enquanto abraçamos o futuro.',
                },
                {
                  year: '2024',
                  title: 'Altitude Máxima',
                  description:
                    'Hoje, somos parceiros de marcas que querem voar alto. Cada projeto é uma missão para enxergar mais longe.',
                },
              ].map((milestone, index) => (
                <Reveal key={milestone.year} delay={index * 100}>
                  <div className="group relative">
                    <div className="flex gap-8 md:gap-12 items-start">
                      {/* Year Badge */}
                      <div className="shrink-0 pt-2">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-harpia-black border-2 border-harpia-black flex items-center justify-center text-white font-serif text-xl font-bold group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                            {milestone.year.slice(-2)}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2 border-l-2 border-gray-200 pl-8 pb-8 last:pb-0 group-hover:border-harpia-black transition-colors duration-500">
                        <h3 className="text-2xl md:text-3xl font-serif text-harpia-black mb-3 group-hover:translate-x-2 transition-transform duration-300">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Why Choose Harpia - Feature Cards */}
      <ErrorBoundary sectionName="por-que-harpia">
        <section className="py-32 md:py-40 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center mb-20">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-medium">
                  A Diferença
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-harpia-black mb-6 leading-tight">
                  Por que escolher <span className="italic text-gray-400">Harpia</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Equipe de Elite',
                  description:
                    'Estrategistas, designers, desenvolvedores e criativos apaixonados. Cada um especialista em seu campo.',
                  icon: Award,
                },
                {
                  title: 'Método Proprietário',
                  description:
                    'Nossa metodologia única combina dados, criatividade e intuição estratégica. Pronto para evoluir com você.',
                  icon: Target,
                },
                {
                  title: 'Parceria Real',
                  description:
                    'Não somos fornecedores. Somos parceiros comprometidos com seu crescimento e sucesso no longo prazo.',
                  icon: Users,
                },
                {
                  title: 'Resultados Comprovados',
                  description:
                    'ROI médio de 340%. Campanhas que não apenas impressionam, mas que efetivamente movem agulhas.',
                  icon: Rocket,
                },
                {
                  title: 'Inovação Contínua',
                  description:
                    'Estamos sempre um passo à frente. Tecnologia, tendências e insights que mantêm você à frente da concorrência.',
                  icon: Zap,
                },
                {
                  title: 'Transparência Total',
                  description:
                    'Relatórios detalhados, comunicação clara e acesso total. Você sabe exatamente o que está acontecendo.',
                  icon: Target,
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Reveal key={index} delay={index * 100}>
                    <div className="group h-full">
                      <div className="relative h-full p-8 bg-gray-50 border border-gray-100 hover:border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-500 rounded-sm">
                        <Icon className="w-8 h-8 text-harpia-black mb-6 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-serif text-harpia-black mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm font-light leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="absolute bottom-0 left-0 h-[2px] bg-harpia-black w-0 group-hover:w-full transition-all duration-500" />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* CTA Section - Bold and Compelling */}
      <ErrorBoundary sectionName="cta">
        <section className="py-32 md:py-48 relative bg-harpia-black overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <Reveal>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
                Pronto para
                <br />
                <span className="italic text-white/40">decolar?</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
                Vamos converter sua visão em uma história extraordinária que seus clientes nunca
                esquecerão.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/contato"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-harpia-black rounded-sm hover:bg-white/90 transition-all duration-300 font-medium uppercase tracking-wider text-sm"
                >
                  Iniciar Projeto
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <Link
                  to="/servicos"
                  className="group inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 font-medium uppercase tracking-wider text-sm backdrop-blur-sm"
                >
                  Explorar Serviços
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </ErrorBoundary>
    </div>
  );
};
