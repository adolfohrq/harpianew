# Arquitetura do Projeto Harpia

> **Documentação de Arquitetura e Padrões de Desenvolvimento**  
> Este documento serve como guia completo para desenvolvedores e assistentes de IA que trabalham no projeto Harpia Agência.

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Stack Tecnológica](#-stack-tecnológica)
3. [Estrutura de Diretórios](#-estrutura-de-diretórios)
4. [Arquitetura de Componentes](#-arquitetura-de-componentes)
5. [Gerenciamento de Estado e Dados](#-gerenciamento-de-estado-e-dados)
6. [Roteamento](#-roteamento)
7. [Estilização](#-estilização)
8. [Padrões de Código](#-padrões-de-código)
9. [Convenções de Nomenclatura](#-convenções-de-nomenclatura)
10. [Performance e Otimização](#-performance-e-otimização)
11. [Testes](#-testes)
12. [Qualidade de Código](#-qualidade-de-código)
13. [Fluxo de Desenvolvimento](#-fluxo-de-desenvolvimento)
14. [Guia de Implementação](#-guia-de-implementação)

---

## 🎯 Visão Geral

**Harpia Agência** é um website institucional moderno desenvolvido para uma agência de marketing e branding. O projeto prioriza:

- **Performance**: Code splitting, lazy loading, e otimizações de bundle
- **Experiência Visual**: Animações suaves, design premium com grain effect e parallax
- **SEO**: Meta tags dinâmicas com react-helmet-async
- **Qualidade**: TypeScript strict, testes automatizados, linting rigoroso
- **Manutenibilidade**: Arquitetura modular, barrel exports, separação clara de responsabilidades

---

## 🛠 Stack Tecnológica

### Core

- **React** `19.2.0` - Biblioteca UI com React 19 features
- **TypeScript** `~5.8.2` - Type safety e developer experience
- **Vite** `^6.2.0` - Build tool e dev server (porta 5020)
- **Path Alias** `@/*` - Mapeado para `./src/*` para imports limpos

### Roteamento

- **React Router DOM** `^7.9.6` - Client-side routing com BrowserRouter (URLs limpas)

### Estilização

- **Tailwind CSS** `^4.1.17` - Utility-first CSS framework (v4)
- **@tailwindcss/postcss** `^4.1.17` - PostCSS integration
- **Custom CSS** - Animações customizadas (noise, marquee)

### SEO

- **react-helmet-async** `^2.0.5` - Gerenciamento de meta tags

### Ícones

- **lucide-react** `^0.554.0` - Biblioteca de ícones moderna

### Qualidade de Código

- **ESLint** `^9.39.1` - Linting com TypeScript e React plugins
- **Prettier** `^3.6.2` - Code formatting
- **Husky** `^9.1.7` - Git hooks
- **lint-staged** `^16.2.7` - Pre-commit linting
- **Commitlint** `^20.1.0` - Conventional commits

### Testes

- **Vitest** `^4.0.13` - Test runner
- **@testing-library/react** `^16.3.0` - React testing utilities
- **@testing-library/jest-dom** `^6.9.1` - Custom matchers
- **jsdom** `^27.2.0` - DOM environment para testes

---

## 📁 Estrutura de Diretórios

```
harpianew/
├── .husky/                    # Git hooks configuration
├── docs/                      # Documentação do projeto
│   ├── ARCHITECTURE.md        # Arquitetura e padrões de código
│   └── DESIGN_SYSTEM.md       # Design system e componentes UI
├── public/                    # Assets estáticos
│   ├── Harpia-01.svg         # Logo principal
│   └── *.jpg                 # Imagens
├── src/
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── ui/              # Componentes de UI base
│   │   │   ├── DifferentialCard.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── OptimizedImage.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   └── index.ts
│   │   ├── services/        # Componentes da página Serviços
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── ServicesCTA.tsx
│   │   │   ├── ServicesHero.tsx
│   │   │   ├── ServicesManifesto.tsx
│   │   │   ├── ServicesStats.tsx
│   │   │   └── index.ts
│   │   ├── contact/         # Componentes da página Contato
│   │   │   ├── ContactCTA.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ContactInfo.tsx
│   │   │   └── index.ts
│   │   ├── ClientLogos.tsx
│   │   ├── CTASection.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Manifesto.tsx
│   │   ├── Marquee.tsx
│   │   ├── Navbar.tsx
│   │   ├── PortfolioPreview.tsx
│   │   ├── Preloader.tsx
│   │   ├── Process.tsx
│   │   ├── Reveal.tsx
│   │   ├── ServicesHub.tsx
│   │   ├── Showreel.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   ├── WhyHarpia.tsx
│   │   └── index.ts         # Barrel export
│   ├── data/                # Dados estáticos e constantes
│   │   ├── about.ts         # Dados da página Sobre
│   │   ├── about2.ts        # Dados da página Sobre alternativa
│   │   ├── navigation.ts    # Links de navegação
│   │   ├── packages.ts      # Pacotes de serviços
│   │   ├── projects.ts      # Portfolio de projetos
│   │   ├── services.ts      # Serviços oferecidos
│   │   ├── testimonials.ts  # Depoimentos de clientes
│   │   └── index.ts         # Barrel export
│   ├── hooks/               # Custom React hooks
│   │   └── useMetaTags.ts   # Hook para gerenciamento de meta tags
│   ├── pages/               # Páginas/rotas da aplicação
│   │   ├── AboutPage.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── Packages.tsx
│   │   ├── Portfolio.tsx
│   │   ├── PortfolioDetail.tsx
│   │   ├── Services.tsx
│   │   ├── VisualGovernance.tsx
│   │   └── index.ts         # Barrel export
│   ├── test/                # Configuração de testes
│   │   └── setup.ts
│   ├── App.tsx              # Componente raiz com routing
│   ├── index.tsx            # Entry point da aplicação
│   ├── index.css            # Estilos globais e Tailwind config
│   ├── types.ts             # Type definitions globais
│   └── Simple.test.tsx      # Exemplo de teste
├── .env.local               # Variáveis de ambiente (não commitado)
├── .gitignore
├── .prettierrc              # Prettier configuration
├── commitlint.config.js     # Commitlint rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── vitest.config.ts         # Vitest configuration
```

### Princípios de Organização

1. **Separação por Tipo**: Componentes, páginas, dados e testes em pastas dedicadas
2. **Barrel Exports**: Cada pasta principal tem `index.ts` para simplificar imports
3. **Colocation**: Componentes relacionados ficam próximos (ex: `ui/OptimizedImage.tsx`)
4. **Flat Structure**: Evita aninhamento excessivo, máximo 2-3 níveis

---

## 🧩 Arquitetura de Componentes

### Hierarquia de Componentes

```
App (Router, Preloader, ScrollToTop)
├── Navbar (fixed, scroll-aware)
├── Main Content (reveal effect)
│   └── Routes
│       ├── Home
│       │   ├── Hero Section
│       │   ├── Stats
│       │   ├── ClientLogos
│       │   ├── Showreel
│       │   ├── Services Grid
│       │   ├── WhyHarpia
│       │   ├── Process
│       │   ├── Projects Grid (Marquee)
│       │   └── Testimonials
│       ├── Services
│       ├── Packages
│       ├── Portfolio (listagem de projetos)
│       │   └── PortfolioDetail (/:slug)
│       ├── Contact
│       └── NotFound
├── Footer (fixed, revealed on scroll)
└── Floating CTA Button
```

### Tipos de Componentes

#### 1. **Layout Components**

Componentes estruturais que definem o layout da aplicação.

**Exemplos**: `Navbar`, `Footer`

**Footer (App.tsx)**:
O projeto utiliza um layout padrão onde o footer segue o fluxo normal do documento, posicionado após o conteúdo principal.

```tsx
// App.tsx (Simplificado)
<main className="relative">
  {/* Rotas */}
</main>
<Footer />
```

```tsx
// Navbar.tsx
interface NavbarProps {
  links: NavLink[];
}

export const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Scroll detection para mudar estilo
  // Mobile menu toggle
  // Active link highlighting
};
```

**Características**:

- Gerenciam scroll state para efeitos visuais
- Responsivos (desktop/mobile)
- Integrados com React Router (`useLocation`, `Link`)

#### 2. **Section Components**

Componentes que representam seções completas de uma página.

**Exemplos**: `Stats`, `WhyHarpia`, `Process`, `Testimonials`, `Showreel`

```tsx
// Stats.tsx
export const Stats: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-harpia-carbon">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Estatísticas */}
      </div>
    </section>
  );
};
```

**Características**:

- Auto-contidos, não recebem props complexas
- Usam dados de `src/data`
- Responsáveis por seu próprio layout interno

#### 3. **UI Components**

Componentes reutilizáveis de interface.

**Exemplos**: `OptimizedImage`, `Reveal`, `Marquee`

```tsx
// OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
}) => {
  return <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} className={className} />;
};
```

**Características**:

- Altamente reutilizáveis
- Props bem definidas com TypeScript
- Sem lógica de negócio

#### 4. **Utility Components**

Componentes que fornecem funcionalidades sem UI.

**Exemplos**: `Preloader`, `Reveal`, `ScrollToTop`

```tsx
// ScrollToTop (em App.tsx)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
```

#### 5. **Page Components**

Componentes que representam páginas completas.

**Exemplos**: `Home`, `Services`, `Packages`, `Contact`, `NotFound`

```tsx
// Home.tsx
export const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Harpia Agência | Enxergue Mais Longe</title>
        <meta name="description" content="..." />
      </Helmet>

      {/* Hero Section */}
      {/* Stats */}
      {/* ClientLogos */}
      {/* ... outras seções */}
    </>
  );
};
```

**Características**:

- Compõem múltiplos section components
- Gerenciam SEO com `react-helmet-async`
- Lazy loaded via React Router

---

## 🗄 Gerenciamento de Estado e Dados

### Estratégia de Estado

O projeto **não usa gerenciadores de estado global** (Redux, Zustand, etc.). O estado é gerenciado localmente:

1. **Component State** (`useState`): Para UI state (scroll position, mobile menu open, etc.)
2. **URL State** (React Router): Para navegação e deep linking
3. **Static Data**: Dados estáticos em `src/data/`

### Camada de Dados

Todos os dados estáticos ficam em `src/data/`:

```typescript
// src/data/services.ts
import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'foto',
    title: 'Fotografia & Vídeo',
    description: '...',
    image: 'https://picsum.photos/seed/cam/1200/800',
  },
  // ...
];
```

**Padrão de Uso**:

```tsx
import { SERVICES } from '../data';

export const ServicesPage = () => {
  return (
    <div>
      {SERVICES.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
};
```

### Type Definitions

Todos os tipos ficam em `src/types.ts`:

```typescript
export interface NavLink {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  level: 'entry' | 'mid' | 'pro';
  features: PackageFeature[];
}

export interface ProjectResult {
  metric: string;
  value: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  description?: string;
  client?: string;
  year?: string;
  services?: string[];
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  gallery?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  company: string;
}
```

**Regras**:

- Um tipo por entidade de domínio
- Usar `interface` ao invés de `type` para objetos
- Exportar todos os tipos para reuso

---

## 🚦 Roteamento

### Configuração

O projeto usa **BrowserRouter** do React Router DOM v7 para URLs limpas:

```tsx
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Preloader />
      <ScrollToTop />
      <Navbar links={NAV_LINKS} />

      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/pacotes" element={<Packages />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/visual-governance" element={<VisualGovernance />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </Router>
  );
};
```

### Lazy Loading de Páginas

Todas as páginas são lazy loaded para otimizar o bundle inicial:

```tsx
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
// ...
```

**Por que `.then((m) => ({ default: m.Home }))`?**  
Porque usamos named exports (`export const Home`) ao invés de default exports. O React.lazy espera um default export, então fazemos essa transformação.

### Navegação

**Links Internos**:

```tsx
import { Link } from 'react-router-dom';

<Link to="/servicos" className="...">
  Serviços
</Link>;
```

**Navegação Programática**:

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/contato');
```

**Active Links**:

```tsx
import { useLocation } from 'react-router-dom';

const location = useLocation();
const isActive = location.pathname === link.path;
```

### Scroll Behavior

O componente `ScrollToTop` garante que a página sempre inicie no topo ao navegar:

```tsx
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
```

---

## 🎨 Estilização

### Tailwind CSS v4

O projeto usa **Tailwind CSS v4** com a nova sintaxe `@theme`:

```css
/* src/index.css */
@import 'tailwindcss';

@theme {
  /* Custom Fonts */
  --font-serif: 'Silk Serif', serif;
  --font-sans: 'Dosis', sans-serif;

  /* Custom Colors */
  --color-harpia-black: #191919;
  --color-harpia-carbon: #121212;
  --color-harpia-gray: #2a2a2a;
  --color-harpia-white: #f5f5f7;
  --color-harpia-accent: #ffffff;

  /* Custom Background */
  --background-image-noise: url('data:image/svg+xml,...');
}
```

**Uso no código**:

```tsx
<div className="bg-harpia-black text-harpia-white font-serif">{/* ... */}</div>
```

### Custom Animations

Animações customizadas definidas em CSS:

#### 1. **Noise Animation** (Grain Effect)

```css
@keyframes noise {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -5%);
  }
  /* ... */
  100% {
    transform: translate(5%, 0);
  }
}

.animate-noise {
  animation: noise 0.2s steps(10) infinite;
}
```

**Uso**:

```tsx
<div className="fixed inset-0 z-[9999] pointer-events-none">
  <div className="absolute w-[300%] h-[300%] bg-noise opacity-[0.04] animate-noise" />
</div>
```

#### 2. **Marquee Animation**

```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

/* Pause on hover */
.group:hover .animate-marquee {
  animation-play-state: paused;
}
```

**Uso**:

```tsx
<div className="group overflow-hidden">
  <div className="flex animate-marquee">{/* Items */}</div>
</div>
```

### Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #191919;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

### Padrões de Estilização

1. **Utility-First**: Priorizar classes Tailwind
2. **Responsive**: Mobile-first com breakpoints `md:`, `lg:`
3. **Hybrid Theme**: Site usa tema híbrido (Dark Mode dominante com seções Light Mode para contraste)
4. **Spacing**: Usar escala Tailwind (px-6, py-32, gap-12)
5. **Typography**: `font-serif` para títulos, `font-sans` para corpo
6. **Transitions**: `transition-all duration-300` para hover effects

---

## 📐 Padrões de Código

### Componentes React

#### Estrutura Padrão

```tsx
import React, { useState, useEffect } from 'react';
import { SomeType } from '../types';

interface ComponentProps {
  title: string;
  items: SomeType[];
  onAction?: () => void;
}

export const Component: React.FC<ComponentProps> = ({ title, items, onAction }) => {
  // 1. Hooks
  const [state, setState] = useState(false);

  useEffect(() => {
    // Side effects
  }, []);

  // 2. Event handlers
  const handleClick = () => {
    setState(true);
    onAction?.();
  };

  // 3. Render
  return (
    <div className="...">
      <h2>{title}</h2>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

#### Regras de Componentes

1. **Named Exports**: Sempre `export const Component` (não default)
2. **TypeScript**: Sempre tipar props com `interface`
3. **React.FC**: Usar `React.FC<Props>` para type safety
4. **Destructuring**: Desestruturar props no parâmetro
5. **Hooks Order**: Hooks → handlers → render
6. **Key Props**: Sempre usar `key` em listas (preferir `id` único)

#### ❌ Evitar (Anti-patterns)

```tsx
// ❌ ERRADO: Default export + any
const Button = (props: any) => { ... }
export default Button;

// ❌ ERRADO: Cores hardcoded
<div className="bg-black">  // Usar bg-harpia-black

// ✅ CORRETO: Named export + tipagem
export const Button = ({ label, onClick }: ButtonProps) => { ... }
```

### Hooks

#### useState

```tsx
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState<Item[]>([]);
```

#### useEffect

```tsx
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### useRef

```tsx
const footerRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  if (footerRef.current) {
    setFooterHeight(footerRef.current.offsetHeight);
  }
}, []);
```

### Imports

#### Ordem de Imports

```tsx
// 1. React e bibliotecas externas
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// 2. Types
import { NavLink, ServiceItem } from '../types';

// 3. Data
import { SERVICES, NAV_LINKS } from '../data';

// 4. Components
import { Navbar, Footer } from '../components';
```

#### Barrel Exports

Sempre usar barrel exports para simplificar imports:

```typescript
// src/components/index.ts
export { Footer } from './Footer';
export { Navbar } from './Navbar';
export { Preloader } from './Preloader';
// ...

// Uso
import { Navbar, Footer, Preloader } from '../components';
```

### TypeScript

#### Strict Mode

O projeto usa TypeScript strict mode:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "noEmit": true,
    "skipLibCheck": true
  }
}
```

#### Type Inference

Prefira type inference quando possível:

```tsx
// ❌ Redundante
const [count, setCount] = useState<number>(0);

// ✅ Inferido
const [count, setCount] = useState(0);

// ✅ Necessário quando não pode inferir
const [items, setItems] = useState<Item[]>([]);
```

#### Evitar `any`

```tsx
// ❌ Evitar
const handleClick = (e: any) => { ... };

// ✅ Tipar corretamente
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };
```

---

## 🏷 Convenções de Nomenclatura

### Arquivos

- **Componentes**: PascalCase - `Navbar.tsx`, `OptimizedImage.tsx`
- **Pages**: PascalCase - `Home.tsx`, `NotFound.tsx`
- **Data**: camelCase - `services.ts`, `navigation.ts`
- **Types**: camelCase - `types.ts`
- **Config**: kebab-case - `vite.config.ts`, `eslint.config.js`
- **Barrel Exports**: `index.ts`

### Componentes

- **PascalCase**: `Navbar`, `OptimizedImage`, `ScrollToTop`
- **Descritivos**: Nome deve descrever o que o componente faz
- **Sem prefixo**: Não usar `Component`, `Page`, etc.

### Variáveis e Funções

```tsx
// Variáveis: camelCase
const isScrolled = true;
const footerHeight = 100;

// Constantes: UPPER_SNAKE_CASE
const NAV_LINKS = [...];
const SERVICES = [...];

// Funções: camelCase com verbo
const handleClick = () => { ... };
const updateHeight = () => { ... };

// Event handlers: handle + Event
const handleScroll = () => { ... };
const handleSubmit = () => { ... };
```

### Interfaces e Types

```tsx
// Interface: PascalCase com sufixo Props/Item/Data
interface NavbarProps { ... }
interface ServiceItem { ... }
interface PackageFeature { ... }

// Type: PascalCase
type Level = 'entry' | 'mid' | 'pro';
```

### CSS Classes

```tsx
// Tailwind: utility classes
className = 'bg-harpia-black text-white px-6 py-4';

// Custom: kebab-case
className = 'animate-noise';
className = 'animate-marquee';
```

---

## ⚡ Performance e Otimização

### Code Splitting

Todas as páginas são lazy loaded:

```tsx
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
```

**Benefícios**:

- Bundle inicial menor (~30% redução)
- Páginas carregam sob demanda
- Melhor First Contentful Paint (FCP)

### Lazy Loading de Imagens

Componente `OptimizedImage` com lazy loading nativo:

```tsx
<OptimizedImage
  src="image.jpg"
  alt="Description"
  loading="lazy" // ou "eager" para above-the-fold
/>
```

### Otimizações de Scroll

Evitar scroll listeners pesados:

```tsx
// ❌ Evitar: listener sem throttle
window.addEventListener('scroll', () => {
  // Cálculos pesados
});

// ✅ Usar: state simples
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Animações Performáticas

Usar `transform` e `opacity` para animações (GPU-accelerated):

```css
/* ✅ Performático */
.animate-marquee {
  animation: marquee 40s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* ❌ Evitar: left, top, width, height */
```

### Will-Change

Usar `will-change` para animações contínuas:

```tsx
<div className="will-change-opacity animate-noise" />
```

---

## 🧪 Testes

### Configuração

O projeto usa **Vitest** com React Testing Library:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
```

### Executar Testes

```bash
# Rodar todos os testes
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Estrutura de Testes

```tsx
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Component onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Padrões de Teste

1. **Arrange-Act-Assert**: Estruturar testes em 3 fases
2. **User-Centric**: Testar comportamento do usuário, não implementação
3. **Queries**: Preferir `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
4. **Async**: Usar `await` para ações assíncronas

---

## ✅ Qualidade de Código

### ESLint

Configuração rigorosa com TypeScript e React:

```javascript
// eslint.config.js
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  }
);
```

**Rodar ESLint**:

```bash
npm run lint
```

### Prettier

Formatação automática:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**Rodar Prettier**:

```bash
npm run format
```

### Husky + lint-staged

Pre-commit hooks garantem qualidade:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

**Fluxo**:

1. Fazer commit
2. Husky executa lint-staged
3. ESLint e Prettier rodam nos arquivos staged
4. Se passar, commit é feito
5. Se falhar, commit é bloqueado

### Commitlint

Conventional commits obrigatórios:

```javascript
// commitlint.config.js
export default { extends: ['@commitlint/config-conventional'] };
```

**Formato**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Tipos válidos**:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Adicionar/modificar testes
- `chore`: Manutenção

**Exemplos**:

```
feat(navbar): add mobile menu animation
fix(footer): correct reveal effect on mobile
docs(architecture): update component patterns
```

---

## 🔄 Fluxo de Desenvolvimento

### Setup Inicial

```bash
# 1. Clone o repositório
git clone <repo-url>
cd harpianew

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves

# 4. Inicie o dev server
npm run dev
# Acesse http://localhost:5020
```

### Workflow Diário

```bash
# 1. Criar branch para feature/fix
git checkout -b feat/nova-funcionalidade

# 2. Desenvolver
# - Escrever código
# - Escrever testes
# - Rodar testes: npm test

# 3. Verificar qualidade
npm run lint
npm run format

# 4. Commit (Husky vai validar)
git add .
git commit -m "feat(component): add new feature"

# 5. Push
git push origin feat/nova-funcionalidade

# 6. Abrir Pull Request
```

### Checklist de PR

- [ ] Código segue padrões do projeto
- [ ] Testes escritos e passando
- [ ] ESLint sem erros
- [ ] Prettier aplicado
- [ ] Commit messages seguem conventional commits
- [ ] Documentação atualizada (se necessário)
- [ ] Build passa: `npm run build`

---

## 🚀 Guia de Implementação

### Criar Novo Componente

```bash
# 1. Criar arquivo
touch src/components/NewComponent.tsx

# 2. Estrutura base
```

```tsx
import React from 'react';

interface NewComponentProps {
  title: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return (
    <div className="...">
      <h2>{title}</h2>
    </div>
  );
};
```

```bash
# 3. Adicionar ao barrel export
# Em src/components/index.ts
export { NewComponent } from './NewComponent';

# 4. Criar teste
touch src/components/NewComponent.test.tsx
```

```tsx
import { render, screen } from '@testing-library/react';
import { NewComponent } from './NewComponent';

describe('NewComponent', () => {
  it('renders title', () => {
    render(<NewComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Criar Nova Página

```bash
# 1. Criar arquivo
touch src/pages/NewPage.tsx
```

```tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const NewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Nova Página | Harpia Agência</title>
        <meta name="description" content="Descrição da página" />
      </Helmet>

      <div className="min-h-screen py-32 px-6">
        <h1 className="text-5xl font-serif">Nova Página</h1>
      </div>
    </>
  );
};
```

```bash
# 2. Adicionar ao barrel export
# Em src/pages/index.ts
export { NewPage } from './NewPage';

# 3. Adicionar rota
# Em src/App.tsx
```

```tsx
const NewPage = lazy(() => import('./pages/NewPage').then((m) => ({ default: m.NewPage })));

// Em Routes
<Route path="/nova-pagina" element={<NewPage />} />;
```

```bash
# 4. Adicionar ao menu
# Em src/data/navigation.ts
```

```tsx
export const NAV_LINKS: NavLink[] = [
  // ...
  { label: 'Nova Página', path: '/nova-pagina' },
];
```

### Adicionar Novos Dados

```bash
# 1. Definir tipo
# Em src/types.ts
```

```tsx
export interface NewDataItem {
  id: string;
  name: string;
  value: number;
}
```

```bash
# 2. Criar arquivo de dados
touch src/data/newData.ts
```

```tsx
import { NewDataItem } from '../types';

export const NEW_DATA: NewDataItem[] = [
  { id: '1', name: 'Item 1', value: 100 },
  { id: '2', name: 'Item 2', value: 200 },
];
```

```bash
# 3. Adicionar ao barrel export
# Em src/data/index.ts
export { NEW_DATA } from './newData';
```

### Adicionar Animação Customizada

```css
/* Em src/index.css */

@keyframes myAnimation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-my-animation {
  animation: myAnimation 2s ease-in-out infinite;
}
```

```tsx
// Uso
<div className="animate-my-animation">Conteúdo animado</div>
```

### Integrar com API (Futuro)

```bash
# 1. Criar service
touch src/services/api.ts
```

```tsx
const API_URL = import.meta.env.VITE_API_URL;

export const fetchServices = async (): Promise<ServiceItem[]> => {
  const response = await fetch(`${API_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
};
```

```tsx
// 2. Usar em componente
import { useEffect, useState } from 'react';
import { fetchServices } from '../services/api';

export const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
};
```

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Router v7](https://reactrouter.com/)
- [Vitest](https://vitest.dev/)

### Ferramentas de Desenvolvimento

- **VS Code Extensions**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Dev server (porta 5020)
npm run build            # Build de produção
npm run preview          # Preview do build

# Qualidade
npm run lint             # Rodar ESLint
npm run format           # Rodar Prettier
npm test                 # Rodar testes
npm test -- --watch      # Testes em watch mode

# Git
npm run prepare          # Setup Husky (automático no install)
```

---

## 🎓 Melhores Práticas

### Performance

1. ✅ Usar lazy loading para páginas
2. ✅ Otimizar imagens (lazy loading, formatos modernos)
3. ✅ Evitar re-renders desnecessários
4. ✅ Usar `transform` e `opacity` para animações
5. ✅ Minimizar scroll listeners

### Acessibilidade

1. ✅ Usar tags semânticas (`<nav>`, `<main>`, `<footer>`)
2. ✅ Adicionar `aria-label` em botões sem texto
3. ✅ Garantir contraste de cores (WCAG AA)
4. ✅ Suportar navegação por teclado
5. ✅ Testar com screen readers

### SEO

1. ✅ Meta tags únicas por página (react-helmet-async)
2. ✅ Títulos descritivos
3. ✅ Meta descriptions relevantes
4. ✅ Estrutura de headings correta (h1 → h2 → h3)
5. ✅ Alt text em todas as imagens

### Manutenibilidade

1. ✅ Componentes pequenos e focados
2. ✅ Separação de responsabilidades
3. ✅ Barrel exports para imports limpos
4. ✅ TypeScript strict mode
5. ✅ Testes para lógica crítica
6. ✅ Documentação atualizada

---

## 🔮 Roadmap de Melhorias

Melhorias planejadas para o projeto:

1. **Arquitetura**: Componentização atômica, barrel exports completos
2. **Performance**: Code splitting, otimização de imagens, resource hints
3. **SEO**: Meta tags dinâmicas, página 404 customizada
4. **Qualidade**: Testes automatizados, git hooks, conventional commits
5. **UI/UX**: Error boundaries, loading states, animações acessíveis
6. **Infraestrutura**: Integração com CMS, analytics

---

## 📞 Suporte

Para dúvidas ou sugestões sobre a arquitetura do projeto:

1. Consulte esta documentação
2. Consulte o [Design System](./DESIGN_SYSTEM.md) para padrões visuais
3. Revise o código existente para exemplos
4. Abra uma issue no repositório

---

**Última atualização**: 2025-11-25
**Versão**: 1.2.0
**Mantido por**: Equipe Harpia
