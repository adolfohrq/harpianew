Execute o build e inicie o servidor de preview para testar a versão de produção.

## Passos

1. Execute o build de produção

```bash
npm run build
```

2. Inicie o servidor de preview

```bash
npm run preview
```

3. Informe a URL de acesso (geralmente `http://localhost:4173`)

## Verificações recomendadas

Após iniciar o preview, sugira ao usuário verificar:

### Performance

- [ ] Tempo de carregamento inicial
- [ ] Lazy loading das páginas funcionando
- [ ] Imagens carregando progressivamente

### Funcionalidades

- [ ] Navegação entre páginas
- [ ] Animações on-scroll (Reveal)
- [ ] Preloader aparece e desaparece
- [ ] Formulário de contato funcional

### SEO

- [ ] Verificar título e meta tags (DevTools > Elements > head)
- [ ] Verificar sitemap.xml acessível
- [ ] Verificar robots.txt acessível

### Mobile

- [ ] Layout responsivo
- [ ] Menu mobile funcional
- [ ] Touch interactions

## Output esperado

```
🚀 Preview de Produção

📦 Build:
   ✅ Concluído em X.XXs
   📊 Bundle total: XXX kB

🌐 Servidor:
   ✅ Rodando em http://localhost:4173

📋 Checklist de verificação:
   □ Testar navegação
   □ Verificar animações
   □ Testar responsividade
   □ Validar SEO (title, meta, sitemap)

Use Ctrl+C para parar o servidor.
```
