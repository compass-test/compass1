import { useEffect, useState } from 'react';

import {
  AppListViewInfo,
  useGetInstalledApps,
} from '@atlassian/dragonfruit-forge';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

function getCurrentAppData(
  extensionId: string,
  installedAppData: AppListViewInfo[],
) {
  return installedAppData.find(
    (data) => data.adminPageExtension?.id === extensionId,
  );
}

export default function useGetApp(extensionId: string) {
  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState<AppListViewInfo>();
  const { cloudId } = useTenantInfo();
  const {
    data: installedAppData,
    loading: installedAppDataLoading,
  } = useGetInstalledApps(cloudId);

  useEffect(() => {
    if (installedAppDataLoading) {
      return;
    }

    const data = getCurrentAppData(extensionId, installedAppData);
    if (data) {
      setApp(data);
    }

    setLoading(false);

    // We can't include `installedAppData` in the deps list because react thinks it never
    // stays the same (even when it does in actuality) and this useEffect infinite loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installedAppDataLoading, extensionId]);

  return {
    app,
    loading,
  };
}
