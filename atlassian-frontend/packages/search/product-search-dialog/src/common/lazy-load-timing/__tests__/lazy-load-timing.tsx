import { mount } from 'enzyme';
import React from 'react';
import { TimeLazyLoad } from '../../../common/lazy-load-timing/lazy-load-timing';

const mockFireAnalytics = jest.fn();

jest.mock('../../../common/analytics', () =>
  Object.assign({}, jest.requireActual('../../../common/analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent: mockFireAnalytics,
    }),
  }),
);

const TEST_PRODUCT = 'test';

describe('lazy loading timing', () => {
  beforeEach(() => {
    mockFireAnalytics.mockReset();
    global.Date.now = () => 0;
  });

  it('fires analytics event on unmount', () => {
    const wrapper = mount(<TimeLazyLoad product={TEST_PRODUCT} />);

    expect(mockFireAnalytics).not.toHaveBeenCalled();

    global.Date.now = () => 1;

    wrapper.unmount();

    expect(mockFireAnalytics).toHaveBeenCalledWith({
      action: 'loadComplete',
      actionSubject: 'searchDialogPane',
      actionSubjectId: TEST_PRODUCT,
      attributes: {
        durationMs: 1,
      },
      eventType: 'track',
      source: 'searchDialog',
    });
  });
});
