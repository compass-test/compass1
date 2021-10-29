import React from 'react';
import { SearchDialog, State } from '../jira-search-dialog';
import {
  createBoardProjectFilterResponse,
  createBoardProjectFilterPlanResponse,
  createJiraIssueResponse,
} from '../../__tests__/__fixtures__/mock-jira-results';
import { createSiteFilters } from '../../__tests__/__fixtures__/mock-filters';
import { SearchError } from '../../common/search-error';
import { Scope } from '../clients';
import CancellablePromise from '../../utils/cancellable-promise';

import { JiraAdvancedSearch } from '../jira-advanced-search';
import { shallow, ShallowWrapper } from 'enzyme';
import { NoPreQueryResults } from '../../common/no-results';
import { limitToMaxSiteUsage } from '../../common/clients/multi-site-utils';

jest.unmock('lodash/debounce');

jest.mock('../../utils/forward-ref', () => ({
  withForwardRef: (arg: any) => arg,
}));

jest.mock('@atlassian/search-dialog', () => {
  const React = require('react');
  return {
    SearchAnchor: () => 'div',
    SearchDialog: () => 'div',
    SearchInput: () => 'div',
    SearchFooter: () => 'div',
    KeyboardHighlightProvider: () => 'div',
    ThemeProvider: React.createContext({}).Provider,
    Link: () => 'a',
  };
});

jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => {
    return <div />;
  },
}));

const sites = createSiteFilters(2, {
  checkedNumber: 2,
});

describe('<JiraSearchDialog />', () => {
  const getRecentBoardsProjectsFilters = jest.fn();
  const getRecentBoardsProjectsFiltersPlans = jest.fn();
  const getRecentIssues = jest.fn();

  const searchBoardsProjectsFilters = jest.fn();
  const searchBoardsProjectsFiltersPlans = jest.fn();
  const searchIssues = jest.fn();

  const getRejectedPromise = () =>
    Promise.reject(
      'from chao: promise rejected, did you forget a catch somewhere in the code?',
    );

  const recentProjectsFiltersBoardsResults = createBoardProjectFilterResponse(
    1,
  );
  const recentProjectsFiltersBoardsPlansResults = createBoardProjectFilterPlanResponse(
    1,
  );
  const recentIssuesResults = createJiraIssueResponse(1);

  const searchProjectsFiltersBoardsResults = createBoardProjectFilterResponse(
    1,
  );
  const searchProjectsFiltersBoardsPlansResults = createBoardProjectFilterPlanResponse(
    1,
  );
  const searchIssuesResults = createJiraIssueResponse(1);

  const mockErrorRecents = (hasAdvancedRoadmapsAccess: boolean = false) => {
    if (hasAdvancedRoadmapsAccess) {
      getRecentBoardsProjectsFiltersPlans.mockReturnValue(
        CancellablePromise.from(getRejectedPromise()),
      );
    } else {
      getRecentBoardsProjectsFilters.mockReturnValue(
        CancellablePromise.from(getRejectedPromise()),
      );
    }
    getRecentIssues.mockReturnValue(
      CancellablePromise.from(getRejectedPromise()),
    );
  };

  const mockSuccessRecent = () => {
    getRecentBoardsProjectsFilters.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(recentProjectsFiltersBoardsResults),
      ),
    );
    getRecentBoardsProjectsFiltersPlans.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(recentProjectsFiltersBoardsPlansResults),
      ),
    );
    getRecentIssues.mockReturnValue(
      CancellablePromise.from(Promise.resolve(recentIssuesResults)),
    );
  };

  const mockEmptyRecents = () => {
    getRecentBoardsProjectsFilters.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(createBoardProjectFilterResponse(0)),
      ),
    );
    getRecentBoardsProjectsFiltersPlans.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(createBoardProjectFilterPlanResponse(0)),
      ),
    );
    getRecentIssues.mockReturnValue(
      CancellablePromise.from(Promise.resolve(createJiraIssueResponse(0))),
    );
  };

  const mockErrorSearch = (hasAdvancedRoadmapsAccess: boolean = false) => {
    if (hasAdvancedRoadmapsAccess) {
      searchBoardsProjectsFiltersPlans.mockReturnValue(
        CancellablePromise.from(getRejectedPromise()),
      );
    } else {
      searchBoardsProjectsFilters.mockReturnValue(
        CancellablePromise.from(getRejectedPromise()),
      );
    }
    searchIssues.mockReturnValue(CancellablePromise.from(getRejectedPromise()));
  };

  const mockSuccessSearch = () => {
    searchBoardsProjectsFilters.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(searchProjectsFiltersBoardsResults),
      ),
    );
    searchBoardsProjectsFiltersPlans.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(searchProjectsFiltersBoardsPlansResults),
      ),
    );
    searchIssues.mockReturnValue(
      CancellablePromise.from(Promise.resolve(searchIssuesResults)),
    );
  };
  const mockEmptySearch = () => {
    searchBoardsProjectsFilters.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(createBoardProjectFilterResponse(0)),
      ),
    );
    searchBoardsProjectsFiltersPlans.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(createBoardProjectFilterPlanResponse(0)),
      ),
    );
    searchIssues.mockReturnValue(
      CancellablePromise.from(Promise.resolve(createJiraIssueResponse(0))),
    );
  };

  const waitForRecents = async () => {
    try {
      await getRecentBoardsProjectsFilters().promise();
    } catch (e) {}

    try {
      await getRecentIssues().promise();
    } catch (e) {}
  };

  const waitForSearch = async (
    debounceTime: number,
    hasAdvancedRoadmapsAccess: boolean = false,
  ) => {
    try {
      if (hasAdvancedRoadmapsAccess) {
        await searchBoardsProjectsFiltersPlans().promise();
      } else {
        await searchBoardsProjectsFilters().promise();
      }
    } catch (e) {}

    try {
      await searchIssues().promise();
    } catch (e) {}

    // Await an extra loop to account for the debounce time, this is required even if the debounce is 0
    await new Promise<void>((resolve) =>
      setTimeout(() => resolve(), debounceTime),
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSuccessRecent();
    mockSuccessSearch();
  });

  const mockClient = {
    getRecentIssues,
    getRecentBoardsProjectsFilters,
    getRecentBoardsProjectsFiltersPlans,
    search: jest.fn(() => ({
      [Scope.JiraBoardProjectFilter]: searchBoardsProjectsFilters(),
      [Scope.JiraBoardProjectFilterPlan]: searchBoardsProjectsFiltersPlans(),
      [Scope.JiraIssue]: searchIssues(),
    })),
  } as any;

  const onOpen = jest.fn();
  const onClose = jest.fn();
  const setAdditionalAnalyticsContext = jest.fn();
  const setNoResultsForPreQuery = jest.fn();
  const onRetry = jest.fn();
  const requestComplete = jest.fn();

  const commonProps = {
    onOpen,
    onClose,
    searchSessionId: 'SOME_SEARCH_SESSION_ID',
    setAdditionalAnalyticsContext,
    setNoResultsForPreQuery,
    onRetry,
    requestComplete,
    query: '',
    forwardRef: () => {},
    enabledFilters: [],
    allSiteFilters: [],
    debounceTime: 0,
    onNavigate: () => {},
    hasAdvancedRoadmapsAccess: false,
    isMultiProduct: false,
    queryVersion: 0,
    fireAnalyticsOnShownPreQueryEmpty: () => null,
  };

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SearchDialog {...commonProps} isExpanded searchClient={mockClient} />,
    );

    expect(wrapper.find(SearchError).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render pre query empty state when no pre query results', async () => {
    mockEmptyRecents();

    const wrapper = shallow(
      <SearchDialog {...commonProps} isExpanded searchClient={mockClient} />,
    );

    // Wait for the requests to resolve, swallowing any errors
    await waitForRecents();
    wrapper.update();

    expect(wrapper.find(NoPreQueryResults).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render pre query empty state when error in the pre query (and therefore no results)', async () => {
    mockErrorRecents();

    const wrapper = shallow(
      <SearchDialog {...commonProps} isExpanded searchClient={mockClient} />,
    );

    await waitForRecents();
    wrapper.update();

    expect(wrapper.find(NoPreQueryResults).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot and renders error when there is an error when searching', async () => {
    mockErrorSearch();

    const wrapper = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0);

    wrapper.update();

    expect(wrapper.find(SearchError).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot and does not render error when there are no results when searching', async () => {
    mockEmptySearch();

    const wrapper = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0);

    wrapper.update();

    expect(wrapper.find(SearchError).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes the right parameters to the recent client when making a query', async () => {
    shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    expect(mockClient.getRecentIssues).toBeCalledTimes(1);
    expect(mockClient.getRecentIssues).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      [],
    );

    expect(mockClient.getRecentBoardsProjectsFilters).toBeCalledTimes(1);
    expect(mockClient.getRecentBoardsProjectsFilters).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      [],
    );
  });

  it('passes the right parameters to the recent client when making a query when there is multi sites', async () => {
    shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
        allSiteFilters={sites}
      />,
    );

    expect(mockClient.getRecentIssues).toBeCalledTimes(1);
    expect(mockClient.getRecentIssues).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      sites,
    );

    expect(mockClient.getRecentBoardsProjectsFilters).toBeCalledTimes(1);
    expect(mockClient.getRecentBoardsProjectsFilters).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      sites,
    );
  });

  it('passes the right parameters to the recent client when making a query with plans', async () => {
    shallow(
      <SearchDialog
        {...commonProps}
        hasAdvancedRoadmapsAccess
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    expect(mockClient.getRecentIssues).toBeCalledTimes(1);
    expect(mockClient.getRecentIssues).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      [],
    );

    expect(mockClient.getRecentBoardsProjectsFiltersPlans).toBeCalledTimes(1);
    expect(mockClient.getRecentBoardsProjectsFiltersPlans).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      [],
    );
  });

  it('passes the right parameters to the recent client when making a query with plans with multi site', async () => {
    shallow(
      <SearchDialog
        {...commonProps}
        hasAdvancedRoadmapsAccess
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
        allSiteFilters={sites}
      />,
    );

    expect(mockClient.getRecentIssues).toBeCalledTimes(1);
    expect(mockClient.getRecentIssues).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      sites,
    );

    expect(mockClient.getRecentBoardsProjectsFiltersPlans).toBeCalledTimes(1);
    expect(mockClient.getRecentBoardsProjectsFiltersPlans).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      sites,
    );
  });

  it('passes the right parameters to the search client when making a query with selected sites', async () => {
    expect.hasAssertions();

    const wrapper = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
        allSiteFilters={sites}
      />,
    );

    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0);

    expect(mockClient.search).toBeCalledTimes(1);
    expect(mockClient.search).toBeCalledWith(
      'some query',
      [],
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      1,
      false,
      sites,
    );
    expect(setAdditionalAnalyticsContext).toBeCalledWith({
      type: 'queryVersion',
      value: 1,
    });
  });

  it('passes the right parameters to the search client when making a query', async () => {
    expect.hasAssertions();

    const wrapper = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0);

    expect(mockClient.search).toBeCalledTimes(1);
    expect(mockClient.search).toBeCalledWith(
      'some query',
      [],
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      1,
      false,
      [],
    );
    expect(setAdditionalAnalyticsContext).toBeCalledWith({
      type: 'queryVersion',
      value: 1,
    });
  });

  it('passes the right parameters to the search client when making a query with plans', async () => {
    expect.hasAssertions();

    const wrapper = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
        hasAdvancedRoadmapsAccess
      />,
    );

    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0, true);

    expect(mockClient.search).toBeCalledTimes(1);
    expect(mockClient.search).toBeCalledWith(
      'some query',
      [],
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      1,
      true,
      [],
    );
    expect(setAdditionalAnalyticsContext).toBeCalledWith({
      type: 'queryVersion',
      value: 1,
    });
  });

  it('searches on the max number of initial sites when none are selected', async () => {
    const sites = createSiteFilters(5, {
      checkedNumber: 0,
    });
    const wrapper = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
        allSiteFilters={sites}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });

    await waitForSearch(0);

    wrapper.update();

    expect(mockClient.search).toHaveBeenCalledTimes(1);

    expect(mockClient.search).toHaveBeenCalledWith(
      'query',
      [],
      {
        sessionId: commonProps.searchSessionId,
        referrerId: null,
      },
      commonProps.queryVersion + 1,
      false,
      limitToMaxSiteUsage(sites),
    );
  });

  it('searches on the selected sites when one or more is selected', async () => {
    const sites = createSiteFilters(5, {
      checkedNumber: 2,
    });
    const wrapper = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
        allSiteFilters={sites}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });

    await waitForSearch(0);

    wrapper.update();

    expect(mockClient.search).toHaveBeenCalledTimes(1);

    expect(mockClient.search).toHaveBeenCalledWith(
      'query',
      [],
      {
        sessionId: commonProps.searchSessionId,
        referrerId: null,
      },
      commonProps.queryVersion + 1,
      false,
      sites.filter((site) => site.isChecked),
    );
  });

  it('correctly resets to pre-query when closed', async () => {
    const wrapper: ShallowWrapper<any, State> = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    // Change query state to non pre-query
    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0);

    // Sanity check
    expect(wrapper.state('isPreQuery')).toBe(false);
    expect(wrapper.state('resultIssues').results).toEqual(searchIssuesResults);
    expect(wrapper.state('resultBoardsProjectsFiltersPlans').results).toEqual(
      searchProjectsFiltersBoardsResults,
    );

    // Close the dialog
    wrapper.setProps({
      isExpanded: false,
      query: '',
    });

    await waitForRecents();

    wrapper.update();

    // Assert
    expect(wrapper.state('isPreQuery')).toBe(true);
  });

  it('does not search when the dialog collapses', async () => {
    const wrapper: ShallowWrapper<any, State> = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    await waitForRecents();
    wrapper.update();

    wrapper.setProps({ query: 'query' });
    wrapper.update();

    await waitForSearch(0);

    expect(mockClient.search).toHaveBeenCalledTimes(1);

    wrapper.setProps({ isExpanded: false });
    wrapper.update();

    // Expect no extra searches to have been made
    expect(mockClient.search).toHaveBeenCalledTimes(1);
  });

  it('does not search when the dialog collapses with filters', async () => {
    const wrapper: ShallowWrapper<any, State> = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
        enabledFilters={[
          { id: 'open', type: 'binary_status_category' },
          { id: 'mock project', type: 'project' },
          { id: 'mock person', type: 'assignee' },
        ]}
        allSiteFilters={sites}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });
    wrapper.update();

    await waitForSearch(0);

    expect(mockClient.search).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      isExpanded: false,
      enabledFilters: [],
      allSiteFilters: [],
    });
    wrapper.update();

    // Expect no extra searches to have been made
    expect(mockClient.search).toHaveBeenCalledTimes(1);
  });

  it('does not search when the dialog collapses with a query', async () => {
    const wrapper: ShallowWrapper<any, State> = shallow(
      <SearchDialog
        {...commonProps}
        isExpanded
        searchClient={mockClient}
        debounceTime={0}
      />,
    );

    await waitForRecents();
    wrapper.update();

    wrapper.setProps({ query: 'query' });
    wrapper.update();

    await waitForSearch(0);

    expect(mockClient.search).toHaveBeenCalledTimes(1);

    wrapper.setProps({ isExpanded: false, query: '' });
    wrapper.update();

    // Expect no extra searches to have been made
    expect(mockClient.search).toHaveBeenCalledTimes(1);
  });

  describe('Jira Search Dialog utils', () => {
    const utils = require('../utils/jira-search-dialog-functions');
    it('should call the function to match queries to issues for faster search', async () => {
      const spy = jest.spyOn(utils, 'doesJiraIssueMatchQuery');
      const wrapper: ShallowWrapper<any, State> = shallow(
        <SearchDialog
          {...commonProps}
          isExpanded
          searchClient={mockClient}
          debounceTime={0}
        />,
      );

      // Change query state to non pre-query
      wrapper.setProps({ query: 'some query' });

      await waitForSearch(0);

      wrapper.update();

      // Sanity check
      expect(wrapper.state('isPreQuery')).toBe(false);
      expect(wrapper.state('resultIssues').results).toEqual(
        searchIssuesResults,
      );
      expect(wrapper.state('resultBoardsProjectsFiltersPlans').results).toEqual(
        searchProjectsFiltersBoardsResults,
      );

      // Assert
      expect(spy).toHaveBeenCalledTimes(2); // faster search call + call during post query
      expect(spy.mock.calls[1][1]).toBe('some query');
    });
  });

  describe('Search Footer behaviour', () => {
    test('cross-product should show "Go to all" lozenges', () => {
      const wrapper = shallow(
        <SearchDialog
          {...commonProps}
          isExpanded
          searchClient={mockClient}
          debounceTime={0}
          isMultiProduct
        />,
      );
      expect(wrapper.find(JiraAdvancedSearch).exists()).toBe(true);
    });

    test('cross-product with filters enabled should show "Go to all" lozenges', () => {
      const wrapper = shallow(
        <SearchDialog
          {...commonProps}
          isExpanded
          searchClient={mockClient}
          debounceTime={0}
          isMultiProduct
        />,
      );
      expect(wrapper.find(JiraAdvancedSearch).exists()).toBe(true);
    });

    test('jira-only should show "Go to all Lozenges"', () => {
      const wrapper = shallow(
        <SearchDialog
          {...commonProps}
          isExpanded
          searchClient={mockClient}
          debounceTime={0}
          isMultiProduct={false}
        />,
      );
      expect(wrapper.find(JiraAdvancedSearch).exists()).toBe(true);
    });

    test('jira-only with filters enabled should show "Go to all Lozenges"', () => {
      const wrapper = shallow(
        <SearchDialog
          {...commonProps}
          isExpanded
          searchClient={mockClient}
          debounceTime={0}
          isMultiProduct={false}
        />,
      );
      expect(wrapper.find(JiraAdvancedSearch).exists()).toBe(true);
    });
  });
});
