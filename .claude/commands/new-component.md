Crie um novo componente React seguindo os padrões do projeto Harpia.

## Nome do componente: $ARGUMENTS

## Categorias de componentes

Determine onde o componente deve ficar:

| Categoria    | Pasta                      | Quando usar                                         |
| ------------ | -------------------------- | --------------------------------------------------- |
| **UI**       | `src/components/ui/`       | Componentes reutilizáveis (cards, headers, buttons) |
| **Section**  | `src/components/`          | Seções de página (Hero, Stats, Testimonials)        |
| **Services** | `src/components/services/` | Componentes específicos da página Serviços          |
| **Contact**  | `src/components/contact/`  | Componentes específicos da página Contato           |

## Template base

```tsx
import React from 'react';

interface NomeComponenteProps {
  title: string;
  description?: string;
  className?: string;
}

export const NomeComponente: React.FC<NomeComponenteProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`bg-harpia-black ${className}`}>
      <h3 className="font-serif text-2xl text-harpia-white">{title}</h3>
      {description && <p className="font-sans text-harpia-white/70 mt-2">{description}</p>}
    </div>
  );
};
```

## Template com animação (para seções)

```tsx
import React from 'react';
import { Reveal } from '@/components';
import { Container } from '@/components/ui';

interface NomeSecaoProps {
  className?: string;
}

export const NomeSecao: React.FC<NomeSecaoProps> = ({ className = '' }) => {
  return (
    <section className={`py-32 bg-harpia-black ${className}`}>
      <Container>
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl text-harpia-white text-center">
            Título da Seção
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-sans text-harpia-white/70 text-center mt-6 max-w-2xl mx-auto">
            Descrição da seção
          </p>
        </Reveal>
      </Container>
    </section>
  );
};
```

## Template de teste

Se for um componente UI reutilizável, criar teste em `src/components/ui/NomeComponente.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NomeComponente } from './NomeComponente';

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('NomeComponente', () => {
  it('renders title correctly', () => {
    renderWithRouter(<NomeComponente title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    renderWithRouter(<NomeComponente title="Title" description="Test Description" />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithRouter(
      <NomeComponente title="Title" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

## Passos

1. **Criar arquivo** na pasta apropriada
2. **Adicionar export** no `index.ts` correspondente:
   ```typescript
   export { NomeComponente } from './NomeComponente';
   ```
3. **Criar teste** (se for componente UI)
4. **Documentar** (se for componente UI reutilizável):
   - Adicionar em `docs/DESIGN_SYSTEM.md` na seção "Componentes UI Reutilizáveis"

## Regras obrigatórias

1. **Named export**: `export const NomeComponente`
2. **Props tipadas**: criar interface `NomeComponenteProps`
3. **React.FC**: usar `React.FC<Props>` para type safety
4. **Cores do design system**:
   - `bg-harpia-black` (#191919)
   - `bg-harpia-carbon` (#121212)
   - `bg-harpia-gray` (#2a2a2a)
   - `text-harpia-white` (#f5f5f7)
   - `text-harpia-accent` (#ffffff)
5. **Tipografia**: `font-serif` para títulos (h1-h4), `font-sans` para corpo
6. **Animações**: usar `<Reveal />` para animações on-scroll
7. **Imagens**: usar `<OptimizedImage />` se houver imagens
8. **Prop className**: sempre aceitar `className?: string` para customização

## Componentes auxiliares disponíveis

```tsx
import { Reveal } from '@/components'; // Animação on-scroll
import { OptimizedImage } from '@/components/ui'; // Imagens otimizadas
import { Container } from '@/components/ui'; // Wrapper de layout
import { SectionHeader } from '@/components/ui'; // Header de seção
import { GradientLine } from '@/components/ui'; // Linha decorativa
import { Skeleton } from '@/components/ui'; // Loading placeholder
```
