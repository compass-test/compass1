import React from 'react';

import {
  WrappedConfluenceSearchDialog,
  ConfluenceSearchDialog,
  State,
} from '../confluence-search-dialog';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  createPageBlogAttachmentResults,
  createPeopleResults,
  createSpaceResponse,
} from '../../__tests__/__fixtures__/mock-search-results';
import { SearchError } from '../../common/search-error';
import { Scope } from '../clients';
import CancellablePromise from '../../utils/cancellable-promise';
import { createSiteFilters } from '../../__tests__/__fixtures__/mock-filters';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

import {
  fireUIAnalytics,
  fireTrackAnalytics,
} from '@atlassian/analytics-bridge';
import { useSearchComponentsLazyQuery } from '@atlassian/dragonfruit-graphql';
import { useSearchUsers } from '@atlassian/dragonfruit-teams';
import { useSearchTeams } from '@atlassian/dragonfruit-rest';

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
  WidthObserver: () => null,
}));

jest.mock('@atlaskit/analytics-next', () =>
  Object.assign({}, jest.requireActual('@atlaskit/analytics-next'), {
    useAnalyticsEvents: () => ({
      createAnalyticsEvent: jest.fn().mockImplementation((data) => data),
    }),
  }),
);

jest.mock('@atlassian/analytics-bridge', () =>
  Object.assign({}, jest.requireActual('@atlassian/analytics-bridge'), {
    fireTrackAnalytics: jest.fn(),
    fireUIAnalytics: jest.fn(),
  }),
);

jest.mock('@atlassian/dragonfruit-teams', () => ({
  useSearchUsers: jest.fn().mockReturnValue({
    usersLoading: false,
    users: [],
    fetchData: jest.fn(),
  }),
}));

jest.mock('@atlassian/dragonfruit-rest', () => ({
  useGetTeams: jest.fn().mockReturnValue({ teamNames: [] }),
  useSearchTeams: jest.fn().mockReturnValue({
    teams: [],
    loading: false,
    fetchData: jest.fn(),
  }),
}));

jest.mock('@atlassian/compass-search-cache', () =>
  Object.assign({}, jest.requireActual('@atlassian/compass-search-cache'), {
    useCompassRecents: jest.fn().mockReturnValue({
      recentlyViewedComponents: [],
      recentlyViewedTeams: [],
    }),
  }),
);

jest.mock('@atlassian/dragonfruit-tenant-context', () => ({
  useTenantInfo: () => ({
    cloudId: 'mockCloudId',
  }),
  getEnvironmentFromOrigin: () => 'local',
  Environment: () => ({
    PROD: 'prod',
    STAGING: 'staging',
    LOCAL: 'local',
  }),
}));

jest.mock('@atlassian/dragonfruit-graphql', () =>
  Object.assign({}, jest.requireActual('@atlassian/dragonfruit-graphql'), {
    useSearchComponentsLazyQuery: jest.fn().mockReturnValue([jest.fn(), {}]),
  }),
);

describe('<ConfluenceSearchDialog />', () => {
  const getRecentPeople = jest.fn();
  const getRecentItems = jest.fn();
  const getRecentSpaces = jest.fn();

  const searchPeople = jest.fn();
  const searchItems = jest.fn();
  const searchSpaces = jest.fn();
  const fetchMore = jest.fn();

  const mockEvent = { event: 'event' };
  const mockCreateAnalyticsEvent = jest.fn().mockReturnValue(mockEvent);

  const REJECT_PROMISE = Promise.reject('error');

  const recentPeopleResults = createPeopleResults(1);
  const recentItemResults = createPageBlogAttachmentResults(1);
  const recentSpaceResults = createSpaceResponse(1);

  const searchPeopleResults = createPeopleResults(1);
  const searchItemResults = createPageBlogAttachmentResults(1);
  const searchSpaceResults = createSpaceResponse(1);

  const mockSuccessRecent = () => {
    getRecentPeople.mockReturnValue(
      CancellablePromise.from(Promise.resolve(recentPeopleResults)),
    );
    getRecentItems.mockReturnValue(
      CancellablePromise.from(Promise.resolve(recentItemResults)),
    );
    getRecentSpaces.mockReturnValue(
      CancellablePromise.from(Promise.resolve(recentSpaceResults)),
    );
  };
  const mockEmptyRecents = () => {
    getRecentPeople.mockReturnValue(
      CancellablePromise.from(Promise.resolve(createPeopleResults(0))),
    );
    getRecentItems.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(createPageBlogAttachmentResults(0)),
      ),
    );
    getRecentSpaces.mockReturnValue(
      CancellablePromise.from(Promise.resolve(createSpaceResponse(0))),
    );
  };

  const mockErrorSearch = () => {
    searchPeople.mockReturnValue(CancellablePromise.from(REJECT_PROMISE));
    searchItems.mockReturnValue(CancellablePromise.from(REJECT_PROMISE));
    searchSpaces.mockReturnValue(CancellablePromise.from(REJECT_PROMISE));
  };
  const mockSuccessSearch = () => {
    searchPeople.mockReturnValue(
      CancellablePromise.from(Promise.resolve(searchPeopleResults)),
    );
    searchItems.mockReturnValue(
      CancellablePromise.from(Promise.resolve(searchItemResults)),
    );
    searchSpaces.mockReturnValue(
      CancellablePromise.from(Promise.resolve(searchSpaceResults)),
    );
  };
  const mockEmptySearch = () => {
    searchPeople.mockReturnValue(
      CancellablePromise.from(Promise.resolve(createPeopleResults(0))),
    );
    searchItems.mockReturnValue(
      CancellablePromise.from(
        Promise.resolve(createPageBlogAttachmentResults(0)),
      ),
    );
    searchSpaces.mockReturnValue(
      CancellablePromise.from(Promise.resolve(createSpaceResponse(0))),
    );
  };

  const waitForRecents = async () => {
    try {
      await getRecentPeople().promise();
    } catch (e) {}

    try {
      await getRecentItems().promise();
    } catch (e) {}

    try {
      await getRecentSpaces().promise();
    } catch (e) {}
  };

  const searchServices = jest.fn();
  const searchLibsAppsMore = jest.fn();
  const searchTeamsAndUsers = jest.fn();

  const searchDetails = {
    data: undefined,
    loading: false,
    error: null,
  };

  const waitForSearch = async (debounceTime: number) => {
    try {
      await searchPeople().promise();
    } catch (e) {}

    try {
      await searchItems().promise();
    } catch (e) {}

    try {
      await searchSpaces().promise();
    } catch (e) {}

    try {
      await searchServices().promise();
    } catch (e) {}

    try {
      await searchLibsAppsMore().promise();
    } catch (e) {}

    try {
      await searchTeamsAndUsers().promise();
    } catch (e) {}

    // Await an extra loop to account for the debounce time, this is required even if the debounce is 0
    await new Promise<void>((resolve) =>
      setTimeout(() => resolve(), debounceTime),
    );
  };

  const mockClients = {
    recentClient: {
      getRecentItems,
      getRecentSpaces,
    },
    searchClient: {
      search: jest.fn(() => ({
        [Scope.ConfluencePageBlogAttachment]: searchItems(),
        [Scope.ConfluenceSpace]: searchSpaces(),
        [Scope.People]: searchPeople(),
      })),
      getRecentPeople,
    },
  } as {
    recentClient: any;
    searchClient: any;
  };

  const onOpen = jest.fn();
  const onClose = jest.fn();
  const setAdditionalAnalyticsContext = jest.fn();
  const onRetry = jest.fn();
  const requestComplete = jest.fn();

  const commonProps = {
    onOpen,
    onClose,
    setAdditionalAnalyticsContext,
    onRetry,
    requestComplete,
    forwardRef: () => {},
    searchSessionId: 'SOME_SEARCH_SESSION_ID',
    debounceTime: 0,
    query: '',
    queryVersion: 0,
    enabledFilters: [],
    allSiteFilters: [],
    servicesQuery: {
      searchServices,
      fetchMore,
      teamNames: {},
      ...searchDetails,
    },
    libsAppsMoreQuery: {
      searchLibsAppsMore,
      fetchMore,
      teamNames: {},
      ...searchDetails,
    },
    teamsAndUsersQuery: { searchTeamsAndUsers, ...searchDetails, data: [] },
    recentlyViewedComponents: { loading: false, components: [] },
    recentlyViewedTeams: { loading: false, teams: [] },
  };

  const sites = createSiteFilters(2, {
    checkedNumber: 2,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSuccessRecent();
    mockSuccessSearch();
  });

  it("doesn't render if there are no results in pre query", () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients} />,
    );

    expect(wrapper.find(SearchError).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        recentlyViewedComponents={{
          loading: false,
          components: [
            {
              id: 'test-comp',
              name: 'microscope',
              type: CompassComponentType.APPLICATION,
              __typename: 'CompassComponent',
            },
          ],
        }}
        isExpanded
        {...mockClients}
      />,
    );

    expect(wrapper.find(SearchError).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it("doesn't render pre query results if defaultSearchState is not enabled", () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients} />,
    );

    expect(wrapper.find(SearchError).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render dialog when no pre query results', async () => {
    mockEmptyRecents();

    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded={false}
        {...mockClients}
      />,
    );

    // Wait for the requests to resolve, swallowing any errors
    await waitForRecents();

    wrapper.update();

    expect(wrapper.find(ConfluenceSearchDialog).exists()).toBe(false);
  });

  it('matches snapshot and renders error when there is an error when searching', async () => {
    mockErrorSearch();

    const commonProps = {
      onOpen,
      onClose,
      setAdditionalAnalyticsContext,
      onRetry,
      requestComplete,
      forwardRef: () => {},
      searchSessionId: 'SOME_SEARCH_SESSION_ID',
      debounceTime: 0,
      query: '',
      queryVersion: 0,
      enabledFilters: [],
      allSiteFilters: [],
      servicesQuery: {
        searchServices,
        data: undefined,
        error: new Error(''),
        loading: false,
        fetchMore,
        teamNames: {},
      },
      libsAppsMoreQuery: {
        searchLibsAppsMore,
        fetchMore,
        ...searchDetails,
        teamNames: {},
        error: new Error(''),
      },
      teamsAndUsersQuery: {
        searchTeamsAndUsers,
        ...searchDetails,
        error: new Error(''),
        data: [],
      },
      recentlyViewedComponents: { loading: false, components: [] },
      recentlyViewedTeams: { loading: false, teams: [] },
    };

    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
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
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
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

  it('passes the right parameters to the search client when making a query', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
      />,
    );

    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0);

    expect(searchServices).toBeCalledTimes(2);
    expect(searchServices).toBeCalledWith('some query', null);
  });

  it('passes the right parameters to the search client when making a query with a selected site', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
        allSiteFilters={sites}
      />,
    );

    wrapper.setProps({ query: 'some query' });

    await waitForSearch(0);

    expect(searchServices).toBeCalledTimes(2);
    expect(searchServices).toBeCalledWith('some query', null);
  });

  it('correctly resets to pre-query when closed', async () => {
    const wrapper: ShallowWrapper<any, State> = shallow(
      <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients} />,
    );

    // Change query state to non pre-query
    wrapper.setProps({ query: 'some query' });
    wrapper.update();

    await waitForSearch(0);

    // Close the dialog
    wrapper.setProps({
      isExpanded: false,
      query: '',
    });

    wrapper.update();

    // Assert
    expect(wrapper.state('isPreQuery')).toBe(true);
  });

  it('sends analytics when fetching more', () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        createAnalyticsEvent={mockCreateAnalyticsEvent}
        recentlyViewedComponents={{
          loading: false,
          components: [
            {
              id: 'test-comp',
              name: 'microscope',
              type: CompassComponentType.APPLICATION,
              __typename: 'CompassComponent',
            },
          ],
        }}
      />,
    );

    const fetchMore = wrapper.find('_default').prop('fetchMoreFn');
    (fetchMore as any)('SERVICES', '390rtjgawp3yh');

    expect(mockCreateAnalyticsEvent).toBeCalledWith({
      action: 'clicked',
      actionSubject: 'showMoreButton',
    });
    expect(fireUIAnalytics).toBeCalledWith(mockEvent, 'compass-services');

    mockCreateAnalyticsEvent.mockClear();
    (fireUIAnalytics as any).mockClear();

    (fetchMore as any)('LIBS_APPS_MORE', '4nt9g0famw3kyc');

    expect(mockCreateAnalyticsEvent).toBeCalledWith({
      action: 'clicked',
      actionSubject: 'showMoreButton',
    });
    expect(fireUIAnalytics).toBeCalledWith(mockEvent, 'compass-libsApps');
  });

  it('checks analytics on search completion', () => {
    shallow(
      <WrappedConfluenceSearchDialog
        isExpanded={true}
        debounceTime={20}
        query={'testQuery'}
        onRetry={() => {}}
        setAdditionalAnalyticsContext={() => {}}
        queryVersion={1}
      />,
    );

    expect((useSearchComponentsLazyQuery as any).mock.calls.length).toEqual(2);
    // Check analytics event for services search completion
    (useSearchComponentsLazyQuery as any).mock.calls[0][0].onCompleted({
      compass: {
        searchComponents: {
          nodes: ['service1', 'service2', 'service3', 'service4'],
          __typename: 'CompassSearchComponentConnection',
        },
      },
    });
    expect(fireTrackAnalytics).toBeCalledWith({}, 'searchRequest completed', {
      actionSubjectId: 'compass-services',
      resultCount: 4,
    });

    // Check analytics event for libs + apps search completion
    (useSearchComponentsLazyQuery as any).mock.calls[1][0].onCompleted({
      compass: {
        searchComponents: {
          nodes: ['lib', 'lib2', 'app1', 'app2', 'app3'],
          __typename: 'CompassSearchComponentConnection',
        },
      },
    });
    expect(fireTrackAnalytics).toBeCalledWith({}, 'searchRequest completed', {
      actionSubjectId: 'compass-libsApps',
      resultCount: 5,
    });

    // Check analytics event for teams search completion
    expect((useSearchTeams as any).mock.calls.length).toEqual(1);
    (useSearchTeams as any).mock.calls[0][4](['team1', 'team2']);
    expect(fireTrackAnalytics).toBeCalledWith({}, 'searchRequest completed', {
      actionSubjectId: 'compass-teams',
      resultCount: 2,
    });

    // Check analytics event for users search completion
    expect((useSearchUsers as any).mock.calls.length).toEqual(1);
    (useSearchUsers as any).mock.calls[0][0].onCompleted(['user1']);
    expect(fireTrackAnalytics).toBeCalledWith({}, 'searchRequest completed', {
      actionSubjectId: 'compass-users',
      resultCount: 1,
    });
  });
});
