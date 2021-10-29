import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import { testMyTeamsData } from '@atlassian/ptc-test-utils';

import { transformTeams } from '../../../transfomers/teams';
import { useTeamsOfService } from '../../use-teams-of-service';

export const STARGATE_ENDPOINT_TEAMS_V3 = '/gateway/api/v3/teams';
export const STARGATE_ENDPOINT_TEAMS_OF_V3 = `${STARGATE_ENDPOINT_TEAMS_V3}/of-user`;
export const STARGATE_ENDPOINT_TEAMS = '/gateway/api/teams';
export const STARGATE_ENDPOINT_TEAMS_OF = `${STARGATE_ENDPOINT_TEAMS}/v2/of-user`;

const LIMIT_RESULTS = 5;

// Recreating this ourselves instead of using "mockGetTeams" to add organizationId query parameter
const buildTeamsOfUrl = (
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
    `organizationId=${orgId}`,
  ];

  const isUseLegionV3 = !!orgId;

  return `${tenantUrl}${
    isUseLegionV3 ? STARGATE_ENDPOINT_TEAMS_OF_V3 : STARGATE_ENDPOINT_TEAMS_OF
  }/${userId}?&${params.join('&')}`;
};
describe('useCollaboratorsService', () => {
  const userId = 'test-user-id';
  const cloudId = 'test-cloud-id';
  const orgId = 'test-org-id';
  const product = 'confluence';

  afterEach(() => {
    fetchMock.reset();
  });

  it('should init correctly', async () => {
    const { result } = renderHook(() =>
      useTeamsOfService(userId, cloudId, orgId, product),
    );

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: [],
      fetchData: expect.any(Function),
    });
  });

  it('should return data if request succeeds', async () => {
    const url = buildTeamsOfUrl(userId, cloudId, product, undefined, orgId);

    fetchMock.get(url, testMyTeamsData, {
      delay: 0,
    });

    const { result } = renderHook(() =>
      useTeamsOfService(userId, cloudId, orgId, product),
    );

    const promise = result.current.fetchData();

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: [],
      fetchData: expect.any(Function),
    });

    await promise;

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: transformTeams(testMyTeamsData),
      fetchData: expect.any(Function),
    });
  });

  it('should return error if request fails', async () => {
    // do not call mockGetCollaborators(); to mock returned data
    const { result } = renderHook(() =>
      useTeamsOfService(userId, cloudId, orgId, product),
    );

    const promise = result.current.fetchData();

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: [],
      fetchData: expect.any(Function),
    });

    await promise;

    expect(result.current).toEqual({
      loading: false,
      error: expect.any(Error),
      data: [],
      fetchData: expect.any(Function),
    });
  });
});
