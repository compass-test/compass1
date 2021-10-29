import { mount } from 'enzyme';
import React from 'react';
import { ProductContextProps } from '../../product-router';

import { PRODUCT_CONTEXT_PROPS } from '../../__mocks__/products';
import { RegisterProduct, RegisterProductProps } from '../register-product';

describe('RegisterProduct', () => {
  let mockAddProduct: any;
  let mockUpdateProduct: any;
  let mockGenerateAdvancedSearchUrl: any;

  beforeEach(() => {
    jest.resetAllMocks();

    mockAddProduct = jest.fn();
    mockUpdateProduct = jest.fn();
    mockGenerateAdvancedSearchUrl = jest.fn(() => '/advanced/search');
  });

  const getProps = (
    override: Partial<RegisterProductProps & ProductContextProps> = {},
  ) => ({
    ...PRODUCT_CONTEXT_PROPS,
    id: 'product',
    title: 'product',
    order: 1,
    sections: [],
    allowedSections: [],
    addProduct: mockAddProduct,
    updateProduct: mockUpdateProduct,
    generateAdvancedSearchUrl: mockGenerateAdvancedSearchUrl,
    expandedStateInputPlaceholder: 'Search Product',
    ...override,
  });

  it('Calls to add a product on mount with only the allowed sections', () => {
    mount(
      <RegisterProduct
        {...getProps({
          allowedSections: ['product.anyrandomthing'],
          sections: [{ id: 'product.issue', title: 'issue' }],
        })}
      >
        <div id="inner-div" />
      </RegisterProduct>,
    );

    expect(mockAddProduct).not.toHaveBeenCalled();
  });

  it('Calls to add a product on mount with only the allowed sections which are comma separated', () => {
    mount(
      <RegisterProduct
        {...getProps({
          allowedSections: ['product.issue,blog'],
          sections: [{ id: 'product.issue,blog', title: 'issue' }],
        })}
      >
        <div id="inner-div" />
      </RegisterProduct>,
    );

    expect(mockAddProduct).toHaveBeenCalledWith({
      id: 'product',
      title: 'product',
      sectionIds: ['product.issue,blog'],
      order: 1,
      generateAdvancedSearchUrl: mockGenerateAdvancedSearchUrl,
      expandedStateInputPlaceholder: 'Search Product',
    });
  });

  it('Only allows allowed secitions even if comma separated', () => {
    mount(
      <RegisterProduct
        {...getProps({
          allowedSections: ['product.issue,blog'],
          sections: [{ id: 'product.issue,blog,people', title: 'issue' }],
        })}
      >
        <div id="inner-div" />
      </RegisterProduct>,
    );

    expect(mockAddProduct).not.toHaveBeenCalled();
  });

  it('Calls to add a product on mount with only the allowed sections after validating with the intial registered sections', () => {
    mount(
      <RegisterProduct
        {...getProps({
          allowedSections: ['product.anyrandomthing', 'product.issue'],
          sections: [{ id: 'product.issue', title: 'issue' }],
        })}
      >
        <div id="inner-div" />
      </RegisterProduct>,
    );

    expect(mockAddProduct).toHaveBeenCalledWith({
      id: 'product',
      title: 'product',
      sectionIds: ['product.issue'],
      order: 1,
      generateAdvancedSearchUrl: mockGenerateAdvancedSearchUrl,
      expandedStateInputPlaceholder: 'Search Product',
    });
  });

  it('Calls to update product on mount when at least one allowed sections is registered', () => {
    mount(
      <RegisterProduct
        {...getProps({
          allowedSections: ['product.anyrandomthing', 'product.issue'],
          sections: [{ id: 'product.issue', title: 'issue' }],
        })}
      >
        <div id="inner-div" />
      </RegisterProduct>,
    );

    expect(mockAddProduct).toHaveBeenCalledWith({
      id: 'product',
      title: 'product',
      sectionIds: ['product.issue'],
      order: 1,
      generateAdvancedSearchUrl: mockGenerateAdvancedSearchUrl,
      expandedStateInputPlaceholder: 'Search Product',
    });

    expect(mockUpdateProduct).toHaveBeenCalledWith({
      id: 'product',
      generateAdvancedSearchUrl: mockGenerateAdvancedSearchUrl,
    });
  });

  it('Calls updateProduct when the generateAdvancedSearchUrl prop changes', () => {
    const wrapper = mount(
      <RegisterProduct
        {...getProps({
          allowedSections: ['product.anyrandomthing', 'product.issue'],
          sections: [{ id: 'product.issue', title: 'issue' }],
        })}
      >
        <div id="inner-div" />
      </RegisterProduct>,
    );

    // Clear the update call that happens on mount
    mockUpdateProduct.mockClear();

    const newMockGenerateAdvancedSearchUrl = jest.fn(
      () => '/advanced/search/new',
    );

    wrapper.setProps({
      generateAdvancedSearchUrl: newMockGenerateAdvancedSearchUrl,
    });

    expect(mockUpdateProduct).toHaveBeenCalledTimes(1);
    expect(mockUpdateProduct).toHaveBeenCalledWith({
      id: 'product',
      generateAdvancedSearchUrl: newMockGenerateAdvancedSearchUrl,
    });
  });

  it('Logs an error when id is changed and does not call updateProduct', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const wrapper = mount(
      <RegisterProduct
        {...getProps({
          allowedSections: ['product.anyrandomthing', 'product.issue'],
          sections: [{ id: 'product.issue', title: 'issue' }],
        })}
      >
        <div id="inner-div" />
      </RegisterProduct>,
    );

    const newMockGenerateAdvancedSearchUrl = jest.fn(
      () => '/advanced/search/new',
    );

    // Clear the update call that happens on mount
    mockUpdateProduct.mockClear();

    wrapper.setProps({
      id: 'new-product',
      generateAdvancedSearchUrl: newMockGenerateAdvancedSearchUrl,
    });

    expect(mockUpdateProduct).not.toHaveBeenCalled();

    // eslint-disable-next-line no-console
    expect(console.error).toBeCalledWith(
      "product-search-dialog: Cannot update a different product's properties. Did you change accidentally change a product's id?",
    );

    consoleErrorSpy.mockRestore();
  });
});
