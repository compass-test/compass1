import fetchMock from 'fetch-mock/cjs/client';

import {
  testMembershipData,
  testTeamData,
  testMyTeamsData,
  genTestTeamData,
} from './mock-data';
import { constructProductOriginParams } from './test-helpers';

export type Product = 'confluence' | 'jira' | 'directory';
export interface OriginQuery {
  cloudId: string;
  product?: Product;
}
export interface MetaDataTeamCreation {
  product: Product;
  cloudId: string;
  tenantUrl?: string;
  orgId?: string;
}

const LIMIT_RESULTS = 5;

export const STARGATE_ENDPOINT_TEAMS = '/gateway/api/teams';
export const STARGATE_ENDPOINT_TEAMS_V3 = '/gateway/api/v3/teams';
export const STARGATE_ENDPOINT_TEAMS_OF = `${STARGATE_ENDPOINT_TEAMS}/v2/of-user`;
export const STARGATE_ENDPOINT_TEAMS_OF_V3 = `${STARGATE_ENDPOINT_TEAMS_V3}/of-user`;

export const buildInviteTeamMembersUrl = (
  teamId: string,
  { product, cloudId, tenantUrl = '', orgId }: MetaDataTeamCreation,
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

export function mockCreateTeam(
  cloudId: string,
  product: Product,
  timeout = 500,
  orgId?: string,
) {
  const url = buildTeamCreateUrl({
    cloudId,
    product,
    orgId,
  });
  const finalTestTeamData = genTestTeamData({ organizationId: orgId });

  return fetchMock.post(url, finalTestTeamData, {
    delay: timeout,
  });
}

export function mockInviteTeamMembers(
  cloudId: string,
  product: Product,
  timeout = 500,
  orgId?: string,
) {
  const url = buildInviteTeamMembersUrl(testTeamData.id, {
    cloudId,
    product,
    orgId,
  });

  return fetchMock.post(url, testMembershipData, {
    delay: timeout,
  });
}

export function mockGetTeams(
  userId: string,
  cloudId: string,
  product: string,
  tenantUrl?: string,
  timeout = 500,
  orgId?: string,
) {
  const url = buildTeamsOfUrl(userId, cloudId, product, tenantUrl, orgId);

  return fetchMock.get(url, testMyTeamsData, {
    delay: timeout,
  });
}
