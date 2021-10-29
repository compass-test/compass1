import { useCallback, useEffect } from 'react';

import { fetchJson, useService } from '@atlassian/dragonfruit-utils';

import { TEAMS_REST_API_URL } from '../../constants';

import { TeamsOfUser, TeamsOfUserResponse } from './types';

export const DEFAULT_TEAMS_SHOWN = 20;

export const useTeamsOfUser = (
  accountId: string,
  organizationId: string,
  limit: number = DEFAULT_TEAMS_SHOWN,
  /**
   * @lazy determines if the query fetches on mount or only when fetchData is called.
   * When lazy is true, the query will not execute until fetchData is called.
   * When lazy is false or not present, the query will execute as soon as the component mounts.
   */
  lazy: boolean = false,
  onCompleted?: (data: TeamsOfUserResponse) => void,
): TeamsOfUser => {
  const url = `${TEAMS_REST_API_URL}/of-user/${accountId}?organizationId=${organizationId}&limit=${limit}`;
  const request = useCallback(() => fetchJson<TeamsOfUserResponse>(url), [url]);

  const { loading, error, data, fetchData } = useService(
    request,
    {
      loading: !lazy,
    },
    onCompleted,
  );

  useEffect(() => {
    if (!lazy) {
      fetchData();
    }
  }, [fetchData, lazy]);

  return {
    loading,
    error,
    data,
    fetchData,
  };
};
