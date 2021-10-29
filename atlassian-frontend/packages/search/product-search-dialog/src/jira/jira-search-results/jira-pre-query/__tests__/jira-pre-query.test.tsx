import React, { ComponentProps } from 'react';
import { ReactWrapper } from 'enzyme';
import { SearchResultSection } from '@atlassian/search-dialog';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import {
  createJiraIssueResponse,
  createBoardProjectFilterResponse,
} from '../../../../__tests__/__fixtures__/mock-jira-results';
import { LoadingSpinner } from '../../../../common/loading-spinner';
import NoResults from '../../jira-search-no-results';
import SearchResults, {
  Props as SearchResultProps,
  ScopedSearchResultsList,
  getSectionNameFor,
  DISPLAYED_RESULT_LIMIT_ISSUES,
  DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS,
} from '../jira-pre-query';
import { ViewAllIssuesLink } from '../../../view-all-issues';

let mockHasAdvancedRoadmapsAccess = false;

jest.mock('../../../clients', () =>
  Object.assign({}, jest.requireActual('../../../clients'), {
    useJiraSearchClientContext: () => ({
      siteUrl: 'A SITE URL',
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

jest.mock('../../jira-search-results-lists', () => ({
  IssueSearchResultsList: () => <div />,
  BoardsProjectFiltersSearchResultsList: () => <div />,
}));

jest.mock('@atlassian/search-dialog', () =>
  Object.assign({}, jest.requireActual('@atlassian/search-dialog'), {
    SearchResultSectionLink: () => <div />,
  }),
);

jest.mock('../../../view-all-issues', () => ({
  ViewAllIssuesLink: () => <div />,
}));

describe('Jira Pre-query Screen', () => {
  const onNavigate = jest.fn();
  const commonProps = {
    query: '',
    onNavigate,
    isCollapsed: false,
  };

  const noResults = {
    items: [],
    timings: 0,
    totalSize: 0,
  };

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

    const searchResultSectionWrapper = wrapper.find(SearchResultSection);
    expect(searchResultSectionWrapper).toHaveLength(2);

    expect(wrapper.find(ViewAllIssuesLink)).toHaveLength(1);
    checkIssueResultSection(searchResultSectionWrapper.at(0), results);
    checkProjectFilterBoardResultSection(
      searchResultSectionWrapper.at(1),
      results,
    );
  });

  it('should render correctly for a fully loaded state with filters on', () => {
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

    const searchResultSectionWrapper = wrapper.find(SearchResultSection);
    expect(searchResultSectionWrapper).toHaveLength(2);

    expect(wrapper.find(ViewAllIssuesLink)).toHaveLength(1);
    checkIssueResultSection(searchResultSectionWrapper.at(0), results);
    checkProjectFilterBoardResultSection(
      searchResultSectionWrapper.at(1),
      results,
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
    expect(wrapper.find(SearchResultSection)).toHaveLength(0);
  });

  it('should render results during issues loading', () => {
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

  it('should render correctly for a partial loading boards, projects, filters state', () => {
    const results = {
      issues: {
        isLoading: false,
        results: createJiraIssueResponse(50),
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

  it('should show the filters, boards, projects section with plans when Advanced Roadmaps is available', () => {
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
      .at(1)
      .prop('title') as any) as JSX.Element;

    const expectedMessage = getSectionNameFor(
      'boardsProjectsFiltersPlans',
      mockHasAdvancedRoadmapsAccess,
    );
    expect(titleElement.props['id']).toEqual(expectedMessage.id);
  });
});

function checkIssueResultSection(
  wrapper: ReactWrapper<ComponentProps<typeof SearchResultSection>>,
  results: SearchResultProps['results'],
) {
  const issueResults = results['issues'].results!.items;
  const titleElement = (wrapper.prop('title') as any) as JSX.Element;

  const expectedMessage = getSectionNameFor('issues');
  expect(titleElement.props['id']).toEqual(expectedMessage.id);

  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toHaveLength(
    DISPLAYED_RESULT_LIMIT_ISSUES,
  );
  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toEqual(
    issueResults.slice(0, DISPLAYED_RESULT_LIMIT_ISSUES),
  );
}

function checkProjectFilterBoardResultSection(
  wrapper: ReactWrapper<ComponentProps<typeof SearchResultSection>>,
  expectedResults: SearchResultProps['results'],
) {
  const issueResults = expectedResults['boardsProjectsFiltersPlans'].results!
    .items;
  const titleElement = (wrapper.prop('title') as any) as JSX.Element;

  const expectedMessage = getSectionNameFor('boardsProjectsFiltersPlans');
  expect(titleElement.props['id']).toEqual(expectedMessage.id);

  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toHaveLength(
    DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS,
  );
  expect(wrapper.find(ScopedSearchResultsList).prop('results')).toEqual(
    issueResults.slice(0, DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS),
  );
}
