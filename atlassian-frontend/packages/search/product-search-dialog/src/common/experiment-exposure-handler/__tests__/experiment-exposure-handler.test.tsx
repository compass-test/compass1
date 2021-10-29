import React from 'react';
import { mount } from 'enzyme';
import ExperimentExposureHandler from '../experiment-exposure-handler';
import { useSearchSessionId } from '../../search-session-provider';
import 'jest-extended';

const mockFireAnalyticsEvent = jest.fn();

jest.mock('../../analytics', () => ({
  useAnalytics: () => ({
    fireAnalyticsEvent: mockFireAnalyticsEvent,
  }),
}));

jest.mock('../../search-session-provider', () => ({
  useSearchSessionId: jest.fn(),
}));

describe('<ExperimentExposureHandler />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchSessionId as jest.Mock).mockReturnValue('searchSessionId');
  });

  it('should fire the right event', () => {
    mount(<ExperimentExposureHandler />);

    expect(mockFireAnalyticsEvent).toBeCalledTimes(1);
    expect(mockFireAnalyticsEvent).toHaveBeenCalledWith({
      eventType: 'operational',
      action: 'exposed',
      actionSubject: 'quickSearchExperiment',
      source: 'searchDialog',
    });
  });

  it('should not fire if sessionId is the same', () => {
    const wrapper = mount(<ExperimentExposureHandler />);

    mockFireAnalyticsEvent.mockClear();

    wrapper.setProps({
      newProps: 'abc',
    });

    wrapper.update();

    expect(mockFireAnalyticsEvent).toBeCalledTimes(0);
  });

  it('should fire if sessionId is changed', () => {
    const wrapper = mount(<ExperimentExposureHandler />);

    mockFireAnalyticsEvent.mockClear();
    (useSearchSessionId as jest.Mock).mockReturnValue('anotherSearchSessionId');
    wrapper.setProps({});

    expect(mockFireAnalyticsEvent).toBeCalledTimes(1);
    expect(mockFireAnalyticsEvent).toHaveBeenCalledWith({
      eventType: 'operational',
      action: 'exposed',
      actionSubject: 'quickSearchExperiment',
      source: 'searchDialog',
    });
  });
});
