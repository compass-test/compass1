import { useCallback } from 'react';

import {
  AnalyticsWebClientType,
  Attributes,
  OperationalEventPayload,
  ScreenEventClientType,
  ScreenEventPayload,
  SendEventsComponent,
  SendEventsProps,
  TrackEventClientType,
  TrackEventPayload,
  UIEventClientType,
  UIEventPayload,
  UseTransformerHook,
} from '@atlassian/commerce-events-bridge-gasv3-react';
import {
  createTransformer,
  Listener,
  UseEventDispatchHook,
} from '@atlassian/commerce-events-core-react';
import type {
  BreadcrumbAPI,
  BreadcrumbedEventChannel,
  BreadcrumbedPayload,
  BreadcrumbMountedListenerComponent,
  BreadcrumbMountedPayload,
  BreadcrumbName,
  BreadcrumbPayload,
  BreadcrumbPayloads,
} from '@atlassian/commerce-events-telemetry-breadcrumbs-react';
import type { UIAnalyticsPayload } from '@atlassian/commerce-events-ui-react';
export type {
  Attributes,
  AnalyticsWebClientType,
  OperationalEventPayload,
  ScreenEventPayload,
  ScreenEventClientType,
  TrackEventClientType,
  UIEventClientType,
  TrackEventPayload,
  UIEventPayload,
  SendEventsComponent,
  SendEventsProps,
  BreadcrumbAPI,
  BreadcrumbedEventChannel,
  BreadcrumbedPayload,
  BreadcrumbName,
  BreadcrumbPayload,
  BreadcrumbPayloads,
};

export {
  combineBridges,
  createGasV3EventChannelBridge,
  createGasV3OperationalEventChannelBridge,
  createGasV3ScreenEventChannelBridge,
  createGasV3TrackEventChannelBridge,
  createGasV3UIEventChannelBridge,
  withClient,
} from '@atlassian/commerce-events-bridge-gasv3-react';

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

type BreadcrumbFieldTypes = {
  attributes?: Record<any, any>;
};
const breadcrumbsToAttributes = (
  breadcrumbs: BreadcrumbPayload<BreadcrumbFieldTypes>[],
): Attributes =>
  Object.assign(
    {},
    ...breadcrumbs.map((breadcrumb) => breadcrumb.attributes ?? {}),
  );

export type UseGasV3TransformerHook<
  InputEventType,
  GasV3EventType
> = UseTransformerHook<{}, InputEventType, Omit<GasV3EventType, 'source'>>;

export type GetTelemetryGasV3SharedInfoInput = {
  breadcrumbs: BreadcrumbPayloads<BreadcrumbFieldTypes>;
};
export const getTelemetryGasV3SharedInfo = ({
  breadcrumbs,
}: GetTelemetryGasV3SharedInfoInput) => {
  const source = selectInnerMostBreadcrumbName(breadcrumbs);
  const attributes = breadcrumbsToAttributes(breadcrumbs);

  // TODO: Remove the as cast
  return {
    attributes,
    source,
  };
};

export type CreateGasV3IntegrationInput<
  InputEventType,
  BreadcrumbAttributesType,
  GasV3EventType
> = {
  from: Listener<BreadcrumbedPayload<InputEventType, BreadcrumbAttributesType>>;
  to: UseEventDispatchHook<GasV3EventType>;
  useTransformer: UseGasV3TransformerHook<InputEventType, GasV3EventType>;
};
export const createGasV3EventTransformer = <
  InputEventType,
  BreadcrumbAttributesType extends object,
  OutputEventType extends
    | UIEventPayload
    | TrackEventPayload
    | OperationalEventPayload
>({
  from,
  to,
  useTransformer,
}: CreateGasV3IntegrationInput<
  InputEventType,
  BreadcrumbAttributesType,
  OutputEventType
>) => {
  // Gotta be outside the scope otherwise hooks will keep recomputing
  const useGasV3Transformer = (transformProps: {}) => {
    const transform = useTransformer(transformProps);

    return useCallback(
      ({
        breadcrumbs,
        payload: originalPayload,
      }: BreadcrumbedPayload<
        InputEventType,
        BreadcrumbAttributesType
      >): OutputEventType => {
        const source = selectInnerMostBreadcrumbName(breadcrumbs);
        const breadcrumbAttributes = breadcrumbsToAttributes(breadcrumbs);
        const newPartialPayload = transform(originalPayload);
        // TODO: Remove the as cast
        return {
          ...newPartialPayload,
          attributes: {
            ...breadcrumbAttributes,
            ...newPartialPayload.attributes,
          },
          source,
        } as OutputEventType;
      },
      [transform],
    );
  };

  const ArbitraryEventToConnectedEvent = createTransformer({
    from,
    to,
    useTransformer: useGasV3Transformer,
  });

  return ArbitraryEventToConnectedEvent;
};

export const createGasV3UIEventTransformer = createGasV3EventTransformer;
export type CreateGasV3UIEventBridgeFromUIAnalyticsInput<
  BreadcrumbAttributesType
> = Omit<
  CreateGasV3IntegrationInput<
    UIAnalyticsPayload,
    BreadcrumbAttributesType,
    UIEventPayload
  >,
  'useTransformer'
>;

export const createGasV3TrackEventTransformer = createGasV3EventTransformer;

export const createGasV3OperationalEventTransformer = createGasV3EventTransformer;

export type ScreenRequiredBreadcrumbAPI = {
  breadcrumbMountedEventChannel: {
    Listener: BreadcrumbMountedListenerComponent<object>;
  };
};

export type CreateGasV3ScreenEventInput = {
  to: UseEventDispatchHook<ScreenEventPayload>;
  breadcrumbAPI: ScreenRequiredBreadcrumbAPI;
};
export const breadcrumbMountedPayloadToGasV3ScreenEvent = ({
  breadcrumbs,
}: BreadcrumbMountedPayload<object>) => {
  const name = selectInnerMostBreadcrumbName(breadcrumbs);
  const attributes = breadcrumbsToAttributes(breadcrumbs);

  return {
    name,
    attributes,
  };
};
export const createGasV3ScreenEventTransformer = ({
  to,
  breadcrumbAPI: { breadcrumbMountedEventChannel },
}: CreateGasV3ScreenEventInput) => {
  const BreadcrumbRenderedToScreenEvent = createTransformer({
    from: breadcrumbMountedEventChannel.Listener,
    to,
    useTransformer: () => breadcrumbMountedPayloadToGasV3ScreenEvent,
  });

  return BreadcrumbRenderedToScreenEvent;
};
