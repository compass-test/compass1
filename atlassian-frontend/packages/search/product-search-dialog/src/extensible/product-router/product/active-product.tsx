import React from 'react';
import { useProductContext } from '../product-router';

/**
 * Displays the product when the product is marked as displayed
 */
export const ActiveProduct: React.FC<{ id: string }> = ({ children, id }) => {
  const { getProduct } = useProductContext();

  const product = getProduct(id);

  if (!product?.isDisplayed) {
    return <></>;
  }

  return <>{children}</>;
};
