import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { CustomizePortalLogoItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/custom-portal-logo';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: '{base.for.custom.logo}',
      opsgenieBaseUrl: 'SHOULD NOT APPEAR',
      projectId: '{project-id-for-custom-logo}',
      product: Product.ServiceDesk,
    }),
  };
});

describe('<CustomizePortalLogoItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <CustomizePortalLogoItemCardContent />
    </IntlProvider>,
  ).find(CustomizePortalLogoItemCardContent);

  const portalSettingsLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Portal settings');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to Portal Settings', () => {
    expect(portalSettingsLink).toHaveLength(1);
    expect(portalSettingsLink.prop('href')).toEqual(
      '{base.for.custom.logo}/servicedesk/admin/{project-id-for-custom-logo}/portal-settings',
    );
    expect(portalSettingsLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    portalSettingsLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelCustomPortalLogoPortalSettings',
    );
  });
});
