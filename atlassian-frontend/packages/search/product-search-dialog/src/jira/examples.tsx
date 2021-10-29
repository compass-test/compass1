import React, { ComponentProps } from 'react';
import { IntlProvider } from 'react-intl';
import { SearchDialog } from './jira-search-dialog';
import styled from 'styled-components';
import CancellablePromise from '../utils/cancellable-promise';
import { SearchSessionProvider } from '../common/search-session-provider';
import { DEFAULT_AB_TEST } from '../common/ab-test-provider';
import { action } from '@storybook/addon-actions';
import { JiraSearchClient, Scope } from './clients';
import {
  createBoardProjectFilterResponse,
  createJiraIssueResponse,
} from '../__tests__/__fixtures__/mock-jira-results';

const Page = styled.div`
  width: 780px;
`;

interface ResultCount {
  issues?: number;
  projectFilterBoards?: number;
}

function delayedPromise<T>(
  resolveValue: T,
  delay: number,
): CancellablePromise<T> {
  return CancellablePromise.from(
    new Promise((resolve) => {
      if (delay === 0) {
        // for 0 delay we resolve immediately, this behaves synchronously like an already resolved promise
        resolve(resolveValue);
      } else {
        setTimeout(() => resolve(resolveValue), delay);
      }
    }),
  );
}

function delayedFailedPromise(
  rejectValue: string,
  delay: number,
): CancellablePromise<any> {
  return CancellablePromise.from(
    new Promise((_, reject) => {
      if (delay === 0) {
        // for 0 delay we reject immediately, this behaves synchronously like an already rejected promise
        reject(rejectValue);
      } else {
        setTimeout(() => reject(rejectValue), delay);
      }
    }),
  );
}

const mockClients = (
  delay: number,
  resultCountConfig?: ResultCount,
): JiraSearchClient => {
  const resultCount = {
    ...{ issues: 10, projectFilterBoards: 3 },
    ...resultCountConfig,
  };

  return {
    getRecentIssues: () =>
      delayedPromise(createJiraIssueResponse(resultCount.issues), delay),
    getRecentBoardsProjectsFilters: () =>
      delayedPromise(
        createBoardProjectFilterResponse(resultCount.projectFilterBoards),
        delay,
      ),
    search: () => ({
      [Scope.JiraIssue]: delayedPromise(
        createJiraIssueResponse(resultCount.issues),
        delay,
      ),
      [Scope.JiraBoardProjectFilter]: delayedPromise(
        createBoardProjectFilterResponse(resultCount.projectFilterBoards),
        delay,
      ),
    }),
    getAbTestData: async () => DEFAULT_AB_TEST,
  } as any;
};

const mockLoadingClient = () =>
  ({
    getRecentIssues: () => CancellablePromise.from(new Promise(() => {})),
    getRecentBoardsProjectsFilters: () =>
      CancellablePromise.from(new Promise(() => {})),

    search: () => ({
      [Scope.JiraIssue]: CancellablePromise.from(new Promise(() => {})),
      [Scope.JiraBoardProjectFilter]: CancellablePromise.from(
        new Promise(() => {}),
      ),
    }),
  } as any);

const mockErrorClient = (): JiraSearchClient =>
  ({
    getRecentIssues: () => delayedFailedPromise('theres a gremlin', 0),
    getRecentBoardsProjectsFilters: () =>
      delayedFailedPromise('theres a gremlin', 0),

    search: () => ({
      [Scope.JiraIssue]: delayedFailedPromise('theres a gremlin', 1000),
      [Scope.JiraBoardProjectFilter]: delayedFailedPromise(
        'theres a gremlin',
        0,
      ),
    }),
  } as any);

const commonProps: ComponentProps<typeof SearchDialog> = {
  debounceTime: 250,
  searchClient: mockClients(0),
  searchSessionId: 'test-session-id',
  isExpanded: true,
  onNavigate: (href) => action('navigation click/keyboard event')(href),
  setAdditionalAnalyticsContext: () => {},
  query: '',
  onRetry: () => {},
  enabledFilters: [],
  allSiteFilters: [],
  requestComplete: (timings: number) => {},
  queryVersion: 0,
  isMultiProduct: false,
  fireAnalyticsOnShownPreQueryEmpty: () => null,
};

export const PreQueryBasic = () => (
  <SearchDialog {...commonProps} isExpanded searchClient={mockClients(0)} />
);

export const PreQueryOverflow = () => (
  <SearchDialog
    {...commonProps}
    isExpanded
    searchClient={mockClients(0, { issues: 20 })}
  />
);

export const SlowQuery = () => (
  <SearchDialog {...commonProps} isExpanded searchClient={mockClients(2000)} />
);

export const PreQueryLoading = () => (
  <SearchDialog
    {...commonProps}
    isExpanded
    searchClient={mockLoadingClient()}
  />
);

export const Error = () => (
  <SearchDialog {...commonProps} isExpanded searchClient={mockErrorClient()} />
);

export const NoResults = () => (
  <SearchDialog
    {...commonProps}
    isExpanded
    searchClient={mockClients(0, { issues: 0, projectFilterBoards: 0 })}
  />
);

export const Collapsed = () => (
  <SearchDialog {...commonProps} isExpanded={false} />
);

export const ExpandAndCollapseWithFocus = () => {
  const [isExpanded, setExpanded] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <p>
        This storybook is mostly used to demonstrate the forward ref behaviour
        of the product search dialog.
      </p>
      <p>On expanding the dialog it should auto focus on the search input</p>
      <p>
        <button
          type="button"
          onClick={() => {
            setExpanded(!isExpanded);
            ref.current && ref.current.focus();
          }}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </p>
      <br />
      <p>
        <SearchDialog
          {...commonProps}
          isExpanded={isExpanded}
          searchClient={mockClients(0, { issues: 0, projectFilterBoards: 0 })}
        />
      </p>
    </>
  );
};

export const SlowNoResults = () => (
  <SearchDialog
    {...commonProps}
    searchClient={mockClients(2000, { issues: 0, projectFilterBoards: 0 })}
  />
);

export const PreQueryAndEmpty = () => (
  <SearchDialog
    {...commonProps}
    searchClient={mockClients(0, { issues: 0, projectFilterBoards: 0 })}
  />
);

export default {
  title: 'Jira Search Dialog/Search Dialog',
  decorators: [
    (story: () => React.ElementType) => (
      <Page>
        <SearchSessionProvider sessionKey="story">
          <IntlProvider locale="en">{story()}</IntlProvider>
        </SearchSessionProvider>
      </Page>
    ),
  ],
};
