import * as mocks from './ChangeManagment.test.mock';
import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { TaskId } from '../../../common/types';
import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { ChangeManagementItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/change-management';

describe('<ChangeManagementItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <ChangeManagementItemCardContent />
    </IntlProvider>,
  ).find(ChangeManagementItemCardContent);

  const bestPracticesLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Best practices for change management');

  afterEach(jest.clearAllMocks);

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to best practices in SAC', () => {
    expect(bestPracticesLink).toHaveLength(1);
    expect(bestPracticesLink.prop('href')).toEqual(
      'https://support.atlassian.com/jira-service-desk-cloud/docs/best-practices-for-change-management/',
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
      'jsmGettingStartedPanelChangeManagementBestPractices',
    );
  });

  it('should complete this task when the link is clicked', () => {
    bestPracticesLink.simulate('click');

    expect(mocks.mockOnTaskComplete).toHaveBeenCalledTimes(1);
    expect(mocks.mockOnTaskComplete).toHaveBeenCalledWith(
      TaskId.MakeTheMostOfChangeManagement,
    );
  });
});
