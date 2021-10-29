import React from 'react';
import { shallow } from 'enzyme';
import TrelloProvider from '../trello';
import { CrossFlowProvider } from '../lib/CrossFlowProvider';

const FAKE_LOCALE = 'en-US';
const FAKE_EDGE_PREFIX = 'api-gateway.trello.com';
const FAKE_AA_MASTERED_STATUS = true;

const mockAnalyticsClient = {
  sendUIEvent: jest.fn(),
  sendTrackEvent: jest.fn(),
  sendOperationalEvent: jest.fn(),
  sendScreenEvent: jest.fn(),
};

describe('TrelloProvider', () => {
  const wrapper = shallow(
    <TrelloProvider
      locale={FAKE_LOCALE}
      analyticsClient={mockAnalyticsClient}
      edgePrefix={FAKE_EDGE_PREFIX}
      isAaMastered={FAKE_AA_MASTERED_STATUS}
      env="production"
      onError={() => {}}
    />,
  );

  it('should set the right originProduct', () => {
    expect(wrapper.find(CrossFlowProvider).prop('originProduct')).toEqual(
      'trello',
    );
  });
});
