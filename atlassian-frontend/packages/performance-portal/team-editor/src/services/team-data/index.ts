import { useEffect, useState } from 'react';

import { MutationMode } from '../../types';
import { useTeamMutation, useTeamQuery } from '../team';

export const useTeamData = () => {
  const [mutationMode, setMutationMode] = useState(MutationMode.NEW);
  const [teamId, setTeamId] = useState<string | undefined>();

  const [, team] = useTeamQuery(teamId);
  const { createTeam, updateTeam } = useTeamMutation();

  useEffect(() => {
    if (mutationMode === MutationMode.NEW && team) {
      setMutationMode(MutationMode.EDIT);
    } else if (mutationMode === MutationMode.EDIT && !team) {
      setMutationMode(MutationMode.NEW);
    }
  }, [team, mutationMode]);

  return { mutationMode, teamId, setTeamId, team, createTeam, updateTeam };
};
