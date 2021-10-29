import React, { ComponentProps } from 'react';
import { ReactWrapper } from 'enzyme';
import { SearchResultSection } from '@atlassian/search-dialog';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import {
  createJiraIssueResponse,
  createBoardProjectFilterResponse,
  createBoardProjectFilterPlanResponse,
} from '../../../../__tests__/__fixtures__/mock-jira-results';
import {
  onShowAllClicked,
  onShowMoreClicked,
} from '../../../../common/analytics';
import { LoadingSpinner } from '../../../../common/loading-spinner';
import NoResults from '../../jira-search-no-results';
import { act } from '@testing-library/react';
import SearchResults, {
  Props as SearchResultProps,
  ScopedSearchResultsList,
  getSectionNameFor,
  DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS,
  DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS_PLANS,
  INITIAL_POST_QUERY_ITEM_LIMIT,
} from '../jira-post-query';

let mockHasAdvancedRoadmapsAccess = false;

jest.mock('../../../clients', () =>
  Object.assign({}, jest.requireActual('../../../clients'), {
    useJiraSearchClientContext: () => ({
      siteUrl: 'A_SITE_URL',
    }),
  }),
);

jest.mock('../../../../common/search-session-provider', () =>
  Object.assign(
    {},
    jest.requireActual('../../../../common/search-session-provider'),
    {
      useSearchSessionId: () => 'search_session_id',
    },
  ),
);

jest.mock('../../../features', () =>
  Object.assign({}, jest.requireActual('../../../features'), {
    useFeatures: () => ({
      hasAdvancedRoadmapsAccess: mockHasAdvancedRoadmapsAccess,
    }),
  }),
);

jest.mock('../../../../common/analytics', () => {
  const fireAnalyticsEvent = jest.fn();

  return Object.assign({}, jest.requireActual('../../../../common/analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent,
    }),
    onShowMoreClicked: jest.fn(),
    onShowAllClicked: jest.fn(),
  });
});

jest.mock('../../jira-search-results-lists', () => ({
  IssueSearchResultsList: () => <div />,
  BoardsProjectFiltersSearchResultsList: () => <div />,
}));

jest.mock('@atlassian/search-dialog', () =>
  Object.assign({}, jest.requireActual('@atlassian/search-dialog'), {
    SearchResultSectionLink: () => <div />,
  }),
);

describe('Jira Post Query', () => {
  const onNavigate = jest.fn();
  const commonProps = {
    query: '',
    onNavigate,
  };

  const noResults = {
    items: [],
    timings: 0,
    totalSize: 0,
  };
  describe('Jira Post-query Screen', () => {
    it('should render NoResults screen if no results are available and not loading', () => {
      const wrapper = mountWithIntl(
        <SearchResults
          {...commonProps}
          results={{
            issues: {
              isLoading: false,
              results: noResults,
            },
            boardsProjectsFiltersPlans: {
              isLoading: false,
              results: noResults,
            },
          }}
        />,
      );
      expect(wrapper.find(NoResults).exists()).toBeTruthy();
      expect(wrapper.find(LoadingSpinner).exists()).toBeFalsy();
    });

    it('should render correctly for a fully loaded state', () => {
      const results = {
        issues: {
          isLoading: false,
          results: createJiraIssueResponse(50),
        },
        boardsProjectsFiltersPlans: {
          isLoading: false,
          results: createBoardProjectFilterResponse(50),
        },
      };
      const wrapper = mountWithIntl(
        <SearchResults {...commonProps} results={results} />,
      );
      expect(wrapper.find(LoadingSpinner).exists()).toBeFalsy();

      const searchResultSections = wrapper.find(SearchResultSection);
      expect(searchResultSections).toHaveLength(2);

      checkIssueResultSection(searchResultSections.first().at(0), results, 50);

      checkProjectFilterBoardResultSection(
        searchResultSections.last().at(0),
        results,
        false,
      );
    });

    it('should render results during board, project & filter loading', () => {
      const partialLoadedResults = {
        issues: {
          isLoading: false,
          results: createJiraIssueResponse(50),
          timings: 100,
        },
        boardsProjectsFiltersPlans: {
          isLoading: true,
          results: {
            items: [],
            timings: 100,
            totalSize: 0,
          },
        },
      };

      const wrapper = mountWithIntl(
        <SearchResults {...commonProps} results={partialLoadedResults} />,
      );
      expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
      expect(wrapper.find(SearchResultSection)).toHaveLength(1);

      checkIssueResultSection(
        wrapper.find(SearchResultSection),
        partialLoadedResults,
        50,
      );
    });

    it('should not render results during issues loading', () => {
      const partialLoadedResults = {
        issues: {
          isLoading: true,
          results: {
            items: [],
            timings: 100,
            totalSize: 0,
          },
        },
        boardsProjectsFiltersPlans: {
          isLoading: false,
          results: createBoardProjectFilterResponse(50),
          timings: 100,
        },
      };

      const wrapper = mountWithIntl(
        <SearchResults {...commonProps} results={partialLoadedResults} />,
      );
      expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
      expect(wrapper.find(SearchResultSection)).toHaveLength(0);
    });
  });

  it('should render correctly for a partial loading boards, projects, filters state', () => {
    const results = {
      issues: {
        isLoading: false,
        results: createJiraIssueResponse(50, false, 0, 1000),
      },
      boardsProjectsFiltersPlans: {
        isLoading: true,
        results: noResults,
      },
    };
    const wrapper = mountWithIntl(
      <SearchResults {...commonProps} results={results} />,
    );

    const searchResultSectionsWrapper = wrapper.find(SearchResultSection);
    expect(searchResultSectionsWrapper).toHaveLength(1);

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    checkIssueResultSection(searchResultSectionsWrapper, results, 1000);
  });

  it('show more button works as expected', () => {
    const results = {
      issues: {
        isLoading: false,
        results: createJiraIssueResponse(50),
      },
      boardsProjectsFiltersPlans: {
        isLoading: false,
        results: createBoardProjectFilterResponse(50),
      },
    };

    const wrapper = mountWithIntl(
      <SearchResults {...commonProps} results={results} />,
    );

    const showMoreLink = wrapper.find('#show-more-button');
    expect(showMoreLink).toHaveLength(1);

    act(() => {
      showMoreLink.prop('onClick')!({} as any);
    });

    wrapper.update();

    expect(onShowMoreClicked).toHaveBeenCalled();

    const showAll = wrapper.find('#show-all-link');

    expect(showAll).toHaveLength(1);

    act(() => {
      showAll.prop('onClick')!({ preventDefault: jest.fn() } as any);
    });

    expect(onShowAllClicked).toHaveBeenCalled();
  });

  it("show more button doens't show when there are fewer than 11 issue results", () => {
    const results = {
      issues: {
        isLoading: false,
        results: createJiraIssueResponse(10),
      },
      boardsProjectsFiltersPlans: {
        isLoading: false,
        results: createBoardProjectFilterResponse(50),
      },
    };

    const wrapper = mountWithIntl(
      <SearchResults {...commonProps} results={results} />,
    );

    const showMoreLink = wrapper.find('#show-more-button');
    expect(showMoreLink).toHaveLength(0);
  });

  it('should render only a spinner for a full loading query state', () => {
    const results = {
      issues: {
        isLoading: true,
        results: noResults,
      },
      boardsProjectsFiltersPlans: {
        isLoading: true,
        results: noResults,
      },
    };
    const wrapper = mountWithIntl(
      <SearchResults {...commonProps} results={results} />,
    );

    const searchResultSectionsWrapper = wrapper.find(SearchResultSection);
    expect(searchResultSectionsWrapper).toHaveLength(0);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('should show the filters, boards, projects section with plans Advanced Roadmaps is available', () => {
    const results = {
      issues: {
        isLoading: false,
        results: createJiraIssueResponse(10),
      },
      boardsProjectsFiltersPlans: {
        isLoading: false,
        results: createBoardProjectFilterResponse(50),
      },
    };

    mockHasAdvancedRoadmapsAccess = true;
    const wrapper = mountWithIntl(
      <SearchResults {...commonProps} results={results} />,
    );
    const titleElement = (wrapper
      .find(SearchResultSection)
      .last()
      .prop('title') as any) as JSX.Element;

    const expectedMessage = getSectionNameFor(
      'boardsProjectsFiltersPlans',
      mockHasAdvancedRoadmapsAccess,
    );
    expect(titleElement.props['id']).toEqual(expectedMessage.id);
  });

  it('should give additional result slots when Advanced Roadmaps is available', () => {
    const results = {
      issues: {
        isLoading: false,
        results: createJiraIssueResponse(10),
      },
      boardsProjectsFiltersPlans: {
        isLoading: false,
        results: createBoardProjectFilterPlanResponse(50),
      },
    };

    mockHasAdvancedRoadmapsAccess = true;
    const wrapper = mountWithIntl(
      <SearchResults {...commonProps} results={results} />,
    );

    checkProjectFilterBoardResultSection(
      wrapper.find(SearchResultSection).last(),
      results,
      mockHasAdvancedRoadmapsAccess,
    );
  });
});

function checkIssueResultSection(
  wrapper: ReactWrapper<ComponentProps<typeof SearchResultSection>>,
  results: SearchResultProps['results'],
  expectedTotalResultCount?: number,
) {
  const issueResults = results['issues'].results!.items;
  const titleElement = (wrapper.prop('title') as any) as JSX.Element;

  const expectedMessage = getSectionNameFor('issues');
  expect(titleElement.props['id']).toEqual(expectedMessage.id);

  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toHaveLength(
    INITIAL_POST_QUERY_ITEM_LIMIT,
  );
  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toEqual(
    issueResults.slice(0, INITIAL_POST_QUERY_ITEM_LIMIT),
  );

  expect(wrapper.prop('totalResults')).toBe(expectedTotalResultCount);
}

function checkProjectFilterBoardResultSection(
  wrapper: ReactWrapper<ComponentProps<typeof SearchResultSection>>,
  expectedResults: SearchResultProps['results'],
  mockHasAdvancedRoadmapsAccess: boolean,
) {
  const issueResults = expectedResults['boardsProjectsFiltersPlans'].results!
    .items;
  const titleElement = (wrapper.prop('title') as any) as JSX.Element;

  const expectedMessage = getSectionNameFor(
    'boardsProjectsFiltersPlans',
    mockHasAdvancedRoadmapsAccess,
  );
  expect(titleElement.props['id']).toEqual(expectedMessage.id);

  const resultLimit = mockHasAdvancedRoadmapsAccess
    ? DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS_PLANS
    : DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS;

  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toHaveLength(
    resultLimit,
  );
  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toEqual(
    issueResults.slice(0, resultLimit),
  );
  expect(wrapper.prop('totalResults')).toBeUndefined();
}
