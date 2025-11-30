import React, { useState } from 'react';
import { Reveal, Marquee } from '../components';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DifferentialCard } from '../components/ui/DifferentialCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import {
  ArrowRight,
  Check,
  Palette,
  Type,
  Layout,
  Box,
  Sparkles,
  MousePointer,
  Layers,
  X,
  Loader2,
  CheckCircle2,
  Menu,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';

const ColorSwatch: React.FC<{
  name: string;
  variable: string;
  hex: string;
  bgClass: string;
  textClass?: string;
}> = ({ name, variable, hex, bgClass, textClass = 'text-white' }) => (
  <div className="flex flex-col gap-2">
    <div
      className={`w-full h-32 rounded-lg shadow-lg flex items-center justify-center ${bgClass} ${textClass} border border-white/10`}
    >
      <span className="font-mono text-sm opacity-80">{hex}</span>
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-lg">{name}</span>
      <span className="text-xs font-mono text-gray-400">{variable}</span>
    </div>
  </div>
);

const TypographyExample: React.FC<{
  role: string;
  font: string;
  size: string;
  weight: string;
  sample: string;
}> = ({ role, font, size, weight, sample }) => (
  <div className="border-b border-white/10 pb-8 mb-8 last:border-0">
    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
      <span className="text-harpia-accent font-mono text-sm uppercase tracking-widest">{role}</span>
      <div className="flex gap-4 text-xs text-gray-400 font-mono mt-2 md:mt-0">
        <span>{font}</span>
        <span>{size}</span>
        <span>{weight}</span>
      </div>
    </div>
    <p className={`${font} ${size} ${weight} text-harpia-black`}>{sample}</p>
  </div>
);

type TabType =
  | 'colors'
  | 'typography'
  | 'buttons'
  | 'forms'
  | 'cards'
  | 'navigation'
  | 'badges'
  | 'layout'
  | 'inventory'
  | 'components'
  | 'effects'
  | 'decorations'
  | 'animations'
  | 'spacing'
  | 'non-compliant';

// Component usage mapping
interface ComponentUsage {
  name: string;
  file: string;
  category: 'Main' | 'UI' | 'Services' | 'Contact';
  usedIn: string[];
  description: string;
}

const COMPONENT_INVENTORY: ComponentUsage[] = [
  // Main Components
  {
    name: 'Hero',
    file: 'Hero.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Seção hero principal com imagem de fundo',
  },
  {
    name: 'Navbar',
    file: 'Navbar.tsx',
    category: 'Main',
    usedIn: ['Todas'],
    description: 'Navegação principal fixa no topo',
  },
  {
    name: 'Footer',
    file: 'Footer.tsx',
    category: 'Main',
    usedIn: ['Todas'],
    description: 'Rodapé com links e informações',
  },
  {
    name: 'ServicesHub',
    file: 'ServicesHub.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Preview de serviços',
  },
  {
    name: 'WhyHarpia',
    file: 'WhyHarpia.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Seção de diferenciais',
  },
  {
    name: 'Stats',
    file: 'Stats.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Estatísticas com contadores animados',
  },
  {
    name: 'Process',
    file: 'Process.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Metodologia de trabalho',
  },
  {
    name: 'PortfolioPreview',
    file: 'PortfolioPreview.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Preview de projetos recentes',
  },
  {
    name: 'Testimonials',
    file: 'Testimonials.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Carrossel de depoimentos',
  },
  {
    name: 'ClientLogos',
    file: 'ClientLogos.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Grid de logos de clientes',
  },
  {
    name: 'Manifesto',
    file: 'Manifesto.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Manifesto da agência',
  },
  {
    name: 'CTASection',
    file: 'CTASection.tsx',
    category: 'Main',
    usedIn: ['Home', 'About', 'Services', 'Packages', 'Contact'],
    description: 'Call-to-action com imagem de fundo',
  },
  {
    name: 'Showreel',
    file: 'Showreel.tsx',
    category: 'Main',
    usedIn: ['Home'],
    description: 'Vídeo showreel',
  },
  {
    name: 'Marquee',
    file: 'Marquee.tsx',
    category: 'Main',
    usedIn: ['Home', 'VisualGovernance'],
    description: 'Letreiro infinito animado',
  },
  {
    name: 'Reveal',
    file: 'Reveal.tsx',
    category: 'Main',
    usedIn: ['Home', 'About', 'Services', 'Packages'],
    description: 'Animação de entrada on-scroll',
  },
  {
    name: 'ErrorBoundary',
    file: 'ErrorBoundary.tsx',
    category: 'Main',
    usedIn: ['Home', 'About'],
    description: 'Captura de erros por seção',
  },

  // UI Components
  {
    name: 'SectionHeader',
    file: 'ui/SectionHeader.tsx',
    category: 'UI',
    usedIn: ['About', 'VisualGovernance'],
    description: 'Header padronizado para seções',
  },
  {
    name: 'DifferentialCard',
    file: 'ui/DifferentialCard.tsx',
    category: 'UI',
    usedIn: ['VisualGovernance'],
    description: 'Card de diferencial com ícone',
  },
  {
    name: 'TestimonialCard',
    file: 'ui/TestimonialCard.tsx',
    category: 'UI',
    usedIn: ['VisualGovernance'],
    description: 'Card de depoimento',
  },
  {
    name: 'OptimizedImage',
    file: 'ui/OptimizedImage.tsx',
    category: 'UI',
    usedIn: ['Home', 'About', 'Services'],
    description: 'Wrapper de imagem com lazy loading',
  },
  {
    name: 'HeroSection',
    file: 'ui/HeroSection.tsx',
    category: 'UI',
    usedIn: ['About', 'Services', 'Packages', 'Contact'],
    description: 'Hero section reutilizável',
  },

  // Service Components
  {
    name: 'ServicesHero',
    file: 'services/ServicesHero.tsx',
    category: 'Services',
    usedIn: ['Services'],
    description: 'Hero específico da página de serviços',
  },
  {
    name: 'ServiceDetail',
    file: 'services/ServiceDetail.tsx',
    category: 'Services',
    usedIn: ['Services'],
    description: 'Detalhamento de serviço',
  },
  {
    name: 'ServicesStats',
    file: 'services/ServicesStats.tsx',
    category: 'Services',
    usedIn: ['Services'],
    description: 'Estatísticas de serviços',
  },
  {
    name: 'ServicesManifesto',
    file: 'services/ServicesManifesto.tsx',
    category: 'Services',
    usedIn: ['Services'],
    description: 'Manifesto de serviços',
  },
  {
    name: 'ServicesCTA',
    file: 'services/ServicesCTA.tsx',
    category: 'Services',
    usedIn: ['Services'],
    description: 'CTA específico de serviços',
  },

  // Contact Components
  {
    name: 'ContactForm',
    file: 'contact/ContactForm.tsx',
    category: 'Contact',
    usedIn: ['Contact'],
    description: 'Formulário de contato completo',
  },
  {
    name: 'ContactInfo',
    file: 'contact/ContactInfo.tsx',
    category: 'Contact',
    usedIn: ['Contact'],
    description: 'Informações de contato',
  },
  {
    name: 'ContactCTA',
    file: 'contact/ContactCTA.tsx',
    category: 'Contact',
    usedIn: ['Contact'],
    description: 'CTA da página de contato',
  },
];

export const VisualGovernance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('colors');

  const tabs = [
    { id: 'colors' as TabType, label: 'Cores', icon: Palette },
    { id: 'typography' as TabType, label: 'Tipografia', icon: Type },
    { id: 'buttons' as TabType, label: 'Botões', icon: MousePointer },
    { id: 'forms' as TabType, label: 'Formulários', icon: CheckCircle2 },
    { id: 'cards' as TabType, label: 'Cards', icon: Box },
    { id: 'navigation' as TabType, label: 'Navegação', icon: Menu },
    { id: 'badges' as TabType, label: 'Badges', icon: Sparkles },
    { id: 'layout' as TabType, label: 'Layout', icon: Layout },
    { id: 'inventory' as TabType, label: 'Inventário', icon: Box },
    { id: 'components' as TabType, label: 'Componentes', icon: Layers },
    { id: 'effects' as TabType, label: 'Efeitos', icon: Sparkles },
    { id: 'decorations' as TabType, label: 'Decorações', icon: Layers },
    { id: 'animations' as TabType, label: 'Animações', icon: ArrowRight },
    { id: 'spacing' as TabType, label: 'Espaçamento', icon: Layout },
    { id: 'non-compliant' as TabType, label: 'Não-Conformes', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <header className="mb-12 border-b border-black/10 pb-10">
            <h1 className="font-serif text-5xl md:text-7xl text-harpia-black mb-6">
              Visual <span className="text-harpia-black">Governance</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              Documentação completa do Design System Harpia. Este guia define todos os padrões
              visuais, componentes e comportamentos que constroem a identidade digital da marca.
            </p>
          </header>
        </Reveal>

        {/* TABS NAVIGATION */}
        <div className="border-b border-black/10 mb-12 overflow-x-auto">
          <nav className="flex gap-2 -mb-px min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                                        flex items-center gap-2 px-4 py-3 font-sans font-medium text-sm whitespace-nowrap
                                        border-b-2 transition-all duration-300
                                        ${
                                          activeTab === tab.id
                                            ? 'border-harpia-black text-harpia-black'
                                            : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                                        }
                                    `}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* TAB CONTENT */}
        <div className="min-h-[600px]">
          {/* COLORS TAB */}
          {activeTab === 'colors' && (
            <Reveal>
              <SectionHeader
                label="01. Cores"
                title="Paleta Cromática"
                description="Sistema de cores híbrido focado em imersão (Dark Mode) e legibilidade (Light Mode)."
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                <ColorSwatch
                  name="Harpia Black"
                  variable="--color-harpia-black"
                  hex="#191919"
                  bgClass="bg-harpia-black"
                />
                <ColorSwatch
                  name="Harpia Carbon"
                  variable="--color-harpia-carbon"
                  hex="#121212"
                  bgClass="bg-harpia-carbon"
                />
                <ColorSwatch
                  name="Harpia Gray"
                  variable="--color-harpia-gray"
                  hex="#2a2a2a"
                  bgClass="bg-harpia-gray"
                />
                <ColorSwatch
                  name="Harpia White"
                  variable="--color-harpia-white"
                  hex="#f5f5f7"
                  bgClass="bg-harpia-white"
                  textClass="text-black"
                />
                <ColorSwatch
                  name="Harpia Accent"
                  variable="--color-harpia-accent"
                  hex="#ffffff"
                  bgClass="bg-white"
                  textClass="text-black"
                />
              </div>
            </Reveal>
          )}

          {/* TYPOGRAPHY TAB */}
          {activeTab === 'typography' && (
            <Reveal>
              <SectionHeader
                label="02. Tipografia"
                title="Sistema Tipográfico"
                description="Combinação de elegância editorial (Serif) com modernidade geométrica (Sans)."
                align="left"
              />

              {/* Font Families */}
              <div className="mt-12 space-y-16">
                {/* Silk Serif */}
                <div className="p-8 bg-gray-50 rounded-lg border border-black/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-serif text-harpia-black mb-2">Silk Serif</h3>
                      <p className="text-sm text-gray-500 font-mono">
                        font-serif • Títulos & Headlines
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 mt-2 md:mt-0 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Fonte Local
                    </span>
                  </div>

                  {/* Font Weights */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                          Pesos Disponíveis
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">300 Light</span>
                            <span
                              className="font-serif text-2xl text-harpia-black"
                              style={{ fontWeight: 300 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">
                              400 Regular
                            </span>
                            <span
                              className="font-serif text-2xl text-harpia-black"
                              style={{ fontWeight: 400 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">500 Medium</span>
                            <span
                              className="font-serif text-2xl text-harpia-black"
                              style={{ fontWeight: 500 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">
                              600 SemiBold
                            </span>
                            <span
                              className="font-serif text-2xl text-harpia-black"
                              style={{ fontWeight: 600 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">700 Bold</span>
                            <span
                              className="font-serif text-2xl text-harpia-black"
                              style={{ fontWeight: 700 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                          Estilos Itálicos
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">300 Light</span>
                            <span
                              className="font-serif text-2xl text-harpia-black italic"
                              style={{ fontWeight: 300 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">
                              400 Regular
                            </span>
                            <span
                              className="font-serif text-2xl text-harpia-black italic"
                              style={{ fontWeight: 400 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">500 Medium</span>
                            <span
                              className="font-serif text-2xl text-harpia-black italic"
                              style={{ fontWeight: 500 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">
                              600 SemiBold
                            </span>
                            <span
                              className="font-serif text-2xl text-harpia-black italic"
                              style={{ fontWeight: 600 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-gray-500 w-24">700 Bold</span>
                            <span
                              className="font-serif text-2xl text-harpia-black italic"
                              style={{ fontWeight: 700 }}
                            >
                              Harpia Agency
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Character Set Preview */}
                    <div className="pt-6 border-t border-black/10">
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                        Caracteres
                      </p>
                      <p className="font-serif text-xl text-harpia-black leading-relaxed">
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                        <br />
                        abcdefghijklmnopqrstuvwxyz
                        <br />
                        0123456789 !@#$%&*(),.;:?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dosis */}
                <div className="p-8 bg-gray-50 rounded-lg border border-black/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-sans font-semibold text-harpia-black mb-2">
                        Dosis
                      </h3>
                      <p className="text-sm text-gray-500 font-mono">
                        font-sans • Corpo, Botões & UI
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 mt-2 md:mt-0 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Fonte Local
                    </span>
                  </div>

                  {/* Font Weights */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                        Pesos Disponíveis
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-gray-500 w-24">
                            200 ExtraLight
                          </span>
                          <span
                            className="font-sans text-xl text-harpia-black"
                            style={{ fontWeight: 200 }}
                          >
                            Harpia Agency - Design que transforma
                          </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-gray-500 w-24">300 Light</span>
                          <span
                            className="font-sans text-xl text-harpia-black"
                            style={{ fontWeight: 300 }}
                          >
                            Harpia Agency - Design que transforma
                          </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-gray-500 w-24">400 Regular</span>
                          <span
                            className="font-sans text-xl text-harpia-black"
                            style={{ fontWeight: 400 }}
                          >
                            Harpia Agency - Design que transforma
                          </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-gray-500 w-24">500 Medium</span>
                          <span
                            className="font-sans text-xl text-harpia-black"
                            style={{ fontWeight: 500 }}
                          >
                            Harpia Agency - Design que transforma
                          </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-gray-500 w-24">600 SemiBold</span>
                          <span
                            className="font-sans text-xl text-harpia-black"
                            style={{ fontWeight: 600 }}
                          >
                            Harpia Agency - Design que transforma
                          </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-gray-500 w-24">700 Bold</span>
                          <span
                            className="font-sans text-xl text-harpia-black"
                            style={{ fontWeight: 700 }}
                          >
                            Harpia Agency - Design que transforma
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Character Set Preview */}
                    <div className="pt-6 border-t border-black/10">
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                        Caracteres
                      </p>
                      <p className="font-sans text-xl text-harpia-black leading-relaxed">
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                        <br />
                        abcdefghijklmnopqrstuvwxyz
                        <br />
                        0123456789 !@#$%&*(),.;:?
                      </p>
                    </div>
                  </div>
                </div>

                {/* CSS Variables */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-6 uppercase tracking-widest">
                    Configuração CSS (src/index.css)
                  </h4>
                  <pre className="text-sm text-white/80 font-mono overflow-x-auto whitespace-pre-wrap">
                    {`/* Fontes carregadas localmente via @font-face */

@font-face {
  font-family: 'Dosis';
  src: url('/fonts/dosis/Dosis-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Silk Serif';
  src: url('/fonts/silk-serif/Silk Serif Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* ... mais pesos e estilos definidos no arquivo */

@theme {
  --font-serif: 'Silk Serif', serif;
  --font-sans: 'Dosis', sans-serif;
}`}
                  </pre>
                </div>

                {/* Typography Scale */}
                <div>
                  <h4 className="text-xl font-serif text-harpia-black mb-8">Escala Tipográfica</h4>
                  <div className="space-y-8">
                    <TypographyExample
                      role="Display Headline"
                      font="font-serif"
                      size="text-6xl md:text-8xl"
                      weight="font-normal"
                      sample="Harpia Agency"
                    />
                    <TypographyExample
                      role="Page Title"
                      font="font-serif"
                      size="text-4xl md:text-6xl lg:text-7xl"
                      weight="font-normal"
                      sample="Enxergue Mais Longe"
                    />
                    <TypographyExample
                      role="Section Title"
                      font="font-serif"
                      size="text-3xl md:text-4xl lg:text-5xl"
                      weight="font-normal"
                      sample="Transformamos Visão em Realidade"
                    />
                    <TypographyExample
                      role="Card Title"
                      font="font-serif"
                      size="text-xl md:text-2xl"
                      weight="font-normal"
                      sample="Design Premium para Marcas"
                    />
                    <TypographyExample
                      role="Body Large"
                      font="font-sans"
                      size="text-lg md:text-xl"
                      weight="font-light"
                      sample="O design do Harpia utiliza uma abordagem híbrida, alternando entre seções escuras para impacto e imersão."
                    />
                    <TypographyExample
                      role="Body Default"
                      font="font-sans"
                      size="text-base"
                      weight="font-normal"
                      sample="Utilizado em parágrafos padrão, botões e elementos de navegação. A legibilidade é a prioridade aqui."
                    />
                    <TypographyExample
                      role="Body Small"
                      font="font-sans"
                      size="text-sm"
                      weight="font-normal"
                      sample="Texto auxiliar, legendas e informações secundárias que complementam o conteúdo principal."
                    />
                    <TypographyExample
                      role="Label / Button"
                      font="font-sans"
                      size="text-xs uppercase tracking-[0.2em]"
                      weight="font-medium"
                      sample="Ver Detalhes"
                    />
                    <TypographyExample
                      role="Caption"
                      font="font-sans"
                      size="text-[10px] uppercase tracking-[0.3em]"
                      weight="font-medium"
                      sample="Agência de Marketing Digital"
                    />
                  </div>
                </div>

                {/* Usage Guidelines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-gray-50 rounded-lg border border-black/10">
                    <h4 className="font-serif text-lg text-harpia-black mb-4">
                      Silk Serif - Quando Usar
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Headlines e títulos de impacto</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Números grandes em estatísticas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Citações e frases de destaque</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Texto itálico para ênfase elegante</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg border border-black/10">
                    <h4 className="font-sans font-semibold text-lg text-harpia-black mb-4">
                      Dosis - Quando Usar
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Parágrafos e corpo de texto</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Botões e links de navegação</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Labels e textos de formulário</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Badges, tags e elementos UI</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* BUTTONS TAB */}
          {activeTab === 'buttons' && (
            <Reveal>
              <SectionHeader
                label="03. Botões"
                title="Galeria de Botões"
                description="Todos os estilos de botões usados no projeto com estados hover, focus e active."
                align="left"
              />
              <div className="mt-12 space-y-16">
                {/* Primary Buttons */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Botões Primários
                  </h4>
                  <div className="flex flex-wrap gap-6 items-center">
                    <button className="bg-harpia-black text-white px-8 py-3 rounded-full font-sans font-bold text-sm tracking-wide hover:scale-105 hover:-rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer">
                      Começar Agora
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <button className="bg-white text-harpia-black px-8 py-3 rounded-full font-sans font-bold text-sm tracking-wide hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
                      Botão Claro
                    </button>
                  </div>
                </div>

                {/* Secondary Buttons */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Botões Secundários (Outline)
                  </h4>
                  <div className="flex flex-wrap gap-6 items-center">
                    <button className="border border-harpia-black text-harpia-black px-8 py-3 rounded-full font-sans font-bold text-sm tracking-wide hover:bg-harpia-black hover:text-white transition-all duration-300 cursor-pointer">
                      Saiba Mais
                    </button>
                    <button className="border border-white/30 text-white px-8 py-3 rounded-full font-sans font-bold text-sm tracking-wide bg-harpia-black hover:bg-white hover:text-harpia-black transition-all duration-300 cursor-pointer">
                      Dark Outline
                    </button>
                  </div>
                </div>

                {/* Ghost Buttons */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-6 uppercase tracking-widest">
                    Botões Ghost (Transparentes)
                  </h4>
                  <div className="flex flex-wrap gap-6 items-center">
                    <button className="border border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-sans font-bold text-sm tracking-wide hover:bg-white hover:text-harpia-black transition-all duration-500 cursor-pointer">
                      Ghost Button
                    </button>
                  </div>
                </div>

                {/* Icon Buttons */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Icon Buttons
                  </h4>
                  <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-harpia-black hover:bg-harpia-black hover:text-white hover:scale-110 transition-all duration-300 group cursor-pointer">
                      <X
                        size={20}
                        className="group-hover:rotate-90 transition-transform duration-300"
                      />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-harpia-black hover:bg-harpia-black hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer">
                      <Check size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-harpia-black text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Submit Buttons with States */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Submit Buttons (Estados)
                  </h4>
                  <div className="flex flex-wrap gap-6 items-center">
                    <button className="px-8 py-4 bg-white text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-harpia-accent transition-all duration-500 cursor-pointer">
                      Enviar Mensagem
                    </button>
                    <button className="px-8 py-4 bg-white text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm opacity-50 cursor-not-allowed flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </button>
                    <button className="px-8 py-4 bg-white text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm flex items-center gap-2 cursor-pointer">
                      <CheckCircle2 size={18} className="text-green-400" />
                      Enviado!
                    </button>
                  </div>
                </div>

                {/* Link Buttons */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Link Buttons
                  </h4>
                  <div className="flex flex-col items-start gap-6">
                    <a
                      href="#"
                      className="text-harpia-black font-sans text-lg font-medium relative group"
                      onClick={(e) => e.preventDefault()}
                    >
                      Link Textual Simples
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-harpia-black transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-harpia-black transition-colors duration-300 flex items-center gap-2 group"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="font-mono text-sm">Link com Ícone</span>
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                    <a
                      href="#"
                      className="font-sans text-xs uppercase tracking-[0.2em] text-harpia-black hover:text-gray-600 transition-all duration-300 border-b border-black/20 pb-2 hover:border-black/60 flex items-center gap-2 group"
                      onClick={(e) => e.preventDefault()}
                    >
                      Explorar tudo
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* FORMS TAB */}
          {activeTab === 'forms' && (
            <Reveal>
              <SectionHeader
                label="04. Formulários"
                title="Elementos de Formulário"
                description="Inputs, textareas e selects com estados de validação e feedback visual."
                align="left"
              />
              <div className="mt-12 space-y-12">
                {/* Text Input */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-8 uppercase tracking-widest">
                    Text Input (Floating Label)
                  </h4>
                  <div className="relative pb-2">
                    <input
                      type="text"
                      placeholder=" "
                      className="peer w-full bg-white/2 border-b border-white/10 py-4 px-4 text-white focus:outline-none focus:border-white/40 transition-all duration-300 placeholder-transparent"
                    />
                    <label className="absolute left-4 -top-3.5 text-xs uppercase tracking-[0.3em] text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-gray-400 transition-all duration-300 pointer-events-none">
                      Nome Completo
                    </label>
                  </div>
                </div>

                {/* Input States */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-8 uppercase tracking-widest">
                    Estados de Validação
                  </h4>
                  <div className="space-y-8">
                    {/* Success State */}
                    <div className="relative pb-2">
                      <input
                        type="email"
                        value="email@exemplo.com"
                        readOnly
                        className="peer w-full bg-white/2 border-b border-green-500/50 py-4 px-4 text-white focus:outline-none"
                      />
                      <label className="absolute left-4 -top-3.5 text-xs uppercase tracking-[0.3em] text-green-400 pointer-events-none">
                        E-mail (Válido)
                      </label>
                      <div className="absolute right-4 top-4 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-400" />
                      </div>
                    </div>

                    {/* Error State */}
                    <div className="relative pb-2">
                      <input
                        type="email"
                        value="email-invalido"
                        readOnly
                        className="peer w-full bg-white/2 border-b border-red-500/50 py-4 px-4 text-white focus:outline-none"
                      />
                      <label className="absolute left-4 -top-3.5 text-xs uppercase tracking-[0.3em] text-red-400 pointer-events-none">
                        E-mail (Inválido)
                      </label>
                      <p className="absolute -bottom-6 left-4 text-xs text-red-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-red-400 rounded-full" />
                        Email inválido
                      </p>
                    </div>
                  </div>
                </div>

                {/* Select Dropdown */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-8 uppercase tracking-widest">
                    Select Dropdown
                  </h4>
                  <div className="relative pb-2">
                    <select className="w-full bg-white/2 border-b border-white/10 py-4 px-4 pr-10 text-white focus:outline-none focus:border-white/40 transition-all duration-300 appearance-none cursor-pointer">
                      <option value="" disabled className="bg-harpia-black text-gray-500">
                        Selecione uma opção
                      </option>
                      <option value="1" className="bg-harpia-black text-white">
                        Opção 1
                      </option>
                      <option value="2" className="bg-harpia-black text-white">
                        Opção 2
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <label className="absolute left-4 -top-3.5 text-xs uppercase tracking-[0.3em] text-gray-500 pointer-events-none">
                      Orçamento Estimado
                    </label>
                  </div>
                </div>

                {/* Textarea */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-8 uppercase tracking-widest">
                    Textarea
                  </h4>
                  <div className="relative pb-2">
                    <textarea
                      rows={4}
                      placeholder=" "
                      className="peer w-full bg-white/2 border-b border-white/10 py-4 px-4 text-white focus:outline-none focus:border-white/40 transition-all duration-300 placeholder-transparent resize-none"
                    />
                    <label className="absolute left-4 -top-3.5 text-xs uppercase tracking-[0.3em] text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-gray-400 transition-all duration-300 pointer-events-none">
                      Mensagem
                    </label>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* CARDS TAB */}
          {activeTab === 'cards' && (
            <Reveal>
              <SectionHeader
                label="05. Cards"
                title="Variações de Cards"
                description="Diferentes estilos de cards usados no projeto."
                align="left"
              />
              <div className="mt-12 space-y-16">
                {/* Differential Cards */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Differential Cards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DifferentialCard
                      icon={<Sparkles size={32} />}
                      title="Design Premium"
                      description="Estética refinada para marcas que buscam exclusividade."
                      index={0}
                    />
                    <DifferentialCard
                      icon={<MousePointer size={32} />}
                      title="Interatividade"
                      description="Experiências imersivas que engajam o usuário."
                      index={1}
                    />
                  </div>
                </div>

                {/* Testimonial Card */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Testimonial Card
                  </h4>
                  <div className="bg-white border border-black/5 p-8 rounded-lg relative h-64 overflow-hidden max-w-2xl">
                    <TestimonialCard
                      text="O design system da Harpia elevou nossa marca a um novo patamar de consistência visual."
                      author="Ana Silva"
                      company="CEO, TechStart"
                      isActive={true}
                    />
                  </div>
                </div>

                {/* Portfolio Card */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-6 uppercase tracking-widest">
                    Portfolio Card
                  </h4>
                  <div className="block relative group overflow-hidden aspect-16/10 bg-harpia-carbon rounded-sm border border-white/10 hover:border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 max-w-2xl">
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute top-6 left-6 z-20">
                      <span className="font-sans text-xs text-white/80 border border-white/25 px-3 py-1.5 rounded-full backdrop-blur-sm bg-black/20">
                        01
                      </span>
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-start z-10">
                      <div className="w-full border-t border-white/40 pt-5">
                        <span className="block font-sans text-xs uppercase tracking-[0.25em] text-white/90 mb-2 font-medium">
                          Branding
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight">
                          Projeto Exemplo
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat Card */}
                <div className="p-8 bg-harpia-black rounded-lg">
                  <h4 className="text-sm font-mono text-white/60 mb-6 uppercase tracking-widest">
                    Stat Card
                  </h4>
                  <div className="p-8 text-center border border-white/5 hover:bg-white/2 transition-colors duration-500 max-w-xs">
                    <div className="mb-4">
                      <span className="font-serif text-6xl text-white block leading-none font-light">
                        150
                        <span className="text-harpia-accent text-3xl align-top ml-1 opacity-80">
                          +
                        </span>
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-400 uppercase tracking-[0.2em]">
                      Projetos Entregues
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* NAVIGATION TAB */}
          {activeTab === 'navigation' && (
            <Reveal>
              <SectionHeader
                label="06. Navegação"
                title="Padrões de Navegação"
                description="Links, menus e elementos de navegação."
                align="left"
              />
              <div className="mt-12 space-y-16">
                {/* Desktop Nav Links */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Desktop Navigation Links
                  </h4>
                  <div className="flex gap-10 p-8 bg-harpia-black rounded-lg">
                    <a
                      href="#"
                      className="text-sm tracking-[0.2em] font-light uppercase text-gray-400 hover:text-white transition-colors duration-300 relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 after:w-0 hover:after:w-full"
                      onClick={(e) => e.preventDefault()}
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="text-sm tracking-[0.2em] font-light uppercase text-white transition-colors duration-300 relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white after:w-full"
                      onClick={(e) => e.preventDefault()}
                    >
                      Sobre (Ativo)
                    </a>
                    <a
                      href="#"
                      className="text-sm tracking-[0.2em] font-light uppercase text-gray-400 hover:text-white transition-colors duration-300 relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 after:w-0 hover:after:w-full"
                      onClick={(e) => e.preventDefault()}
                    >
                      Serviços
                    </a>
                  </div>
                </div>

                {/* Mobile Menu */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Mobile Menu
                  </h4>
                  <div className="p-8 bg-harpia-black rounded-lg">
                    <div className="flex flex-col items-center gap-8">
                      <a
                        href="#"
                        className="font-serif text-2xl tracking-widest text-white hover:text-gray-300 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        Home
                      </a>
                      <a
                        href="#"
                        className="font-serif text-2xl tracking-widest text-white hover:text-gray-300 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        Sobre
                      </a>
                      <a
                        href="#"
                        className="font-serif text-2xl tracking-widest text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        Serviços
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* BADGES TAB */}
          {activeTab === 'badges' && (
            <Reveal>
              <SectionHeader
                label="07. Badges"
                title="Badges e Indicadores"
                description="Tags, badges e indicadores de progresso."
                align="left"
              />
              <div className="mt-12 space-y-16">
                {/* Number Badges */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Number Badges
                  </h4>
                  <div className="flex gap-4 p-8 bg-harpia-black rounded-lg">
                    <span className="font-sans text-xs text-white/80 border border-white/25 px-3 py-1.5 rounded-full backdrop-blur-sm bg-black/20">
                      01
                    </span>
                    <span className="font-sans text-xs text-white/80 border border-white/25 px-3 py-1.5 rounded-full backdrop-blur-sm bg-black/20">
                      02
                    </span>
                    <span className="font-sans text-xs text-white/80 border border-white/25 px-3 py-1.5 rounded-full backdrop-blur-sm bg-black/20">
                      03
                    </span>
                  </div>
                </div>

                {/* Label Badges */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Label Badges
                  </h4>
                  <div className="flex gap-4">
                    <span className="font-sans text-xs font-medium uppercase tracking-[0.4em] text-gray-500 border border-black/10 px-4 py-2 rounded-full">
                      Portfolio
                    </span>
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-accent bg-harpia-black px-4 py-2 rounded-sm">
                      Serviços
                    </span>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Progress Indicator
                  </h4>
                  <div className="p-8 bg-harpia-black rounded-lg max-w-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-sans text-xs uppercase tracking-[0.3em] text-gray-400">
                        Conclusão
                      </span>
                      <span className="font-mono text-sm text-white font-semibold">75%</span>
                    </div>
                    <div className="relative h-1 bg-white/5 overflow-hidden rounded-full">
                      <div
                        className="absolute inset-y-0 left-0 bg-linear-to-r from-white/40 to-white rounded-full transition-all duration-700"
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <Reveal>
              <SectionHeader
                label="08. Inventário"
                title="Componentes do Projeto"
                description="Todos os componentes organizados por categoria com indicação de uso em páginas."
                align="left"
              />
              <div className="mt-12 space-y-16">
                {/* Main Components */}
                <div>
                  <h3 className="text-2xl font-serif text-harpia-black mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Main Components
                    <span className="text-sm font-mono text-gray-400 font-normal">
                      ({COMPONENT_INVENTORY.filter((c) => c.category === 'Main').length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COMPONENT_INVENTORY.filter((c) => c.category === 'Main').map(
                      (component, idx) => (
                        <div
                          key={idx}
                          className="group border border-black/10 p-6 rounded-sm hover:border-black/30 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-sans font-bold text-lg text-harpia-black mb-1">
                                {component.name}
                              </h4>
                              <p className="font-mono text-xs text-gray-500">{component.file}</p>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-mono rounded">
                              {component.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {component.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {component.usedIn.map((page, pageIdx) => (
                              <span
                                key={pageIdx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded border border-gray-200"
                              >
                                {page}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* UI Components */}
                <div>
                  <h3 className="text-2xl font-serif text-harpia-black mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    UI Components
                    <span className="text-sm font-mono text-gray-400 font-normal">
                      ({COMPONENT_INVENTORY.filter((c) => c.category === 'UI').length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COMPONENT_INVENTORY.filter((c) => c.category === 'UI').map(
                      (component, idx) => (
                        <div
                          key={idx}
                          className="group border border-black/10 p-6 rounded-sm hover:border-black/30 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-sans font-bold text-lg text-harpia-black mb-1">
                                {component.name}
                              </h4>
                              <p className="font-mono text-xs text-gray-500">{component.file}</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-mono rounded">
                              {component.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {component.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {component.usedIn.map((page, pageIdx) => (
                              <span
                                key={pageIdx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded border border-gray-200"
                              >
                                {page}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Service Components */}
                <div>
                  <h3 className="text-2xl font-serif text-harpia-black mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Service Components
                    <span className="text-sm font-mono text-gray-400 font-normal">
                      ({COMPONENT_INVENTORY.filter((c) => c.category === 'Services').length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COMPONENT_INVENTORY.filter((c) => c.category === 'Services').map(
                      (component, idx) => (
                        <div
                          key={idx}
                          className="group border border-black/10 p-6 rounded-sm hover:border-black/30 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-sans font-bold text-lg text-harpia-black mb-1">
                                {component.name}
                              </h4>
                              <p className="font-mono text-xs text-gray-500">{component.file}</p>
                            </div>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-mono rounded">
                              {component.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {component.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {component.usedIn.map((page, pageIdx) => (
                              <span
                                key={pageIdx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded border border-gray-200"
                              >
                                {page}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Contact Components */}
                <div>
                  <h3 className="text-2xl font-serif text-harpia-black mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Contact Components
                    <span className="text-sm font-mono text-gray-400 font-normal">
                      ({COMPONENT_INVENTORY.filter((c) => c.category === 'Contact').length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COMPONENT_INVENTORY.filter((c) => c.category === 'Contact').map(
                      (component, idx) => (
                        <div
                          key={idx}
                          className="group border border-black/10 p-6 rounded-sm hover:border-black/30 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-sans font-bold text-lg text-harpia-black mb-1">
                                {component.name}
                              </h4>
                              <p className="font-mono text-xs text-gray-500">{component.file}</p>
                            </div>
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-mono rounded">
                              {component.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {component.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {component.usedIn.map((page, pageIdx) => (
                              <span
                                key={pageIdx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded border border-gray-200"
                              >
                                {page}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="p-8 bg-gray-50 rounded-lg border border-black/10">
                  <h3 className="text-xl font-serif text-harpia-black mb-6">
                    Resumo do Inventário
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-serif text-harpia-black mb-2">
                        {COMPONENT_INVENTORY.filter((c) => c.category === 'Main').length}
                      </div>
                      <div className="text-sm text-gray-600">Main Components</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-serif text-harpia-black mb-2">
                        {COMPONENT_INVENTORY.filter((c) => c.category === 'UI').length}
                      </div>
                      <div className="text-sm text-gray-600">UI Components</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-serif text-harpia-black mb-2">
                        {COMPONENT_INVENTORY.filter((c) => c.category === 'Services').length}
                      </div>
                      <div className="text-sm text-gray-600">Service Components</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-serif text-harpia-black mb-2">
                        {COMPONENT_INVENTORY.filter((c) => c.category === 'Contact').length}
                      </div>
                      <div className="text-sm text-gray-600">Contact Components</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* LAYOUT TAB */}
          {activeTab === 'layout' && (
            <Reveal>
              <SectionHeader
                label="08. Layout"
                title="Grid & Espaçamento"
                description="Estrutura responsiva baseada em containers e grids flexíveis."
                align="left"
              />
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-harpia-black mb-6">Containers</h3>
                  <div className="w-full bg-gray-100 border border-black/10 p-4 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 text-4xl font-bold text-black">
                      max-w-7xl
                    </div>
                    <div className="h-32 w-full border-x border-black/20 mx-auto flex items-center justify-center text-xs font-mono text-black">
                      Container Principal (1280px)
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 border border-black/10 p-4 rounded-lg">
                    <div className="h-24 w-3/4 border-x border-black/20 mx-auto flex items-center justify-center text-xs font-mono text-black">
                      max-w-5xl (Conteúdo)
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-harpia-black mb-6">Grid System</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-gray-100 rounded border border-black/10 flex items-center justify-center text-xs font-mono text-black"
                      >
                        Col {i}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-gray-100 rounded border border-black/10 flex items-center justify-center text-xs font-mono text-black"
                      >
                        Col {i} (Gap 8)
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* COMPONENTS TAB */}
          {activeTab === 'components' && (
            <Reveal>
              <SectionHeader
                label="09. Componentes"
                title="Biblioteca UI"
                description="Componentes reutilizáveis construídos para consistência e performance."
                align="left"
              />
              <div className="mt-12 space-y-16">
                {/* Reveal */}
                <div className="p-8 border border-black/10 rounded-lg bg-gray-50">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-harpia-black">
                    <Layers size={20} /> Reveal Component
                  </h4>
                  <p className="text-gray-600 mb-6 text-sm">Animação de entrada on-scroll.</p>
                  <div className="bg-white border border-black/5 p-8 rounded-lg overflow-hidden">
                    <Reveal>
                      <div className="bg-harpia-black text-white px-6 py-4 rounded font-bold text-center">
                        Eu apareço suavemente!
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* Section Header */}
                <div className="p-8 border border-black/10 rounded-lg bg-gray-50">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-harpia-black">
                    <Layout size={20} /> Section Header
                  </h4>
                  <div className="bg-white border border-black/5 p-8 rounded-lg">
                    <SectionHeader
                      label="Exemplo"
                      title="Título da Seção"
                      description="Descrição da seção demonstrando o componente SectionHeader em ação."
                      align="center"
                    />
                  </div>
                </div>

                {/* Marquee */}
                <div className="p-8 border border-black/10 rounded-lg bg-gray-50 overflow-hidden">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-harpia-black">
                    <Layers size={20} /> Marquee
                  </h4>
                  <div className="bg-harpia-black rounded-lg overflow-hidden">
                    <Marquee items={['Visual', 'Governance', 'Design', 'System', 'Harpia']} />
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* EFFECTS TAB */}
          {activeTab === 'effects' && (
            <Reveal>
              <SectionHeader
                label="10. Efeitos"
                title="Animações & Texturas"
                description="Detalhes visuais que enriquecem a experiência do usuário."
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 border border-black/10 rounded-lg bg-white relative overflow-hidden group shadow-sm">
                  <div className="absolute inset-0 bg-noise opacity-[0.05] animate-noise mix-blend-multiply"></div>
                  <h4 className="relative z-10 font-bold mb-2 text-harpia-black">Noise Texture</h4>
                  <p className="relative z-10 text-sm text-gray-600">
                    Textura granulada sutil para profundidade.
                  </p>
                </div>

                <div className="p-6 border border-black/10 rounded-lg bg-white relative overflow-hidden group shadow-sm">
                  <div className="absolute inset-0 bg-linear-to-br from-black/0 via-black/5 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="relative z-10 font-bold mb-2 text-harpia-black">Shine Effect</h4>
                  <p className="relative z-10 text-sm text-gray-600">
                    Passe o mouse para ver o brilho.
                  </p>
                </div>

                <div className="p-6 border border-black/10 rounded-lg bg-white relative overflow-hidden group shadow-sm">
                  <div className="absolute inset-0 border border-black/0 group-hover:border-black/20 transition-colors duration-300 rounded-lg"></div>
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0)] group-hover:shadow-[inset_0_0_60px_rgba(0,0,0,0.05)] transition-shadow duration-500"></div>
                  <h4 className="relative z-10 font-bold mb-2 text-harpia-black">Glow Border</h4>
                  <p className="relative z-10 text-sm text-gray-600">
                    Efeito de borda interna luminosa.
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {/* DECORATIONS TAB */}
          {activeTab === 'decorations' && (
            <Reveal>
              <div className="relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-200 rounded-full blur-[120px] pointer-events-none -z-10"></div>
                <SectionHeader
                  label="11. Decorações"
                  title="Elementos Ambientais"
                  description="Backgrounds e elementos que compõem a atmosfera."
                  align="left"
                />
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64 border border-black/10 rounded-lg relative overflow-hidden flex items-center justify-center bg-white">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                        opacity: 0.05,
                      }}
                    ></div>
                    <span className="bg-white px-4 py-2 rounded border border-black/10 z-10 text-black font-mono text-sm">
                      Grid Pattern
                    </span>
                  </div>

                  <div className="h-64 border border-black/10 rounded-lg relative overflow-hidden flex items-center justify-center bg-white">
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent"></div>
                    <span className="bg-white px-4 py-2 rounded border border-black/10 z-10 text-black font-mono text-sm">
                      Vignette Overlay
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* ANIMATIONS TAB */}
          {activeTab === 'animations' && (
            <Reveal>
              <SectionHeader
                label="12. Animações"
                title="Padrões de Animação"
                description="Transições, transformações e efeitos de movimento."
                align="left"
              />
              <div className="mt-12 space-y-16">
                {/* Hover Scale */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Hover Scale
                  </h4>
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-harpia-black rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer"></div>
                    <div className="w-32 h-32 bg-gray-200 rounded-lg hover:scale-105 hover:-rotate-3 transition-all duration-500 cursor-pointer"></div>
                  </div>
                </div>

                {/* Hover Translate */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Hover Translate
                  </h4>
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-harpia-black rounded-lg hover:-translate-y-2 transition-transform duration-300 cursor-pointer"></div>
                    <div className="w-32 h-32 bg-gray-200 rounded-lg hover:translate-x-2 transition-transform duration-300 cursor-pointer"></div>
                  </div>
                </div>

                {/* Loading Spinner */}
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Loading Spinner
                  </h4>
                  <Loader2 size={32} className="animate-spin text-harpia-black" />
                </div>
              </div>
            </Reveal>
          )}

          {/* SPACING TAB */}
          {activeTab === 'spacing' && (
            <Reveal>
              <SectionHeader
                label="13. Espaçamento"
                title="Escala de Espaçamento"
                description="Sistema de espaçamento vertical e horizontal usado no projeto."
                align="left"
              />
              <div className="mt-12 space-y-8">
                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Spacing Vertical (Seções)
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-gray-600 w-24">py-32</span>
                      <div className="h-32 bg-gray-200 flex-1 rounded flex items-center justify-center text-xs text-gray-600">
                        8rem - Padrão
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-gray-600 w-24">py-24</span>
                      <div className="h-24 bg-gray-200 flex-1 rounded flex items-center justify-center text-xs text-gray-600">
                        6rem - Compacto
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-gray-600 w-24">py-20</span>
                      <div className="h-20 bg-gray-200 flex-1 rounded flex items-center justify-center text-xs text-gray-600">
                        5rem - Menor
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-widest">
                    Gap (Grid)
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600"
                        >
                          gap-6
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-8">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600"
                        >
                          gap-8
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* NON-COMPLIANT TAB */}
          {activeTab === 'non-compliant' && (
            <Reveal>
              <SectionHeader
                label="14. Não-Conformes"
                title="Elementos Não-Conformes"
                description="Elementos que violam o Design System com recomendações de correção."
                align="left"
              />
              <div className="mt-12 space-y-12">
                {/* Border Radius Violation */}
                <div className="p-8 border-2 border-red-500/20 bg-red-50 rounded-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <AlertTriangle size={24} className="text-red-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-red-700 mb-2">
                        Border Radius Incorreto
                      </h4>
                      <p className="text-sm text-red-600">
                        Componentes usando{' '}
                        <code className="bg-red-100 px-2 py-1 rounded">rounded-lg</code> em vez de{' '}
                        <code className="bg-green-100 px-2 py-1 rounded">rounded-sm</code>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <p className="text-xs font-mono text-red-600 mb-2 uppercase tracking-widest">
                        ❌ Incorreto
                      </p>
                      <div className="p-6 bg-white border border-red-300 rounded-lg">
                        <code className="text-xs text-red-700">className="rounded-lg"</code>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-green-600 mb-2 uppercase tracking-widest">
                        ✅ Correto
                      </p>
                      <div className="p-6 bg-white border border-green-300 rounded-sm">
                        <code className="text-xs text-green-700">className="rounded-sm"</code>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded border border-red-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Componentes Afetados:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                          DifferentialCard.tsx
                        </code>{' '}
                        - Linha 16
                      </li>
                      <li>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                          PortfolioPreview.tsx
                        </code>{' '}
                        - Linha 67
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Missing Aria Labels */}
                <div className="p-8 border-2 border-yellow-500/20 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <AlertTriangle size={24} className="text-yellow-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-yellow-700 mb-2">
                        Falta de Aria-Labels
                      </h4>
                      <p className="text-sm text-yellow-600">
                        Alguns elementos interativos não possuem{' '}
                        <code className="bg-yellow-100 px-2 py-1 rounded">aria-label</code> para
                        acessibilidade
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <p className="text-xs font-mono text-yellow-600 mb-2 uppercase tracking-widest">
                        ❌ Incorreto
                      </p>
                      <div className="p-6 bg-white border border-yellow-300 rounded-sm">
                        <code className="text-xs text-yellow-700">
                          &lt;button&gt;Enviar&lt;/button&gt;
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-green-600 mb-2 uppercase tracking-widest">
                        ✅ Correto
                      </p>
                      <div className="p-6 bg-white border border-green-300 rounded-sm">
                        <code className="text-xs text-green-700">
                          &lt;button aria-label="Enviar formulário"&gt;Enviar&lt;/button&gt;
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inconsistent Hover States */}
                <div className="p-8 border-2 border-orange-500/20 bg-orange-50 rounded-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <AlertTriangle size={24} className="text-orange-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-orange-700 mb-2">
                        Estados Hover Inconsistentes
                      </h4>
                      <p className="text-sm text-orange-600">
                        Durações de transição variando entre 300ms e 500ms
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded border border-orange-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Recomendação:</p>
                    <p className="text-sm text-gray-600">
                      Padronizar durações conforme Design System:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside mt-2">
                      <li>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">300ms</code> -
                        Hover states rápidos (botões, links)
                      </li>
                      <li>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">500ms</code> -
                        Transições médias (overlays, borders)
                      </li>
                      <li>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">700ms</code> -
                        Animações complexas (scale de imagens)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        <footer className="border-t border-black/10 pt-12 flex justify-between items-center text-gray-500 text-sm mt-20">
          <p>© 2024 Harpia Design System</p>
          <div className="flex gap-4">
            <span>v2.0.0</span>
            <span>Updated: Nov 2024</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
