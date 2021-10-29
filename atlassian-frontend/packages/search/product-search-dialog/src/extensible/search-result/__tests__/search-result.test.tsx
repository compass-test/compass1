import React from 'react';
import { render } from '@testing-library/react';

import {
  GenericSearchResult,
  getTotalNumberOfItemsInPreviousSections,
} from '../search-result';
import searchItemsMock from '../__mocks__/search-items-mock';
import { IntlProvider } from 'react-intl';

jest.mock('../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'sessionId',
}));

jest.mock('../../product-router', () => ({
  useProductContext: () => ({
    getActiveProduct: () => ({ id: 'bitbucket' }),
  }),
}));

describe('GenericSearchResult', () => {
  describe('SearchResult', () => {
    it('renders result items', () => {
      const { getByText } = render(
        <IntlProvider locale="en">
          <GenericSearchResult
            searchItems={searchItemsMock}
            screen="postQuerySearchResults"
          />
        </IntlProvider>,
      );
      expect(getByText('repo-name')).toBeInTheDocument();
      expect(getByText('repo-name-2')).toBeInTheDocument();
    });

    it('do not render result items if there is no results', () => {
      const { queryByText } = render(
        <IntlProvider locale="en">
          <GenericSearchResult
            searchItems={{ size: 0, sections: [] }}
            screen="postQuerySearchResults"
          />
        </IntlProvider>,
      );
      expect(queryByText('repo-name')).not.toBeInTheDocument();
    });
  });

  describe('getTotalNumberOfItemsInPreviousSections', () => {
    it('return 0 if sectionIndex is 0', () => {
      expect(
        getTotalNumberOfItemsInPreviousSections(
          [...searchItemsMock.sections, ...searchItemsMock.sections],
          0,
        ),
      ).toBe(0);
    });

    it('return number of items in previous sections if sectionIndex is not 0', () => {
      expect(
        getTotalNumberOfItemsInPreviousSections(
          [...searchItemsMock.sections, ...searchItemsMock.sections],
          1,
        ),
      ).toBe(2);
      expect(
        getTotalNumberOfItemsInPreviousSections(
          [...searchItemsMock.sections, ...searchItemsMock.sections],
          2,
        ),
      ).toBe(4);
    });
  });

  describe('Result count badge', () => {
    it('renders when section size is given', () => {
      const { queryByTestId } = render(
        <IntlProvider locale="en">
          <GenericSearchResult
            searchItems={{
              sections: [
                {
                  id: 'id',
                  title: 'title',
                  searchResults: [
                    {
                      title: 'title',
                      id: 'id-0',
                      meta: 'meta',
                      url: '/url',
                      iconUrl: '/',
                    },
                    {
                      title: 'title',
                      id: 'id-1',
                      meta: 'meta',
                      url: '/url',
                      iconUrl: '/',
                    },
                  ],
                  size: 2,
                },
              ],
            }}
            screen="postQuerySearchResults"
          />
        </IntlProvider>,
      );

      const badge = queryByTestId('search-result-count-badge');
      expect(badge).toBeDefined();
      expect(badge!.textContent).toEqual('2');
    });

    it('does not render when section size is not given', () => {
      const { queryByTestId } = render(
        <IntlProvider locale="en">
          <GenericSearchResult
            searchItems={{
              sections: [
                {
                  id: 'id',
                  title: 'title',
                  searchResults: [
                    {
                      title: 'title',
                      id: 'id-0',
                      meta: 'meta',
                      url: '/url',
                      iconUrl: '/',
                    },
                  ],
                },
              ],
            }}
            screen="postQuerySearchResults"
          />
        </IntlProvider>,
      );

      const badge = queryByTestId('search-result-count-badge');
      expect(badge).toEqual(null);
    });

    it('uses the maximum of section size and number of search results', () => {
      const { queryByTestId } = render(
        <IntlProvider locale="en">
          <GenericSearchResult
            searchItems={{
              sections: [
                {
                  id: 'id',
                  title: 'title',
                  searchResults: [
                    {
                      title: 'title',
                      id: 'id-0',
                      meta: 'meta',
                      url: '/url',
                      iconUrl: '/',
                    },
                    {
                      title: 'title',
                      id: 'id-1',
                      meta: 'meta',
                      url: '/url',
                      iconUrl: '/',
                    },
                  ],
                  size: 1,
                },
              ],
            }}
            screen="postQuerySearchResults"
          />
        </IntlProvider>,
      );

      const badge = queryByTestId('search-result-count-badge');
      expect(badge).toBeDefined();
      expect(badge!.textContent).toEqual('2');
    });
  });
});
