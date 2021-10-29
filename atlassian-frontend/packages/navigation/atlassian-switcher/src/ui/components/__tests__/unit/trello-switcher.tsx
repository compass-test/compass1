import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { createProviderWithCustomFetchData } from '../../../../common/providers/create-data-provider';
import TrelloSwitcher, { TrelloSwitcherProps } from '../../trello-switcher';

let mockTrelloProductFetcher: jest.Mock;
jest.mock('../../../../common/providers/trello/products-provider', () => {
  const originalModule = jest.requireActual(
    '../../../../common/providers/trello/products-provider',
  );

  const {
    createProviderWithCustomFetchData,
  } = require('../../../../common/providers/create-data-provider');

  mockTrelloProductFetcher = jest.fn();
  return {
    __esModule: true,
    ...originalModule,
    TrelloProductsProvider: createProviderWithCustomFetchData(
      'testTrelloProvider',
      mockTrelloProductFetcher.mockReturnValue(
        Promise.resolve({ sites: undefined }),
      ),
    ),
  };
});

describe('trello-switcher', () => {
  let defaultProps: TrelloSwitcherProps;
  beforeAll(() => {
    defaultProps = {
      features: {
        disableCustomLinks: false,
        enableRemoteConfiguration: false,
        enableRemoteAdminLinks: false,
        enableRecentContainers: true,
        xflow: true,
        isProductStoreInTrelloJSWFirstEnabled: false,
        isProductStoreInTrelloConfluenceFirstEnabled: false,
        isSlackDiscoveryEnabled: false,
      },
      triggerXFlow: () => {},
      onDiscoverMoreClicked: () => {},
    };
  });
  it('should use the default TrelloProductsDataProvider', () => {
    mount(
      <IntlProvider locale="en">
        <TrelloSwitcher {...defaultProps} />
      </IntlProvider>,
    );
    expect(mockTrelloProductFetcher).toHaveBeenCalled();
  });
  it('should use a custom availableProductsDataProvider if given', () => {
    const mockProducts = {
      sites: [],
      links: [],
      isPartial: false,
    };
    const mockFetcher = jest.fn(() => Promise.resolve(mockProducts));

    const customDataProvider = createProviderWithCustomFetchData(
      'testProvider',
      mockFetcher,
    );
    mount(
      <IntlProvider locale="en">
        <TrelloSwitcher
          {...defaultProps}
          availableProductsDataProvider={customDataProvider}
        />
      </IntlProvider>,
    );
    expect(mockFetcher).toHaveBeenCalled();
  });
});
