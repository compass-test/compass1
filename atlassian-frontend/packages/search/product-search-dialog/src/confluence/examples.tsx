import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfluenceSearchDialog } from './confluence-search-dialog';
import styled from 'styled-components';
import {
  createPageBlogAttachmentResults,
  createPeopleResults,
  createSpaceResponse,
} from '../__tests__/__fixtures__/mock-search-results';
import { Scope } from './clients';
import CancellablePromise from '../utils/cancellable-promise';
import { action } from '@storybook/addon-actions';
import { SearchSessionProvider } from '../common/search-session-provider';
import { ABTestProvider, DEFAULT_AB_TEST } from '../common/ab-test-provider';
import { ConfluenceClientsProvider } from './clients/confluence-search-provider';
import { SharedClient } from '../common/clients';
import { ProductProvider, Products } from '../common/product-context';

const Page = styled.div`
  width: 780px;
`;

interface ResultCount {
  item?: number;
  space?: number;
  people?: number;
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

function delayedFailedPromise<T>(
  rejectValue: T,
  delay: number,
): CancellablePromise<T> {
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

const mockClients = (delay: number, resultCountConfig?: ResultCount) => {
  const resultCount = {
    ...{ item: 99, space: 3, people: 3 },
    ...resultCountConfig,
  };

  return {
    recentClient: {
      getRecentItems: () =>
        delayedPromise(
          createPageBlogAttachmentResults(resultCount.item),
          delay,
        ),
      getRecentSpaces: () =>
        delayedPromise(createSpaceResponse(resultCount.space), delay),
    },
    searchClient: {
      search: () => ({
        [Scope.ConfluencePageBlogAttachment]: delayedPromise(
          createPageBlogAttachmentResults(resultCount.item),
          delay,
        ),
        [Scope.ConfluenceSpace]: delayedPromise(
          createSpaceResponse(resultCount.space),
          delay,
        ),
        [Scope.People]: delayedPromise(
          createPeopleResults(resultCount.people),
          delay,
        ),
      }),
      getRecentPeople: () =>
        delayedPromise(createPeopleResults(resultCount.people), delay),
      getAbTestData: async () => DEFAULT_AB_TEST,
    },
  } as {
    recentClient: any;
    searchClient: any;
  };
};

const mockLoadingClient = () =>
  ({
    recentClient: {
      getRecentItems: () => CancellablePromise.from(new Promise(() => {})),
      getRecentSpaces: () => CancellablePromise.from(new Promise(() => {})),
    },
    searchClient: {
      getRecentPeople: () => CancellablePromise.from(new Promise(() => {})),
      getAbTestData: async () => DEFAULT_AB_TEST,
    },
  } as {
    recentClient: any;
    searchClient: any;
  });

const mockErrorClient = (delay: number = 1000) =>
  ({
    recentClient: {
      getRecentItems: () => delayedFailedPromise('theres a gremlin', 0),
      getRecentSpaces: () => delayedFailedPromise('theres a gremlin', 0),
    },

    searchClient: {
      search: () => ({
        [Scope.ConfluencePageBlogAttachment]: delayedFailedPromise(
          'theres a gremlin',
          delay,
        ),
        [Scope.ConfluenceSpace]: delayedFailedPromise(
          'theres a gremlin',
          delay,
        ),
        [Scope.People]: delayedFailedPromise('theres a gremlin', delay),
      }),
      getRecentPeople: () => delayedFailedPromise('theres a gremlin', 0),
      getAbTestData: async () => DEFAULT_AB_TEST,
    },
  } as {
    recentClient: any;
    searchClient: any;
  });

const commonProps = {
  ...mockClients(0),
  onOpen: action('opeing dialog'),
  onClose: action('closing dialog'),
  requestComplete: action('request completed analytics'),
  searchSessionId: 'abc123',
  onTextEntered: action('text entered analytics fired'),
  isExpanded: true,
  intl: null as any,
  forwardRef: null,
  onRetry: action('retry done'),
  onRequestComplete: action('request completed analytics'),
  setAdditionalAnalyticsContext: () => {},
  debounceTime: 0,
  query: '',
  queryVersion: 0,
  allSiteFilters: [],
  enabledFilters: [],
};

export const BasicPreQuery = () => (
  <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients(0)} />
);

export const OverflowPreQuery = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    isExpanded
    {...mockClients(0, { item: 20 })}
  />
);

export const SlowQuery = () => (
  <ConfluenceSearchDialog {...commonProps} isExpanded {...mockClients(2000)} />
);

export const LoadingPreQuery = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    isExpanded
    {...mockLoadingClient()}
  />
);

export const Error = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    isExpanded
    {...mockErrorClient()}
    query={'aaa'}
  />
);

export const NoResults = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    isExpanded
    {...mockClients(0, { item: 0, space: 0, people: 0 })}
    query={'aaa'}
  />
);

export const NoResultsPreQuery = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    isExpanded
    {...mockClients(0, { item: 0, space: 0, people: 0 })}
    query={''}
  />
);

export const Collapsed = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    isExpanded={false}
    {...mockClients(0)}
  />
);

export const SlowNoResults = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    {...mockClients(2000, { item: 0, space: 0, people: 0 })}
  />
);

export const PostQueryError = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    {...mockErrorClient()}
    query={'aaa'}
  />
);

export const WithFiltersPostQueryError = () => (
  <ConfluenceSearchDialog
    {...commonProps}
    {...mockErrorClient()}
    query={'aaa'}
  />
);

const DUMMY_CONFIG = {
  aggregatorUrl: 'some/url',
  baseUrl: '',
  cloudId: 'some/id',
  isUserAnonymous: false,
};

const MockExperimentClient: SharedClient = {
  getAbTestData: () => Promise.resolve(DEFAULT_AB_TEST),
  getProductPermissions: async () => [],
};

export default {
  title: 'Confluence Search Dialog/Confluence Search Dialog',
  decorators: [
    (story: () => React.ElementType) => (
      <ABTestProvider searchClient={MockExperimentClient}>
        <ProductProvider products={[Products.confluence]}>
          <ConfluenceClientsProvider config={DUMMY_CONFIG}>
            <SearchSessionProvider sessionKey="story">
              <IntlProvider locale="en">
                <Page>{story()}</Page>
              </IntlProvider>
            </SearchSessionProvider>
          </ConfluenceClientsProvider>
        </ProductProvider>
      </ABTestProvider>
    ),
  ],
};
