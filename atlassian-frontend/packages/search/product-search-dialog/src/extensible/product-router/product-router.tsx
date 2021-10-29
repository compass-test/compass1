import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import deepEqual from 'deep-equal';

import { useDialogExpansionContext } from '../dialog-expansion-context';
import {
  INITIAL_STATE,
  AddPayload,
  UpdatePayload,
  Product,
  reducer,
} from './product-router-state';

/**
 * ProductRouter context is used for controlling visibility and access of products for the user.
 *
 * @function showProduct - Triggered when the user clicks on the UI element (eg: Tab) to enable the product.
 */
export interface ProductContextProps {
  addProduct: (payload: AddPayload) => void;
  updateProduct: (payload: UpdatePayload) => void;
  getActiveProduct: () => Product | undefined;
  getProduct: (id: string) => Product | undefined;
  getPrimaryProduct: () => Product | undefined;
  products: Product[];
  removeProduct: (id: string) => void;
  showProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextProps>({
  getProduct: (id: string) => undefined,
  getActiveProduct: () => undefined,
  getPrimaryProduct: () => undefined,
  addProduct: () => undefined,
  updateProduct: () => undefined,
  removeProduct: () => undefined,
  showProduct: () => undefined,
  products: [],
});

interface ProductRouterProps {
  /**
   * Used for setting the router state in testing, consumers should register using
   * addProduct() instead.
   */
  __initialProducts?: Product[];
}

export const ProductRouter: FunctionComponent<ProductRouterProps> = ({
  __initialProducts = INITIAL_STATE,
  children,
}) => {
  const [products, dispatch] = useReducer(reducer, __initialProducts);
  const { isExpanded } = useDialogExpansionContext();

  useEffect(() => {
    if (!isExpanded) {
      dispatch({ type: 'HIDE_ALL' });
    }
  }, [isExpanded]);

  const addProduct = useCallback(
    (payload: AddPayload) => {
      return dispatch({
        type: 'ADD',
        payload,
      });
    },
    [dispatch],
  );

  const updateProduct = useCallback(
    (payload: UpdatePayload) => {
      return dispatch({
        type: 'UPDATE',
        payload,
      });
    },
    [dispatch],
  );

  const removeProduct = useCallback(
    (id: string) => {
      return dispatch({
        type: 'REMOVE',
        payload: { id },
      });
    },
    [dispatch],
  );

  /**
   * @function showProduct will ensure that only one product is displayed at a time
   * @param {string} id - The product id which has to be made visible.
   */
  const showProduct = useCallback(
    (id: string) =>
      dispatch({
        type: 'SHOW',
        payload: { id },
      }),
    [dispatch],
  );

  const getActiveProduct = useCallback(() => {
    return products.find((product: Product) => product.isDisplayed);
  }, [products]);

  const productsRef = useRef<{ [id: string]: Product | undefined }>({});

  const getProduct = useCallback(
    (id: string) => {
      const product = products.find((product: Product) => product.id === id);
      const productRef = productsRef.current[id];

      if (!deepEqual(product, productRef)) {
        productsRef.current[id] = product;
      }

      return productsRef.current[id];
    },
    [products],
  );

  const getPrimaryProduct = useCallback(() => {
    return products.length > 0 ? products[0] : undefined;
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        getProduct,
        getActiveProduct,
        getPrimaryProduct,
        addProduct,
        updateProduct,
        removeProduct,
        showProduct,
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export const withProductContext = <Props,>(
  WrappedComponent: React.ComponentType<Props & ProductContextProps>,
): React.ComponentType<Props> => {
  return (props: Props) => (
    <WrappedComponent {...props} {...useProductContext()} />
  );
};
