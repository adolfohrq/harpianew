# Recomendações para o Projeto Harpia

**Data**: 30/11/2025
**Autor**: Claude Code
**Baseado em**: Análise completa do projeto e documentações existentes

---

## Sumário Executivo

Este documento contém recomendações objetivas organizadas por prioridade para melhorar o projeto Harpia, incluindo atualizações necessárias nas documentações, melhorias de código, e tarefas pendentes identificadas.

---

## 1. Atualizações Necessárias nas Documentações

### 1.1. README.md - Desatualizado

| Item                     | Status         | Ação Necessária                                   |
| ------------------------ | -------------- | ------------------------------------------------- |
| Link do Playwright Guide | ❌ Incorreto   | Mudar de `docs/PLAYWRIGHT_GUIDE.md` para `guide/` |
| Script `npm run deploy`  | ❌ Não listado | Adicionar na tabela de scripts                    |
| Script `npm run preview` | ❌ Não listado | Adicionar na tabela de scripts                    |
| Pasta `guide/`           | ❌ Não listada | Adicionar na estrutura                            |
| Pasta `reports/`         | ❌ Não listada | Adicionar na estrutura                            |
| Pasta `scripts/`         | ❌ Não listada | Adicionar na estrutura                            |

### 1.2. ARCHITECTURE.md - Desatualizado

| Item                        | Status             | Ação Necessária                                          |
| --------------------------- | ------------------ | -------------------------------------------------------- |
| Versão                      | ❌ 1.2.0           | Atualizar para 1.3.0                                     |
| Data                        | ❌ 2025-11-25      | Atualizar para 2025-11-30                                |
| Preloader refatorado        | ❌ Não documentado | Documentar uso de `transform: scale()` vs `width/height` |
| Deploy via FTP              | ❌ Não documentado | Adicionar seção sobre `npm run deploy`                   |
| OptimizedImage width/height | ⚠️ Desatualizado   | Atualizar para mostrar props obrigatórias                |
| Componentes services/       | ⚠️ Incompleto      | Adicionar `ServicesBenefits`, `ServicesGrid`             |
| Pasta scripts/              | ❌ Não listada     | Adicionar `deploy-ftp.js`, `build-sitemap.js`            |

### 1.3. DESIGN_SYSTEM.md - Parcialmente Desatualizado

| Item                    | Status           | Ação Necessária                           |
| ----------------------- | ---------------- | ----------------------------------------- |
| OptimizedImage          | ⚠️ Desatualizado | Atualizar para mostrar props obrigatórias |
| ErrorBoundary duplicado | ⚠️ Confuso       | Existe em `ui/` e na raiz de components   |
| Container               | ✅ OK            | Documentado corretamente                  |
| Skeleton                | ✅ OK            | Documentado corretamente                  |

### 1.4. CLAUDE.md - Precisa Atualização

| Item           | Status         | Ação Necessária                                  |
| -------------- | -------------- | ------------------------------------------------ |
| Script deploy  | ❌ Não listado | Adicionar `npm run deploy` na tabela de comandos |
| Pasta scripts/ | ❌ Não listada | Adicionar na estrutura                           |

### 1.5. Relatório de Performance - Desatualizado

| Item                   | Status            | Ação Necessária                                        |
| ---------------------- | ----------------- | ------------------------------------------------------ |
| Resultado do Preloader | ❌ Não registrado | Documentar que CLS foi de 0.51 para 0 após refatoração |
| Performance score      | ❌ Não registrado | Documentar que subiu de 64 para 86 no Lighthouse local |
| Deploy FTP             | ⚠️ Parcial        | Adicionar informações do deploy com `.htaccess`        |

---

## 2. Inconsistências no Código

### 2.1. Componentes Duplicados

```
src/components/ErrorBoundary.tsx      # Versão original
src/components/ui/ErrorBoundary.tsx   # Versão em ui/
```

**Recomendação**: Manter apenas a versão em `ui/` e atualizar imports em todos os arquivos.

### 2.2. Exports Faltando no Barrel

O arquivo `src/components/index.ts` deve ser verificado para garantir que todos os componentes estejam exportados. Componentes identificados que podem estar faltando:

- `AboutStatement`
- `AboutFeatures`
- `AboutTimeline`
- `AboutPillars`
- `ContactMain`

### 2.3. Arquivos de Exemplo/Teste em Produção

```
src/components/ui/SectionHeader.example.tsx  # Arquivo de exemplo
src/components/ui/SectionHeader.test.tsx     # Teste na pasta errada
```

**Recomendação**:

- Mover `SectionHeader.test.tsx` para pasta `src/test/` ou `__tests__/`
- Remover ou mover `SectionHeader.example.tsx` para pasta `docs/examples/`

---

## 3. Tarefas Pendentes de Performance

### 3.1. Alta Prioridade

| Tarefa                          | Status   | Impacto           |
| ------------------------------- | -------- | ----------------- |
| ✅ CLS do Preloader corrigido   | Feito    | CLS 0.51 → 0      |
| ✅ width/height obrigatórios    | Feito    | Previne CLS       |
| ✅ Deploy com .htaccess         | Feito    | Cache + GZIP      |
| ⏳ Testar PageSpeed em produção | Pendente | Validar melhorias |

### 3.2. Média Prioridade (Pendentes)

| Tarefa                              | Arquivo/Local          | Impacto        |
| ----------------------------------- | ---------------------- | -------------- |
| Adicionar `<track kind="captions">` | Hero.tsx, Showreel.tsx | Acessibilidade |
| Corrigir ARIA roles inválidos       | Diversos componentes   | Acessibilidade |
| Aumentar áreas de toque 48x48px     | Navbar, Footer         | Mobile UX      |
| Configurar HSTS no servidor         | .htaccess já feito     | Segurança      |

### 3.3. Baixa Prioridade

| Tarefa                           | Impacto            |
| -------------------------------- | ------------------ |
| Verificar CSP headers            | Segurança          |
| Adicionar `fetchpriority="high"` | LCP de hero images |
| Testar com Lighthouse CI         | Automação          |

---

## 4. Melhorias Recomendadas no Projeto

### 4.1. Estrutura de Pastas

```diff
src/
├── components/
│   ├── ui/
│   ├── services/
│   ├── contact/
+   ├── about/          # Mover AboutStatement, AboutFeatures, etc.
+   └── home/           # Mover Hero, Stats, ClientLogos, etc.
├── pages/
├── data/
├── hooks/
├── config/
+├── services/          # Para futuras integrações de API
└── types.ts
```

### 4.2. Scripts Recomendados

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "node scripts/deploy-ftp.js",
    "deploy:build": "npm run build && npm run deploy",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit"
  }
}
```

### 4.3. Variáveis de Ambiente

Mover credenciais de FTP do script para `.env`:

```env
# .env.local (não commitar)
FTP_HOST=45.14.89.141
FTP_USER=u871216306.adolfohrq
FTP_PASSWORD=***
FTP_REMOTE_DIR=/public_html
```

E atualizar `scripts/deploy-ftp.js` para usar `process.env`.

---

## 5. Guias - Status

| Guia                         | Status | Observação                                |
| ---------------------------- | ------ | ----------------------------------------- |
| `guide/PLAYWRIGHT_GUIDE.md`  | ✅ OK  | Completo e atualizado                     |
| `guide/TAILWIND_GUIDE.md`    | ✅ OK  | Referência útil                           |
| `guide/CLOUDFLARE_DEPLOY.md` | ✅ OK  | **CDN ATUAL** - Hostinger + Cloudflare    |
| `guide/HOSTINGER_DEPLOY.md`  | ⚠️     | Guia alternativo (sem Cloudflare)         |
| `guide/WORDPRESS_*.md`       | ⚠️     | 3 arquivos - consolidar ou indicar status |

**Recomendação**:

- Consolidar os 3 guias WordPress em um único documento
- `CLOUDFLARE_DEPLOY.md` é o guia principal de deploy (Hostinger como origem + Cloudflare como CDN)

---

## 6. SEO - Verificações Pendentes

| Item                       | Status       | Ação                                        |
| -------------------------- | ------------ | ------------------------------------------- |
| robots.txt ordem corrigida | ✅ Feito     | Verificar no Search Console                 |
| sitemap.xml                | ✅ OK        | Atualizado no build                         |
| Structured Data            | ✅ OK        | Hooks implementados                         |
| Meta tags dinâmicas        | ✅ OK        | useMetaTags funcionando                     |
| OG Images                  | ⚠️ Verificar | Confirmar que todas as páginas têm OG image |
| Canonical URLs             | ⚠️ Verificar | Confirmar em todas as páginas               |

---

## 7. Checklist de Deploy Futuro

```markdown
## Pré-Deploy

- [ ] Rodar `npm run lint` e corrigir erros
- [ ] Rodar `npm test` e garantir que todos passam
- [ ] Rodar `npm run build` localmente
- [ ] Testar `npm run preview` localmente
- [ ] Verificar Lighthouse local

## Deploy

- [ ] Executar `npm run deploy` (ou `npm run deploy:build`)
- [ ] Verificar site em produção
- [ ] Limpar cache CDN se necessário

## Pós-Deploy

- [ ] Testar PageSpeed (mobile e desktop)
- [ ] Verificar Search Console para erros
- [ ] Testar formulário de contato
- [ ] Verificar links internos
```

---

## 8. Ações Imediatas Recomendadas

### Prioridade 1 - Documentação (1-2 horas)

1. Atualizar `README.md`:
   - Adicionar scripts `deploy`, `preview`
   - Corrigir link do Playwright Guide
   - Adicionar pastas `guide/`, `reports/`, `scripts/`

2. Atualizar `ARCHITECTURE.md`:
   - Versão 1.3.0, data 2025-11-30
   - Documentar refatoração do Preloader
   - Atualizar seção de OptimizedImage

3. Atualizar `pagespeed-2024-11-29.md`:
   - Registrar resultados do Lighthouse local (CLS: 0, Performance: 86)
   - Documentar refatoração do Preloader

### Prioridade 2 - Código (2-4 horas)

1. Remover `src/components/ErrorBoundary.tsx` duplicado
2. Mover arquivos de teste para pasta correta
3. Mover credenciais FTP para `.env.local`
4. Verificar e atualizar barrel exports

### Prioridade 3 - Validação (1 hora)

1. Rodar PageSpeed em produção após propagação de cache
2. Verificar Search Console
3. Testar todas as páginas manualmente

---

## 9. Métricas de Sucesso

| Métrica        | Antes | Depois (Local) | Meta Produção |
| -------------- | ----- | -------------- | ------------- |
| Performance    | 66-67 | 86             | 90+           |
| CLS            | 0.786 | 0              | < 0.1         |
| LCP            | 2.9s  | ~1.5s          | < 2.5s        |
| Acessibilidade | 85    | 85             | 95+           |
| SEO            | 92    | 92             | 95+           |

---

## 10. Conclusão

O projeto Harpia está bem estruturado e documentado. As principais áreas que precisam de atenção são:

1. **Documentação desatualizada** - Principalmente README e ARCHITECTURE
2. **Código duplicado** - ErrorBoundary em duas localizações
3. **Segurança** - Credenciais FTP hardcoded no script
4. **Validação** - Testar PageSpeed em produção

Após as correções de CLS implementadas (Preloader + dimensões de imagens), o site deve atingir 90+ no PageSpeed quando testado em produção.

---

**Próxima revisão recomendada**: Após deploy e validação do PageSpeed em produção.
