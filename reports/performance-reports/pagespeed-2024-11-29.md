# Relatório PageSpeed - agenciaharpia.com.br

**Data**: 29/11/2025
**URL**: https://agenciaharpia.com.br/
**Última atualização**: 29/11/2025 23:15

---

## Pontuações (antes das correções)

| Categoria             | Mobile | Desktop |
| --------------------- | ------ | ------- |
| Desempenho            | 67     | 66      |
| Acessibilidade        | 85     | 85      |
| Práticas Recomendadas | 92     | 92      |
| SEO                   | 92     | 92      |

---

## Core Web Vitals

| Métrica | Mobile | Desktop | Meta    | Status     |
| ------- | ------ | ------- | ------- | ---------- |
| FCP     | 1,5s   | 0,4s    | < 1,8s  | ✅ OK      |
| LCP     | 2,9s   | 0,7s    | < 2,5s  | ✅ OK      |
| TBT     | 30ms   | 180ms   | < 200ms | ✅ OK      |
| CLS     | 0,736  | 0,786   | < 0,1   | ❌ CRÍTICO |
| SI      | 5,5s   | 2,3s    | < 3,4s  | ⚠️ ATENÇÃO |

---

## Checklist de Correções

### 1. CLS - PRIORIDADE ALTA

#### OptimizedImage (obrigatório width/height)

- [x] Tornar `width` e `height` props obrigatórias no OptimizedImage
- [x] Aplicar `width` e `height` diretamente na tag `<img>`
- [x] Adicionar estilo inline `aspect-ratio` baseado em width/height

#### PortfolioPreview

- [x] Adicionar `width` e `height` em cada OptimizedImage do grid

#### Containers de aspect-ratio

- [x] Verificar se todos os containers de imagem têm `aspect-ratio` definido
- [x] Hero video container já usa `aspect-video` ✅

### 2. Imagens - PRIORIDADE MÉDIA

#### Revisar todas as imagens

- [x] `src/pages/PortfolioDetail.tsx` - dimensões adicionadas (1200x514 e 800x600)
- [x] `src/components/services/ServiceDetail.tsx` - não usa OptimizedImage
- [x] `src/components/ServicesHub.tsx` - dimensões adicionadas (600x400)
- [x] `src/pages/VisualGovernance.tsx` - apenas documentação, não usa

### 3. Vídeos - OK ✅

- [x] Hero.tsx: tem `poster` e `preload="metadata"` ✅
- [x] Showreel.tsx: tem `poster` e `preload="metadata"` ✅
- [x] LazyVideo.tsx: componente dedicado ✅

### 4. Fontes - OK ✅

- [x] Preload configurado no index.html ✅
- [x] font-display apropriado ✅

### 5. robots.txt

- [x] Corrigir ordem das diretivas (Disallow antes de Allow)
- [ ] Fazer deploy e testar em Google Search Console

### 6. Acessibilidade

- [ ] Corrigir ARIA roles inválidos
- [ ] Aumentar áreas de toque para mínimo 48x48px
- [ ] Adicionar `<track kind="captions">` nos vídeos

### 7. Segurança

- [ ] Habilitar HSTS no Cloudflare ou .htaccess
- [ ] Revisar CSP headers

---

## Correções Implementadas

### 1. OptimizedImage.tsx ✅

**Arquivo**: `src/components/ui/OptimizedImage.tsx`

Alterações:

- `width` e `height` agora são props **obrigatórias**
- Aplica `width` e `height` diretamente na tag `<img>`
- Calcula `aspect-ratio` automaticamente se não fornecido
- Mantém compatibilidade com `aspectRatio` e `containerClassName`

```tsx
interface OptimizedImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src: string;
  alt: string;
  width: number; // OBRIGATÓRIO
  height: number; // OBRIGATÓRIO
  fallback?: string;
  aspectRatio?: string;
  containerClassName?: string;
}
```

### 2. PortfolioPreview.tsx ✅

**Arquivo**: `src/components/PortfolioPreview.tsx:193-201`

```tsx
<OptimizedImage
  src={project.image}
  alt={`${project.title} - Projeto de ${project.category}`}
  width={800}
  height={600}
  className="..."
/>
```

### 3. PortfolioDetail.tsx ✅

**Arquivo**: `src/pages/PortfolioDetail.tsx:443-449`

```tsx
<OptimizedImage
  src={image}
  alt={`${project.title} - Imagem ${idx + 1}`}
  width={idx === 0 ? 1200 : 800}
  height={idx === 0 ? 514 : 600}
  className="..."
/>
```

### 4. ServicesHub.tsx ✅

**Arquivo**: `src/components/ServicesHub.tsx:40-48`

```tsx
<OptimizedImage
  src={service.image}
  alt={`${service.title} - Serviço da Harpia Agência`}
  width={600}
  height={400}
  className="..."
/>
```

### 5. robots.txt ✅

**Arquivo**: `scripts/build-sitemap.js:137-146`

Corrigido a ordem das diretivas - `Disallow` agora vem primeiro:

```txt
User-agent: *
Disallow: /404

Sitemap: https://agenciaharpia.com.br/sitemap.xml
```

---

## Arquivos Modificados

| Arquivo                                | Status | Alteração                           |
| -------------------------------------- | ------ | ----------------------------------- |
| `src/components/ui/OptimizedImage.tsx` | ✅     | width/height obrigatórios           |
| `src/components/PortfolioPreview.tsx`  | ✅     | Adicionado width={800} height={600} |
| `src/pages/PortfolioDetail.tsx`        | ✅     | Adicionado dimensões dinâmicas      |
| `src/components/ServicesHub.tsx`       | ✅     | Adicionado width={600} height={400} |
| `scripts/build-sitemap.js`             | ✅     | Corrigido ordem robots.txt          |

---

## Próximos Passos

1. **Deploy**: Fazer build e deploy para produção
2. **Testar**: Rodar novo PageSpeed após deploy
3. **Acessibilidade**: Corrigir ARIA roles e áreas de toque
4. **Segurança**: Configurar HSTS no Cloudflare

---

## Comandos

```bash
# Build de produção
npm run build

# Testar localmente
npm run preview

# Análise PageSpeed pós-deploy
# https://pagespeed.web.dev/analysis?url=https://agenciaharpia.com.br/
```

---

## Impacto Estimado

| Correção                   | Impacto no CLS |
| -------------------------- | -------------- |
| width/height obrigatório   | -0.3 a -0.5    |
| aspect-ratio em containers | -0.1 a -0.2    |

**Meta**: Reduzir CLS de 0.78 para < 0.1

---

## Histórico

| Data       | Ação                                         |
| ---------- | -------------------------------------------- |
| 29/11/2025 | Análise inicial - CLS 0.78                   |
| 29/11/2025 | Implementadas correções de CLS e robots.txt  |
| 29/11/2025 | Deploy realizado via FTP para Hostinger      |
| 29/11/2025 | Site verificado em produção - funcionando ✅ |

---

## Status do Deploy

**Data**: 29/11/2025 ~23:30
**Status**: ✅ Concluído

### Arquivos deployados:

- `index.html` - Página principal
- `robots.txt` - Diretivas para crawlers
- `sitemap.xml` - Mapa do site
- `assets/` - 23 arquivos (JS/CSS bundles)

### Verificações:

- [x] Site acessível em https://agenciaharpia.com.br
- [x] Página de portfolio carregando corretamente
- [x] robots.txt acessível e com formato correto
- [ ] Aguardar propagação de cache CDN (até 24h)
- [ ] Executar novo PageSpeed para validar CLS < 0.1
