Analise e otimize o SEO de uma página ou do projeto inteiro.

## Página: $ARGUMENTS

Se nenhum argumento for passado, analisa todas as páginas.

## Verificações por página (SCAN COMPLETO)

### 1. Meta Tags (useMetaTags)

- [ ] `title` definido e < 60 caracteres
- [ ] `description` entre 150-160 caracteres
- [ ] `keywords` usando `getKeywords()` centralizado
- [ ] `canonical` usando `getCanonicalUrl()` centralizado
- [ ] `ogTitle` e `ogDescription` definidos
- [ ] `ogImage` aponta para imagem existente em `/public/og/`
- [ ] `robots` não está bloqueando indexação

### 2. Structured Data (useStructuredData)

- [ ] `HARPIA_ORGANIZATION` incluído
- [ ] Schema da página (WebPage, Service, CreativeWork) definido
- [ ] Breadcrumbs corretos (exceto home)
- [ ] JSON-LD válido (sem erros de sintaxe)
- [ ] URLs absolutas no schema

### 3. Configuração Central (seo.config.ts)

- [ ] Página tem entrada em `PAGE_SEO`
- [ ] Rota está em `SITEMAP_CONFIG.staticRoutes`
- [ ] Prioridade adequada (home=1.0, principais=0.8, outras=0.6)
- [ ] changefreq coerente com frequência de atualização

### 4. Conteúdo da Página

- [ ] H1 único e relevante
- [ ] Hierarquia de headings correta (h1 > h2 > h3, sem pular níveis)
- [ ] Imagens têm `alt` descritivo
- [ ] Imagens usam `<OptimizedImage />` ou têm `loading="lazy"`
- [ ] Links internos usam `<Link>` do React Router
- [ ] Não há links quebrados (verificar hrefs)

### 5. Performance & Técnico

- [ ] Imports usando path alias `@/`
- [ ] Sem valores hardcoded (URLs, textos de SEO)
- [ ] Aria-labels em elementos interativos (CTAs, botões)
- [ ] Viewport meta tag presente
- [ ] Sem conteúdo duplicado

### 6. Acessibilidade (impacta SEO)

- [ ] Contraste de texto adequado
- [ ] Focus states visíveis em links/botões
- [ ] Landmarks semânticos (`<main>`, `<nav>`, `<footer>`)

## Output esperado (CONSOLE)

```
🔍 SEO: /servicos

📝 Meta Tags
   ✅ title: "Serviços | Harpia" (32c)
   ✅ description: 158c ✓
   ✅ keywords: getKeywords() ✓
   ✅ canonical: getCanonicalUrl() ✓
   ✅ og: title ✓ desc ✓ image ✓

📊 Structured Data
   ✅ HARPIA_ORGANIZATION
   ✅ WebPage schema
   ✅ Breadcrumb: Home > Serviços

⚙️ Config
   ✅ PAGE_SEO.services
   ✅ Sitemap: 0.8 / monthly

📄 Conteúdo
   ✅ H1: "SERVIÇOS QUE ELEVAM SUA MARCA"
   ✅ Headings: h1(1) → h2(4) → h3(8)
   ⚠️ 2 imagens sem alt

🔧 Técnico
   ✅ Path alias @/
   ✅ Lazy loading
   ✅ Aria-labels

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score: 95/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ CORREÇÕES NECESSÁRIAS:

1. src/components/Services.tsx:45
   → Adicionar alt em <img>

   // Antes
   <img src={service.image} />

   // Depois
   <img src={service.image} alt={service.title} />
```

## Sugestões de melhoria

Se encontrar problemas, mostrar correções específicas com:

- Arquivo e linha
- Código antes/depois
- Comando para corrigir (se aplicável)

---

## Geração de Relatório (OBRIGATÓRIO)

### Local

```
docs/seo-reports/[nome-da-pagina].md
```

### Nomenclatura

- Home → `home.md`
- Services → `services.md`
- Portfolio → `portfolio.md`
- Contact → `contact.md`
- About → `about.md`

### Estrutura do relatório (OBJETIVA, SEM TABELAS)

```markdown
# SEO: [Página] — XX/100

> Última análise: DD/MM/YYYY às HH:MM (BRT - São Paulo)

## Resumo

**Meta Tags** XX/25 — title(XXc) desc(XXc) og(✓/✗)
**Schema** XX/20 — Org(✓) Page(✓) Bread(✓/✗)
**Config** XX/20 — PAGE_SEO(✓) Sitemap(X.X/freq)
**Conteúdo** XX/20 — H1(✓) Hierarquia(✓) Alt(X/Y)
**Técnico** XX/15 — Alias(✓) Lazy(✓) Aria(✓)

## Pendências

- [ ] Descrição curta do problema → `arquivo:linha`
- [ ] Outro problema → `arquivo:linha`

_(ou "Nenhuma pendência.")_

## Histórico

- **DD/MM HH:MM** — XX pts (Δ +X) — Descrição breve
- **DD/MM HH:MM** — XX pts — Análise inicial
```

### Regras do relatório

1. **Máximo ~60 linhas** — ser conciso
2. **Sem tabelas** — usar listas e texto inline
3. **Pendências como checklist** — `- [ ]` para ações
4. **Sem código no relatório** — correções ficam no console
5. **Delta no histórico** — mostrar evolução do score
6. **Horário BRT** — obter horário real de São Paulo executando: `node -e "console.log(new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}))"`

### Passos obrigatórios

1. Verificar/criar pasta `docs/seo-reports/`
2. Se arquivo existe:
   - Preservar histórico existente
   - Adicionar nova entrada no topo do histórico
   - Calcular delta do score
3. Se não existe:
   - Criar com "Análise inicial" no histórico
4. Informar ao usuário: `✅ Relatório salvo: docs/seo-reports/[page].md`

---

## Fluxo de Correção

**IMPORTANTE:** Após a análise, se o usuário pedir para corrigir os problemas:

1. Aplicar as correções necessárias nos arquivos
2. **Re-executar a análise completa** da mesma página
3. Atualizar o relatório com o novo score
4. Mostrar o delta de evolução

Isso garante que o relatório sempre reflita o estado atual do código.
