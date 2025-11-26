Refatore um componente ou arquivo seguindo os padrões do projeto.

## Alvo: $ARGUMENTS

## Verificações de refatoração

### 1. Padrões de código

- [ ] Named export (não default export)
- [ ] Props tipadas com interface
- [ ] React.FC<Props> para type safety
- [ ] Hooks no topo do componente
- [ ] Handlers depois dos hooks
- [ ] Return/render por último

### 2. Imports

- [ ] Usar path alias `@/` em vez de caminhos relativos
- [ ] Ordem correta:
  1. React e bibliotecas externas
  2. Types
  3. Data
  4. Components

### 3. Cores e tipografia

- [ ] Substituir cores hardcoded por design system
- [ ] `font-serif` para títulos, `font-sans` para corpo

### 4. Performance

- [ ] Lazy loading de imagens com `<OptimizedImage />`
- [ ] Animações com `<Reveal />`
- [ ] Memoização onde necessário

### 5. Acessibilidade

- [ ] aria-labels em elementos interativos
- [ ] Hierarquia de headings correta
- [ ] Focus states visíveis

## Template de refatoração

### Antes (exemplo ruim)

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

export default function Card(props: any) {
  return (
    <div className="bg-black text-white">
      <h3>{props.title}</h3>
      <img src={props.image} />
    </div>
  );
}
```

### Depois (exemplo correto)

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/ui';

interface CardProps {
  title: string;
  image: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, image, className = '' }) => {
  return (
    <div className={`bg-harpia-black text-harpia-white ${className}`}>
      <h3 className="font-serif text-2xl">{title}</h3>
      <OptimizedImage src={image} alt={title} className="w-full" />
    </div>
  );
};
```

## Passos

1. Leia o arquivo/componente alvo
2. Identifique violações dos padrões
3. Aplique as correções necessárias
4. Execute lint para validar
5. Liste as mudanças feitas
