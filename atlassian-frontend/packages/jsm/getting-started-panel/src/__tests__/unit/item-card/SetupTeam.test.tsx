import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { SetupTeamItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/setup-team';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../../common/ui/url-data', () => {
  const { Product } = require('../../../common/types');
  return {
    useUrlData: () => ({
      serviceDeskBaseUrl: 'SHOULD NOT APPEAR',
      opsgenieBaseUrl: '{base.for.setup.team}',
      projectId: 'SHOULD NOT APPEAR',
      product: Product.Opsgenie,
    }),
  };
});

describe('<SetupTeamItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <SetupTeamItemCardContent />
    </IntlProvider>,
  ).find(SetupTeamItemCardContent);

  const teamsLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Teams');

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to the Teams page', () => {
    expect(teamsLink).toHaveLength(1);
    expect(teamsLink.prop('href')).toEqual('{base.for.setup.team}/teams/list');
    expect(teamsLink.prop('target')).toEqual('_self');
  });

  it('should fire a event when the link is clicked', () => {
    teamsLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelSetupTeamTeams',
    );
  });
});
