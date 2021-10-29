import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import { mockGetTeams, testMyTeamsData } from '@atlassian/ptc-test-utils';

import { useTeamsOfService } from '../../../hooks/use-teams-of-service';
import { transformTeams } from '../../../transfomers/teams';

describe('useCollaboratorsService', () => {
  const userId = 'test-user-id';
  const cloudId = 'test-cloud-id';
  const product = 'confluence';

  afterEach(() => {
    fetchMock.reset();
  });

  it('should init correctly', async () => {
    const { result } = renderHook(() =>
      useTeamsOfService(userId, cloudId, product),
    );

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: [],
      fetchData: expect.any(Function),
    });
  });

  it('should return data if request succeeds', async () => {
    mockGetTeams(userId, cloudId, product);
    const { result } = renderHook(() =>
      useTeamsOfService(userId, cloudId, product),
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
      useTeamsOfService(userId, cloudId, product),
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
