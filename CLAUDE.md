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
│   ├── ui/          # Componentes reutilizáveis (HeroSection, SectionHeader, etc.)
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
- **Hero de páginas internas**: usar `<HeroSection />`

### Imports

```tsx
import { Component } from '@/components'; // Path alias
import { HeroSection } from '@/components/ui'; // UI components
```

## Notas

- BrowserRouter (URLs limpas)
- Husky + lint-staged no pre-commit
- Conventional commits obrigatórios

## Regra de Atualização de Documentação

**OBRIGATÓRIO**: Ao realizar mudanças importantes, SEMPRE atualizar a documentação correspondente:

| Tipo de Mudança                      | Arquivos a Atualizar                     |
| ------------------------------------ | ---------------------------------------- |
| Novo componente UI reutilizável      | `docs/DESIGN_SYSTEM.md`                  |
| Mudança de roteamento/router         | `docs/ARCHITECTURE.md`, `README.md`      |
| Nova página/rota                     | `docs/ARCHITECTURE.md`                   |
| Mudança na stack (dependências core) | `README.md`, `docs/ARCHITECTURE.md`      |
| Novo padrão de código                | `docs/ARCHITECTURE.md`                   |
| Novas cores/tipografia               | `docs/DESIGN_SYSTEM.md`, `src/index.css` |
| Novo hook customizado                | `docs/ARCHITECTURE.md`                   |
| Mudança estrutural de pastas         | `CLAUDE.md`, `docs/ARCHITECTURE.md`      |

### Checklist pós-implementação

Após implementar mudanças significativas, perguntar-se:

1. ✅ Essa mudança afeta como outros desenvolvedores usarão o código?
2. ✅ Criei/modifiquei um componente reutilizável?
3. ✅ Alterei configurações de build/roteamento/dependências?
4. ✅ Introduzi um novo padrão ou convenção?

**Se SIM para qualquer item → ATUALIZAR DOCUMENTAÇÃO**

## Documentação Detalhada

Para padrões completos, consulte:

- `docs/ARCHITECTURE.md` - Estrutura, rotas, padrões de código
- `docs/DESIGN_SYSTEM.md` - Cores, tipografia, componentes UI, exemplos
