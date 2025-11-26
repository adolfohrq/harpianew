Analise e otimize o SEO de uma página ou do projeto inteiro.

## Página: $ARGUMENTS

Se nenhum argumento for passado, analisa todas as páginas.

## Verificações por página

### 1. Meta Tags (useMetaTags)

- [ ] `title` está definido e tem menos de 60 caracteres
- [ ] `description` está definida e tem 150-160 caracteres
- [ ] `keywords` inclui palavras-chave relevantes
- [ ] `canonical` aponta para URL correta
- [ ] `ogTitle` e `ogDescription` estão definidos
- [ ] `ogImage` aponta para imagem válida

### 2. Structured Data (useStructuredData)

- [ ] `HARPIA_ORGANIZATION` está incluído
- [ ] Schema da página (WebPage, Service, CreativeWork) está definido
- [ ] Breadcrumbs estão corretos

### 3. Configuração Central (seo.config.ts)

- [ ] Página tem entrada em `PAGE_SEO`
- [ ] Rota está em `SITEMAP_CONFIG.staticRoutes`
- [ ] Prioridade e changefreq estão adequados

### 4. Conteúdo da Página

- [ ] H1 único e relevante
- [ ] Hierarquia de headings correta (h1 > h2 > h3)
- [ ] Imagens têm alt text descritivo
- [ ] Links internos usam `<Link>` do React Router

## Output esperado

```
🔍 Análise de SEO: /servicos

📝 Meta Tags
   ✅ Title: "Serviços | Harpia Agência" (32 chars)
   ✅ Description: "Conheça nossos serviços..." (158 chars)
   ✅ Keywords: 8 palavras-chave
   ✅ Canonical: https://agenciaharpia.com.br/servicos
   ✅ OG Image: /images/og-services.jpg

📊 Structured Data
   ✅ Organization schema
   ✅ WebPage schema
   ✅ Breadcrumb: Home > Serviços

📁 SEO Config
   ✅ PAGE_SEO.services definido
   ✅ Sitemap: priority 0.8, changefreq monthly

📄 Conteúdo
   ✅ H1: "SERVIÇOS QUE ELEVAM SUA MARCA"
   ✅ Hierarquia: h1 (1) > h2 (4) > h3 (8)
   ⚠️ 2 imagens sem alt text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score SEO: 95/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Sugestões de melhoria

Se encontrar problemas, sugira correções específicas com código.

## Geração de Relatório (OBRIGATÓRIO)

Após a análise, SEMPRE gerar/atualizar um arquivo de relatório:

### Local do relatório

```
docs/seo-reports/[nome-da-pagina].md
```

### Nomenclatura

- Home → `docs/seo-reports/home.md`
- Services → `docs/seo-reports/services.md`
- Portfolio → `docs/seo-reports/portfolio.md`
- Contact → `docs/seo-reports/contact.md`
- AboutPage → `docs/seo-reports/about.md`

### Estrutura do relatório

```markdown
# Relatório SEO: [Nome da Página]

> **Última análise:** DD/MM/YYYY às HH:MM
> **Score:** XX/100

## Resumo

| Categoria       | Status   | Pontos |
| --------------- | -------- | ------ |
| Meta Tags       | ✅/⚠️/❌ | XX/25  |
| Structured Data | ✅/⚠️/❌ | XX/20  |
| SEO Config      | ✅/⚠️/❌ | XX/20  |
| Conteúdo        | ✅/⚠️/❌ | XX/20  |
| Boas Práticas   | ✅/⚠️/❌ | XX/15  |

## Detalhes da Análise

### Meta Tags

[Detalhes completos...]

### Structured Data

[Detalhes completos...]

### SEO Config

[Detalhes completos...]

### Conteúdo

[Detalhes completos...]

## Problemas Encontrados

1. [Problema 1 com sugestão de correção]
2. [Problema 2 com sugestão de correção]

## Histórico de Análises

| Data             | Score  | Principais Mudanças |
| ---------------- | ------ | ------------------- |
| DD/MM/YYYY HH:MM | XX/100 | Análise inicial     |
```

### Regras para o relatório

1. **Criar pasta se não existir**: `docs/seo-reports/`
2. **Verificar se arquivo existe**: Se já existir, atualizar mantendo o histórico
3. **Adicionar ao histórico**: Sempre adicionar nova entrada na tabela de histórico
4. **Data/hora atual**: Usar formato `DD/MM/YYYY às HH:MM`
5. **Manter histórico**: Preservar entradas anteriores da tabela de histórico

### Passos obrigatórios

1. Verificar se `docs/seo-reports/` existe, criar se necessário
2. Verificar se o arquivo `.md` da página já existe
3. Se existir:
   - Ler o histórico existente
   - Adicionar nova entrada no histórico
   - Reescrever o conteúdo com a análise atualizada
4. Se não existir:
   - Criar arquivo novo com análise completa
   - Iniciar histórico com "Análise inicial"
5. Informar ao usuário que o relatório foi salvo/atualizado
