import React from 'react';
import Switcher from '../primitives/themed-switcher';
import CommonDataProvider from '../../common/providers/common-data-provider';
import {
  Product,
  FeatureMap,
  DiscoverMoreCallback,
  TriggerXFlowCallback,
  WithRecommendationsFeatureFlags,
  CustomizeLinks,
} from '../../types';
import { mapResultsToSwitcherProps } from '../../common/utils/map-results-to-switcher-props';
import {
  AvailableProductsProvider,
  AvailableProductsDataProvider,
} from '../../common/providers/products-data-provider';
import {
  JoinableSitesProvider,
  JoinableSitesDataProvider,
} from '../../cross-join/providers/joinable-sites-data-provider';
import { WithTheme } from '../theme/types';
import { ProductConfigurationDataProvider } from '../../common/providers/product-configuration-data-provider';

export type GenericSwitcherProps = WithTheme &
  Partial<WithRecommendationsFeatureFlags> & {
    cloudId?: string;
    features: FeatureMap;
    triggerXFlow: TriggerXFlowCallback;
    onDiscoverMoreClicked: DiscoverMoreCallback;
    product: Exclude<Product, Product.JIRA | Product.CONFLUENCE>;
    availableProductsDataProvider?: AvailableProductsDataProvider;
    productConfigurationDataProvider?: ProductConfigurationDataProvider;
    joinableSitesDataProvider?: JoinableSitesDataProvider;
    adminUrl?: string;
    customizeLinks?: CustomizeLinks;
  };

export default (props: GenericSwitcherProps) => (
  <JoinableSitesProvider
    joinableSitesDataProvider={props.joinableSitesDataProvider}
  >
    {(joinableSites) => (
      <AvailableProductsProvider
        availableProductsDataProvider={props.availableProductsDataProvider}
      >
        {(availableProducts) => (
          <CommonDataProvider
            cloudId={props.cloudId}
            enableRecentContainers={props.features.enableRecentContainers}
            useRemoteProductConfiguration={
              props.features.enableRemoteConfiguration
            }
            productConfigurationDataProvider={
              props.productConfigurationDataProvider
            }
            recommendationsFeatureFlags={{
              ...props.recommendationsFeatureFlags,
            }}
          >
            {(providerResults) => {
              const switcherLinks = mapResultsToSwitcherProps(
                props.cloudId,
                { ...providerResults, availableProducts, joinableSites },
                props.features,
                props.onDiscoverMoreClicked,
                props.triggerXFlow,
                props.product,
                props.adminUrl,
                undefined,
                undefined,
                props.customizeLinks,
              );
              return <Switcher {...props} {...switcherLinks} />;
            }}
          </CommonDataProvider>
        )}
      </AvailableProductsProvider>
    )}
  </JoinableSitesProvider>
);
