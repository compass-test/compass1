import { Product, Team } from '../types';
import {
  TeamDiscoverability,
  TeamMembershipSettings,
  TeamRestriction,
  TeamState,
} from '../types/team';
import { InvitedUser } from '../types/user';
import { fetchJson, postJson } from '../utils/fetch';
import { constructProductOriginParams } from '../utils/url';

const LIMIT_RESULTS = 5;
export const STARGATE_ENDPOINT_TEAMS = '/gateway/api/v3/teams';
export const STARGATE_ENDPOINT_TEAMS_OF = `${STARGATE_ENDPOINT_TEAMS}/of-user`;

export const buildTeamsOfUrl = (
  userId: string,
  cloudId: string,
  orgId: string,
  product: Product,
  tenantUrl: string = '',
) => {
  const params = [
    `limit=${LIMIT_RESULTS}`,
    'cursor=',
    constructProductOriginParams({
      product,
      cloudId,
    }),
    `organizationId=${orgId}`,
  ];

  return `${tenantUrl}${STARGATE_ENDPOINT_TEAMS_OF}/${userId}?&${params.join(
    '&',
  )}`;
};

export const fetchMyTeams = (
  userId: string,
  cloudId: string,
  orgId: string,
  product: Product,
  tenantUrl: string = '',
) => fetchJson(buildTeamsOfUrl(userId, cloudId, orgId, product, tenantUrl));

export interface MetaDataTeamCreation {
  product: Product;
  cloudId: string;
  orgId?: string;
  tenantUrl?: string;
}

export const buildTeamCreateUrl = ({
  product,
  cloudId,
  tenantUrl = '',
}: MetaDataTeamCreation) => {
  const params = [
    constructProductOriginParams({
      product,
      cloudId,
    }),
  ];

  return `${tenantUrl}${STARGATE_ENDPOINT_TEAMS}/?${params.join('&')}`;
};

export const postCreateTeam = (
  teamName: string,
  metaData: MetaDataTeamCreation,
): Promise<Team> => {
  const url = buildTeamCreateUrl(metaData);

  return postJson(url, {
    displayName: teamName,
    description: '',
    state: TeamState.ACTIVE,
    membershipSettings: TeamMembershipSettings.OPEN,
    discoverable: TeamDiscoverability.DISCOVERABLE,
    restriction: TeamRestriction.NO_RESTRICTION,
    organizationId: metaData.orgId,
  });
};

export const buildInviteTeamMembersUrl = (
  teamId: string,
  { product, cloudId, tenantUrl = '' }: MetaDataTeamCreation,
) => {
  const params = [
    constructProductOriginParams({
      product,
      cloudId,
    }),
  ];

  return `${tenantUrl}${STARGATE_ENDPOINT_TEAMS}/ui/${teamId}/membership/invite?${params.join(
    '&',
  )}`;
};

export const postInviteTeamMembers = async (
  teamId: string,
  users: InvitedUser[],
  metaData: MetaDataTeamCreation,
) => {
  if (!users || users.length === 0) {
    return Promise.resolve();
  }

  const emails: string[] = [];
  const ids: string[] = [];

  users.forEach((user) => {
    if (user.email) {
      emails.push(user.email);
    } else {
      ids.push(user.id);
    }
  });

  const url = buildInviteTeamMembersUrl(teamId, metaData);

  const postData = {
    emailAddresses: emails,
    atlassianAccounts: ids,
  };

  return postJson(url, postData);
};
