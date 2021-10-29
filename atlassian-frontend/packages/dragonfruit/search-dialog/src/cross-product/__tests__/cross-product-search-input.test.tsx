import React from 'react';
import { CrossProductSearchInput, Prop } from '../cross-product-search-input';
import { ProductProvider, Products } from '../../common/product-context';
import { shallow, mount } from 'enzyme';
import { ConfluenceSearchInput } from '../../confluence/confluence-search-input';

jest.mock('../../confluence/confluence-search-input', () => ({
  ConfluenceSearchInput: () => <div />,
}));

describe('<CrossProductSearchInput />', () => {
  const baseProps: Prop = {
    isExpanded: true,
    onInput: jest.fn(),
    onNavigate: jest.fn(),
    onOpen: jest.fn(),
    onBack: jest.fn(),
    isLoading: true,
    debounceTime: 0,
    forwardRef: null,
    value: '',
  };

  it(`matches snapshot with as primary product`, () => {
    const wrapper = shallow(
      <ProductProvider products={[Products.compass]} activeIndex={0}>
        <CrossProductSearchInput {...baseProps} />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it(`matches snapshot with secondary products`, () => {
    const wrapper = shallow(
      <ProductProvider products={[Products.compass]} activeIndex={1}>
        <CrossProductSearchInput {...baseProps} />
      </ProductProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it(`should trigger onNavigate for primary product`, () => {
    let onNavigateMock = jest.fn();

    const wrapper = mount(
      <ProductProvider products={[Products.compass]} activeIndex={0}>
        <CrossProductSearchInput
          {...baseProps}
          value="test"
          onNavigate={onNavigateMock}
        />
      </ProductProvider>,
    );

    wrapper
      .find(ConfluenceSearchInput)
      .props()
      .onNavigate('href', new KeyboardEvent('keydown', { code: 'Enter' }));

    expect(onNavigateMock).toBeCalledTimes(1);
  });

  it(`Switching between products maintain the input`, () => {
    const wrapper = mount(
      <ProductProvider products={[Products.compass]} activeIndex={0}>
        <CrossProductSearchInput {...baseProps} value="abc" />
      </ProductProvider>,
    );

    // Sanity check
    expect(wrapper.find(ConfluenceSearchInput).prop('value')).toBe('abc');

    // Execute
    wrapper.setProps({ activeIndex: 1 });
    wrapper.update();
  });
});
