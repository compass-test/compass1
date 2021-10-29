import React, { Suspense } from 'react';

import { TimeLazyLoad } from '../../../common/lazy-load-timing';
import { LoadingSpinner } from '../../../common/loading-spinner';
import { ProductContextProps, withProductContext } from '../product-router';

interface Section {
  id: string;
  title: string;
}

interface ProductProps {
  fallback?: React.ComponentType;
  id: string;
  sections: Section[];
  title: string;
}

export class AsyncProductInner extends React.Component<
  ProductProps & ProductContextProps
> {
  componentDidMount() {
    const { addProduct, id, title, sections } = this.props;
    addProduct({ id, title, sectionIds: sections.map((sec) => sec.id) });
  }

  componentWillUnmount() {
    const { removeProduct, id } = this.props;
    removeProduct(id);
  }

  render() {
    const {
      getProduct,
      fallback: FallbackComponent,
      id,
      children,
    } = this.props;

    const product = getProduct(id);

    if (!product?.isDisplayed) {
      return <></>;
    }

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

export const AsyncProduct: React.ComponentType<ProductProps> = withProductContext(
  AsyncProductInner,
);
