import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { ConnectPipelineItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/connect-pipeline';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: '{base.for.connect.pipeline}',
      opsgenieBaseUrl: 'SHOULD NOT APPEAR',
      projectId: '{project-id-for-connect-pipeline}',
      product: Product.ServiceDesk,
    }),
  };
});

describe('<ConnectPipelineItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <ConnectPipelineItemCardContent />
    </IntlProvider>,
  ).find(ConnectPipelineItemCardContent);

  const changeManagementLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Change management');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to Change management', () => {
    expect(changeManagementLink).toHaveLength(1);
    expect(changeManagementLink.prop('href')).toEqual(
      '{base.for.connect.pipeline}/servicedesk/admin/{project-id-for-connect-pipeline}/change-management',
    );
    expect(changeManagementLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    changeManagementLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelConnectPipelineChangeManagement',
    );
  });
});
