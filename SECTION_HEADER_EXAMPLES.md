# SectionHeader - Guia de Uso

## Componente Reutilizável de Cabeçalho de Seção

O `SectionHeader` é um componente padronizado para cabeçalhos de seções em todo o projeto Harpia.

---

## 📋 Props

```typescript
interface SectionHeaderProps {
  label?: string; // Label superior opcional
  title: string; // Título principal (obrigatório)
  description?: string; // Descrição/subtítulo
  link?: {
    // Link opcional "Ver mais"
    to: string;
    text: string;
    ariaLabel?: string;
  };
  align?: 'left' | 'center'; // Alinhamento (padrão: 'left')
  descriptionMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string; // Classes customizadas (padrão: 'mb-16 md:mb-20')
}
```

---

## 🎯 Exemplos de Uso

### 1. Uso Completo (com todos os props)

```tsx
import { SectionHeader } from '@/components/ui';

<SectionHeader
  label="O que fazemos"
  title="NOSSOS SERVIÇOS"
  description="Somos movidos por resultados. Cada serviço é pensado estrategicamente para elevar sua marca."
  link={{
    to: '/servicos',
    text: 'Ver Detalhes',
    ariaLabel: 'Ver todos os detalhes dos serviços',
  }}
/>;
```

### 2. Uso Simples (apenas título)

```tsx
<SectionHeader title="SOBRE NÓS" />
```

### 3. Com Label e Descrição

```tsx
<SectionHeader
  label="Nossa História"
  title="QUEM SOMOS"
  description="Mais de 10 anos transformando marcas em experiências memoráveis."
/>
```

### 4. Centralizado

```tsx
<SectionHeader
  label="Portfolio"
  title="NOSSOS PROJETOS"
  description="Conheça alguns dos trabalhos que já realizamos para nossos clientes."
  align="center"
/>
```

### 5. Com Link e Descrição Curta

```tsx
<SectionHeader
  title="DEPOIMENTOS"
  description="O que nossos clientes dizem sobre nós."
  descriptionMaxWidth="lg"
  link={{
    to: '/cases',
    text: 'Ver Cases',
  }}
/>
```

### 6. Customizado com Margem Diferente

```tsx
<SectionHeader
  label="Blog"
  title="ÚLTIMAS NOTÍCIAS"
  description="Fique por dentro das novidades do mercado."
  className="mb-12"
/>
```

---

## 🎨 Variações de Largura da Descrição

```tsx
descriptionMaxWidth = 'sm'; // max-w-sm  (384px)
descriptionMaxWidth = 'md'; // max-w-md  (448px)
descriptionMaxWidth = 'lg'; // max-w-lg  (512px)
descriptionMaxWidth = 'xl'; // max-w-xl  (576px)
descriptionMaxWidth = '2xl'; // max-w-2xl (672px) - padrão
descriptionMaxWidth = 'full'; // max-w-full (100%)
```

---

## 📱 Responsividade

O componente é totalmente responsivo:

- **Mobile**: Centralizado por padrão
- **Desktop**: Alinhado à esquerda (ou conforme prop `align`)
- **Link**: Oculto em mobile, visível em desktop (`md:inline-flex`)

---

## ✅ Benefícios

1. **Consistência**: Todos os headers seguem o mesmo padrão visual
2. **DRY**: Evita duplicação de código
3. **Manutenibilidade**: Alterações centralizadas
4. **Tipagem**: TypeScript garante uso correto
5. **Acessibilidade**: ARIA labels e semântica HTML
6. **Performance**: Integrado com o componente Reveal para animações

---

## 🔄 Refatoração de Componentes Existentes

### Antes

```tsx
<header className="text-center md:text-left mb-16 md:mb-20">
  <Reveal>
    <span className="inline-block font-sans text-xs uppercase ...">O que fazemos</span>
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl ...">NOSSOS SERVIÇOS</h2>
    <div className="flex flex-col md:flex-row ...">
      <p className="font-sans text-gray-600 ...">Descrição...</p>
      <Link to="/servicos" className="...">
        Ver Detalhes
        <ArrowRight />
      </Link>
    </div>
  </Reveal>
</header>
```

### Depois

```tsx
<SectionHeader
  label="O que fazemos"
  title="NOSSOS SERVIÇOS"
  description="Descrição..."
  link={{ to: '/servicos', text: 'Ver Detalhes' }}
/>
```

**Redução**: ~25 linhas → 6 linhas! ✨

---

## 🎯 Componentes Candidatos para Refatoração

Use o `SectionHeader` nestes componentes:

- ✅ `ServicesHub.tsx` (já refatorado)
- [ ] `WhyHarpia.tsx`
- [ ] `Process.tsx`
- [ ] `Testimonials.tsx`
- [ ] `Projects.tsx` (se aplicável)
- [ ] Páginas `/Services`, `/Packages`, `/Contact`

---

## 🚀 Próximos Passos

1. Identificar componentes com headers similares
2. Refatorar gradualmente usando `SectionHeader`
3. Testar responsividade e acessibilidade
4. Atualizar documentação quando necessário

---

**Criado em**: 2025-11-23
**Localização**: `src/components/ui/SectionHeader.tsx`
