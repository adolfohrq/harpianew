import React from 'react';

type ContainerElement = 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: ContainerElement;
}

/**
 * Container - Componente wrapper para consistência de layout
 *
 * Aplica max-width, padding horizontal e z-index padrão do projeto.
 *
 * @example
 * // Uso básico
 * <Container>
 *   <h1>Conteúdo</h1>
 * </Container>
 *
 * @example
 * // Com elemento semântico
 * <Container as="section" className="py-20">
 *   <h2>Seção</h2>
 * </Container>
 *
 * @example
 * // Sem z-index (para uso dentro de seções com overlay)
 * <Container className="relative">
 *   <p>Conteúdo sem z-10</p>
 * </Container>
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => {
  return (
    <Component className={`max-w-7xl mx-auto px-6 relative z-10 ${className}`.trim()}>
      {children}
    </Component>
  );
};
