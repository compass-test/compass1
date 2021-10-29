import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { AddingUsersItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/adding-users/';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: '{base.for.adding.users}',
      opsgenieBaseUrl: 'SHOULD NOT APPEAR',
      projectId: '{project-id-for-adding-users}',
      product: Product.ServiceDesk,
    }),
  };
});

describe('<AddingUsersItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <AddingUsersItemCardContent />
    </IntlProvider>,
  ).find(AddingUsersItemCardContent);

  const peoplePageLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'People');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to the People page', () => {
    expect(peoplePageLink).toHaveLength(1);
    expect(peoplePageLink.prop('href')).toEqual(
      '{base.for.adding.users}/plugins/servlet/project-config/{project-id-for-adding-users}/people',
    );
    expect(peoplePageLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    peoplePageLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelAddingUsersPeoplePage',
    );
  });
});
