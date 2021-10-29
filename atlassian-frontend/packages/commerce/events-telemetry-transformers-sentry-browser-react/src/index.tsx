import { useCallback } from 'react';

import type {
  CaptureExceptionPayload,
  EventHint,
  TelemetryScopeContext,
} from '@atlassian/commerce-events-bridge-sentry-browser-react';
import {
  createTransformer,
  Listener,
  UseEventDispatchHook,
  UseTransformerHook,
} from '@atlassian/commerce-events-core-react';
import type {
  BreadcrumbedPayload,
  BreadcrumbPayload,
  BreadcrumbPayloads,
} from '@atlassian/commerce-events-telemetry-breadcrumbs-react';

export type { CaptureExceptionPayload };

export type UseSentryTransformerHook<InputEventType> = UseTransformerHook<
  {},
  InputEventType,
  CaptureExceptionPayload
>;
export type PackageInfo = {
  version: string;
  name: string;
};
export type CreateSentryExceptionEventBridgeInput<
  InputEventType,
  BreadcrumbAttributesType extends object
> = {
  from: Listener<BreadcrumbedPayload<InputEventType, BreadcrumbAttributesType>>;
  to: UseEventDispatchHook<CaptureExceptionPayload>;
  useTransformer: UseSentryTransformerHook<InputEventType>;
};

const createBreadcrumbSentryContext = <T extends Record<any, any>>(
  breadcrumbs: BreadcrumbPayload<T>[],
) => {
  const breadcrumbContext: Record<string, any> = {};
  for (const breadcrumb of breadcrumbs) {
    // TODO: Should avoid conflicts
    breadcrumbContext[breadcrumb.name.toString()] = breadcrumb;
  }
  return breadcrumbs;
};

export type BreadcrumbedSentryPayload = BreadcrumbedPayload<
  CaptureExceptionPayload,
  object
>;
export type AddTelemtryInfoToScope = {
  breadcrumbs: BreadcrumbPayloads<object>;
  payload: CaptureExceptionPayload;
};

export type FullCaptureExceptionPayload = {
  exception: any;
  hint: EventHint;
  scopeContext: Partial<TelemetryScopeContext>;
};
/**
 * Creates a copy of original the sentry exception payload but
 * enhanced with extra information like source and telemetry breadcrumbs
 */
export const withSentryExceptionTelemetryInformation = ({
  breadcrumbs,
  payload: { exception, hint, scopeContext },
}: AddTelemtryInfoToScope): FullCaptureExceptionPayload => {
  const errorThatRevealsDispatchStackTrace = new Error();
  const sentryPayload = {
    exception,
    hint: {
      syntheticException: errorThatRevealsDispatchStackTrace,
      ...hint,
    },
    scopeContext: {
      ...scopeContext,
      contexts: {
        ...scopeContext?.contexts,
        telemetryBreadcrumbs: createBreadcrumbSentryContext(breadcrumbs),
      },
    },
  };

  return sentryPayload;
};

export type ArbitraryValueToSentryExceptionInput = {
  breadcrumbedPayload: BreadcrumbedPayload<unknown, object>;
};
export const arbitraryValueToSentryException = ({
  breadcrumbedPayload: { breadcrumbs, payload },
}: ArbitraryValueToSentryExceptionInput) => {
  return withSentryExceptionTelemetryInformation({
    breadcrumbs: breadcrumbs,
    payload: {
      exception: payload,
    },
  });
};

export const createSentryExceptionEventTransformer = <
  InputEventType extends object,
  BreadcrumbAttributesType extends object
>({
  from,
  to,
  useTransformer,
}: CreateSentryExceptionEventBridgeInput<
  InputEventType,
  BreadcrumbAttributesType
>) => {
  // Gotta be outside the scope otherwise hooks will keep recomputing
  const useSentryTransformer = (transformProps: {}) => {
    const transform = useTransformer(transformProps);

    return useCallback(
      ({
        breadcrumbs,
        payload: originalPayload,
      }: BreadcrumbedPayload<
        InputEventType,
        BreadcrumbAttributesType
      >): CaptureExceptionPayload => {
        const sentryPayload = transform(originalPayload);

        return withSentryExceptionTelemetryInformation({
          payload: sentryPayload,
          breadcrumbs,
        });
      },
      [transform],
    );
  };

  const ArbitraryEventToConnectedEvent = createTransformer({
    from,
    to,
    useTransformer: useSentryTransformer,
  });

  return ArbitraryEventToConnectedEvent;
};

/**
 * This will create a bridge that listens to arbitrary objects
 * and uploads them as exceptions in Sentry
 */
export const createSentryExceptionEventTransformerFromArbitraryObject = <
  BreadcrumbAttributesType extends object
>({
  from,
  to,
}: Omit<
  CreateSentryExceptionEventBridgeInput<any, BreadcrumbAttributesType>,
  'useTransformer'
>) =>
  createTransformer({
    from,
    to,
    useTransformer: () =>
      useCallback(
        (
          breadcrumbedPayload: BreadcrumbedPayload<
            any,
            BreadcrumbAttributesType
          >,
        ) =>
          arbitraryValueToSentryException({
            breadcrumbedPayload,
          }),
        [],
      ),
  });
