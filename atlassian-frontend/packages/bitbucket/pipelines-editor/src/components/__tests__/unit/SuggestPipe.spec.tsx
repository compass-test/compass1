import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';

import SuggestPipe from '../../SuggestPipe';

jest.mock('@atlaskit/analytics-next', () => {
  const createAnalyticsEvent = jest.fn(() => ({ fire: jest.fn() }));
  return {
    withAnalyticsEvents: jest.fn(() => jest.fn((args) => args)),
    withAnalyticsContext: jest.fn(() => jest.fn((args) => args)),
    createAndFireEvent: jest.fn(() => jest.fn((args) => args)),
    usePlatformLeafEventHandler: jest.fn(({ fn }) => fn),
    useAnalyticsEvents: () => ({ createAnalyticsEvent }),
  };
});

describe('SuggestPipe component', () => {
  it('should send event with pipe suggestion', () => {
    const component = render(<SuggestPipe isInline />);
    const input = component.getByLabelText('suggest-a-pipe');
    const button = component.getByText('Send');

    fireEvent.change(input, { target: { value: 'foo' } });
    fireEvent.click(button, { button: 1 });
    expect(useAnalyticsEvents().createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'suggested',
      actionSubject: 'pipe',
      actionSubjectId: 'discoverPipesModal',
      attributes: { pipe: 'foo' },
    });
  });
});
