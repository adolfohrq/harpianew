# Convenções de Código Harpia

## Criação de Componentes

### ✅ Correto

interface ButtonProps {
label: string;
onClick: () => void;
variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
return (
<button onClick={onClick} className={`p-4 ${variant === 'primary' ? 'bg-black' : 'bg-white'}`}>
{label}
</button>
);
};### ❌ Errado (Não faça isso)

- Não use default export (usar named export facilita refatoração).
- Não deixe de tipar o `onClick`.

const Button = (props: any) => { ... }
export default Button;
