/* eslint-disable @repo/internal/react/no-class-components */
import { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  // returns a boolean indicating whether the error is unhandled
  onError?: (error: Error, info: ErrorInfo) => boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasUnhandledError: boolean }
> {
  state = {
    hasUnhandledError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError } = this.props;
    let newHasUnhandledError = true;
    if (onError) {
      newHasUnhandledError = onError(error, info);
    }
    this.setState({ hasUnhandledError: newHasUnhandledError });
  }

  render() {
    if (this.state.hasUnhandledError) {
      // do not show children if the error cannot be handled
      return null;
    }
    return this.props.children;
  }
}
