import React, { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ProductRouter, useProductContext } from '../product-router';
import { Product } from '../product-router-state';

const MOCK_PRODUCT: Product = {
  isDisplayed: false,
  id: 'product',
  title: 'title',
  order: 0,
  sectionIds: ['some-section'],
};

const wrapper: React.FC = ({ children }) => (
  <ProductRouter __initialProducts={[MOCK_PRODUCT]}>{children}</ProductRouter>
);

describe('product-router', () => {
  it('should return a product from getProduct', () => {
    const {
      result: { current },
    } = renderHook(
      () => {
        return useProductContext().getProduct(MOCK_PRODUCT.id);
      },
      { wrapper },
    );

    expect(current).toEqual(MOCK_PRODUCT);
  });

  it('should return a stable reference to a product if another product is updated', () => {
    const AddExtraProduct: React.FC = () => {
      const { addProduct } = useProductContext();
      useEffect(() => {
        addProduct({ ...MOCK_PRODUCT, id: 'product2', order: 1 });
      }, [addProduct]);
      return null;
    };

    const products: (Product | undefined)[] = [];

    renderHook(
      () => {
        const current = useProductContext().getProduct(MOCK_PRODUCT.id);
        products.push(current);

        return null;
      },
      {
        wrapper: ({ children }) => {
          return (
            <ProductRouter __initialProducts={[MOCK_PRODUCT]}>
              {children}
              <AddExtraProduct />
            </ProductRouter>
          );
        },
      },
    );

    expect(products).toHaveLength(2);
    expect(products[0] === products[1]).toBeTruthy();
  });
});
