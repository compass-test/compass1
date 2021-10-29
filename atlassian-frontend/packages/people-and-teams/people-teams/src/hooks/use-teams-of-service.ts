import { useCallback, useEffect, useMemo } from 'react';

import { fetchMyTeams } from '../clients/team-client';
import { transformTeams } from '../transfomers/teams';
import { Team } from '../types';
import { RawTeamData } from '../types/team';
import {
  DEFAULT_RELEASE_RESOLVED_PROMISE_DELAY,
  withCached,
  WithCached,
} from '../utils/with-cached';

import { useService } from './use-service';

export interface UseMyTeamsServiceData {
  loading?: boolean;
  error?: Error;
  data: Team[];
  fetchData: () => Promise<Team[]>;
}

type CachedTeam = WithCached<
  (
    userId: string,
    cloudId: string,
    product: string,
    tenantUrl?: string,
    orgId?: string,
  ) => Promise<RawTeamData>
>;

const mapFetchMyTeamsFnByTimeout: Map<number, CachedTeam> = new Map();

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
  product: string,
  tenantUrl: string = '',
  cacheTimeout?: number,
  orgId?: string,
): UseMyTeamsServiceData {
  const request = useCallback(() => {
    if (cacheTimeout) {
      const fn = getFetchMyTeamsCachedFn(cacheTimeout);
      return fn(userId, cloudId, product, tenantUrl, orgId);
    }

    return fetchMyTeams(userId, cloudId, product, tenantUrl, orgId);
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
