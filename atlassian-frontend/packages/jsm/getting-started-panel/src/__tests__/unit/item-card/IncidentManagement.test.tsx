import * as mocks from './IncidentManagement.test.mock';
import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { TaskId } from '../../../common/types';
import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { IncidentManagementItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/incident-management';

describe('<IncidentManagementItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <IncidentManagementItemCardContent />
    </IntlProvider>,
  ).find(IncidentManagementItemCardContent);

  const bestPracticesLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Best practices for incident management');

  afterEach(jest.clearAllMocks);

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to the Best Practices documentation', () => {
    expect(bestPracticesLink).toHaveLength(1);
    expect(bestPracticesLink.prop('href')).toEqual(
      'https://support.atlassian.com/jira-service-desk-cloud/docs/best-practices-for-incident-management/',
    );
  });

  it('should fire a event when the link is clicked', () => {
    bestPracticesLink.simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'link',
        }),
      }),
      'jsmGettingStartedPanelIncidentManagementBestPractices',
    );
  });

  it('should complete this task when the link is clicked', () => {
    bestPracticesLink.simulate('click');

    expect(mocks.mockOnTaskComplete).toHaveBeenCalledTimes(1);
    expect(mocks.mockOnTaskComplete).toHaveBeenCalledWith(
      TaskId.LevelUpIncidentManagement,
    );
  });
});
