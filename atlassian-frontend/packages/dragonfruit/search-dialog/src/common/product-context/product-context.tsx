import React, { useContext, FunctionComponent } from 'react';

export enum Products {
  confluence = 'CONFLUENCE',
  compass = 'COMPASS',
  other = 'OTHER',
}

interface Props {
  products: Array<Products>;
  activeIndex: number;
  primaryProduct?: string; // To be populated if this component is used in anything other than: enum Products
}

const primaryProductIndex = 0;

const ProductContext = React.createContext<Props>({
  products: [],
  activeIndex: primaryProductIndex,
  primaryProduct: '',
});

interface ProductProviderProps {
  products: Array<Products>;
  activeIndex?: number;
  primaryProduct?: string;
}

export const ProductProvider: FunctionComponent<ProductProviderProps> = ({
  children,
  products,
  activeIndex = 0,
  primaryProduct = '',
}) => (
  <ProductContext.Provider
    value={{
      products,
      activeIndex: Math.min(products.length - 1, Math.max(0, activeIndex)),
      primaryProduct,
    }}
  >
    {children}
  </ProductContext.Provider>
);

export const useProducts = () => useContext(ProductContext).products;

// Returns primaryProduct if defined else the first product is considered the primary
export const usePrimaryProduct = () => {
  const { products, primaryProduct } = useContext(ProductContext);

  return primaryProduct || products[primaryProductIndex];
};

export const useActiveProduct = () => {
  const context = useContext(ProductContext);
  return context.products[context.activeIndex];
};
