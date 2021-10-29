import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { utils } from '@atlaskit/util-service-support';
import { ConfluenceTab } from '../products/confluence/confluence-tab';
import { JiraTab } from '../products/jira/jira-tab';
import { ExtensibleDialogTestWrapper } from './__fixtures__/extensible-dialog-test-wrapper';
import { MetaContextProvider } from '../meta-context-provider';
import { DEFAULT_AB_TEST } from '../ab-test-context/ab-test-context';
import {
  RECENT_PAGES_PATH,
  RECENT_SPACE_PATH,
} from '../../confluence/clients/confluence-recents-client';

const mockAggregatorSearch = jest.fn();
const mockAggregatorGetAbTest = jest.fn();

jest.mock('../../common/clients/base-search-client', () => ({
  AggregatorClient: () => ({
    search: mockAggregatorSearch,
    getAbTestData: mockAggregatorGetAbTest,
  }),
}));

jest.mock('@atlaskit/util-service-support', () => ({
  utils: {
    requestService: jest.fn(() => Promise.resolve([])),
  },
}));

jest.unmock('lodash/debounce');

beforeEach(() => {
  jest.clearAllMocks();

  mockAggregatorSearch.mockImplementation(() =>
    Promise.resolve({
      response: {
        retrieveScope: () => ({
          id: 'some_scope',
          size: 0,
          results: [],
        }),
      },
      requestDurationMs: 0,
    }),
  );

  mockAggregatorGetAbTest.mockImplementation(() =>
    Promise.resolve(DEFAULT_AB_TEST),
  );
});

describe('Extensible architecture prefetching [Legacy search dialogs]', () => {
  it('Confluence does not prefetch on re-renders', async () => {
    const wrapper = mount(
      <ExtensibleDialogTestWrapper
        // As the Confluence's recents client is memoised, passing in a unique
        // baseUrl ensures a new recents client is used for each test
        clientConfigOverride={{
          aggregatorUrl: '',
          baseUrl: '/confluence-test/re-render',
          cloudId: '',
          isUserAnonymous: false,
        }}
      >
        {({ onRetry, isExpanded }) => (
          <ConfluenceTab
            onRetry={onRetry}
            isExpanded={isExpanded}
            linkComponent={() => <div></div>}
            order={1}
            permissionSupplier={() =>
              Promise.resolve(['confluence.page,blogpost,attachment'])
            }
            isPrefetchingEnabled={true}
          />
        )}
      </ExtensibleDialogTestWrapper>,
    );
    await waitForSearches();

    // Expect recent calls to be made after mount
    expectConfluenceRecentCalls();

    // Force a re-render
    act(() => {
      wrapper.setProps({});
    });
    await waitForSearches();

    // Expect same number of recent calls
    expectConfluenceRecentCalls();
  });

  it('Confluence does not prefetch on expanding / collapsing', async () => {
    const wrapper = mount(
      <ExtensibleDialogTestWrapper
        // As the Confluence's recents client is memoised, passing in a unique
        // baseUrl ensures a new recents client is used for each test
        clientConfigOverride={{
          aggregatorUrl: '',
          baseUrl: '/confluence-test/expanding-collapsing',
          cloudId: '',
          isUserAnonymous: false,
        }}
      >
        {({ onRetry, isExpanded }) => (
          <ConfluenceTab
            onRetry={onRetry}
            isExpanded={isExpanded}
            linkComponent={() => <div></div>}
            order={1}
            permissionSupplier={() =>
              Promise.resolve(['confluence.page,blogpost,attachment'])
            }
            isPrefetchingEnabled={true}
          />
        )}
      </ExtensibleDialogTestWrapper>,
    );
    await waitForSearches();

    // Expect recent calls to be made after mount
    expectConfluenceRecentCalls();

    // Expand and collapse the dialog
    const setIsExpanded = wrapper
      .find(MetaContextProvider)
      .prop('setIsExpanded');

    act(() => {
      setIsExpanded(true);
    });
    wrapper.update();
    act(() => {
      setIsExpanded(false);
    });
    wrapper.update();
    await waitForSearches();

    // Expect same number of recent calls
    expectConfluenceRecentCalls();
  });

  it('Jira does not prefetch on re-renders', async () => {
    const wrapper = mount(
      <ExtensibleDialogTestWrapper>
        {({ onRetry, isExpanded }) => (
          <JiraTab
            onRetry={onRetry}
            isExpanded={isExpanded}
            onNavigate={jest.fn()}
            order={1}
            features={{ hasSoftwareAccess: false }}
            permissionSupplier={() => Promise.resolve(['jira.issue'])}
            isPrefetchingEnabled={true}
          />
        )}
      </ExtensibleDialogTestWrapper>,
    );
    await waitForSearches();

    // Expect recent calls to be made after mount
    expectJiraRecentCalls();

    // Force a re-render
    act(() => {
      wrapper.setProps({});
    });
    await waitForSearches();

    // Expect same number of recent calls
    expectJiraRecentCalls();
  });

  it('Jira does not prefetch on expanding / collapsing', async () => {
    const wrapper = mount(
      <ExtensibleDialogTestWrapper>
        {({ onRetry, isExpanded }) => (
          <JiraTab
            onRetry={onRetry}
            isExpanded={isExpanded}
            onNavigate={jest.fn()}
            order={1}
            features={{ hasSoftwareAccess: false }}
            permissionSupplier={() => Promise.resolve(['jira.issue'])}
            isPrefetchingEnabled={true}
          />
        )}
      </ExtensibleDialogTestWrapper>,
    );
    await waitForSearches();

    // Expect recent calls to be made after mount
    expectJiraRecentCalls();

    // Expand and collapse the dialog
    const setIsExpanded = wrapper
      .find(MetaContextProvider)
      .prop('setIsExpanded');

    act(() => {
      setIsExpanded(true);
    });
    wrapper.update();
    act(() => {
      setIsExpanded(false);
    });
    wrapper.update();
    await waitForSearches();

    // Expect same number of recent calls
    expectJiraRecentCalls();
  });
});

async function waitForSearches() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

function findAggregatorSearchCallsWithScopes(scopes: string[]) {
  const scopesString = JSON.stringify(scopes.sort());
  const calls = mockAggregatorSearch.mock.calls;
  return calls.filter((call) => {
    const { scopes: callScopes }: { scopes: string[] } = call[0];
    const callScopesString = JSON.stringify(callScopes.sort());
    return scopesString === callScopesString;
  });
}

function expectJiraRecentCalls() {
  const recentIssuesCalls = findAggregatorSearchCallsWithScopes(['jira.issue']);
  const recentBoardsProjectsFiltersCalls = findAggregatorSearchCallsWithScopes([
    'jira.board,project,filter',
  ]);
  expect(mockAggregatorSearch).toHaveBeenCalledTimes(2);
  expect(recentIssuesCalls).toHaveLength(1);
  expect(recentBoardsProjectsFiltersCalls).toHaveLength(1);
}

function findRequestServiceCallsWithPath(path: string) {
  const mockUtilsRequestService = utils.requestService as jest.Mock;
  const calls = mockUtilsRequestService.mock.calls;
  return calls.filter((call) => {
    const { path: callPath }: { path: string } = call[1];
    return path === callPath;
  });
}

function expectConfluenceRecentCalls() {
  const mockUtilsRequestService = utils.requestService as jest.Mock;
  const recentPagesCalls = findRequestServiceCallsWithPath(RECENT_PAGES_PATH);
  const recentSpacesCalls = findRequestServiceCallsWithPath(RECENT_SPACE_PATH);
  expect(mockUtilsRequestService).toHaveBeenCalledTimes(2);
  expect(recentPagesCalls).toHaveLength(1);
  expect(recentSpacesCalls).toHaveLength(1);
}
