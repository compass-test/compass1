import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { AddChangeApproversItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/add-change-approvers';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: '{base.for.add.change.approvers}',
      opsgenieBaseUrl: 'SHOULD NOT APPEAR',
      projectId: '{project-id-for-add-change-approvers}',
      product: Product.ServiceDesk,
    }),
  };
});

describe('<AddChangeApproversItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <AddChangeApproversItemCardContent />
    </IntlProvider>,
  ).find(AddChangeApproversItemCardContent);

  const serviceHubLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Services');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to Services', () => {
    expect(serviceHubLink).toHaveLength(1);
    expect(serviceHubLink.prop('href')).toEqual(
      '{base.for.add.change.approvers}/jira/servicedesk/projects/{project-id-for-add-change-approvers}/services',
    );
    expect(serviceHubLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    serviceHubLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelAddChangeApproversServiceRegistry',
    );
  });
});
