Execute uma auditoria completa da documentação e SEO do projeto.

## Verificações

### 1. Sincronização de Páginas

- Compare as rotas em `App.tsx` com `docs/ARCHITECTURE.md`
- Verifique se todos os exports em `src/pages/index.ts` existem como arquivos
- Verifique se todas as rotas têm lazy loading configurado

### 2. Sincronização de Componentes UI

- Compare `src/components/ui/index.ts` com `docs/DESIGN_SYSTEM.md`
- Verifique se componentes removidos foram removidos da documentação
- Liste componentes sem testes

### 3. Sincronização de Hooks

- Compare `src/hooks/index.ts` com `docs/ARCHITECTURE.md`

### 4. Estrutura de Pastas

- Compare pastas em `src/` com a estrutura documentada em `CLAUDE.md`

### 5. Configuração de SEO (NOVO)

- Verifique se todas as rotas em `App.tsx` estão em `SITEMAP_CONFIG.staticRoutes`
- Verifique se todas as páginas têm entrada em `PAGE_SEO`
- Verifique se `useMetaTags` é chamado em todas as páginas
- Verifique se `useStructuredData` é chamado em todas as páginas

### 6. Sitemap e Robots

- Verifique se `dist/sitemap.xml` existe após build
- Verifique se `dist/robots.txt` existe após build
- Valide se todas as URLs do sitemap são acessíveis

### 7. Data Files

- Compare exports em `src/data/index.ts` com arquivos existentes
- Verifique se tipos em `src/types.ts` cobrem todos os data files

## Output esperado

Liste em formato de tabela:

### Páginas

| Rota | App.tsx | pages/index.ts | ARCHITECTURE.md | SEO Config | Status |

### Componentes UI

| Componente | Código | DESIGN_SYSTEM.md | Tem teste? | Status |

### SEO

| Página | useMetaTags | useStructuredData | PAGE_SEO | Sitemap | Status |

### Resumo

1. ✅ Itens sincronizados
2. ❌ Itens desatualizados (com sugestão de correção)
3. ⚠️ Itens que precisam de atenção

Pergunte se devo corrigir as inconsistências encontradas.
