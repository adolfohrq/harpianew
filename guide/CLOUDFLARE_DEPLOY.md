# Guia de Deploy: Hostinger + Cloudflare CDN

Este guia é para deploy usando **Hostinger** como servidor de origem e **Cloudflare** como CDN/proxy.

---

## 1. Gerar o Build

```bash
npm run build
```

Isso cria a pasta `dist/` com os arquivos otimizados.

---

## 2. Configuração do Cloudflare

### 2.1 Adicionar Site ao Cloudflare

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Add a Site** → Digite `agenciaharpia.com.br`
3. Escolha o plano **Free**
4. Cloudflare vai escanear os registros DNS existentes
5. **Altere os nameservers** no Hostinger para os fornecidos pelo Cloudflare

### 2.2 Configurações Essenciais no Painel Cloudflare

#### SSL/TLS

| Configuração                 | Valor                          | Caminho                     |
| ---------------------------- | ------------------------------ | --------------------------- |
| **SSL Mode**                 | `Full (strict)`                | SSL/TLS → Overview          |
| **Always Use HTTPS**         | ✅ Ativado                     | SSL/TLS → Edge Certificates |
| **HSTS**                     | ✅ Ativado (max-age: 12 meses) | SSL/TLS → Edge Certificates |
| **Minimum TLS Version**      | `TLS 1.2`                      | SSL/TLS → Edge Certificates |
| **Automatic HTTPS Rewrites** | ✅ Ativado                     | SSL/TLS → Edge Certificates |

#### Speed → Optimization

| Configuração      | Valor                              |
| ----------------- | ---------------------------------- |
| **Auto Minify**   | ✅ JavaScript, CSS, HTML           |
| **Brotli**        | ✅ Ativado                         |
| **Early Hints**   | ✅ Ativado                         |
| **Rocket Loader** | ❌ Desativado (pode quebrar React) |

#### Caching → Configuration

| Configuração          | Valor                    |
| --------------------- | ------------------------ |
| **Caching Level**     | Standard                 |
| **Browser Cache TTL** | Respect Existing Headers |
| **Always Online**     | ✅ Ativado               |

#### Security

| Configuração                | Valor      |
| --------------------------- | ---------- |
| **Security Level**          | Medium     |
| **Bot Fight Mode**          | ✅ Ativado |
| **Browser Integrity Check** | ✅ Ativado |

---

## 3. Configuração do Hostinger

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

---

## 4. `.htaccess` Otimizado para Cloudflare

> ⚠️ **IMPORTANTE**: Este `.htaccess` é diferente do padrão porque considera que o Cloudflare está na frente do servidor.

```apache
# =============================================================================
# HTACCESS OTIMIZADO PARA REACT SPA - HOSTINGER + CLOUDFLARE
# Domínio: agenciaharpia.com.br
# =============================================================================

# Desabilitar processamento PHP (não precisamos, é SPA estático)
<IfModule mod_php.c>
  php_flag engine off
</IfModule>

# -----------------------------------------------------------------------------
# CLOUDFLARE - Restaurar IP real do visitante
# -----------------------------------------------------------------------------
<IfModule mod_remoteip.c>
  RemoteIPHeader CF-Connecting-IP
</IfModule>

# -----------------------------------------------------------------------------
# REDIRECIONAMENTOS
# -----------------------------------------------------------------------------
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Forçar HTTPS (compatível com Cloudflare)
  # Cloudflare envia X-Forwarded-Proto para indicar protocolo original
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
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
# CACHE DE ASSETS
# Cloudflare respeita esses headers e os propaga para o edge
# -----------------------------------------------------------------------------
<IfModule mod_expires.c>
  ExpiresActive On

  # HTML - cache curto (pode mudar)
  ExpiresByType text/html "access plus 0 seconds"

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
  ExpiresByType application/json "access plus 0 seconds"
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

  # HTML - sem cache (sempre buscar do servidor)
  <FilesMatch "\.html$">
    Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"
    Header set Pragma "no-cache"
  </FilesMatch>

  # JSON (API responses) - sem cache
  <FilesMatch "\.json$">
    Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"
  </FilesMatch>
</IfModule>

# -----------------------------------------------------------------------------
# COMPRESSÃO
# Nota: Cloudflare já comprime com Brotli/GZIP no edge
# Mantemos aqui como fallback caso o cache expire
# -----------------------------------------------------------------------------
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE image/svg+xml

  # Não comprimir arquivos já comprimidos
  SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png|webp|woff2|mp4|webm)$ no-gzip
</IfModule>

# -----------------------------------------------------------------------------
# HEADERS DE SEGURANÇA
# Nota: Alguns headers podem ser configurados no Cloudflare também
# Mantemos aqui para garantir que sejam aplicados mesmo em bypass
# -----------------------------------------------------------------------------
<IfModule mod_headers.c>
  # Segurança básica
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"

  # HSTS - Configurado no Cloudflare, mas mantemos como backup
  # Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

  # Content Security Policy
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://cloudflareinsights.com; media-src 'self'; frame-ancestors 'self';"

  # Permissions Policy
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"

  # Cross-Origin policies
  # Nota: COEP pode causar problemas com recursos do Cloudflare
  Header set Cross-Origin-Opener-Policy "same-origin-allow-popups"
  # Header set Cross-Origin-Embedder-Policy "credentialless"

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

# ETags - Cloudflare gerencia isso, mas mantemos para origin
FileETag MTime Size
```

---

## 5. Cache Rules no Cloudflare (Opcional)

Para controle mais granular, crie regras de cache no Cloudflare:

### Regra 1: Cache de Assets Estáticos

**If:** `URI Path` contains `/assets/`

**Then:**

- Cache eligibility: Eligible for cache
- Edge TTL: 1 year
- Browser TTL: 1 year

### Regra 2: Bypass Cache para HTML

**If:** `URI Path` ends with `.html` OR `URI Path` equals `/`

**Then:**

- Cache eligibility: Bypass cache

### Regra 3: Cache de Fontes

**If:** `URI Path` contains `/fonts/`

**Then:**

- Cache eligibility: Eligible for cache
- Edge TTL: 1 year
- Browser TTL: 1 year

---

## 6. Page Rules (Legado, mas ainda funciona)

Se preferir usar Page Rules em vez de Cache Rules:

| URL Pattern                     | Setting     | Value            |
| ------------------------------- | ----------- | ---------------- |
| `*agenciaharpia.com.br/*.js`    | Cache Level | Cache Everything |
| `*agenciaharpia.com.br/*.css`   | Cache Level | Cache Everything |
| `*agenciaharpia.com.br/*.webp`  | Cache Level | Cache Everything |
| `*agenciaharpia.com.br/*.woff2` | Cache Level | Cache Everything |

---

## 7. Upload dos Arquivos

### Via File Manager (Hostinger)

1. Acesse hPanel → **File Manager**
2. Entre em `public_html`
3. Delete arquivos antigos (se houver)
4. Faça upload do conteúdo da pasta `dist/`
5. Crie o arquivo `.htaccess` com o conteúdo da seção 4

### Via FTP

1. Use FileZilla ou similar
2. Conecte com as credenciais FTP do Hostinger
3. Navegue até `public_html`
4. Envie todo conteúdo de `dist/`

---

## 8. Limpar Cache do Cloudflare

Após cada deploy, limpe o cache:

1. Cloudflare Dashboard → **Caching** → **Configuration**
2. Clique em **Purge Everything**

Ou via API:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

---

## 9. Checklist Pós-Deploy

- [ ] Limpar cache do Cloudflare
- [ ] Acessar `https://agenciaharpia.com.br` - deve carregar a home
- [ ] Acessar `https://agenciaharpia.com.br/servicos` diretamente - deve funcionar
- [ ] Verificar se imagens e fontes carregam
- [ ] Testar no mobile
- [ ] Verificar `https://agenciaharpia.com.br/sitemap.xml`
- [ ] Verificar `https://agenciaharpia.com.br/robots.txt`
- [ ] Verificar headers com `curl -I https://agenciaharpia.com.br`
- [ ] Testar no [Security Headers](https://securityheaders.com/)
- [ ] Testar no [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 10. Diferenças: Hostinger CDN vs Cloudflare

| Recurso                  | Hostinger CDN    | Cloudflare                     |
| ------------------------ | ---------------- | ------------------------------ |
| **Controle de Cache**    | Básico           | Avançado (Cache Rules)         |
| **Headers de Segurança** | .htaccess apenas | Dashboard + .htaccess          |
| **Compressão Brotli**    | Não nativo       | ✅ Nativo                      |
| **Early Hints (103)**    | Não              | ✅ Suportado                   |
| **HTTP/3**               | Não              | ✅ Suportado                   |
| **Web Analytics**        | Não              | ✅ Gratuito                    |
| **Bot Protection**       | Básico           | Avançado                       |
| **DDoS Protection**      | Básico           | ✅ Avançado                    |
| **Firewall (WAF)**       | Não              | ✅ Gratuito (regras limitadas) |

---

## 11. Troubleshooting

### Problema: Loop de Redirect

**Causa:** SSL Mode incorreto no Cloudflare.

**Solução:** Altere SSL/TLS → Overview para `Full (strict)`.

### Problema: Mixed Content

**Causa:** Recursos HTTP sendo carregados em página HTTPS.

**Solução:** Ative "Automatic HTTPS Rewrites" no Cloudflare.

### Problema: Cache não atualiza após deploy

**Causa:** Cloudflare ainda servindo versão antiga.

**Solução:** Purge Everything no Cloudflare após cada deploy.

### Problema: Fontes não carregam (CORS)

**Causa:** Headers CORS faltando.

**Solução:** Adicione no `.htaccess`:

```apache
<FilesMatch "\.(woff2?|ttf|otf|eot)$">
  Header set Access-Control-Allow-Origin "*"
</FilesMatch>
```

### Problema: Analytics do Cloudflare não funciona

**Causa:** CSP bloqueando scripts do Cloudflare.

**Solução:** Adicione `https://static.cloudflareinsights.com` ao `script-src` e `https://cloudflareinsights.com` ao `connect-src` no CSP (já incluído no .htaccess acima).

---

## 12. Monitoramento

### Cloudflare Analytics

- **Dashboard** → **Analytics** → Traffic, Security, Performance
- **Web Analytics** → Métricas detalhadas de visitantes (sem cookies)

### Performance

- Cloudflare → **Speed** → **Observatory** para métricas Core Web Vitals
- [PageSpeed Insights](https://pagespeed.web.dev/) para score do Google

---

## Resumo

1. `npm run build`
2. Configure Cloudflare (SSL, HSTS, Brotli, etc.)
3. Upload `dist/` → `public_html` no Hostinger
4. Crie `.htaccess` otimizado para Cloudflare
5. Purge cache no Cloudflare
6. Teste rotas e performance

---

**Autor:** Claude Code
**Última atualização:** 29/11/2025
