import React, { FC } from 'react';

import { render } from '@testing-library/react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';

import { ScreenViewEvent } from '../../../src';

jest.mock('@atlaskit/analytics-next');

const mockFire = jest.fn();
const mockCreateAnalyticsEvent = jest.fn(() => {
  return { fire: mockFire };
});

(useAnalyticsEvents as jest.Mock).mockReturnValue({
  createAnalyticsEvent: mockCreateAnalyticsEvent,
});

describe('ScreenViewEvent', () => {
  const Component: FC<{ text: string }> = ({ text }) => (
    <>
      {text}
      <ScreenViewEvent />
    </>
  );

  beforeEach(() => {
    return jest.clearAllMocks();
  });

  it('should fire screen event', () => {
    render(<Component text="FakeText" />);

    expect(mockFire).toHaveBeenCalledTimes(1);
    expect(mockCreateAnalyticsEvent).toHaveBeenCalledTimes(1);
    expect(mockCreateAnalyticsEvent).toHaveBeenCalledWith({
      eventType: 'SCREEN',
    });
  });

  it('should fire screen event only once', () => {
    const { rerender } = render(<Component text="FakeText" />);

    expect(mockFire).toHaveBeenCalledTimes(1);
    expect(mockCreateAnalyticsEvent).toHaveBeenCalledTimes(1);
    rerender(<Component text="FakeText" />);
    expect(mockFire).toHaveBeenCalledTimes(1);
    expect(mockCreateAnalyticsEvent).toHaveBeenCalledTimes(1);
  });
});
