import { ProductContextProps } from '../product-router';

export const PRODUCTS = [
  {
    id: 'product1',
    title: 'product1',
    isDisplayed: true,
    sectionIds: ['product1.issue'],
    order: 1,
  },
  {
    id: 'product2',
    title: 'product2',
    isDisplayed: false,
    sectionIds: ['product2.issue'],
    order: 2,
  },
  {
    id: 'product3',
    title: 'product3',
    isDisplayed: false,
    sectionIds: ['product3.issue'],
    order: 3,
  },
];

export const PRODUCT_CONTEXT_PROPS: ProductContextProps = {
  getActiveProduct: jest.fn(),
  getPrimaryProduct: jest.fn(),
  getProduct: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
  products: [],
  removeProduct: jest.fn(),
  showProduct: jest.fn(),
};
