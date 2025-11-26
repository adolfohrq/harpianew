# Recomendações para o Projeto Harpia

> Documento gerado em 26/11/2025 após análise completa do codebase.

---

## Sumário Executivo

| Categoria    | Crítico    | Importante  | Melhoria |
| ------------ | ---------- | ----------- | -------- |
| Segurança    | ~~2~~ 0 ✅ | 0           | 0        |
| Código       | ~~1~~ 0 ✅ | ~~4~~ 0 ✅  | 3        |
| Testes       | 0          | 1           | 2        |
| Performance  | 0          | 2           | 2        |
| Documentação | 0          | ~~1~~ 0 ✅  | 1        |
| **Total**    | **0** ✅   | ~~8~~ **3** | **8**    |

> **Progresso:** 9 itens resolvidos nesta sessão!

---

**⚠️ IMPORTANTE:** A API key em `.env.local` foi exposta. Recomendo invalidá-la e gerar uma nova.

---

### ~~2. Erros de Lint em useAnalytics.ts~~ ✅ RESOLVIDO

**Status:** Verificado - arquivos já estavam formatados.

---

### ~~3. VisualGovernance.tsx não deve estar em produção~~ ✅ RESOLVIDO

**Status:** Rota agora só aparece em desenvolvimento (`import.meta.env.DEV`)

**O que foi feito:**

- Adicionado check `isDev` em `App.tsx`
- Rota `/visual-governance` só renderiza quando `import.meta.env.DEV === true`
- Em produção, a página não é acessível

---

## ⚠️ Importantes (Próxima Sprint)

### ~~4. Duplicação de ícones sociais~~ ✅ RESOLVIDO

**Status:** Componentes criados em `src/components/ui/icons/SocialIcons.tsx`

**O que foi feito:**

- Criado `InstagramIcon` e `WhatsAppIcon` reutilizáveis
- Navbar e Footer agora importam de `@/components/ui/icons`
- Exportado no barrel `src/components/ui/index.ts`

---

### ~~5. SEO incompleto em PortfolioDetail~~ ✅ RESOLVIDO

**Status:** `useStructuredData` adicionado com `HARPIA_ORGANIZATION` e `createPortfolioSchema`

---

### ~~Correção: Classes Tailwind~~ ✅ RESOLVIDO

**O que foi feito:**

- Convertidas classes com sintaxe `[value]` para sintaxe canônica
- `z-[9999]` → `z-9999`
- `aspect-[4/3]` → `aspect-4/3`
- `bg-harpia-black/[0.02]` → `bg-harpia-black/2`
- `bg-gradient-to-r` → `bg-linear-to-r`

---

### ~~Limpeza: Teste dummy removido~~ ✅ RESOLVIDO

**Status:** `src/Simple.test.tsx` removido

---

### 7. Cobertura de testes muito baixa

**Problema:** Apenas 13 testes para ~8000 linhas de código. Cobertura < 5%.

**Prioridade de testes:**

| Componente       | Justificativa                     |
| ---------------- | --------------------------------- |
| `useMetaTags`    | Hook crítico de SEO               |
| `useAnalytics`   | Rastreamento de eventos           |
| `ContactForm`    | Formulário principal de conversão |
| `Navbar`         | Navegação principal               |
| `OptimizedImage` | Componente de performance         |

**Arquivo a remover:** [src/Simple.test.tsx](src/Simple.test.tsx) - teste dummy sem valor.

---

### ~~7. GA4 hardcoded no HTML~~ ✅ RESOLVIDO

**Status:** GA4 agora usa variável de ambiente.

**O que foi feito:**

- Criado `.env.production` com `VITE_GA_ID=G-NSQ9LPFYZQ`
- `index.html` carrega GA dinamicamente via `%VITE_GA_ID%`
- Script só executa se a variável estiver definida

---

### ~~8. PORTFOLIO_PROJECTS pode desincronizar~~ ✅ RESOLVIDO

**Status:** Fonte de dados unificada.

**O que foi feito:**

- `seo.config.ts` agora importa de `src/data/projects.ts`
- `PORTFOLIO_PROJECTS` é derivado de `PROJECTS`
- `build-sitemap.js` lê slugs diretamente de `projects.ts`
- Build confirma 6 projetos sincronizados

---

### 9. Script de sitemap usa regex frágil

**Problema:** `scripts/build-sitemap.js` parseia TypeScript com regex, quebrando facilmente.

**Arquivo:** [scripts/build-sitemap.js](scripts/build-sitemap.js#L20-L63)

**Solução:** Usar importação real do arquivo:

```javascript
// Opção 1: ts-node para importar TS
// Opção 2: Exportar dados como JSON separado
// Opção 3: Usar vite para build do sitemap
```

---

### 10. Otimização de vídeos

**Problema:** Vídeos em `public/` aumentam significativamente o bundle.

**Arquivos:**

- `public/video.mp4`
- `public/video-hero.mp4`

**Recomendações:**

1. Comprimir com codec moderno (H.265/HEVC ou AV1)
2. Servir de CDN externo (Cloudflare, Bunny)
3. Implementar lazy loading do vídeo
4. Oferecer versão WebM como fallback

---

### 11. Documentação desatualizada

**Problema:** VisualGovernance não documentada em nenhum lugar.

**Ação:** Se for página válida, adicionar em:

- `docs/ARCHITECTURE.md` (rotas)
- `CLAUDE.md` (estrutura)
- `src/config/seo.config.ts` (PAGE_SEO)

---

## 💡 Melhorias (Backlog)

### 12. Consolidar tipos em types.ts

**Problema:** Tipos como `FormData` definidos localmente em componentes.

**Arquivo:** [src/components/contact/ContactForm.tsx](src/components/contact/ContactForm.tsx#L5)

**Solução:** Mover para `src/types.ts`:

```typescript
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
}
```

---

### 13. Adicionar validação de formulário

**Problema:** Formulário de contato sem validação robusta.

**Solução:** Implementar Zod:

```bash
npm install zod
```

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\d{10,11}$/, 'Telefone inválido'),
  message: z.string().min(10, 'Mensagem muito curta'),
});
```

---

### 14. Implementar PWA/Service Worker

**Benefícios:**

- Cache de assets estáticos
- Funcionamento offline
- Instalação como app

**Ferramenta:** `vite-plugin-pwa`

---

### 15. Extrair classes Tailwind comuns

**Problema:** 934 ocorrências de `className` com classes repetidas.

**Solução:** Criar utilities em `index.css`:

```css
@layer components {
  .btn-primary {
    @apply bg-harpia-accent text-harpia-black px-6 py-3 rounded-lg font-medium;
  }

  .section-padding {
    @apply py-16 md:py-24 lg:py-32;
  }
}
```

---

### 16. Refatorar PortfolioDetail.tsx

**Problema:** 586 linhas - arquivo muito grande.

**Solução:** Extrair componentes:

- `ProjectHero`
- `ProjectGallery`
- `ProjectResults`
- `ProjectTestimonial`
- `RelatedProjects`

---

### 17. Atualizar SEO reports

**Problema:** Arquivos em `docs/seo-reports/` são stubs vazios (19-29 linhas).

**Ação:** Executar análise real com `/seo {pagina}` para cada página.

---

### 18. Usar react-helmet-async

**Problema:** Dependência instalada mas não utilizada. Meta tags manipuladas via DOM direto.

**Solução:** Refatorar `useMetaTags` para usar `react-helmet-async`:

```tsx
import { Helmet } from 'react-helmet-async';

// Em vez de manipular DOM, retornar componente
return (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);
```

---

## Checklist de Implementação

### Fase 1 - Críticos (Hoje)

- [x] ~~Remover arquivos sensíveis do git~~ ✅
- [x] ~~Atualizar `.gitignore`~~ ✅
- [ ] Invalidar e regenerar API key exposta (se aplicável)
- [x] ~~Executar `npm run format`~~ ✅
- [x] ~~Decidir destino de VisualGovernance~~ ✅ (dev-only)

### Fase 2 - Importantes (Esta Semana)

- [x] ~~Extrair ícones sociais em componentes~~ ✅
- [x] ~~Adicionar `useStructuredData` em PortfolioDetail~~ ✅
- [x] ~~Corrigir classes Tailwind para sintaxe canônica~~ ✅
- [x] ~~Remover teste dummy Simple.test.tsx~~ ✅
- [x] ~~Mover GA4 ID para variável de ambiente~~ ✅
- [x] ~~Unificar PORTFOLIO_PROJECTS com projects.ts~~ ✅
- [x] ~~VisualGovernance dev-only~~ ✅

### Fase 3 - Melhorias (Este Mês)

- [ ] Adicionar testes para hooks principais
- [ ] Implementar validação com Zod
- [ ] Otimizar vídeos
- [ ] Refatorar componentes grandes

---

## Métricas de Sucesso

| Métrica                  | Inicial | Atual | Meta |
| ------------------------ | ------- | ----- | ---- |
| Erros de lint            | 3       | 0 ✅  | 0    |
| Itens críticos           | 3       | 0 ✅  | 0    |
| Itens importantes        | 8       | 3     | 0    |
| Cobertura de testes      | ~5%     | ~5%   | >60% |
| Bundle size (sem vídeos) | ~29MB   | ~29MB | <5MB |
| Lighthouse Performance   | ?       | ?     | >90  |
| Arquivos >500 linhas     | 2       | 2     | 0    |

---

_Documento gerado automaticamente. Revisar e priorizar conforme necessidade do negócio._
