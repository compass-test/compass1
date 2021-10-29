import React from 'react';
import { IntlProvider } from 'react-intl';
import CrossProductSearchDialog from './cross-product-search-dialog';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Products } from '../common/product-context';
import { MockJiraClientsProvider } from '../__tests__/__fixtures__/mock-jira-clients-provider';
import { MockConfluenceClientsProvider } from '../__tests__/__fixtures__/mock-confluence-clients-provider';

const Page = styled.div`
  padding-left: 40%;
`;

const commonProps = {
  onOpen: action('opening dialog'),
  onClose: action('closing dialog'),
  onTextEntered: action('text entered analytics fired'),
  isExpanded: true,
  intl: null as any,
  forwardRef: null as any,
  products: [Products.confluence, Products.jira],
  theme: null as any,
  user: null as any,
  confluenceFeatures: {} as any,
  linkComponent: null as any,
  formatDate: (date: any) => date as any,
  onNavigate: action('Navigated'),
  isPreQueryEmpty: false,
  jiraFeatures: {
    hasSoftwareAccess: true,
  } as any,
};

export const ProductListJira = () => (
  <CrossProductSearchDialog
    {...(commonProps as any)}
    products={[Products.jira]}
  />
);

export const ProductListConfluence = () => (
  <CrossProductSearchDialog
    {...(commonProps as any)}
    products={[Products.confluence]}
  />
);

export const ProductListJiraAndConfluence = () => (
  <CrossProductSearchDialog
    {...(commonProps as any)}
    products={[Products.jira, Products.confluence]}
  />
);

export const ProductListConfluenceAndJira = () => (
  <CrossProductSearchDialog
    {...(commonProps as any)}
    products={[Products.confluence, Products.jira]}
  />
);

export default {
  title: 'Cross Product Search Dialog/Cross Product Search Dialog',
  decorators: [
    (story: () => React.ElementType) => (
      <MockJiraClientsProvider mode="normal">
        <MockConfluenceClientsProvider mode="normal">
          <Page>
            <IntlProvider locale="en">{story()}</IntlProvider>
          </Page>
        </MockConfluenceClientsProvider>
      </MockJiraClientsProvider>
    ),
  ],
};
