import React, {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
} from 'react';
import { VERSION as V0, createAPIv0 } from './api/v0';
import {
  CrossFlowContextType,
  NegotiateCrossFlowAPI,
  OnOpen,
  Reasons,
  WithCrossFlowProps,
} from './types';

const LATEST_VERSION = V0;

/**
 * Private Cross Flow context
 *
 * Not to be used directly other than by useCrossFlow and BaseCrossFlowApiProvider
 */
const CrossFlowContext = createContext<NegotiateCrossFlowAPI>(() => ({
  isEnabled: false,
  reason: Reasons.NO_PROVIDER,
}));

/**
 * A factory for Cross Flow API negotiator
 * Negotiator will attempt to instantiate a requested version of the API context or fallback
 * to default one (NO_API_SUPPORT)
 */
export const createNegotiateApi = (onOpen: OnOpen): NegotiateCrossFlowAPI => (
  version,
) => {
  switch (version) {
    case V0:
      return {
        isEnabled: true,
        api: createAPIv0(onOpen),
      };

    default:
      return {
        isEnabled: false,
        reason: Reasons.NO_API_SUPPORT,
      };
  }
};

/**
 * Cross Flow API provider
 *
 * It's responsibility is to abstract CrossFlowContext.Provider from product integration modules and also
 * to supply a method of negotiating API version with the consumer.
 *
 * (Not to be used directly by products, but rather by (product specific) integration module)
 *
 * @param onOpen - Callback that will be invoked when API consumer requests to kick off expand process
 */
export const BaseCrossFlowApiProvider: FunctionComponent<{
  onOpen: OnOpen;
}> = ({ onOpen, children }) => {
  const negotiateApi = useMemo(() => createNegotiateApi(onOpen), [onOpen]);

  return (
    <CrossFlowContext.Provider value={negotiateApi}>
      {children}
    </CrossFlowContext.Provider>
  );
};

/**
 * React hook for accessing Cross Flow API
 */
export const useCrossFlow = (): CrossFlowContextType => {
  const negotiateApi = useContext(CrossFlowContext);
  return useMemo(() => negotiateApi(LATEST_VERSION), [negotiateApi]);
};

/**
 * React HOC for wrapping class components with the above React hook
 * @param WrappedComponent
 */
export function withCrossFlow<P>(
  //component coming in here has no crossflow type yet, but expects it
  WrappedComponent: React.ComponentType<P & WithCrossFlowProps>,
): React.ComponentType<P> {
  const ComponentWithCrossFlow = (props: P) => {
    const crossFlow = useCrossFlow();
    return <WrappedComponent {...props} crossFlow={crossFlow} />;
  };
  ComponentWithCrossFlow.displayName = `withCrossFlow(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithCrossFlow;
}
