import { useEffect, useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';

import { fetchJson } from '@atlassian/dragonfruit-utils';

import { TEAMS_REST_API_URL } from '../../constants';
import {
  TeamsMembershipResponse,
  UseGetTeamMembersResponse,
  UsersQueryResponse,
  UsersQueryVariables,
} from '../../types';

export const USERS_QUERY = gql`
  query usersData($accountIds: [ID!]!) {
    users(accountIds: $accountIds) {
      accountId
      name
      picture
    }
  }
`;

export const useGetTeamMembers = (
  teamId: string,
): UseGetTeamMembersResponse => {
  const [isRestLoading, setRestLoading] = useState<boolean>(false);
  const [restError, setRestError] = useState<Error>();
  const [restErrorCode, setRestErrorCode] = useState<number>();

  const url = `${TEAMS_REST_API_URL}/${teamId}/members`;

  const [
    getMembersInfo,
    { data, error: aggError, loading: isAggLoading },
  ] = useLazyQuery<UsersQueryResponse, UsersQueryVariables>(USERS_QUERY, {});

  const getAccountIds = (response: TeamsMembershipResponse) => {
    return response.entities
      .filter(membership => membership.state === 'FULL_MEMBER')
      .map(membership => membership.membershipId.memberId);
  };

  useEffect(() => {
    setRestLoading(true);
    fetchJson<TeamsMembershipResponse>(url)
      .then((response: TeamsMembershipResponse) => {
        const accountIds = getAccountIds(response);
        // Call AGG to get the user information
        getMembersInfo({ variables: { accountIds } });
      })
      .catch(error => {
        setRestError(error);
        setRestErrorCode(error.statusCode);
      })
      .finally(() => {
        setRestLoading(false);
      });
  }, [getMembersInfo, url]);

  return {
    data: data?.users,
    isLoading: isRestLoading || isAggLoading,
    error: restError || aggError,
    errorCode: restErrorCode,
  };
};
