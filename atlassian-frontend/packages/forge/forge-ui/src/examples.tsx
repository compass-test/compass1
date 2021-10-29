/** @jsx jsx */
import { mockMentionsProviderPromise } from '@atlassian/aux-test-utils';
import { ProductEnvironment } from '@atlassian/forge-ui-types';

import { mockGetRecommendations } from '@atlassian/ptc-test-utils';
import { jsx } from '@emotion/core';
import ApolloClient from 'apollo-client';
import { useEffect, useMemo } from 'react';
import { ForgeUIExtensionAnalyticsContext } from '.';
import {
  makeUser as makeAvatar,
  makeUserGroup as makeAvatarStack,
  makeUserPicker,
} from './components';
import { ForgeUIExtensionPointProvider } from './provider';
import { RendererNext } from './renderer';

import { getAnalyticsWebClient } from './storybook-utils/analyticsWebClient';
import { apps } from './storybook-utils/apps';
import { mockClientWithApps } from './storybook-utils/localMock';
import { useExtensionList } from './web-client';
import { useWebRuntime } from './web-runtime';

// mock smart user picker endpoint
mockGetRecommendations();

const Extension = ({
  client,
  extension,
}: {
  client: ApolloClient<any>;
  extension: { id: string };
}) => {
  const webRuntimeProps = {
    apolloClient: client,
    contextIds: ['story', 'book'],
    extensionId: extension.id,
    coreData: { localId: 'localId', cloudId: 'cloudId' },
  };
  const [dispatch, { forgeDoc, error, loading }] = useWebRuntime(
    webRuntimeProps,
  );

  useEffect(() => {
    dispatch({ type: 'render', extensionData: {} });
  }, [dispatch]);

  return (
    <RendererNext
      forgeDoc={forgeDoc}
      loading={loading}
      error={error}
      dispatch={dispatch}
      components={(defaultComponents) => ({
        ...defaultComponents,
        Avatar: makeAvatar({ client }),
        AvatarStack: makeAvatarStack({ client }),
        UserPicker: makeUserPicker({
          client,
          mentionProvider: mockMentionsProviderPromise,
          accountId: 'current-user-aaid',
          cloudId: 'cloud-id',
          productKey: 'confluence',
        }),
      })}
    />
  );
};

const ExtensionPoint = ({ client }: { client: ApolloClient<any> }) => {
  const { extensions } = useExtensionList({
    client,
    contextIds: ['story', 'book'],
    type: 'macro',
  });

  if (extensions.length < 1) {
    return null;
  }
  return (
    <ForgeUIExtensionAnalyticsContext
      localId={extensions[0].id}
      extensionId={extensions[0].id}
    >
      <Extension client={client} extension={extensions[0]} />
    </ForgeUIExtensionAnalyticsContext>
  );
};

export const ExtensionWithNextRenderer = () => {
  const client = useMemo(
    () =>
      mockClientWithApps({
        'ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key':
          apps.appWithModalDialog,
      }),
    [],
  );

  return (
    <ForgeUIExtensionPointProvider
      analyticsWebClient={getAnalyticsWebClient()}
      environment={ProductEnvironment.DEVELOPMENT}
      product="storybook"
      page="story-page"
    >
      <ExtensionPoint client={client} />
    </ForgeUIExtensionPointProvider>
  );
};

export default {
  title: 'forge-ui',
};
