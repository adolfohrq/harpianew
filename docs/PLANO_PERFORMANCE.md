# Plano de Ação - Performance Harpia

## Resumo

| Executor | Tarefas | Tempo Estimado |
| -------- | ------- | -------------- |
| Claude   | 5       | ~10 min        |
| Você     | 4       | ~30-60 min     |

---

## Tarefas que o CLAUDE pode fazer

### 1. ✅ CSS Crítico Inline no index.html

**Arquivo**: `index.html`

**O que será feito**: Adicionar estilos inline para evitar flash de conteúdo sem estilo.

**Comando**: "faça a tarefa 1 do plano de performance"

---

### 2. ✅ Remover Prefetch Ineficaz

**Arquivo**: `index.html`

**O que será feito**: Remover as tags `<link rel="prefetch">` que não funcionam com SPA.

**Comando**: "faça a tarefa 2 do plano de performance"

---

### 3. ✅ Otimizar vite.config.ts

**Arquivo**: `vite.config.ts`

**O que será feito**: Adicionar configuração de chunks para separar vendor e icons.

**Comando**: "faça a tarefa 3 do plano de performance"

---

### 4. ✅ Atualizar Referências de Fonte para WOFF2

**Arquivo**: `src/index.css`

**O que será feito**: Atualizar os `@font-face` para usar WOFF2 em vez de OTF.

**Pré-requisito**: Você precisa converter as fontes primeiro (tarefa 1 do seu lado).

**Comando**: "faça a tarefa 4 do plano de performance"

---

### 5. ✅ Verificar Pesos de Fonte Usados

**Arquivos**: Todo o projeto

**O que será feito**: Buscar quais pesos de fonte (font-weight) estão sendo usados para identificar quais podem ser removidos.

**Comando**: "faça a tarefa 5 do plano de performance"

---

## Tarefas que VOCÊ precisa fazer

### 1. 📁 Converter Fontes OTF para WOFF2

**Por que você**: Requer ferramenta externa e acesso aos arquivos de fonte.

**Passos**:

1. Acesse https://cloudconvert.com/otf-to-woff2
2. Faça upload de cada fonte em `public/fonts/dosis/` e `public/fonts/silk-serif/`
3. Baixe as versões WOFF2
4. Coloque na mesma pasta das fontes originais
5. Me avise quando terminar para eu atualizar o CSS

**Fontes a converter** (21 arquivos):

```
public/fonts/dosis/
├── Dosis-ExtraLight.otf → .woff2
├── Dosis-Light.otf → .woff2
├── Dosis-Regular.otf → .woff2
├── Dosis-Medium.otf → .woff2
├── Dosis-SemiBold.otf → .woff2
├── Dosis-Bold.otf → .woff2
└── Dosis-ExtraBold.otf → .woff2

public/fonts/silk-serif/
├── Silk Serif ExtraLight.otf → .woff2
├── Silk Serif ExtraLight Italic.otf → .woff2
├── Silk Serif Light.otf → .woff2
├── Silk Serif Light Italic.otf → .woff2
├── Silk Serif Regular.otf → .woff2
├── Silk Serif Regular Italic.otf → .woff2
├── Silk Serif Medium.otf → .woff2
├── Silk Serif Medium Italic.otf → .woff2
├── Silk Serif SemiBold.otf → .woff2
├── Silk Serif SemiBold Italic.otf → .woff2
├── Silk Serif Bold.otf → .woff2
├── Silk Serif Bold Italic.otf → .woff2
├── Silk Serif Black.otf → .woff2
└── Silk Serif Black Italic.otf → .woff2
```

**Tempo**: ~15-20 min

---

### 2. ✅ Converter Imagens para WebP

**Status**: CONCLUÍDO

**Imagens convertidas**:

- `/3.webp` (CTASection)
- `/5.webp` (Showreel)
- `/clients/1 (3-12).webp` (10 logos de clientes)

**Referências atualizadas**:

- `CTASection.tsx`: `/3.jpeg` → `/3.webp`
- `Showreel.tsx`: `/5.jpg` → `/5.webp`
- `ClientLogos.tsx`: `.png` → `.webp`

---

### 3. 🖥️ Configurar Servidor (Produção)

**Por que você**: Requer acesso ao servidor de hospedagem.

**Passos para Vercel/Netlify** (automático, não precisa fazer nada):

- Brotli já está habilitado
- Headers de cache já são configurados

**Passos para servidor próprio (Nginx)**:

```nginx
# Adicionar ao nginx.conf ou site config

# Brotli
brotli on;
brotli_types text/html text/css application/javascript application/json;

# Cache de assets
location ~* \.(woff2|webp|avif|svg|jpg|png)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.[a-f0-9]{8}\.(js|css)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**Tempo**: ~5-10 min

---

### 4. 🧪 Testar Performance

**Por que você**: Requer acesso ao site em produção.

**Passos**:

1. Faça deploy das mudanças
2. Acesse https://pagespeed.web.dev/
3. Cole a URL do site
4. Analise os resultados
5. Compare com métricas anteriores

**Métricas alvo**:

- LCP: < 1.5s
- FID: < 50ms
- CLS: < 0.05

---

## Ordem de Execução Recomendada

```
┌─────────────────────────────────────────────────────────────┐
│  FASE 1 - Claude faz (imediato) ✅ CONCLUÍDA                │
├─────────────────────────────────────────────────────────────┤
│  ✅ 1. CSS crítico inline                                   │
│  ✅ 2. Remover prefetch ineficaz                            │
│  ✅ 3. Otimizar vite.config.ts                              │
│  ✅ 4. Verificar pesos de fonte usados                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  FASE 2 - Você faz ✅ CONCLUÍDA                             │
├─────────────────────────────────────────────────────────────┤
│  ✅ 1. Converter fontes Dosis para WOFF2                    │
│  ✅ 2. Converter fontes Silk Serif para WOFF2               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  FASE 3 - Claude faz (após conversão) ✅ CONCLUÍDA          │
├─────────────────────────────────────────────────────────────┤
│  ✅ 1. Atualizar CSS Dosis para usar WOFF2                  │
│  ✅ 2. Remover fontes Dosis não usadas (200, 800)           │
│  ✅ 3. Atualizar CSS Silk Serif para WOFF2                  │
│  ✅ 4. Remover fontes Silk Serif não usadas (12 arquivos)   │
│  ✅ 5. Remover todos os arquivos OTF                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  FASE 4 - Imagens ✅ CONCLUÍDA                              │
├─────────────────────────────────────────────────────────────┤
│  ✅ 1. Converter imagens para WebP                          │
│  ✅ 2. Atualizar referências no código                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  FASE 5 - Você faz (opcional)                               │
├─────────────────────────────────────────────────────────────┤
│  1. Remover imagens não utilizadas                          │
│  2. Configurar servidor                                     │
│  3. Testar performance                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Comandos Rápidos

Para executar as tarefas do Claude, basta dizer:

| Comando                                    | Tarefas                                |
| ------------------------------------------ | -------------------------------------- |
| "execute a fase 1 do plano de performance" | CSS inline + prefetch + vite + análise |
| "faça a tarefa X do plano de performance"  | Tarefa específica                      |
| "atualize o CSS para WOFF2"                | Após você converter as fontes          |
| "remova as fontes não usadas"              | Após análise de pesos                  |

---

## Impacto Esperado

| Métrica         | Antes (est.) | Depois (est.) | Melhoria |
| --------------- | ------------ | ------------- | -------- |
| Tamanho fontes  | ~800KB       | ~300KB        | -60%     |
| Tamanho imagens | ~2MB         | ~800KB        | -60%     |
| Bundle JS       | ~500KB       | ~350KB        | -30%     |
| LCP             | 2.5s+        | ~1.5s         | -40%     |
| Flash de estilo | Sim          | Não           | 100%     |

---

## Resultado da Análise de Pesos de Fonte (Fase 1)

A análise do código identificou os seguintes pesos de fonte em uso:

### Pesos Utilizados

| Peso        | Classe Tailwind | Uso no Projeto                        |
| ----------- | --------------- | ------------------------------------- |
| 900 (Black) | `font-black`    | h1 (títulos principais)               |
| 700 (Bold)  | `font-bold`     | h2, botões, links importantes         |
| 600 (Semi)  | `font-semibold` | h3, h5, subtítulos                    |
| 500 (Med)   | `font-medium`   | h6, labels, navegação                 |
| 400 (Reg)   | `font-normal`   | Texto base padrão                     |
| 300 (Light) | `font-light`    | Descrições, parágrafos, textos longos |

### Recomendação de Fontes a Manter

**Dosis (sans-serif):**

- ✅ Dosis-Light.woff2 (300)
- ✅ Dosis-Regular.woff2 (400)
- ✅ Dosis-Medium.woff2 (500)
- ✅ Dosis-SemiBold.woff2 (600)
- ✅ Dosis-Bold.woff2 (700)
- ❌ Dosis-ExtraLight.woff2 (200) - **Pode remover**
- ❌ Dosis-ExtraBold.woff2 (800) - **Pode remover**

**Silk Serif (serif - títulos):**

- ✅ Silk Serif Bold.woff2 (700)
- ✅ Silk Serif Black.woff2 (900)
- ❌ Demais variantes - **Pode remover** (Silk Serif só é usado em títulos grandes)

### Economia Estimada

Removendo fontes não utilizadas: **~400-500KB** de economia no carregamento inicial.

---

**Criado em**: 2025-11-25
**Atualizado em**: 2025-11-25 (Fase 4 concluída - WebP)

---

## Imagens Não Utilizadas (podem ser removidas)

Após análise do código, as seguintes imagens em `/public` não são referenciadas:

| Arquivo              | Status                               |
| -------------------- | ------------------------------------ |
| `teste.png`          | ❌ Não utilizada                     |
| `4.jpeg`             | ❌ Não utilizada                     |
| `5.jpeg`             | ❌ Duplicata (código usa 5.webp)     |
| `6.jpg`              | ❌ Não utilizada                     |
| `3.jpeg`             | ❌ Duplicata (código usa 3.webp)     |
| `5.jpg`              | ❌ Duplicata (código usa 5.webp)     |
| `clients/1 (1).webp` | ❌ Não utilizada (lista começa no 3) |
| `clients/1 (2).webp` | ❌ Não utilizada (lista começa no 3) |

**Economia estimada**: ~500KB removendo arquivos não utilizados.
