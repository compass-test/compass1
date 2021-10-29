import { useEffect, useState } from 'react';

import { fetchJson } from '@atlassian/dragonfruit-utils';

import { TEAMS_REST_API_URL } from '../../constants';
import { TeamDetails } from '../../types';

// This hook caches the result of previously seen ids
// first call
// useGetTeams([1, 2]); // gives us: ['team A', 'team B'];

// second call
// useGetTeams([2, 3]); // gives us: ['team A', 'team B', 'team C'];
export const useGetTeams = (ids: string[]) => {
  const [teamCache, setTeamCache] = useState<
    Record<string, TeamDetails | Error>
  >({});

  const [loading, setLoading] = useState<boolean>(true);
  const [teams, setTeams] = useState<Record<string, TeamDetails | Error>>({});
  const teamIds = ids.filter(n => !teamCache[n]);

  const url = TEAMS_REST_API_URL;

  /* eslint-disable react-hooks/exhaustive-deps */
  // we are using JSON.stringify to do a deep equality check on the array here.
  // something like useDeepCompareEffect would be ideal
  useEffect(() => {
    const uniqIds = [
      ...new Set(teamIds.map(id => id.replace('ari:cloud:teams::team/', ''))),
    ];

    setLoading(true);
    Promise.all(
      uniqIds.map(id =>
        fetchJson<TeamDetails>(`${url}/${encodeURIComponent(id)}`).catch(e => ({
          id,
          error: e,
        })),
      ),
    ).then((teams: (TeamDetails | { id: string; error: any })[]) => {
      setTeams(
        teams.reduce(
          (acc, t) => ({ ...acc, [t.id]: 'error' in t ? t.error : t }),
          {} as Record<string, TeamDetails | Error>,
        ),
      );
      setLoading(false);
    });
  }, [JSON.stringify(teamIds)]);

  useEffect(() => {
    const newTeams = Object.keys(teams).reduce((acc, team) => {
      if (teams[team]) {
        acc[team] = teams[team];
      }
      return acc;
    }, {} as Record<string, TeamDetails | Error>);
    setTeamCache(prevTeams => ({ ...prevTeams, ...newTeams }));
  }, [teams]);

  return { loading, teams: teamCache };
};
