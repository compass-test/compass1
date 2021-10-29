import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { EmailSetupItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/email-setup';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: '{base.for.email.setup}',
      opsgenieBaseUrl: 'SHOULD NOT APPEAR',
      projectId: '{project-id-for-email-setup}',
      product: Product.ServiceDesk,
    }),
  };
});

describe('<EmailSetupItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <EmailSetupItemCardContent />
    </IntlProvider>,
  ).find(EmailSetupItemCardContent);

  const emailSettingsLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Email requests');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to Email Requests', () => {
    expect(emailSettingsLink).toHaveLength(1);
    expect(emailSettingsLink.prop('href')).toEqual(
      '{base.for.email.setup}/servicedesk/admin/{project-id-for-email-setup}/email-settings',
    );
    expect(emailSettingsLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    emailSettingsLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelEmailSetupEmailRequests',
    );
  });
});
