import React from 'react';

import { waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { ErrorBoundarySuspense } from './index';

const LazyLoadSVG = React.lazy(
  () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_notification-list/Flag" */
      '../flag'
    ),
);

const LazyLoadSVGWithError = React.lazy(() =>
  import(
    /* webpackChunkName: "@atlaskit-internal_notification-list/Flag" */
    '../flag'
  ).then(() => {
    throw new Error('Mock fail');
  }),
);

const mockTrigger = jest.fn();
jest.mock('../../utils/analytics', () => ({
  triggerErrorBoundaryRenderedEvent: mockTrigger,
  useCreateFireAnalyticsFromTrigger: jest
    .fn()
    .mockImplementation(() => mockTrigger),
}));

describe('ErrorBoundarySuspense', () => {
  beforeEach(() => {
    mockTrigger.mockClear();
  });

  it('should load SVG', async () => {
    const { container } = render(
      <ErrorBoundarySuspense
        subjectId="adf"
        errorFallback={<p>Error</p>}
        loadingFallback={<p>Loading</p>}
      >
        <LazyLoadSVG />
      </ErrorBoundarySuspense>,
    );

    expect(container.textContent).toEqual('Loading');
    await waitFor(() => expect(container.textContent).not.toEqual('Loading'));

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(mockTrigger).toHaveBeenCalledTimes(0);
  });

  it('should render errorFallback', async () => {
    const { container } = render(
      <ErrorBoundarySuspense
        subjectId="adf"
        errorFallback={<p>Error rendered</p>}
        loadingFallback={<p>Loading</p>}
        isCritical
      >
        <LazyLoadSVGWithError />
      </ErrorBoundarySuspense>,
    );

    expect(container.textContent).toEqual('Loading');
    await waitFor(() => expect(container.textContent).not.toEqual('Loading'));

    expect(container.querySelector('svg')).not.toBeInTheDocument();
    expect(container.textContent).toEqual('Error rendered');
    expect(mockTrigger).toHaveBeenCalledTimes(1);
    expect(mockTrigger).toHaveBeenCalledWith('adf', true, undefined, undefined);
  });
});
