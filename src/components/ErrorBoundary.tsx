import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in ${this.props.sectionName || 'component'}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="py-16 px-6 text-center">
            <p className="text-gray-400 mb-4">
              {this.props.sectionName
                ? `Erro ao carregar ${this.props.sectionName}`
                : 'Erro ao carregar seção'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-sm text-harpia-white underline hover:text-harpia-accent transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
