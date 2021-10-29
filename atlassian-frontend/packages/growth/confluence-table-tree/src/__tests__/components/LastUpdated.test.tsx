import React from 'react';
import { mount } from 'enzyme';
import LastUpdated from '../../components/LastUpdated';
import { AnalyticsWebClient } from '../../types';
import { AnalyticsProvider } from '../../index';
import { LastUpdatedContainer, LastUpdatedUnknown } from '../../styled';
import messages from '../../messages';

import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' });
const { intl } = intlProvider.getChildContext();
const unknown = intl.formatMessage(messages.unknown);

describe('<LastUpdated />', () => {
  let mockAnalyticsWebClient: AnalyticsWebClient;
  beforeEach(() => {
    mockAnalyticsWebClient = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
    };
  });

  test('should render the last updated time when props are passed', () => {
    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <LastUpdated lastUpdated={{ friendlyWhen: 'Today' }} />
      </IntlProvider>,
    );
    expect(wrapper.find(LastUpdatedContainer).text()).toEqual('Today');
  });

  test('should render unknown when invalid props are passed', () => {
    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <LastUpdated />,
        </AnalyticsProvider>
      </IntlProvider>,
    );

    expect(wrapper.find(LastUpdatedUnknown).text()).toEqual(unknown);
    expect(mockAnalyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'unknownContributor',
        actionSubject: 'confluencePageTree',
      }),
    );
  });
});
