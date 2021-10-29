import { AvailableProduct, SwitcherProductType } from '../../../../types';
import { getProductSiteUrl, ConnectedSite } from '../../links';
import { PRODUCT_CONFIGURATION_MAP } from '../../../providers/product-configuration-provider';

const siteUrl = 'https://test.atlassian.net';
const externalUrl = 'foo.com';

const tenantedProducts: AvailableProduct['productType'][] = [
  'JIRA_SOFTWARE',
  'JIRA_BUSINESS',
  'JIRA_SERVICE_DESK',
  'CONFLUENCE',
  'BITBUCKET',
];

const productsWithUrl: AvailableProduct['productType'][] = [
  'OPSGENIE',
  'STATUSPAGE',
  'TRELLO',
  'TEAM_CENTRAL',
  'AVOCADO',
];

const getConnectedSiteInfo = (
  productType: SwitcherProductType,
): ConnectedSite => ({
  avatar: null,
  product: {
    productType,
    url: tenantedProducts.includes(productType) ? null : externalUrl,
  } as AvailableProduct,
  isCurrentSite: false,
  siteName: 'test',
  siteUrl,
});

describe('getProductSiteUrl', () => {
  it.each(tenantedProducts)(
    'should return a site url with Available Product Data Map href for tenanted product %s',
    (product) => {
      expect(
        getProductSiteUrl(
          PRODUCT_CONFIGURATION_MAP,
          getConnectedSiteInfo(product),
        ),
      ).toEqual(`${siteUrl}${PRODUCT_CONFIGURATION_MAP[product].href}`);
    },
  );

  it.each(productsWithUrl)(
    'should return the product url from the connected site info for %s',
    (product) => {
      expect(
        getProductSiteUrl(
          PRODUCT_CONFIGURATION_MAP,
          getConnectedSiteInfo(product),
        ),
      ).toEqual(externalUrl);
    },
  );
});
