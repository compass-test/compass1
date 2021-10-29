import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import StartProvider from '../start';
import { CrossFlowProvider } from '../lib/CrossFlowProvider';

const FAKE_LOCALE = 'en-US';

const mockAnalyticsClient = {
  sendUIEvent: jest.fn(),
  sendTrackEvent: jest.fn(),
  sendOperationalEvent: jest.fn(),
  sendScreenEvent: jest.fn(),
};

describe('StartProvider', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <StartProvider
        analyticsClient={mockAnalyticsClient}
        locale={FAKE_LOCALE}
      />,
    );
  });

  it('should set the right originProduct', () => {
    expect(wrapper.find(CrossFlowProvider).prop('originProduct')).toEqual(
      'start',
    );
  });
});
