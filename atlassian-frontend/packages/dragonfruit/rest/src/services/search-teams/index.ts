import { useCallback, useEffect } from 'react';

import { fetchJson, useService } from '@atlassian/dragonfruit-utils';

import { TEAMS_REST_API_URL } from '../../constants';
import { TeamDetails, TeamsListResult } from '../../types';

const TEAM_PICKER_LIMIT = 20;

export function searchTeams(searchText: string = '', orgId: string) {
  const url = `${TEAMS_REST_API_URL}/search?limit=${TEAM_PICKER_LIMIT}&organizationId=${encodeURIComponent(
    orgId,
  )}&q=${encodeURIComponent(searchText)}`;
  return fetchJson<TeamDetails[]>(url);
}

export const useSearchTeams = (
  teamName: string,
  orgId: string,
  limit: number,
  /**
   * @lazy determines if the query fetches on mount or only when fetchData is called.
   * When lazy is true, the query will not execute until fetchData is called.
   * When lazy is false or not present, the query will execute as soon as the component mounts.
   */
  lazy: boolean = false,
  onCompleted?: (data: TeamDetails[]) => void,
): TeamsListResult => {
  const url = `${TEAMS_REST_API_URL}/search?limit=${limit}&organizationId=${encodeURIComponent(
    orgId,
  )}&q=${encodeURIComponent(teamName)}`;
  const request = useCallback(() => fetchJson<TeamDetails[]>(url), [url]);

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
