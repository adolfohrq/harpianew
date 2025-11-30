# Design System Harpia

## Cores (Definidas em `src/index.css`)

### Tema Híbrido

O design do Harpia utiliza uma abordagem híbrida, alternando entre seções escuras (Dark Mode) para impacto e imersão, e seções claras (Light Mode) para legibilidade e respiro visual.

### Dark Mode (Dominante)

Utilizado na Hero, Footer e seções de manifesto.

- **Harpia Black** (`--color-harpia-black` / `#191919`): Cor de fundo principal. Quase preto, profundo.
- **Harpia Carbon** (`--color-harpia-carbon` / `#121212`): Usado para cartões, seções secundárias e contrastes suaves.
- **Harpia Gray** (`--color-harpia-gray` / `#2a2a2a`): Bordas sutis, divisores e textos desabilitados.

### Light Mode (Contraste)

Utilizado em seções de conteúdo denso como "Por que Harpia" e "Serviços".

- **White** (`#ffffff`): Fundo limpo para seções de leitura.
- **Gray 50/100**: Backgrounds sutis para cards em fundo claro.
- **Textos Escuros**: Utiliza `text-harpia-black` ou `text-gray-600` para contraste em fundos claros.

### Texto & Acentos

- **Harpia White** (`--color-harpia-white` / `#f5f5f7`): Cor primária de texto. Um branco levemente "off-white" para conforto visual.
- **Harpia Accent** (`--color-harpia-accent` / `#ffffff`): Branco puro para destaques e hover states.

---

## Tipografia

### Escala Tipográfica Global

Os estilos base são definidos em `src/index.css` usando `@layer base`. Classes adicionais nos componentes sobrescrevem quando necessário.

| Elemento     | Fonte      | Peso           | Tamanho (Mobile → Desktop)                        |
| ------------ | ---------- | -------------- | ------------------------------------------------- |
| `h1`         | Silk Serif | Black (900)    | `text-4xl` → `text-5xl` → `text-6xl` → `text-7xl` |
| `h2`         | Silk Serif | Bold (700)     | `text-3xl` → `text-4xl` → `text-5xl`              |
| `h3`         | Silk Serif | SemiBold (600) | `text-2xl` → `text-3xl`                           |
| `h4`         | Silk Serif | Normal (400)   | `text-xl` → `text-2xl`                            |
| `h5`         | Dosis      | SemiBold (600) | `text-lg` → `text-xl`                             |
| `h6`         | Dosis      | Medium (500)   | `text-base` → `text-lg`                           |
| `p`          | Dosis      | Normal (400)   | `text-base`                                       |
| `blockquote` | Silk Serif | Italic         | `text-2xl` → `text-3xl` → `text-4xl`              |

### Configuração CSS

```css
/* src/index.css */
@layer base {
  h1 {
    @apply font-serif font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight;
  }

  h2 {
    @apply font-serif font-bold text-3xl md:text-4xl lg:text-5xl leading-tight;
  }

  h3 {
    @apply font-serif font-semibold text-2xl md:text-3xl leading-tight;
  }

  h4 {
    @apply font-serif text-xl md:text-2xl leading-tight;
  }

  h5 {
    @apply font-sans font-semibold text-lg md:text-xl;
  }

  h6 {
    @apply font-sans font-medium text-base md:text-lg;
  }

  p {
    @apply font-sans text-base leading-relaxed;
  }

  blockquote {
    @apply font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed italic;
  }
}
```

### Sobrescrevendo Estilos Base

Os estilos em `@layer base` têm baixa especificidade. Classes Tailwind aplicadas diretamente sempre têm prioridade:

```tsx
{
  /* Usa estilo base h2 */
}
<h2>Título da Seção</h2>;

{
  /* Sobrescreve com tamanho maior */
}
<h2 className="text-5xl md:text-7xl">Título Hero</h2>;

{
  /* Sobrescreve cor para fundo claro */
}
<h2 className="text-harpia-black">Título em Seção Branca</h2>;
```

### Famílias de Fonte

| Classe       | Fonte      | Uso                             |
| ------------ | ---------- | ------------------------------- |
| `font-serif` | Silk Serif | Títulos, headlines, blockquotes |
| `font-sans`  | Dosis      | Corpo, botões, UI               |

### Pesos Disponíveis

**Silk Serif (font-serif)**:

- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)
- `font-black` (900)

**Dosis (font-sans)**:

- `font-extralight` (200)
- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)
- `font-extrabold` (800)

### Padrões Tipográficos

- **Tracking (letter-spacing)**:
  - Ultra-wide: `tracking-[0.4em]` - Labels pequenos
  - Wide: `tracking-[0.2em]` - Textos uppercase
  - Widest: `tracking-widest` - Botões e CTAs

- **Leading (line-height)**:
  - Tight: `leading-tight` - Títulos grandes
  - Relaxed: `leading-relaxed` - Parágrafos longos

---

## Sistema de Layout

### Containers

O projeto usa um componente `<Container />` reutilizável para consistência de layout:

```tsx
import { Container } from '@/components/ui';

// Uso básico (div com max-w-7xl mx-auto px-6 relative z-10)
<Container>
  <h1>Conteúdo</h1>
</Container>

// Com elemento semântico diferente
<Container as="section" className="py-20">
  <h2>Seção</h2>
</Container>

// Com classes adicionais
<Container className="bg-white py-32">
  <p>Conteúdo com fundo branco</p>
</Container>
```

**Props do Container:**

- `children`: Conteúdo do container
- `as`: Elemento HTML (`'div'` | `'section'` | `'article'` | `'main'` | `'header'` | `'footer'`) - default: `'div'`
- `className`: Classes adicionais

**Variantes de largura** (aplicar via className):

```css
.max-w-7xl  /* Padrão - seções principais */
.max-w-5xl  /* Conteúdo narrativo */
.max-w-4xl  /* CTAs e quotes */
.max-w-2xl  /* Descrições curtas */
```

### Spacing Vertical

- **Seções**: `py-32` (8rem) - Padrão para todas as seções principais
- **Seções Compactas**: `py-24` ou `py-20` - Variantes menores
- **Subsections**: `mb-20`, `mb-12` - Espaçamento interno

### Grid System

```css
/* Padrão Mobile-First */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

/* Variações Comuns */
grid-cols-2 md:grid-cols-3 lg:grid-cols-5  /* Logos */
grid-cols-1 md:grid-cols-2                  /* Portfolio */
grid-cols-2 md:grid-cols-4                  /* Stats */

/* Gaps */
gap-6 md:gap-8   /* Padrão */
gap-8 md:gap-10  /* Logos */
gap-12 md:gap-8  /* Timeline */
```

### Aspect Ratios

```css
aspect-video        /* 16:9 - Vídeos */
aspect-9/16         /* 9:16 - Cards mobile */
aspect-3/4          /* 3:4 - Cards desktop */
aspect-16/10        /* 16:10 - Portfolio */
```

---

## Componentes UI Reutilizáveis

### `<Reveal>`

**Propósito**: Animação de entrada on-scroll com IntersectionObserver.

**Props**:

- `children`: Conteúdo a animar
- `width`: `'fit-content'` ou `'100%'` (default)
- `delay`: Atraso em ms (0, 100, 200, 300, 400...)

**Comportamento**:

- Detecta quando elemento entra no viewport (threshold: 0.15)
- Anima de `opacity-0 translate-y-12` → `opacity-100 translate-y-0`
- Duração: 1000ms com `ease-out`
- Disconnects observer após trigger (performance)

**Uso**:

```tsx
<Reveal delay={200}>
  <h2>Título</h2>
</Reveal>
```

### `<OptimizedImage>`

**Propósito**: Wrapper de imagens com lazy loading e fallbacks.

**Features**:

- Lazy loading nativo
- Fade-in transition ao carregar
- Fallback para erros
- Aspect ratio preservation

**Uso**:

```tsx
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Descrição"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

### `<LazyVideo>`

**Propósito**: Wrapper para vídeos com lazy loading otimizado.

**Localização**: `src/components/ui/LazyVideo.tsx`

**Props**:

- `src`: URL do vídeo (obrigatório)
- `poster`: URL da imagem de poster (opcional)
- `className`: Classes adicionais (opcional)
- `autoPlay`: Iniciar automaticamente (default: `true`)
- `loop`: Loop infinito (default: `true`)
- `muted`: Silenciado (default: `true`)

**Uso**:

```tsx
import { LazyVideo } from '@/components/ui';

<LazyVideo src="/video.mp4" poster="/video-poster.webp" className="w-full h-full object-cover" />;
```

### `<GradientLine>`

**Propósito**: Linha decorativa com gradiente, usada para separadores e labels de seção.

**Localização**: `src/components/ui/GradientLine.tsx`

**Props**:

- `direction`: `'left'` | `'right'` (default: `'right'`)
- `variant`: `'light'` | `'dark'` | `'subtle'` (default: `'light'`)
- `size`: `'sm'` | `'md'` | `'lg'` | `'xl'` (default: `'md'`)
- `className`: Classes adicionais (opcional)

**Variantes**:

| Variant  | Cor        | Uso                  |
| -------- | ---------- | -------------------- |
| `light`  | `white/30` | Fundos escuros       |
| `dark`   | `black/20` | Fundos claros        |
| `subtle` | `black/10` | Detalhes muito sutis |

**Tamanhos**:

| Size | Largura |
| ---- | ------- |
| `sm` | `w-8`   |
| `md` | `w-12`  |
| `lg` | `w-16`  |
| `xl` | `w-24`  |

**Uso comum (par de linhas)**:

```tsx
import { GradientLine } from '@/components/ui';

// Padrão mais comum - labels de seção
<div className="flex items-center justify-center gap-4">
  <GradientLine direction="right" />
  <span className="text-xs uppercase tracking-[0.3em]">Label</span>
  <GradientLine direction="left" />
</div>

// Em fundo claro
<div className="flex items-center gap-4">
  <GradientLine direction="right" variant="dark" size="lg" />
  <span>Título</span>
  <GradientLine direction="left" variant="dark" size="lg" />
</div>
```

### `<Skeleton>` / `<PageSkeleton>` / `<CardSkeleton>`

**Propósito**: Componentes de loading placeholder para melhorar a percepção de velocidade.

**Localização**: `src/components/ui/Skeleton.tsx`

**Componentes disponíveis**:

| Componente                | Descrição                                        |
| ------------------------- | ------------------------------------------------ |
| `<Skeleton>`              | Elemento básico de skeleton                      |
| `<PageSkeleton>`          | Skeleton para página inteira (usado no Suspense) |
| `<CardSkeleton>`          | Skeleton para cards individuais                  |
| `<PortfolioSkeleton>`     | Skeleton para grid de portfolio                  |
| `<ProjectDetailSkeleton>` | Skeleton para detalhe de projeto                 |

**Props do Skeleton**:

- `variant`: `'text'` | `'circular'` | `'rectangular'` (default: `'rectangular'`)
- `width`: string ou number (opcional)
- `height`: string ou number (opcional)
- `animation`: `'pulse'` | `'wave'` | `'none'` (default: `'pulse'`)
- `className`: Classes adicionais (opcional)

**Props do PageSkeleton**:

- `variant`: `'default'` | `'portfolio'` | `'services'` (default: `'default'`)

**Uso**:

```tsx
import { Skeleton, PageSkeleton, CardSkeleton, PortfolioSkeleton, ProjectDetailSkeleton } from '@/components/ui';

// Skeleton básico
<Skeleton variant="text" width="60%" height={24} />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton className="w-full aspect-video" />

// Skeleton de página (usado no App.tsx)
<Suspense fallback={<PageSkeleton />}>
  <Routes>...</Routes>
</Suspense>

// Skeleton de card
<CardSkeleton className="w-full" />

// Skeleton para portfolio
<PortfolioSkeleton />

// Skeleton para detalhe de projeto
<ProjectDetailSkeleton />
```

---

### `<SectionHeader>`

**Propósito**: Header padronizado para seções.

**Props**:

- `label`: Tag superior (opcional)
- `title`: Título principal (aceita JSX)
- `description`: Texto descritivo (aceita JSX ou string)
- `align`: `'left'` | `'center'`
- `link`: Objeto com `to`, `text`, `ariaLabel` (opcional)
- `titleSize`: `'small'` | `'default'`
- `descriptionSize`: `'default'` | custom
- `descriptionMaxWidth`: `'2xl'` | `'3xl'` | etc
- `className`: Classes adicionais

**Uso**:

```tsx
<SectionHeader
  label="Serviços"
  title="NOSSOS SERVIÇOS"
  description="Texto descritivo..."
  align="center"
  link={{ to: '/servicos', text: 'Ver Detalhes' }}
/>
```

### `<DifferentialCard>`

**Propósito**: Card de diferenciais com ícone.

**Props**:

- `icon`: Elemento React (ícone Lucide)
- `title`: Título do diferencial
- `description`: Descrição
- `index`: Número do card (para animação)

### `<TestimonialCard>`

**Propósito**: Card de depoimento para carrossel.

**Props**:

- `text`: Texto do depoimento
- `author`: Nome do autor
- `company`: Empresa
- `isActive`: Boolean para controlar visibilidade

### `<ErrorBoundary>` / `<PortfolioErrorFallback>`

**Propósito**: Captura erros de seções sem quebrar a página inteira.

**Localização**: `src/components/ui/ErrorBoundary.tsx`

**Componentes disponíveis**:

| Componente                 | Descrição                                   |
| -------------------------- | ------------------------------------------- |
| `<ErrorBoundary>`          | Boundary genérico para qualquer seção       |
| `<PortfolioErrorFallback>` | Fallback específico para erros no portfolio |

**Props do ErrorBoundary**:

- `children`: Componentes filhos
- `sectionName`: Nome da seção para log
- `fallback`: Componente de fallback customizado (opcional)

**Uso**:

```tsx
import { ErrorBoundary, PortfolioErrorFallback } from '@/components/ui';

// Uso básico
<ErrorBoundary sectionName="estatísticas">
  <Stats />
</ErrorBoundary>

// Com fallback customizado para portfolio
<ErrorBoundary sectionName="portfolio" fallback={<PortfolioErrorFallback />}>
  <Portfolio />
</ErrorBoundary>
```

### Social Icons (`<InstagramIcon>`, `<WhatsAppIcon>`)

**Propósito**: Ícones SVG customizados para redes sociais.

**Localização**: `src/components/ui/icons/SocialIcons.tsx`

**Componentes disponíveis**:

- `<InstagramIcon />` - Ícone do Instagram
- `<WhatsAppIcon />` - Ícone do WhatsApp

**Props**:

- `size`: Tamanho do ícone em pixels (default: `24`)
- `className`: Classes adicionais (opcional)

**Uso**:

```tsx
import { InstagramIcon, WhatsAppIcon } from '@/components/ui';

<InstagramIcon size={32} className="text-white hover:text-gray-300" />
<WhatsAppIcon size={24} />
```

### `<HeroSection>`

**Propósito**: Hero section minimalista e centralizada para páginas internas (Serviços, Pacotes, Sobre, Contato).

**Props**:

- `subtitle?: string` - Label superior (ex: "SERVIÇOS")
- `title: React.ReactNode` - Título principal (aceita JSX para quebras de linha e spans)
- `description?: string` - Descrição principal
- `className?: string` - Classes adicionais
- `breadcrumb?: BreadcrumbItem[]` - Navegação breadcrumb para SEO
- `cta?: CTAButton[]` - Botões de call-to-action

**Interfaces**:

```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}
```

**Características**:

- Altura fixa: `h-[55vh]` com flexbox centering
- Background: `bg-harpia-black` com elementos decorativos (gradient orbs, grid pattern)
- Borda inferior arredondada: `rounded-b-4xl`
- Animações de entrada com `<Reveal>`

**Uso Básico**:

```tsx
<HeroSection
  subtitle="SERVIÇOS"
  title={
    <>
      SERVIÇOS QUE <br />
      <span className="italic text-white/40">ELEVAM SUA MARCA</span>
    </>
  }
  description="Descrição da página..."
/>
```

**Com Breadcrumb e CTA**:

```tsx
<HeroSection
  breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Serviços' }]}
  subtitle="SERVIÇOS"
  title="Título da Página"
  cta={[
    { label: 'Ver Pacotes', href: '/pacotes', variant: 'primary' },
    { label: 'Contato', href: '/contato', variant: 'secondary' },
  ]}
/>
```

---

## Efeitos & Animações

### Noise Texture

- Textura de ruído SVG (`--background-image-noise`)
- Opacidade: 5%
- Animação: `@keyframes noise` (0.2s steps, infinite)
- Classe: `.animate-noise`

### Marquee (Letreiro Infinito)

- `.animate-marquee`: Move da direita para a esquerda (40s linear)
- `.animate-marquee-reverse`: Move da esquerda para a direita
- **Comportamento**: Pausa ao hover do parent `.group`
- **Otimização**: `will-change-transform`, `transform-gpu`

### Shimmer

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

**Uso**: Efeito de brilho que passa horizontalmente sobre elementos.

### Reveal Animation

- **Pattern**: `opacity-0 translate-y-12` → `opacity-100 translate-y-0`
- **Duration**: 1000ms
- **Easing**: `ease-out`
- **Delays**: Escalonados (0, 100, 200, 300ms) para efeito cascata

---

## Padrões de Interação

### Hover States

#### 1. **Image Scale**

```css
/* Padrão para imagens */
transition-transform duration-700 ease-out
group-hover:scale-110
```

#### 2. **Grayscale to Color**

```css
grayscale group-hover:grayscale-0
opacity-80 group-hover:opacity-100
```

#### 3. **Shine Effect**

```css
/* Overlay diagonal gradient */
bg-linear-to-br from-white/0 via-white/10 to-white/0
opacity-0 group-hover:opacity-100
transition-opacity duration-500
```

#### 4. **Border Glow**

```css
/* Inset shadow que aparece no hover */
group-hover: shadow-[inset_0_0_60px_rgba(255, 255, 255, 0.1)];
```

#### 5. **Translate Animations**

```css
/* Setas e ícones */
group-hover:translate-x-1
group-hover:-translate-y-1
transition-transform duration-300
```

#### 6. **Opacity Dimming**

```css
/* Em grids, reduz opacidade dos outros itens */
group-hover/timeline:opacity-40
hover:!opacity-100
```

#### 7. **Scale & Rotate**

```css
/* Badges e botões */
group-hover:scale-110
group-hover:-rotate-12
transition-all duration-500
```

### Transições & Durações

| Duração  | Uso                                    | Easing     |
| -------- | -------------------------------------- | ---------- |
| `300ms`  | Hover states rápidos (botões, links)   | `ease`     |
| `500ms`  | Transições médias (overlays, borders)  | `ease-out` |
| `700ms`  | Animações complexas (scale de imagens) | `ease-out` |
| `1000ms` | Reveal animations                      | `ease-out` |

### Focus States

**Padrão Acessível**:

```css
focus:outline-none
focus:ring-2
focus:ring-harpia-black
focus:ring-offset-2
```

**Para fundos escuros**:

```css
focus:ring-harpia-accent
focus:ring-offset-harpia-black
```

---

## Efeitos Decorativos

### Blurred Circles

**Padrão**:

```css
w-[500px] h-[500px]
bg-harpia-gray/5
rounded-full
blur-[120px]
absolute
pointer-events-none
```

**Variantes**:

- Dark mode: `bg-white/5`, `bg-white/10`
- Light mode: `bg-gray-100`, `bg-gray-50`
- Tamanhos: 400px, 500px, 600px
- Animação: `animate-pulse` com duração variável (8s, 10s)

### Grid Patterns

**Dark mode**:

```css
background-image: radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)
background-size: 40px 40px
opacity: [0.015]
```

**Light mode**:

```css
background-image: radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)
background-size: 40px 40px
opacity: [0.02]
```

### Diagonal Lines

```css
w-64 h-px
bg-linear-to-r from-black/5 to-transparent
absolute
```

### Gradient Overlays

**Para imagens/vídeos**:

```css
/* Vignette bottom-up */
bg-linear-to-t from-black via-black/40 to-transparent

/* Vignette top-down */
bg-linear-to-b from-harpia-black/60 via-transparent to-harpia-black
```

---

## Sistema de Bordas

### Dark Mode

```css
border-white/5   /* Divisores sutis */
border-white/10  /* Bordas padrão */
border-white/20  /* Bordas médias */
border-white/30  /* Bordas ativas */
border-white/40  /* Bordas hover */
```

### Light Mode

```css
border-black/5   /* Divisores sutis */
border-black/10  /* Bordas padrão */
border-black/20  /* Bordas médias */
border-gray-200  /* Bordas de cards */
```

### Border Radius

```css
rounded-sm       /* Padrão do projeto (não usar rounded-lg) */
rounded-full     /* Badges, avatares, botões circulares */
rounded-lg       /* Apenas para modais */
```

---

## Sistema de z-index

| Layer       | z-index   | Uso                         |
| ----------- | --------- | --------------------------- |
| Background  | `z-0`     | Footer fixo, backgrounds    |
| Content     | `z-10`    | Conteúdo principal, seções  |
| Overlays    | `z-20`    | Badges, números, decorações |
| UI Elements | `z-50`    | Botões de fechar, controles |
| Modals      | `z-[100]` | Modais fullscreen           |

---

## Performance & Otimizações

### IntersectionObserver

**Uso**: Animações on-scroll e lazy loading.

**Pattern**:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Trigger animation
        observer.disconnect(); // Cleanup
      }
    },
    { threshold: 0.15 }
  );

  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);
```

### GPU Acceleration

```css
will-change-transform    /* Avisa browser para otimizar */
transform-gpu           /* Força GPU rendering */
```

**Aplicar em**:

- Marquees infinitos
- Parallax effects
- Animações de scale

### Lazy Loading

**Imagens**:

```tsx
<img loading="lazy" decoding="async" />
```

**Vídeos**:

```tsx
<video preload="metadata" poster="..." />
```

### React Optimizations

**Memoização**:

```tsx
// Componentes pesados
const MarqueeItem = React.memo(({ text }) => ...);

// Cálculos custosos
const titleParts = useMemo(() => {
  return service.title.split(' ');
}, [service.title]);
```

**Callbacks**:

```tsx
const handleNext = useCallback(() => {
  setCurrentIndex((prev) => (prev + 1) % items.length);
}, []);
```

---

## Acessibilidade

### ARIA Labels

**Padrão para links**:

```tsx
<Link to="/servicos" aria-label="Explorar serviços da Harpia">
  Ver Serviços
</Link>
```

**Carrosséis**:

```tsx
<div role="tablist" aria-label="Testimonials carousel">
  <button role="tab" aria-selected={isActive} aria-label="Go to testimonial 1" />
</div>
```

### Navegação por Teclado

- **ESC**: Fecha modais
- **Tab**: Navegação entre elementos interativos
- **Enter/Space**: Ativa botões e links

### Semântica HTML

- Use `<section>` para seções principais
- Use `<article>` para conteúdo independente
- Use headings hierárquicos (`h1` → `h2` → `h3`)
- Use `<footer>` para rodapés

---

## Customizações do Browser

### Scrollbar

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

### Text Selection

```css
::selection {
  background-color: #191919;
  color: #ffffff;
}
```

---

## Exemplos de Componentes Comuns

> **Nota**: Para padrões de código, nomenclatura e estrutura de pastas, consulte [ARCHITECTURE.md](./ARCHITECTURE.md).

### Seção Hero (Dark)

```tsx
<section className="relative w-full h-screen bg-harpia-black flex items-center justify-center overflow-hidden">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h1 className="font-serif text-6xl font-bold text-harpia-white mb-6">Título Impactante</h1>
    <p className="font-sans text-lg text-harpia-white mb-8">Descrição subjetiva...</p>
    <button className="px-8 py-4 bg-harpia-white text-harpia-black font-semibold rounded-sm hover:bg-harpia-accent transition-colors">
      CTA
    </button>
  </div>
</section>
```

### Seção Informativa (Light)

```tsx
<section className="bg-white py-24 px-6 relative">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <span className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">
        Label
      </span>
      <h2 className="font-serif text-5xl text-harpia-black mb-6">Título Escuro</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-8 bg-gray-50 border border-gray-100 hover:border-gray-300 transition-all">
        <h3 className="font-serif text-2xl text-harpia-black mb-4">Item</h3>
        <p className="font-sans text-gray-600">Descrição em cinza escuro.</p>
      </div>
    </div>
  </div>
</section>
```

### Card de Serviço (Visual)

```tsx
<div className="group relative aspect-3/4 overflow-hidden bg-gray-100">
  <OptimizedImage
    src={image}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
  <div className="absolute bottom-0 p-8 text-white">
    <h3 className="font-serif text-2xl">Título</h3>
  </div>
</div>
```

### Botões

#### Primário

```tsx
<button className="px-6 py-3 bg-harpia-white text-harpia-black font-sans font-semibold rounded-sm hover:bg-harpia-accent transition-colors">
  Call to Action
</button>
```

#### Secundário

```tsx
<button className="px-6 py-3 border border-harpia-gray text-harpia-white font-sans rounded-sm hover:bg-harpia-gray transition-colors">
  Ação Secundária
</button>
```

#### Terciário (Link)

```tsx
<button className="text-harpia-white underline hover:text-harpia-accent transition-colors">
  Link ou Ação Leve
</button>
```

### Vídeo de Fundo (Hero)

```tsx
<div className="absolute inset-0 z-0">
  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
    <source src="/video.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/60" />
</div>
```

---

## Responsividade

### Breakpoints Tailwind

```
sm: 640px
md: 768px  (tablet)
lg: 1024px (desktop)
xl: 1280px
2xl: 1536px
```

### Padrão Mobile-First

```tsx
<div className="flex flex-col md:flex-row gap-4 px-4 md:px-6">
  {/* Base: coluna em mobile, linha em md+ */}
</div>
```

### Padding Responsivo

- Mobile: `px-4` ou `px-6`
- Desktop: `px-6` a `px-8`

---

## Checklist de Implementação

Ao criar novos componentes, garantir:

- [ ] Usar `<Reveal>` para animações on-scroll
- [ ] Adicionar `loading="lazy"` em imagens below-the-fold
- [ ] Implementar hover states consistentes (scale, opacity, grayscale)
- [ ] Adicionar `aria-label` em elementos interativos
- [ ] Usar `focus:ring-2` para acessibilidade de teclado
- [ ] Aplicar spacing vertical padrão (`py-32`)
- [ ] Usar grid responsivo mobile-first
- [ ] Adicionar `ErrorBoundary` em seções críticas
- [ ] Memoizar componentes/cálculos pesados
- [ ] Usar `rounded-sm` (não `rounded-lg`)
- [ ] Aplicar `will-change-transform` em animações
- [ ] Testar em mobile e desktop
