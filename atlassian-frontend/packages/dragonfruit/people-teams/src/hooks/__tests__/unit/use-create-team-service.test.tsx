import { act, renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import { mockCreateTeam } from '@atlassian/ptc-test-utils';

import { useCreateTeamService } from '../../use-create-team-service';

describe('useCreateTeamService', () => {
  const cloudId = 'test-cloud-id';
  const orgId = 'test-org-id';
  const product = 'confluence';
  const teamName = 'test-team-name';

  afterEach(() => {
    fetchMock.reset();
  });

  it('should init correctly', async () => {
    const { result } = renderHook(() =>
      useCreateTeamService(cloudId, orgId, product),
    );

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: undefined,
      createTeam: expect.any(Function),
    });
  });

  it('should return data if request succeeds', async () => {
    mockCreateTeam(cloudId, product, 500, orgId);
    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateTeamService(cloudId, orgId, product),
    );

    act(() => {
      result.current.createTeam(teamName);
    });

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: undefined,
      createTeam: expect.any(Function),
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: expect.any(Object),
      createTeam: expect.any(Function),
    });
  });

  it('should return error if request fails', async () => {
    // do not call mockGetCollaborators(); to mock returned data
    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateTeamService(cloudId, orgId, product),
    );

    act(() => {
      result.current.createTeam(teamName);
    });

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: undefined,
      createTeam: expect.any(Function),
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      error: expect.any(Error),
      data: undefined,
      createTeam: expect.any(Function),
    });
  });
});
