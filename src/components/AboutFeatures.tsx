import React from 'react';
import { Award, Target, Users, Rocket, Zap } from 'lucide-react';
import { Reveal } from './Reveal';
import { GradientLine } from './ui';

const FEATURES = [
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
];

export const AboutFeatures: React.FC = () => {
  return (
    <section className="py-32 md:py-40 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #191919 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <GradientLine direction="right" variant="dark" />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">
                A Diferença
              </span>
              <GradientLine direction="left" variant="dark" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-harpia-black mb-6 leading-tight">
              Por que escolher <span className="italic text-gray-400">Harpia</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={index} delay={index * 100}>
                <div className="group h-full">
                  <div className="relative h-full p-8 bg-gray-50 border border-gray-100 hover:border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-500 rounded-sm">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-harpia-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Icon className="w-8 h-8 text-harpia-black mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-serif text-harpia-black mb-4">{feature.title}</h3>
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
  );
};
