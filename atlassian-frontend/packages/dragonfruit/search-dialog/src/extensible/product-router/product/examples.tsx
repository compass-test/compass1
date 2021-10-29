import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { AsyncProduct } from '.';
import { DialogExpansionContextProvider } from '../../dialog-expansion-context';
import { ProductRouter } from '../product-router';

export default {
  title: 'Router Components/Async Product Component',
};

export const Basic = () => {
  const isExpanded: boolean = boolean('Expand Dialog', true);
  return (
    <DialogExpansionContextProvider
      isExpanded={isExpanded}
      setIsExpanded={(ignore) => undefined}
    >
      <ProductRouter>
        <AsyncProduct
          title="Some product"
          id="some-product"
          sections={[{ id: 'some.issue', title: 'Some Issue Title' }]}
        >
          <div>I am a product inside of a context</div>
        </AsyncProduct>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};

const threeSecondPromise = () =>
  new Promise((resolve) => window.setTimeout(resolve, 3000));

export const AsyncLoading = () => {
  const Component = React.lazy(() =>
    threeSecondPromise().then(() => ({
      default: () => <div>I wait for 3 seconds then I render</div>,
    })),
  );

  const isExpanded: boolean = boolean('Expand Dialog', true);

  return (
    <DialogExpansionContextProvider
      isExpanded={isExpanded}
      setIsExpanded={(ignore) => undefined}
    >
      <ProductRouter>
        <AsyncProduct
          title="Some product"
          id="some-product"
          sections={[{ id: 'some.issue', title: 'Some Issue Title' }]}
        >
          <Component />
        </AsyncProduct>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};

export const CustomFallbackComponent = () => {
  const Component = React.lazy(() =>
    threeSecondPromise().then(() => ({
      default: () => <div>I wait for 3 seconds then I render</div>,
    })),
  );

  const isExpanded: boolean = boolean('Expand Dialog', true);

  return (
    <DialogExpansionContextProvider
      isExpanded={isExpanded}
      setIsExpanded={(ignore) => undefined}
    >
      <ProductRouter>
        <AsyncProduct
          title="Some product"
          id="some-product"
          sections={[{ id: 'some.issue', title: 'Some Issue Title' }]}
          fallback={() => <p>I render while the component is loading</p>}
        >
          <Component />
        </AsyncProduct>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};
