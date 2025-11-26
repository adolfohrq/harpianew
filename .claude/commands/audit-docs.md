Execute uma auditoria completa da documentação, SEO e sincronização do projeto Harpia.

## Arquivos a Verificar

### Documentação Principal

- `CLAUDE.md` - Guia rápido para Claude Code
- `README.md` - Documentação pública do projeto
- `docs/ARCHITECTURE.md` - Arquitetura e padrões
- `docs/DESIGN_SYSTEM.md` - Sistema de design e UI
- `docs/PLAYWRIGHT_GUIDE.md` - Guia de testes
- `docs/TAILWIND_GUIDE.md` - Guia de Tailwind v4
- `docs/VIDEO_OPTIMIZATION.md` - Otimização de vídeos

### Código Fonte

- `src/pages/index.ts` - Exports de páginas
- `src/components/ui/index.ts` - Exports de UI
- `src/hooks/index.ts` - Exports de hooks
- `src/data/index.ts` - Exports de dados
- `src/config/seo.config.ts` - Configuração SEO
- `src/lib/validations/index.ts` - Validações Zod
- `App.tsx` - Rotas da aplicação

---

## Verificações Obrigatórias

### 1. Sincronização de Páginas

| Verificar               | Arquivos                                |
| ----------------------- | --------------------------------------- |
| Rotas existem no código | `App.tsx` ↔ `src/pages/*.tsx`          |
| Exports corretos        | `src/pages/index.ts` ↔ arquivos `.tsx` |
| Documentado             | `docs/ARCHITECTURE.md` seção Rotas      |
| Lazy loading            | Todas as páginas usam `React.lazy()`    |

### 2. Sincronização de Componentes UI

| Verificar        | Arquivos                                        |
| ---------------- | ----------------------------------------------- |
| Exports corretos | `src/components/ui/index.ts` ↔ arquivos `.tsx` |
| Documentado      | `docs/DESIGN_SYSTEM.md`                         |
| Tem testes       | `src/components/ui/*.test.tsx`                  |

**Componentes esperados** (verificar se todos existem e estão documentados):

- OptimizedImage, SectionHeader, DifferentialCard, TestimonialCard
- HeroSection, GradientLine, Container, Skeleton, LazyVideo
- InstagramIcon, WhatsAppIcon

### 3. Sincronização de Hooks

| Verificar        | Arquivos                               |
| ---------------- | -------------------------------------- |
| Exports corretos | `src/hooks/index.ts` ↔ arquivos `.ts` |
| Documentado      | `docs/ARCHITECTURE.md` seção Hooks     |
| Tem testes       | `src/hooks/*.test.ts`                  |

**Hooks esperados**:

- useMetaTags, useStructuredData, useAnalytics (usePageTracking, trackEvent)

### 4. Sincronização de Data Files

| Verificar          | Arquivos                              |
| ------------------ | ------------------------------------- |
| Exports corretos   | `src/data/index.ts` ↔ arquivos `.ts` |
| Tipos cobrem dados | `src/types.ts`                        |

**Data files esperados**:

- projects, services, testimonials, packages, navigation, about

### 5. Sincronização de Validações

| Verificar        | Arquivos                                         |
| ---------------- | ------------------------------------------------ |
| Exports corretos | `src/lib/validations/index.ts` ↔ arquivos `.ts` |
| Tem testes       | `src/lib/validations/*.test.ts`                  |

### 6. Configuração SEO Completa

| Verificar                                     | Arquivo                    |
| --------------------------------------------- | -------------------------- |
| Todas as rotas em PAGE_SEO                    | `src/config/seo.config.ts` |
| Todas as rotas em SITEMAP_CONFIG.staticRoutes | `src/config/seo.config.ts` |
| Páginas usam useMetaTags                      | `src/pages/*.tsx`          |
| Páginas usam useStructuredData                | `src/pages/*.tsx`          |
| Imagens OG existem                            | `public/og/*.jpg`          |

### 7. Estrutura de Pastas

Verificar se a estrutura em `CLAUDE.md` e `README.md` reflete a realidade:

```
src/
├── components/
│   ├── ui/
│   ├── services/
│   └── contact/
├── pages/
├── data/
├── hooks/
├── config/
├── lib/
│   └── validations/
├── test/
└── types.ts
```

### 8. README.md Sincronizado

| Verificar              | Seção                               |
| ---------------------- | ----------------------------------- |
| Todos os docs linkados | Documentação                        |
| Scripts corretos       | Scripts (comparar com package.json) |
| Estrutura atualizada   | Estrutura                           |
| Stack correta          | Stack                               |

### 9. Arquivos de Build

Após `npm run build`, verificar:

- `dist/sitemap.xml` existe
- `dist/robots.txt` existe
- Todas as URLs do sitemap são válidas

### 10. Variáveis de Ambiente

| Arquivo           | Variáveis                          |
| ----------------- | ---------------------------------- |
| `.env.example`    | Template com todas as variáveis    |
| `.env.local`      | VITE_GA_ID (pode ser vazio em dev) |
| `.env.production` | VITE_GA_ID com valor real          |

---

## Output Esperado

### Tabela: Páginas

| Rota | App.tsx | pages/index.ts | ARCHITECTURE.md | PAGE_SEO | Sitemap | OG Image | Status |
| ---- | ------- | -------------- | --------------- | -------- | ------- | -------- | ------ |

### Tabela: Componentes UI

| Componente | Código | index.ts | DESIGN_SYSTEM.md | Tem teste? | Status |
| ---------- | ------ | -------- | ---------------- | ---------- | ------ |

### Tabela: Hooks

| Hook | Código | index.ts | ARCHITECTURE.md | Tem teste? | Status |
| ---- | ------ | -------- | --------------- | ---------- | ------ |

### Tabela: Data Files

| Arquivo | Código | index.ts | types.ts | Status |
| ------- | ------ | -------- | -------- | ------ |

### Tabela: SEO por Página

| Página | useMetaTags | useStructuredData | HeroSection+breadcrumb | Status |
| ------ | ----------- | ----------------- | ---------------------- | ------ |

### Tabela: Documentação

| Doc | Existe | Linkado no README | Atualizado | Status |
| --- | ------ | ----------------- | ---------- | ------ |

---

## Resumo Final

### ✅ Sincronizado

(listar itens OK)

### ❌ Desatualizado

(listar com sugestão de correção)

### ⚠️ Atenção

(listar warnings)

### 📋 Ações Recomendadas

1. (ação 1)
2. (ação 2)
   ...

---

**Pergunte se devo corrigir as inconsistências encontradas automaticamente.**
