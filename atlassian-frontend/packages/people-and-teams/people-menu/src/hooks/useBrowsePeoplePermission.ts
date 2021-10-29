import { useEffect, useState } from 'react';

export interface UseBrowsePeoplePermissionData {
  loading: boolean;
  hasPermission: boolean;
}

export default function useBrowsePeoplePermission(
  permissionPromise?: () => Promise<boolean>,
): UseBrowsePeoplePermissionData {
  const noQuery = !permissionPromise;

  const [hasPermission, setPermission] = useState(noQuery);
  const [loading, setLoading] = useState(!noQuery);

  useEffect(() => {
    if (permissionPromise) {
      permissionPromise()
        .then((permissionResult) => {
          setPermission(permissionResult);
          setLoading(false);
        })
        .catch(() => {
          setPermission(false);
          setLoading(false);
        });
    }
  }, [permissionPromise, setLoading, setPermission]);

  return {
    loading,
    hasPermission,
  };
}
