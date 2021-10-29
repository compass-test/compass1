import React from 'react';
import { mount } from 'enzyme';
import { AsyncProductInner as AsyncProduct } from '../async-product';

let mockGetProduct = jest.fn();
let mockGetActiveProduct = jest.fn();
let mockAddProduct = jest.fn();
let mockRemoveProduct = jest.fn();

const contextProps = () => ({
  getProduct: mockGetProduct,
  getActiveProduct: mockGetActiveProduct,
  addProduct: mockAddProduct,
  removeProduct: mockRemoveProduct,
  showProduct: () => {},
  products: [],
  setIsExpanded: jest.fn(),
  isExpanded: true,
  sections: [{ id: 'some.issue', title: 'Some Issue' }],
});

describe('<AsyncProduct />', () => {
  beforeEach(() => {
    mockGetProduct = jest.fn(() => ({ id: 'product', isDisplayed: true }));
    mockAddProduct = jest.fn();
    mockGetActiveProduct = jest.fn();
    mockRemoveProduct = jest.fn();
  });

  it('Renders children', () => {
    const wrapper = mount(
      <AsyncProduct id="product" title="product" {...contextProps()}>
        <div id="inner-div" />
      </AsyncProduct>,
    );

    expect(wrapper.find('#inner-div').exists()).toBeTruthy();
  });

  it('Does not render non active children', () => {
    mockGetProduct = jest.fn(() => ({ id: 'product', isDisplayed: false }));
    const wrapper = mount(
      <AsyncProduct id="product" title="product" {...contextProps()}>
        <div id="inner-div" />
      </AsyncProduct>,
    );

    expect(wrapper.find('#inner-div').exists()).toBeFalsy();
  });

  it('Calls to add a product on mount', () => {
    mount(
      <AsyncProduct id="product" title="product" {...contextProps()}>
        <div id="inner-div" />
      </AsyncProduct>,
    );

    expect(mockAddProduct).toHaveBeenCalledWith({
      id: 'product',
      title: 'product',
      sectionIds: ['some.issue'],
    });
  });

  it('Calls to remove a product on un-mount', () => {
    const wrapper = mount(
      <AsyncProduct id="product" title="product" {...contextProps()}>
        <div id="inner-div" />
      </AsyncProduct>,
    );

    expect(mockRemoveProduct).not.toHaveBeenCalled();

    wrapper.unmount();

    expect(mockRemoveProduct).toHaveBeenCalledWith('product');
  });
});
