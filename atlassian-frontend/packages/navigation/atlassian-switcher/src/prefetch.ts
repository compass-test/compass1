import React from 'react';
import { prefetchAll } from './common/providers/instance-data-providers';
import {
  prefetchAvailableProducts,
  AvailableProductsDataProvider,
} from './common/providers/products-data-provider';
import {
  prefetchJoinableSites,
  JoinableSitesDataProvider,
} from './cross-join/providers/joinable-sites-data-provider';
import prefetchSwitcherBundles from './common/utils/prefetch-bundles';
import { FeatureFlagProps } from './types';
import {
  prefetchProductConfiguration,
  ProductConfigurationDataProvider,
} from './common/providers/product-configuration-data-provider';

type PrefetchTriggerProps = {
  cloudId?: string;
  product?: string;
  Container?: React.ReactType;
  enableRemoteConfiguration?: boolean;
  availableProductsDataProvider?: AvailableProductsDataProvider;
  joinableSitesDataProvider?: JoinableSitesDataProvider;
  productConfigurationDataProvider?: ProductConfigurationDataProvider;
} & Partial<FeatureFlagProps>;

export const prefetch = (props: PrefetchTriggerProps) => {
  const { cloudId, product } = props;

  prefetchSwitcherBundles(product);
  prefetchProductConfiguration(
    props.enableRemoteConfiguration,
    props.productConfigurationDataProvider,
  );
  prefetchAvailableProducts(props.availableProductsDataProvider);
  prefetchJoinableSites(props.joinableSitesDataProvider);

  if (cloudId) {
    prefetchAll({ cloudId });
  }
};
