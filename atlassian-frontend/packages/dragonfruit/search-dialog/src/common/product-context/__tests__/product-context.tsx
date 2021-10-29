import React from 'react';
import { mount } from 'enzyme';
import {
  Products,
  useProducts,
  usePrimaryProduct,
  useActiveProduct,
  ProductProvider,
} from '../product-context';

const ProductContextDummy = () => (
  <div>
    <span>Products: {useProducts()}</span>
    <span>Primary Product: {usePrimaryProduct()}</span>
    <span>Active Product: {useActiveProduct()}</span>
  </div>
);

describe('<ProductProvider />', () => {
  it('render matches snapshot with single product', () => {
    const wrapper = mount(
      <ProductProvider products={[Products.confluence]}>
        <ProductContextDummy />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render matches snapshot with multiple products', () => {
    const wrapper = mount(
      <ProductProvider products={[Products.confluence]}>
        <ProductContextDummy />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render matches snapshot with multiple products and primary product', () => {
    const wrapper = mount(
      <ProductProvider products={[Products.confluence]} primaryProduct="uchi">
        <ProductContextDummy />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render matches snapshot with multiple products and an activeIndex', () => {
    const wrapper = mount(
      <ProductProvider products={[Products.confluence]} activeIndex={1}>
        <ProductContextDummy />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render matches snapshot with negative index', () => {
    const wrapper = mount(
      <ProductProvider products={[Products.confluence]} activeIndex={-1}>
        <ProductContextDummy />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render matches snapshot with out of bounds index', () => {
    const wrapper = mount(
      <ProductProvider products={[Products.confluence]} activeIndex={2}>
        <ProductContextDummy />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
