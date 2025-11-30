# Relatório de Performance v2 - Harpia Agência

**Data:** 29/11/2025
**URL:** https://agenciaharpia.com.br
**Dispositivo:** Desktop
**Ferramenta:** PageSpeed Insights (Lighthouse 13.0.1)

---

## Resumo Executivo

| Categoria           | Score | Status |
| ------------------- | ----- | ------ |
| **Performance**     | 49    | 🔴     |
| **Acessibilidade**  | 85    | 🟠     |
| **Práticas Recom.** | 96    | 🟢     |
| **SEO**             | 100   | 🟢     |

### Core Web Vitals

| Métrica | Valor     | Meta    | Status |
| ------- | --------- | ------- | ------ |
| **FCP** | 0,4s      | < 1,8s  | ✅     |
| **LCP** | 1,0s      | < 2,5s  | ✅     |
| **TBT** | 460ms     | < 200ms | 🔴     |
| **CLS** | **0.783** | < 0,1   | 🔴     |
| **SI**  | 2,5s      | < 3,4s  | 🟠     |

---

## Problema Crítico: CLS de 0.783

O **Cumulative Layout Shift (CLS)** está em 0.783, quando o ideal é **< 0.1**. Isso significa que elementos visuais estão se movendo significativamente durante o carregamento da página.

### Impacto

- **Google Ranking**: CLS é um Core Web Vital e afeta diretamente o SEO
- **UX**: Usuários podem clicar em elementos errados quando o layout muda
- **Bounce Rate**: Páginas instáveis aumentam a taxa de rejeição

---

## Causas Identificadas

### 1. Imagens sem Dimensões Explícitas

Quando imagens não têm `width` e `height` definidos, o navegador não reserva espaço para elas, causando layout shift quando carregam.

#### Arquivos Afetados:

| Arquivo                                     | Linha | Problema              | Prioridade |
| ------------------------------------------- | ----- | --------------------- | ---------- |
| `src/components/Navbar.tsx`                 | 73    | Logo sem width/height | 🔴 CRÍTICA |
| `src/components/Footer.tsx`                 | 80-84 | Logo sem width/height | 🟠 ALTA    |
| `src/components/ui/OptimizedImage.tsx`      | -     | Não exige dimensões   | 🔴 CRÍTICA |
| `src/components/services/ServiceDetail.tsx` | 88    | Imagem sem dimensões  | 🟠 ALTA    |
| `src/pages/PortfolioDetail.tsx`             | 516   | Imagem sem dimensões  | 🟠 ALTA    |

#### Código Problemático - Navbar (linha 73):

```tsx
// ❌ ERRADO - Causa CLS
<img src="/harpia-logo.webp" alt="Harpia Logo" className="h-6 sm:h-7 md:h-8 w-auto" />

// ✅ CORRETO - Previne CLS
<img
  src="/harpia-logo.webp"
  alt="Harpia Logo"
  width={120}
  height={32}
  className="h-6 sm:h-7 md:h-8 w-auto"
/>
```

### 2. OptimizedImage sem Dimensões Obrigatórias

O componente `OptimizedImage` aceita qualquer prop via spread, mas não exige `width` e `height`:

```tsx
// src/components/ui/OptimizedImage.tsx
interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  // ❌ width e height não são obrigatórios
}
```

### 3. Containers sem Aspect Ratio Fixo

Imagens em grids e cards não têm containers com aspect-ratio definido, permitindo que o layout mude quando as imagens carregam.

---

## Outros Problemas Identificados

### Total Blocking Time (TBT) - 460ms

**Causa:** 3 tarefas longas na thread principal

**Arquivos suspeitos:**

- JavaScript não utilizado (87 KiB podem ser removidos)
- Possíveis imports desnecessários

### Payload de Rede Grande - 10.828 KiB

**Causas potenciais:**

- Imagens não otimizadas
- Vídeos pesados
- Bundle JS grande

### Render-Blocking Resources

**Economia estimada:** 170ms

**Possíveis causas:**

- CSS crítico não inline
- Fontes bloqueando render

---

## Problemas de Acessibilidade (Score: 85)

| Problema                             | Impacto |
| ------------------------------------ | ------- |
| Elementos ARIA com roles inválidos   | Alto    |
| Áreas de toque muito pequenas        | Médio   |
| Vídeos sem legendas (`<track>`)      | Médio   |
| Links idênticos com mesma finalidade | Baixo   |

---

## Problemas de Segurança (Práticas Recomendadas: 96)

| Header Faltando               | Risco |
| ----------------------------- | ----- |
| CSP (Content Security Policy) | Alto  |
| HSTS forte                    | Médio |
| COOP                          | Baixo |
| Erros no console              | Baixo |

---

# Checklist de Correções

## Prioridade 🔴 CRÍTICA (Fazer Primeiro)

- [x] **Navbar.tsx:73** - Adicionar `width={180} height={32}` no logo ✅ _Concluído em 29/11/2025_
- [x] **OptimizedImage.tsx** - Adicionar suporte a `aspectRatio` para prevenir CLS ✅ _Concluído em 29/11/2025_
- [x] **Footer.tsx:80** - Adicionar `width={180} height={32}` no logo ✅ _Concluído em 29/11/2025_

## Prioridade 🟠 ALTA (Fazer em Seguida)

- [x] **ServiceDetail.tsx:88** - Adicionar dimensões na imagem (800x600) ✅ _Concluído em 29/11/2025_
- [x] **PortfolioDetail.tsx:516** - Adicionar dimensões na imagem (1200x800) ✅ _Concluído em 29/11/2025_
- [ ] **ClientLogos.tsx** - Verificar se OptimizedImage tem dimensões
- [ ] **PortfolioPreview.tsx** - Verificar containers com aspect-ratio
- [ ] **CTASection.tsx** - Verificar imagem de background
- [ ] **Showreel.tsx** - Verificar imagem de background

## Prioridade 🟡 MÉDIA (Otimizações)

- [ ] Analisar e remover JavaScript não utilizado (87 KiB)
- [ ] Verificar imports desnecessários nos componentes
- [ ] Otimizar tamanho das imagens (meta: < 5MB total)
- [ ] Implementar code splitting mais agressivo

## Prioridade 🟢 BAIXA (Melhorias)

- [ ] Adicionar CSP header no .htaccess
- [ ] Configurar HSTS forte
- [ ] Adicionar legendas nos vídeos
- [ ] Corrigir ARIA roles inválidos
- [ ] Aumentar áreas de toque em mobile

---

# Plano de Ação Detalhado

## Fase 1: Correção de CLS (Crítico) ✅ CONCLUÍDA

> **Status:** ✅ Concluída em 29/11/2025
> **Impacto esperado:** CLS deve cair de 0.783 para ~0.1

### Tarefa 1.1: Corrigir Logo do Navbar ✅

**Arquivo:** `src/components/Navbar.tsx`
**Linha:** 73

```tsx
// ✅ APLICADO:
<img
  src="/harpia-logo.webp"
  alt="Harpia Logo"
  width={180}
  height={32}
  className="h-6 sm:h-7 md:h-8 w-auto"
/>
```

### Tarefa 1.2: Corrigir Logo do Footer ✅

**Arquivo:** `src/components/Footer.tsx`
**Linhas:** 80-87

```tsx
// ✅ APLICADO:
<img
  src="/harpia-logo.webp"
  alt="Harpia Logo"
  width={180}
  height={32}
  loading="lazy"
  className="h-6 sm:h-7 md:h-8 w-auto group-hover:opacity-70 transition-opacity"
/>
```

### Tarefa 1.3: Atualizar OptimizedImage ✅

**Arquivo:** `src/components/ui/OptimizedImage.tsx`

Implementada **Opção B** - Suporte a `aspectRatio`:

```tsx
interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: string; // "16/9", "4/3", "1/1"
  containerClassName?: string;
}
```

Agora o componente pode ser usado de duas formas:

1. Com `width` e `height` explícitos
2. Com `aspectRatio` para reservar espaço automaticamente

### Tarefa 1.4: Corrigir ServiceDetail.tsx ✅

**Arquivo:** `src/components/services/ServiceDetail.tsx`
**Linha:** 88-95

```tsx
// ✅ APLICADO:
<img
  src={`${service.image}?grayscale`}
  alt={service.title}
  width={800}
  height={600}
  loading="lazy"
  className="..."
/>
```

### Tarefa 1.5: Corrigir PortfolioDetail.tsx ✅

**Arquivo:** `src/pages/PortfolioDetail.tsx`
**Linha:** 516-523

```tsx
// ✅ APLICADO:
<img
  src={project.gallery[lightboxIndex]}
  alt={`${project.title} - Imagem ${lightboxIndex + 1}`}
  width={1200}
  height={800}
  loading="lazy"
  className="..."
/>
```

---

## Fase 2: Correção de TBT

### Tarefa 2.1: Analisar bundle JS

```bash
npm run build -- --analyze
# ou
npx vite-bundle-visualizer
```

### Tarefa 2.2: Identificar código não utilizado

Usar Chrome DevTools > Coverage para identificar JS/CSS não utilizados.

### Tarefa 2.3: Lazy load de componentes pesados

```tsx
// Exemplo de lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

---

## Fase 3: Otimização de Rede

### Tarefa 3.1: Auditar tamanho das imagens

```bash
# Listar imagens por tamanho
find public -type f \( -name "*.webp" -o -name "*.jpg" -o -name "*.png" \) -exec ls -lh {} \;
```

### Tarefa 3.2: Comprimir imagens grandes

```bash
# Usando sharp ou squoosh
npx @squoosh/cli --webp auto public/*.jpg
```

### Tarefa 3.3: Verificar vídeos

- video-hero.mp4 - verificar tamanho e compressão
- video.mp4 (showreel) - verificar tamanho

---

## Fase 4: Segurança e Headers

### Tarefa 4.1: Adicionar CSP ao .htaccess

```apache
# Em guide/HOSTINGER_DEPLOY.md - adicionar ao .htaccess
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com;"
```

### Tarefa 4.2: HSTS

```apache
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

---

## Fase 5: Acessibilidade

### Tarefa 5.1: Corrigir ARIA roles

Usar axe DevTools ou Lighthouse para identificar elementos específicos.

### Tarefa 5.2: Aumentar áreas de toque

Mínimo recomendado: 48x48px para elementos clicáveis em mobile.

### Tarefa 5.3: Adicionar legendas em vídeos

```tsx
<video>
  <source src="/video.mp4" type="video/mp4" />
  <track kind="captions" src="/captions.vtt" srcLang="pt-BR" label="Português" />
</video>
```

---

# Métricas Esperadas Após Correções

| Métrica | Atual | Meta    | Impacto |
| ------- | ----- | ------- | ------- |
| CLS     | 0.783 | < 0.1   | +25 pts |
| TBT     | 460ms | < 200ms | +10 pts |
| Score   | 49    | 85+     | 🎯      |

---

# Comandos Úteis

```bash
# Rodar análise de performance local
npm run build && npx serve dist

# Lighthouse CLI
npx lighthouse https://agenciaharpia.com.br --view

# Verificar dimensões de imagem
npx sharp-cli info public/harpia-logo.webp

# Analisar bundle
npx vite-bundle-visualizer
```

---

# Próximos Passos

1. ✅ Documento criado
2. ✅ Implementar Fase 1 (CLS) - **CONCLUÍDA**
3. ⏳ Re-testar no PageSpeed após deploy
4. ⏳ Implementar Fase 2 (TBT) - Aguardando aprovação
5. ⏳ Implementar Fases 3-5 conforme prioridade
6. ⏳ Monitorar métricas no Search Console

---

# Histórico de Alterações

| Data       | Fase | Descrição                                   |
| ---------- | ---- | ------------------------------------------- |
| 29/11/2025 | 1    | ✅ Corrigido logo Navbar (width/height)     |
| 29/11/2025 | 1    | ✅ Corrigido logo Footer (width/height)     |
| 29/11/2025 | 1    | ✅ OptimizedImage com suporte a aspectRatio |
| 29/11/2025 | 1    | ✅ ServiceDetail.tsx com dimensões          |
| 29/11/2025 | 1    | ✅ PortfolioDetail.tsx com dimensões        |

---

**Autor:** Claude Code
**Última atualização:** 29/11/2025
