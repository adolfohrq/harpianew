/**
 * EXEMPLOS DE USO DO COMPONENTE SectionHeader
 *
 * Este arquivo contém exemplos práticos de como usar o componente SectionHeader
 * em diferentes contextos do projeto Harpia.
 */

import React from 'react';
import { SectionHeader } from './SectionHeader';

// ============================================
// EXEMPLO 1: Uso Completo (ServicesHub)
// ============================================
export const ExampleServicesHub = () => (
  <section className="py-20 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeader
        label="O que fazemos"
        title="NOSSOS SERVIÇOS"
        description="Somos movidos por resultados. Cada serviço é pensado estrategicamente para elevar sua marca e gerar impacto real."
        link={{
          to: '/servicos',
          text: 'Ver Detalhes',
          ariaLabel: 'Ver todos os detalhes dos serviços',
        }}
      />
      {/* Grid de serviços aqui */}
    </div>
  </section>
);

// ============================================
// EXEMPLO 2: Header Centralizado (Portfolio)
// ============================================
export const ExamplePortfolio = () => (
  <section className="py-24 bg-harpia-black">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader
        label="Nossos Projetos"
        title="PORTFOLIO"
        description="Conheça alguns dos trabalhos que já realizamos para marcas que confiam na Harpia."
        align="center"
        descriptionMaxWidth="xl"
        className="mb-20"
      />
      {/* Galeria de projetos aqui */}
    </div>
  </section>
);

// ============================================
// EXEMPLO 3: Apenas Título e Descrição (Sobre)
// ============================================
export const ExampleAbout = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader
        title="SOBRE A HARPIA"
        description="Mais de uma década transformando visões em realidade. Somos uma agência que voa alto e leva nossos clientes junto."
        descriptionMaxWidth="lg"
      />
      {/* Conteúdo sobre aqui */}
    </div>
  </section>
);

// ============================================
// EXEMPLO 4: Com Label e Link (Depoimentos)
// ============================================
export const ExampleTestimonials = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader
        label="O que dizem"
        title="DEPOIMENTOS"
        description="A satisfação dos nossos clientes é nossa maior conquista."
        link={{
          to: '/cases',
          text: 'Ver Cases Completos',
          ariaLabel: 'Ver estudos de caso completos',
        }}
      />
      {/* Cards de depoimentos aqui */}
    </div>
  </section>
);

// ============================================
// EXEMPLO 5: Título Simples (Blog)
// ============================================
export const ExampleBlog = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader label="Insights" title="ÚLTIMAS DO BLOG" className="mb-12" />
      {/* Lista de posts aqui */}
    </div>
  </section>
);

// ============================================
// EXEMPLO 6: Centralizado com Largura Full (FAQ)
// ============================================
export const ExampleFAQ = () => (
  <section className="py-32 bg-harpia-carbon">
    <div className="max-w-5xl mx-auto px-6">
      <SectionHeader
        label="Dúvidas"
        title="PERGUNTAS FREQUENTES"
        description="Separamos as principais dúvidas dos nossos clientes. Se a sua não estiver aqui, entre em contato conosco!"
        align="center"
        descriptionMaxWidth="full"
        className="mb-16"
      />
      {/* Accordion de FAQ aqui */}
    </div>
  </section>
);

// ============================================
// EXEMPLO 7: Com Descrição Curta (Contato)
// ============================================
export const ExampleContact = () => (
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <SectionHeader
        label="Fale Conosco"
        title="VAMOS CONVERSAR?"
        description="Pronto para levar sua marca mais longe? Entre em contato."
        descriptionMaxWidth="md"
      />
      {/* Formulário de contato aqui */}
    </div>
  </section>
);

// ============================================
// EXEMPLO 8: Minimal (Equipe)
// ============================================
export const ExampleTeam = () => (
  <section className="py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader
        title="NOSSA EQUIPE"
        description="Conheça as pessoas que fazem a Harpia voar alto todos os dias."
      />
      {/* Grid de membros da equipe aqui */}
    </div>
  </section>
);

// ============================================
// COMPARAÇÃO: ANTES vs DEPOIS
// ============================================

/**
 * ANTES (Código Manual - ~25 linhas)
 */
export const BeforeExample = () => (
  <header className="text-center md:text-left mb-16 md:mb-20">
    {/* Reveal wrapper */}
    <span className="inline-block font-sans text-xs uppercase tracking-widest text-gray-500 mb-4 px-4 py-1.5 bg-gray-100 rounded-full">
      O que fazemos
    </span>
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-harpia-black mb-4 md:mb-6 leading-tight">
      NOSSOS SERVIÇOS
    </h2>
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <p className="font-sans text-gray-600 font-light text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
        Descrição aqui...
      </p>
      {/* Link component com ícone */}
    </div>
  </header>
);

/**
 * DEPOIS (Com SectionHeader - 6 linhas!)
 */
export const AfterExample = () => (
  <SectionHeader
    label="O que fazemos"
    title="NOSSOS SERVIÇOS"
    description="Descrição aqui..."
    link={{ to: '/servicos', text: 'Ver Detalhes' }}
  />
);

/**
 * BENEFÍCIOS DA REFATORAÇÃO:
 *
 * ✅ Redução de ~75% no código
 * ✅ Consistência visual garantida
 * ✅ Manutenção centralizada
 * ✅ Menos bugs de estilo
 * ✅ Type safety com TypeScript
 * ✅ Melhor legibilidade
 * ✅ Reutilização máxima
 */
