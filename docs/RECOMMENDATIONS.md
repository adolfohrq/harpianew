# Recomendações para o Projeto Harpia

> Documento gerado em 26/11/2025 após análise completa do codebase.

---

## Sumário Executivo

| Categoria    | Crítico | Importante | Melhoria |
| ------------ | ------- | ---------- | -------- |
| Segurança    | 2       | 0          | 0        |
| Código       | 1       | 4          | 3        |
| Testes       | 0       | 1          | 2        |
| Performance  | 0       | 2          | 2        |
| Documentação | 0       | 1          | 1        |
| **Total**    | **3**   | **8**      | **8**    |

---

## 🔴 Críticos (Fixar Imediatamente)

### 1. Arquivos sensíveis commitados no repositório

**Problema:** Arquivos que não devem estar no controle de versão foram commitados.

**Arquivos afetados:**

- `dist.zip` (29MB) - build compactado
- `.env.local` - contém `GEMINI_API_KEY` exposta
- `.playwright-mcp/` - pasta de cache do Playwright
- `lint-results.json`, `test-results.json` - arquivos temporários

**Solução:**

```bash
# Adicionar ao .gitignore
echo "dist.zip" >> .gitignore
echo ".env.local" >> .gitignore
echo ".playwright-mcp/" >> .gitignore
echo "lint-results.json" >> .gitignore
echo "test-results.json" >> .gitignore
echo ".claude/settings.local.json" >> .gitignore

# Remover do histórico (CUIDADO: reescreve histórico)
git rm --cached dist.zip .env.local .playwright-mcp/ lint-results.json test-results.json
git commit -m "chore: remove arquivos sensíveis do repositório"
```

**⚠️ IMPORTANTE:** A API key em `.env.local` foi exposta. Recomendo invalidá-la e gerar uma nova.

---

### 2. Erros de Lint em useAnalytics.ts

**Problema:** 3 erros de Prettier não corrigidos.

**Arquivo:** [src/hooks/useAnalytics.ts](src/hooks/useAnalytics.ts#L64-L72)

**Solução:**

```bash
npm run format
```

---

### 3. VisualGovernance.tsx não deve estar em produção

**Problema:** Arquivo de 2018 linhas que é uma página de testes/documentação visual, não uma página real do site.

**Arquivo:** [src/pages/VisualGovernance.tsx](src/pages/VisualGovernance.tsx)

**Opções:**

1. **Mover para pasta de documentação:** `docs/examples/VisualGovernance.tsx`
2. **Remover da build de produção:** Adicionar rota apenas em desenvolvimento
3. **Dividir em componentes menores:** Se for manter, extrair sub-componentes

---

## ⚠️ Importantes (Próxima Sprint)

### 4. Duplicação de ícones sociais

**Problema:** Instagram e WhatsApp icons implementados em 2 lugares diferentes.

**Arquivos afetados:**

- [src/components/Navbar.tsx](src/components/Navbar.tsx)
- [src/components/Footer.tsx](src/components/Footer.tsx)

**Solução:** Criar componentes reutilizáveis:

```tsx
// src/components/ui/icons/SocialIcons.tsx
export const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} ...>...</svg>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} ...>...</svg>
);
```

---

### 5. SEO incompleto em PortfolioDetail

**Problema:** Página não usa `useStructuredData` para schema de projeto.

**Arquivo:** [src/pages/PortfolioDetail.tsx](src/pages/PortfolioDetail.tsx)

**Solução:** Adicionar structured data para cada projeto:

```tsx
import {
  useStructuredData,
  HARPIA_ORGANIZATION,
  createPortfolioSchema,
} from '@/hooks/useStructuredData';

// Dentro do componente
useStructuredData([
  HARPIA_ORGANIZATION,
  createPortfolioSchema(project.title, project.description, project.slug),
]);
```

---

### 6. Cobertura de testes muito baixa

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

### 7. GA4 hardcoded no HTML

**Problema:** ID do Google Analytics está fixo no código.

**Arquivo:** [index.html](index.html#L34)

**Solução:**

```html
<!-- Usar variável de ambiente -->
<script>
  window.GA_ID = '%VITE_GA_ID%';
</script>
```

E no `.env`:

```env
VITE_GA_ID=G-XXXXXXXXXX
```

---

### 8. PORTFOLIO_PROJECTS pode desincronizar

**Problema:** Projetos duplicados em 2 lugares:

- `src/config/seo.config.ts` (4 projetos hardcoded)
- `src/data/projects.ts` (lista completa)

**Solução:** Unificar fonte de dados:

```typescript
// seo.config.ts
import { PROJECTS } from '@/data/projects';

export const PORTFOLIO_PROJECTS = PROJECTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  lastModified: p.lastModified || new Date().toISOString(),
}));
```

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

- [ ] Remover arquivos sensíveis do git
- [ ] Atualizar `.gitignore`
- [ ] Invalidar e regenerar API key exposta
- [ ] Executar `npm run format`
- [ ] Decidir destino de VisualGovernance

### Fase 2 - Importantes (Esta Semana)

- [ ] Extrair ícones sociais em componentes
- [ ] Adicionar `useStructuredData` em PortfolioDetail
- [ ] Mover GA4 ID para variável de ambiente
- [ ] Unificar PORTFOLIO_PROJECTS com projects.ts

### Fase 3 - Melhorias (Este Mês)

- [ ] Adicionar testes para hooks principais
- [ ] Implementar validação com Zod
- [ ] Otimizar vídeos
- [ ] Refatorar componentes grandes

---

## Métricas de Sucesso

| Métrica                  | Atual | Meta |
| ------------------------ | ----- | ---- |
| Erros de lint            | 3     | 0    |
| Cobertura de testes      | ~5%   | >60% |
| Bundle size (sem vídeos) | ~29MB | <5MB |
| Lighthouse Performance   | ?     | >90  |
| Arquivos >500 linhas     | 2     | 0    |

---

_Documento gerado automaticamente. Revisar e priorizar conforme necessidade do negócio._
