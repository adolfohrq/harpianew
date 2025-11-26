Execute uma verificação completa do projeto antes de fazer commit ou deploy.

## Passos

Execute em sequência:

### 1. Lint

```bash
npm run lint
```

- Corrigir erros automaticamente se possível
- Listar warnings

### 2. Testes

```bash
npm test
```

- Todos os testes devem passar

### 3. Build

```bash
npm run build
```

- Build deve completar sem erros
- Verificar se sitemap.xml foi gerado

### 4. Type Check (implícito no build)

- Nenhum erro de TypeScript

## Output esperado

```
🔍 Verificação Completa do Projeto

1️⃣ Lint
   ✅ ESLint: 0 erros, X warnings
   ✅ Prettier: formatação OK

2️⃣ Testes
   ✅ X testes passando
   ⏱️ Tempo: X.XXs

3️⃣ Build
   ✅ Build concluído em X.XXs
   ✅ Sitemap gerado (X URLs)

4️⃣ TypeScript
   ✅ Sem erros de tipo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PROJETO PRONTO PARA DEPLOY!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Se houver problemas

```
❌ PROBLEMAS ENCONTRADOS

1️⃣ Lint
   ❌ 2 erros em src/components/Foo.tsx
      - Line 10: 'unused' is defined but never used

2️⃣ Testes
   ❌ 1 teste falhando
      - SectionHeader.test.tsx: expected "Title" but got "Título"

Deseja que eu corrija esses problemas?
```
