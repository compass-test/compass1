import { COMPASS_SITE_ARI } from '@atlassian/dragonfruit-forge';
import {
  GetInstalledComponentDetailAppsQuery,
  useGetInstalledComponentDetailAppsQuery,
} from '@atlassian/dragonfruit-graphql';

import { ExtensionSideBarInfo } from '../../common/ui/left-sidebar-links/types';

function getComponentDetailExtensionFields(
  data: GetInstalledComponentDetailAppsQuery | undefined,
  cloudId: string,
  contextId: string,
): ExtensionSideBarInfo[] {
  if (!data || !data.extensionContexts) {
    return [];
  }

  return data.extensionContexts![0].extensionsByType?.map((extension) => {
    if (extension.properties?.resource) {
      // Only CustomUI apps have resources, so pass the whole extension so it
      // can be rendered on the page later
      return {
        id: extension.id,
        title: extension.properties?.title,
        icon: extension.properties?.icon,
        customUIExtension: {
          cloudId: cloudId,
          contextId: contextId,
          extension: extension,
        },
      } as ExtensionSideBarInfo;
    }
    return {
      id: extension.id,
      title: extension.properties?.title,
      icon: extension.properties?.icon,
      displayConditions: extension.properties?.displayConditions,
    };
  });
}

export default function useGetComponentDetailApps(cloudId: string) {
  const contextId = `${COMPASS_SITE_ARI}/${cloudId}`;

  const { data, loading, error } = useGetInstalledComponentDetailAppsQuery({
    variables: {
      contextId: contextId,
    },
  });

  return {
    appData: getComponentDetailExtensionFields(data, cloudId, contextId),
    loading,
    error,
  };
}
