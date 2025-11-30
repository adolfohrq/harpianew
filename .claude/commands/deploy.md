Executa build de produção e deploy FTP para https://agenciaharpia.com.br

## Execução

1. `npm run build` — corrigir erros se houver e reexecutar
2. Verificar em `dist/`: `index.html`, `sitemap.xml`, `robots.txt`
3. `npm run deploy`

## Pós-deploy

Usar Playwright para verificar:

- https://agenciaharpia.com.br (carrega corretamente)
- https://agenciaharpia.com.br/servicos (SPA funciona)
- https://agenciaharpia.com.br/sitemap.xml (acessível)

## Regras

- NUNCA exibir credenciais FTP
- Se erro de conexão → consultar `guide/HOSTINGER_DEPLOY.md`
