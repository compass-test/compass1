import { useEffect, useState } from 'react';

import {
  useCollaboratorsService,
  useTeamsOfService,
} from '@atlassian/people-teams/hooks';
import type { Team, User } from '@atlassian/people-teams/types';

import { ErrorWithStatus, Product } from '../types';

export const mapDataCache = new Map();
export const USERS_CACHE_KEY = 'collaborators';
export const TEAMS_CACHE_KEY = 'teams';

interface PeopleMenuData {
  users?: User[];
  teams?: Team[];
  errorTeams?: ErrorWithStatus;
  errorUsers?: ErrorWithStatus;
  isLoading?: boolean;
  duration?: number;
  startTime?: number;
}

const ONE_SEC = 1000;
const ONE_MINUTE = ONE_SEC * 60;
const REQUEST_CACHE_TIMEOUT_TEAMS = ONE_MINUTE;
const REQUEST_CACHE_TIMEOUT_USERS = ONE_MINUTE * 5;

export function isCachedDataClear(): boolean {
  return mapDataCache.size === 0;
}

export default function useUsersTeamsData(
  cloudId: string,
  userId: string,
  product: Product,
  tenantUrl?: string,
  requestCacheTimeout?: number,
  orgId?: string,
): PeopleMenuData {
  const [dataUsers, setDataUsers] = useState<User[] | undefined>(undefined);
  const [dataTeams, setDataTeams] = useState<Team[] | undefined>(undefined);

  const {
    loading: isLoadingUsers,
    error: errorUsers,
    data: users,
  } = useCollaboratorsService(
    cloudId,
    'context',
    tenantUrl,
    requestCacheTimeout === undefined
      ? REQUEST_CACHE_TIMEOUT_USERS
      : requestCacheTimeout,
  );

  const {
    loading: isLoadingTeams,
    error: errorTeams,
    data: teams,
  } = useTeamsOfService(
    userId,
    cloudId,
    product,
    tenantUrl,
    requestCacheTimeout === undefined
      ? REQUEST_CACHE_TIMEOUT_TEAMS
      : requestCacheTimeout,
    orgId,
  );

  // after the service return the latest data,
  // we store users data in cache store.
  useEffect(() => {
    if (!users || isLoadingUsers || errorUsers) {
      return;
    }

    mapDataCache.set(USERS_CACHE_KEY, users);
    setDataUsers(users);
  }, [users, isLoadingUsers, errorUsers]);

  // after the service return the latest data,
  // store teams data in cache store.
  useEffect(() => {
    if (!teams || isLoadingTeams || errorTeams) {
      return;
    }

    mapDataCache.set(TEAMS_CACHE_KEY, teams);
    setDataTeams(teams);
  }, [teams, isLoadingTeams, errorTeams]);

  return {
    users:
      dataUsers && dataUsers.length
        ? dataUsers
        : mapDataCache.get(USERS_CACHE_KEY),
    teams:
      dataTeams && dataTeams.length
        ? dataTeams
        : mapDataCache.get(TEAMS_CACHE_KEY),
    errorTeams,
    errorUsers,
    isLoading: isLoadingUsers || isLoadingTeams,
  };
}
