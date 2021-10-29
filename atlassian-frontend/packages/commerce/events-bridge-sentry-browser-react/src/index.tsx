import React, { PropsWithChildren, useCallback } from 'react';

import type { EventHint, ScopeContext, Severity } from '@sentry/types';

import type { Listener as ListenerType } from '@atlassian/commerce-events-core-react';

export type { EventHint, Severity, ScopeContext };

export type CaptureMessagePayload = {
  message: string;
  level?: Severity;
  hint?: EventHint;
  scopeContext?: ScopeContext;
};

/**
 * The parts of {@link ScopeContext} that the telemetry API actually uses.
 */
export type TelemetryScopeContext = Pick<
  ScopeContext,
  'tags' | 'contexts' | 'level' | 'fingerprint'
>;

export type CaptureExceptionPayload = {
  exception: any;
  hint?: EventHint;
  scopeContext?: Partial<TelemetryScopeContext>;
};

export type CaptureExceptionClient = {
  captureException: (
    payload: any,
    scopeContext?: Partial<TelemetryScopeContext>,
  ) => any;
};
export type SentryBrowserIntegrationProps = PropsWithChildren<{
  client: CaptureExceptionClient;
  Listener: ListenerType<CaptureExceptionPayload>;
}>;
export const SentryBrowserIntegration = ({
  Listener,
  client,
  children,
}: SentryBrowserIntegrationProps) => (
  <Listener
    onEvent={useCallback(
      ({ exception, scopeContext }) => {
        client.captureException(exception, scopeContext);
      },
      [client],
    )}
  >
    {children}
  </Listener>
);
