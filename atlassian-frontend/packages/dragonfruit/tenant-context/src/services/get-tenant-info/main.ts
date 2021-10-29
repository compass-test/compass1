import { useCallback } from 'react';

import { FetchError, useGetRequestState } from '@atlassian/dragonfruit-utils';

import {
  Environment,
  Permission,
  TenantInfoData,
  TenantInfoState,
} from './types';

const useGetTenantInfo = (): TenantInfoState => {
  const request = useCallback(
    () =>
      fetch(`/gateway/api/compass/v1/page/context`, { credentials: 'include' })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.errors) {
            // If the response package contains an error
            throw new FetchError(
              response.errors[0].message,
              400,
              response.errors[0].type,
            );
          }

          if (response.code === 401) {
            throw new FetchError(response.message, 401, 'UNAUTHORIZED');
          }

          if (!response.permissions.includes(Permission.WRITE)) {
            throw new FetchError('No user permissions', 403, 'FORBIDDEN');
          }

          return response;
        }),
    [],
  );

  return useGetRequestState<TenantInfoData>(request);
};

// Given an origin (e.g. https://foo.atlassian.net), return the environment
export const getEnvironmentFromOrigin = (): Environment => {
  if (/\.atlassian\.net$/.test(window.location.origin)) {
    return Environment.PROD;
  } else if (/\.jira-dev\.com$/.test(window.location.origin)) {
    return Environment.STAGING;
  } else if (/\/\/localhost:3000$/.test(window.location.origin)) {
    return Environment.LOCAL;
  } else {
    // If it's an unknown origin, it's likely to be a customer, so we fallback to Production
    return Environment.PROD;
  }
};

export default useGetTenantInfo;
