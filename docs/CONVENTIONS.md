# Convenções de Código Harpia

## Criação de Componentes

### ✅ Correto

```tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  // Use classes condicionais ou libs como clsx/tailwind-merge se disponível
  const baseClasses = 'p-4 rounded transition-colors';
  const variantClasses =
    variant === 'primary'
      ? 'bg-harpia-white text-harpia-black hover:bg-harpia-accent'
      : 'bg-transparent border border-harpia-gray text-harpia-white';

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {label}
    </button>
  );
};
```

### ❌ Errado (Não faça isso)

- Não use `default export` (usar named export facilita refatoração).
- Não deixe de tipar (não use `any`).
- Não use cores arbitrárias hardcoded (ex: `bg-black` onde deveria ser `bg-harpia-black`).

```tsx
const Button = (props: any) => { ... }
export default Button;
```

## Estrutura de Arquivos

- **Componentes**: PascalCase (ex: `MyComponent.tsx`)
- **Hooks**: camelCase com prefixo use (ex: `useScroll.ts`)
- **Utils**: camelCase (ex: `formatDate.ts`)

## Imports

Ordem sugerida:

1. React / Core libraries
2. Third-party libs
3. Componentes locais
4. Utils / Types / Assets

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { formatDate } from '../utils/format';
```
