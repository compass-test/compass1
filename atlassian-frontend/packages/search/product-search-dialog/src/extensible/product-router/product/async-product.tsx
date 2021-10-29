import React, { Suspense } from 'react';

import { TimeLazyLoad } from '../../../common/lazy-load-timing';
import { LoadingSpinner } from '../../../common/loading-spinner';
import { ProductContextProps, withProductContext } from '../product-router';
import { SearchDialogProductProps } from './search-dialog-product';

export class AsyncProductInner extends React.Component<
  SearchDialogProductProps & ProductContextProps
> {
  componentWillUnmount() {
    const { removeProduct, id } = this.props;
    removeProduct(id);
  }

  render() {
    const { fallback: FallbackComponent, id, children } = this.props;

    return (
      <Suspense
        fallback={
          <TimeLazyLoad product={id}>
            {FallbackComponent ? <FallbackComponent /> : <LoadingSpinner />}
          </TimeLazyLoad>
        }
      >
        {children}
      </Suspense>
    );
  }
}

/**
 * A component to register the product with a product router and asyncronously load its contents
 */
export const AsyncProduct: React.ComponentType<SearchDialogProductProps> = withProductContext(
  AsyncProductInner,
);
