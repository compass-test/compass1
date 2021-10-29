import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { AsyncProduct, SearchDialogProduct } from '.';
import { DialogExpansionContextProvider } from '../../dialog-expansion-context';
import { noResultSuppliers } from '../../result-supplier';
import { ProductRouter } from '../product-router';

export default {
  title: 'Router Components/Async Product Component',
};

const product = {
  id: 'some-product',
  isDisplayed: true,
  sectionIds: ['some.issue'],
  title: 'Some',
  order: 0,
};
const Wrapper: React.FC<{ isExpanded: boolean }> = ({
  isExpanded,
  children,
}) => (
  <DialogExpansionContextProvider
    isExpanded={isExpanded}
    setIsExpanded={(ignore) => undefined}
  >
    <ProductRouter __initialProducts={[product]}>{children}</ProductRouter>
  </DialogExpansionContextProvider>
);

const defaultProps = {
  onRetry: () => null,
  urlGeneratorForNoResultsScreen: () => '',
  ...noResultSuppliers(),
};

export const Basic = () => {
  const isExpanded: boolean = boolean('Expand Dialog', true);
  return (
    <Wrapper isExpanded={isExpanded}>
      <SearchDialogProduct
        title={product.title}
        id={product.id}
        sections={[{ id: 'some.issue', title: 'Some Issue Title' }]}
        order={0}
        permissionSupplier={() => Promise.resolve(product.sectionIds)}
        {...defaultProps}
      >
        {() => ({
          Header: () => <div>I am a header</div>,
          Body: () => <div>I am a body</div>,
          Footer: () => <div>I am a footer</div>,
        })}
      </SearchDialogProduct>
    </Wrapper>
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
          order={1}
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
          order={1}
        >
          <Component />
        </AsyncProduct>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};

export const Retry = () => {
  const isExpanded: boolean = boolean('Expand Dialog', true);

  const { preQueryItemSupplier, postQueryItemSupplier } = noResultSuppliers();
  const supplierAction = action('Post query supplier was called');
  return (
    <Wrapper isExpanded={isExpanded}>
      <SearchDialogProduct
        {...defaultProps}
        title={product.title}
        id={product.id}
        sections={[{ id: 'some.issue', title: 'Some Issue Title' }]}
        order={0}
        permissionSupplier={() => Promise.resolve(product.sectionIds)}
        preQueryItemSupplier={preQueryItemSupplier}
        postQueryItemSupplier={(args) => {
          supplierAction(args);
          return postQueryItemSupplier(args);
        }}
      >
        {({ onRetry }) => ({
          Body: () => (
            <button onClick={onRetry}>Click me to cause a retry!</button>
          ),
        })}
      </SearchDialogProduct>
    </Wrapper>
  );
};
