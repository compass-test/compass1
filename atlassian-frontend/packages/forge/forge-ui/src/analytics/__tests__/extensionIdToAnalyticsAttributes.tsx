import React, { useEffect } from 'react';

import { render } from '@testing-library/react';

import {
  ForgeUIExtensionAnalyticsContext,
  extensionIdToAnalyticsAttributes,
} from '..';

import {
  AnalyticsListener,
  useAnalyticsEvents,
} from '@atlaskit/analytics-next';

it('parses a correct ari', () => {
  expect(
    extensionIdToAnalyticsAttributes(
      'ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key',
    ),
  ).toEqual({
    appId: 'app-id',
    environmentId: 'environment-id',
    groupId: 'static',
    extensionKey: 'test-key',
  });
});

it('handles undefined', () => {
  expect(extensionIdToAnalyticsAttributes(undefined)).toEqual({});
});

it('handles invalid ARIs', () => {
  expect(extensionIdToAnalyticsAttributes('not-an-ari')).toEqual({});
});

describe('ForgeUIExtensionAnalyticsContext', () => {
  it('adds to the analytics context', async () => {
    function AnalyticsOnMount() {
      const { createAnalyticsEvent } = useAnalyticsEvents();
      useEffect(() => {
        createAnalyticsEvent({
          stub: 'event',
        }).fire('my-channel');
      }, [createAnalyticsEvent]);
      return null;
    }
    const onAnalyticsEvent = jest.fn();

    const view = render(
      <AnalyticsListener onEvent={onAnalyticsEvent} channel="*">
        <ForgeUIExtensionAnalyticsContext
          extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key"
          localId="a:b:c:d"
        >
          <>
            <AnalyticsOnMount />
            mounted
          </>
        </ForgeUIExtensionAnalyticsContext>
      </AnalyticsListener>,
    );
    await view.findByText('mounted');

    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        context: [
          {
            forgeUIAttributes: {
              appId: 'app-id',
              environmentId: 'environment-id',
              extensionKey: 'test-key',
              groupId: 'static',
              localId: 'a:b:c:d',
            },
          },
        ],
        payload: {
          stub: 'event',
        },
      }),
      'my-channel',
    );
  });
});
