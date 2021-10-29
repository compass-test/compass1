import React from 'react';
import { IntlProvider } from 'react-intl';
import { ProductSearchDialog } from './product-search-dialog';
import { SharedClient } from '../clients';
import { DEFAULT_AB_TEST } from '../ab-test-provider';
import { Products } from '../product-context';

export default {
  title: 'Common Components/Product Search Dialog',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};

const mockSharedClient: SharedClient = {
  getAbTestData: async () => DEFAULT_AB_TEST,
  getProductPermissions: async (products) => Promise.resolve(products),
};

const slowSharedClient: SharedClient = {
  getAbTestData: () =>
    new Promise((r) => setTimeout(() => r(DEFAULT_AB_TEST), 3000)),
  getProductPermissions: async (products) => Promise.resolve(products),
};

const defaultProps = {
  onClose: () => {},
  onOpen: () => {},
  isExpanded: false,
  products: [Products.confluence],
  children: (setRef: (ref: HTMLInputElement | null) => void) => (
    <input placeholder="Fully loaded component" />
  ),
  selectedTabIndex: 0,
  doProductPermissionsCheck: true,
};

export const basic = () => (
  <ProductSearchDialog {...defaultProps} sharedClient={mockSharedClient} />
);

export const slowExperiment = () => (
  <ProductSearchDialog {...defaultProps} sharedClient={slowSharedClient} />
);
