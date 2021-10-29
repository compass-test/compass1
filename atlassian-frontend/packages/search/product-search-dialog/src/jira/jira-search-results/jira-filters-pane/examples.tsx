import React from 'react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import { JiraFilterPane } from './jira-filters-pane';
import { Products, ProductProvider } from '../../../common/product-context';
import { MockJiraClientsProvider } from '../../../__tests__/__fixtures__/mock-jira-clients-provider';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import {
  ABTestProvider,
  DEFAULT_AB_TEST,
} from '../../../common/ab-test-provider';
import { SharedClient } from '../../../common/clients';
import { UserProvider } from '../../../common/user-context';
import { FilterContextProvider } from '../../filter-context';

const MockSharedClient: SharedClient = {
  getAbTestData: () => Promise.resolve(DEFAULT_AB_TEST),
  getProductPermissions: async () => [],
};

const defaultProps = {
  query: '',
  onChange: action('onChange'),
  isLoading: false,
  enabledFilters: [],
};

export const Basic = () => <JiraFilterPane {...defaultProps} />;

export const Error = () => (
  <MockJiraClientsProvider mode="error">
    <JiraFilterPane {...defaultProps} />
  </MockJiraClientsProvider>
);

export const Loading = () => <JiraFilterPane {...defaultProps} isLoading />;

export default {
  title: 'Jira Search Dialog/Filter/Filter Pane',
  decorators: [
    (story: () => React.ElementType) => (
      <ABTestProvider searchClient={MockSharedClient}>
        <SearchSessionProvider sessionKey="blah">
          <UserProvider
            user={{
              name: 'story user',
              email: 'storybook_test_email@atlassian.com',
            }}
          >
            <FilterContextProvider>
              <ProductProvider products={[Products.jira]}>
                <MockJiraClientsProvider mode="slow">
                  <IntlProvider locale="en">{story()}</IntlProvider>
                </MockJiraClientsProvider>
              </ProductProvider>
            </FilterContextProvider>
          </UserProvider>
        </SearchSessionProvider>
      </ABTestProvider>
    ),
  ],
};
