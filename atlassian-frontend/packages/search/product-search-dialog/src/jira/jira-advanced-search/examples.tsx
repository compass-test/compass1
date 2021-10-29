import React, { ComponentProps } from 'react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import JiraAdvancedSearch from './jira-advanced-search';
import { SharedClient } from '../../common/clients/common-types';
import { JiraFeaturesProvider, DefaultFeatures } from '../features';
import { ABTestProvider, DEFAULT_AB_TEST } from '../../common/ab-test-provider';
import { MockJiraClientsProvider } from '../../__tests__/__fixtures__/mock-jira-clients-provider';
import { generateMockSites } from '../../utils/site-util';
import { Products } from '../../';

const MockSharedClient: SharedClient = {
  getAbTestData: () => Promise.resolve(DEFAULT_AB_TEST),
  getProductPermissions: async () => [],
};

const commonProps: ComponentProps<typeof JiraAdvancedSearch> = {
  query: '',
  isLoading: false,
  onClick: action('onAdvancedSearchClick'),
};

export const Basic = () => <JiraAdvancedSearch {...commonProps} />;

export const WithQuery = () => (
  <JiraAdvancedSearch {...commonProps} query={'A test search'} />
);

export const WithSoftwareAccess = () => (
  <JiraFeaturesProvider
    features={{ ...DefaultFeatures, hasSoftwareAccess: true }}
  >
    <JiraAdvancedSearch {...commonProps} query={'A test search'} />
  </JiraFeaturesProvider>
);

export const WithoutSoftwareAccess = () => (
  <JiraFeaturesProvider
    features={{ ...DefaultFeatures, hasSoftwareAccess: false }}
  >
    <JiraAdvancedSearch {...commonProps} query={'A test search'} />
  </JiraFeaturesProvider>
);

export const CrossSite = () => (
  <MockJiraClientsProvider
    mode="normal"
    clientOverrides={{
      sites: generateMockSites(10, Products.confluence),
    }}
  >
    <JiraFeaturesProvider
      features={{
        ...DefaultFeatures,
        hasSoftwareAccess: false,
        isMultiSite: true,
      }}
    >
      <JiraAdvancedSearch
        {...commonProps}
        query={'A test search'}
        onClick={(href, e) => {
          action(`Onclick called: ${href}`)(e);
          return e.preventDefault();
        }}
      />
    </JiraFeaturesProvider>
  </MockJiraClientsProvider>
);

export default {
  title: 'Jira Search Dialog/Jira Advanced Search',
  decorators: [
    (story: () => React.ElementType) => (
      <MockJiraClientsProvider mode="normal">
        <ABTestProvider searchClient={MockSharedClient}>
          <JiraFeaturesProvider features={DefaultFeatures}>
            <IntlProvider locale="en">{story()}</IntlProvider>
          </JiraFeaturesProvider>
        </ABTestProvider>
      </MockJiraClientsProvider>
    ),
  ],
};
