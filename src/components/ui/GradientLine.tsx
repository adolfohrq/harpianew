interface GradientLineProps {
  /** Direção do gradiente */
  direction?: 'left' | 'right';
  /** Variante de cor */
  variant?: 'light' | 'dark' | 'subtle';
  /** Tamanho da linha */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Classes adicionais */
  className?: string;
}

const sizes = {
  sm: 'w-8',
  md: 'w-12',
  lg: 'w-16',
  xl: 'w-24',
};

const variants = {
  light: 'to-white/30',
  dark: 'to-black/20',
  subtle: 'to-black/10',
};

/**
 * Linha decorativa com gradiente
 *
 * @example
 * // Par de linhas (padrão comum)
 * <GradientLine direction="right" />
 * <span>Label</span>
 * <GradientLine direction="left" />
 *
 * @example
 * // Linha escura para fundos claros
 * <GradientLine variant="dark" size="lg" />
 */
export const GradientLine = ({
  direction = 'right',
  variant = 'light',
  size = 'md',
  className = '',
}: GradientLineProps) => {
  const directionClass = direction === 'right' ? 'bg-linear-to-r' : 'bg-linear-to-l';

  return (
    <div
      className={`${sizes[size]} h-px ${directionClass} from-transparent ${variants[variant]} ${className}`}
    />
  );
};
