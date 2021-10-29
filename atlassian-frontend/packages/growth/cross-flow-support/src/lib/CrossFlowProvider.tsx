import React, {
  ComponentType,
  FunctionComponent,
  Suspense,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import {
  BaseCrossFlowApiProvider,
  OnOpen,
  CompletionStatus,
  Options,
  Journeys,
} from '@atlassiansox/cross-flow-api-internals';

import { analyticsWrapper } from './analytics-helpers/analyticsHelpers';
import { transformEvent } from './analytics-helpers/analyticsTransformers';
import { setProductSignUpLocation } from './redirects-helpers/redirectsHelpers';
import { ErrorBoundary } from './errorBoundary';
import { CrossFlowProviderProps } from './types';
import { IntegrationViewProps } from './view/types';
import { OnUIAnalyticsEvent } from './types';
import { enrichWithPackageDetails } from './enrichWithPackageDetails';
import { enrichWithRequestOptions } from './enrichWithRequestOptions';
import {
  OPERATIONAL_EVENT_TYPE,
  source,
  uiInitialized,
  crossFlowActionSubject,
  openInvoked,
} from './constants';

const IntegrationView = React.lazy(
  () =>
    import(
      /* webpackChunkName: "atlassiansox-cross-flow-support-deferred" */
      /* webpackPrefetch: true */
      './view'
    ),
);

type OnCloseResolver = (completionStatus: CompletionStatus) => void;

/**
 * Generic Cross Flow API provider.
 *
 * Initializes Cross Flow support in product.
 * Renders Cross Flow overlay when requested via context API.
 */

export const createCrossFlowProvider = (
  IntegrationView: ComponentType<IntegrationViewProps>,
): FunctionComponent<CrossFlowProviderProps> => (props) => {
  const {
    children,
    analyticsClient,
    originProduct,
    redirectToWac,
    env,
    plugins = [],
    onError,
    ...baseProviderProps
  } = props;

  const onCloseResolver = useRef<OnCloseResolver>();

  const [firstHandshakeReceived, setFirstHandshakeReceived] = useState(false);

  const fireEvent = useMemo(() => analyticsWrapper(analyticsClient), [
    analyticsClient,
  ]);

  const [requestOptions, setRequestOptions] = useState<Options>();

  const onAnalyticsEvent: OnUIAnalyticsEvent = useCallback(
    (payload) => {
      const gasV3Event = transformEvent(payload);
      if (gasV3Event) {
        const enrichedEvent = enrichWithRequestOptions(
          enrichWithPackageDetails(gasV3Event),
          requestOptions,
        );
        fireEvent(enrichedEvent);
      }
    },
    [fireEvent, requestOptions],
  );

  const onHandShake = useCallback(
    (appName) => {
      if (!firstHandshakeReceived) {
        onAnalyticsEvent({
          payload: {
            eventType: OPERATIONAL_EVENT_TYPE,
            action: uiInitialized,
            actionSubject: crossFlowActionSubject,
            attributes: { appName },
          },
          context: [{ source }],
        });
        setFirstHandshakeReceived(true);
      }
    },
    [firstHandshakeReceived, onAnalyticsEvent],
  );

  const onOpen: OnOpen = useCallback(
    (options) => {
      /**
       * Reset first handshake state to ensure 1:1 value of open invoked and handshake received
       * Caveat that if open api is invoked while cross flow support UI is already mounted there will be mismatch of openInvoked events to uiInitialized events
       */
      setFirstHandshakeReceived(false);

      const analyticsEvent = {
        // setRequestOptions does not update the state right away (updates on the next render) so for the openInvoked event we need to manually append the sourceComponent and sourceContext
        payload: enrichWithRequestOptions(
          {
            eventType: OPERATIONAL_EVENT_TYPE,
            action: openInvoked,
            actionSubject: crossFlowActionSubject,
          },
          options,
        ),
        context: [{ source }],
      };
      onAnalyticsEvent(analyticsEvent);

      // Short circuit requestOptions for WAC expansions
      if (options.journey === Journeys.GET_STARTED && redirectToWac) {
        setProductSignUpLocation(
          options.targetProduct,
          env,
          options.sourceComponent,
          options.sourceContext,
        );
        const completionStatus: CompletionStatus = {};
        return Promise.resolve(completionStatus);
      }

      setRequestOptions(options);
      return new Promise((resolve: OnCloseResolver) => {
        onCloseResolver.current = resolve;
      });
    },
    [onAnalyticsEvent, env, redirectToWac],
  );

  const onClose = useCallback((completionStatus: CompletionStatus) => {
    setFirstHandshakeReceived(false);
    setRequestOptions(undefined);
    onCloseResolver.current && onCloseResolver.current(completionStatus);
  }, []);

  return (
    <BaseCrossFlowApiProvider onOpen={onOpen}>
      {children}

      {requestOptions && (
        <ErrorBoundary onAnalyticsEvent={onAnalyticsEvent} onError={onError}>
          <Suspense fallback={null}>
            <IntegrationView
              {...baseProviderProps}
              {...requestOptions}
              onAnalyticsEvent={onAnalyticsEvent}
              originProduct={originProduct}
              onClose={onClose}
              onHandShake={onHandShake}
              plugins={plugins}
              env={env}
              redirectToWac={redirectToWac}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </BaseCrossFlowApiProvider>
  );
};

export const CrossFlowProvider = createCrossFlowProvider(IntegrationView);
