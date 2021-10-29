import React from 'react';

import { ProductConfigurationResponse, ProviderResults } from '../../types';
import { createProductConfigurationProvider } from './product-configuration-provider';
import { ExportedDataProvider, DataProvider } from './create-data-provider';

export type ProductConfigurationDataProvider = ExportedDataProvider<
  ProductConfigurationResponse
>;
type RealProvider = DataProvider<ProductConfigurationResponse>;

const {
  fetchMethod: fetchProductConfiguration,
  ProviderComponent: DefaultDataProviderComponent,
} = createProductConfigurationProvider({
  useRemoteProductConfiguration: false,
}) as RealProvider;

const {
  fetchMethod: fetchRemoteProductConfiguration,
  ProviderComponent: DefaultRemoteDataProviderComponent,
} = createProductConfigurationProvider({
  useRemoteProductConfiguration: true,
}) as RealProvider;

export const ProductConfigurationProvider = ({
  children,
  productConfigurationDataProvider,
  useRemoteProductConfiguration,
}: {
  children: (
    productConfiguration: ProviderResults['productConfiguration'],
  ) => React.ReactNode;
  productConfigurationDataProvider?: ProductConfigurationDataProvider;
  useRemoteProductConfiguration?: boolean;
}) => {
  const CustomDataProviderComponent =
    productConfigurationDataProvider?.ProviderComponent;

  const DataProviderComponent = (() => {
    if (CustomDataProviderComponent) {
      return CustomDataProviderComponent;
    }
    if (useRemoteProductConfiguration) {
      return DefaultRemoteDataProviderComponent;
    }
    return DefaultDataProviderComponent;
  })();

  return (
    <DataProviderComponent
      useRemoteProductConfiguration={useRemoteProductConfiguration}
    >
      {children}
    </DataProviderComponent>
  );
};

export const prefetchProductConfiguration = (
  useRemoteProductConfiguration?: boolean,
  customProvider?: ProductConfigurationDataProvider,
) => {
  if (customProvider) {
    (customProvider as RealProvider).fetchMethod({
      useRemoteProductConfiguration,
    });
    return;
  }
  if (useRemoteProductConfiguration) {
    fetchRemoteProductConfiguration({ useRemoteProductConfiguration });
  } else {
    fetchProductConfiguration({ useRemoteProductConfiguration });
  }
};

export const resetProductConfiguration = (
  customProvider?: ProductConfigurationDataProvider,
) => {
  if (customProvider) {
    (customProvider as RealProvider).fetchMethod.reset();
    return;
  }

  fetchProductConfiguration.reset();
};
