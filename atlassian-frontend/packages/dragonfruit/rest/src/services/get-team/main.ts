import { useCallback, useEffect, useState } from 'react';

import { fetchJson } from '@atlassian/dragonfruit-utils';

import { TEAMS_REST_API_URL } from '../../constants';
import { TeamDetails } from '../../types';

export function fetchTeam(teamId: string) {
  const url = `${TEAMS_REST_API_URL}/${encodeURIComponent(teamId)}`;

  return fetchJson<TeamDetails>(url);
}

type UseGetTeamServiceResult = [
  (teamId: string) => Promise<TeamDetails>,
  { data: TeamDetails | undefined; loading: boolean; error: any },
];

export const useGetTeamService = (): UseGetTeamServiceResult => {
  const [data, setData] = useState<TeamDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const fetchTeamById = useCallback((teamId: string) => {
    setLoading(true);

    // Consider whether we should throw the error from the catch block
    return fetchTeam(teamId)
      .then(res => {
        setData(res);
        setError(undefined);
        return res;
      })
      .catch(e => {
        setData(undefined);
        setError(e);
        throw e;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [fetchTeamById, { data, loading, error }];
};

interface UseTeamServiceResult {
  data: TeamDetails | undefined;
  loading: boolean;
  error: any;
}

export const useTeamService = (
  teamId: string | undefined | null,
): UseTeamServiceResult => {
  const [fetchTeamById, result] = useGetTeamService();

  useEffect(() => {
    if (typeof teamId === 'string') {
      fetchTeamById(teamId);
    }
  }, [fetchTeamById, teamId]);

  return result;
};
