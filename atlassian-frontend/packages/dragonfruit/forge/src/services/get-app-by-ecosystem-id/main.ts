import {
  AppListViewFragment,
  GetInstalledAppsQuery,
  useGetInstalledAppsQuery,
} from '@atlassian/dragonfruit-graphql';

import { COMPASS_SITE_ARI } from '../../constants';

export type AppInfo = {
  metadata: AppListViewFragment;
};

function isPresent<T extends Object>(input: null | undefined | T): input is T {
  return input !== null;
}

function extractAppData(
  data: GetInstalledAppsQuery | undefined,
  ecosystemId: string,
): AppInfo | null {
  if (!data || !data.extensionContexts || data.extensionContexts.length === 0) {
    return null;
  }

  const allApps = data.extensionContexts[0].installations?.nodes
    ?.map((inst) => inst?.app)
    .filter(isPresent)
    ?.map((app) => ({
      metadata: app,
    }));

  const app = allApps?.filter((app) => app.metadata.id === ecosystemId)[0];

  return app || null;
}

export default function useGetAppByEcosystemId(
  cloudId: string,
  ecosystemId: string,
) {
  const contextId = `${COMPASS_SITE_ARI}/${cloudId}`;

  const { data, loading, error } = useGetInstalledAppsQuery({
    variables: {
      contextId: contextId,
    },
  });

  return {
    data: extractAppData(data, ecosystemId),
    loading,
    error,
  };
}
