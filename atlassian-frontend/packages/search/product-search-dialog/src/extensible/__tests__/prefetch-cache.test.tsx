import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { ExtensibleDialogTestWrapper } from './__fixtures__/extensible-dialog-test-wrapper';
import { MetaContextProvider } from '../meta-context-provider';
import { SearchDialogProduct } from '../product-router/product/search-dialog-product';
import { EMPTY_SEARCH_ITEMS } from '../product-router/product/result-provider/result-provider-types';
import { DEFAULT_AB_TEST } from '../ab-test-context/ab-test-context';

const mockAggregatorGetAbTest = jest.fn();
const mockGenericProductPreQueryItemSupplier = jest.fn();

jest.unmock('lodash/debounce');

beforeEach(() => {
  jest.clearAllMocks();

  mockAggregatorGetAbTest.mockImplementation(() =>
    Promise.resolve(DEFAULT_AB_TEST),
  );

  mockGenericProductPreQueryItemSupplier.mockImplementation(() =>
    Promise.resolve(EMPTY_SEARCH_ITEMS),
  );
});

describe('Extensible architecture prefetching', () => {
  it('Generic Product does not prefetch on re-renders', async () => {
    const wrapper = mount(
      <ExtensibleDialogTestWrapper>
        {({ onRetry, isExpanded }) => (
          <SearchDialogProduct
            id="generic"
            title="Generic Product"
            permissionSupplier={() => Promise.resolve(['generic.scopes'])}
            sections={[
              {
                id: 'generic.scopes',
                title: 'Generic Scope',
              },
            ]}
            order={1}
            preQueryItemSupplier={mockGenericProductPreQueryItemSupplier}
            postQueryItemSupplier={() => Promise.resolve(EMPTY_SEARCH_ITEMS)}
            isPrefetchingEnabled={true}
            onRetry={jest.fn()}
            urlGeneratorForNoResultsScreen={jest.fn()}
          >
            <div>Generic Product</div>
          </SearchDialogProduct>
        )}
      </ExtensibleDialogTestWrapper>,
    );
    await waitForSearches();

    // Expect prequery fetch to be made after mount
    expect(mockGenericProductPreQueryItemSupplier).toHaveBeenCalledTimes(1);

    // Force a re-render
    act(() => {
      wrapper.setProps({});
    });
    await waitForSearches();

    // Expect no extra prequery fetches
    expect(mockGenericProductPreQueryItemSupplier).toHaveBeenCalledTimes(1);
  });

  it('Generic Product does not prefetch on expanding / collapsing', async () => {
    const wrapper = mount(
      <ExtensibleDialogTestWrapper>
        {({ onRetry, isExpanded }) => (
          <SearchDialogProduct
            id="generic"
            title="Generic Product"
            permissionSupplier={() => Promise.resolve(['generic.scopes'])}
            sections={[
              {
                id: 'generic.scopes',
                title: 'Generic Scope',
              },
            ]}
            order={1}
            preQueryItemSupplier={mockGenericProductPreQueryItemSupplier}
            postQueryItemSupplier={() => Promise.resolve(EMPTY_SEARCH_ITEMS)}
            isPrefetchingEnabled={true}
            onRetry={jest.fn()}
            urlGeneratorForNoResultsScreen={jest.fn()}
          >
            <div>Generic Product</div>
          </SearchDialogProduct>
        )}
      </ExtensibleDialogTestWrapper>,
    );
    await waitForSearches();

    // Expect prequery fetch to be made after mount
    expect(mockGenericProductPreQueryItemSupplier).toHaveBeenCalledTimes(1);

    // Expand and collapse the dialog
    const setIsExpanded = wrapper
      .find(MetaContextProvider)
      .prop('setIsExpanded');

    act(() => {
      setIsExpanded(true);
    });
    wrapper.update();
    act(() => {
      setIsExpanded(false);
    });
    wrapper.update();
    await waitForSearches();

    // Expect no extra prequery fetches
    expect(mockGenericProductPreQueryItemSupplier).toHaveBeenCalledTimes(1);
  });
});

async function waitForSearches() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}
