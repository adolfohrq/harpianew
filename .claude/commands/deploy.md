Execute o build de produção e faça o deploy via FTP para a Hostinger.

## Pré-requisitos

Antes de executar o deploy, verifique:

1. **Arquivo `.env.local`** deve existir na raiz com as credenciais FTP:

```env
FTP_HOST=seu-host.com
FTP_USER=seu-usuario
FTP_PASSWORD=sua-senha
FTP_SECURE=true
```

2. **Dependência `basic-ftp`** instalada (já está no projeto)

## Passos

### 1. Verificar credenciais

- [ ] Confirme que `.env.local` existe
- [ ] Não exiba as credenciais no output

### 2. Executar build de produção

```bash
npm run build
```

Se houver erros:

- Liste todos os erros encontrados
- Corrija automaticamente
- Execute o build novamente

### 3. Verificações pré-deploy

Antes de fazer o upload, verifique em `dist/`:

- [ ] `index.html` existe
- [ ] `sitemap.xml` existe
- [ ] `robots.txt` existe
- [ ] Assets CSS/JS foram gerados

### 4. Executar deploy

```bash
npm run deploy
```

Se houver erros de conexão:

- Verifique se as credenciais estão corretas
- Verifique se o host está acessível
- Sugira testar a conexão FTP manualmente

### 5. Verificações pós-deploy

Após o deploy:

- [ ] Site acessível em https://agenciaharpia.com.br
- [ ] Navegação funcionando (SPA com .htaccess)
- [ ] Imagens carregando corretamente
- [ ] Sitemap acessível em /sitemap.xml

## Output esperado

```
🚀 Deploy para Produção

📋 Pré-verificações:
   ✅ Credenciais FTP configuradas
   ✅ Pasta dist/ existe

📦 Build:
   ✅ Concluído em X.XXs
   📊 Bundle total: XXX kB

📤 Upload FTP:
   🔌 Conectando ao servidor...
   ✅ Conectado!
   📁 Enviando arquivos...
   ✅ Upload concluído!

✅ Deploy finalizado com sucesso!

🌐 Site: https://agenciaharpia.com.br

📋 Verificações recomendadas:
   □ Acessar o site e testar navegação
   □ Verificar /sitemap.xml
   □ Testar em dispositivo mobile
   □ Limpar cache do CDN (se aplicável)
```

## Troubleshooting

### Erro: Variáveis de ambiente faltando

Crie o arquivo `.env.local` na raiz do projeto com as credenciais.

### Erro: Conexão FTP recusada

- Verifique se o host está correto
- Confirme que FTP está habilitado na Hostinger
- Tente com `FTP_SECURE=false` se FTPS não funcionar

### Erro: Permissão negada

- Verifique se o usuário FTP tem permissão de escrita
- Confirme que o diretório remoto está correto

### Rotas não funcionam (404)

O `.htaccess` precisa estar configurado corretamente. Consulte `guide/HOSTINGER_DEPLOY.md`.

## Regras

- NUNCA exiba credenciais FTP no output
- Sempre execute build antes do deploy
- Verifique arquivos essenciais antes do upload
- Sugira limpar cache do CDN após deploy
