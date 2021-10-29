import { ComponentType, ErrorInfo } from 'react';

export type FallbackComponent<T> = ComponentType<
  T & { error: Error; errorBoundaryOptions: ErrorBoundaryOptions<T> }
>;

export type ErrorBoundaryOptionsWithErrorReporting<T> = {
  Fallback?: FallbackComponent<T>; // The component to render when an error occurs, default to `SimpleErrorFallback`
  reportErrors?: true; // Controls whether to send an analytics event when an error occurs, default to `true`
  componentName: string; // The unique component name for displaying error messages and sending analytics events
  packageName?: string; // Package name of the component for sending analytics event, default to `dragonfruit`
};

export type ErrorBoundaryOptionsNoErrorReporting<T> = {
  // see comments for ErrorBoundaryOptionsWithErrorReporting
  Fallback?: FallbackComponent<T>;
  reportErrors: false;
};

// Two types are used here to simulate function overload. If `reportErrors` set to true, an additional parameter `componentName` is required.
export type ErrorBoundaryOptions<T> =
  | ErrorBoundaryOptionsWithErrorReporting<T>
  | ErrorBoundaryOptionsNoErrorReporting<T>;

export type ErrorBoundaryProps<T> = {
  Component: ComponentType<T>;
  forwardProps: T;
  options: Required<ErrorBoundaryOptions<T>>;
};
export type ErrorBoundaryState = { error?: Error; errorInfo?: ErrorInfo };
