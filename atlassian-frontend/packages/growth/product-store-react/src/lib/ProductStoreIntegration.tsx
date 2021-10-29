import { HostEvents } from '@atlassiansox/iframe-plugin';
import { CrossFlowExtensions } from '@atlassiansox/cross-flow-base-types';
import qs from 'query-string';
import React, { useEffect, useRef } from 'react';

import { DEFAULT_SRC, SPA_APP_NAME, TENANTLESS_SRC } from './constants';
import {
  ProductStoreEvent,
  ProductStoreEventTypes,
  Routes,
  ProductKeys,
  AvailableSitesResponse,
  ExperimentalOptions,
} from './types';
import { useSpaHostClient } from './useSpaHostClient';
import { createModalElement, createLoaderElement } from './elements';
import { PluginCollection } from '@atlassiansox/cross-flow-base-types';

interface ProductStoreIntegrationProps {
  /**
   * URL where the Product Store SPA is hosted,
   * to be used for testing purposes only or as a last resort if it is
   * impossible to host at standard location.
   * If overridden, make sure `cloudId` requirement is respected.
   */
  src?: string;
  /**
   * Cloud ID,
   * Required in site-scoped(non-tenantless) mode.
   */
  cloudId?: string;
  originProduct?: string;
  locale: string;
  route: Routes;
  onClose: () => void;
  onTryClicked: (product: ProductKeys) => void;
  sourceComponent: string;
  sourceContext: string;
  onLearnMoreClicked?: (product: ProductKeys) => void;
  onChangeRoute?: (route: Routes) => void;
  onError?: (e: any) => void;
  onAnalyticsEvent?: (e: any) => void;
  prefetchedAvailableSites?: AvailableSitesResponse;
  isEnrolledInCFEv2Variation?: boolean;
  isStandaloneProductPage?: boolean;
  onHandShake?: (e: any) => void;
  experimentalOptions?: ExperimentalOptions;
  extensions?: CrossFlowExtensions;
  edgePrefix?: string;
  plugins?: PluginCollection;
  isLinkExpansion?: boolean;
  env?: string;
  journey?: string;
  iframeIsEmbedded?: boolean;
}

const noop = () => void 0;

export const getProductStoreSrc = ({
  edgePrefix,
  src,
  cloudId,
}: {
  edgePrefix: string;
  src?: string;
  cloudId?: string;
}) => {
  return src || edgePrefix + (cloudId ? DEFAULT_SRC : TENANTLESS_SRC);
};

export const ProductStoreIntegration = (
  props: ProductStoreIntegrationProps,
) => {
  const {
    src,
    cloudId,
    locale,
    route,
    onClose,
    onTryClicked,
    sourceComponent,
    sourceContext,
    onLearnMoreClicked = noop,
    onChangeRoute = noop,
    onError = noop,
    onAnalyticsEvent = noop,
    onHandShake = noop,
    prefetchedAvailableSites,
    isEnrolledInCFEv2Variation,
    isStandaloneProductPage,
    originProduct,
    experimentalOptions,
    extensions,
    edgePrefix = '',
    plugins,
    isLinkExpansion,
    env,
    journey,
    iframeIsEmbedded = false,
  } = props;

  const iframeContainerElement = useRef<HTMLDivElement>(null);

  const productStoreSrc = getProductStoreSrc({ edgePrefix, src, cloudId });
  const { url, query: existingQueryParams } = qs.parseUrl(productStoreSrc);
  const queryParams = qs.stringify({
    ...existingQueryParams,
    route,
    cloudId,
    locale,
    prefetchedAvailableSites,
    isEnrolledInCFEv2Variation,
    isStandaloneProductPage,
    originProduct,
    // query-string does not stringify nested objects
    experimentalOptions: JSON.stringify(experimentalOptions),
    extensions: JSON.stringify(extensions),
    isLinkExpansion,
    env,
    sourceComponent,
    sourceContext,
    journey,
    iframeIsEmbedded,
  });
  const assembledSrc = `${url}?${queryParams}`;

  const client = useSpaHostClient(
    {
      src: String(assembledSrc),
      appName: SPA_APP_NAME,
      handshakeEventTimeoutDelayMilliSeconds: 10000,
      readyEventTimeoutDelayMilliSeconds: 20000,
      modalElement: createModalElement(),
      loaderElement: createLoaderElement(),
      iframeIsEmbedded,
    },
    [productStoreSrc],
  );

  useEffect(() => {
    client.on(HostEvents.Error, onError);

    client.on(HostEvents.AnalyticEvent, onAnalyticsEvent);

    client.on(HostEvents.Handshake, onHandShake);

    client.init({
      containerElement: iframeContainerElement.current,
      rpcMethods: plugins,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useEffect(() => {
    const handleMessages = (event: ProductStoreEvent) => {
      switch (event.type) {
        case ProductStoreEventTypes.LEARN_MORE_CLICKED:
          onLearnMoreClicked(event.data.productKey);
          break;

        case ProductStoreEventTypes.TRY_CLICKED:
          onTryClicked(event.data.productKey);
          break;

        case ProductStoreEventTypes.CHANGE_ROUTE:
          onChangeRoute(event.data.route);
          break;
        case ProductStoreEventTypes.CLOSE:
          onClose();
          break;
      }
    };
    client.on(HostEvents.Message, handleMessages);
    return () => {
      client.off(HostEvents.Message, handleMessages);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, onTryClicked, onChangeRoute, onLearnMoreClicked]);

  useEffect(() => {
    client.postMessage({
      type: ProductStoreEventTypes.CHANGE_ROUTE,
      data: { route },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  useEffect(() => {
    client.postMessage({
      type: ProductStoreEventTypes.CHANGE_PREFETCHED_AVAILABLE_SITES,
      data: { prefetchedAvailableSites },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefetchedAvailableSites]);

  return <div style={{ height: '100%' }} ref={iframeContainerElement} />;
};
