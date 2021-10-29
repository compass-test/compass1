import React from 'react';
import { mount } from 'enzyme';
import { ProfileCardTrigger } from '@atlaskit/profilecard';
import Avatar from '@atlaskit/avatar';
import AvatarGroup, { AvatarProps } from '@atlaskit/avatar-group';
import { AnalyticsProvider } from '../../index';
import { Contributors } from '../../components/Contributors';
import { AnalyticsWebClient } from '../../types';

import messages from '../../messages';
import { IntlProvider } from 'react-intl';

const getMockUsers = (count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      type: 'known',
      username: 'admin',
      accountId: `${i + 1}`,
      profilePicture: {
        path: '/aa/user',
      },
      displayName: `User ${i + 1}`,
    });
  }

  return result;
};

let windowOpen = jest.fn();
window.open = windowOpen;

describe('<Contributors />', () => {
  let mockAnalyticsWebClient: AnalyticsWebClient;
  beforeEach(() => {
    mockAnalyticsWebClient = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
    };
    windowOpen.mockReset();
  });

  test('should render AvatarGroup for valid props', () => {
    const users = getMockUsers(2);
    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <Contributors
          cloudId="AAA"
          contributors={{
            publishers: {
              users,
            },
          }}
        />
      </IntlProvider>,
    );

    expect(wrapper.find(Avatar)).toHaveLength(users.length);

    const avatarGroup = wrapper.find(AvatarGroup);
    expect(avatarGroup.props()).toMatchObject({
      size: 'small',
      appearance: 'stack',
      maxCount: 3,
    });

    const data: AvatarProps[] = avatarGroup.prop('data');
    data.forEach((user, index) => {
      expect(user).toMatchObject({
        name: `User ${index + 1}`,
        size: 'medium',
        src: '/aa/user',
        userId: `${index + 1}`,
      });
      expect(wrapper.find(ProfileCardTrigger).get(index).props).toMatchObject({
        cloudId: 'AAA',
        userId: `${index + 1}`,
      });
    });
  });

  test('should redirect to user profile when avatar in dropdown clicked', () => {
    const users = getMockUsers(4);
    const wrapper = mount(
      <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
        <IntlProvider locale="en" messages={messages}>
          <Contributors
            cloudId="AAA"
            contributors={{
              publishers: {
                users,
              },
            }}
            testId="test"
          />
        </IntlProvider>
      </AnalyticsProvider>,
    );

    wrapper.find('MoreIndicator').find('button').simulate('click');

    wrapper
      .find('[data-testid="test--avatargroup--overflow-menu"]')
      .find('button')
      .at(0)
      .simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'avatar',
        actionSubjectId: 'confluencePageTreeAvatar',
        attributes: expect.objectContaining({
          dropdown: true,
        }),
      }),
    );
    expect(open).lastCalledWith('/wiki/display/~3', '_blank');
  });

  test('should not render AvatarGroup for invalid props', () => {
    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <Contributors
          cloudId={null}
          contributors={{
            publishers: {
              users: getMockUsers(1),
            },
          }}
        />
      </IntlProvider>,
    );

    expect(wrapper.find(AvatarGroup)).toHaveLength(0);
    expect(wrapper.html()).toEqual('<small>Unknown</small>');
  });

  test('should fire an operational event for invalid props', () => {
    mount(
      <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
        <IntlProvider locale="en" messages={messages}>
          <Contributors
            cloudId={null}
            contributors={{
              publishers: {
                users: getMockUsers(1),
              },
            }}
          />
        </IntlProvider>
      </AnalyticsProvider>,
    );

    expect(mockAnalyticsWebClient.sendOperationalEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'unknownContributor',
        actionSubject: 'confluencePageTree',
      }),
    );
  });
});
