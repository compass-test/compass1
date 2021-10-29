import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';

import { withAnalyticsListener } from '../withAnalyticsListener';
import { getAnalyticsWebClient } from '../analyticsWebClient';

jest.mock('../analyticsWebClient', () => ({
  ...jest.requireActual<any>('../analyticsWebClient'),
  getAnalyticsWebClient: jest.fn(),
}));

const WrappedComponent = () => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  return (
    <button
      data-testid="send-btn"
      onClick={() =>
        createAnalyticsEvent({
          action: 'button',
          actionSubject: 'test',
        }).fire('embeddedConfluence')
      }
    >
      Send Analytic
    </button>
  );
};
const MockedComponentWithAnalytics = withAnalyticsListener(WrappedComponent);

it('should trigger the analytic client with expected payload', () => {
  const mockOnEvent = jest.fn();
  const mockedAnalyticClient = {
    onEvent: mockOnEvent,
  };
  (getAnalyticsWebClient as jest.Mock).mockReturnValue(mockedAnalyticClient);

  const { getByTestId } = render(
    <MockedComponentWithAnalytics contentId="123" parentProduct="JSM" />,
  );

  userEvent.click(getByTestId('send-btn'));

  expect(mockOnEvent).toHaveBeenCalledTimes(1);
  expect(mockOnEvent).toBeCalledWith('embeddedConfluence', {
    action: 'button',
    actionSubject: 'test',
    attributes: {
      parentProduct: 'JSM',
    },
  });
});
