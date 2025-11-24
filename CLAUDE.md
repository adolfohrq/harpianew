# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Harpia** is a high-performance, visually striking landing page for a marketing agency. The project emphasizes clean code, performance optimization, and premium visual aesthetics with a focus on minimalist, high-end design.

**Tech Stack:**

- React 19 with TypeScript (strict mode)
- Vite 6 for build tooling
- Tailwind CSS v4 (configured via CSS variables)
- React Router Dom 7 (HashRouter)
- Lucide React for icons
- Vitest for testing

## Development Commands

```bash
# Development server (runs on port 5020)
npm run dev

# Production build
npm run build

# Preview production build
npm preview

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Architecture

### Project Structure

```
src/
├── components/          # Page sections (Hero, Footer, Navbar, etc.)
│   └── ui/             # Atomic/reusable UI components
├── pages/              # Route pages (Home, Services, Packages, Contact, NotFound)
├── data/               # Static data (navigation, services, packages, testimonials, projects)
├── test/               # Test configuration
├── types.ts            # Shared TypeScript interfaces
├── index.css           # Tailwind config + custom animations
└── App.tsx             # Router setup + reveal footer effect
```

### Key Architectural Patterns

**1. Route-Based Code Splitting:**
Pages are lazy-loaded using React.lazy() in App.tsx:92-96 to improve initial load performance.



**3. Data Layer:**
All static content lives in `src/data/` as typed exports, imported where needed. This keeps components presentation-focused.

**4. Component Organization:**

- `src/components/`: Feature components and page sections
- `src/components/ui/`: Atomic, reusable UI components like OptimizedImage
- Each component exports as named export, aggregated in index.ts

**5. Global Effects:**

- Animated grain overlay (src/App.tsx:57-62) provides film-like texture
- Custom scrollbar styles (src/index.css:23-38)
- Floating CTA button (src/App.tsx:106-117)

## Code Standards

### TypeScript

- **Always use explicit interfaces** for component props (never `any`)
- Import shared types from `src/types.ts`
- Component pattern: `export const Component = ({ prop }: Props) => ...`
- Avoid `React.FC` for component typing
- All files must be in TypeScript (.ts/.tsx)

### Styling with Tailwind v4

- **Theme colors** are defined in `src/index.css` via CSS variables:
  - `bg-harpia-black` (#050505)
  - `bg-harpia-carbon` (#121212)
  - `bg-harpia-gray` (#2a2a2a)
  - `text-harpia-white` (#f5f5f7)
  - `text-harpia-accent` (#ffffff)

- **Typography:**
  - `font-serif` = Silk Serif (for headings)
  - `font-sans` = Dosis (for body text)

- **Never create arbitrary colors** (e.g., `bg-[#123456]`) without explicit approval
- Use **mobile-first** approach: write base classes for mobile, use `md:` prefix for desktop
- Custom animations are defined in `src/index.css` (noise, marquee)

### Component Guidelines

- Files named in **PascalCase** (e.g., `MeusServicos.tsx`)
- Import order: React → Third-party libs → Components → Utils/Types
- Use early returns to avoid deep nesting
- Extract sub-components or custom hooks if a component exceeds ~150 lines
- **Always use `<OptimizedImage />`** for raster images (handles lazy loading, fallbacks, transitions)

### Performance

- Add `loading="lazy"` for below-the-fold content
- Only use `React.memo` when re-renders are proven problematic
- Pages are already lazy-loaded in App.tsx

### Testing

- Test setup in `src/test/setup.ts` mocks ResizeObserver and window.scrollTo
- Run tests with `npm test`
- Vitest configuration in `vitest.config.ts`
- Use `@testing-library/react` and `@testing-library/jest-dom`

## Git Commit Conventions

Follow Conventional Commits format (enforced by commitlint):

```
feat: [action performed]
fix: [problem resolved]
```

**Examples:**

- `feat: adicionar autenticação de usuários`
- `fix: corrigir erro ao validar senha inválida`

Each task should produce a clear, isolated commit. This keeps history readable and facilitates changelog generation.

## Design Language

**Tone:** Professional, minimalist, "high-end"
**Keywords:** Vision, Flight, Strategy, Elegance
**Aesthetic:** Dark theme, subtle animations, premium feel

## Path Alias

The `@` alias is configured to resolve to `src/`:

```typescript
import { Component } from '@/components';
```

## Important Notes

- Server runs on port **5020** (configured in vite.config.ts:9)
- Uses **HashRouter** for GitHub Pages compatibility
- Environment variables are loaded via Vite's `loadEnv` (currently supports GEMINI_API_KEY)
- Husky + lint-staged runs ESLint and Prettier on pre-commit
