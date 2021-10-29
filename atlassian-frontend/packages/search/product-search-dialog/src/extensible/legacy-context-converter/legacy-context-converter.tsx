import React, { FunctionComponent } from 'react';
import { useABTest } from '../ab-test-context';
import { ABTestContext } from '../../common/ab-test-provider';
import { useProductContext } from '../product-router';
import { ProductProvider, Products } from '../../common/product-context';

export const LegacyContextConverter: FunctionComponent = ({ children }) => {
  const { products } = useProductContext();
  const abTest = useABTest();
  return (
    <ProductProvider
      products={products.map((product) => {
        switch (product.id) {
          case 'confluence':
            return Products.confluence;
          case 'jira':
            return Products.jira;
          default:
            return Products.other;
        }
      })}
      activeIndex={products.findIndex((product) => product.isDisplayed)}
      primaryProduct={products[0]?.title}
    >
      <ABTestContext.Provider value={{ abTest: abTest || null }}>
        {children}
      </ABTestContext.Provider>
    </ProductProvider>
  );
};
