import React from 'react';

import { fireEvent, queryHelpers, render, wait } from '@testing-library/react';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentSearch } from './index';

jest.mock(
  '@atlassiansox/engagekit/dist/esm/coordination/coordination-client',
  () => ({}),
);

jest.mock('@atlassian/analytics-bridge', () =>
  Object.assign({}, jest.requireActual('@atlassian/analytics-bridge'), {
    fireUIAnalytics: jest.fn(),
  }),
);

const MockedSearchFlyout = () => {
  return (
    <CompassTestProvider>
      <ComponentSearch />
    </CompassTestProvider>
  );
};

describe('ComponentSearch', () => {
  test('the search flyout is rendered and analytics are fired', async () => {
    const { container } = render(<MockedSearchFlyout />);

    // @testing-library/react returns a getByTestId, but it looks for data-testid
    // search-dialog uses data-test-id instead.
    const queryByTestId = queryHelpers.queryByAttribute.bind(
      null,
      'data-test-id',
    );

    // Suspense fallback is rendered
    expect(
      queryByTestId(container, 'search-dialog-search-skeleton'),
    ).toBeInTheDocument();

    // Suspense resolves
    await wait(() =>
      expect(
        queryByTestId(container, 'search-dialog-input'),
      ).toBeInTheDocument(),
    );

    // Click on Input to focus it
    queryByTestId(container, 'search-dialog-input')!.click();
    expect(fireUIAnalytics).toBeCalledWith(
      expect.objectContaining({
        payload: {
          action: 'opened',
          actionSubject: 'searchDialogPreQueryScreen',
        },
      }),
    );

    (fireUIAnalytics as any).mockClear();

    // Escape from flyout to close it
    fireEvent.keyDown(queryByTestId(container, 'search-dialog-input')!, {
      key: 'Escape',
      code: 'Escape',
    });

    expect(fireUIAnalytics).toBeCalledWith(
      expect.objectContaining({
        payload: {
          action: 'closed',
          actionSubject: 'searchDialogPreQueryScreen',
        },
      }),
    );
  });
});
