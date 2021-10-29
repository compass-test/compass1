import React from 'react';
import { mount } from 'enzyme';
import { ActiveProduct } from '../active-product';

let mockGetProduct = jest.fn();

jest.mock('../../product-router', () => ({
  useProductContext: () => ({
    getProduct: mockGetProduct,
  }),
}));

const productProps = () => ({
  id: 'product',
  title: 'product',
  sections: [{ id: 'some.issue', title: 'Some Issue' }],
});

describe('<AsyncProduct />', () => {
  beforeEach(() => {
    mockGetProduct = jest.fn(() => ({ id: 'product', isDisplayed: true }));
  });

  it('Renders children', () => {
    const wrapper = mount(
      <ActiveProduct {...productProps()}>
        <div id="inner-div" />
      </ActiveProduct>,
    );

    expect(wrapper.find('#inner-div').exists()).toBeTruthy();
  });

  it('Does not render non active children', () => {
    mockGetProduct = jest.fn(() => ({ id: 'product', isDisplayed: false }));
    const wrapper = mount(
      <ActiveProduct {...productProps()}>
        <div id="inner-div" />
      </ActiveProduct>,
    );

    expect(wrapper.find('#inner-div').exists()).toBeFalsy();
  });
});
