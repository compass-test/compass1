import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { AssignOwnerItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/assign-owner';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: 'SHOULD NOT APPEAR',
      opsgenieBaseUrl: '{base.for.assign.owner}',
      projectId: 'SHOULD NOT APPEAR',
      product: Product.Opsgenie,
    }),
  };
});

describe('<AssignOwnerItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <AssignOwnerItemCardContent />
    </IntlProvider>,
  ).find(AssignOwnerItemCardContent);

  const servicesLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Services');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to the Services page', () => {
    expect(servicesLink).toHaveLength(1);
    expect(servicesLink.prop('href')).toEqual(
      '{base.for.assign.owner}/service/list',
    );
    expect(servicesLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    servicesLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelAssignOwnerServices',
    );
  });
});
