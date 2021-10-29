import React, { useEffect, useRef, ComponentType } from 'react';
import qs from 'query-string';
import { HostEvents } from '@atlassiansox/iframe-plugin';

import { CrossFlowIntegrationProps, CrossFlowEvents } from './types';
import { useSpaHostClient } from './useSpaHostClient';
import { DEFAULT_SRC, SPA_APP_NAME } from './constants';
import { createLoaderElement, createModalElement } from './elements';

const noop = () => void 0;

export const getCrossFlowSrc = ({
  edgePrefix,
  src,
}: {
  edgePrefix: string;
  src?: string;
}) => {
  return src || edgePrefix + DEFAULT_SRC;
};

export const CrossFlowIntegration: ComponentType<CrossFlowIntegrationProps> = (
  props,
) => {
  const {
    src,
    locale,
    cloudId,
    onClose,
    targetProduct,
    originProduct,
    sourceContext,
    onError = noop,
    sourceComponent,
    onAnalyticsEvent = noop,
    onHandShake = noop,
    plugins,
    /**
     * Experimental options is a cross-flow-support compatible way of passing custom params to SPA.
     * These options should preferably be handled on the SPA side, they are allow-listed in
     * packages/apps/cross-flow-spa/src/withParams.ts:25 and override existing supported options.
     */
    experimentalOptions,
    extensions,
    edgePrefix = '',
    env,
    journey,
  } = props;

  const iframeContainerElement = useRef<HTMLDivElement>(null);

  const crossFlowSrc = getCrossFlowSrc({ edgePrefix, src });
  const { url, query: existingQueryParams } = qs.parseUrl(crossFlowSrc);

  const queryParams = qs.stringify({
    ...existingQueryParams,
    cloudId,
    locale,
    targetProduct,
    originProduct,
    sourceComponent,
    sourceContext,
    parentUrl: window.top.location.href,
    // query-string does not stringify nested objects
    experimentalOptions: JSON.stringify(experimentalOptions),
    extensions: JSON.stringify(extensions),
    env,
    journey,
  });
  const assembledSrc = `${url}?${queryParams}`;

  const client = useSpaHostClient(
    {
      src: assembledSrc,
      appName: SPA_APP_NAME,
      handshakeEventTimeoutDelayMilliSeconds: 10000,
      readyEventTimeoutDelayMilliSeconds: 20000,
      modalElement: createModalElement(),
      loaderElement: createLoaderElement(),
    },
    [crossFlowSrc],
  );

  useEffect(() => {
    client.on(HostEvents.Error, onError);
    client.on(HostEvents.AnalyticEvent, onAnalyticsEvent);
    client.on(HostEvents.Message, (event) => {
      switch (event.type) {
        case CrossFlowEvents.INITIATE_SPA_CLOSE:
          if (onClose) {
            onClose(event);
          }
          break;
        default:
          break;
      }
    });
    client.init({
      containerElement: iframeContainerElement.current,
      rpcMethods: plugins,
    });
    client.on(HostEvents.Handshake, onHandShake);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const styles = {
    height: '100%',
  };

  return <div style={styles} ref={iframeContainerElement} />;
};
