import { FC } from 'react';

export type {
  EventListenerCallback,
  UseEventDispatchHook,
} from '@atlassian/commerce-events-telemetry-react/core';
export type {
  EventHint,
  CaptureExceptionPayload,
} from '@atlassian/commerce-events-telemetry-react/sentry-browser-bridge';
export type { UserMetric } from '@atlassian/commerce-events-telemetry-react/metal-bridge';
import { createAtlaskitToEventChannelRepackager } from '@atlassian/commerce-events-telemetry-react/atlaskit';
import { withBreadcrumb as baseWithBreadcrumb } from '@atlassian/commerce-events-telemetry-react/breadcrumbs';

export type {
  Attributes,
  OperationalEventPayload,
  ScreenEventPayload,
  TrackEventPayload,
  UIEventPayload,
} from '@atlassian/commerce-events-telemetry-react/gasv3-bridge';

import {
  Breadcrumb,
  BreadcrumbAttributes,
  breadcrumbMountedEventChannel,
  internalGasV3OperationalEventChannel,
  internalGasV3ScreenEventChannel,
  internalGasV3TrackEventChannel,
  internalGasV3UIEventChannel,
  internalMetalChannel,
  internalSentryExceptionChannel,
} from '../channels';

export const {
  useBreadcrumbedEventDispatch: useGasV3UIEventDispatch,
} = internalGasV3UIEventChannel;
export const {
  useEventDispatch: useGasV3ScreenEventDispatch,
} = internalGasV3ScreenEventChannel;
export const {
  useBreadcrumbedEventDispatch: useGasV3TrackEventDispatch,
} = internalGasV3TrackEventChannel;
export const {
  useBreadcrumbedEventDispatch: useGasV3OperationalEventDispatch,
} = internalGasV3OperationalEventChannel;

export const {
  useBreadcrumbedEventDispatch: useMetalDispatch,
} = internalMetalChannel;

export const {
  useBreadcrumbedEventDispatch: useSentryExceptionDispatch,
} = internalSentryExceptionChannel;

export const RepackageAtlaskitEvent = createAtlaskitToEventChannelRepackager(
  useGasV3UIEventDispatch,
);

/**
 * TODO: Old APIs need this to be exposed. Remove whatever's using this and then remove this.
 */
export const {
  Listener: BreadcrumbMountedListener,
} = breadcrumbMountedEventChannel;
export { Breadcrumb };
export type { BreadcrumbAttributes };

export const withBreadcrumb = <ComponentPropsType>(
  Component: FC<ComponentPropsType>,
  name: string,
  attributes?: BreadcrumbAttributes,
) => baseWithBreadcrumb(Component, Breadcrumb, name, attributes);
