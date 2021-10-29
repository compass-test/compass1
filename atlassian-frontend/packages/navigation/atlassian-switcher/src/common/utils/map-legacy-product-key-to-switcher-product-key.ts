import { ProductConfigurationMap, SwitcherProductType } from '../../types';

export const mapLegacyProductKeyToSwitcherProductKey = (
  productConfigurationMap: ProductConfigurationMap,
) => {
  return Object.entries(productConfigurationMap).reduce<
    Record<string, SwitcherProductType>
  >((acc, [key, entry]) => {
    return {
      ...acc,
      [entry.key]: key as SwitcherProductType, // entries always passes the key as type: string
    };
  }, {});
};
