import React from 'react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import { FilterPane } from './filter-pane';
import { Products, ProductProvider } from '../../common/product-context';
import { MockConfluenceClientsProvider } from '../../__tests__/__fixtures__/mock-confluence-clients-provider';
import { SearchSessionProvider } from '../../common/search-session-provider';
import { ABTestProvider, DEFAULT_AB_TEST } from '../../common/ab-test-provider';
import { SharedClient } from '../../common/clients';
import { UserProvider } from '../../common/user-context';
import { FilterContextProvider } from '../filter-context';

const defaultProps = {
  query: '',
  onChange: action('onChange'),
  isLoading: false,
  enabledFilters: [],
};

const MockSharedClient: SharedClient = {
  getAbTestData: () => Promise.resolve(DEFAULT_AB_TEST),
  getProductPermissions: async () => [],
};

export const Basic = () => <FilterPane {...defaultProps} />;

export const Error = () => (
  <MockConfluenceClientsProvider mode="error">
    <FilterPane {...defaultProps} />
  </MockConfluenceClientsProvider>
);

export const Loading = () => <FilterPane {...defaultProps} isLoading />;

export default {
  title: 'Confluence Search Dialog/Filter/Filter Pane',
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
              <ProductProvider products={[Products.confluence]}>
                <MockConfluenceClientsProvider mode="slow">
                  <IntlProvider locale="en">{story()}</IntlProvider>
                </MockConfluenceClientsProvider>
              </ProductProvider>
            </FilterContextProvider>
          </UserProvider>
        </SearchSessionProvider>
      </ABTestProvider>
    ),
  ],
};
