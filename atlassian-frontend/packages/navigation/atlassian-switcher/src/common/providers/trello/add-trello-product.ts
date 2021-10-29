import { createResultComplete, isComplete } from '../as-data-provider';
import { AvailableSite, Product, ProviderResults } from '../../../types';

export const addTrelloProduct = (
  availableProducts: ProviderResults['availableProducts'],
): ProviderResults['availableProducts'] => {
  if (isComplete(availableProducts)) {
    //TEAMX-162: APS will start returning trello as an available site for users that have it in perms
    //if trello is in the response there is no need to add it as this will cause duplication and we can return here.
    if (
      availableProducts.data.sites &&
      availableProducts.data.sites.some((s) =>
        s.availableProducts.some(
          (p) => p.productType.toLowerCase() === Product.TRELLO.toLowerCase(),
        ),
      )
    ) {
      return createResultComplete(availableProducts.data);
    }

    return createResultComplete({
      unstableFeatures: availableProducts.data.unstableFeatures,
      isPartial: availableProducts.data.isPartial,
      links: availableProducts.data.links,
      sites: [
        ...availableProducts.data.sites,
        {
          adminAccess: false,
          availableProducts: [
            {
              productType: 'TRELLO',
              url: window.location.origin,
            },
          ],
          cloudId: Product.TRELLO,
          displayName: 'Trello',
          url: window.location.origin,
          avatar: null,
        } as AvailableSite,
      ],
    });
  }
  return availableProducts;
};
