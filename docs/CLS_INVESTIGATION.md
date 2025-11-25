# Investigação CLS (Cumulative Layout Shift) - Harpia

## Resultado do PageSpeed Insights

| Métrica     | Valor     | Status         | Meta    |
| ----------- | --------- | -------------- | ------- |
| FCP         | 0,4s      | 🟢 Excelente   | < 1.8s  |
| LCP         | 0,5s      | 🟢 Excelente   | < 2.5s  |
| TBT         | 340ms     | 🟡 Médio       | < 200ms |
| **CLS**     | **0.785** | 🔴 **Crítico** | < 0.1   |
| Speed Index | 2,3s      | 🟡 Médio       | < 3.4s  |
| Score       | 57        | 🟡 Médio       | > 90    |

**Problema Principal**: CLS de 0.785 é 7.85x maior que o limite aceitável (0.1).

---

## O que é CLS?

CLS mede a estabilidade visual da página. Um CLS alto significa que elementos estão "pulando" ou mudando de posição durante o carregamento, causando má experiência para o usuário.

**Fórmula**: CLS = (fração do viewport impactada) × (distância do movimento)

---

## Causas Identificadas

### 1. 🔴 Componente `Reveal` - translate-y-12 (PRINCIPAL CAUSA)

**Arquivo**: `src/components/Reveal.tsx`

**Problema**: O componente usa `translate-y-12` (48px) como estado inicial, fazendo todos os elementos começarem 48px abaixo da posição final.

```tsx
// Linha 36-37
className={`... ${
  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'  // ← CAUSA CLS
}`}
```

**Impacto**: ALTO - Este componente é usado em praticamente toda a página:

- Hero (5 instâncias)
- CTASection
- ClientLogos (10+ instâncias)
- Showreel (4 instâncias)
- Cada seção da home

**Por que causa CLS**: Mesmo com `opacity-0`, o elemento ainda ocupa espaço no DOM. Quando a animação dispara, o translate muda e o browser recalcula o layout.

---

### 2. 🟡 Preloader com overflow:hidden no body

**Arquivo**: `src/components/Preloader.tsx`

**Problema**: O Preloader bloqueia o scroll e pode causar recálculo de layout quando liberado.

```tsx
// Linhas 18, 24, 31
document.body.style.overflow = 'hidden';
document.body.style.overflow = 'unset';
```

**Impacto**: MÉDIO - Pode causar CLS quando o overflow é liberado e elementos que dependem de viewport height são recalculados.

---

### 3. 🟡 Imagens sem dimensões explícitas

**Arquivo**: `src/components/ui/OptimizedImage.tsx`

**Problema**: O componente não força `width` e `height` nas imagens.

```tsx
// O componente aceita props mas não garante dimensões
<img
  src={imgSrc}
  alt={alt}
  loading="lazy"
  // ← Sem width/height obrigatórios
  {...props}
/>
```

**Impacto**: MÉDIO - Imagens lazy-loaded podem causar shift quando carregam.

**Locais afetados**:

- `ClientLogos.tsx` - 10 logos
- `CTASection.tsx` - 1 imagem de fundo

---

### 4. 🟡 Logo da Navbar sem dimensões fixas

**Arquivo**: `src/components/Navbar.tsx`

**Problema**:

```tsx
// Linha 104
<img src="/harpia-logo.png" alt="Harpia Logo" className="h-8 w-auto" />
```

O `w-auto` pode causar CLS enquanto a imagem carrega, pois a largura não é conhecida até o load.

**Impacto**: BAIXO - Apenas 1 elemento, mas está no topo da página (área crítica para CLS).

---

### 5. 🟢 font-display: swap nas fontes

**Arquivo**: `src/index.css`

**Status**: Já implementado corretamente.

```css
font-display: swap;
```

**Nota**: `swap` pode causar FOUT (Flash of Unstyled Text), mas não deveria causar CLS significativo se as fontes têm métricas similares. As fontes Dosis e Silk Serif têm métricas diferentes da system font, então pode haver algum shift mínimo.

---

### 6. 🟢 Vídeo do Hero com poster

**Arquivo**: `src/components/Hero.tsx`

**Status**: Já implementado corretamente.

```tsx
poster = 'data:image/svg+xml,...';
className = 'w-full h-full object-cover';
```

O poster inline e `object-cover` dentro de container `h-screen` previne CLS do vídeo.

---

## Plano de Correção

### Fase 1 - Correções Críticas (CLS) ✅ CONCLUÍDA

| #   | Tarefa                          | Arquivo           | Segurança | Impacto CLS | Status   |
| --- | ------------------------------- | ----------------- | --------- | ----------- | -------- |
| 1.1 | Remover `translate-y` do Reveal | `Reveal.tsx`      | 🟢 SEGURO | -0.4 a -0.6 | ✅ Feito |
| 1.2 | Adicionar dimensões aos logos   | `ClientLogos.tsx` | 🟢 SEGURO | -0.05       | ✅ Feito |
| 1.3 | Fixar dimensões do logo Navbar  | `Navbar.tsx`      | 🟢 SEGURO | -0.02       | ✅ Feito |

### Fase 2 - Correções Médias (TBT/CLS)

| #   | Tarefa                              | Arquivo         | Segurança | Impacto   |
| --- | ----------------------------------- | --------------- | --------- | --------- |
| 2.1 | Otimizar transição do Preloader     | `Preloader.tsx` | 🟡 TESTAR | -0.05 CLS |
| 2.2 | Adicionar `will-change` estratégico | Vários          | 🟢 SEGURO | -50ms TBT |

### Fase 3 - Melhorias Opcionais

| #   | Tarefa                      | Arquivo        | Segurança | Impacto    |
| --- | --------------------------- | -------------- | --------- | ---------- |
| 3.1 | Preload da fonte Silk Serif | `index.html`   | 🟢 SEGURO | -FOUT      |
| 3.2 | Lazy load do Showreel       | `Showreel.tsx` | 🟡 TESTAR | -100ms TBT |

---

## Detalhamento das Correções

### 1.1 Remover translate-y do Reveal (PRIORIDADE MÁXIMA) ✅ IMPLEMENTADO

**Antes**:

```tsx
className={`... ${
  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
}`}
```

**Implementado** (Opção A - Apenas fade):

```tsx
className={`transition-opacity duration-1000 ease-out h-full ${
  isVisible ? 'opacity-100' : 'opacity-0'
}`}
```

**Segurança**: 🟢 SEGURO

- Não afeta funcionalidade
- Apenas muda o efeito visual de entrada
- Pode ser revertido facilmente
- A animação ainda funcionará, apenas diferente

**Trade-off**: Perde o efeito de "slide up" nas animações, mas elimina a maior causa de CLS.

**Data da implementação**: 2025-11-25

---

### 1.2 Adicionar dimensões aos logos ✅ IMPLEMENTADO

**Antes**:

```tsx
<OptimizedImage
  src={client.image}
  alt={client.name}
  className="max-w-full max-h-full object-contain"
/>
```

**Implementado**:

```tsx
<OptimizedImage
  src={client.image}
  alt={client.name}
  className="max-w-full max-h-full object-contain"
  width={150}
  height={80}
  loading="lazy"
/>
```

**Segurança**: 🟢 SEGURO

- Não muda aparência visual
- Apenas reserva espaço antes do load

**Data da implementação**: 2025-11-25

---

### 1.3 Fixar dimensões do logo Navbar ✅ IMPLEMENTADO

**Antes**:

```tsx
<img src="/harpia-logo.png" alt="Harpia Logo" className="h-8 w-auto" />
```

**Implementado**:

```tsx
<img src="/harpia-logo.png" alt="Harpia Logo" className="h-8" width={120} height={32} />
```

**Segurança**: 🟢 SEGURO

- Dimensões baseadas no tamanho real do logo
- Previne layout shift durante load

**Data da implementação**: 2025-11-25

---

### 2.1 Otimizar transição do Preloader

**Análise**: O Preloader atual usa box-shadow massivo que pode causar repaint caro.

**Sugestão**: Adicionar `contain: strict` ou `will-change: transform` para isolar o repaint.

**Segurança**: 🟡 TESTAR

- Pode afetar a animação em alguns browsers
- Testar em Chrome, Firefox, Safari

---

## Impacto Esperado

| Métrica | Atual | Após Fase 1 | Após Fase 2 |
| ------- | ----- | ----------- | ----------- |
| CLS     | 0.785 | ~0.15       | ~0.05       |
| TBT     | 340ms | 340ms       | ~250ms      |
| Score   | 57    | ~75         | ~85         |

---

## Ordem de Implementação Recomendada

```
┌─────────────────────────────────────────────────────────────┐
│  FASE 1 - ✅ CONCLUÍDA (2025-11-25)                         │
├─────────────────────────────────────────────────────────────┤
│  ✅ 1.1 Alterar Reveal.tsx - remover translate-y            │
│  ✅ 1.2 Adicionar dimensões aos logos em ClientLogos.tsx    │
│  ✅ 1.3 Fixar dimensões do logo na Navbar.tsx               │
│                                                             │
│  Impacto esperado: CLS de 0.785 → ~0.15                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  ⏳ TESTAR NO PAGESPEED                                     │
│  Validar melhoria antes de prosseguir                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  FASE 2 - Implementar se necessário (🟡 Testar)             │
├─────────────────────────────────────────────────────────────┤
│  2.1 Otimizar Preloader                                     │
│  2.2 Adicionar will-change estratégico                      │
│                                                             │
│  Tempo estimado: ~20 min                                    │
│  Impacto: CLS de ~0.15 → ~0.05                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Comandos para Implementação

| Comando                                | Descrição                      |
| -------------------------------------- | ------------------------------ |
| "execute a fase 1 do plano CLS"        | Aplica correções 1.1, 1.2, 1.3 |
| "corrija o Reveal para não causar CLS" | Aplica apenas 1.1              |
| "adicione dimensões às imagens"        | Aplica 1.2 e 1.3               |

---

## Referências

- [Web Vitals - CLS](https://web.dev/cls/)
- [Debugging Layout Shifts](https://web.dev/debug-layout-shifts/)
- [Optimize CLS](https://web.dev/optimize-cls/)

---

**Criado em**: 2025-11-25
**Baseado em**: PageSpeed Insights - Score 57, CLS 0.785

---

## Histórico de Implementação

| Data       | Fase   | Tarefas       | Status       |
| ---------- | ------ | ------------- | ------------ |
| 2025-11-25 | Fase 1 | 1.1, 1.2, 1.3 | ✅ Concluída |

**Próximo passo**: Testar no PageSpeed Insights para validar melhoria do CLS.
