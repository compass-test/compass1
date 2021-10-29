import { render, configure, fireEvent } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { SearchSessionProvider } from '../../../../common/search-session-provider';
import { Product, ProductRouter } from '../../../product-router';
import { GenericProductSearchInput } from '../generic-product-search-input';

// Unmocked to avoid an error where the input tries to cancel the debounce when the test completes
jest.unmock('lodash/debounce');

export const TEST_PRODUCT = {
  id: 'test',
  isDisplayed: true,
  sectionIds: [],
  title: '',
  order: 0,
};

describe('GenericProductSearchInput', () => {
  configure({ testIdAttribute: 'data-test-id' });

  const mockOnNavigateGeneric = jest.fn();

  const commonProps = {
    activeProductId: 'test',
    onNavigateGeneric: mockOnNavigateGeneric,
    query: 'test-query',
    isExpanded: true,
    isLoading: false,
    onOpen: jest.fn(),
    forwardRef: jest.fn(),
    onBack: jest.fn(),
    setQuery: jest.fn(),
    setIsExpanded: jest.fn(),
  };

  const getTestWrapper = (products: Product[]) => (props: any) => (
    <IntlProvider locale="en">
      <SearchSessionProvider sessionKey="">
        <ProductRouter __initialProducts={products} {...props} />
      </SearchSessionProvider>
    </IntlProvider>
  );

  beforeEach(() => {
    mockOnNavigateGeneric.mockReset();
  });

  it('Generates the advanced search URL', () => {
    const { getByTestId } = render(
      <GenericProductSearchInput {...commonProps} />,
      {
        wrapper: getTestWrapper([
          {
            ...TEST_PRODUCT,
            generateAdvancedSearchUrl: (query) => query,
          },
        ]),
      },
    );

    fireEvent.keyDown(getByTestId('search-dialog-input'), {
      key: 'Enter',
      code: 'Enter',
    });

    expect(mockOnNavigateGeneric).toHaveBeenCalledWith(
      'test',
      'test-query',
      expect.anything(),
    );
  });

  it('Does not call onNavigate if there is no active product id', () => {
    const { getByTestId } = render(
      <GenericProductSearchInput {...commonProps} />,
      {
        wrapper: getTestWrapper([]),
      },
    );

    fireEvent.keyDown(getByTestId('search-dialog-input'), {
      key: 'Enter',
      code: 'Enter',
    });

    expect(mockOnNavigateGeneric).not.toHaveBeenCalled();
  });

  it('Does not call onNavigate if the product has not specified a URL generator', () => {
    const { getByTestId } = render(
      <GenericProductSearchInput {...commonProps} />,
      {
        wrapper: getTestWrapper([TEST_PRODUCT]),
      },
    );

    fireEvent.keyDown(getByTestId('search-dialog-input'), {
      key: 'Enter',
      code: 'Enter',
    });

    expect(mockOnNavigateGeneric).not.toHaveBeenCalled();
  });

  it('prefers expandedStateInputPlaceholder in the product settings over default placeholder', () => {
    const { getByTestId } = render(
      <GenericProductSearchInput {...commonProps} />,
      {
        wrapper: getTestWrapper([
          {
            ...TEST_PRODUCT,
            expandedStateInputPlaceholder: 'Hey Jude!',
            generateAdvancedSearchUrl: (query) => query,
          },
        ]),
      },
    );

    const element = getByTestId('search-dialog-input');

    expect(element.getAttribute('placeholder')).toEqual('Hey Jude!');
  });

  it('resolves to default placeholder', () => {
    const { getByTestId } = render(
      <GenericProductSearchInput {...commonProps} />,
      {
        wrapper: getTestWrapper([
          {
            ...TEST_PRODUCT,
            generateAdvancedSearchUrl: (query) => query,
          },
        ]),
      },
    );

    const element = getByTestId('search-dialog-input');

    expect(element.getAttribute('placeholder')).toEqual('Search');
  });
});
