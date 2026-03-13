import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary] ${this.props.moduleName ?? 'Module'} crashed:`, error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container" role="alert">
          <div className="error-boundary-card">
            <div className="error-boundary-icon">⚠️</div>
            <h3 className="error-boundary-title">
              {this.props.moduleName ? `${this.props.moduleName} crashed` : 'Something went wrong'}
            </h3>
            <p className="error-boundary-message">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button className="btn btn-primary" onClick={this.handleReset}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
