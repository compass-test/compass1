import React from 'react';
import { ConfluenceSearchDialog, State } from '../confluence-search-dialog';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  createPageBlogAttachmentResults,
  createSpaceResponse,
  createPeopleResults,
} from '../../__tests__/__fixtures__/mock-search-results';
import { SearchError } from '../../common/search-error';
import { Scope } from '../clients';
import CancellablePromise from '../../utils/cancellable-promise';
import { createSiteFilters } from '../../__tests__/__fixtures__/mock-filters';
import { limitToMaxSiteUsage } from '../../common/clients/multi-site-utils';
import { SearchResults } from '../confluence-search-results';
import { NoPreQueryResults } from '../../common/no-results';

jest.unmock('lodash/debounce');

jest.mock('../../utils/forward-ref', () => ({
  withForwardRef: (arg: any) => arg,
}));

jest.mock('@atlassian/search-dialog', () => {
  const React = require('react');
  return {
    LinkComponent: () => 'div',
    ResultContainer: () => 'div',
    SidebarContainer: () => 'div',
    SearchDialogContent: () => 'div',
    SearchFooter: () => 'div',
    KeyboardHighlightProvider: () => 'div',
    ThemeProvider: React.createContext({}).Provider,
    Link: () => 'a',
  };
});

jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => null,
}));

describe('<ConfluenceSearchDialog />', () => {
  const getRecentPeople = jest.fn();
  const getRecentItems = jest.fn();
  const getRecentSpaces = jest.fn();

  const searchPeople = jest.fn();
  const searchItems = jest.fn();
  const searchSpaces = jest.fn();

  const getRejectedPromise = () =>
    Promise.reject('Rejected promise from confluence-search-dialog test');

  const recentPeopleResults = createPeopleResults(1);
  const recentItemResults = createPageBlogAttachmentResults(1);
  const recentSpaceResults = createSpaceResponse(1);

  const searchPeopleResults = createPeopleResults(1);
  const searchItemResults = createPageBlogAttachmentResults(1);
  const searchSpaceResults = createSpaceResponse(1);

  const mockErrorRecents = () => {
    getRecentPeople.mockReturnValue(
      CancellablePromise.from(getRejectedPromise()),
    );
    getRecentItems.mockReturnValue(
      CancellablePromise.from(getRejectedPromise()),
    );
    getRecentSpaces.mockReturnValue(
      CancellablePromise.from(getRejectedPromise()),
    );
  };
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
    searchPeople.mockReturnValue(CancellablePromise.from(getRejectedPromise()));
    searchItems.mockReturnValue(CancellablePromise.from(getRejectedPromise()));
    searchSpaces.mockReturnValue(CancellablePromise.from(getRejectedPromise()));
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
  };

  const sites = createSiteFilters(2, {
    checkedNumber: 2,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSuccessRecent();
    mockSuccessSearch();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients} />,
    );

    expect(wrapper.find(SearchError).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders no results when there is an error in pre-query', async () => {
    mockErrorRecents();

    const wrapper = shallow(
      <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients} />,
    );

    await waitForRecents();

    wrapper.update();

    expect(wrapper.find(NoPreQueryResults).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot and renders error when there is an error when searching', async () => {
    mockErrorSearch();

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
  it('renders a no results screen in pre-query', async () => {
    mockEmptyRecents();

    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
      />,
    );

    await waitForRecents();

    expect(wrapper.find(SearchResults).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes the right parameters to the recent client when making a query', async () => {
    shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
      />,
    );

    expect(mockClients.searchClient.getRecentPeople).toBeCalledTimes(1);
    expect(mockClients.searchClient.getRecentPeople).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      [],
    );

    expect(mockClients.recentClient.getRecentItems).toBeCalledTimes(1);
    expect(mockClients.recentClient.getRecentSpaces).toBeCalledTimes(1);
  });

  it('passes the right parameters to the recent client when making a query with multi site', async () => {
    shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
        allSiteFilters={sites}
      />,
    );

    expect(mockClients.searchClient.getRecentPeople).toBeCalledTimes(1);
    expect(mockClients.searchClient.getRecentPeople).toBeCalledWith(
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      sites,
    );

    expect(mockClients.recentClient.getRecentItems).toBeCalledTimes(1);
    expect(mockClients.recentClient.getRecentSpaces).toBeCalledTimes(1);
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

    expect(mockClients.searchClient.search).toBeCalledTimes(1);
    expect(mockClients.searchClient.search).toBeCalledWith(
      'some query',
      [],
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      1,
      [],
    );
    expect(setAdditionalAnalyticsContext).toBeCalledWith({
      type: 'queryVersion',
      value: 1,
    });
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

    expect(mockClients.searchClient.search).toBeCalledTimes(1);
    expect(mockClients.searchClient.search).toBeCalledWith(
      'some query',
      [],
      {
        sessionId: 'SOME_SEARCH_SESSION_ID',
        referrerId: null,
      },
      1,
      sites,
    );
    expect(setAdditionalAnalyticsContext).toBeCalledWith({
      type: 'queryVersion',
      value: 1,
    });
  });

  it('correctly resets to pre-query when closed', async () => {
    const wrapper: ShallowWrapper<any, State> = shallow(
      <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients} />,
    );

    // Change query state to non pre-query
    wrapper.setProps({ query: 'some query' });
    wrapper.update();

    await waitForSearch(0);

    // Sanity check
    expect(wrapper.state('isPreQuery')).toBe(false);
    expect(wrapper.state('resultItems').results).toEqual(searchItemResults);
    expect(wrapper.state('resultSpaces').results).toEqual(searchSpaceResults);
    expect(wrapper.state('resultPeople').results).toEqual(searchPeopleResults);

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

  it('renders faster search items', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients} />,
    );

    await waitForRecents();

    const searchTerm = (await getRecentItems().promise()).items[0].name;

    wrapper.setProps({ query: searchTerm });

    wrapper.update();

    expect((wrapper.state() as any).resultItems.results.items.length).toEqual(
      1,
    );
  });

  it('performs search when filters change', async () => {
    // setup
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        enabledFilters={[{ id: 'blah', type: 'space' }]}
      />,
    );

    wrapper.setProps({ query: 'some query' });
    wrapper.update();
    mockClients.searchClient.search.mockClear();

    // execute
    wrapper.setProps({
      enabledFilters: [{ id: 'blah2', type: 'space' }],
    });

    // assert
    expect(mockClients.searchClient.search).toBeCalledTimes(1);
  });

  it('does not perform search when filters does not change', async () => {
    // setup
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        enabledFilters={[{ id: 'blah', type: 'space' }]}
      />,
    );

    wrapper.setProps({ query: 'some query' });
    wrapper.update();
    mockClients.searchClient.search.mockClear();

    // execute
    wrapper.setProps({
      otherProp: 'blah',
      enabledFilters: [{ id: 'blah', type: 'space' }],
    });

    // assert
    expect(mockClients.searchClient.search).toBeCalledTimes(0);
  });

  it('does not render faster search items when filters are applied', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        enabledFilters={[{ id: 'blah', type: 'space' }]}
      />,
    );

    await waitForRecents();

    const searchTerm = (await getRecentItems().promise()).items[0].name;

    wrapper.setProps({ query: searchTerm });

    wrapper.update();

    expect((wrapper.state() as any).resultItems.results.items.length).toEqual(
      0,
    );
  });

  it('does not render faster search items in the final result set with filters', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        enabledFilters={[{ id: 'blah', type: 'space' }]}
      />,
    );

    await waitForRecents();

    const searchTerm = (await getRecentItems().promise()).items[0].name;

    (wrapper.instance() as ConfluenceSearchDialog).onFilterChange();
    wrapper.setProps({ query: searchTerm });

    await waitForSearch(0);

    wrapper.update();

    expect((wrapper.state() as any).resultItems.results.items.length).toEqual(
      1,
    );
  });

  it('searches on the max number of initial sites when none are selected', async () => {
    const sites = createSiteFilters(5, {
      checkedNumber: 0,
    });
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        enabledFilters={[]}
        allSiteFilters={sites}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });

    await waitForSearch(0);

    wrapper.update();

    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);

    expect(mockClients.searchClient.search).toHaveBeenCalledWith(
      'query',
      [],
      {
        sessionId: commonProps.searchSessionId,
        referrerId: null,
      },
      commonProps.queryVersion + 1,
      limitToMaxSiteUsage(sites),
    );
  });

  it('searches on the selected sites when one or more is selected', async () => {
    const sites = createSiteFilters(5, {
      checkedNumber: 2,
    });
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        enabledFilters={[]}
        allSiteFilters={sites}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });

    await waitForSearch(0);

    wrapper.update();

    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);

    expect(mockClients.searchClient.search).toHaveBeenCalledWith(
      'query',
      [],
      {
        sessionId: commonProps.searchSessionId,
        referrerId: null,
      },
      commonProps.queryVersion + 1,
      sites.filter((site) => site.isChecked),
    );
  });

  it('does not search when the dialog collapses', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });
    wrapper.update();

    await waitForSearch(0);

    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);

    wrapper.setProps({ isExpanded: false });
    wrapper.update();

    // Expect no extra searches to have been made
    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);
  });

  it('does not search when the dialog collapses with filters', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
        enabledFilters={[{ id: 'blah', type: 'space' }]}
        allSiteFilters={sites}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });
    wrapper.update();

    await waitForSearch(0);

    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      isExpanded: false,
      enabledFilters: [],
      allSiteFilters: [],
    });
    wrapper.update();

    // Expect no extra searches to have been made
    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);
  });

  it('does not search when the dialog collapses with a query', async () => {
    const wrapper = shallow(
      <ConfluenceSearchDialog
        {...commonProps}
        isExpanded
        {...mockClients}
        debounceTime={0}
      />,
    );

    await waitForRecents();

    wrapper.setProps({ query: 'query' });
    wrapper.update();

    await waitForSearch(0);

    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);

    wrapper.setProps({ isExpanded: false, query: '' });
    wrapper.update();

    // Expect no extra searches to have been made
    expect(mockClients.searchClient.search).toHaveBeenCalledTimes(1);
  });
});
