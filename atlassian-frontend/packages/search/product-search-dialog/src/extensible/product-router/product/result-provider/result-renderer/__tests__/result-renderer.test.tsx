import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

import { ResultRenderer } from '../result-renderer';
import { ProductStates } from '../../../../..';
import { SearchSessionProvider } from '../../../../../../common/search-session-provider';
import { SearchItems } from '../../../result-types';

interface getMockSearchItemsOptions {
  includeSize?: boolean;
}

jest.mock('@atlassian/search-dialog', () =>
  Object.assign({}, jest.requireActual('@atlassian/search-dialog'), {
    ResultContainer: ({ children }: any) => (
      <div data-testid="result-container"> {children}</div>
    ),

    SearchFooter: ({ children }: any) => (
      <div data-testid="search-footer"> {children}</div>
    ),

    SearchDialogContent: ({ children }: any) => (
      <div data-testid="search-dialog-content"> {children}</div>
    ),
  }),
);

jest.mock('../../../../../advanced-search-footer', () => ({
  __esModule: true,
  default: () => <div />,
}));

function getMockSearchItems(
  options: getMockSearchItemsOptions = { includeSize: true },
): SearchItems {
  const { includeSize } = options;

  return {
    sections: [
      {
        id: 'product.scope0',
        title: 'Scope 0',
        size: includeSize ? 10 : undefined,
        searchResults: [
          { title: 'a', id: 'a', meta: 'a', url: 'a', iconUrl: 'a' },
          { title: 'b', id: 'b', meta: 'b', url: 'b', iconUrl: 'b' },
        ],
        viewAllLinkGenerator: () => '/link/',
      },
      {
        id: 'product.scope1',
        title: 'Scope 1',
        size: includeSize ? 10 : undefined,
        searchResults: [
          { title: 'c', id: 'c', meta: 'c', url: 'c', iconUrl: 'c' },
          { title: 'd', id: 'd', meta: 'd', url: 'd', iconUrl: 'd' },
        ],
        viewAllLinkGenerator: () => '/link/',
      },
    ],
    size: 20,
  };
}

function renderResultRenderer(
  productState: ProductStates,
  preQueryItems?: SearchItems,
  postQueryItems?: SearchItems,
) {
  return render(
    <IntlProvider locale="en">
      <SearchSessionProvider sessionKey="">
        <ResultRenderer
          productState={productState}
          preQueryItems={preQueryItems || getMockSearchItems()}
          postQueryItems={postQueryItems || getMockSearchItems()}
          onRetry={jest.fn()}
          urlGeneratorForNoResultsScreen={jest.fn()}
        />
      </SearchSessionProvider>
    </IntlProvider>,
  );
}

describe('<ResultRenderer />', () => {
  describe('Shows/Hides result count in the correct states', () => {
    it('shows in PostQuerySuccess for only the first section (section has size)', async () => {
      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PostQuerySuccess,
      );

      const badges = queryAllByTestId('search-result-count-badge');
      expect(badges).toHaveLength(1);
    });

    it('does not show in PostQuerySuccess for the first section (section does not have size)', async () => {
      const preQueryItems = getMockSearchItems({ includeSize: false });
      const postQueryItems = getMockSearchItems({ includeSize: false });

      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PostQuerySuccess,
        preQueryItems,
        postQueryItems,
      );

      const badges = queryAllByTestId('search-result-count-badge');
      expect(badges).toHaveLength(0);
    });

    it('does not show in PreQuerySuccess', async () => {
      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PreQuerySuccess,
      );

      const badges = queryAllByTestId('search-result-count-badge');
      expect(badges).toHaveLength(0);
    });

    it('does not show in PostQueryLoading', async () => {
      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PostQueryLoading,
      );

      const badges = queryAllByTestId('search-result-count-badge');
      expect(badges).toHaveLength(0);
    });
  });

  it('uses correct component for layouts', () => {
    const preQueryItems = getMockSearchItems({ includeSize: true });
    const postQueryItems = getMockSearchItems({ includeSize: true });

    const { getByTestId } = renderResultRenderer(
      ProductStates.PostQueryLoading,
      preQueryItems,
      postQueryItems,
    );

    const element = getByTestId('search-dialog-content');

    expect(element).toBeDefined();
    expect(element.innerHTML).toContain('data-testid="result-container"');
  });

  describe('Shows/Hides view all link in the correct states', () => {
    it(`shows in ${ProductStates.PostQuerySuccess}`, () => {
      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PostQuerySuccess,
      );

      const numberOfSections = getMockSearchItems().sections.length;

      const links = queryAllByTestId('search-result-section-link');
      expect(links).toHaveLength(numberOfSections);
    });

    it(`does not show in ${ProductStates.PreQuerySuccess}`, () => {
      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PreQuerySuccess,
      );

      const links = queryAllByTestId('search-result-section-link');
      expect(links).toHaveLength(0);
    });

    it(`does not show in ${ProductStates.PostQueryLoading}`, () => {
      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PostQueryLoading,
      );

      const links = queryAllByTestId('search-result-section-link');
      expect(links).toHaveLength(0);
    });

    it(`does not show in ${ProductStates.PreQueryLoading}`, () => {
      const { queryAllByTestId } = renderResultRenderer(
        ProductStates.PreQueryLoading,
      );

      const links = queryAllByTestId('search-result-section-link');
      expect(links).toHaveLength(0);
    });
  });
});
