import { mount, shallow } from 'enzyme';
import React from 'react';

import { ProductTabsInner as ProductTabs } from '../tab-controls';
import { PRODUCTS } from '../../__mocks__/products';
import { DEFAULT_AB_TEST } from '../../../ab-test-context/ab-test-context';

jest.mock('../../../../common/analytics', () =>
  Object.assign({}, jest.requireActual('../../../../common/analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent: jest.fn(),
    }),
  }),
);

const mockShowProduct = jest.fn();

const contextProps = {
  showProduct: mockShowProduct,
  products: PRODUCTS,
  getProduct: (_: string) => undefined,
  getActiveProduct: () => PRODUCTS[0],
  getPrimaryProduct: () => PRODUCTS[0],
  addProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
  isExpanded: true,
  setIsExpanded: jest.fn(),
  scopes: [],
  abTest: DEFAULT_AB_TEST,
};

describe('<TabControls />', () => {
  it('Renders controls for all the registered products', () => {
    const wrapper = mount(<ProductTabs {...contextProps} />);

    wrapper.find('[role="tab"]').last().simulate('click');

    expect(mockShowProduct).toHaveBeenCalledWith('product3');
  });

  it('Renders tabs in the order of the products', () => {
    const wrapper = mount(<ProductTabs {...contextProps} />);

    const tabList = wrapper.find('[role="tablist"]').at(1);

    expect(tabList.childAt(0).prop('title')).toEqual('product1');
    expect(tabList.childAt(1).prop('title')).toEqual('product2');
    expect(tabList.childAt(2).prop('title')).toEqual('product3');
  });

  it(`Doesn't render if only one product is registered`, () => {
    const wrapper = shallow(
      <ProductTabs {...contextProps} products={PRODUCTS.slice(0, 1)} />,
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
