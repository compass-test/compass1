import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';

import { AsyncProduct } from './product';
import { ProductRouter, useProductContext } from './product-router';

export default {
  title: 'Router Components/Product Router',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};

export const basic = () => {
  return (
    <ProductRouter>
      <AsyncProduct
        title="conflugoo"
        id="confluence"
        sections={[
          {
            id: 'confluence.page,blogpost,attachment',
            title: 'Confluence pages',
          },
        ]}
      >
        <div>Confluencie</div>
      </AsyncProduct>
      <AsyncProduct
        title="jyra"
        id="jira"
        sections={[{ id: 'jira.issue', title: 'Jira Issue' }]}
      >
        <div>gyra</div>
      </AsyncProduct>
      <AsyncProduct
        title="buttbucket"
        id="bitbucket"
        sections={[
          { id: 'bitbucket.repository', title: 'Bitbucket Repository' },
        ]}
      >
        <div>boitbuckle</div>
      </AsyncProduct>
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
