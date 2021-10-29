import React, { FC, PropsWithChildren, useCallback } from 'react';

import {
  BreadcrumbedPayload,
  BreadcrumbPayloads,
} from '@atlassian/commerce-events-telemetry-react/breadcrumbs';
import {
  Listener as ListenerType,
  nestListeners,
} from '@atlassian/commerce-events-telemetry-react/core';
import type {
  OperationalEventPayload,
  ScreenEventPayload,
  TrackEventPayload,
  UIEventPayload,
} from '@atlassian/commerce-events-telemetry-react/gasv3-bridge';
import {
  breadcrumbMountedPayloadToGasV3ScreenEvent,
  getTelemetryGasV3SharedInfo,
} from '@atlassian/commerce-events-telemetry-react/gasv3-transformer';
import type { UserMetric } from '@atlassian/commerce-events-telemetry-react/metal-bridge';
import { getTelemetryMetalMetricInfo } from '@atlassian/commerce-events-telemetry-react/metal-transformer';
import {
  CaptureExceptionPayload,
  EventHint,
} from '@atlassian/commerce-events-telemetry-react/sentry-browser-bridge';
import { withSentryExceptionTelemetryInformation } from '@atlassian/commerce-events-telemetry-react/sentry-browser-transformer';
import {
  createAnalyticsClient,
  createMonitoringClient,
  createSentryClient,
} from '@atlassian/commerce-telemetry-clients';
import { Scope, Severity } from '@atlassian/commerce-telemetry-clients/sentry';

import {
  Breadcrumb,
  BreadcrumbAttributes,
  breadcrumbMountedEventChannel,
  externalGasV3OperationalEventChannel,
  externalGasV3ScreenEventChannel,
  externalGasV3TrackEventChannel,
  externalGasV3UIEventChannel,
  externalMetalChannel,
  externalSentryExceptionChannel,
  internalGasV3OperationalEventChannel,
  internalGasV3ScreenEventChannel,
  internalGasV3TrackEventChannel,
  internalGasV3UIEventChannel,
  internalMetalChannel,
  internalSentryExceptionChannel,
} from './common/utils/channels';

export type {
  OperationalEventPayload,
  ScreenEventPayload,
  TrackEventPayload,
  UIEventPayload,
  Severity,
  EventHint,
  CaptureExceptionPayload,
  ListenerType,
  UserMetric,
};

export { Breadcrumb };
export { catalog } from '@atlassian/commerce-events-telemetry-react/metal-bridge';

// eslint-disable-next-line @atlassian/tangerine/export/no-export-all
export * as ProbabilityOfBug from './common/utils/probability-of-bug';

export { useTaskTracker } from './common/utils/task-tracker';

export { isSuccessfulTaskResult } from './common/utils/task-tracker';
export type {
  TaskCallbackFailureResult,
  BaseTaskInfo,
  SharedTaskEventData,
  BaseStartTaskCallback,
  StartTaskCallback,
  TaskCallback,
  TaskCallbackResult,
  TaskCallbackSuccessResult,
  TaskOptions,
  SubmitSuccessTaskFn,
  SubmitFailureTaskFn,
  SuccessData,
  UseBaseTaskTrackerHook,
  UseTaskTrackerHook,
  FailureData,
} from './common/utils/task-tracker';

// eslint-disable-next-line @atlassian/tangerine/export/no-export-all
export * as Service from './common/utils/service';

const lazyContructor = <T,>(factory: () => T) => {
  let fabricated: T | undefined;
  return (): T => {
    if (!fabricated) {
      fabricated = factory();
    }
    return fabricated;
  };
};

// Construct clients lazily to avoid using DOM APIs on import
const getMetalClient = lazyContructor(createMonitoringClient);
const getAnalyticsClient = lazyContructor(createAnalyticsClient);
const getSentryClient = lazyContructor(createSentryClient);

export type ChildPackageListenerModule = {
  GasV3OperationalEventListener: ListenerType<OperationalEventPayload>;
  GasV3ScreenEventListener: ListenerType<ScreenEventPayload>;
  GasV3TrackEventListener: ListenerType<TrackEventPayload>;
  GasV3UIEventListener: ListenerType<UIEventPayload>;
  MetalListener: ListenerType<UserMetric>;
  SentryExceptionListener: ListenerType<CaptureExceptionPayload>;
};

type ChildVersionFragmentationSafeGuardInput = {
  childPackageListenerModule: ChildPackageListenerModule;
};

const SinglePackageSafeGuard = ({
  children,
  childPackageListenerModule,
}: PropsWithChildren<ChildVersionFragmentationSafeGuardInput>) => {
  const gasV3UIEventDispatch = externalGasV3UIEventChannel.useEventDispatch();
  const gasV3ScreenEventDispatch = externalGasV3ScreenEventChannel.useEventDispatch();
  const gasV3TrackEventDispatch = externalGasV3TrackEventChannel.useEventDispatch();
  const gasV3OperationalEventDispatch = externalGasV3OperationalEventChannel.useEventDispatch();
  const metalDispatch = externalMetalChannel.useEventDispatch();
  const sentryExceptionDispatch = externalSentryExceptionChannel.useEventDispatch();

  return nestListeners(
    children,
    [
      // Don't bother redispatching if it's the current package and child package listeners are the same component
      childPackageListenerModule.GasV3UIEventListener !==
      externalGasV3UIEventChannel.Listener
        ? {
            Listener: childPackageListenerModule.GasV3UIEventListener,
            onEvent: gasV3UIEventDispatch,
          }
        : null,
      childPackageListenerModule.GasV3ScreenEventListener !==
      externalGasV3ScreenEventChannel.Listener
        ? {
            Listener: childPackageListenerModule.GasV3ScreenEventListener,
            onEvent: gasV3ScreenEventDispatch,
          }
        : null,
      childPackageListenerModule.GasV3TrackEventListener !==
      externalGasV3TrackEventChannel.Listener
        ? {
            Listener: childPackageListenerModule.GasV3TrackEventListener,
            onEvent: gasV3TrackEventDispatch,
          }
        : null,
      childPackageListenerModule.GasV3OperationalEventListener !==
      externalGasV3UIEventChannel.Listener
        ? {
            Listener: childPackageListenerModule.GasV3OperationalEventListener,
            onEvent: gasV3OperationalEventDispatch,
          }
        : null,
      childPackageListenerModule.MetalListener !== externalMetalChannel.Listener
        ? {
            Listener: childPackageListenerModule.MetalListener,
            onEvent: metalDispatch,
          }
        : null,
      childPackageListenerModule.SentryExceptionListener !==
      externalSentryExceptionChannel.Listener
        ? {
            Listener: childPackageListenerModule.SentryExceptionListener,
            onEvent: sentryExceptionDispatch,
          }
        : null,
    ].filter((input): input is Exclude<typeof input, null> => input !== null),
  );
};

export type VersionFragmentationSafeGuardProps = PropsWithChildren<{
  childPackageListenerModules: ChildPackageListenerModule[];
}>;
export const ChannelVersionFragmentationSafeGuard = ({
  childPackageListenerModules,
  children,
}: VersionFragmentationSafeGuardProps) => {
  let wrappedChildren = <>{children}</>;
  for (const module of childPackageListenerModules) {
    wrappedChildren = SinglePackageSafeGuard({
      children: wrappedChildren,
      childPackageListenerModule: module,
    });
  }

  return wrappedChildren;
};

const getNonDevBreadcrumbs = (
  breadcrumbs: BreadcrumbPayloads<BreadcrumbAttributes>,
) => {
  return breadcrumbs.filter((breadcrumb) => !breadcrumb.isForDevsOnly);
};

const withCommercePackagesGasV3SharedInfo = <
  T extends Omit<
    TrackEventPayload | UIEventPayload | OperationalEventPayload,
    'source'
  >
>(
  breadcrumbedPayload: BreadcrumbedPayload<T, BreadcrumbAttributes>,
) => {
  const sharedInfo = getTelemetryGasV3SharedInfo({
    breadcrumbs: getNonDevBreadcrumbs(breadcrumbedPayload.breadcrumbs),
  });

  return {
    ...sharedInfo,
    ...breadcrumbedPayload.payload,
    attributes: {
      ...breadcrumbedPayload.payload.attributes,
      ...sharedInfo.attributes,
    },
  };
};

const BreadcrumbMountedToScreenTransformer: FC = ({ children }) => {
  const internalGasV3ScreenEventDispatch = internalGasV3ScreenEventChannel.useEventDispatch();

  return (
    <breadcrumbMountedEventChannel.Listener
      onEvent={useCallback(
        (breadcrumbPayload) => {
          if (!breadcrumbPayload.payload.isForDevsOnly) {
            const gasV3ScreenPayload = breadcrumbMountedPayloadToGasV3ScreenEvent(
              breadcrumbPayload,
            );

            internalGasV3ScreenEventDispatch(gasV3ScreenPayload);
          }
        },
        [internalGasV3ScreenEventDispatch],
      )}
    >
      {children}
    </breadcrumbMountedEventChannel.Listener>
  );
};

export const InternalCommerceTelemetryIntegrations: FC = ({ children }) => {
  const gasV3UIEventDispatch = externalGasV3UIEventChannel.useEventDispatch();
  const gasV3ScreenEventDispatch = externalGasV3ScreenEventChannel.useEventDispatch();
  const gasV3TrackEventDispatch = externalGasV3TrackEventChannel.useEventDispatch();
  const gasV3OperationalEventDispatch = externalGasV3OperationalEventChannel.useEventDispatch();
  const metalDispatch = externalMetalChannel.useEventDispatch();
  const sentryExceptionDispatch = externalSentryExceptionChannel.useEventDispatch();

  const childrenWrappedInScreenTransformer = (
    <BreadcrumbMountedToScreenTransformer>
      {children}
    </BreadcrumbMountedToScreenTransformer>
  );

  return nestListeners(childrenWrappedInScreenTransformer, [
    {
      Listener: internalGasV3UIEventChannel.Listener,
      onEvent: useCallback(
        (breadcrumbedPayload) => {
          const gasV3Payload = withCommercePackagesGasV3SharedInfo(
            breadcrumbedPayload,
          );

          getAnalyticsClient().sendUIEvent(gasV3Payload);
          gasV3UIEventDispatch(gasV3Payload);
        },
        [gasV3UIEventDispatch],
      ),
    },
    {
      Listener: internalGasV3ScreenEventChannel.Listener,
      onEvent: useCallback(
        (payload) => {
          getAnalyticsClient().sendScreenEvent(payload);
          gasV3ScreenEventDispatch(payload);
        },
        [gasV3ScreenEventDispatch],
      ),
    },
    {
      Listener: internalGasV3TrackEventChannel.Listener,
      onEvent: useCallback(
        (breadcrumbedPayload) => {
          const gasV3Payload = withCommercePackagesGasV3SharedInfo(
            breadcrumbedPayload,
          );

          getAnalyticsClient().sendTrackEvent(gasV3Payload);
          gasV3TrackEventDispatch(gasV3Payload);
        },
        [gasV3TrackEventDispatch],
      ),
    },
    {
      Listener: internalGasV3OperationalEventChannel.Listener,
      onEvent: useCallback(
        (breadcrumbedPayload) => {
          const gasV3Payload = withCommercePackagesGasV3SharedInfo(
            breadcrumbedPayload,
          );

          getAnalyticsClient().sendOperationalEvent(gasV3Payload);
          gasV3OperationalEventDispatch(gasV3Payload);
        },
        [gasV3OperationalEventDispatch],
      ),
    },
    {
      Listener: internalMetalChannel.Listener,
      onEvent: useCallback(
        (breadcrumbedPayload) => {
          const metalPayload = {
            ...getTelemetryMetalMetricInfo(breadcrumbedPayload),
            ...breadcrumbedPayload.payload,
          };

          getMetalClient().metric.submit(metalPayload);
          metalDispatch(metalPayload);
        },
        [metalDispatch],
      ),
    },
    {
      Listener: internalSentryExceptionChannel.Listener,
      onEvent: useCallback(
        (breadcrumbedPayload) => {
          const payload = withSentryExceptionTelemetryInformation(
            breadcrumbedPayload,
          );
          const { exception, hint, scopeContext } = payload;

          const scope = new Scope();

          // TODO: There are alternative ways of doing this. E.g. Using eventFromException. Once decided, we should move it to the Sentry transformers package
          scope.setTags(scopeContext.tags ?? {});
          for (const [key, context] of Object.entries(
            scopeContext.contexts ?? {},
          )) {
            scope.setContext(key, context);
          }
          if (scopeContext.fingerprint !== undefined) {
            scope.setFingerprint(scopeContext.fingerprint);
          }
          scope.setLevel(scopeContext.level ?? Severity.Critical);

          getSentryClient().captureException(exception, hint, scope);
          sentryExceptionDispatch(payload);
        },
        [sentryExceptionDispatch],
      ),
    },
  ]);
};
