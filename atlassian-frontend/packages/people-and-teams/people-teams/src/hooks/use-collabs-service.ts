import { useCallback, useEffect, useMemo } from 'react';

import { fetchCollaborators } from '../clients/collaboration-graph-service';
import { transformCollabsDataToUsers } from '../transfomers/collabs';
import { CollaborationGraphResponse, User } from '../types';
import {
  DEFAULT_RELEASE_RESOLVED_PROMISE_DELAY,
  withCached,
} from '../utils/with-cached';

import { useService } from './use-service';

export interface UseCollaboratorsServiceData {
  loading?: boolean;
  error?: Error;
  data: User[];
  fetchData: () => Promise<User[]>;
}

const mapFetchCollaboratorsFnByTimeout = new Map();

function getFetchCollaboratorsCachedFn(
  timeout = DEFAULT_RELEASE_RESOLVED_PROMISE_DELAY,
) {
  let fn = mapFetchCollaboratorsFnByTimeout.get(timeout);

  if (fn) {
    return fn;
  }

  fn = withCached(fetchCollaborators, timeout);
  mapFetchCollaboratorsFnByTimeout.set(timeout, fn);
  return fn;
}

export function useCollaboratorsService(
  cloudId: string,
  userId: string = 'context',
  tenantUrl: string = '',
  cacheTimeout?: number,
): UseCollaboratorsServiceData {
  const request = useCallback((): Promise<CollaborationGraphResponse> => {
    if (cacheTimeout) {
      const fn = getFetchCollaboratorsCachedFn(cacheTimeout);
      return fn(cloudId, userId, tenantUrl);
    }

    return fetchCollaborators(cloudId, userId, tenantUrl);
  }, [cacheTimeout, cloudId, userId, tenantUrl]);

  const { loading, error, data, fetchData } = useService(request, {
    loading: true,
  });

  // For reusable services, it is better not to hardcode fetching on mount, to make them more flexible. When possible, add this code to component which calls service instead.
  useEffect(() => {
    fetchData();
    /*
      NOTE: If you add `fetchData` to the dependency list (in this component or its children) - you have to define `request` function you pass to `useService()` via `useCallback()`.
      Otherwise you may get an infinite loop.
    */
  }, [fetchData]);

  const memoizedData = useMemo(() => transformCollabsDataToUsers(data), [data]);

  return {
    loading,
    error,
    data: memoizedData,
    fetchData,
  };
}
