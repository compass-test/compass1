import { useCallback, useEffect, useMemo } from 'react';

import { fetchMyTeams } from '../clients/team-client';
import { transformTeams } from '../transfomers/teams';
import { Product, Team } from '../types';
import {
  DEFAULT_RELEASE_RESOLVED_PROMISE_DELAY,
  withCached,
} from '../utils/with-cached';

import { useService } from './use-service';

export interface UseMyTeamsServiceData {
  loading?: boolean;
  error?: Error;
  data: Team[];
  fetchData: () => Promise<Team[]>;
}

const mapFetchMyTeamsFnByTimeout = new Map();

function getFetchMyTeamsCachedFn(
  timeout = DEFAULT_RELEASE_RESOLVED_PROMISE_DELAY,
) {
  let fn = mapFetchMyTeamsFnByTimeout.get(timeout);

  if (fn) {
    return fn;
  }

  fn = withCached(fetchMyTeams, timeout);
  mapFetchMyTeamsFnByTimeout.set(timeout, fn);
  return fn;
}

export function useTeamsOfService(
  userId: string,
  cloudId: string,
  orgId: string,
  product: Product,
  tenantUrl: string = '',
  cacheTimeout?: number,
): UseMyTeamsServiceData {
  const request = useCallback(() => {
    if (cacheTimeout) {
      const fn = getFetchMyTeamsCachedFn(cacheTimeout);
      return fn(userId, cloudId, orgId, product, tenantUrl);
    }

    return fetchMyTeams(userId, cloudId, orgId, product, tenantUrl);
  }, [cacheTimeout, userId, cloudId, product, tenantUrl, orgId]);

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

  const memoizedData = useMemo(() => transformTeams(data), [data]);

  return {
    loading,
    error,
    data: memoizedData,
    fetchData,
  };
}
