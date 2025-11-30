# Recomendações de Melhoria - Harpia Agência

> Documento gerado em 30/11/2025 após análise completa do projeto.

---

## Sumário

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Melhorias Críticas (Alta Prioridade)](#2-melhorias-críticas-alta-prioridade)
3. [Melhorias Importantes (Média Prioridade)](#3-melhorias-importantes-média-prioridade)
4. [Melhorias Recomendadas (Baixa Prioridade)](#4-melhorias-recomendadas-baixa-prioridade)
5. [Problemas Identificados](#5-problemas-identificados)
6. [Checklist de Ação](#6-checklist-de-ação)

---

## 1. Visão Geral do Projeto

### Stack Atual

| Tecnologia   | Versão | Status |
| ------------ | ------ | ------ |
| React        | 19.2.0 | Atual  |
| Vite         | 6.2.0  | Atual  |
| Tailwind CSS | 4.1.17 | Atual  |
| TypeScript   | 5.8.2  | Atual  |
| React Router | 7.9.6  | Atual  |
| Zod          | 4.1.13 | Atual  |
| Vitest       | 4.0.13 | Atual  |

### Pontos Fortes

- Stack moderna e atualizada
- Estrutura de pastas organizada
- SEO bem implementado (meta tags, schema.org, sitemap)
- Documentação excelente (CLAUDE.md, docs/)
- Performance otimizada (lazy loading, code splitting)
- Acessibilidade considerada (skip link, ARIA labels)
- Hooks customizados bem estruturados

### Pontos de Atenção

- Cobertura de testes baixa (~15%)
- Faltam imagens OG em `public/og/`
- TypeScript strict mode parcial
- Componentes duplicados (ErrorBoundary em 2 locais)

---

## 2. Melhorias Críticas (Alta Prioridade)

### 2.1 Imagens Open Graph Faltando

**Problema**: O SEO config referencia imagens OG que não existem em `public/og/`.

**Arquivos faltando**:

```
public/og/
├── home.jpg         (faltando)
├── servicos.jpg     (faltando)
├── portfolio.jpg    (faltando)
├── sobre.jpg        (faltando)
├── contato.jpg      (faltando)
├── privacidade.jpg  (faltando)
├── termos.jpg       (faltando)
```

**Ação**: Criar imagens 1200x630px para cada página.

---

### 2.2 TypeScript Strict Mode Incompleto

**Problema**: `tsconfig.json` não possui `strict: true`.

**Configuração atual**:

```json
{
  "compilerOptions": {
    "target": "ES2022"
    // ... sem strict mode
  }
}
```

**Recomendação**: Adicionar ao `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

### 2.3 Cobertura de Testes Insuficiente

**Problema**: Apenas 5 arquivos de teste (~15% de cobertura).

**Testes existentes**:

- `SectionHeader.test.tsx`
- `useMetaTags.test.ts`
- `useAnalytics.test.ts`
- `useStructuredData.test.ts`
- `contact.test.ts`

**Componentes sem teste**:

- Navbar
- Footer
- Hero
- ContactForm
- OptimizedImage
- LazyVideo
- Reveal
- Todas as páginas

**Recomendação**: Aumentar cobertura para 70%+ priorizando:

1. Componentes interativos (Navbar, ContactForm)
2. Componentes de mídia (OptimizedImage, LazyVideo)
3. Páginas principais (Home, Services, Portfolio)

---

### 2.4 Componente ErrorBoundary Duplicado

**Problema**: Existe em dois locais:

- `src/components/ErrorBoundary.tsx`
- `src/components/ui/ErrorBoundary.tsx`

**Ação**: Remover duplicata e manter apenas em `ui/`.

---

## 3. Melhorias Importantes (Média Prioridade)

### 3.1 Adicionar Arquivo `og-image.jpg` Padrão

**Problema**: `COMPANY_INFO.defaultOgImage` referencia `/og-image.jpg` que não existe.

**Ação**: Criar `public/og-image.jpg` (1200x630px) como fallback.

---

### 3.2 Otimização de Vídeos

**Problema**: Vídeos em MP4 sem versão WebM otimizada.

**Arquivos atuais**:

- `public/video-hero.mp4`
- `public/video.mp4`

**Recomendação**:

1. Criar versões WebM (30-50% menor)
2. Usar `<source>` múltiplas no componente LazyVideo

```tsx
<video>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
</video>
```

---

### 3.3 Preload de Fontes no HTML

**Problema**: Fontes carregam via CSS, podendo atrasar LCP.

**Recomendação**: Adicionar em `index.html`:

```html
<link
  rel="preload"
  href="/fonts/dosis/Dosis-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/silk-serif/Silk Serif Bold.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

---

### 3.4 Adicionar Script de Teste de Cobertura

**Problema**: Não há script para verificar cobertura de testes.

**Ação**: Adicionar ao `package.json`:

```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

### 3.5 Configurar Vitest Coverage

**Problema**: Não há configuração de coverage no `vitest.config.ts`.

**Recomendação**: Atualizar configuração:

```ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*'],
      thresholds: {
        global: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70,
        },
      },
    },
  },
});
```

---

### 3.6 Redes Sociais Vazias

**Problema**: `SOCIAL_LINKS` tem apenas Instagram preenchido.

```ts
SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/harpia.agencia',
  facebook: '', // vazio
  linkedin: '', // vazio
  youtube: '', // vazio
  tiktok: '', // vazio
  twitter: '', // vazio
  behance: '', // vazio
};
```

**Ação**: Preencher ou remover campos não utilizados.

---

### 3.7 Versão do Projeto em 0.0.0

**Problema**: `package.json` tem `"version": "0.0.0"`.

**Ação**: Atualizar para versão semântica adequada (ex: `1.0.0`).

---

## 4. Melhorias Recomendadas (Baixa Prioridade)

### 4.1 Adicionar Service Worker (PWA)

**Benefício**: Cache offline, instalação como app.

**Implementação**:

```bash
npm install -D vite-plugin-pwa
```

```ts
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

plugins: [
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Harpia Agência',
      short_name: 'Harpia',
      theme_color: '#191919',
      background_color: '#191919',
    },
  }),
];
```

---

### 4.2 Monitoramento de Erros (Sentry)

**Benefício**: Captura erros em produção.

**Implementação básica**:

```bash
npm install @sentry/react
```

```ts
// src/index.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE,
});
```

---

### 4.3 Rate Limiting no Formulário

**Problema**: Formulário de contato sem proteção contra spam.

**Recomendação**: Implementar:

- Honeypot field
- Rate limiting client-side
- Captcha (opcional)

```tsx
// Honeypot simples
<input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
```

---

### 4.4 Compressão Brotli no Build

**Benefício**: 20-30% menor que gzip.

**Implementação**:

```bash
npm install -D vite-plugin-compression
```

```ts
// vite.config.ts
import compression from 'vite-plugin-compression';

plugins: [compression({ algorithm: 'brotliCompress' })];
```

---

### 4.5 Prefetch de Rotas Críticas

**Benefício**: Carregamento mais rápido de páginas frequentes.

**Implementação**:

```tsx
// Em links para páginas frequentes
<Link to="/servicos" prefetch="intent">
  Serviços
</Link>
```

Ou usar `react-router-dom` com loader/prefetch nativo.

---

### 4.6 Bundle Analyzer no Build

**Problema**: Já tem `rollup-plugin-visualizer` mas sem script dedicado.

**Ação**: Adicionar ao `package.json`:

```json
{
  "scripts": {
    "build:analyze": "vite build --config vite.config.analyze.ts"
  }
}
```

---

### 4.7 Cache Headers Recomendados

**Arquivo**: `.htaccess` ou configuração do servidor.

```apache
# Assets estáticos (1 ano)
<FilesMatch "\.(js|css|woff2|webp|jpg|png|svg)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# HTML (sem cache)
<FilesMatch "\.html$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
```

---

### 4.8 Lazy Loading de Componentes Pesados

**Componentes candidatos**:

- `Stats.tsx` (se tiver animações complexas)
- `Testimonials.tsx` (carrossel)
- `PortfolioPreview.tsx` (grid de imagens)

```tsx
const Stats = lazy(() => import('./components/Stats'));
```

---

## 5. Problemas Identificados

### 5.1 Inconsistências na Documentação

| Arquivo                | Problema                               |
| ---------------------- | -------------------------------------- |
| `README.md`            | Verificar se estrutura está atualizada |
| `docs/ARCHITECTURE.md` | Conferir se rotas estão sincronizadas  |

**Ação**: Executar auditoria com `/audit-docs`.

---

### 5.2 Nomenclatura de Arquivos de Imagem

**Problema**: Imagens em `public/clients/` com nomes genéricos.

```
1 (1).webp, 1 (2).webp, ...
```

**Recomendação**: Renomear para nomes descritivos:

```
cliente-empresa-a.webp
cliente-empresa-b.webp
```

---

### 5.3 Imports Index Barrel Exports

**Potencial problema**: Barrel exports podem aumentar bundle em alguns casos.

**Arquivos afetados**:

- `src/components/index.ts`
- `src/pages/index.ts`
- `src/hooks/index.ts`

**Verificação**: Analisar bundle com visualizer para confirmar tree-shaking.

---

### 5.4 Target `esnext` no Build

**Problema**: `vite.config.ts` usa `target: 'esnext'`, pode não funcionar em browsers antigos.

**Recomendação**: Usar target mais específico:

```ts
build: {
  target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'];
}
```

---

## 6. Checklist de Ação

### Imediato (Esta Semana)

- [ ] Criar pasta `public/og/` com imagens OG
- [ ] Criar `public/og-image.jpg` padrão
- [ ] Remover `src/components/ErrorBoundary.tsx` duplicado
- [ ] Ativar strict mode no TypeScript
- [ ] Atualizar versão no `package.json` para `1.0.0`

### Curto Prazo (2 Semanas)

- [ ] Adicionar scripts de coverage no `package.json`
- [ ] Configurar Vitest coverage
- [ ] Escrever testes para Navbar e Footer
- [ ] Escrever testes para ContactForm
- [ ] Adicionar preload de fontes no HTML

### Médio Prazo (1 Mês)

- [ ] Criar versões WebM dos vídeos
- [ ] Implementar honeypot no formulário
- [ ] Aumentar cobertura de testes para 50%
- [ ] Preencher ou remover redes sociais vazias
- [ ] Configurar compressão Brotli

### Longo Prazo (Backlog)

- [ ] Implementar PWA (Service Worker)
- [ ] Integrar Sentry para monitoramento
- [ ] Atingir 70% de cobertura de testes
- [ ] Implementar prefetch de rotas
- [ ] Renomear imagens de clientes

---

## Resumo de Impacto

| Categoria      | Itens                    | Impacto |
| -------------- | ------------------------ | ------- |
| SEO            | Imagens OG               | Alto    |
| Qualidade      | TypeScript strict        | Alto    |
| Confiabilidade | Testes                   | Alto    |
| Performance    | WebM, Brotli             | Médio   |
| UX             | PWA                      | Médio   |
| Manutenção     | Duplicatas, Nomenclatura | Baixo   |

---

## Notas Finais

O projeto está em excelente estado geral. A stack é moderna, a documentação é exemplar e as práticas de desenvolvimento são sólidas. As recomendações acima visam elevar ainda mais a qualidade, especialmente em:

1. **SEO**: Garantir que todas as páginas tenham meta imagens
2. **Qualidade**: Aumentar cobertura de testes
3. **Performance**: Otimizar assets de mídia
4. **Monitoramento**: Implementar tracking de erros em produção

Priorize os itens da seção "Imediato" para maior impacto com menor esforço.
