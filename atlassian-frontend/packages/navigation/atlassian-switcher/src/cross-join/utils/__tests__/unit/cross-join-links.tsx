import { getJoinableSiteLinks } from '../../cross-join-links';
import {
  JoinableProductDetails,
  JoinableProducts,
  ProductKey,
  JoinableSite,
  AvailableProductDetails,
} from '../../../../types';
import mockJoinableSites from '../../../../../test-helpers/mockJoinableSites';
import { PRODUCT_CONFIGURATION_MAP } from '../../../../common/providers/product-configuration-provider';
import { mapLegacyProductKeyToSwitcherProductKey } from '../../../../common/utils/map-legacy-product-key-to-switcher-product-key';

describe('cross-join-links', () => {
  describe('getJoinableSiteLinks', () => {
    it('should return an array', () => {
      const result = getJoinableSiteLinks([], PRODUCT_CONFIGURATION_MAP);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return 3 items at maximum', () => {
      const result = getJoinableSiteLinks(
        mockJoinableSites.sites.map(
          (site) => Object.assign({}, site, { relevance: 10 }) as JoinableSite,
        ),
        PRODUCT_CONFIGURATION_MAP,
      );
      expect(result.length).toBe(3);
    });

    it('should use the url in the data source as landing url if site.products exists, or use the site URL if site.users exists', () => {
      const mockData = [
        ProductKey.CONFLUENCE,
        ProductKey.JIRA_SOFTWARE,
        ProductKey.JIRA_SOFTWARE,
        ProductKey.JIRA_SERVICE_DESK,
        ProductKey.JIRA_CORE,
      ].map((productKey: ProductKey, index) => {
        const siteData = mockJoinableSites.sites[index];
        return Object.assign({}, siteData, {
          relevance: 10,
        }) as JoinableSite;
      });

      const result = getJoinableSiteLinks(mockData, PRODUCT_CONFIGURATION_MAP);

      const legacyProductKeyMap = mapLegacyProductKeyToSwitcherProductKey(
        PRODUCT_CONFIGURATION_MAP,
      );

      result.forEach((site, index) => {
        const siteData = mockData[index];

        let productKey = '';
        let productData:
          | JoinableProductDetails
          | string[]
          | AvailableProductDetails = [];

        if (siteData.products) {
          productKey = Object.keys(siteData.products!)[0];
          productData = (siteData.products as JoinableProducts)[productKey];
        } else if (siteData.users) {
          productKey = Object.keys(siteData.users!)[0];
          productData =
            PRODUCT_CONFIGURATION_MAP[
              legacyProductKeyMap[productKey as ProductKey]
            ];
        }

        if (
          siteData.products &&
          !Array.isArray(productData) &&
          (productData as JoinableProductDetails).productUrl
        ) {
          expect(site.href).toEqual(
            (productData as JoinableProductDetails).productUrl,
          );
        } else {
          let expectUrl = siteData.url;

          if (productKey === ProductKey.CONFLUENCE) {
            expectUrl =
              siteData.url + (productData as AvailableProductDetails).href;
          } else {
            expectUrl = siteData.url;
          }

          expect(site.href).toEqual(expectUrl);
        }
      });
    });
  });
});
