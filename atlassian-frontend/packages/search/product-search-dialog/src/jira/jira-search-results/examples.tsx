import React from 'react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import SearchResults from './jira-search-results';

import {
  createJiraIssueResponse,
  createBoardProjectFilterResponse,
} from '../../__tests__/__fixtures__/mock-jira-results';
import { SearchSessionProvider } from '../../common/search-session-provider';
import { ABTestProvider, DEFAULT_AB_TEST } from '../../common/ab-test-provider';
import { SharedClient } from '../../common/clients/common-types';
import { JiraFeaturesProvider, DefaultFeatures } from '../features/features';
import { MockJiraClientsProvider } from '../../__tests__/__fixtures__/mock-jira-clients-provider';
import { FilterContextProvider } from '../filter-context';
import { Products, ProductProvider } from '../../common/product-context';

// Styled components
// ------------------------------
const PageContainer = styled.div`
  width: 780px;
  border: 1px solid black;
`;

const StyledLinkComponent = styled.a`
  cursor: pointer;
`;

const noResults = {
  items: [],
  timings: 0,
  totalSize: 0,
};

// Data
// ------------------------------
const defaultProps = {
  query: '',
  onFiltersCleared: action('filters cleared'),
  onNavigate: () => {},
  results: {
    issues: {
      isLoading: false,
      results: createJiraIssueResponse(30),
      totalSize: 30,
    },
    boardsProjectsFiltersPlans: {
      isLoading: false,
      results: createBoardProjectFilterResponse(10),
      totalSize: 10,
    },
  },
  isBelowTakeoverWidth: false,
};

const loadingProps = {
  query: '',
  onNavigate: () => {},
  results: {
    issues: {
      isLoading: true,
      results: noResults,
    },
    boardsProjectsFiltersPlans: {
      isLoading: true,
      results: noResults,
    },
  },
  isBelowTakeoverWidth: false,
};

const emptyProps = {
  query: '',
  onNavigate: () => {},
  results: {
    issues: {
      isLoading: false,
      results: noResults,
    },
    boardsProjectsFiltersPlans: {
      isLoading: false,
      results: noResults,
    },
  },
  isBelowTakeoverWidth: false,
};

const MockSharedClient: SharedClient = {
  getAbTestData: () => Promise.resolve(DEFAULT_AB_TEST),
  getProductPermissions: async () => [],
};

export const PreQueryRecentsBasic = () => (
  <SearchResults {...defaultProps} isPreQuery />
);

export const PreQueryRecentsLoading = () => (
  <SearchResults {...loadingProps} isPreQuery />
);

export const PreQueryRecentsNoResults = () => (
  <SearchResults {...emptyProps} isPreQuery />
);

export const PostQueryBasic = () => (
  <SearchResults {...defaultProps} isPreQuery={false} query="lorem" />
);

export const PostQueryCollapsed = () => (
  <SearchResults {...defaultProps} isPreQuery={false} query="lorem" />
);

export const PostQueryLoading = () => (
  <SearchResults {...loadingProps} isPreQuery={false} query="lorem" />
);

export const PostQueryNoResults = () => (
  <SearchResults {...emptyProps} isPreQuery={false} query="lorem" />
);

export const PostQueryResultsBasicWithFilters = () => (
  <SearchResults {...defaultProps} isPreQuery={false} query="lorem" />
);

export const PostQueryNoResultsWithFilters = () => (
  <SearchResults {...emptyProps} isPreQuery={false} query="lorem" />
);

export const LinkComponent = () => (
  <SearchResults
    {...defaultProps}
    isPreQuery={false}
    linkComponent={(props: any) => (
      <StyledLinkComponent
        {...props}
        href="#"
        onClick={action('Link clicked')}
      />
    )}
  />
);

export default {
  title: 'Jira Search Dialog/Search Results',
  decorators: [
    (story: () => React.ElementType) => (
      <PageContainer>
        <SearchSessionProvider sessionKey="">
          <MockJiraClientsProvider mode="normal">
            <FilterContextProvider>
              <ABTestProvider searchClient={MockSharedClient}>
                <ProductProvider products={[Products.jira]}>
                  <JiraFeaturesProvider features={DefaultFeatures}>
                    <IntlProvider locale="en">{story()}</IntlProvider>
                  </JiraFeaturesProvider>
                </ProductProvider>
              </ABTestProvider>
            </FilterContextProvider>
          </MockJiraClientsProvider>
        </SearchSessionProvider>
      </PageContainer>
    ),
  ],
};
