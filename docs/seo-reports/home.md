# Relatório SEO: Home

> **Última análise:** 26/11/2024 às 02:45
> **Score:** 88/100

## Resumo

| Categoria       | Status | Pontos |
| --------------- | ------ | ------ |
| Meta Tags       | ✅     | 23/25  |
| Structured Data | ✅     | 18/20  |
| SEO Config      | ✅     | 20/20  |
| Conteúdo        | ✅     | 17/20  |
| Boas Práticas   | ⚠️     | 10/15  |

## Detalhes da Análise

### Meta Tags

| Item               | Valor                                                                                            | Status                   |
| ------------------ | ------------------------------------------------------------------------------------------------ | ------------------------ |
| **Title**          | "Harpia - Agência de Marketing Premium \| Conectando Visões"                                     | ⚠️ 58 chars (limite: 60) |
| **Description**    | "Somos uma agência de marketing especializada em criar pontes entre empresas e seus clientes..." | ✅ 152 chars             |
| **Keywords**       | "agência marketing, design digital, branding, estratégia, digital agency"                        | ✅ 5 keywords            |
| **Canonical**      | `https://agenciaharpia.com.br`                                                                   | ✅                       |
| **OG Title**       | "Harpia - Agência de Marketing Premium"                                                          | ✅                       |
| **OG Description** | "Conectando visões. Voando mais alto. Enxergando mais longe."                                    | ✅                       |
| **OG Image**       | `/og/home.jpg`                                                                                   | ✅                       |

### Structured Data

| Item                  | Status                                   |
| --------------------- | ---------------------------------------- |
| `HARPIA_ORGANIZATION` | ✅ Incluído                              |
| Schema `WebPage`      | ✅ Definido                              |
| URL no schema         | ✅ `https://agenciaharpia.com.br`        |
| Breadcrumb            | ❌ Não implementado (opcional para home) |

### SEO Config

| Item               | Valor    | Status    |
| ------------------ | -------- | --------- |
| `PAGE_SEO.home`    | Definido | ✅        |
| Sitemap priority   | `1.0`    | ✅ Máxima |
| Sitemap changefreq | `weekly` | ✅        |

### Conteúdo

| Item                 | Valor                                 | Status               |
| -------------------- | ------------------------------------- | -------------------- |
| **H1**               | "ENXERGUE MAIS LONGE. VOE MAIS ALTO." | ✅ Único e relevante |
| **Hierarquia**       | h1 (1)                                | ✅                   |
| **Vídeo background** | Com poster SVG                        | ✅ Otimizado         |
| **Links internos**   | `<Link>` do React Router              | ✅                   |
| **Aria labels**      | Não explícitos nos CTAs               | ⚠️                   |

## Problemas Encontrados

### 1. Keywords não usam config centralizada

**Arquivo:** `Home.tsx:25`

```tsx
// Atual
keywords: 'agência marketing, design digital, branding, estratégia, digital agency',

// Recomendado
import { PAGE_SEO, getKeywords } from '@/config/seo.config';
keywords: getKeywords(PAGE_SEO.home.keywords),
```

### 2. BASE_URL hardcoded

**Arquivo:** `Home.tsx:18`

```tsx
// Atual
const BASE_URL = 'https://agenciaharpia.com.br';

// Recomendado
import { COMPANY_INFO, getCanonicalUrl } from '@/config/seo.config';
canonical: getCanonicalUrl('/'),
```

### 3. Imports não usam path alias

**Arquivo:** `Home.tsx:2-16`

```tsx
// Atual
import { Testimonials } from '../components/Testimonials';

// Recomendado
import { Testimonials } from '@/components';
```

### 4. CTAs sem aria-label

**Arquivo:** `Hero.tsx:158-175`

```tsx
// Recomendado adicionar
<Link
  to="/servicos"
  aria-label="Ver nossos serviços de marketing digital"
>
```

## Pontos Positivos

- ✅ SEO bem implementado com hooks customizados
- ✅ Structured data com Organization + WebPage
- ✅ Configuração centralizada em `seo.config.ts`
- ✅ Sitemap com prioridade máxima para home
- ✅ H1 forte e relevante
- ✅ Vídeo com poster para carregamento rápido
- ✅ Links internos usando React Router

## Histórico de Análises

| Data             | Score  | Principais Mudanças                  |
| ---------------- | ------ | ------------------------------------ |
| 26/11/2024 02:45 | 88/100 | Reanálise - sem alterações no código |
| 26/11/2024 02:15 | 88/100 | Análise inicial                      |
