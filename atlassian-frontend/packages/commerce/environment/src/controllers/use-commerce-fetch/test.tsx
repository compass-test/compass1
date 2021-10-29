import React, { useEffect } from 'react';

// FIXME: Needs Tangerine styling to avoid eslint ATM - Seems to be a bug
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';
import { SentryExceptionListener } from '@atlassian/commerce-telemetry/listeners';

import { OverrideRegistryRoot } from '../use-commerce-override';

import { useCommerceFetch } from './index';

const createSentryScenario = (...fetchArgs: Parameters<typeof fetch>) => {
  const fetchMock = jest.fn();
  const onSentryExceptionEvent = jest.fn();

  let fetchResponse: Promise<any> | undefined;
  const DoFetch = () => {
    const commerceFetch = useCommerceFetch();

    useEffect(() => {
      fetchResponse = commerceFetch(...fetchArgs);
    }, [commerceFetch]);

    return null;
  };

  const SentryScenario = () => (
    <SentryExceptionListener onEvent={onSentryExceptionEvent}>
      <InternalCommerceTelemetryIntegrations>
        <OverrideRegistryRoot overrides={[[fetch, fetchMock]]}>
          <DoFetch />
        </OverrideRegistryRoot>
      </InternalCommerceTelemetryIntegrations>
    </SentryExceptionListener>
  );

  return {
    init: async () => {
      render(<SentryScenario />);

      // Fetch won't finish in time for assertions if we don't do this
      expect(fetchResponse).not.toBeUndefined();
      await fetchResponse;
    },
    fetchMock,
    onSentryExceptionEvent,
  };
};

describe(useCommerceFetch.name, () => {
  describe('Sentry integration works', () => {
    it('logs HTTP >400 errors', async () => {
      const { init, fetchMock, onSentryExceptionEvent } = createSentryScenario(
        '/some/path?thisshouldBeRedacted=true',
      );

      fetchMock.mockReturnValue(new Response(undefined, { status: 400 }));
      await init();

      expect(onSentryExceptionEvent).toBeCalledTimes(1);
      expect(onSentryExceptionEvent).toBeCalledWith(
        expect.objectContaining({
          exception: expect.any(Error),
        }),
      );
      const errorMessage = onSentryExceptionEvent.mock.calls[0][0].exception.toString();
      expect(errorMessage).toContain('/some/path');
      expect(errorMessage).not.toContain('thisshouldBeRedacted=true');
    });

    it('logs rejected fetch promises', async () => {
      const { init, fetchMock, onSentryExceptionEvent } = createSentryScenario(
        new Request('https://some.url.com/some/path?thisshouldBeRedacted'),
      );

      fetchMock.mockReturnValue(new Response(undefined, { status: 400 }));
      await init();

      expect(onSentryExceptionEvent).toBeCalledTimes(1);
      expect(onSentryExceptionEvent).toBeCalledWith(
        expect.objectContaining({
          exception: expect.any(Error),
        }),
      );

      const errorMessage = onSentryExceptionEvent.mock.calls[0][0].exception.toString();
      expect(errorMessage).toContain('https://some.url.com/some/path');
      expect(errorMessage).not.toContain('?thisshouldBeRedacted');
    });
  });
});
