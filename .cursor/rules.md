# AI Rules for Harpia Project

## Core Standards

- **TypeScript strict mode** obrigatório em todos os arquivos
- **Interfaces explícitas** para component props (nunca `any`)
- **Mobile-first** com Tailwind CSS v4
- Usar `@` alias para imports (`@/components`, `@/types`, etc.)
- Todos os arquivos em TypeScript (.ts/.tsx)

## Architecture

- Pages lazy-loaded via React.lazy() em [App.tsx:92-96](src/App.tsx#L92-L96)
- Static content em `src/data/` como typed exports
- Components em [src/components/](src/components/) e [src/components/ui/](src/components/ui/) para reutilizáveis
- Footer reveal effect com z-index positioning
- Grain overlay e custom scrollbar em [src/index.css](src/index.css)

## Component Guidelines

- **Nomenclatura:** PascalCase (ex: `MeusServicos.tsx`)
- **Pattern:** `export const Component = ({ prop }: Props) => ...`
- **Props typing:** Sempre criar interface Props explícita
- **Sub-componentes:** Extrair se arquivo > 150 linhas
- **Imagens:** Usar `<OptimizedImage />` para lazy loading e fallbacks
- **Import order:** React → Third-party libs → Components → Utils/Types
- **Early returns** para evitar deep nesting

## Styling with Tailwind v4

- **Theme colors** (definidas em [src/index.css](src/index.css)):
  - `bg-harpia-black` (#050505)
  - `bg-harpia-carbon` (#121212)
  - `bg-harpia-gray` (#2a2a2a)
  - `text-harpia-white` (#f5f5f7)
  - `text-harpia-accent` (#ffffff)

- **Typography:**
  - `font-serif` = Silk Serif (headings)
  - `font-sans` = Dosis (body text)

- Nunca criar cores arbitrárias (`bg-[#123456]`) sem aprovação explícita
- Mobile-first: classes base para mobile, `md:` para desktop
- Animações customizadas em [src/index.css](src/index.css)

## Performance

- Adicionar `loading="lazy"` para conteúdo abaixo da fold
- Pages já são lazy-loaded (não precisa repetir)
- Use `React.memo` apenas quando re-renders forem comprovadamente problemáticos
- Preferir dados estáticos em `src/data/`

## Testing

- Setup em [src/test/setup.ts](src/test/setup.ts) (mocks ResizeObserver, window.scrollTo)
- Usar `@testing-library/react` e `@testing-library/jest-dom`
- Run: `npm test`

## Git Commit Conventions

Follow Conventional Commits (enforced by commitlint):

```
feat: [ação realizada]
fix: [problema resolvido]
```

**Exemplos:**

- `feat: adicionar autenticação de usuários`
- `fix: corrigir erro ao validar senha inválida`

Cada task = commit isolado e claro

## Tech Stack

- **React 19** com TypeScript (strict mode)
- **Vite 6** para build
- **Tailwind CSS v4** (CSS variables)
- **React Router Dom 7** (HashRouter)
- **Lucide React** para ícones
- **Vitest** para testes

## Development Commands

```bash
npm run dev      # Development server (port 5020)
npm run build    # Production build
npm preview      # Preview production build
npm test         # Run tests
npm lint         # Lint code
npm format       # Format code
```

## Design Language

- **Tone:** Professional, minimalist, high-end
- **Keywords:** Vision, Flight, Strategy, Elegance
- **Aesthetic:** Dark theme, subtle animations, premium feel
- **Port:** 5020 (configurado em vite.config.ts)

## Important Notes

- Uses **HashRouter** para GitHub Pages compatibility
- Environment variables via Vite `loadEnv` (GEMINI_API_KEY)
- Husky + lint-staged executa ESLint e Prettier em pre-commit
- Não fazer changes proativos além do solicitado (evitar over-engineering)
- Ler código antes de sugerir mudanças
