import { useCallback } from 'react';

import { useService } from '../generic-hook';

import type { TeamWorkData, TeamWorkServiceFn } from './types';
import { defaultRequest } from './utils';

export const useTeamWorkService: TeamWorkServiceFn = (teamId, options) => {
  const request = useCallback(
    async () => await defaultRequest(options?.baseUrl)(teamId),
    [options?.baseUrl, teamId],
  );

  return useService<TeamWorkData>(request, {
    ...(options?.initialState || {}),
  });
};
