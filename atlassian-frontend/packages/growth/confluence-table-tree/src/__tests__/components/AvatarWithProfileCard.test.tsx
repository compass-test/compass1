import React from 'react';
import { mount } from 'enzyme';
import Avatar from '@atlaskit/avatar';
import { AvatarWithProfileCard } from '../../components/Contributors';
import { AnalyticsProvider } from '../../index';
import { AnalyticsWebClient } from '../../types';
import messages from '../../messages';

import { IntlProvider } from 'react-intl';

describe('<AvatarWithProfileCardBase />', () => {
  let mockAnalyticsWebClient: AnalyticsWebClient;
  beforeEach(() => {
    mockAnalyticsWebClient = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
    };
  });
  test('should render Avatar component integrated with Profilecard component', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <AvatarWithProfileCard userId="aaa" username="aaa" cloudId="AAA" />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    wrapper.find(Avatar).find('button').simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'avatar',
        actionSubjectId: 'confluencePageTreeAvatar',
        attributes: expect.objectContaining({
          dropdown: false,
        }),
      }),
    );
  });
});
