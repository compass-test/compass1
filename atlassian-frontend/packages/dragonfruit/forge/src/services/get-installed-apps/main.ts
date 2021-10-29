import {
  GetInstalledAppsQuery,
  useGetInstalledAppsQuery,
} from '@atlassian/dragonfruit-graphql';

import { COMPASS_SITE_ARI } from '../../constants';

import { AppListViewInfo, CustomUIExtension, FUIExtension } from './types';

function isPresent<T extends Object>(input: null | undefined | T): input is T {
  return input != null;
}

// This function takes in the full extensionId of an extension in the form
// ari:cloud:ecosystem::extension/appId/environmentId/static/appName and returns just the appId
function parseAppId(extensionId: string) {
  return extensionId.split('/')[1];
}

function getConfigExtensionDetails(
  data: GetInstalledAppsQuery,
): Map<string, FUIExtension | CustomUIExtension> {
  if (!data.extensionContexts) {
    return new Map();
  }

  return new Map(
    data.extensionContexts![0].extensionsByType?.map((extension) => {
      const key = parseAppId(extension.id);

      if (extension.properties?.resource) {
        const value = {
          id: extension.id,
          title: extension.properties?.title,
          icon: extension.properties?.icon,
          customUIExtension: extension,
        };
        return [key, value];
      }

      const value = {
        id: extension.id,
        title: extension.properties?.title,
        icon: extension.properties?.icon,
      };
      return [key, value];
    }),
  );
}

function transformData(
  data: GetInstalledAppsQuery | undefined,
): AppListViewInfo[] {
  if (!data || !data.extensionContexts || data.extensionContexts.length === 0) {
    return [];
  }

  const appsWithConfigExtension = getConfigExtensionDetails(data);

  const allApps = data.extensionContexts[0].installations?.nodes
    ?.map((inst) => {
      if (!inst?.app || !inst?.appEnvironment?.key || !inst?.id) {
        return null;
      }

      return {
        app: inst.app,
        installation: {
          environmentKey: inst.appEnvironment.key,
          id: inst.id,
        },
      };
    })
    .filter(isPresent)
    .map(({ app, installation }) => ({
      metadata: app,
      adminPageExtension: appsWithConfigExtension.get(parseAppId(app.id)),
      installation,
    }));

  return allApps || [];
}

export default function useGetInstalledApps(cloudId: string) {
  const contextId = `${COMPASS_SITE_ARI}/${cloudId}`;

  const { data, loading, error } = useGetInstalledAppsQuery({
    variables: {
      contextId: contextId,
    },
  });

  return {
    data: transformData(data),
    loading,
    error,
  };
}
