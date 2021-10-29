import {
  SwitcherProductType,
  ProductKey,
  JoinableSite,
  JoinableSiteUser,
  JoinableSiteUserAvatarPropTypes,
  JoinableProductDetails,
  AvailableProductDetails,
  ProductConfigurationMap,
} from '../../types';

import { SwitcherItemType } from '../../common/utils/links';
import { mapLegacyProductKeyToSwitcherProductKey } from '../../common/utils/map-legacy-product-key-to-switcher-product-key';

// Design decision from
// https://hello.atlassian.net/wiki/spaces/~kgalek/pages/563815188/Join+from+Atlassian+switcher%3A+design+so+far
const MAX_JOINABLE_SITES = 3;

export type JoinableSiteItemType = SwitcherItemType & {
  cloudId: string;
  users: JoinableSiteUserAvatarPropTypes[];
};

export const getJoinableSiteLinks = (
  joinableSites: JoinableSite[] = [],
  productConfigurationMap: ProductConfigurationMap,
): JoinableSiteItemType[] => {
  let joinableSiteLinks = [];

  const legacyProductKeyMap = mapLegacyProductKeyToSwitcherProductKey(
    productConfigurationMap,
  );

  for (let site of joinableSites) {
    const productKeys: string[] = Object.keys(site.users! || site.products!);

    for (let productKey of productKeys) {
      const productType: SwitcherProductType | undefined =
        legacyProductKeyMap[productKey as ProductKey];

      const productConfig: AvailableProductDetails | undefined =
        productConfigurationMap[productType];

      if (!productConfig) {
        continue;
      }

      const { label, Icon, href }: AvailableProductDetails = productConfig;

      let productUrl: string = site.url;
      let users: JoinableSiteUser[] = [];

      if (productKey === ProductKey.CONFLUENCE) {
        productUrl = site.url + href;
      }

      // in Bitbucket, it uses site.users as an array of JoinableUser
      if (site.users) {
        users = site.users[productKey];
      } else if (site.products) {
        const product: JoinableProductDetails | string[] =
          site.products[productKey] || [];

        // in Trello, it is currently an empty array (stripped off from an array of user id string)
        if (Array.isArray(product)) {
          users = [];
        } else if (Object.keys(product).length) {
          users = product.collaborators || [];

          // if productUrl is not given somehow, it falls back to the href from AVAILABLE_PRODUCT_DATA_MAP
          if (product.productUrl) {
            productUrl = product.productUrl;
          }
        }
      }

      joinableSiteLinks.push({
        key: site.cloudId || productKey,
        label,
        description: site.displayName,
        Icon,
        href: productUrl,
        users: users.map(
          (user: JoinableSiteUser): JoinableSiteUserAvatarPropTypes => ({
            name: user.displayName,
            src: user.avatarUrl,
            appearance: 'circle',
            size: 'small',
          }),
        ),
        cloudId: site.cloudId,
        productType,
      });

      if (joinableSiteLinks.length >= MAX_JOINABLE_SITES) {
        return joinableSiteLinks;
      }
    }
  }

  return joinableSiteLinks;
};
