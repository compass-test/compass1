import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { OpsgenieTab } from '../.';
import { SearchSessionProvider } from '../../../../common/search-session-provider';
import { OpsgenieTabProps } from '../opsgenie-tab';
import { SearchResult } from '../../../product-router/product/result-types';
import { mapAggregatorResponseToSearchItem } from '../opsgenie-tab';

const mockSearchDialogProductRender = jest.fn(
  (props: OpsgenieTabProps) => null,
);

jest.mock('../../../product-router/product/search-dialog-product', () => ({
  SearchDialogProduct: (props: OpsgenieTabProps) =>
    mockSearchDialogProductRender(props),
}));

describe('<OpsgenieTab />', () => {
  describe('mapAggregatorResponseToSearchItem', () => {
    it('should capiltalise the status', () => {
      const searchResult: SearchResult = mapAggregatorResponseToSearchItem({
        count: 1,
        createdAt: '12/08/2021',
        iconURI: 'url',
        id: 'id',
        link: 'link',
        message: 'message',
        priority: 'P5',
        status: 'open',
        tinyId: 'small_id',
      });
      expect(searchResult.meta).toBe('Open');
    });
  });

  describe('generateAdvancedSearchUrl', () => {
    it('renders SearchDialog with the correct generateAdvancedSearchUrl prop', () => {
      render(
        <IntlProvider locale="en">
          <SearchSessionProvider sessionKey="">
            <OpsgenieTab
              onRetry={jest.fn}
              cloudId={'cloudId'}
              hostUrl={'hostUrl'}
              order={0}
            />
          </SearchSessionProvider>
        </IntlProvider>,
      );

      const props = mockSearchDialogProductRender.mock.calls[0][0];
      expect(props.generateAdvancedSearchUrl).toBeDefined();

      if (props.generateAdvancedSearchUrl) {
        expect(props.generateAdvancedSearchUrl('query')).toEqual(
          'hostUrl/gateway/api/xpsearch-aggregator/redirect/advanced/opsgenie/cloudId?query=query',
        );
      }
    });
  });
});
