import { Product, Team } from '../types';
import {
  Membership,
  RawTeamData,
  TeamDiscoverability,
  TeamMembershipSettings,
  TeamRestriction,
  TeamState,
} from '../types/team';
import { InvitedUser } from '../types/user';
import { fetchJson, postJson } from '../utils/fetch';
import { constructProductOriginParams } from '../utils/url';

const LIMIT_RESULTS = 5;
export const STARGATE_ENDPOINT_TEAMS = '/gateway/api/teams';
export const STARGATE_ENDPOINT_TEAMS_V3 = '/gateway/api/v3/teams';
export const STARGATE_ENDPOINT_TEAMS_OF = `${STARGATE_ENDPOINT_TEAMS}/v2/of-user`;
export const STARGATE_ENDPOINT_TEAMS_OF_V3 = `${STARGATE_ENDPOINT_TEAMS_V3}/of-user`;

export const buildTeamsOfUrl = (
  userId: string,
  cloudId: string,
  product: string,
  tenantUrl: string = '',
  orgId?: string,
) => {
  const params = [
    `limit=${LIMIT_RESULTS}`,
    'cursor=',
    `origin.cloudId=${cloudId}`,
    `origin.product=${product.toUpperCase()}`,
  ];

  const isUseLegionV3 = !!orgId;

  return `${tenantUrl}${
    isUseLegionV3 ? STARGATE_ENDPOINT_TEAMS_OF_V3 : STARGATE_ENDPOINT_TEAMS_OF
  }/${userId}?&${params.join('&')}`;
};

export const fetchMyTeams = (
  userId: string,
  cloudId: string,
  product: string,
  tenantUrl: string = '',
  orgId?: string,
): Promise<RawTeamData> =>
  fetchJson(buildTeamsOfUrl(userId, cloudId, product, tenantUrl, orgId));

export interface MetaDataTeamCreation {
  product: Product;
  cloudId: string;
  tenantUrl?: string;
  orgId?: string;
}

export const buildTeamCreateUrl = ({
  product,
  cloudId,
  tenantUrl = '',
  orgId,
}: MetaDataTeamCreation) => {
  const params = [
    constructProductOriginParams({
      product,
      cloudId,
    }),
  ];

  const isUseLegionV3 = !!orgId;

  return `${tenantUrl}${
    isUseLegionV3 ? STARGATE_ENDPOINT_TEAMS_V3 : STARGATE_ENDPOINT_TEAMS
  }/?${params.join('&')}`;
};

export const postCreateTeam = (
  teamName: string,
  metaData: MetaDataTeamCreation,
): Promise<Team> => {
  const url = buildTeamCreateUrl(metaData);

  const postOptions = {
    displayName: teamName,
    description: '',
    state: TeamState.ACTIVE,
    membershipSettings: TeamMembershipSettings.OPEN,
    discoverable: TeamDiscoverability.DISCOVERABLE,
    restriction: TeamRestriction.NO_RESTRICTION,
    organizationId: metaData.orgId,
  };

  // a defensive code: stop sending `organizationId` if it is undefined
  if (!metaData.orgId) {
    delete postOptions.organizationId;
  }

  return postJson(url, postOptions);
};

export const buildInviteTeamMembersUrl = (
  teamId: string,
  { product, cloudId, orgId, tenantUrl = '' }: MetaDataTeamCreation,
) => {
  const params = [
    constructProductOriginParams({
      product,
      cloudId,
    }),
  ];

  const isUseLegionV3 = !!orgId;

  return `${tenantUrl}${
    isUseLegionV3 ? STARGATE_ENDPOINT_TEAMS_V3 : STARGATE_ENDPOINT_TEAMS
  }/ui/${teamId}/membership/invite?${params.join('&')}`;
};

export const postInviteTeamMembers = async (
  teamId: string,
  users: InvitedUser[],
  metaData: MetaDataTeamCreation,
): Promise<Membership[] | undefined> => {
  if (!users || users.length === 0) {
    return Promise.resolve(undefined);
  }

  const emails: string[] = [];
  const ids: string[] = [];

  users.forEach((user) => {
    if (user.id) {
      ids.push(user.id);
    } else if (user.email) {
      emails.push(user.email);
    }
  });

  const url = buildInviteTeamMembersUrl(teamId, metaData);

  const postData = {
    emailAddresses: emails,
    atlassianAccounts: ids,
  };

  return postJson(url, postData);
};
