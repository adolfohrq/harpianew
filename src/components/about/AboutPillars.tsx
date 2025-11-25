import { Target, Zap, Users, Rocket } from 'lucide-react';
import { Reveal } from '../Reveal';

const PILLARS = [
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
];

export const AboutPillars = () => {
  return (
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
          {PILLARS.map((pillar, index) => {
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
  );
};
