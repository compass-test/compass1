import { MutableRefObject, useCallback } from 'react';

import type { UserMetric } from '@atlassian/commerce-events-bridge-metal-react';
import {
  createTransformer,
  Listener,
  UseEventDispatchHook,
  UseTransformerHook,
} from '@atlassian/commerce-events-core-react';
import type {
  BreadcrumbedPayload,
  BreadcrumbMountedPayload,
  BreadcrumbPayload,
  BreadcrumbPayloads,
} from '@atlassian/commerce-events-telemetry-breadcrumbs-react';

export {
  combineBridges,
  createMetalEventChannel,
  createMetalEventChannelBridge,
  withClient,
} from '@atlassian/commerce-events-bridge-metal-react';

export type {
  BreadcrumbedEventChannel,
  BreadcrumbedPayload,
  BreadcrumbName,
  BreadcrumbPayload,
  BreadcrumbPayloads,
} from '@atlassian/commerce-events-telemetry-breadcrumbs-react';

export type {
  UserMetric,
  MetalClientInterface,
  EventChannelBridge,
  EventChannelFactory,
  SendEventsProps,
} from '@atlassian/commerce-events-bridge-metal-react';

// FIXME: This is a hack to stop @atlassian/metal-client from complaining since MetricName is not exported
export type HackUserMetric = Omit<UserMetric, 'name'> & {
  name: UserMetric['name'];
};

// TODO: Make a package for utilitys like this one
const selectInnerMostBreadcrumbName = <T extends object>(
  breadcrumbs: BreadcrumbPayload<T>[],
): string => {
  const NO_BREADCRUMB_FOUND_NAME = 'none';
  if (breadcrumbs.length <= 0) {
    return NO_BREADCRUMB_FOUND_NAME;
  }
  return breadcrumbs[breadcrumbs.length - 1].name.toString();
};

// TODO: Could omit more fields in certain bridge factory methods
export type UseMetalTransformerHook<InputEventType> = UseTransformerHook<
  {},
  InputEventType,
  HackUserMetric
>;
export type CreateMetalEventBridgeInput<InputEventType> = {
  from: Listener<BreadcrumbedPayload<InputEventType, any>>;
  to: UseEventDispatchHook<HackUserMetric>;
  useTransformer: UseMetalTransformerHook<InputEventType>;
};

export type GetTelmetryMetalMetricInfoInput = {
  breadcrumbs: BreadcrumbPayloads<object>;
};

export const getTelemetryMetalMetricInfo = ({
  breadcrumbs,
}: GetTelmetryMetalMetricInfoInput) => {
  const page = selectInnerMostBreadcrumbName(breadcrumbs);

  return {
    // Note: The metal client won't accept page: undefined which is why we have to spread like this
    ...(page === null ? null : { page }),
  };
};
export const createMetalEventTransformer = <InputEventType extends any>({
  from,
  to,
  useTransformer,
}: CreateMetalEventBridgeInput<InputEventType>) => {
  // Gotta be outside the scope otherwise hooks will keep recomputing
  const useMetalTransformer = (transformProps: {}) => {
    const transform = useTransformer(transformProps);

    return useCallback(
      ({
        breadcrumbs,
        payload: originalPayload,
      }: BreadcrumbedPayload<InputEventType, any>): HackUserMetric => ({
        ...transform(originalPayload),
        ...getTelemetryMetalMetricInfo({ breadcrumbs }),
      }),
      [transform],
    );
  };

  const ArbitraryEventToConnectedEvent = createTransformer({
    from,
    to,
    useTransformer: useMetalTransformer,
  });

  return ArbitraryEventToConnectedEvent;
};

export type TransformedMetalEventBridgeInput<InputEventType> = Omit<
  CreateMetalEventBridgeInput<InputEventType>,
  'useTransformer'
>;

/**
 * @param startTimeRef Just a reference with a number in it.
 * This number should represent the start time of a whatever you're timing.
 * @atlassian/commerce-events-timing-react is designed to work with this hook.
 */
export const getTimingMetricFieldsFromBreadcrumb = <T extends any>(
  { payload }: BreadcrumbMountedPayload<T>,
  startTimeRef: MutableRefObject<number>,
) => {
  const now = Date.now();

  return {
    value: now - startTimeRef.current,
    page: payload.name.toString(),
  };
};

export const createBasicMetalEventTransformer = (
  input: TransformedMetalEventBridgeInput<any>,
  metric: HackUserMetric,
) =>
  createMetalEventTransformer({
    ...input,
    useTransformer: () => useCallback(() => metric, []),
  });
