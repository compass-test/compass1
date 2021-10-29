import {
  createBreadcrumbAPI,
  createBreadcrumbedEventChannel,
} from '@atlassian/commerce-events-telemetry-react/breadcrumbs';
import { createCatchingEventChannel } from '@atlassian/commerce-events-telemetry-react/core';
import type {
  OperationalEventPayload,
  ScreenEventPayload,
  TrackEventPayload,
  UIEventPayload,
} from '@atlassian/commerce-events-telemetry-react/gasv3-bridge';
import type { UserMetric } from '@atlassian/commerce-events-telemetry-react/metal-bridge';
import type { CaptureExceptionPayload } from '@atlassian/commerce-events-telemetry-react/sentry-browser-bridge';

export type {
  UserMetric,
  CaptureExceptionPayload,
  OperationalEventPayload,
  ScreenEventPayload,
  TrackEventPayload,
  UIEventPayload,
};

export type BreadcrumbAttributes = {
  /**
   * If set, this breadcrumb won't be used in any of the data/PM related analytics services.
   */
  isForDevsOnly?: boolean;
  // TODO: Standardize the attributes we send
  /**
   * Just arbitrary set of metadata you can add to your breadcrumbs. ATM they get added directly to GasV3 attributes.
   */
  attributes?: Record<any, any>;
};

const breadcrumbAPI = createBreadcrumbAPI<BreadcrumbAttributes>();
export const {
  breadcrumbMountedEventChannel,
  Breadcrumb,
  useGetBreadcrumbs,
} = breadcrumbAPI;

export const externalGasV3UIEventChannel = createCatchingEventChannel<
  UIEventPayload
>();
export const externalGasV3ScreenEventChannel = createCatchingEventChannel<
  ScreenEventPayload
>();
export const externalGasV3TrackEventChannel = createCatchingEventChannel<
  TrackEventPayload
>();
export const externalGasV3OperationalEventChannel = createCatchingEventChannel<
  OperationalEventPayload
>();

export const externalMetalChannel = createCatchingEventChannel<UserMetric>();

export const externalSentryExceptionChannel = createCatchingEventChannel<
  CaptureExceptionPayload
>();

export const internalGasV3UIEventChannel = createBreadcrumbedEventChannel<
  Omit<UIEventPayload, 'source'>,
  BreadcrumbAttributes
>(breadcrumbAPI, createCatchingEventChannel);
export const internalGasV3ScreenEventChannel = createCatchingEventChannel<
  ScreenEventPayload
>();
export const internalGasV3TrackEventChannel = createBreadcrumbedEventChannel<
  Omit<TrackEventPayload, 'source'>,
  BreadcrumbAttributes
>(breadcrumbAPI, createCatchingEventChannel);
export const internalGasV3OperationalEventChannel = createBreadcrumbedEventChannel<
  Omit<OperationalEventPayload, 'source'>,
  BreadcrumbAttributes
>(breadcrumbAPI, createCatchingEventChannel);

export const internalMetalChannel = createBreadcrumbedEventChannel<
  UserMetric,
  BreadcrumbAttributes
>(breadcrumbAPI, createCatchingEventChannel);

export const internalSentryExceptionChannel = createBreadcrumbedEventChannel<
  CaptureExceptionPayload,
  BreadcrumbAttributes
>(breadcrumbAPI, createCatchingEventChannel);
