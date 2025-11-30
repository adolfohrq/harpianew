# Plano de Implementação - WordPress CMS para Portfólio

> **Projeto**: Harpia Agência
> **Objetivo**: Integrar WordPress como CMS headless para gerenciamento do portfólio
> **Documento de Referência**: [WORDPRESS_INTEGRATION.md](./WORDPRESS_INTEGRATION.md)

---

## Legenda de Responsabilidades

| Ícone | Responsável      | Descrição                          |
| ----- | ---------------- | ---------------------------------- |
| 🤖    | **Claude Code**  | Tarefa automatizada - eu executo   |
| 👤    | **Usuário**      | Tarefa manual - você executa       |
| 🤝    | **Colaborativo** | Eu preparo, você executa/configura |

---

## Visão Geral das Fases

```
┌─────────────────────────────────────────────────────────────────┐
│  FASE 1: Preparação do Frontend React              ✅ CONCLUÍDA │
│  🤖 Claude Code executa todas as tarefas                        │
├─────────────────────────────────────────────────────────────────┤
│  FASE 2: Configuração do WordPress                 ⏳ PENDENTE  │
│  👤 Usuário executa (instalação, plugins, admin)                │
├─────────────────────────────────────────────────────────────────┤
│  FASE 3: Código PHP do WordPress                   ✅ CONCLUÍDA │
│  🤝 Claude gera arquivos, usuário copia para WP                 │
├─────────────────────────────────────────────────────────────────┤
│  FASE 4: Migração de Dados                         ✅ CONCLUÍDA │
│  🤝 Claude gera script, usuário executa no WP                   │
├─────────────────────────────────────────────────────────────────┤
│  FASE 5: Integração e Testes                       ✅ CONCLUÍDA │
│  🤖 Claude Code atualiza componentes                            │
├─────────────────────────────────────────────────────────────────┤
│  FASE 6: Deploy                                    ⏳ PENDENTE  │
│  👤 Usuário executa deploy                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Progresso: 4/6 fases concluídas (67%)

---

## FASE 1: Preparação do Frontend React ✅ CONCLUÍDA

> 🤖 **Responsável**: Claude Code
> **Status**: ✅ Concluída em 26/11/2025

### Tarefas

| #   | Tarefa                               | Arquivo                                       | Status |
| --- | ------------------------------------ | --------------------------------------------- | ------ |
| 1.1 | Criar configuração de API            | `src/config/api.config.ts`                    | ✅     |
| 1.2 | Criar serviço WordPress              | `src/services/wordpress.ts`                   | ✅     |
| 1.3 | Criar hook useWordPressProjects      | `src/hooks/useWordPressProjects.ts`           | ✅     |
| 1.4 | Criar componente de loading/skeleton | `src/components/ui/Skeleton.tsx` (adicionado) | ✅     |
| 1.5 | Atualizar exports dos hooks          | `src/hooks/index.ts`                          | ✅     |
| 1.6 | Criar arquivo .env.example           | `.env.example`                                | ✅     |
| 1.7 | Atualizar .gitignore para .env       | `.gitignore`                                  | ✅     |
| 1.8 | Criar ErrorBoundary                  | `src/components/ui/ErrorBoundary.tsx`         | ✅     |
| 1.9 | Criar index services                 | `src/services/index.ts`                       | ✅     |

### Arquivos Criados

```
src/
├── config/
│   └── api.config.ts           ✅ Configuração da API WordPress
├── services/
│   ├── index.ts                ✅ Barrel export
│   └── wordpress.ts            ✅ Cliente HTTP com cache
├── hooks/
│   └── useWordPressProjects.ts ✅ Hook com fallback automático
└── components/ui/
    ├── Skeleton.tsx            ✅ PortfolioSkeleton + ProjectDetailSkeleton
    └── ErrorBoundary.tsx       ✅ Error boundary + PortfolioErrorFallback

.env.example                    ✅ Template de variáveis de ambiente
.gitignore                      ✅ Atualizado para ignorar .env
```

---

## FASE 2: Configuração do WordPress

> 👤 **Responsável**: Usuário
> **Status**: Pendente

### Pré-requisitos

- [ ] Hospedagem com suporte a PHP 7.4+ e MySQL 5.7+
- [ ] Domínio ou subdomínio configurado (ex: `cms.agenciaharpia.com.br`)
- [ ] Certificado SSL ativo (HTTPS obrigatório)

### 2.1 Instalação do WordPress

| #     | Tarefa                | Instruções                                         |
| ----- | --------------------- | -------------------------------------------------- |
| 2.1.1 | Instalar WordPress    | Via painel da hospedagem ou download manual        |
| 2.1.2 | Configurar idioma     | Português do Brasil                                |
| 2.1.3 | Criar usuário admin   | Anotar credenciais em local seguro                 |
| 2.1.4 | Configurar permalinks | Configurações → Links Permanentes → "Nome do post" |

### 2.2 Instalação de Plugins

| #     | Plugin                     | Onde Obter                                   | Obrigatório |
| ----- | -------------------------- | -------------------------------------------- | ----------- |
| 2.2.1 | Advanced Custom Fields PRO | https://www.advancedcustomfields.com/ (pago) | ✅ Sim      |
| 2.2.2 | ACF to REST API            | Plugins → Adicionar Novo → Buscar            | ✅ Sim      |
| 2.2.3 | WP REST Cache              | Plugins → Adicionar Novo → Buscar            | ⬜ Opcional |

> **Nota sobre ACF PRO**: É um plugin pago (~$49/ano). Alternativa gratuita: ACF Free + código customizado para REST API.

### 2.3 Configurações de Segurança

| #     | Tarefa                         | Local                          |
| ----- | ------------------------------ | ------------------------------ |
| 2.3.1 | Desativar registro de usuários | Configurações → Geral          |
| 2.3.2 | Instalar plugin de segurança   | Wordfence ou Sucuri (opcional) |
| 2.3.3 | Configurar backup automático   | UpdraftPlus ou similar         |

### Checklist da Fase 2

```
[ ] WordPress instalado e acessível
[ ] Login admin funcionando
[ ] Permalinks configurados como "Nome do post"
[ ] ACF PRO instalado e ativado
[ ] ACF to REST API instalado e ativado
[ ] HTTPS funcionando
```

---

## FASE 3: Código PHP do WordPress ✅ CONCLUÍDA

> 🤝 **Responsável**: Claude Code gera, Usuário aplica
> **Status**: ✅ Arquivos gerados em 26/11/2025

### Tarefas

| #   | Tarefa                            | Arquivo Gerado                      | Status |
| --- | --------------------------------- | ----------------------------------- | ------ |
| 3.1 | Gerar código do Custom Post Type  | `wordpress/harpia-portfolio.php`    | ✅     |
| 3.2 | Gerar configuração ACF (JSON)     | `wordpress/acf-project-fields.json` | ✅     |
| 3.3 | Gerar endpoints REST customizados | (incluído em 3.1)                   | ✅     |
| 3.4 | Gerar configuração CORS           | (incluído em 3.1)                   | ✅     |

### Arquivos Gerados

```
wordpress/
├── harpia-portfolio.php      ✅ Plugin MU completo (~400 linhas)
│   ├── Custom Post Type: harpia_project
│   ├── Taxonomia: project_category
│   ├── REST API: /harpia/v1/projects
│   ├── CORS configurado
│   └── Colunas admin customizadas
└── acf-project-fields.json   ✅ Configuração ACF importável
    └── 11 campos configurados
```

### 👤 Ação do Usuário Necessária

1. Copiar `wordpress/harpia-portfolio.php` para `wp-content/mu-plugins/`
2. Importar `wordpress/acf-project-fields.json` via ACF → Ferramentas

### Instruções de Aplicação (Usuário)

#### 3.1 Instalar o Plugin MU (Must-Use)

1. Acesse seu servidor via FTP/SFTP ou File Manager
2. Navegue até `wp-content/`
3. Crie a pasta `mu-plugins/` se não existir
4. Faça upload do arquivo `harpia-portfolio.php`
5. O plugin será ativado automaticamente

#### 3.2 Importar Campos ACF

1. Acesse WordPress Admin → ACF → Ferramentas
2. Clique em "Importar"
3. Selecione o arquivo `acf-project-fields.json`
4. Clique em "Importar arquivo"
5. Verifique se o grupo "Detalhes do Projeto" aparece

---

## FASE 4: Migração de Dados ✅ CONCLUÍDA

> 🤝 **Responsável**: Claude Code gera, Usuário executa
> **Status**: ✅ Arquivos gerados em 26/11/2025

### Tarefas

| #   | Tarefa                   | Arquivo Gerado                   | Status |
| --- | ------------------------ | -------------------------------- | ------ |
| 4.1 | Gerar script de migração | `wordpress/migrate-projects.php` | ✅     |
| 4.2 | Criar guia de imagens    | `wordpress/IMAGES_GUIDE.md`      | ✅     |

### Arquivos Gerados

```
wordpress/
├── migrate-projects.php   ✅ Script de migração completo
│   ├── 6 projetos pré-configurados
│   ├── Página admin para execução
│   ├── Suporte a WP-CLI
│   └── Verificação de duplicatas
└── IMAGES_GUIDE.md        ✅ Guia de upload de imagens
    ├── Especificações técnicas
    ├── Passo a passo de upload
    └── Checklist por projeto
```

### 👤 Ação do Usuário Necessária

1. Copiar `wordpress/migrate-projects.php` para `wp-content/mu-plugins/`
2. Acessar WordPress Admin → Ferramentas → Migrar Projetos Harpia
3. Clicar em "Executar Migração"
4. Fazer upload das imagens seguindo o guia `IMAGES_GUIDE.md`

### Instruções de Migração (Usuário)

#### Opção A: Via Admin (Recomendado)

1. Acesse WordPress Admin → Ferramentas → Migrar Projetos Harpia
2. Clique em "Executar Migração"
3. Aguarde a confirmação
4. Verifique os projetos em Portfólio → Todos os Projetos

#### Opção B: Via WP-CLI (Avançado)

```bash
wp eval-file migrate-projects.php
```

#### Upload de Imagens

As imagens precisam ser enviadas manualmente:

1. Acesse Mídia → Adicionar Nova
2. Faça upload das imagens do portfólio
3. Edite cada projeto e associe as imagens:
   - Imagem Destacada (thumbnail principal)
   - Galeria (campo ACF)

---

## FASE 5: Integração e Testes ✅ CONCLUÍDA

> 🤖 **Responsável**: Claude Code
> **Status**: ✅ Concluída em 26/11/2025

### Tarefas

| #   | Tarefa                         | Arquivo                               | Status      |
| --- | ------------------------------ | ------------------------------------- | ----------- |
| 5.1 | Atualizar PortfolioPreview.tsx | `src/components/PortfolioPreview.tsx` | ✅          |
| 5.2 | Atualizar PortfolioDetail.tsx  | `src/pages/PortfolioDetail.tsx`       | ✅          |
| 5.3 | Adicionar error boundary       | `src/components/ui/ErrorBoundary.tsx` | ✅ (Fase 1) |
| 5.4 | Adicionar skeletons            | `src/components/ui/Skeleton.tsx`      | ✅ (Fase 1) |

### Mudanças Realizadas

**PortfolioPreview.tsx:**

- Usa `useWordPressProjects()` hook
- Fallback automático para dados estáticos
- Loading state com `PortfolioSkeleton`
- Error state com `PortfolioErrorFallback`

**PortfolioDetail.tsx:**

- Usa `useWordPressProject(slug)` hook
- Usa `useWordPressProjects()` para navegação prev/next
- Loading state com `ProjectDetailSkeleton`
- Navegação condicional (prev/next podem ser null)

### Comportamento do Sistema

```
Requisição API WordPress
        ↓
   [Sucesso?]
     /      \
   Sim      Não
    ↓        ↓
 Renderiza  Usa fallback
 dados WP   dados estáticos
             (PROJECTS)
```

---

## FASE 6: Deploy

> 👤 **Responsável**: Usuário
> **Status**: Pendente

### 6.1 Configurar Variáveis de Ambiente

#### Desenvolvimento Local

Crie o arquivo `.env` na raiz do projeto:

```env
VITE_WP_API_URL=https://cms.agenciaharpia.com.br
```

#### Produção (Hostinger/Vercel/Netlify)

Configure a variável de ambiente no painel da hospedagem:

| Variável          | Valor                              |
| ----------------- | ---------------------------------- |
| `VITE_WP_API_URL` | `https://cms.agenciaharpia.com.br` |

### 6.2 Build e Deploy

```bash
# Build de produção
npm run build

# Testar localmente
npm run preview
```

### 6.3 Checklist Final

```
[ ] Variável VITE_WP_API_URL configurada
[ ] Build sem erros
[ ] Preview funcionando localmente
[ ] Projetos carregando da API
[ ] Fallback funcionando (desligar API e testar)
[ ] Imagens carregando corretamente
[ ] SEO meta tags corretas
[ ] Deploy realizado
[ ] Cache do CDN limpo
```

---

## Cronograma Sugerido

```
DIA 1 - Manhã
├── Fase 1: Preparação React (Claude Code) .............. 30 min
└── Fase 2: Instalação WordPress (Usuário) .............. 1-2 horas

DIA 1 - Tarde
├── Fase 3: Código PHP (Claude + Usuário) ............... 30 min
└── Fase 4: Migração de Dados (Claude + Usuário) ........ 30 min

DIA 2 - Manhã
├── Fase 5: Integração (Claude Code) .................... 1 hora
├── Testes manuais (Usuário) ............................ 30 min
└── Fase 6: Deploy (Usuário) ............................ 1 hora
```

---

## Comandos Rápidos

### Para Claude Code Executar

| Comando                                                | Descrição                |
| ------------------------------------------------------ | ------------------------ |
| `Execute a Fase 1 do plano WordPress`                  | Cria arquivos React      |
| `Execute a Fase 3 do plano WordPress`                  | Gera código PHP          |
| `Execute a Fase 4 do plano WordPress`                  | Gera script de migração  |
| `Execute a Fase 5 do plano WordPress com API em [URL]` | Integra componentes      |
| `Execute todas as fases automatizáveis`                | Fases 1, 3, 4 de uma vez |

---

## Troubleshooting

### Erro: CORS bloqueado

**Sintoma**: Console mostra erro de CORS ao buscar projetos

**Solução**:

1. Verificar se o domínio React está na lista de origens permitidas
2. Adicionar ao `functions.php`:

```php
header('Access-Control-Allow-Origin: https://agenciaharpia.com.br');
```

### Erro: 404 na API

**Sintoma**: `/wp-json/harpia/v1/projects` retorna 404

**Solução**:

1. Ir em Configurações → Links Permanentes
2. Clicar em "Salvar alterações" (sem mudar nada)
3. Isso regenera as regras de rewrite

### Erro: Campos ACF não aparecem na API

**Sintoma**: API retorna projetos sem campos customizados

**Solução**:

1. Verificar se "ACF to REST API" está ativo
2. Verificar se os campos têm "Show in REST API" = Yes
3. Limpar cache do WP REST Cache

### Erro: Imagens não carregam

**Sintoma**: Projetos carregam mas imagens aparecem quebradas

**Solução**:

1. Verificar se as URLs das imagens usam HTTPS
2. Verificar permissões da pasta `uploads/`
3. Verificar se o CDN está configurado para servir imagens

---

## Arquivos que Serão Criados

### Por Claude Code (React)

```
src/
├── config/
│   └── api.config.ts           # Configuração da API
├── services/
│   ├── wordpress.ts            # Cliente HTTP
│   └── __tests__/
│       └── wordpress.test.ts   # Testes
├── hooks/
│   └── useWordPressProjects.ts # Hook principal
└── components/
    └── ui/
        ├── PortfolioSkeleton.tsx # Loading state
        └── ErrorBoundary.tsx     # Tratamento de erros

.env.example                     # Template de variáveis
```

### Por Claude Code (Para WordPress)

```
wordpress/
├── harpia-portfolio.php        # Plugin MU completo
├── acf-project-fields.json     # Configuração ACF
├── migrate-projects.php        # Script de migração
└── IMAGES_GUIDE.md             # Guia de upload de imagens
```

---

## Próximo Passo

**Quando estiver pronto, diga:**

```
Execute a Fase 1 do plano WordPress
```

Isso criará todos os arquivos React necessários para a integração.
