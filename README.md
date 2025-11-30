# Harpia Agência

Landing page de alta performance para agência de marketing digital.

## Stack

- **React 19** + TypeScript
- **Vite 6** (dev server na porta 5020)
- **Tailwind CSS v4**
- **React Router 7** (BrowserRouter)

## Início Rápido

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Testes
npm test
```

## Estrutura

```
src/
├── components/     # Componentes React
│   ├── ui/         # Componentes reutilizáveis
│   ├── services/   # Componentes de Serviços
│   └── contact/    # Componentes de Contato
├── pages/          # Páginas (lazy-loaded)
├── data/           # Dados estáticos
├── hooks/          # Custom hooks (useMetaTags, useStructuredData, useAnalytics, useWordPressProjects)
├── config/         # Configurações (SEO, API)
├── lib/            # Utilitários (validações com Zod)
├── services/       # Serviços externos (WordPress API)
├── test/           # Configuração de testes
└── types.ts        # TypeScript interfaces
```

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md) - Estrutura, rotas, padrões
- [Design System](docs/DESIGN_SYSTEM.md) - Cores, tipografia, UI
- [Playwright Guide](guide/PLAYWRIGHT_GUIDE.md) - Testes de UI e automação

## Scripts

| Comando          | Descrição                   |
| ---------------- | --------------------------- |
| `npm run dev`    | Servidor de desenvolvimento |
| `npm run build`  | Build de produção           |
| `npm test`       | Executar testes             |
| `npm run lint`   | Verificar código            |
| `npm run format` | Formatar código             |
| `npm run deploy` | Deploy via FTP              |

## Licença

Privado - Harpia Agência
