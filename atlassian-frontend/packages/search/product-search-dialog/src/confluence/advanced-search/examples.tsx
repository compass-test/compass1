import React from 'react';
import { IntlProvider } from 'react-intl';
import ConfluenceAdvancedSearch from './confluence-advanced-search';
import { action } from '@storybook/addon-actions';
import {
  SearchDialog,
  SearchFooter,
  TestSearchKeyboardProvider,
} from '@atlassian/search-dialog';
import { ConfluenceClientsProvider } from '../clients';
import { Products } from '../../common/product-context';
import { ConfluenceFeaturesProvider } from '../../confluence/confluence-features';
import { generateMockSites } from '../../utils/site-util';

const DUMMY_CONFIG = {
  aggregatorUrl: 'some/url',
  baseUrl: '',
  cloudId: 'some/id',
  isUserAnonymous: false,
};

const commonProps = {
  advancedSearchSelected: action('click on advanced search link'),
  searchSessionId: 'abc-123-searchSessionId',
  isLoading: false,
  enabledFilters: [],
};

export const Basic = () => (
  <ConfluenceAdvancedSearch {...commonProps} query={''} />
);

export const Highlighted = () => (
  <TestSearchKeyboardProvider allHighlighted>
    <ConfluenceAdvancedSearch {...commonProps} query={''} />
  </TestSearchKeyboardProvider>
);

export const WithLinkComponent = () => (
  <ConfluenceAdvancedSearch
    {...commonProps}
    query={''}
    linkComponent={(props: any) => (
      /* eslint-disable-next-line */
      <a
        onClick={(e) => {
          e.preventDefault();
          return action('Advanced Search clicked')(e);
        }}
        {...props}
      />
    )}
  />
);

export const WithQuery = () => (
  <ConfluenceAdvancedSearch {...commonProps} query={'A test search'} />
);

export const CrossSite = () => (
  <ConfluenceClientsProvider
    config={{
      ...DUMMY_CONFIG,
      sites: generateMockSites(10, Products.confluence),
    }}
  >
    <ConfluenceFeaturesProvider
      features={{
        isMultiSite: true,
      }}
    >
      <ConfluenceAdvancedSearch
        {...commonProps}
        query={''}
        linkComponent={(props: any) => (
          /* eslint-disable-next-line */
          <a
            onClick={(e) => {
              e.preventDefault();
              return action('Cross Site Advanced Search Clicked for site')(e);
            }}
            {...props}
          />
        )}
      />
    </ConfluenceFeaturesProvider>
  </ConfluenceClientsProvider>
);

export default {
  title: 'Confluence Search Dialog/Confluence Advanced Search Link',
  decorators: [
    (story: () => React.ElementType) => (
      <TestSearchKeyboardProvider allHighlighted={false}>
        <ConfluenceClientsProvider config={DUMMY_CONFIG}>
          <IntlProvider locale="en">
            <SearchDialog>
              <SearchFooter>{story()}</SearchFooter>
            </SearchDialog>
          </IntlProvider>
        </ConfluenceClientsProvider>
      </TestSearchKeyboardProvider>
    ),
  ],
};
