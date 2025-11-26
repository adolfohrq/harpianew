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
├── hooks/           # Custom hooks (useMetaTags, useStructuredData, useAnalytics)
├── config/          # Configurações (seo.config.ts)
├── test/            # Configuração de testes (setup.ts)
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

### SEO em Páginas (padrão obrigatório)

```tsx
// Imports obrigatórios
import { useMetaTags } from '@/hooks/useMetaTags';
import { useStructuredData, HARPIA_ORGANIZATION, createPageSchema } from '@/hooks/useStructuredData';
import { PAGE_SEO, getKeywords, getCanonicalUrl } from '@/config/seo.config';

// Dentro do componente
useMetaTags({
  title: PAGE_SEO.nomePagina.title,
  description: PAGE_SEO.nomePagina.description,
  keywords: getKeywords(PAGE_SEO.nomePagina.keywords),
  ogImage: PAGE_SEO.nomePagina.ogImage,
  canonical: getCanonicalUrl('/rota'),
});

useStructuredData([
  HARPIA_ORGANIZATION,
  createPageSchema(PAGE_SEO.nomePagina.title, PAGE_SEO.nomePagina.description, '/rota', [
    { name: 'Nome da Página', path: '/rota' },
  ]),
]);

// HeroSection com breadcrumb (exceto Home)
<HeroSection breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Página' }]} ... />
```

## Comandos Customizados (.claude/commands/)

| Comando                 | Descrição                                                  |
| ----------------------- | ---------------------------------------------------------- |
| `/dev`                  | Inicia servidor de desenvolvimento (localhost:5020)        |
| `/build`                | Build de produção + verificação de sitemap/robots          |
| `/preview`              | Build + servidor de preview para testar produção           |
| `/check`                | Verificação completa (lint + testes + build)               |
| `/test {modo}`          | Executa testes (watch, coverage, ou componente específico) |
| `/lint-fix`             | Executa linter e corrige problemas automaticamente         |
| `/commit {msg}`         | Cria commit seguindo conventional commits                  |
| `/seo {pagina}`         | Análise SEO completa + relatório em docs/seo-reports/      |
| `/new-page {nome}`      | Cria nova página com template SEO completo                 |
| `/new-component {nome}` | Cria componente seguindo padrões do projeto                |
| `/add-data {tipo}`      | Adiciona dados (project, service, testimonial)             |
| `/refactor {arquivo}`   | Refatora arquivo seguindo padrões                          |
| `/audit-docs`           | Auditoria completa de documentação e SEO                   |

## Notas

- BrowserRouter (URLs limpas)
- Husky + lint-staged no pre-commit
- Conventional commits obrigatórios

## Regra de Atualização de Documentação

**OBRIGATÓRIO**: Ao realizar mudanças importantes, SEMPRE atualizar a documentação correspondente:

| Tipo de Mudança                      | Arquivos a Atualizar                                                     |
| ------------------------------------ | ------------------------------------------------------------------------ |
| Novo componente UI reutilizável      | `docs/DESIGN_SYSTEM.md`                                                  |
| Mudança de roteamento/router         | `docs/ARCHITECTURE.md`, `README.md`                                      |
| Nova página/rota                     | `docs/ARCHITECTURE.md`, `src/pages/index.ts`, `src/config/seo.config.ts` |
| Remoção de página/rota               | `docs/ARCHITECTURE.md`, `src/pages/index.ts`, `src/config/seo.config.ts` |
| Mudança na stack (dependências core) | `README.md`, `docs/ARCHITECTURE.md`                                      |
| Novo padrão de código                | `docs/ARCHITECTURE.md`                                                   |
| Novas cores/tipografia               | `docs/DESIGN_SYSTEM.md`, `src/index.css`                                 |
| Novo hook customizado                | `docs/ARCHITECTURE.md`, `CLAUDE.md` (estrutura), `README.md`             |
| Nova pasta em `src/`                 | `CLAUDE.md`, `docs/ARCHITECTURE.md`, `README.md`                         |
| Mudança estrutural de pastas         | `CLAUDE.md`, `docs/ARCHITECTURE.md`, `README.md`                         |
| Remoção de componente/hook           | Remover das docs correspondentes                                         |
| Mudança em dados da empresa/contato  | `src/config/seo.config.ts`                                               |
| Mudança em redes sociais             | `src/config/seo.config.ts`                                               |
| Nova documentação em `docs/`         | `README.md` (seção Documentação)                                         |
| Novo script npm                      | `README.md` (tabela Scripts)                                             |

## Regra de Atualização de Configurações (src/config/)

**OBRIGATÓRIO**: Ao criar/remover páginas ou alterar dados do site, atualizar `src/config/seo.config.ts`:

| Ação                        | O que atualizar em `seo.config.ts`                              |
| --------------------------- | --------------------------------------------------------------- |
| Nova página                 | Adicionar entrada em `PAGE_SEO` + `SITEMAP_CONFIG.staticRoutes` |
| Remover página              | Remover de `PAGE_SEO` + `SITEMAP_CONFIG.staticRoutes`           |
| Mudança de URL da página    | Atualizar path em `SITEMAP_CONFIG.staticRoutes`                 |
| Novo projeto no portfolio   | Adicionar em `PORTFOLIO_PROJECTS`                               |
| Mudança de dados da empresa | Atualizar `COMPANY_INFO`                                        |
| Mudança de contato          | Atualizar `CONTACT_INFO`                                        |
| Nova rede social            | Adicionar em `SOCIAL_LINKS`                                     |
| Novo serviço oferecido      | Adicionar em `SERVICES_LIST`                                    |

### Checklist ao criar nova página

1. [ ] Criar arquivo em `src/pages/NomePagina.tsx`
2. [ ] Exportar em `src/pages/index.ts`
3. [ ] Adicionar rota em `App.tsx`
4. [ ] Adicionar `PAGE_SEO.nomePagina` em `seo.config.ts`
5. [ ] Adicionar rota em `SITEMAP_CONFIG.staticRoutes`
6. [ ] Usar `useMetaTags` com `PAGE_SEO.nomePagina`
7. [ ] Usar `useStructuredData` com `HARPIA_ORGANIZATION`
8. [ ] Criar imagem OG em `public/og/nome-pagina.jpg` (1200x630px)

### Checklist pós-implementação

Após implementar mudanças significativas, perguntar-se:

1. ✅ Essa mudança afeta como outros desenvolvedores usarão o código?
2. ✅ Criei/modifiquei um componente reutilizável?
3. ✅ Alterei configurações de build/roteamento/dependências?
4. ✅ Introduzi um novo padrão ou convenção?
5. ✅ Removi algum arquivo/componente/página?

**Se SIM para qualquer item → ATUALIZAR DOCUMENTAÇÃO**

## Regra de Atualização do README.md

**OBRIGATÓRIO**: O `README.md` é o ponto de entrada para novos desenvolvedores. Manter sempre atualizado.

### Quando atualizar o README

| Mudança                            | Seção do README a Atualizar      |
| ---------------------------------- | -------------------------------- |
| Nova pasta em `src/`               | Estrutura                        |
| Subpasta em `components/`          | Estrutura (árvore de components) |
| Novo hook customizado              | Estrutura (descrição de hooks)   |
| Nova dependência core              | Stack                            |
| Atualização de versão (React, etc) | Stack                            |
| Novo script npm                    | Scripts (tabela)                 |
| Nova documentação em `docs/`       | Documentação (lista de links)    |
| Mudança de porta do dev server     | Stack e Início Rápido            |
| Remoção de pasta/funcionalidade    | Remover da seção correspondente  |

### Estrutura esperada do README

```markdown
# Harpia Agência

## Stack → Tecnologias principais com versões

## Início Rápido → Comandos essenciais (install, dev, build, test)

## Estrutura → Árvore de pastas src/ atualizada

## Documentação → Links para todos os docs em docs/

## Scripts → Tabela com todos os scripts npm

## Licença → Informação de licença
```

### Checklist de verificação do README

- [ ] Estrutura `src/` reflete as pastas reais do projeto?
- [ ] Todas as subpastas de `components/` estão listadas?
- [ ] Hooks importantes estão mencionados na estrutura?
- [ ] Todos os arquivos em `docs/` têm link na seção Documentação?
- [ ] Tabela de scripts está sincronizada com `package.json`?
- [ ] Versões na Stack estão corretas?

### Auditoria Periódica de Documentação

**Quando executar**: Antes de cada release ou mensalmente.

**Verificar sincronização entre código e docs**:

1. **Páginas**: comparar `App.tsx` com `docs/ARCHITECTURE.md`
2. **Componentes UI**: comparar `src/components/ui/index.ts` com `docs/DESIGN_SYSTEM.md`
3. **Hooks**: comparar `src/hooks/index.ts` com `docs/ARCHITECTURE.md`
4. **Estrutura**: comparar pastas `src/` com `CLAUDE.md` e `README.md`
5. **Docs**: comparar arquivos em `docs/` com links no `README.md`

**Checklist de auditoria**:

- [ ] Todas as rotas em `App.tsx` estão documentadas?
- [ ] Todos os exports em `pages/index.ts` existem como arquivos?
- [ ] Todos os hooks em `hooks/index.ts` estão documentados?
- [ ] A estrutura em `CLAUDE.md` reflete as pastas reais?
- [ ] A estrutura em `README.md` reflete as pastas reais?
- [ ] Componentes removidos foram removidos da documentação?
- [ ] Todos os docs em `docs/` estão linkados no README?
- [ ] Scripts no README batem com `package.json`?

## Ferramentas de Desenvolvimento

### Playwright MCP (Testes de UI e Automação)

O projeto está configurado com Playwright MCP para testes automatizados de UI, validação visual e captura de screenshots.

**Configuração**: `C:\Users\adolf\AppData\Roaming\Claude\claude_desktop_config.json`

**Guia completo**: `docs/PLAYWRIGHT_GUIDE.md`

**Uso rápido**:

```bash
# Iniciar servidor dev
npm run dev

# No Claude Code (após reiniciar)
browser_navigate url="http://localhost:5020"
browser_snapshot  # Ver estrutura da página
browser_take_screenshot fullPage=true filename="teste.png"
```

**Casos de uso**:

- Testar formulário de contato
- Validar responsividade (desktop/tablet/mobile)
- Verificar SEO visual (meta tags, headings)
- Capturar screenshots para documentação
- Testar animações e interações
- Auditar acessibilidade

## Documentação Detalhada

Para padrões completos, consulte:

- `docs/ARCHITECTURE.md` - Estrutura, rotas, padrões de código
- `docs/DESIGN_SYSTEM.md` - Cores, tipografia, componentes UI, exemplos
- `docs/PLAYWRIGHT_GUIDE.md` - Guia completo de testes com Playwright MCP
