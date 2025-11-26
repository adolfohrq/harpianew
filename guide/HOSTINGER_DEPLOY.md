# Guia Rápido: Deploy na Hostinger

## 1. Gerar o Build

```bash
npm run build
```

Isso cria a pasta `dist/` com os arquivos otimizados.

## 2. Configuração do Hostinger

### Arquivos necessários na raiz do domínio:

```
public_html/
├── index.html
├── assets/
│   ├── *.js
│   └── *.css
├── fonts/
├── og/
├── sitemap.xml
├── robots.txt
└── .htaccess       ← IMPORTANTE para SPA
```

### Arquivo `.htaccess` (obrigatório para React Router)

Crie este arquivo na raiz do `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Se não é arquivo ou diretório existente, redireciona para index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# Cache de assets estáticos (1 ano)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

## 3. Upload dos Arquivos

### Opção A: Via File Manager (Hostinger)

1. Acesse hPanel → **File Manager**
2. Entre em `public_html`
3. Delete arquivos antigos (se houver)
4. Faça upload do conteúdo da pasta `dist/`
5. Crie o arquivo `.htaccess` com o conteúdo acima

### Opção B: Via FTP

1. Use FileZilla ou similar
2. Conecte com as credenciais FTP do Hostinger
3. Navegue até `public_html`
4. Envie todo conteúdo de `dist/`

## 4. Checklist Pós-Deploy

- [ ] Acessar `https://seudominio.com` - deve carregar a home
- [ ] Acessar `https://seudominio.com/servicos` diretamente - deve funcionar (não dar 404)
- [ ] Verificar se imagens e fontes carregam
- [ ] Testar no mobile
- [ ] Verificar `https://seudominio.com/sitemap.xml`
- [ ] Verificar `https://seudominio.com/robots.txt`

## 5. Configurar SSL (HTTPS)

No hPanel:

1. **SSL/TLS** → Ativar SSL gratuito
2. Aguardar propagação (~15 min)
3. Forçar HTTPS (adicionar no `.htaccess`):

```apache
# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 6. `.htaccess` Completo (Recomendado)

```apache
# =============================================================================
# HTACCESS OTIMIZADO PARA REACT SPA - HOSTINGER
# =============================================================================

# Desabilitar processamento PHP (não precisamos, é SPA estático)
<IfModule mod_php.c>
  php_flag engine off
</IfModule>

# -----------------------------------------------------------------------------
# REDIRECIONAMENTOS
# -----------------------------------------------------------------------------
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Forçar HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Redirecionar www para non-www
  RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

  # SPA fallback - redireciona rotas para index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# -----------------------------------------------------------------------------
# CACHE DE ASSETS (muito importante para performance!)
# -----------------------------------------------------------------------------
<IfModule mod_expires.c>
  ExpiresActive On

  # HTML - cache curto (pode mudar)
  ExpiresByType text/html "access plus 1 hour"

  # CSS e JS com hash no nome - cache longo
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"

  # Imagens
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"

  # Fontes
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"

  # Vídeos
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType video/webm "access plus 1 year"

  # Outros
  ExpiresByType application/json "access plus 1 hour"
  ExpiresByType application/xml "access plus 1 hour"
</IfModule>

# Cache-Control headers
<IfModule mod_headers.c>
  # Assets com hash - immutable (nunca revalida)
  <FilesMatch "\.(js|css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Imagens e fontes - cache longo
  <FilesMatch "\.(webp|png|jpg|jpeg|svg|ico|woff2|woff|mp4|webm)$">
    Header set Cache-Control "public, max-age=31536000"
  </FilesMatch>

  # HTML - cache curto com revalidação
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>

# -----------------------------------------------------------------------------
# COMPRESSÃO GZIP/BROTLI
# -----------------------------------------------------------------------------
<IfModule mod_deflate.c>
  # Comprimir texto
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE font/woff

  # Não comprimir arquivos já comprimidos
  SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png|webp|woff2|mp4|webm)$ no-gzip
</IfModule>

# -----------------------------------------------------------------------------
# HEADERS DE SEGURANÇA E PERFORMANCE
# -----------------------------------------------------------------------------
<IfModule mod_headers.c>
  # Segurança
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"

  # Performance - DNS prefetch para recursos externos
  Header set Link "</fonts/dosis/Dosis-Regular.woff2>; rel=preload; as=font; crossorigin"

  # Remover headers desnecessários
  Header unset X-Powered-By
  Header unset Server
</IfModule>

# -----------------------------------------------------------------------------
# OTIMIZAÇÕES EXTRAS
# -----------------------------------------------------------------------------

# Desabilitar listagem de diretórios
Options -Indexes

# Desabilitar server signature
ServerSignature Off

# ETags (opcional - alguns preferem desabilitar com cache longo)
FileETag MTime Size
```

---

## Resumo

1. `npm run build`
2. Upload `dist/` → `public_html`
3. Criar `.htaccess`
4. Testar rotas e SSL
