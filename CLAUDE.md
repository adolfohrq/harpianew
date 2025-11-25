# CLAUDE.md

Guia rápido para Claude Code. Para detalhes, consulte `docs/`.

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
│   ├── ui/          # Componentes reutilizáveis
│   ├── services/    # Componentes de Serviços
│   └── contact/     # Componentes de Contato
├── pages/           # Páginas (lazy-loaded)
├── data/            # Dados estáticos
├── hooks/           # Custom hooks
├── types.ts         # Interfaces TypeScript
└── index.css        # Tailwind + animações
```

## Regras Críticas

### Cores (NUNCA usar cores arbitrárias)

```
bg-harpia-black   #191919
bg-harpia-carbon  #121212
bg-harpia-gray    #2a2a2a
text-harpia-white #f5f5f7
text-harpia-accent #ffffff
```

### Tipografia

- `font-serif` = Silk Serif (títulos)
- `font-sans` = Dosis (corpo)

### Componentes

- **Named exports** sempre: `export const Component`
- **Props tipadas**: usar `interface`, nunca `any`
- **Imagens**: usar `<OptimizedImage />`
- **Animações on-scroll**: usar `<Reveal />`

### Imports

```tsx
import { Component } from '@/components'; // Path alias
```

## Notas

- HashRouter (GitHub Pages)
- Husky + lint-staged no pre-commit
- Conventional commits obrigatórios

## Documentação Detalhada

Para padrões completos, consulte:

- `docs/ARCHITECTURE.md` - Estrutura, rotas, padrões de código
- `docs/DESIGN_SYSTEM.md` - Cores, tipografia, componentes UI, exemplos
