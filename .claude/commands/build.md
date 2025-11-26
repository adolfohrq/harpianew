Execute o build de produção e verifique se tudo está correto.

## Passos

1. Execute `npm run build`
2. Se houver erros de TypeScript ou build:
   - Liste todos os erros encontrados
   - Analise cada erro
   - Corrija automaticamente
   - Execute o build novamente para confirmar
3. Se o build passar, verifique os arquivos gerados

## Verificações pós-build

### Arquivos obrigatórios em `dist/`

- [ ] `index.html` existe
- [ ] `sitemap.xml` existe e contém todas as rotas
- [ ] `robots.txt` existe e aponta para o sitemap
- [ ] Assets CSS/JS foram gerados

### Análise de bundle

Informe o tamanho dos principais chunks:

- `index-*.js` (bundle principal)
- `vendor-*.js` (React, React Router)
- `icons-*.js` (Lucide icons)
- CSS total

### Verificação de sitemap

- Confirme que o sitemap foi gerado pelo plugin
- Liste o número de URLs geradas
- Verifique se todas as rotas estáticas estão incluídas

## Output esperado

```
✅ Build concluído com sucesso!

📦 Bundle Analysis:
   - JS principal: XX kB (gzip: XX kB)
   - Vendor: XX kB (gzip: XX kB)
   - CSS: XX kB (gzip: XX kB)

🗺️ Sitemap:
   - URLs estáticas: X
   - URLs de portfolio: X
   - Total: X URLs

📁 Arquivos gerados:
   - dist/index.html
   - dist/sitemap.xml
   - dist/robots.txt
   - dist/assets/...
```

## Regras

- Siga os padrões do projeto (CLAUDE.md)
- Use as cores do design system Harpia
- Mantenha named exports
- Props sempre tipadas
- Se corrigir erros, execute lint após as correções
