import React from 'react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { SearchResults } from './confluence-search-results';
import {
  createPageBlogAttachmentResults,
  createPeopleResults,
  createSpaceResponse,
} from '../../__tests__/__fixtures__/mock-search-results';
import { SearchSessionProvider } from '../../common/search-session-provider';
import { FilterContextProvider } from '../filter-context';
import { MockConfluenceClientsProvider } from '../../__tests__/__fixtures__/mock-confluence-clients-provider';
import { ABTestProvider, DEFAULT_AB_TEST } from '../../common/ab-test-provider';
import { SharedClient } from '../../common/clients';
import { Products, ProductProvider } from '../../common/product-context';

const LoadingResultState = {
  isLoading: true,
  results: null,
};

const defaultProps = {
  query: 'abc',
  advancedSearchUrl: 'some/advanced/search/url?q=abc',
  enabledFilters: [],
  onFiltersCleared: action('filters cleared'),
  items: {
    isLoading: false,
    results: createPageBlogAttachmentResults(3),
  },
  spaces: {
    isLoading: false,
    results: createSpaceResponse(3),
  },
  people: {
    isLoading: false,
    results: createPeopleResults(3),
  },
  services: {
    isLoading: false,
    cursor: null,
    results: null,
  },
  libsAppsMore: {
    isLoading: false,
    cursor: null,
    results: null,
  },
  peopleTeams: {
    isLoading: false,
    results: null,
  },
  showFilters: true,
  isBelowTakeoverWidth: false,
  fetchMoreFn: () => void 0,
  teamNames: {},
  recentlyViewedComponents: { loading: false, components: [] },
  recentlyViewedTeams: { loading: false, teams: [] },
};

const emptyProps = {
  ...defaultProps,
  items: {
    isLoading: false,
    results: createPageBlogAttachmentResults(0),
  },
  spaces: {
    isLoading: false,
    results: createSpaceResponse(0),
  },
  people: {
    isLoading: false,
    results: createPeopleResults(0),
  },
  services: {
    isLoading: false,
    cursor: null,
    results: null,
  },
  libsAppsMore: {
    isLoading: false,
    cursor: null,
    results: null,
  },
  peopleTeams: {
    isLoading: false,
    results: null,
  },
  showFilters: true,
  teamNames: {},
};

const loadingProps = {
  ...defaultProps,
  items: LoadingResultState,
  spaces: LoadingResultState,
  people: LoadingResultState,
};

const Container = styled.div`
  width: 780px;
  border: 1px solid black;
`;

const TinyContainer = styled.div`
  width: 780px;
  height: 200px;
`;

const MockSharedClient: SharedClient = {
  getAbTestData: () => Promise.resolve(DEFAULT_AB_TEST),
  getProductPermissions: async () => [],
};

export const PreDefault = () => <SearchResults {...defaultProps} isPreQuery />;

export const PreLoading = () => <SearchResults {...loadingProps} isPreQuery />;

export const PreNoResults = () => <SearchResults {...emptyProps} isPreQuery />;

export const PreTinyContainer = () => (
  <TinyContainer>
    <SearchResults {...defaultProps} isPreQuery />
  </TinyContainer>
);

export const PostDefault = () => (
  <SearchResults {...defaultProps} isPreQuery={false} />
);

export const PostLoading = () => (
  <SearchResults {...loadingProps} isPreQuery={false} />
);

export const PostNoResults = () => (
  <SearchResults {...emptyProps} isPreQuery={false} />
);

export const PostTinyContainer = () => (
  <TinyContainer>
    <SearchResults {...defaultProps} isPreQuery={false} />
  </TinyContainer>
);

export const PostAndFilterDefault = () => (
  <SearchResults
    {...defaultProps}
    isPreQuery={false}
    showFilters
    isBelowTakeoverWidth={false}
  />
);

export const PostAndFilterLoading = () => (
  <SearchResults
    {...loadingProps}
    isPreQuery={false}
    showFilters
    isBelowTakeoverWidth={false}
  />
);

export const PostAndFilterNoResults = () => (
  <SearchResults
    {...emptyProps}
    isPreQuery={false}
    showFilters
    isBelowTakeoverWidth={false}
  />
);

export const PostAndFilterTinyContainer = () => (
  <TinyContainer>
    <SearchResults
      {...defaultProps}
      isPreQuery={false}
      showFilters
      isBelowTakeoverWidth={false}
    />
  </TinyContainer>
);

export const PostAndFilterFiltersWithFewResults = () => (
  <SearchResults
    {...emptyProps}
    isPreQuery={false}
    showFilters
    isBelowTakeoverWidth={false}
  />
);

export const LinkComponent = () => (
  <SearchResults
    {...defaultProps}
    isPreQuery={false}
    /* eslint-disable-next-line */
    linkComponent={(props: any) => (
      <a {...props} href={undefined} onClick={action('Link clicked')}>
        Click Me
      </a>
    )}
  />
);

export default {
  title: 'Confluence Search Dialog/Confluence Search Results',
  decorators: [
    (story: () => React.ElementType) => (
      <Container>
        <MockConfluenceClientsProvider mode="normal">
          <SearchSessionProvider sessionKey="story_session_key">
            <ABTestProvider searchClient={MockSharedClient}>
              <ProductProvider products={[Products.confluence]}>
                <IntlProvider locale="en">
                  <FilterContextProvider>{story()}</FilterContextProvider>
                </IntlProvider>
              </ProductProvider>
            </ABTestProvider>
          </SearchSessionProvider>
        </MockConfluenceClientsProvider>
      </Container>
    ),
  ],
};
