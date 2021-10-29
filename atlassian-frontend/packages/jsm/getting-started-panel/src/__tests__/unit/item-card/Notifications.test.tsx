import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { NotificationsItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/notifications';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: 'SHOULD NOT APPEAR',
      opsgenieBaseUrl: '{base.for.notifications}',
      projectId: 'SHOULD NOT APPEAR',
      product: Product.Opsgenie,
    }),
  };
});

describe('<NotificationsItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <NotificationsItemCardContent />
    </IntlProvider>,
  ).find(NotificationsItemCardContent);

  const notificationsLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Notifications');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to Notifications settings', () => {
    expect(notificationsLink).toHaveLength(1);
    expect(notificationsLink.prop('href')).toEqual(
      '{base.for.notifications}/settings/user/notification',
    );
    expect(notificationsLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    notificationsLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelNotificationsSettings',
    );
  });
});
