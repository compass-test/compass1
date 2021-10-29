import React from 'react';
import { IntlProvider } from 'react-intl';
import CrossProductSearchDialog from './cross-product-search-dialog';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Products } from '../common/product-context';
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
  theme: null as any,
  user: null as any,
  confluenceFeatures: {} as any,
  linkComponent: null as any,
  formatDate: (date: any) => date as any,
  onNavigate: action('Navigated'),
  isPreQueryEmpty: false,
};

export const ProductListConfluence = () => (
  <CrossProductSearchDialog
    {...(commonProps as any)}
    products={[Products.confluence]}
  />
);

export const ProductListJiraAndConfluence = () => (
  <CrossProductSearchDialog
    {...(commonProps as any)}
    products={[Products.confluence]}
  />
);

export const ProductListConfluenceAndJira = () => (
  <CrossProductSearchDialog
    {...(commonProps as any)}
    products={[Products.confluence]}
  />
);

export default {
  title: 'Cross Product Search Dialog/Cross Product Search Dialog',
  decorators: [
    (story: () => React.ElementType) => (
      <MockConfluenceClientsProvider mode="normal">
        <Page>
          <IntlProvider locale="en">{story()}</IntlProvider>
        </Page>
      </MockConfluenceClientsProvider>
    ),
  ],
};
