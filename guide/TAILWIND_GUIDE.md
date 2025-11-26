# Guia Prático de Tailwind CSS

Guia de referência rápida para o projeto Harpia.

---

## Tipografia

### Tamanhos de Fonte

| Classe      | Tamanho | Uso comum                |
| ----------- | ------- | ------------------------ |
| `text-xs`   | 12px    | Labels, badges, captions |
| `text-sm`   | 14px    | Texto auxiliar, notas    |
| `text-base` | 16px    | Corpo de texto padrão    |
| `text-lg`   | 18px    | Texto destacado          |
| `text-xl`   | 20px    | Subtítulos pequenos      |
| `text-2xl`  | 24px    | Títulos de cards         |
| `text-3xl`  | 30px    | Títulos de seção         |
| `text-4xl`  | 36px    | Headlines                |
| `text-5xl`  | 48px    | Headlines grandes        |
| `text-6xl`  | 60px    | Display text             |
| `text-7xl`  | 72px    | Hero headlines           |
| `text-8xl`  | 96px    | Display extra grande     |
| `text-9xl`  | 128px   | Display máximo           |

**Responsivo:**

```html
<h1 class="text-4xl md:text-6xl lg:text-7xl">Título</h1>
<!-- Mobile: 36px → Tablet: 60px → Desktop: 72px -->
```

### Pesos de Fonte

| Classe            | Peso | Descrição     |
| ----------------- | ---- | ------------- |
| `font-extralight` | 200  | Extra leve    |
| `font-light`      | 300  | Leve          |
| `font-normal`     | 400  | Normal        |
| `font-medium`     | 500  | Médio         |
| `font-semibold`   | 600  | Semi-negrito  |
| `font-bold`       | 700  | Negrito       |
| `font-extrabold`  | 800  | Extra negrito |
| `font-black`      | 900  | Black         |

**Exemplo:**

```html
<h1 class="font-serif font-black">Título Black</h1>
<p class="font-sans font-light">Texto leve</p>
```

### Famílias de Fonte (Harpia)

| Classe       | Fonte      | Uso                    |
| ------------ | ---------- | ---------------------- |
| `font-serif` | Silk Serif | Títulos, headlines     |
| `font-sans`  | Dosis      | Corpo, botões, UI      |
| `font-mono`  | Monospace  | Código, dados técnicos |

---

## Cores (Harpia)

### Backgrounds

| Classe             | Cor       | Uso                    |
| ------------------ | --------- | ---------------------- |
| `bg-harpia-black`  | `#191919` | Fundo principal escuro |
| `bg-harpia-carbon` | `#121212` | Fundo mais escuro      |
| `bg-harpia-gray`   | `#2a2a2a` | Cards, seções          |
| `bg-harpia-white`  | `#f5f5f7` | Fundo claro            |
| `bg-harpia-accent` | `#ffffff` | Destaques              |

### Texto

| Classe               | Cor       | Uso                   |
| -------------------- | --------- | --------------------- |
| `text-harpia-white`  | `#f5f5f7` | Texto em fundo escuro |
| `text-harpia-accent` | `#ffffff` | Texto destaque        |
| `text-harpia-black`  | `#191919` | Texto em fundo claro  |

### Opacidade

```html
<p class="text-white/50">50% de opacidade</p>
<p class="text-white/80">80% de opacidade</p>
<div class="bg-black/20">Fundo com 20% opacidade</div>
```

---

## Espaçamento

### Sistema de Escala

| Valor | Pixels | Uso comum            |
| ----- | ------ | -------------------- |
| `0`   | 0px    | Sem espaço           |
| `1`   | 4px    | Micro espaço         |
| `2`   | 8px    | Espaço pequeno       |
| `3`   | 12px   | Espaço pequeno-médio |
| `4`   | 16px   | Espaço padrão        |
| `5`   | 20px   | Espaço médio         |
| `6`   | 24px   | Espaço médio-grande  |
| `8`   | 32px   | Espaço grande        |
| `10`  | 40px   | Espaço extra grande  |
| `12`  | 48px   | Espaço muito grande  |
| `16`  | 64px   | Espaço enorme        |
| `20`  | 80px   | Espaço máximo        |
| `24`  | 96px   | Seções               |

### Margin

```html
<div class="m-4">Margin em todos os lados (16px)</div>
<div class="mx-4">Margin horizontal (left + right)</div>
<div class="my-4">Margin vertical (top + bottom)</div>
<div class="mt-4">Margin top</div>
<div class="mb-4">Margin bottom</div>
<div class="ml-4">Margin left</div>
<div class="mr-4">Margin right</div>
```

### Padding

```html
<div class="p-4">Padding em todos os lados</div>
<div class="px-6">Padding horizontal</div>
<div class="py-3">Padding vertical</div>
<div class="pt-8">Padding top</div>
<div class="pb-8">Padding bottom</div>
```

### Gap (Flexbox/Grid)

```html
<div class="flex gap-4">Espaço entre items (16px)</div>
<div class="flex gap-x-4 gap-y-2">Gap horizontal e vertical diferentes</div>
```

---

## Layout

### Flexbox

```html
<!-- Centralizar horizontal e vertical -->
<div class="flex items-center justify-center">
  <!-- Espaçar items -->
  <div class="flex justify-between">
    <!-- Coluna em mobile, linha em desktop -->
    <div class="flex flex-col md:flex-row">
      <!-- Alinhar items -->
      <div class="flex items-start">
        <!-- Topo -->
        <div class="flex items-center">
          <!-- Centro -->
          <div class="flex items-end">
            <!-- Base -->
            <div class="flex items-baseline"><!-- Linha de base do texto --></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Grid

```html
<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid com colunas específicas -->
  <div class="grid grid-cols-12">
    <div class="col-span-8">Conteúdo principal</div>
    <div class="col-span-4">Sidebar</div>
  </div>
</div>
```

### Container e Max Width

```html
<div class="max-w-xl mx-auto">Máximo 576px, centralizado</div>
<div class="max-w-2xl mx-auto">Máximo 672px</div>
<div class="max-w-4xl mx-auto">Máximo 896px</div>
<div class="max-w-5xl mx-auto">Máximo 1024px</div>
<div class="max-w-6xl mx-auto">Máximo 1152px</div>
<div class="max-w-7xl mx-auto">Máximo 1280px</div>
```

---

## Responsividade

### Breakpoints

| Prefixo | Largura mínima | Dispositivo         |
| ------- | -------------- | ------------------- |
| (nada)  | 0px            | Mobile (padrão)     |
| `sm:`   | 640px          | Mobile grande       |
| `md:`   | 768px          | Tablet              |
| `lg:`   | 1024px         | Desktop             |
| `xl:`   | 1280px         | Desktop grande      |
| `2xl:`  | 1536px         | Telas muito grandes |

### Mobile First

Tailwind usa abordagem **mobile first**. Sem prefixo = mobile, com prefixo = a partir daquele tamanho.

```html
<!-- Mobile: 1 coluna, Tablet: 2 colunas, Desktop: 3 colunas -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Mobile: texto pequeno, Desktop: texto grande -->
  <h1 class="text-2xl md:text-4xl lg:text-6xl">
    <!-- Mobile: padding pequeno, Desktop: padding grande -->
    <section class="py-12 md:py-20 lg:py-32">
      <!-- Esconder em mobile, mostrar em desktop -->
      <div class="hidden lg:block">
        <!-- Mostrar em mobile, esconder em desktop -->
        <div class="block lg:hidden"></div>
      </div>
    </section>
  </h1>
</div>
```

---

## Efeitos Visuais

### Bordas

```html
<div class="border">Borda 1px solid</div>
<div class="border-2">Borda 2px</div>
<div class="border border-white/20">Borda com opacidade</div>
<div class="border-t">Apenas borda top</div>
<div class="border-b border-white/10">Borda bottom sutil</div>

<!-- Border radius -->
<div class="rounded">Pequeno (4px)</div>
<div class="rounded-lg">Grande (8px)</div>
<div class="rounded-xl">Extra grande (12px)</div>
<div class="rounded-2xl">2XL (16px)</div>
<div class="rounded-full">Círculo/pílula</div>
```

### Sombras

```html
<div class="shadow">Sombra padrão</div>
<div class="shadow-lg">Sombra grande</div>
<div class="shadow-xl">Sombra extra grande</div>
<div class="shadow-2xl">Sombra máxima</div>

<!-- Sombra colorida -->
<div class="shadow-lg shadow-white/10">Sombra branca sutil</div>
```

### Opacidade

```html
<div class="opacity-50">50% opacidade</div>
<div class="opacity-75">75% opacidade</div>
<div class="opacity-100">100% opacidade</div>
```

### Blur e Backdrop

```html
<div class="blur-sm">Blur pequeno</div>
<div class="backdrop-blur-sm">Blur no fundo (glassmorphism)</div>
<div class="backdrop-blur-md bg-white/10">Efeito vidro</div>
```

---

## Transições e Animações

### Transições

```html
<!-- Transição básica -->
<button class="transition">
  <!-- Transição específica -->
  <button class="transition-colors">Apenas cores</button>
  <button class="transition-transform">Apenas transform</button>
  <button class="transition-all">Tudo</button>

  <!-- Duração -->
  <button class="transition duration-300">300ms</button>
  <button class="transition duration-500">500ms</button>

  <!-- Exemplo completo -->
  <button class="bg-white hover:bg-gray-100 transition-colors duration-300"></button>
</button>
```

### Hover e Estados

```html
<button class="hover:bg-white">Hover</button>
<button class="focus:ring-2">Focus</button>
<button class="active:scale-95">Active</button>
<button class="disabled:opacity-50">Disabled</button>

<!-- Grupos -->
<div class="group">
  <span class="group-hover:translate-x-1">Move no hover do pai</span>
</div>
```

### Transform

```html
<div class="hover:scale-105">Aumenta 5%</div>
<div class="hover:-translate-y-1">Sobe 4px</div>
<div class="hover:translate-x-1">Move para direita</div>
<div class="hover:rotate-3">Rotaciona 3 graus</div>
```

---

## Posicionamento

### Position

```html
<div class="relative">Posição relativa (base para absolute)</div>
<div class="absolute top-0 left-0">Canto superior esquerdo</div>
<div class="absolute bottom-4 right-4">4 unidades do canto inferior direito</div>
<div class="fixed bottom-8 right-8">Fixo na tela</div>
<div class="sticky top-0">Gruda no topo ao scrollar</div>
```

### Inset

```html
<div class="absolute inset-0">Ocupa todo o espaço do pai</div>
<div class="absolute inset-x-0">Horizontal total</div>
<div class="absolute inset-y-0">Vertical total</div>
```

### Z-Index

```html
<div class="z-0">Nível 0</div>
<div class="z-10">Nível 10</div>
<div class="z-20">Nível 20</div>
<div class="z-50">Nível 50 (modais, overlays)</div>
<div class="z-9999">Nível máximo (grain overlay)</div>
```

---

## Padrões Comuns no Harpia

### Botão Primário

```html
<button
  class="px-6 py-3 bg-white text-harpia-black font-medium text-xs uppercase tracking-[0.15em] hover:bg-harpia-white hover:shadow-xl hover:shadow-white/10 transition-all duration-300"
>
  Texto do Botão
</button>
```

### Botão Secundário

```html
<button
  class="px-6 py-3 border border-white/20 text-white/70 font-medium text-xs uppercase tracking-[0.15em] hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300"
>
  Texto do Botão
</button>
```

### Card Escuro

```html
<div
  class="p-8 bg-harpia-gray/50 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
>
  <h3 class="font-serif text-2xl mb-4">Título</h3>
  <p class="font-sans text-white/70">Descrição</p>
</div>
```

### Seção com Padding Responsivo

```html
<section class="py-16 md:py-24 lg:py-32 px-6">
  <div class="max-w-6xl mx-auto">
    <!-- Conteúdo -->
  </div>
</section>
```

### Título de Seção

```html
<div class="text-center mb-16">
  <span class="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 block"> Label </span>
  <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Título da Seção</h2>
  <p class="font-sans text-lg text-white/70 max-w-2xl mx-auto">Descrição da seção</p>
</div>
```

### Gradiente de Sobreposição

```html
<!-- Escurecer de baixo para cima -->
<div class="absolute inset-0 bg-linear-to-t from-harpia-black to-transparent">
  <!-- Escurecer dos lados -->
  <div
    class="absolute inset-0 bg-linear-to-r from-harpia-black/60 via-transparent to-harpia-black/60"
  ></div>
</div>
```

---

## Dicas Rápidas

### Centralizar Absolutamente

```html
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
```

### Texto Truncado

```html
<p class="truncate">Texto que corta com...</p>
<p class="line-clamp-2">Limita a 2 linhas</p>
<p class="line-clamp-3">Limita a 3 linhas</p>
```

### Aspect Ratio

```html
<div class="aspect-video">16:9</div>
<div class="aspect-square">1:1</div>
<div class="aspect-4/3">4:3 customizado</div>
```

### Esconder Overflow

```html
<div class="overflow-hidden">Esconde conteúdo que passa</div>
<div class="overflow-auto">Scroll quando necessário</div>
<div class="overflow-x-auto">Scroll horizontal</div>
```

### Pointer Events

```html
<div class="pointer-events-none">Não recebe cliques (overlay decorativo)</div>
<div class="pointer-events-auto">Recebe cliques normalmente</div>
```

---

## Recursos

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Design System do Harpia](./DESIGN_SYSTEM.md)
