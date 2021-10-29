import { useCallback, useEffect, useMemo, useState } from 'react';

import { postCreateTeam } from '../clients/team-client';
import { trimTeamAriInObject } from '../transfomers/teams';
import { Product } from '../types';
import { CreatedTeamData } from '../types/team';

import { useService } from './use-service';

export interface UseCreateTeamServiceData {
  loading?: boolean;
  error?: Error;
  data: CreatedTeamData;
  createTeam: (teamName: string) => void;
}

export function useCreateTeamService(
  cloudId: string,
  orgId: string,
  product: Product,
  tenantUrl?: string,
): UseCreateTeamServiceData {
  const [teamName, setTeamName] = useState('');

  const requestToCreateTeam = useCallback(() => {
    const metaData = {
      product,
      cloudId,
      orgId,
      tenantUrl,
    };
    return postCreateTeam(teamName, metaData);
  }, [cloudId, orgId, product, tenantUrl, teamName]);

  const { loading, error, data, fetchData } = useService<CreatedTeamData>(
    requestToCreateTeam,
  );
  const memoizedData = useMemo(() => trimTeamAriInObject(data), [data]);

  // calling creating team endpoint when teamName change
  useEffect(() => {
    if (!teamName) {
      return;
    }

    fetchData();
  }, [fetchData, teamName]);

  return {
    loading,
    error,
    data: memoizedData,
    createTeam: (teamName: string) => {
      // `teamName` changes --> `requestToCreateTeam` is updated -->  `fetchData` is updated --> `memoizedData` is updated
      setTeamName(teamName);
    },
  };
}
