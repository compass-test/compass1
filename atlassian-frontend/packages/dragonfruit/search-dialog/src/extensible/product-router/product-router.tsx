import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { useDialogExpansionContext } from '../dialog-expansion-context';

export type Product = {
  id: string;
  isDisplayed: boolean;
  sectionIds: string[];
  title: string;
};

type State = Product[];

type AddPayload = Omit<Product, 'isDisplayed'>;

type IdPayload = {
  id: string;
};

interface AddAction {
  payload: Product;
  type: 'ADD';
}

interface ShowAction {
  payload: IdPayload;
  type: 'SHOW';
}

interface RemoveAction {
  payload: IdPayload;
  type: 'REMOVE';
}

interface HideAllAction {
  type: 'HIDE_ALL';
}

type ProductAction = AddAction | ShowAction | RemoveAction | HideAllAction;

export const reducer = (state: State, action: ProductAction): State => {
  switch (action.type) {
    case 'ADD': {
      const { payload }: { payload: Product } = action;
      return [...state, { ...payload, isDisplayed: state.length === 0 }];
    }
    case 'SHOW': {
      return state.map((product) => ({
        ...product,
        isDisplayed: product.id === action.payload.id,
      }));
    }
    case 'REMOVE': {
      return state.filter((product) => product.id !== action.payload.id);
    }
    case 'HIDE_ALL': {
      return state.map((product) => ({
        ...product,
        isDisplayed: false,
      }));
    }
    default: {
      return state;
    }
  }
};

export interface ProductContextProps {
  addProduct: (payload: AddPayload) => void;
  getActiveProduct: () => Product | undefined;
  getProduct: (id: string) => Product | undefined;
  products: Product[];
  removeProduct: (id: string) => void;
  /*
    showProduct will ensure that only one product is displayed at a time
  */
  showProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextProps>({
  getProduct: (id: string) => undefined,
  getActiveProduct: () => undefined,
  addProduct: () => undefined,
  removeProduct: () => undefined,
  showProduct: () => undefined,
  products: [],
});

const INITIAL_STATE: State = [];

export const ProductRouter: FunctionComponent = ({ children }) => {
  const [products, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { isExpanded } = useDialogExpansionContext();

  useEffect(() => {
    if (!isExpanded) {
      dispatch({ type: 'HIDE_ALL' });
    }
  }, [isExpanded]);

  const addProduct = useCallback(
    (payload: AddPayload) => {
      if (products.filter((p) => p.id === payload.id).length) {
        return;
      }

      return dispatch({
        type: 'ADD',
        payload: { ...payload, isDisplayed: products.length === 0 },
      });
    },
    [dispatch, products],
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

  const getActiveProduct = useCallback(() => {
    return products.find((product: Product) => product.isDisplayed);
  }, [products]);

  const getProduct = useCallback(
    (id: string) => products.find((product: Product) => product.id === id),
    [products],
  );

  const showProduct = useCallback(
    (id: string) =>
      dispatch({
        type: 'SHOW',
        payload: { id },
      }),
    [dispatch],
  );

  return (
    <ProductContext.Provider
      value={{
        getProduct,
        getActiveProduct,
        addProduct,
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
