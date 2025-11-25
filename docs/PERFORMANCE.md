# Recomendações de Performance

Guia objetivo para melhorar desempenho no desktop e mobile.

## Legenda de Segurança

| Ícone | Significado                                             |
| ----- | ------------------------------------------------------- |
| 🟢    | **SEGURO** - Não afeta funcionalidade, pode implementar |
| 🟡    | **CUIDADO** - Requer teste antes de deploy              |
| 🔴    | **RISCO** - Pode quebrar funcionalidade, requer revisão |
| ✅    | **IMPLEMENTADO**                                        |

---

## Prioridade Alta

### 1. Fontes - Reduzir Variantes ✅ IMPLEMENTADO

**Problema**: 21 arquivos de fonte carregados (7 Dosis + 14 Silk Serif).

**Solução**:

```css
/* Manter apenas as variantes usadas */
/* Dosis: 300, 400, 500, 600, 700 (removidos 200, 800) */
/* Silk Serif: 700, 900 (removidos 200, 300, 400, 500, 600 + todos italics) */
```

**Resultado final**: 7 arquivos (5 Dosis + 2 Silk Serif) vs 21 originais.

**Impacto**: -500KB+ no carregamento inicial.

**Status**: Implementado em 2025-11-25.

---

### 2. Fontes - Converter para WOFF2 ✅ IMPLEMENTADO

**Problema**: Fontes em OTF (maior tamanho).

**Solução**:

```bash
# Converter todas as fontes para WOFF2
# Usar: https://cloudconvert.com/otf-to-woff2
```

**Atualizar index.css**:

```css
@font-face {
  font-family: 'Dosis';
  src: url('/fonts/dosis/Dosis-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Impacto**: -40% tamanho das fontes.

**Risco**: Nenhum - WOFF2 tem suporte universal em browsers modernos.

**Status**: Implementado em 2025-11-25 (Dosis e Silk Serif).

---

### 3. Imagens - Formatos Modernos ✅ IMPLEMENTADO

**Problema**: Imagens em JPG/JPEG/PNG (maior tamanho).

**Solução**: Converter imagens para WebP e atualizar referências diretas no código.

**Arquivos atualizados**:

- `CTASection.tsx`: `/3.jpeg` → `/3.webp`
- `Showreel.tsx`: `/5.jpg` → `/5.webp`
- `ClientLogos.tsx`: `/clients/*.png` → `/clients/*.webp`

**Impacto**: -30% a -50% no tamanho das imagens.

**Status**: Implementado em 2025-11-25.

---

### 4. Imagens - Srcset Responsivo 🔴

**Solução**:

```tsx
<img
  src={src}
  srcSet={`${src}?w=400 400w, ${src}?w=800 800w, ${src}?w=1200 1200w`}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  loading="lazy"
  decoding="async"
/>
```

**Impacto**: Mobile carrega imagens menores.

**Risco**: Alto - Requer servidor de imagens com suporte a query params (?w=) ou CDN como Cloudinary/Imgix. Não funciona com imagens estáticas locais.

---

### 5. Animação Noise - Otimizar ✅ IMPLEMENTADO

**Problema**: Animação `noise` roda a 0.2s infinitamente (5 FPS).

**Solução** - Pausar quando não visível:

```css
/* src/index.css */
.animate-noise {
  animation: noise 0.2s steps(10) infinite;
  animation-play-state: running;
}

.animate-noise.paused {
  animation-play-state: paused;
}
```

```tsx
// src/App.tsx
useEffect(() => {
  const handleVisibilityChange = () => {
    if (noiseRef.current) {
      if (document.hidden) {
        noiseRef.current.classList.add('paused');
      } else {
        noiseRef.current.classList.remove('paused');
      }
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

**Impacto**: -CPU quando tab inativa.

**Status**: Implementado em 2025-11-25.

---

## Prioridade Média

### 6. Vite Build - Otimizações ✅ IMPLEMENTADO

**Atualizar vite.config.ts**:

```ts
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
```

**Impacto**: Chunks separados, melhor cache.

**Risco**: Nenhum - Apenas otimiza o build, não altera comportamento.

**Status**: Implementado em 2025-11-25.

---

### 7. Preload de Rotas Críticas ✅ IMPLEMENTADO

**Atualizar index.html** - Remover prefetch ineficaz:

```html
<!-- REMOVER - prefetch de rotas não funciona assim -->
<!-- <link rel="prefetch" href="/servicos" /> -->
<!-- <link rel="prefetch" href="/portfolio" /> -->
<!-- <link rel="prefetch" href="/contato" /> -->
```

**Impacto**: Remove requests desnecessários.

**Risco**: Nenhum - Apenas remove tags que não funcionam corretamente.

**Status**: Implementado em 2025-11-25.

---

### 8. Reveal Component - Observer Único 🟡

**Problema**: Cada `<Reveal>` cria um IntersectionObserver.

**Solução** - Observer único:

```tsx
// hooks/useRevealObserver.ts
const observerMap = new Map<Element, (visible: boolean) => void>();
let observer: IntersectionObserver | null = null;

export function useReveal(callback: (visible: boolean) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const cb = observerMap.get(entry.target);
            if (cb && entry.isIntersecting) {
              cb(true);
              observer?.unobserve(entry.target);
              observerMap.delete(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
    }

    if (ref.current) {
      observerMap.set(ref.current, callback);
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer?.unobserve(ref.current);
        observerMap.delete(ref.current);
      }
    };
  }, []);

  return ref;
}
```

**Impacto**: 1 observer em vez de N.

**Risco**: Médio - Requer refatorar o componente Reveal. Testar todas as animações on-scroll.

---

### 9. Lazy Load de Ícones 🟢

**Problema**: `lucide-react` carrega todos os ícones.

**Solução** - Import específico:

```tsx
// ❌ Evitar
import { ArrowRight, ArrowUp, Menu } from 'lucide-react';

// ✅ Preferir
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ArrowUp from 'lucide-react/dist/esm/icons/arrow-up';
```

**Impacto**: -100KB+ no bundle.

**Risco**: Nenhum - Mesma funcionalidade, apenas muda o import. Tree-shaking já funciona com lucide-react v0.300+, verificar se necessário.

---

### 10. CSS Critical Path ✅ IMPLEMENTADO

**Adicionar inline CSS crítico no index.html**:

```html
<style>
  body {
    background: #191919;
    color: #f5f5f7;
    margin: 0;
  }
  #root {
    min-height: 100vh;
  }
</style>
```

**Impacto**: Evita flash de conteúdo sem estilo.

**Risco**: Nenhum - Apenas adiciona estilos que já existem no CSS.

**Status**: Implementado em 2025-11-25.

---

## Prioridade Baixa

### 11. Service Worker para Cache 🟡

```ts
// public/sw.js
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('harpia-v1').then((cache) => cache.addAll(['/fonts/', '/Harpia-01.svg']))
  );
});
```

**Risco**: Médio - Requer registro do SW e estratégia de invalidação de cache.

---

### 12. Compressão Brotli 🟢

Configurar no servidor de produção:

```nginx
brotli on;
brotli_types text/html text/css application/javascript;
```

**Risco**: Nenhum - Configuração de servidor, não afeta código.

---

### 13. Headers de Cache 🟢

```nginx
# Fontes e imagens: 1 ano
location ~* \.(woff2|webp|avif|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# JS/CSS com hash: 1 ano
location ~* \.[a-f0-9]{8}\.(js|css)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**Risco**: Nenhum - Configuração de servidor, não afeta código.

---

## Checklist de Implementação

| Tarefa                         | Impacto | Esforço | Segurança | Status |
| ------------------------------ | ------- | ------- | --------- | ------ |
| Converter fontes para WOFF2    | Alto    | Baixo   | 🟢        | ✅     |
| Reduzir variantes de fonte     | Alto    | Baixo   | 🟡        | ✅     |
| Adicionar WebP nas imagens     | Alto    | Médio   | 🟡        | ✅     |
| Otimizar vite.config.ts        | Médio   | Baixo   | 🟢        | ✅     |
| Remover prefetch ineficaz      | Baixo   | Baixo   | 🟢        | ✅     |
| Observer único para Reveal     | Médio   | Médio   | 🟡        | ⬚      |
| Pausar noise em tab inativa    | Médio   | Baixo   | 🟢        | ✅     |
| Import específico lucide-react | Médio   | Baixo   | 🟢        | ⬚      |
| Srcset responsivo              | Médio   | Médio   | 🔴        | ⬚      |
| CSS crítico inline             | Baixo   | Baixo   | 🟢        | ✅     |
| Service Worker                 | Baixo   | Médio   | 🟡        | ⬚      |
| Compressão Brotli              | Médio   | Baixo   | 🟢        | ⬚      |
| Headers de Cache               | Médio   | Baixo   | 🟢        | ⬚      |

---

## Ordem Recomendada de Implementação

### Fase 1 - Implementar Imediatamente (🟢 Seguros)

1. CSS crítico inline no index.html
2. Remover prefetch ineficaz do index.html
3. Otimizar vite.config.ts (chunks)
4. Converter fontes para WOFF2

### Fase 2 - Implementar com Teste (🟡 Cuidado)

5. Reduzir variantes de fonte (verificar uso)
6. Adicionar WebP (criar versões das imagens)
7. Observer único para Reveal (testar animações)

### Fase 3 - Servidor/Infraestrutura (🟢 Seguros)

8. Compressão Brotli
9. Headers de Cache

### Não Recomendado Agora (🔴 Risco)

- Srcset responsivo (requer CDN de imagens)

---

## Métricas Alvo

| Métrica | Atual (estimado) | Alvo    |
| ------- | ---------------- | ------- |
| LCP     | 2.5s+            | < 1.5s  |
| FID     | 100ms            | < 50ms  |
| CLS     | 0.1              | < 0.05  |
| TTI     | 3s+              | < 2s    |
| Bundle  | ~500KB           | < 300KB |

---

## Ferramentas de Teste

```bash
# Lighthouse local
npx lighthouse http://localhost:5020 --view

# Bundle analyzer
npx vite-bundle-visualizer
```

**URLs para testar**:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Bundlephobia](https://bundlephobia.com/) (tamanho de deps)

---

**Última atualização**: 2025-11-25 (WebP implementado)
