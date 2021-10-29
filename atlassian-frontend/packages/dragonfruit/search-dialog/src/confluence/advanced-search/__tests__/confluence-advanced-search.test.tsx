import React from 'react';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import ConfluenceAdvancedSearch from '../confluence-advanced-search';
import { AdvancedSearchLink } from '../../../common/advanced-search-link';
import { useKeyboardNavigation } from '@atlassian/search-dialog';
import {
  useAnalytics,
  onAdvancedSearchSelected,
} from '../../../common/analytics';
import { useProducts, Products } from '../../../common/product-context';
import { MultiSiteAdvancedSearchLink } from '../../../common/advanced-search-link';
import { generateMockSites } from '../../../utils/site-util';
import { SearchClientContext } from '../../../confluence/clients';

let mockedReturn: Partial<SearchClientContext> = { siteUrl: '', sites: [] };

jest.mock('../../clients', () =>
  Object.assign({}, jest.requireActual('../../clients'), {
    useClients: () => mockedReturn,
  }),
);

jest.mock('../../../common/advanced-search-link', () => ({
  AdvancedSearchContent: () => 'div',
  AdvancedSearchLink: () => 'div',
  CenteredAdvancedSearchGroup: () => 'div',
  MultiSiteAdvancedSearchLink: () => 'div',
}));

jest.mock('@atlassian/search-dialog', () => ({
  useKeyboardNavigation: jest.fn(),
  ReturnIcon: () => <div />,
  LinkComponent: () => <div />,
}));

jest.mock('../../../common/product-context', () =>
  Object.assign({}, jest.requireActual('../../../common/product-context'), {
    usePrimaryProduct: jest.fn(),
    useProducts: jest.fn(),
  }),
);

jest.mock('../../../common/analytics', () => {
  const fireAnalyticsEvent = jest.fn();

  return Object.assign({}, jest.requireActual('../../../common/analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent,
    }),
    onAdvancedSearchSelected: jest.fn(),
  });
});

jest.mock('../../../confluence/confluence-features', () =>
  Object.assign(
    {},
    jest.requireActual('../../../confluence/confluence-features'),
    {
      useFeatures: () => ({
        isMultiSite: true,
      }),
    },
  ),
);

const searchSessionId = 'testSessionId';
const isLoading = false;

const commonProps = {
  searchSessionId,
  isLoading,
  enabledFilters: [],
  query: '',
};

describe('<ConfluenceAdvancedSearch />', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    (useProducts as jest.Mock).mockReturnValue([Products.confluence]);
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
  });

  beforeEach(() => {
    mockedReturn = { siteUrl: '', sites: [] };
  });

  it('snapshot default', () => {
    const wrapper = mountWithIntl(
      <ConfluenceAdvancedSearch {...commonProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot in multi product scenario', () => {
    (useProducts as jest.Mock).mockReturnValue([Products.confluence]);

    const wrapper = mountWithIntl(
      <ConfluenceAdvancedSearch {...commonProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot keyboard highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const wrapper = mountWithIntl(
      <ConfluenceAdvancedSearch {...commonProps} query={''} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AdvancedSearchLink with query string attached to href', () => {
    const wrapper = mountWithIntl(
      <ConfluenceAdvancedSearch {...commonProps} query={'A test search'} />,
    );
    const advancedSearchLink = wrapper.find(AdvancedSearchLink).prop('href');
    expect(advancedSearchLink).toEqual('/wiki/search?text=A%20test%20search');
  });

  it('should render AdvancedSearchLink with query string and site url attached to href', () => {
    mockedReturn = { siteUrl: 'A_TEST_SITEURL', sites: [] };

    const wrapper = mountWithIntl(
      <ConfluenceAdvancedSearch {...commonProps} query={'A test search'} />,
    );
    const advancedSearchLink = wrapper.find(AdvancedSearchLink).prop('href');
    expect(advancedSearchLink).toEqual(
      'A_TEST_SITEURL/wiki/search?text=A%20test%20search',
    );
  });

  it('on enter should simulate a click on the wrappers child', () => {
    mountWithIntl(
      <ConfluenceAdvancedSearch {...commonProps} query={'A test search'} />,
    );
    const click = jest.fn();

    (useKeyboardNavigation as jest.Mock).mock.calls[0][0]['onKeydownCallback'](
      new KeyboardEvent('keydown', { key: 'Enter' }),
      {
        firstElementChild: {
          click,
        },
      },
    );

    expect(click).toBeCalledTimes(1);
  });

  describe('analytics', () => {
    it('on click with no modifier should trigger analytics event with newTab false', () => {
      const wrapper = mountWithIntl(
        <ConfluenceAdvancedSearch {...commonProps} query={'A test search'} />,
      );

      wrapper.find('span').prop('onClick')!({} as React.MouseEvent);

      expect(onAdvancedSearchSelected).toBeCalledWith({
        trigger: 'click',
        actionSubjectId: 'confluenceAdvancedSearchLink',
        isLoading,
        newTab: false,
      });
      expect(useAnalytics().fireAnalyticsEvent).toBeCalled();
    });

    ['ctrlKey', 'shiftKey', 'metaKey'].forEach((modifier) => {
      it(`on click with ${modifier} should trigger analytics event with newTab true`, () => {
        const wrapper = mountWithIntl(
          <ConfluenceAdvancedSearch {...commonProps} query={'A test search'} />,
        );

        wrapper.find('span').prop('onClick')!({
          [modifier]: true,
        } as any);

        expect(onAdvancedSearchSelected).toBeCalledWith({
          trigger: 'click',
          actionSubjectId: 'confluenceAdvancedSearchLink',
          isLoading,
          newTab: true,
        });
        expect(useAnalytics().fireAnalyticsEvent).toBeCalled();
      });
    });
  });

  describe('MultiSiteLinkComponent', () => {
    it('should render the multi site link component', () => {
      mockedReturn = {
        sites: generateMockSites(5, Products.confluence),
      };
      const wrapper = mountWithIntl(
        <ConfluenceAdvancedSearch {...commonProps} />,
      );

      expect(wrapper.find(MultiSiteAdvancedSearchLink).exists()).toBeTruthy();
    });

    it('should not render the multi site link when the feature is off', () => {
      const wrapper = mountWithIntl(
        <ConfluenceAdvancedSearch {...commonProps} />,
      );

      expect(wrapper.find(MultiSiteAdvancedSearchLink).exists()).toBeFalsy();
    });

    it('should not render the multi site link if there is only one site', () => {
      mockedReturn = {
        sites: generateMockSites(1, Products.confluence),
      };
      const wrapper = mountWithIntl(
        <ConfluenceAdvancedSearch {...commonProps} />,
      );

      expect(wrapper.find(MultiSiteAdvancedSearchLink).exists()).toBeFalsy();
    });

    it('passes the right sites', () => {
      mockedReturn = {
        sites: [...generateMockSites(5, Products.confluence)],
      };
      const wrapper = mountWithIntl(
        <ConfluenceAdvancedSearch {...commonProps} />,
      );

      expect(
        wrapper.find(MultiSiteAdvancedSearchLink).prop('sites').length,
      ).toEqual(5);
    });

    it('passes the right advanced search url', () => {
      const sites = [
        {
          avatarUrl: 'https://i.imgur.com/0YmmsuX.jpg',
          cloudId: '4f580993-ea72-4e32-b00f-2a3f59c17337',
          product: Products.confluence,
          siteName: 'Data',
          siteUrl: 'https://product.atlassian.net',
        },
        {
          avatarUrl: 'https://i.imgur.com/0YmmsuX.jpg',
          cloudId: 'some-cloud-id',
          product: Products.confluence,
          siteName: 'Data2',
          siteUrl: 'https://product2.atlassian.net',
        },
      ];
      mockedReturn = {
        sites: sites,
      };
      const wrapper = mountWithIntl(
        <ConfluenceAdvancedSearch {...commonProps} />,
      );

      expect(
        wrapper.find(MultiSiteAdvancedSearchLink).prop('sites')[0],
      ).toEqual({
        ...sites[0],
        advancedSearchUrl: 'https://product.atlassian.net/wiki/search',
      });

      expect(
        wrapper.find(MultiSiteAdvancedSearchLink).prop('sites')[1],
      ).toEqual({
        ...sites[1],
        advancedSearchUrl: 'https://product2.atlassian.net/wiki/search',
      });
    });
  });
});
