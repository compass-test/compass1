import React, { createContext, useEffect, useContext } from 'react';
import { useMemoOne as useMemo } from 'use-memo-one';
import MetalClient from '@atlassiansox/metal-client';
import { ProductEnvironment } from '@atlassian/forge-ui-types';

import { EnvironmentContext } from '../environment';

let metalClientSingleton: Promise<MetalClient> | undefined;

// Track the number of createMetalClient invocations
let metalClientRefs = 0;

export const createMetalClient = (
  env: ProductEnvironment,
  product: string,
  module = import('@atlassiansox/metal-client'),
): [Promise<MetalClient>, () => void] => {
  metalClientRefs++;
  if (!metalClientSingleton) {
    const FORGE_UI_METAL_ID = '74fe5415-a93b-4197-bb9b-294dc9439cd7';

    const partialProductInfo = {
      metalId: FORGE_UI_METAL_ID,
      // TODO: Automate the versioning of metal-client
      // https://product-fabric.atlassian.net/browse/AUX-619
      version: '0.1',
    };

    metalClientSingleton = new Promise(async (resolve) => {
      const {
        default: MetalClient,
        envTypes,
        PerformanceMarkPlugin,
        catalog,
      } = await module;

      const { default: SLOPlugin } = await import('./sloPlugin');

      let metalEnv = (() => {
        if (env === ProductEnvironment.PRODUCTION) {
          return envTypes.PROD;
        } else if (env === ProductEnvironment.STAGING) {
          return envTypes.STAGING;
        }
        return envTypes.DEV;
      })();

      const plugins = [
        new PerformanceMarkPlugin({
          [catalog.performance.REQUEST_TIMING]: {
            name: 'forge-ui.fe.render',
            // In our metrics, 'page' is used to identify the extension point,
            // but we're using the product here for the meantime as page is required
            page: product,
          },
        }),
        new SLOPlugin({
          [catalog.performance.COMPONENT_READY]: [
            {
              component: 'useExtensionList',
              target: 2000,
            },
            {
              component: 'getForgeExtensionProvider',
              target: 2000,
            },
          ],
          [catalog.performance.REQUEST_TIMING]: 5000,
        }),
      ];
      resolve(
        new MetalClient({
          productInfo: { ...partialProductInfo, env: metalEnv },
          // @ts-ignore broken metal-client types, required in meta metrics. See http://go/j/OBSCL-445
          settings: {
            meta: {
              subproduct: product,
            },
          },
          plugins,
        }),
      );
    });
  }

  return [metalClientSingleton, destroyMetalClient];
};

const destroyMetalClient = () => {
  metalClientRefs--;

  if (metalClientRefs !== 0) {
    return;
  }

  if (metalClientSingleton) {
    Promise.resolve(metalClientSingleton).then((metalClient) => {
      metalClient.destroy();
    });
    metalClientSingleton = undefined;
  }
};

export interface MetalClientProviderProps {
  environment?: ProductEnvironment;
  product: string;
  page: string;
  id?: string; // Unused `id`, delete me when we next make a breaking change.
}
export interface MetalClientValueProps extends MetalClientProviderProps {
  metalClient?: Promise<MetalClient> | undefined;
}

export interface MetalClientContextProps {
  value: MetalClientProviderProps;
  children: React.ReactNode;
}

export const MetalClientContext = createContext<MetalClientValueProps>({
  metalClient: undefined,
  environment: ProductEnvironment.DEVELOPMENT,
  product: '',
  page: '',
});

const InnerMetalClientProvider = MetalClientContext.Provider;
export const MetalClientConsumer = MetalClientContext.Consumer;

export default MetalClientContext;

export const MetalClientProvider = ({
  value,
  children,
}: MetalClientContextProps) => {
  const envFromContext = useContext(EnvironmentContext);
  const { product, page, environment } = value;

  const [metalClient, destroyMetalClient] = useMemo(() => {
    return createMetalClient(environment || envFromContext, product);
  }, [envFromContext, environment, product]);
  useEffect(() => {
    return () => {
      destroyMetalClient();
    };
  }, [destroyMetalClient]);

  const memoedValue = useMemo(() => {
    return {
      environment: environment || envFromContext,
      product,
      page,
      metalClient,
    };
  }, [page, environment, envFromContext, product, metalClient]);

  return (
    <InnerMetalClientProvider value={memoedValue}>
      {children}
    </InnerMetalClientProvider>
  );
};
