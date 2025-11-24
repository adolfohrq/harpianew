import React from 'react';
import { Reveal, Marquee } from '../components';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DifferentialCard } from '../components/ui/DifferentialCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { ArrowRight, Check, Palette, Type, Layout, Box, Sparkles, MousePointer, Layers } from 'lucide-react';

const ColorSwatch: React.FC<{ name: string; variable: string; hex: string; bgClass: string; textClass?: string }> = ({
    name,
    variable,
    hex,
    bgClass,
    textClass = 'text-white',
}) => (
    <div className="flex flex-col gap-2">
        <div className={`w-full h-32 rounded-lg shadow-lg flex items-center justify-center ${bgClass} ${textClass} border border-white/10`}>
            <span className="font-mono text-sm opacity-80">{hex}</span>
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-lg">{name}</span>
            <span className="text-xs font-mono text-gray-400">{variable}</span>
        </div>
    </div>
);

const TypographyExample: React.FC<{ role: string; font: string; size: string; weight: string; sample: string }> = ({
    role,
    font,
    size,
    weight,
    sample,
}) => (
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

export const VisualGovernance: React.FC = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <header className="mb-20 border-b border-black/10 pb-10">
                        <h1 className="font-serif text-5xl md:text-7xl text-harpia-black mb-6">
                            Visual <span className="text-harpia-black">Governance</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                            Documentação viva do Design System Harpia. Este guia define os padrões visuais,
                            componentes e comportamentos que constroem a identidade digital da marca.
                        </p>
                    </header>
                </Reveal>

                {/* COLORS */}
                <section className="mb-32">
                    <SectionHeader
                        label="01. Cores"
                        title="Paleta Cromática"
                        description="Sistema de cores híbrido focado em imersão (Dark Mode) e legibilidade (Light Mode)."
                        align="left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        <ColorSwatch name="Harpia Black" variable="--color-harpia-black" hex="#191919" bgClass="bg-harpia-black" />
                        <ColorSwatch name="Harpia Carbon" variable="--color-harpia-carbon" hex="#121212" bgClass="bg-[#121212]" />
                        <ColorSwatch name="Harpia Gray" variable="--color-harpia-gray" hex="#2a2a2a" bgClass="bg-[#2a2a2a]" />
                        <ColorSwatch name="Harpia White" variable="--color-harpia-white" hex="#f5f5f7" bgClass="bg-[#f5f5f7]" textClass="text-black" />
                        <ColorSwatch name="Harpia Accent" variable="--color-harpia-accent" hex="#ffffff" bgClass="bg-white" textClass="text-black" />
                    </div>
                </section>

                {/* TYPOGRAPHY */}
                <section className="mb-32">
                    <SectionHeader
                        label="02. Tipografia"
                        title="Sistema Tipográfico"
                        description="Combinação de elegância editorial (Serif) com modernidade geométrica (Sans)."
                        align="left"
                    />

                    <div className="mt-12 space-y-8">
                        <TypographyExample
                            role="Display Headline"
                            font="font-serif"
                            size="text-6xl md:text-8xl"
                            weight="font-normal"
                            sample="Harpia Agency"
                        />
                        <TypographyExample
                            role="Section Title"
                            font="font-serif"
                            size="text-4xl md:text-5xl"
                            weight="font-normal"
                            sample="Transformamos Visão em Realidade"
                        />
                        <TypographyExample
                            role="Body Large"
                            font="font-sans"
                            size="text-xl"
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
                            role="Label / Button"
                            font="font-sans"
                            size="text-sm uppercase tracking-widest"
                            weight="font-bold"
                            sample="Ver Detalhes"
                        />
                    </div>
                </section>

                {/* LAYOUT */}
                <section className="mb-32">
                    <SectionHeader
                        label="03. Layout"
                        title="Grid & Espaçamento"
                        description="Estrutura responsiva baseada em containers e grids flexíveis."
                        align="left"
                    />

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-serif text-harpia-black mb-6">Containers</h3>
                            <div className="w-full bg-gray-100 border border-black/10 p-4 rounded-lg relative overflow-hidden group">
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
                                    <div key={i} className="h-24 bg-gray-100 rounded border border-black/10 flex items-center justify-center text-xs font-mono text-black">
                                        Col {i}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-8 mt-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="h-24 bg-gray-100 rounded border border-black/10 flex items-center justify-center text-xs font-mono text-black">
                                        Col {i} (Gap 8)
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* COMPONENTS */}
                <section className="mb-32">
                    <SectionHeader
                        label="04. Componentes"
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

                        {/* Differential Card */}
                        <div className="p-8 border border-black/10 rounded-lg bg-gray-50">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-harpia-black">
                                <Box size={20} /> Differential Card
                            </h4>
                            <div className="bg-harpia-black p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DifferentialCard
                                    icon={<Sparkles className="text-harpia-accent" />}
                                    title="Design Premium"
                                    description="Estética refinada para marcas que buscam exclusividade."
                                    index={0}
                                />
                                <DifferentialCard
                                    icon={<MousePointer className="text-harpia-accent" />}
                                    title="Interatividade"
                                    description="Experiências imersivas que engajam o usuário."
                                    index={1}
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

                        {/* Testimonial Card */}
                        <div className="p-8 border border-black/10 rounded-lg bg-gray-50">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-harpia-black">
                                <Layers size={20} /> Testimonial Card (Light Context)
                            </h4>
                            <div className="bg-white border border-black/5 p-8 rounded-lg relative h-64 overflow-hidden">
                                <TestimonialCard
                                    text="O design system da Harpia elevou nossa marca a um novo patamar de consistência visual."
                                    author="Ana Silva"
                                    company="CEO, TechStart"
                                    isActive={true}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* EFFECTS */}
                <section className="mb-32">
                    <SectionHeader
                        label="05. Efeitos"
                        title="Animações & Texturas"
                        description="Detalhes visuais que enriquecem a experiência do usuário."
                        align="left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 border border-black/10 rounded-lg bg-white relative overflow-hidden group shadow-sm">
                            <div className="absolute inset-0 bg-noise opacity-[0.05] animate-noise mix-blend-multiply"></div>
                            <h4 className="relative z-10 font-bold mb-2 text-harpia-black">Noise Texture</h4>
                            <p className="relative z-10 text-sm text-gray-600">Textura granulada sutil para profundidade.</p>
                        </div>

                        <div className="p-6 border border-black/10 rounded-lg bg-white relative overflow-hidden group shadow-sm">
                            <div className="absolute inset-0 bg-linear-to-br from-black/0 via-black/5 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <h4 className="relative z-10 font-bold mb-2 text-harpia-black">Shine Effect</h4>
                            <p className="relative z-10 text-sm text-gray-600">Passe o mouse para ver o brilho.</p>
                        </div>

                        <div className="p-6 border border-black/10 rounded-lg bg-white relative overflow-hidden group shadow-sm">
                            <div className="absolute inset-0 border border-black/0 group-hover:border-black/20 transition-colors duration-300 rounded-lg"></div>
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0)] group-hover:shadow-[inset_0_0_60px_rgba(0,0,0,0.05)] transition-shadow duration-500"></div>
                            <h4 className="relative z-10 font-bold mb-2 text-harpia-black">Glow Border</h4>
                            <p className="relative z-10 text-sm text-gray-600">Efeito de borda interna luminosa.</p>
                        </div>
                    </div>
                </section>

                {/* DECORATIONS */}
                <section className="mb-32 relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-200 rounded-full blur-[120px] pointer-events-none -z-10"></div>

                    <SectionHeader
                        label="06. Decorações"
                        title="Elementos Ambientais"
                        description="Backgrounds e elementos que compõem a atmosfera."
                        align="left"
                    />

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-64 border border-black/10 rounded-lg relative overflow-hidden flex items-center justify-center bg-white">
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
                                backgroundSize: '40px 40px',
                                opacity: 0.05
                            }}></div>
                            <span className="bg-white px-4 py-2 rounded border border-black/10 z-10 text-black font-mono text-sm">Grid Pattern</span>
                        </div>

                        <div className="h-64 border border-black/10 rounded-lg relative overflow-hidden flex items-center justify-center bg-white">
                            <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent"></div>
                            <span className="bg-white px-4 py-2 rounded border border-black/10 z-10 text-black font-mono text-sm">Vignette Overlay</span>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-black/10 pt-12 flex justify-between items-center text-gray-500 text-sm">
                    <p>© 2024 Harpia Design System</p>
                    <div className="flex gap-4">
                        <span>v1.0.0</span>
                        <span>Updated: Nov 2024</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};
