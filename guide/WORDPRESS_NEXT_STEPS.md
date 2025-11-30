# Próximos Passos - Integração WordPress

Este documento resume o que você precisa fazer para completar a integração do WordPress como CMS do portfólio.

---

## Status Atual

| Fase                           | Status         | Responsável |
| ------------------------------ | -------------- | ----------- |
| Fase 1: Frontend React         | ✅ Concluída   | Claude Code |
| Fase 2: Configurar WordPress   | ⏳ **Sua vez** | Você        |
| Fase 3: Código PHP             | ✅ Concluída   | Claude Code |
| Fase 4: Script de Migração     | ✅ Concluída   | Claude Code |
| Fase 5: Integração Componentes | ✅ Concluída   | Claude Code |
| Fase 6: Deploy                 | ⏳ Pendente    | Você        |

---

## O Que Você Precisa Fazer

### Passo 1: Instalar WordPress no Subdomínio

1. Acesse o painel da sua hospedagem (Hostinger)
2. Crie o subdomínio `cms.agenciaharpia.com.br`
3. Instale o WordPress nesse subdomínio
4. Anote as credenciais de admin

**Configurações iniciais do WordPress:**

- Idioma: Português do Brasil
- Configurações → Links Permanentes → "Nome do post"
- Configurações → Geral → Desmarcar "Qualquer pessoa pode se registrar"

---

### Passo 2: Instalar Plugins Obrigatórios

| Plugin              | Onde Obter                                          | Custo    |
| ------------------- | --------------------------------------------------- | -------- |
| **ACF PRO**         | https://www.advancedcustomfields.com/               | ~$49/ano |
| **ACF to REST API** | Plugins → Adicionar Novo → Buscar "ACF to REST API" | Gratuito |

> **Nota:** ACF PRO é pago, mas essencial para os campos personalizados. Sem ele, o sistema não funciona corretamente.

---

### Passo 3: Copiar Arquivos PHP para o WordPress

Os arquivos estão na pasta `wordpress/` do projeto.

#### 3.1 Plugin Principal

**Arquivo:** `wordpress/harpia-portfolio.php`

**Destino:** `wp-content/mu-plugins/harpia-portfolio.php`

```
Seu servidor WordPress:
└── wp-content/
    └── mu-plugins/           ← Criar esta pasta se não existir
        └── harpia-portfolio.php  ← Copiar aqui
```

**Como fazer:**

1. Acesse o servidor via FTP (FileZilla) ou File Manager da Hostinger
2. Navegue até `wp-content/`
3. Crie a pasta `mu-plugins` (se não existir)
4. Faça upload do arquivo `harpia-portfolio.php`
5. O plugin será ativado automaticamente (MU = Must Use)

#### 3.2 Script de Migração

**Arquivo:** `wordpress/migrate-projects.php`

**Destino:** `wp-content/mu-plugins/migrate-projects.php`

Faça upload junto com o plugin principal.

---

### Passo 4: Importar Campos ACF

**Arquivo:** `wordpress/acf-project-fields.json`

1. Acesse WordPress Admin
2. Vá em **ACF → Ferramentas**
3. Na seção "Importar", clique em "Escolher arquivo"
4. Selecione `acf-project-fields.json`
5. Clique em **Importar arquivo**
6. Verifique se aparece o grupo "Detalhes do Projeto"

---

### Passo 5: Executar Migração dos Projetos

1. Acesse WordPress Admin
2. Vá em **Ferramentas → Migrar Projetos Harpia**
3. Verifique se todos os pré-requisitos estão ✅
4. Clique em **Executar Migração**
5. Aguarde a confirmação de sucesso

Após a migração, você terá 6 projetos criados automaticamente.

---

### Passo 6: Fazer Upload das Imagens

Os projetos foram criados, mas as imagens precisam ser adicionadas manualmente.

1. Acesse **Mídia → Adicionar Nova**
2. Faça upload das imagens do portfólio
3. Para cada projeto em **Portfólio → Todos os Projetos**:
   - Defina a **Imagem Destacada** (thumbnail principal)
   - Adicione imagens na **Galeria** (campo ACF)

**Especificações de imagem:**

- Formato: WebP ou JPEG
- Dimensões: 1200x800px (landscape) ou 800x1200px (portrait)
- Tamanho máximo: 300KB por imagem

Consulte `wordpress/IMAGES_GUIDE.md` para mais detalhes.

---

### Passo 7: Testar a API

Após completar os passos acima, teste a API:

1. Abra no navegador: `https://cms.agenciaharpia.com.br/wp-json/harpia/v1/projects`
2. Você deve ver um JSON com os 6 projetos
3. Teste um projeto específico: `https://cms.agenciaharpia.com.br/wp-json/harpia/v1/projects/essencia-minimalista`

---

### Passo 8: Configurar Variável de Ambiente (Local)

Crie o arquivo `.env` na raiz do projeto React:

```env
VITE_WP_API_URL=https://cms.agenciaharpia.com.br
```

Teste localmente:

```bash
npm run dev
```

Acesse http://localhost:5020/portfolio e verifique se os projetos carregam.

---

### Passo 9: Deploy do Frontend

1. Faça o build:

   ```bash
   npm run build
   ```

2. Faça upload da pasta `dist/` para o servidor principal

3. Configure a variável de ambiente na hospedagem:
   - Variável: `VITE_WP_API_URL`
   - Valor: `https://cms.agenciaharpia.com.br`

---

## Checklist Final

```
WordPress:
[ ] Subdomínio cms.agenciaharpia.com.br criado
[ ] WordPress instalado e acessível
[ ] HTTPS funcionando
[ ] ACF PRO instalado e ativado
[ ] ACF to REST API instalado e ativado
[ ] harpia-portfolio.php em mu-plugins/
[ ] Campos ACF importados
[ ] Migração executada
[ ] Imagens enviadas para cada projeto
[ ] API retornando dados corretamente

Frontend:
[ ] Arquivo .env criado com VITE_WP_API_URL
[ ] npm run dev funcionando com dados do WordPress
[ ] npm run build sem erros
[ ] Deploy realizado
```

---

## Troubleshooting

### Erro 404 na API

1. Vá em Configurações → Links Permanentes
2. Clique em "Salvar alterações" (sem mudar nada)
3. Tente novamente

### Erro de CORS

Verifique se o domínio do frontend está na lista de origens permitidas em `harpia-portfolio.php`:

```php
$allowed_origins = [
    'http://localhost:5020',
    'https://agenciaharpia.com.br',
    'https://www.agenciaharpia.com.br',
];
```

### Campos ACF não aparecem na API

1. Verifique se "ACF to REST API" está ativo
2. Limpe o cache do WordPress (se tiver plugin de cache)

### Projetos não carregam no frontend

1. Verifique o console do navegador (F12)
2. Confirme que a URL da API está correta no `.env`
3. Reinicie o servidor de desenvolvimento (`npm run dev`)

---

## Arquivos de Referência

| Arquivo                                  | Descrição                        |
| ---------------------------------------- | -------------------------------- |
| `wordpress/harpia-portfolio.php`         | Plugin principal (CPT + API)     |
| `wordpress/acf-project-fields.json`      | Configuração dos campos          |
| `wordpress/migrate-projects.php`         | Script de migração               |
| `wordpress/IMAGES_GUIDE.md`              | Guia de upload de imagens        |
| `guide/WORDPRESS_INTEGRATION.md`         | Documentação técnica completa    |
| `guide/WORDPRESS_IMPLEMENTATION_PLAN.md` | Plano detalhado de implementação |

---

## Suporte

Se encontrar problemas, verifique:

1. Os logs de erro do WordPress (wp-content/debug.log)
2. O console do navegador (F12 → Console)
3. A aba Network do navegador para ver as requisições à API

O sistema possui **fallback automático**: se a API falhar, os dados estáticos (`src/data/projects.ts`) serão usados.
