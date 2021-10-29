import React, { Suspense, SuspenseProps } from 'react';

import ErrorBoundary, { ErrorBoundaryProps } from '../error-boundary';

type Props = Omit<ErrorBoundaryProps, 'fallbackUI'> & {
  errorFallback?: ErrorBoundaryProps['fallbackUI'];
  loadingFallback: SuspenseProps['fallback'];
};

export const ErrorBoundarySuspense: React.FC<Props> = ({
  children,
  loadingFallback,
  errorFallback = <React.Fragment />,
  subjectId,
  ...errorBoundaryProps
}) => (
  <ErrorBoundary
    fallbackUI={errorFallback}
    subjectId={subjectId}
    {...errorBoundaryProps}
  >
    <Suspense fallback={loadingFallback}>{children}</Suspense>
  </ErrorBoundary>
);
