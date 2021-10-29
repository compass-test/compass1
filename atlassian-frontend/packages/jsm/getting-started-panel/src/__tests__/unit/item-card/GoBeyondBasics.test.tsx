import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { TaskId } from '../../../common/types';
import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { GoBeyondBasicsItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/go-beyond-basics';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

const mockOnTaskComplete = jest.fn();
jest.mock('../../../common/ui/url-data', () => ({
  useUrlData: () => ({
    onTaskComplete: mockOnTaskComplete,
  }),
}));

describe('<GoBeyondBasicsItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <GoBeyondBasicsItemCardContent />
    </IntlProvider>,
  ).find(GoBeyondBasicsItemCardContent);

  const bestPracticesLink = target
    .find(ItemCardContent)
    .find('a')
    .filterWhere((e) => e.text() === 'Best practices for IT teams');

  afterEach(jest.clearAllMocks);

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });

  it('create a link to the Best Practices documentation page', () => {
    expect(bestPracticesLink).toHaveLength(1);
    expect(bestPracticesLink.prop('href')).toEqual(
      'https://support.atlassian.com/jira-service-desk-cloud/docs/best-practices-for-it-teams-using-jira-service-desk/',
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
      'jsmGettingStartedPanelGoBeyondBasicsBestPractices',
    );
  });

  it('should complete this task when the link is clicked', () => {
    bestPracticesLink.simulate('click');

    expect(mockOnTaskComplete).toHaveBeenCalledTimes(1);
    expect(mockOnTaskComplete).toHaveBeenCalledWith(TaskId.GoBeyondBasics);
  });
});
