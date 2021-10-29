import {
  Product,
  addProduct,
  updateProduct,
  showProduct,
  removeProduct,
  hideAllProducts,
  UpdatePayload,
} from '../product-router-state';

let state: Product[] = [];
let sortedProducts: Product[] = [];

beforeEach(() => {
  state = [];

  sortedProducts = [-1, 0, 1].map((i) => ({
    id: `product-${i}`,
    sectionIds: [],
    title: `Product ${i}`,
    order: i,
    isDisplayed: false,
    generateAdvancedSearchUrl: () => `/link/${i}`,
    expandedStateInputPlaceholder: 'Search',
  }));
});

describe('addProduct', () => {
  it('Sets isDisplayed to false when products are added', () => {
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);

    expect(state[0].isDisplayed).toEqual(false);
    expect(state[1].isDisplayed).toEqual(false);
  });

  it('Stores a sorted array of Products (add products in order)', () => {
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);
    state = addProduct(state, sortedProducts[2]);

    expect(state).toEqual(sortedProducts);
  });

  it('Stores a sorted array of Products (add products out of order)', () => {
    state = addProduct(state, sortedProducts[2]);
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);

    expect(state).toEqual(sortedProducts);
  });

  it('Uses the order in which products are added for duplicate orders', () => {
    // Mocking to suppress the console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Modify sorted products to have a duplicate order
    sortedProducts[2].order = -1;

    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);
    state = addProduct(state, sortedProducts[2]);

    // Modify sortedProducts to expected value
    sortedProducts[2].order = -1;
    sortedProducts = [sortedProducts[0], sortedProducts[2], sortedProducts[1]];

    expect(state).toEqual(sortedProducts);

    consoleErrorSpy.mockRestore();
  });

  it('Does not allow duplicate product ids to be added', () => {
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[0]);

    expect(state).toHaveLength(1);
  });

  it('Logs an error when a duplicate index is given', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Modify add payload to have a duplicate order
    sortedProducts[2].order = -1;

    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);
    state = addProduct(state, sortedProducts[2]);

    // eslint-disable-next-line no-console
    expect(console.error).toBeCalledWith(
      'product-search-dialog: Duplicate order of -1 has been set for the products of product--1 and product-1',
    );

    consoleErrorSpy.mockRestore();
  });
});

describe('updateProduct', () => {
  beforeEach(() => {
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);
    state = addProduct(state, sortedProducts[2]);
  });

  it('Updates the properties we allow to be updated', () => {
    const newGenerateAdvancedSearchUrl = () => '/newlink/0';
    state = updateProduct(state, {
      id: 'product-0',
      generateAdvancedSearchUrl: newGenerateAdvancedSearchUrl,
    });

    sortedProducts[1].generateAdvancedSearchUrl = newGenerateAdvancedSearchUrl;
    expect(state).toEqual(sortedProducts);
  });

  it('Allows updates to falsy values', () => {
    state = updateProduct(state, {
      id: 'product-0',
      generateAdvancedSearchUrl: undefined,
    });

    sortedProducts[1].generateAdvancedSearchUrl = undefined;
    expect(state).toEqual(sortedProducts);
  });

  it('Throws an error if the given product does not exist', () => {
    const newGenerateAdvancedSearchUrl = () => '/boop';
    expect(() =>
      updateProduct(state, {
        id: 'non-existent-product',
        generateAdvancedSearchUrl: newGenerateAdvancedSearchUrl,
      }),
    ).toThrow('Cannot update non-existent-product before being added');
  });

  it('Does not update the properties which we do not allow to be updated', () => {
    // Using a cast to allow us to pass in an invalid update payload
    const invalidUpdatePayload = {
      id: 'product-0',
      sectionIds: ['some', 'invalid', 'sectionIds'],
      title: `Boop`,
      order: 99,
      isDisplayed: true,
    } as UpdatePayload;

    state = updateProduct(state, invalidUpdatePayload);

    expect(state).toEqual(sortedProducts);
  });

  it('Does not update properties which are not included in the payload', () => {
    state = updateProduct(state, {
      id: 'product-0',
    });

    expect(state).toEqual(sortedProducts);
  });
});

describe('showProduct', () => {
  beforeEach(() => {
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);
    state = addProduct(state, sortedProducts[2]);
  });

  it('Sets isDisplayed to true for the correct product', () => {
    state = showProduct(state, 'product-0');

    sortedProducts[1].isDisplayed = true;
    expect(state).toEqual(sortedProducts);
  });
});

describe('removeProduct', () => {
  beforeEach(() => {
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);
    state = addProduct(state, sortedProducts[2]);
  });

  it('Removes the correct product', () => {
    state = removeProduct(state, 'product-0');

    const expected = [sortedProducts[0], sortedProducts[2]];
    expect(state).toEqual(expected);
  });

  it('Does nothing if the given product does not exist', () => {
    state = removeProduct(state, 'non-existent-product');

    expect(state).toEqual(sortedProducts);
  });
});

describe('hideAllProducts', () => {
  beforeEach(() => {
    state = addProduct(state, sortedProducts[0]);
    state = addProduct(state, sortedProducts[1]);
    state = addProduct(state, sortedProducts[2]);
  });

  it('Sets isDisplayed to false for all products', () => {
    state = showProduct(state, 'product--1');
    state = showProduct(state, 'product-0');
    state = showProduct(state, 'product-2');

    state = hideAllProducts(state);

    expect(state).toEqual(sortedProducts);
  });
});
