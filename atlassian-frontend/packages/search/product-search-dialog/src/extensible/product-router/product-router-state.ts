import cloneDeep from 'lodash/cloneDeep';

/**
 * The product details which need to be passed in to show it inside the dialog.
 */
export type Product = {
  /**
   * A unique identifier for this product
   */
  id: string;

  /**
   * A flag to decide the visibility of the product
   */
  isDisplayed: boolean;

  /**
   * A list of sections that the user can see for this product
   */
  sectionIds: string[];

  /**
   * The human readable title of this product
   */
  title: string;

  /**
   * A numeric rank to determine the order in which the tabs are displayed.
   * Tabs are displayed left to right in ascending order.
   */
  order: number;

  /**
   * A function to generate a URL for linking to an advanced search experience.
   *
   * Used by the search input to transition the user on pressing enter.
   *
   * Products may not specify this, in which case pressing enter will no-op.
   */
  generateAdvancedSearchUrl?: AdvancedSearchUrlGenerator;

  /**
   * The placeholder to show when the dialog is in expanded state and this product is active.
   */
  expandedStateInputPlaceholder?: string;
};

export type AdvancedSearchUrlGenerator = (query: string) => string;

type State = Product[];

export type AddPayload = Omit<Product, 'isDisplayed'>;

export type UpdatePayload = Pick<Product, 'id' | 'generateAdvancedSearchUrl'>;

type IdPayload = {
  id: string;
};

interface AddAction {
  payload: AddPayload;
  type: 'ADD';
}

interface UpdateAction {
  payload: UpdatePayload;
  type: 'UPDATE';
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

export type ProductAction =
  | AddAction
  | UpdateAction
  | ShowAction
  | RemoveAction
  | HideAllAction;

export const INITIAL_STATE: State = [];

export const reducer = (state: State, action: ProductAction): State => {
  switch (action.type) {
    case 'ADD': {
      const { payload: newProduct }: { payload: AddPayload } = action;
      return addProduct(state, newProduct);
    }
    case 'UPDATE': {
      const { payload: updatePayload }: { payload: UpdatePayload } = action;
      return updateProduct(state, updatePayload);
    }
    case 'SHOW': {
      const productIdToShow = action.payload.id;
      return showProduct(state, productIdToShow);
    }
    case 'REMOVE': {
      const productIdToRemove = action.payload.id;
      return removeProduct(state, productIdToRemove);
    }
    case 'HIDE_ALL': {
      return hideAllProducts(state);
    }
    default: {
      return state;
    }
  }
};

export function addProduct(products: Product[], addPayload: AddPayload) {
  // Check that new product id does not exist already
  if (products.filter((product) => product.id === addPayload.id).length) {
    return products;
  }

  // Show error in console when duplicate order is added
  const duplicateOrder = products.find(
    ({ order }) => order === addPayload.order,
  );
  if (duplicateOrder) {
    // eslint-disable-next-line no-console
    console.error(
      `product-search-dialog: Duplicate order of ${addPayload.order} has been set for the products of ${duplicateOrder.id} and ${addPayload.id}`,
    );
  }

  // Add product to state and maintain sorted array using order
  const newProduct = { ...addPayload, isDisplayed: false };
  const unsorted = [...products, newProduct];
  const sorted = unsorted.sort((a, b) => a.order - b.order);

  return sorted;
}

export function updateProduct(
  products: Product[],
  updatePayload: UpdatePayload,
) {
  const clonedProducts = cloneDeep(products);

  const productToUpdate = clonedProducts.find((p) => p.id === updatePayload.id);
  if (!productToUpdate) {
    throw new Error(`Cannot update ${updatePayload.id} before being added`);
  }

  const validUpdateKeys = ['generateAdvancedSearchUrl'];
  const validUpdatePayload = Object.fromEntries(
    Object.entries(updatePayload).filter(([key]) =>
      validUpdateKeys.includes(key),
    ),
  );

  Object.assign(productToUpdate, validUpdatePayload);

  return clonedProducts;
}

export function showProduct(products: Product[], productIdToShow: string) {
  return products.map((product) => ({
    ...product,
    isDisplayed: product.id === productIdToShow,
  }));
}

export function removeProduct(products: Product[], productIdToRemove: string) {
  return products.filter((product) => product.id !== productIdToRemove);
}

export function hideAllProducts(products: Product[]) {
  return products.map((product) => ({
    ...product,
    isDisplayed: false,
  }));
}
