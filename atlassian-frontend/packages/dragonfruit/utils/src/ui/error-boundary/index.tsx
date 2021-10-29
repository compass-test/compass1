import React, { ComponentType, ErrorInfo } from 'react';

import defaults from 'lodash/defaults';

import { fireErrorAnalytics } from '@atlassian/error-handling';

import {
  ErrorBoundaryOptions,
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../../common/types/error-boundary';
import { isInDevMode } from '../../services/dev-mode';

import ErrorBoundaryVisualizer from './error-boundary-visualizer';
import { DetailedErrorFallback } from './fallbacks/detailed';
import { SimpleErrorFallback } from './fallbacks/simple';

const DEFAULT_PACKAGE_NAME = 'dragonfruit';

export const defaultErrorBoundaryOptions = {
  Fallback: SimpleErrorFallback,
  reportErrors: true,
  packageName: DEFAULT_PACKAGE_NAME,
};

// eslint-disable-next-line @repo/internal/react/no-class-components
class ErrorBoundary<T> extends React.Component<
  ErrorBoundaryProps<T>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps<T>) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.options.reportErrors) {
      const { componentName, packageName } = this.props.options;

      fireErrorAnalytics({
        error,
        errorInfo,
        meta: {
          id: componentName,
          packageName,
        },
      });
    }

    this.setState({ error, errorInfo });
  }

  render() {
    const { error } = this.state;
    const { Component, forwardProps, options } = this.props;
    const { Fallback } = options;

    if (error) {
      return (
        <Fallback
          {...forwardProps}
          errorBoundaryOptions={options}
          error={error}
        />
      );
    }

    if (isInDevMode) {
      return (
        <>
          <ErrorBoundaryVisualizer />
          <Component {...forwardProps} />
        </>
      );
    }

    return <Component {...forwardProps} />;
  }
}

export const withErrorBoundary = <T,>(
  Component: ComponentType<T>,
  options: ErrorBoundaryOptions<T>,
) => {
  const optionsWithDefaults = defaults(options, defaultErrorBoundaryOptions);

  return (props: T) => (
    <ErrorBoundary
      Component={Component}
      forwardProps={props}
      options={optionsWithDefaults}
    />
  );
};

export const withDetailedErrorBoundary = <T,>(
  Component: ComponentType<T>,
  options: ErrorBoundaryOptions<any>,
) =>
  withErrorBoundary(Component, { Fallback: DetailedErrorFallback, ...options });
