import { useCallback, useEffect, useState } from 'react';

import { postInviteTeamMembers } from '../clients/team-client';
import { Product } from '../types';
import { Membership } from '../types/team';
import { InvitedUser } from '../types/user';

import { useService } from './use-service';

export interface UseInviteMembersServiceData {
  loading?: boolean;
  error?: Error;
  data: Membership[];
  inviteTeamMembers: (teamId: string, inviteTeamMembers: InvitedUser[]) => void;
}

export function useInviteTeamMembers(
  cloudId: string,
  product: Product,
  tenantUrl?: string,
): UseInviteMembersServiceData {
  const [teamId, setTeamId] = useState('');
  const [users, setUsers] = useState<InvitedUser[]>([]);

  const requestToInviteMembers = useCallback(() => {
    const metaData = {
      product,
      cloudId,
      tenantUrl,
    };

    return postInviteTeamMembers(teamId, users, metaData);
  }, [cloudId, product, tenantUrl, teamId, users]);

  const { loading, error, data, fetchData } = useService(
    requestToInviteMembers,
  );

  // calling inviting team members endpoint when teamId change
  useEffect(() => {
    if (!teamId || !users || !users.length) {
      return;
    }

    fetchData();
  }, [fetchData, teamId, users]);

  return {
    loading,
    error,
    data,
    inviteTeamMembers: (teamId: string, inviteTeamMembers: InvitedUser[]) => {
      // `teamId` | `users` changes --> `requestToCreateTeam` is updated -->  `fetchData` is updated --> `memoizedData` is updated
      setTeamId(teamId);
      setUsers(inviteTeamMembers);
    },
  };
}
