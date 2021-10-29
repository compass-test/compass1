import React from 'react';

declare global {
  interface Window {
    Sentry?: {
      configureScope: any;
      captureException: (error: any) => void;
    };
  }
}

class ErrorBoundary extends React.Component<
  { children: any; fallback?: any },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (typeof window === 'undefined' || !window.Sentry) {
      return;
    }

    window.Sentry.configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    });

    window.Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <></>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
