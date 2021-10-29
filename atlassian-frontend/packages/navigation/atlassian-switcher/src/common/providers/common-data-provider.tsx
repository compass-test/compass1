import React from 'react';

import { ProviderResults } from '../../types';

import {
  UserPermissionProvider,
  XFlowSettingsProvider,
  CollaborationGraphRecentContainersProvider,
} from './instance-data-providers';
import { RecommendationsEngineProvider } from '../../cross-flow/providers/recommendations-provider';
import { Permissions, RecommendationsFeatureFlags } from '../../types';
import {
  ProductConfigurationDataProvider,
  ProductConfigurationProvider,
} from './product-configuration-data-provider';

interface CommonDataProviderProps {
  cloudId?: string;
  enableRecentContainers: boolean;
  useRemoteProductConfiguration?: boolean;
  recommendationsFeatureFlags?: RecommendationsFeatureFlags;
  productConfigurationDataProvider?: ProductConfigurationDataProvider;
  children: (props: {
    productConfiguration: ProviderResults['productConfiguration'];
    managePermission: ProviderResults['managePermission'];
    isXFlowEnabled: ProviderResults['isXFlowEnabled'];
    productRecommendations: ProviderResults['productRecommendations'];
    collaborationGraphRecentContainers: ProviderResults['collaborationGraphRecentContainers'];
  }) => React.ReactElement<any>;
}

export default ({
  cloudId,
  children,
  recommendationsFeatureFlags,
  enableRecentContainers,
  useRemoteProductConfiguration,
  productConfigurationDataProvider,
}: CommonDataProviderProps) => {
  return (
    <ProductConfigurationProvider
      useRemoteProductConfiguration={useRemoteProductConfiguration}
      productConfigurationDataProvider={productConfigurationDataProvider}
    >
      {(productConfiguration) => (
        <CollaborationGraphRecentContainersProvider
          cloudId={cloudId}
          enableRecentContainers={enableRecentContainers}
        >
          {(collaborationGraphRecentContainers) => (
            <UserPermissionProvider
              cloudId={cloudId}
              permissionId={Permissions.MANAGE}
            >
              {(managePermission) => (
                <XFlowSettingsProvider cloudId={cloudId}>
                  {(isXFlowEnabled) => (
                    <RecommendationsEngineProvider
                      featureFlags={recommendationsFeatureFlags}
                    >
                      {(productRecommendations) =>
                        children({
                          productConfiguration,
                          managePermission,
                          isXFlowEnabled,
                          productRecommendations,
                          collaborationGraphRecentContainers,
                        })
                      }
                    </RecommendationsEngineProvider>
                  )}
                </XFlowSettingsProvider>
              )}
            </UserPermissionProvider>
          )}
        </CollaborationGraphRecentContainersProvider>
      )}
    </ProductConfigurationProvider>
  );
};
