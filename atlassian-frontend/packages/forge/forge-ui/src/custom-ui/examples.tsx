/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useMemo } from 'react';
import { createMockClient } from 'mock-apollo-client';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import AnalyticsListener from '@atlaskit/analytics-next/AnalyticsListener';

import {
  useExtensionList,
  getActiveTunnelsQuery,
  getExtensionListQuery,
} from '../web-client';
import { makeModalThreeLOPromptForCustomUI } from '../components';

import { Iframe } from './index';
import { useNavigation } from './iframe/useNavigation';

export const IframeExtension = () => {
  const client = useMemo(() => {
    const mockClient = createMockClient();
    mockClient.setRequestHandler(getExtensionListQuery(), async () => {
      return {
        data: {
          extensionContexts: [
            {
              id:
                'ari:cloud:confluence::site/DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b',
              extensionsByType: [
                {
                  id:
                    'ari:cloud:ecosystem::extension/petes-app-1/f53d9af9-0262-4aab-a7ef-8ce3f7b5b3d7/static/hello-world',
                  appOwner: { name: 'App Owner' },
                  environmentType: 'DEVELOPMENT',
                  properties: {
                    title: 'Example app',
                    resource: 'example-resource-key',
                  },
                  type: 'abc',
                  installationId: 'install-10',
                  appVersion: '1.0.0',
                },
              ],
            },
          ],
        },
      };
    });
    mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => {
      return {
        data: {
          activeTunnels: {
            customUI: [
              {
                resourceKey: 'example-resource-key',
                tunnelUrl: 'http://localhost:8080',
              },
            ],
          },
        },
      };
    });

    return mockClient;
  }, []);

  const moduleType = 'product:module';

  const { extensions } = useExtensionList({
    client,
    contextIds: ['story', 'book'],
    type: moduleType,
  });

  if (extensions.length === 0) {
    return null;
  }

  return extensions
    .filter((ext) => !!ext.properties.resource)
    .map((iframeExt) => (
      <div
        key={iframeExt.id}
        css={css`
          width: 100%;
          height: 400px;
        `}
      >
        <Iframe
          accountId="account-id"
          apolloClient={client}
          contextIds={['story']}
          coreData={{ cloudId: 'cloud-id', localId: 'local-id' }}
          extension={iframeExt}
          extensionData={{ type: moduleType }}
          height={'400px'}
          width={'100%'}
        />
      </div>
    ));
};

export const IframeModalExtension = () => {
  const client = useMemo(() => {
    const mockClient = createMockClient();
    mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => {
      return {
        data: {
          activeTunnels: {
            customUI: [
              {
                resourceKey: 'example-resource-key',
                tunnelUrl: 'http://localhost:8080',
              },
            ],
          },
        },
      };
    });
    return mockClient;
  }, []);
  return (
    <Iframe
      accountId="account-id"
      apolloClient={client}
      contextIds={['story']}
      extension={{
        environmentId: 'dev',
        id:
          'ari:cloud:ecosystem::extension/petes-app-1/f53d9af9-0262-4aab-a7ef-8ce3f7b5b3d7/static/hello-world',
        appOwner: { name: 'App Owner', accountId: '123', picture: '123' },
        environmentType: 'DEVELOPMENT',
        properties: {
          title: 'Example app',
          resource: 'example-resource-key',
        },
        type: 'abc',
        installationId: 'install-10',
        appVersion: '1.0.0',
      }}
      components={(defaults) => ({
        ...defaults,
        ThreeLOPrompt: makeModalThreeLOPromptForCustomUI({
          onClose: action('3LO closed'),
          appName: 'example app',
        }),
      })}
      coreData={{ cloudId: 'cloud-id', localId: 'local-id' }}
      extensionData={{ type: 'product:module' }}
    />
  );
};

const ExternalLinkModalInner = ({
  extension,
  url,
}: {
  extension: { type: string; properties: { title: string } };
  url: string;
}) => {
  const { getModalJsx, onNavigate } = useNavigation({
    extension,
  });
  return (
    <div>
      {getModalJsx()}
      <button
        onClick={() => {
          void onNavigate({
            type: 'new-tab',
            url,
          });
        }}
      >
        open
      </button>
    </div>
  );
};

// We need to wrap the usage of the `useNavigation` hook so that the analytics events are captured by the listener
export const ExternalLinkModal = () => {
  const url = text('url', 'https://www.example.com?query=string#fragment');

  return (
    <AnalyticsListener channel="forge-ui" onEvent={action('event')}>
      <ExternalLinkModalInner
        url={url}
        extension={{
          properties: {
            title: 'My app',
          },
          type: 'story:book',
        }}
      />
    </AnalyticsListener>
  );
};
ExternalLinkModal.decorators = [withKnobs];
