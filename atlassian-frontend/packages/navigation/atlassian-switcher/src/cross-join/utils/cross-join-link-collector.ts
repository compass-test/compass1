import { getJoinableSiteLinks, JoinableSiteItemType } from './cross-join-links';
import { isComplete, isError } from '../../common/providers/as-data-provider';
import { ProviderResults } from '../../types';

export function collectJoinableSiteLinks(
  joinableSites: ProviderResults['joinableSites'],
  productConfiguration: ProviderResults['productConfiguration'],
): JoinableSiteItemType[] | undefined {
  if (joinableSites === undefined || isError(joinableSites)) {
    return [];
  }

  if (isComplete(joinableSites) && isComplete(productConfiguration)) {
    return getJoinableSiteLinks(
      joinableSites.data.sites,
      productConfiguration.data.products,
    );
  }
}
