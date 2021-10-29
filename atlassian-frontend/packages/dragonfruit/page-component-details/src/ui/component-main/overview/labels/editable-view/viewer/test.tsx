import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { LabelsViewerExample } from './examples';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('ComponentLabelsViewer', () => {
  test('should fire analytics event when clicking on a label', async () => {
    const { getByTestId } = render(<LabelsViewerExample />);

    // Click on a label
    act(() => {
      userEvent.click(
        getByTestId(
          'pollinator.page-component-details.labels-viewer.label.label1',
        ),
      );
    });

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'componentLabel',
        }),
      }),
    );
  });
});
