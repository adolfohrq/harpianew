Analise e otimize a performance de uma página ou do projeto inteiro.

## Página: $ARGUMENTS

Se nenhum argumento for passado, analisa todo projeto.

## Verificações por página (SCAN COMPLETO)

### 1. Bundle & Imports

- [ ] Imports usando path alias `@/`
- [ ] Componentes grandes com lazy loading (`React.lazy`)
- [ ] Sem imports circulares
- [ ] Tree-shaking funcionando (imports específicos, não `import *`)
- [ ] Dependências pesadas isoladas (moment, lodash, etc.)

### 2. Imagens & Mídia

- [ ] Imagens usando `<OptimizedImage />` ou `loading="lazy"`
- [ ] Formatos modernos disponíveis (WebP, AVIF)
- [ ] Tamanhos adequados (não servir 4K para thumbnails)
- [ ] Vídeos com `preload="metadata"` e poster
- [ ] Vídeos usando `<LazyVideo />` quando abaixo da dobra

### 3. Renderização

- [ ] Sem re-renders desnecessários (verificar com React DevTools)
- [ ] `useMemo` em cálculos pesados
- [ ] `useCallback` em funções passadas como props
- [ ] `React.memo` em componentes puros que recebem props complexas
- [ ] Keys estáveis em listas (não usar index quando itens mudam)

### 4. CSS & Animações

- [ ] Animações usando `transform` e `opacity` (GPU-accelerated)
- [ ] Sem `will-change` em excesso
- [ ] CSS crítico inline ou carregado primeiro
- [ ] Fontes com `font-display: swap`
- [ ] Animações respeitam `prefers-reduced-motion`

### 5. Network & Caching

- [ ] Assets estáticos com hash no nome (cache busting)
- [ ] Preload de recursos críticos (`<link rel="preload">`)
- [ ] Prefetch de rotas prováveis (`<link rel="prefetch">`)
- [ ] Sem requests duplicados
- [ ] API calls com cache quando apropriado

### 6. JavaScript Runtime

- [ ] Sem memory leaks (cleanup em useEffect)
- [ ] Event listeners removidos no unmount
- [ ] Debounce/throttle em handlers de scroll/resize
- [ ] Intersection Observer para lazy loading
- [ ] Sem loops infinitos ou recursão excessiva

### 7. Core Web Vitals

- [ ] **LCP** (Largest Contentful Paint) < 2.5s
- [ ] **FID** (First Input Delay) < 100ms
- [ ] **CLS** (Cumulative Layout Shift) < 0.1
- [ ] **TTFB** (Time to First Byte) < 800ms
- [ ] **FCP** (First Contentful Paint) < 1.8s

## Output esperado (CONSOLE)

```
⚡ Performance: /servicos

📦 Bundle & Imports
   ✅ Path alias @/
   ✅ Lazy loading em páginas
   ⚠️ lodash importado inteiro → usar lodash-es ou import específico

🖼️ Imagens & Mídia
   ✅ OptimizedImage usado
   ✅ Vídeos com poster
   ⚠️ 3 imagens > 500KB

🔄 Renderização
   ✅ Keys estáveis
   ⚠️ useCallback ausente em handleSubmit

🎨 CSS & Animações
   ✅ Animações GPU-accelerated
   ✅ font-display: swap

🌐 Network
   ✅ Assets com hash
   ⚠️ Preload ausente para fonte principal

⚙️ JavaScript
   ✅ Cleanup em useEffect
   ✅ Debounce em scroll handler

📊 Core Web Vitals (estimativa)
   ✅ LCP: ~1.8s
   ✅ FID: ~50ms
   ⚠️ CLS: ~0.15 (layout shift detectado)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score: 85/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ OTIMIZAÇÕES RECOMENDADAS:

1. src/components/Services.tsx:12
   → Usar import específico do lodash

   // Antes
   import _ from 'lodash';

   // Depois
   import debounce from 'lodash/debounce';

2. src/pages/Home.tsx:45
   → Adicionar useCallback em handler

   // Antes
   const handleClick = () => { ... }

   // Depois
   const handleClick = useCallback(() => { ... }, [deps]);
```

## Níveis de Prioridade

| Nível         | Descrição                                  | Ação                     |
| ------------- | ------------------------------------------ | ------------------------ |
| 🔴 Crítico    | Impacta Core Web Vitals significativamente | Corrigir imediatamente   |
| 🟡 Importante | Melhoria perceptível de performance        | Corrigir na sprint atual |
| 🟢 Sugestão   | Otimização incremental                     | Backlog                  |

## Sugestões de melhoria

Se encontrar problemas, mostrar correções específicas com:

- Arquivo e linha
- Código antes/depois
- Impacto estimado na métrica
- Nível de prioridade

---

## Geração de Relatório (OBRIGATÓRIO)

### Local

```
reports/performance-reports/[nome-da-pagina].md
```

### Nomenclatura

- Home → `home.md`
- Services → `services.md`
- Portfolio → `portfolio.md`
- Contact → `contact.md`
- About → `about.md`
- Geral → `overview.md`

### Estrutura do relatório (OBJETIVA, SEM TABELAS)

```markdown
# Performance: [Página] — XX/100

> Última análise: DD/MM/YYYY às HH:MM (BRT - São Paulo)

## Resumo

**Bundle** XX/15 — lazy(✓) tree-shake(✓) alias(✓)
**Mídia** XX/20 — images(X/Y otimizadas) video(✓/✗)
**Render** XX/15 — memo(✓) callback(✓) keys(✓)
**CSS** XX/15 — gpu-anim(✓) fonts(✓) motion(✓)
**Network** XX/15 — cache(✓) preload(✓) prefetch(✓)
**Runtime** XX/10 — cleanup(✓) debounce(✓) observers(✓)
**Vitals** XX/10 — LCP(Xs) FID(Xms) CLS(X.XX)

## Pendências

🔴 **Crítico**

- [ ] Descrição do problema → `arquivo:linha`

🟡 **Importante**

- [ ] Descrição do problema → `arquivo:linha`

🟢 **Sugestão**

- [ ] Descrição do problema → `arquivo:linha`

_(ou "Nenhuma pendência.")_

## Histórico

- **DD/MM HH:MM** — XX pts (Δ +X) — Descrição breve
- **DD/MM HH:MM** — XX pts — Análise inicial
```

### Regras do relatório

1. **Máximo ~70 linhas** — ser conciso
2. **Sem tabelas** — usar listas e texto inline
3. **Pendências por prioridade** — 🔴 primeiro, depois 🟡, depois 🟢
4. **Sem código no relatório** — correções ficam no console
5. **Delta no histórico** — mostrar evolução do score
6. **Horário BRT** — obter horário real de São Paulo executando: `node -e "console.log(new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}))"`

### Passos obrigatórios

1. Verificar/criar pasta `reports/performance-reports/`
2. Se arquivo existe:
   - Preservar histórico existente
   - Adicionar nova entrada no topo do histórico
   - Calcular delta do score
3. Se não existe:
   - Criar com "Análise inicial" no histórico
4. Informar ao usuário: `✅ Relatório salvo: reports/performance-reports/[page].md`

---

## Ferramentas de Análise

Para uma análise mais profunda, considere usar:

```bash
# Bundle analyzer (verificar tamanho dos chunks)
npm run build && npx vite-bundle-visualizer

# Lighthouse CLI (Core Web Vitals)
npx lighthouse http://localhost:5020 --view

# React DevTools Profiler
# Instalar extensão no navegador e usar aba Profiler
```

---

## Fluxo de Correção

**IMPORTANTE:** Após a análise, se o usuário pedir para corrigir os problemas:

1. Aplicar as correções **seguras** (que não quebram funcionalidade)
2. Para correções arriscadas, perguntar antes
3. **Re-executar a análise completa** da mesma página
4. Atualizar o relatório com o novo score
5. Mostrar o delta de evolução

### Correções Seguras (aplicar sem perguntar)

- Adicionar `loading="lazy"` em imagens
- Adicionar `preload="metadata"` em vídeos
- Converter imports de `import *` para imports específicos
- Adicionar cleanup em useEffect
- Adicionar debounce/throttle em handlers de eventos

### Correções que Requerem Confirmação

- Adicionar `React.memo` (pode mascarar bugs)
- Refatorar componentes para lazy loading
- Mudar estratégia de cache
- Alterar animações CSS

Isso garante que o relatório sempre reflita o estado atual do código.
