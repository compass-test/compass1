import React from 'react';
import { shallow } from 'enzyme';
import { ProductSearchDialogBase } from '../product-search-dialog';
import { Products, ProductProvider } from '../../product-context';
import { SearchAnchor } from '@atlassian/search-dialog';
import { ABTestProvider } from '../../ab-test-provider';
import { ProductSearchInputSkeleton } from '../../product-search-input-skeleton';

jest.mock('@atlassian/search-dialog', () => {
  const React = require('react');
  return {
    SearchAnchor: () => 'div',
    SearchDialog: () => 'div',
    SearchInput: () => 'div',
    SearchFooter: () => 'div',
    KeyboardHighlightProvider: () => 'div',
    ThemeProvider: React.createContext({}).Provider,
    Link: () => 'a',
  };
});

describe('<ProductSearchDialog />', () => {
  const DummyChild = () => <div />;

  const onClose = jest.fn();
  const onInput = jest.fn();

  const commonProps = {
    onClose,
    onInput,
    isExpanded: true,
    sharedClient: {
      getAbTestData: async () => null,
      getProductPermissions: jest.fn((products) => Promise.resolve(products)),
    },
    selectedTabIndex: 0,
    products: [Products.confluence],
    doProductPermissionsCheck: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Skeleton when given no products', () => {
    const wrapper = shallow(
      <ProductSearchDialogBase {...commonProps} products={[]} isExpanded>
        {() => <DummyChild />}
      </ProductSearchDialogBase>,
    );
    expect(wrapper.find(ProductSearchInputSkeleton)).toHaveLength(1);
  });

  it('matches snapshot when expanded', () => {
    const wrapper = shallow(
      <ProductSearchDialogBase {...commonProps} isExpanded>
        {() => <DummyChild />}
      </ProductSearchDialogBase>,
    );

    expect(wrapper.find(ProductProvider).prop('products')).toEqual([
      Products.confluence,
    ]);
    expect(wrapper.find(ABTestProvider).prop('isMultiProduct')).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when collapsed', () => {
    const wrapper = shallow(
      <ProductSearchDialogBase {...commonProps} isExpanded={false}>
        {() => <DummyChild />}
      </ProductSearchDialogBase>,
    );
    expect(wrapper.find(ProductProvider).prop('products')).toEqual([
      Products.confluence,
    ]);
    expect(wrapper.find(ABTestProvider).prop('isMultiProduct')).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders ProductsProvider with multiple products', () => {
    const wrapper = shallow(
      <ProductSearchDialogBase
        {...commonProps}
        isExpanded
        products={[Products.confluence, Products.jira]}
      >
        {() => <DummyChild />}
      </ProductSearchDialogBase>,
    );

    expect(wrapper.find(ABTestProvider).prop('isMultiProduct')).toEqual(true);
    expect(wrapper.find(ProductProvider).prop('products')).toEqual([
      Products.confluence,
      Products.jira,
    ]);
  });

  describe('onClose', () => {
    const preventDefault = jest.fn();
    const escapeEvent: React.KeyboardEvent<any> = {
      key: 'Escape',
      preventDefault,
    } as any;

    it('is called when dialog is blurred', async () => {
      const wrapper = shallow(
        <ProductSearchDialogBase {...commonProps} isExpanded />,
      );

      expect(onClose).not.toBeCalled();

      wrapper.find(SearchAnchor).prop('onBlur')();

      // onBlur sets the state in a timeout so we also wait for a cycle
      await new Promise((resolve) => setTimeout(resolve));

      expect(onClose).toBeCalled();
    });

    it('is called when dialog escape is pressed', () => {
      const wrapper = shallow(
        <ProductSearchDialogBase {...commonProps} isExpanded />,
      );

      expect(onClose).not.toBeCalled();

      wrapper.find(SearchAnchor).prop('onKeyDown')(escapeEvent);

      expect(preventDefault).toBeCalled();
      expect(onClose).toBeCalled();
    });

    it('is not called when dialog escape is pressed but dialog is collapsed', () => {
      const wrapper = shallow(
        <ProductSearchDialogBase {...commonProps} isExpanded={false}>
          {() => <DummyChild />}
        </ProductSearchDialogBase>,
      );

      expect(onClose).not.toBeCalled();

      wrapper.find(SearchAnchor).prop('onKeyDown')({
        key: 'Escape',
      } as any);

      expect(preventDefault).not.toBeCalled();
      expect(onClose).not.toBeCalled();
    });

    it('should blur the ref when closing', () => {
      const refMock = { blur: jest.fn() } as any;

      const wrapper = shallow(
        <ProductSearchDialogBase {...commonProps} isExpanded />,
      );

      (wrapper.instance() as ProductSearchDialogBase).setRef(refMock);

      wrapper.find(SearchAnchor).prop('onKeyDown')(escapeEvent);

      expect(refMock.blur).toHaveBeenCalled();
    });
  });
});
