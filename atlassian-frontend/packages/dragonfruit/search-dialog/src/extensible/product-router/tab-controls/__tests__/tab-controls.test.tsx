import { mount, shallow } from 'enzyme';
import React from 'react';

import { ProductTabsInner as ProductTabs } from '../tab-controls';

const mockShowProduct = jest.fn();

const PRODUCTS = [
  {
    id: 'product1',
    title: 'product1',
    isDisplayed: true,
    sectionIds: ['product1.issue'],
  },
  {
    id: 'product2',
    title: 'product2',
    isDisplayed: false,
    sectionIds: ['product2.issue'],
  },
];

const contextProps = {
  showProduct: mockShowProduct,
  products: PRODUCTS,
  getProduct: (_: string) => undefined,
  getActiveProduct: () => PRODUCTS[0],
  addProduct: () => {},
  removeProduct: () => {},
  isExpanded: true,
  setIsExpanded: jest.fn(),
  scopes: [],
};

describe('<TabControls />', () => {
  it('Renders controls for all the registered products', () => {
    const wrapper = mount(<ProductTabs {...contextProps} />);

    wrapper.find('[role="tab"]').last().simulate('click');

    expect(mockShowProduct).toHaveBeenCalledWith('product2');
  });

  it(`Doesn't render if only one product is registered`, () => {
    const wrapper = shallow(
      <ProductTabs {...contextProps} products={PRODUCTS.slice(0, 1)} />,
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
