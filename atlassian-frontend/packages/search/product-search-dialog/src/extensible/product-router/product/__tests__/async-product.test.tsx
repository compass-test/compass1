import React from 'react';
import { mount } from 'enzyme';
import { AsyncProductInner as AsyncProduct } from '../async-product';

let mockedReturn: string[] = ['product.issue'];

let mockBatchedGetExtensibleProductPermission = jest.fn(() =>
  Promise.resolve(mockedReturn),
);

let mockGetProduct = jest.fn();
let mockGetActiveProduct = jest.fn();
let mockGetPrimaryProduct = jest.fn();
let mockAddProduct = jest.fn();
let mockUpdateProduct = jest.fn();
let mockRemoveProduct = jest.fn();
let mockSearchClient: any = {
  batchedGetExtensibleProductPermission: mockBatchedGetExtensibleProductPermission,
};

const contextProps = () => ({
  getProduct: mockGetProduct,
  getActiveProduct: mockGetActiveProduct,
  getPrimaryProduct: mockGetPrimaryProduct,
  addProduct: mockAddProduct,
  updateProduct: mockUpdateProduct,
  removeProduct: mockRemoveProduct,
  showProduct: () => {},
  products: [],
  searchClient: mockSearchClient,
});

const productProps = (
  customSections = [{ id: 'product.issue', title: 'Some Issue' }],
) => ({
  id: 'product',
  title: 'product',
  sections: customSections,
  order: 1,
});

describe('<AsyncProduct />', () => {
  beforeEach(() => {
    mockGetProduct = jest.fn(() => ({ id: 'product', isDisplayed: true }));
    mockedReturn = ['product.issue'];
    mockAddProduct = jest.fn();
    mockGetActiveProduct = jest.fn();
    mockRemoveProduct = jest.fn();
  });

  it('Calls to remove a product on un-mount', () => {
    const wrapper = mount(
      <AsyncProduct {...productProps()} {...contextProps()}>
        <div id="inner-div" />
      </AsyncProduct>,
    );

    expect(mockRemoveProduct).not.toHaveBeenCalled();

    wrapper.unmount();

    expect(mockRemoveProduct).toHaveBeenCalledWith('product');
  });
});
