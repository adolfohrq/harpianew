Adicione novos dados estáticos ao projeto seguindo os padrões.

## Tipo de dado: $ARGUMENTS

Exemplos: `project`, `service`, `testimonial`, `team-member`

## Estrutura de dados do projeto

Os dados ficam em `src/data/` com tipos definidos em `src/types.ts`.

### Arquivos existentes

- `navigation.ts` - Links de navegação (NAV_LINKS)
- `services.ts` - Serviços oferecidos (SERVICES)
- `projects.ts` - Portfolio de projetos (PROJECTS)
- `packages.ts` - Pacotes de serviços (PACKAGES)
- `testimonials.ts` - Depoimentos (TESTIMONIALS)
- `about.ts` - Dados sobre a empresa

## Templates por tipo

### Novo Projeto (Portfolio)

```typescript
// Em src/data/projects.ts
{
  id: 'projeto-slug',
  title: 'Nome do Projeto',
  category: 'Branding',
  image: '/images/portfolio/projeto-thumb.jpg',
  slug: 'projeto-slug',
  description: 'Descrição curta do projeto.',
  client: 'Nome do Cliente',
  year: '2024',
  services: ['Branding', 'Design', 'Marketing'],
  challenge: 'Descrição do desafio...',
  solution: 'Descrição da solução...',
  results: [
    { metric: 'Aumento', value: '+150%', description: 'em engajamento' },
  ],
  gallery: ['/images/portfolio/projeto-1.jpg', '/images/portfolio/projeto-2.jpg'],
  testimonial: {
    text: 'Depoimento do cliente...',
    author: 'Nome',
    role: 'Cargo',
  },
}
```

### Novo Depoimento

```typescript
// Em src/data/testimonials.ts
{
  id: 'testimonial-id',
  text: 'Texto do depoimento...',
  author: 'Nome do Autor',
  company: 'Empresa',
}
```

### Novo Serviço

```typescript
// Em src/data/services.ts
{
  id: 'servico-id',
  title: 'Nome do Serviço',
  description: 'Descrição do serviço...',
  image: '/images/services/servico.jpg',
}
```

## Passos

1. Identificar o tipo de dado
2. Verificar se o tipo existe em `src/types.ts` (criar se necessário)
3. Adicionar dados no arquivo correspondente em `src/data/`
4. Verificar se está exportado em `src/data/index.ts`
5. Se for projeto de portfolio:
   - Adicionar em `PORTFOLIO_PROJECTS` no `seo.config.ts` (para sitemap)
   - Criar imagens na pasta `public/images/`

## Verificação de tipos

Sempre verificar que o novo dado corresponde ao tipo definido:

```typescript
// src/types.ts
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  description?: string;
  client?: string;
  year?: string;
  services?: string[];
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  gallery?: string[];
  testimonial?: { text: string; author: string; role: string };
}
```
