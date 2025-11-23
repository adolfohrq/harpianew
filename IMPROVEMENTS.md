# Melhorias Recomendadas para o Projeto Harpia

Este documento descreve sugestões de melhorias técnicas, arquiteturais e de experiência do usuário para elevar a qualidade do projeto Harpia.

## 1. Arquitetura e Organização de Código

- **Barrel Exports**: Implementar arquivos `index.ts` nas pastas de componentes e páginas. Isso simplifica as importações (ex: `import { Navbar, Footer } from '@/components'` ao invés de caminhos longos).
- **Separação de Dados**: Mover constantes de dados (como `PROJECTS`, `SERVICES` em `constants.ts`) para uma camada dedicada de dados (`src/data` ou `src/services`). Isso facilita a futura integração com um CMS ou API.
- **Componentização Atômica**: Revisar componentes grandes (como seções inteiras na `Home.tsx`) e quebrá-los em componentes menores e reutilizáveis (ex: `HeroSection`, `ServicesGrid`).

## 2. Performance e Otimização

- **Code Splitting (Lazy Loading)**: Implementar `React.lazy` e `Suspense` para as rotas no `App.tsx`. Isso reduz o tamanho do bundle inicial, carregando o código das páginas apenas quando necessário.
  ```tsx
  const Services = React.lazy(() => import('./pages/Services'));
  ```
- **Otimização de Imagens**: Criar um componente de Imagem otimizado que suporte lazy loading nativo e fallbacks. Considerar o uso de formatos modernos (WebP/AVIF) se os assets forem locais.
- **Resource Hints**: Adicionar `rel="preload"` ou `rel="preconnect"` no `index.html` para recursos críticos (fontes, vídeo de hero) para melhorar o LCP (Largest Contentful Paint).

## 3. SEO e Acessibilidade (a11y)

- **Gerenciamento de Meta Tags**: Integrar `react-helmet-async`. Atualmente, o título e meta tags são estáticos. Cada página deve ter seu próprio `<title>` e `<meta name="description">` para melhor SEO.
- **Auditoria de Contraste**: Verificar se as cores de texto cinza sobre fundo preto atendem aos padrões WCAG AA. Algumas combinações podem ter baixo contraste.
- **Semântica HTML**: Garantir o uso correto de tags semânticas (`<main>`, `<article>`, `<aside>`) e atributos `aria-label` em botões interativos (como o botão flutuante de contato).
- **Página 404**: Criar uma página de "Não Encontrado" personalizada para manter o usuário no fluxo do site caso acesse uma rota inexistente.

## 4. Qualidade de Código e Tooling

- **Testes Automatizados**: Configurar **Vitest** e **React Testing Library**. Criar testes unitários para componentes críticos e utilitários.
- **Linting e Formatação**: Garantir que o ESLint e Prettier estejam configurados com regras estritas.
- **Git Hooks**: Configurar **Husky** e **lint-staged** para rodar linters e testes antes de cada commit, garantindo que código quebrado não entre no repositório.
- **Conventional Commits**: Adotar um padrão de mensagens de commit (ex: `feat:`, `fix:`, `style:`) para manter o histórico limpo e legível.

## 5. UI/UX e Design

- **Error Boundaries**: Implementar um `ErrorBoundary` global para capturar erros de renderização e exibir uma interface amigável ao invés de uma tela branca.
- **Loading States**: Melhorar o feedback visual durante o carregamento de páginas ou imagens pesadas (Skeleton Screens ao invés de apenas spinners).
- **Animações Reduzidas**: Respeitar a preferência do usuário `prefers-reduced-motion`. As animações de paralaxe e ruído devem ser desativadas se o usuário solicitar via sistema operacional.

## 6. Infraestrutura (Futuro)

- **Integração CMS**: Planejar a integração com um Headless CMS (como Sanity, Strapi ou Contentful) para que o conteúdo do portfólio e serviços possa ser editado sem alterar o código.
- **Analytics**: Configurar Google Analytics ou similar para monitorar tráfego e comportamento do usuário.
