import { getAdministrationLinks } from './admin-links';
import { isComplete, isError } from '../../common/providers/as-data-provider';
import {
  AvailableProductLinks,
  AvailableLink,
  FeatureMap,
  ProviderResults,
  ProductConfigurationResponse,
} from '../../types';
import { SwitcherItemType } from '../../common/utils/links';

export function getProductLink(
  link: AvailableLink,
  productConfigurationResponse: ProductConfigurationResponse,
  adminUrl?: string,
): AvailableProductLinks | null {
  const productConfigItem = productConfigurationResponse.links[link.linkType];
  if (productConfigItem) {
    const href =
      adminUrl && link.linkType.toLowerCase() === 'administration'
        ? adminUrl
        : link.url || productConfigItem.href;
    return {
      ...productConfigItem,
      key: productConfigItem.key + link.url,
      href,
    };
  }
  return null;
}

export function collectAdminLinks(
  managePermission: ProviderResults['managePermission'],
  availableProducts: ProviderResults['availableProducts'],
  productConfiguration: ProviderResults['productConfiguration'],
  featureFlags: FeatureMap,
  adminUrl?: string,
): SwitcherItemType[] {
  if (
    featureFlags.enableRemoteConfiguration &&
    featureFlags.enableRemoteAdminLinks
  ) {
    if (isError(availableProducts) || isError(productConfiguration)) {
      return [];
    }

    if (
      isComplete(availableProducts) &&
      availableProducts.data &&
      isComplete(productConfiguration) &&
      productConfiguration.data
    ) {
      return availableProducts.data.links
        .reduce<AvailableProductLinks[]>((acc, link) => {
          const productLink = getProductLink(
            link,
            productConfiguration.data,
            adminUrl,
          );

          if (productLink) {
            acc.push(productLink);
          }

          return acc;
        }, [])
        .sort((a, b) => a.ordinal - b.ordinal);
    }
  } else {
    if (isError(managePermission)) {
      return [];
    }

    if (isComplete(managePermission) && managePermission.data) {
      return getAdministrationLinks(adminUrl);
    }
  }

  return [];
}
