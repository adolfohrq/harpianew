import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Componente de fallback a ser exibido em caso de erro */
  fallback?: ReactNode;
  /** Callback chamado quando um erro é capturado */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - Captura erros em componentes filhos
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <PortfolioPreview />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('[ErrorBoundary] Erro capturado:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="bg-harpia-gray/50 rounded-lg p-8 max-w-md">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-harpia-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="font-serif text-xl text-harpia-white mb-2">Algo deu errado</h3>
            <p className="text-harpia-white/70 text-sm mb-6">
              Não foi possível carregar este conteúdo. Por favor, tente novamente.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-harpia-white text-harpia-black font-medium rounded-sm hover:bg-harpia-white/90 transition-colors"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * PortfolioErrorFallback - Fallback específico para erros de portfolio
 */
export const PortfolioErrorFallback: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="bg-harpia-gray/30 border border-harpia-gray rounded-lg p-8 max-w-lg">
      <svg
        className="w-12 h-12 mx-auto mb-4 text-harpia-white/40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <h3 className="font-serif text-xl text-harpia-white mb-2">Erro ao carregar projetos</h3>
      <p className="text-harpia-white/60 text-sm mb-6">
        Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 border border-harpia-white/30 text-harpia-white font-medium rounded-sm hover:bg-harpia-white/10 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  </div>
);

export default ErrorBoundary;
