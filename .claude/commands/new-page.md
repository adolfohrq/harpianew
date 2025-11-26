Crie uma nova página seguindo os padrões do projeto Harpia.

## Nome da página: $ARGUMENTS

## Estrutura obrigatória

1. Criar arquivo em `src/pages/NomePage.tsx`
2. Usar `<HeroSection />` para o hero da página
3. Implementar SEO completo com hooks e config centralizada
4. Usar lazy loading no App.tsx

## Template base

```tsx
import { useMetaTags, useStructuredData, createPageSchema, HARPIA_ORGANIZATION } from '@/hooks';
import { PAGE_SEO, getCanonicalUrl, getKeywords } from '@/config/seo.config';
import { HeroSection, Container } from '@/components/ui';
import { Reveal } from '@/components';

export const NomePage: React.FC = () => {
  useMetaTags({
    title: 'Título da Página | Harpia Agência',
    description: 'Descrição da página para SEO (150-160 caracteres)',
    keywords: getKeywords(['palavra1', 'palavra2']),
    canonical: getCanonicalUrl('/rota-da-pagina'),
  });

  useStructuredData([
    HARPIA_ORGANIZATION,
    createPageSchema({
      name: 'Nome da Página',
      description: 'Descrição',
      url: '/rota-da-pagina',
      breadcrumb: [
        { name: 'Home', path: '/' },
        { name: 'Nome da Página', path: '/rota-da-pagina' },
      ],
    }),
  ]);

  return (
    <>
      <HeroSection
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Nome da Página' }]}
        subtitle="LABEL"
        title={
          <>
            TÍTULO PRINCIPAL <br />
            <span className="italic text-white/40">SUBTÍTULO ESTILIZADO</span>
          </>
        }
        description="Descrição do hero da página."
      />

      <Container as="section" className="py-32 bg-harpia-black">
        <Reveal>{/* Conteúdo da página */}</Reveal>
      </Container>
    </>
  );
};
```

## Passos pós-criação

1. **Export**: Adicionar em `src/pages/index.ts`:

   ```typescript
   export * from './NomePage';
   ```

2. **Rota**: Adicionar em `App.tsx` com lazy loading:

   ```typescript
   // No objeto de lazy imports
   NomePage: lazy(() => import('./pages/NomePage').then((m) => ({ default: m.NomePage }))),

   // No Routes
   <Route path="/rota-da-pagina" element={<NomePage />} />
   ```

3. **Navegação** (se necessário): Adicionar em `src/data/navigation.ts`:

   ```typescript
   { label: 'Nome da Página', path: '/rota-da-pagina' }
   ```

4. **SEO Config**: Adicionar em `src/config/seo.config.ts`:

   ```typescript
   // Em PAGE_SEO
   nomePage: {
     title: 'Título | Harpia Agência',
     description: 'Descrição para SEO',
     ogImage: '/images/og-nome-page.jpg',
   },

   // Em SITEMAP_CONFIG.staticRoutes
   { path: '/rota-da-pagina', priority: 0.7, changefreq: 'monthly' },
   ```

5. **Documentação**: Atualizar `docs/ARCHITECTURE.md` com a nova rota

## Regras obrigatórias

- **Named export**: `export const NomePage: React.FC`
- **Cores**: usar apenas design system (harpia-black, harpia-carbon, harpia-gray, harpia-white)
- **Tipografia**: `font-serif` para títulos, `font-sans` para corpo
- **Animações**: usar `<Reveal />` para animações on-scroll
- **Container**: usar `<Container />` para consistência de layout
- **SEO**: sempre implementar useMetaTags + useStructuredData
