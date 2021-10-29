import React, { ComponentProps } from 'react';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { DefaultFeatures } from '../../features';
import { useFilterContext } from '../../filter-context';
import { JiraAdvancedSearchLink } from '../jira-advanced-search-link';
import SingleSiteAdvancedSearch, {
  getSearchConfiguration,
} from '../jira-single-site-advanced-search';

jest.mock('../../clients', () => ({
  useJiraSearchClientContext: () => ({
    siteUrl: '',
  }),
}));

jest.mock('../../filter-context', () => ({
  useFilterContext: jest.fn(),
}));

describe('<JiraAdvancedSearch />', () => {
  const onClick = jest.fn();
  const advancedSearchSelected = jest.fn();
  const features = DefaultFeatures;
  const commonProps: ComponentProps<typeof SingleSiteAdvancedSearch> = {
    query: '',
    onClick,
    advancedSearchSelected,
    features,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFilterContext as jest.Mock).mockReturnValue({
      projectFilters: {
        availableFilters: [],
      },
      assigneeFilters: {
        availableFilters: [],
      },
      binaryStatusCategoryFilters: {
        availableFilters: [],
      },
    });
  });

  it('renders boards link with software access', () => {
    const links = getSearchConfiguration(
      '',
      { ...commonProps.features, hasSoftwareAccess: true },
      '',
      '1',
    );

    expect(links['board']).toEqual({
      actionSubjectId: 'jiraBoardsSearchLink',
      dataTestId: 'search-dialog-jira-advanced-search-boards',
      href: '1/secure/ManageRapidViews.jspa?contains=',
      message: {
        defaultMessage: 'Boards',
        description: 'Plural of board',
        id: 'global_search.jira.advanced_search_boards',
      },
    });
  });

  it('does not render boards link without software access', () => {
    const links = getSearchConfiguration(
      '',
      { ...commonProps.features, hasSoftwareAccess: false },
      '',
      '1',
    );

    expect(links).not.toHaveProperty('board');
  });

  it('renders plans link with plans access', () => {
    const links = getSearchConfiguration(
      '',
      { ...commonProps.features, hasAdvancedRoadmapsAccess: true },
      '',
      '1',
    );

    expect(links['plans']).toEqual({
      actionSubjectId: 'jiraPlansSearchLink',
      dataTestId: 'search-dialog-jira-advanced-search-plans',
      href: '1/secure/PortfolioPlanManage.jspa',
      message: {
        defaultMessage: 'Plans',
        description: 'Plural of plan',
        id: 'global_search.jira.advanced_search_plans',
      },
    });
  });

  it('does not render plans link without plans access', () => {
    const links = getSearchConfiguration(
      '',
      { ...commonProps.features, hasAdvancedRoadmapsAccess: false },
      '',
      '1',
    );

    expect(links).not.toHaveProperty('plans');
  });

  it('renders with a query and no plans or boards access', () => {
    const wrapper = mountWithIntl(
      <SingleSiteAdvancedSearch {...commonProps} query={'Im a query'} />,
    );

    const dataTestIds = [
      'search-dialog-jira-advanced-search-people',
      'search-dialog-jira-advanced-search-filters',
      'search-dialog-jira-advanced-search-projects',
      'search-dialog-jira-advanced-search-issues',
    ];

    for (const id of dataTestIds) {
      expect(wrapper.find(`[dataTestId="${id}"]`).length).toEqual(1);
    }

    expect(wrapper.find(JiraAdvancedSearchLink)).toHaveLength(4);

    expect.assertions(5);
  });

  it('onClick handler is passed through to each link element', () => {
    const wrapper = mountWithIntl(
      <SingleSiteAdvancedSearch {...commonProps} />,
    );

    wrapper.find(JiraAdvancedSearchLink).forEach((link) => {
      onClick.mockClear();
      link.prop('onClick')(
        link.prop('href'),
        {} as React.MouseEvent<HTMLSpanElement, MouseEvent>,
      );

      expect(onClick).toBeCalledWith(
        link.prop('href'),
        {} as React.MouseEvent<HTMLSpanElement, MouseEvent>,
      );
      expect(onClick).toBeCalledTimes(1);
    });
  });

  it('query for href should be encoded', () => {
    const wrapper = mountWithIntl(
      <SingleSiteAdvancedSearch {...commonProps} query="====" />,
    );

    wrapper.find(JiraAdvancedSearchLink).forEach((link) => {
      expect(link.prop('href')).not.toContain('====');
      expect(link.prop('href')).toContain(encodeURIComponent('===='));
    });
  });

  it('analytics events are fired when links are selected without modifiers', () => {
    const wrapper = mountWithIntl(
      <SingleSiteAdvancedSearch {...commonProps} />,
    );
    wrapper.find(JiraAdvancedSearchLink).forEach((link) => {
      advancedSearchSelected.mockClear();
      link.prop('onClick')(
        link.prop('href'),
        {} as React.MouseEvent<HTMLSpanElement, MouseEvent>,
      );
      expect(advancedSearchSelected).toBeCalledTimes(1);
      expect(advancedSearchSelected).toBeCalledWith(
        expect.objectContaining({
          trigger: 'click',
          isLoading: commonProps.isLoading,
          newTab: false,
        }),
      );
    });
  });

  ['ctrlKey', 'shiftKey', 'metaKey'].forEach((modifier) => {
    it(`analytics events are fired when links are selected with ${modifier}`, () => {
      const wrapper = mountWithIntl(
        <SingleSiteAdvancedSearch {...commonProps} />,
      );
      wrapper.find(JiraAdvancedSearchLink).forEach((link) => {
        advancedSearchSelected.mockClear();
        link.prop('onClick')(link.prop('href'), { [modifier]: true } as any);
        expect(advancedSearchSelected).toBeCalledTimes(1);
        expect(advancedSearchSelected).toBeCalledWith(
          expect.objectContaining({
            trigger: 'click',
            isLoading: commonProps.isLoading,
            newTab: true,
          }),
        );
      });
    });
  });
});
