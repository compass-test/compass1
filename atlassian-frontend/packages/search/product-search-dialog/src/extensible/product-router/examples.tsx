import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { noResultSuppliers } from '../result-supplier';

import { SearchDialogProduct } from './product';
import { ProductRouter, useProductContext } from './product-router';

export default {
  title: 'Router Components/Product Router',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};

const defaultProps = {
  onRetry: () => null,
  urlGeneratorForNoResultsScreen: () => '',
  ...noResultSuppliers(),
};

export const basic = () => {
  return (
    <ProductRouter>
      <SearchDialogProduct
        title="conflugoo"
        id="confluence"
        sections={[
          {
            id: 'confluence.page,blogpost,attachment',
            title: 'Confluence pages',
          },
        ]}
        order={1}
        permissionSupplier={() =>
          Promise.resolve(['confluence.page,blogpost,attachment'])
        }
        {...defaultProps}
      >
        <div>Confluencie</div>
      </SearchDialogProduct>
      <SearchDialogProduct
        title="jyra"
        id="jira"
        sections={[{ id: 'jira.issue', title: 'Jira Issue' }]}
        order={2}
        permissionSupplier={() => Promise.resolve(['jira.issue'])}
        {...defaultProps}
      >
        <div>gyra</div>
      </SearchDialogProduct>
      <SearchDialogProduct
        title="buttbucket"
        id="bitbucket"
        sections={[
          { id: 'bitbucket.repository', title: 'Bitbucket Repository' },
        ]}
        order={3}
        permissionSupplier={() => Promise.resolve(['bitbucket.repository'])}
        {...defaultProps}
      >
        <div>boitbuckle</div>
      </SearchDialogProduct>
      <ProductConsumer />
    </ProductRouter>
  );
};

const ProductConsumer: FC = () => {
  const { products } = useProductContext();
  return (
    <>
      {products.map((product) => (
        <div>{'Product registered: ' + product.title}</div>
      ))}
    </>
  );
};
