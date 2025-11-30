# CLAUDE.md

Guia rápido para Claude Code. Para detalhes, consulte os links no final.

## Idioma

**Sempre responda em português brasileiro (pt-BR).**

## Projeto

**Harpia** - Landing page de agência de marketing. React 19 + TypeScript + Vite 6 + Tailwind v4.

## Comandos

```bash
npm run dev      # Servidor em localhost:5020
npm run build    # Build produção
npm test         # Testes (Vitest)
npm run lint     # ESLint
npm run format   # Prettier
```

## Estrutura

```
src/
├── components/       # Seções e componentes
│   ├── ui/          # Reutilizáveis (HeroSection, SectionHeader, ErrorBoundary, etc.)
│   ├── services/    # Componentes de Serviços
│   └── contact/     # Componentes de Contato
├── pages/           # Páginas (lazy-loaded)
├── data/            # Dados estáticos
├── hooks/           # useMetaTags, useStructuredData, useAnalytics, useWordPressProjects
├── config/          # seo.config.ts, api.config.ts
├── lib/             # Utilitários (validations/)
├── services/        # Serviços externos (wordpress.ts)
└── types.ts         # Interfaces TypeScript
```

## Regras Críticas

### Visual (ver `docs/DESIGN_SYSTEM.md` para detalhes)

- **Cores**: `bg-harpia-black`, `bg-harpia-carbon`, `bg-harpia-gray`, `text-harpia-white` - NUNCA usar cores arbitrárias
- **Tipografia**: `font-serif` (Silk Serif) para títulos, `font-sans` (Dosis) para corpo

### Componentes

- **Named exports** sempre: `export const Component`
- **Props tipadas**: usar `interface`, nunca `any`
- **Imagens**: `<OptimizedImage />` com `loading="lazy"`
- **Vídeos**: `<LazyVideo />` ou `preload="metadata"` + `poster`
- **Animações on-scroll**: `<Reveal />`
- **Hero de páginas internas**: `<HeroSection />`
- **Tratamento de erros**: `<ErrorBoundary />` de `@/components/ui`

### Imports

```tsx
import { Component } from '@/components';
import { HeroSection, ErrorBoundary } from '@/components/ui';
```

### SEO em Páginas (obrigatório)

```tsx
import { useMetaTags } from '@/hooks/useMetaTags';
import { useStructuredData, HARPIA_ORGANIZATION, createPageSchema } from '@/hooks/useStructuredData';
import { PAGE_SEO, getKeywords, getCanonicalUrl } from '@/config/seo.config';

useMetaTags({
  title: PAGE_SEO.nomePagina.title,
  description: PAGE_SEO.nomePagina.description,
  keywords: getKeywords(PAGE_SEO.nomePagina.keywords),
  ogImage: PAGE_SEO.nomePagina.ogImage,
  canonical: getCanonicalUrl('/rota'),
});

useStructuredData([HARPIA_ORGANIZATION, createPageSchema(...)]);
```

## Comandos Customizados

| Comando                 | Descrição                                         |
| ----------------------- | ------------------------------------------------- |
| `/build`                | Build de produção + verificação de sitemap/robots |
| `/preview`              | Build + servidor de preview                       |
| `/deploy`               | Build + deploy via FTP para Hostinger             |
| `/check`                | Verificação completa (lint + testes + build)      |
| `/test {modo}`          | Executa testes (watch, coverage, específico)      |
| `/commit {msg}`         | Cria commit seguindo conventional commits         |
| `/new-page {nome}`      | Cria nova página com template SEO completo        |
| `/new-component {nome}` | Cria componente seguindo padrões                  |
| `/audit-docs`           | Auditoria completa de documentação                |

## Checklist: Nova Página

1. Criar `src/pages/NomePagina.tsx`
2. Exportar em `src/pages/index.ts`
3. Adicionar rota em `App.tsx`
4. Adicionar em `PAGE_SEO` e `SITEMAP_CONFIG.staticRoutes` em `seo.config.ts`
5. Usar `useMetaTags` + `useStructuredData`
6. Criar imagem OG em `public/og/` (1200x630px)

## Checklist: Atualização de Docs

Após mudanças significativas, atualizar:

| Mudança            | Atualizar                               |
| ------------------ | --------------------------------------- |
| Novo componente UI | `docs/DESIGN_SYSTEM.md`                 |
| Nova página/rota   | `docs/ARCHITECTURE.md`, `seo.config.ts` |
| Novo hook          | `docs/ARCHITECTURE.md`                  |
| Mudança estrutural | Este arquivo + `README.md`              |

## Notas Técnicas

- BrowserRouter (URLs limpas)
- Husky + lint-staged no pre-commit
- Conventional commits obrigatórios
- Playwright MCP disponível para testes de UI

## Documentação Completa

| Documento                                              | Conteúdo                                     |
| ------------------------------------------------------ | -------------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)           | Estrutura, rotas, padrões de código, hooks   |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)         | Cores, tipografia, componentes UI, animações |
| [guide/HOSTINGER_DEPLOY.md](guide/HOSTINGER_DEPLOY.md) | Deploy na Hostinger                          |
| [guide/PLAYWRIGHT_GUIDE.md](guide/PLAYWRIGHT_GUIDE.md) | Testes de UI                                 |
