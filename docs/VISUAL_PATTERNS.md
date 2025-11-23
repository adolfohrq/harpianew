# Visual Patterns Guide - Harpia

Este documento descreve os padrões visuais implementados no projeto Harpia. Use-o como referência ao criar novos componentes ou modificar existentes.

**Consulte também:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) para cores, tipografia e efeitos base.

---

## 1. Paleta de Cores

### Backgrounds

```
bg-harpia-black    #050505  (Fundo principal - muito escuro)
bg-harpia-carbon   #121212  (Cartões, seções, contrastes suaves)
bg-harpia-gray     #2a2a2a  (Bordas, divisores, desabilitados)
```

### Textos

```
text-harpia-white  #f5f5f7  (Texto primário - off-white confortável)
text-harpia-accent #ffffff  (Destaque, hover states - branco puro)
```

### Usar em Novos Componentes

✅ **Sempre** use as CSS variables definidas em `src/index.css`

```css
.my-component {
  background-color: var(--color-harpia-black);
  color: var(--color-harpia-white);
}
```

❌ **Nunca** use cores arbitrárias sem aprovação

```css
/* Evitar: */
bg-[#123456]  /* ❌ Quebra consistência visual */
```

---

## 2. Tipografia

### Headlines (Silk Serif)

```jsx
<h1 className="font-serif text-5xl font-bold text-harpia-white">Título Principal</h1>
```

- **Uso**: Seções principais, frases de impacto
- **Peso**: bold (700) ou normal (400) para elegância
- **Tamanho**: 2xl até 5xl dependendo da hierarquia

### Subtítulos

```jsx
<h2 className="font-serif text-3xl text-harpia-white">Subtítulo</h2>
```

- **Peso**: 600 ou 700
- **Tamanho**: 2xl a 3xl

### Corpo (Dosis)

```jsx
<p className="font-sans text-base text-harpia-white leading-relaxed">
  Parágrafo de corpo texto com informações importantes.
</p>
```

- **Uso**: Parágrafos, descrições, botões
- **Tamanho**: sm (14px) a lg (18px)
- **Line height**: leading-relaxed ou leading-normal

### Labels & Metadata

```jsx
<span className="font-sans text-sm text-harpia-gray">Metadados ou label pequeno</span>
```

- **Tamanho**: xs (12px) a sm (14px)
- **Cor**: text-harpia-gray para informações secundárias

---

## 3. Espaciamento

Harpia segue uma escala de espaciamento Tailwind (4px base):

```
p-4   = 16px (padding interno padrão para componentes)
p-6   = 24px (spacious, seções)
p-8   = 32px (muito spacioso, hero sections)

m-4   = 16px (margem entre elementos)
gap-4 = 16px (gap em grids/flexes)
gap-6 = 24px (gap maior para estruturas)
```

**Padrão Visual:**

```jsx
<div className="px-6 py-8 bg-harpia-carbon rounded-lg">
  {/* Componente com espaciamento consistente */}
</div>
```

---

## 4. Bordas & Cantos

### Rounded Corners

```
rounded-sm   = 2px   (bordas sutis)
rounded      = 4px   (padrão - usar para componentes)
rounded-lg   = 8px   (mais prominent)
rounded-2xl  = 16px  (Cards grandes, destaque)
```

**Exemplo:**

```jsx
<div className="rounded-lg border border-harpia-gray bg-harpia-carbon p-4">
  Componente com borda sutil
</div>
```

### Bordas

```
border         = 1px (#2a2a2a default)
border-harpia-gray  = Padrão para divisores sutis
```

❌ **Evitar bordas muito pesadas** - Harpia usa bordas sutis para elegância

---

## 5. Sombras & Profundidade

Harpia usa **sombras muito sutis** (ou nenhuma) para manter a estética flat/minimalist.

```jsx
/* Raro, apenas para destaque especial */
<div className="shadow-lg rounded-lg bg-harpia-carbon p-4">Componente com sombra discreta</div>
```

**Padrão Harpia**: Prefer bordas e backgrounds para profundidade ao invés de sombras.

---

## 6. Botões

### Botão Primário

```jsx
<button className="px-6 py-3 bg-harpia-white text-harpia-black font-sans font-semibold rounded-lg hover:bg-harpia-accent transition-colors">
  Call to Action
</button>
```

- Background: white
- Text: black
- Hover: branco puro (#ffffff)
- Transition: smooth color change

### Botão Secundário

```jsx
<button className="px-6 py-3 border border-harpia-gray text-harpia-white font-sans rounded-lg hover:bg-harpia-gray hover:border-harpia-gray transition-colors">
  Ação Secundária
</button>
```

- Background: transparent
- Border: harpia-gray
- Text: harpia-white
- Hover: bg-harpia-gray

### Botão Tertiary (Links/Subtle)

```jsx
<button className="text-harpia-white underline hover:text-harpia-accent transition-colors">
  Link ou Ação Leve
</button>
```

- Sem background
- Underline
- Hover: muda para accent

---

## 7. Cards & Containers

### Card Padrão

```jsx
<div className="bg-harpia-carbon border border-harpia-gray rounded-lg p-6">
  <h3 className="font-serif text-xl text-harpia-white mb-4">Título do Card</h3>
  <p className="font-sans text-base text-harpia-white">Conteúdo do card...</p>
</div>
```

### Seção com Fundo Diferenciado

```jsx
<section className="bg-harpia-black py-16 px-6">
  <div className="max-w-6xl mx-auto">{/* Conteúdo */}</div>
</section>
```

---

## 8. Grid & Layout

### Container Principal

```jsx
<div className="max-w-6xl mx-auto px-6">{/* Conteúdo com margem lateral e máxima largura */}</div>
```

### Grid de Itens (Cards)

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards responsivos */}
</div>
```

**Padrão Mobile-First:**

- `grid-cols-1` (mobile)
- `md:grid-cols-2` (tablet)
- `lg:grid-cols-3` (desktop)

---

## 9. Animações & Transições

### Fade In

```jsx
<div className="opacity-0 animate-fadeIn">Conteúdo que aparece suavemente</div>
```

### Hover Effects

```jsx
<button className="transition-colors hover:bg-harpia-accent">Botão com transição suave</button>
```

### Marquee (Scroll Infinito)

```jsx
<div className="animate-marquee">Conteúdo que scroll infinitamente</div>
```

Customizar duração em `src/index.css` se necessário.

---

## 10. Imagens & Media

### Imagens Otimizadas

**Sempre use** `<OptimizedImage />` para imagens raster:

```jsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/images/hero.jpg"
  alt="Descrição da imagem"
  loading="lazy"
  className="w-full h-auto rounded-lg"
/>;
```

**Benefícios:**

- Lazy loading automático
- Fallback em caso de erro
- Transições suaves
- Responsive images

### Background Images

```jsx
<div
  className="w-full h-screen bg-cover bg-center"
  style={{
    backgroundImage: 'url(/path/to/image.jpg)',
  }}
>
  {/* Conteúdo */}
</div>
```

---

## 11. Responsividade

**Mobile-First Approach:**

```jsx
<div className="flex flex-col md:flex-row gap-4 px-4 md:px-6">
  {/* Base: coluna em mobile, linha em md+ */}
</div>
```

### Breakpoints Tailwind

```
sm: 640px
md: 768px  (tablet)
lg: 1024px (desktop)
xl: 1280px
2xl: 1536px
```

**Padrão Harpia:**

- Mobile: `px-4` ou `px-6`
- Desktop: `px-6` a `px-8`

---

## 12. Acessibilidade Visual

### Contraste

- ✅ text-harpia-white sobre bg-harpia-black = excelente contraste
- ✅ text-harpia-gray sobre bg-harpia-carbon = contraste suficiente
- ❌ Cores muito similares = péssima acessibilidade

### Focus States

```jsx
<button className="focus:outline-none focus:ring-2 focus:ring-harpia-accent">
  Botão acessível
</button>
```

### Hover & Active States

- Sempre forneça feedback visual claro
- Use transições suaves (não instantâneo)

---

## 13. Textura & Grain Overlay

Harpia usa uma textura de ruído sutil (5% opacidade) sobre todo o fundo:

```css
/* Já aplicado em src/App.tsx */
background-image: var(--background-image-noise);
opacity: 0.05;
```

Esta textura:

- Dá aspecto premium/analógico
- Reduz a frieza do design flat
- Mantém legibilidade

**Não modificar sem aprovação.**

---

## 14. Exemplos de Componentes Comuns

### Seção Hero

```jsx
<section className="relative w-full h-screen bg-harpia-black flex items-center justify-center overflow-hidden">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h1 className="font-serif text-6xl font-bold text-harpia-white mb-6">Título Impactante</h1>
    <p className="font-sans text-lg text-harpia-white mb-8">Descrição subjetiva...</p>
    <button className="px-8 py-4 bg-harpia-white text-harpia-black font-semibold rounded-lg hover:bg-harpia-accent transition-colors">
      CTA
    </button>
  </div>
</section>
```

### Seção de Conteúdo

```jsx
<section className="bg-harpia-carbon py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="font-serif text-4xl text-harpia-white mb-12 text-center">Título da Seção</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* Cards */}</div>
  </div>
</section>
```

### Card de Serviço

```jsx
<div className="bg-harpia-black border border-harpia-gray rounded-lg p-8 hover:border-harpia-white transition-colors">
  <h3 className="font-serif text-2xl text-harpia-white mb-4">Nome do Serviço</h3>
  <p className="font-sans text-base text-harpia-white leading-relaxed">Descrição do serviço...</p>
</div>
```

---

## 15. Checklist para Novos Componentes

- [ ] Usar cores de `src/index.css` (não arbitrárias)
- [ ] Tipografia: Serif para títulos, Sans para corpo
- [ ] Espaciamento consistente (múltiplos de 4px)
- [ ] Bordas sutis se necessário
- [ ] Mobile-first responsive (base → md → lg)
- [ ] Hover/focus states definidos
- [ ] Imagens com `<OptimizedImage />`
- [ ] Contrast ratio adequado para acessibilidade
- [ ] Sem sombras pesadas (prefer bordas/backgrounds)
- [ ] Animações suaves se houver (transition-colors, etc)

---

## Recursos

- [Design System Harpia](./DESIGN_SYSTEM.md)
- [Conventions](./CONVENTIONS.md)
- [Architecture](./ARCHITECTURE.md)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
