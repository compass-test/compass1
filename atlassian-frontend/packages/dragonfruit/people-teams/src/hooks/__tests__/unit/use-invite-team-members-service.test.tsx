import { act, renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import {
  mockInviteTeamMembers,
  testMembershipData,
  testProposedMembersData,
  testTeamData,
} from '@atlassian/ptc-test-utils';

import { useInviteTeamMembers } from '../../use-invite-team-members-service';

describe('useCreateTeamService', () => {
  const cloudId = 'test-cloud-id';
  const orgId = 'test-org-id';
  const product = 'confluence';

  afterEach(() => {
    fetchMock.reset();
  });

  it('should init correctly', async () => {
    const { result } = renderHook(() => useInviteTeamMembers(cloudId, product));

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: undefined,
      inviteTeamMembers: expect.any(Function),
    });
  });

  it('should return data if request succeeds', async () => {
    mockInviteTeamMembers(cloudId, product, 500, orgId);
    const { result, waitForNextUpdate } = renderHook(() =>
      useInviteTeamMembers(cloudId, product),
    );

    act(() => {
      result.current.inviteTeamMembers(
        testTeamData.id,
        testProposedMembersData,
      );
    });

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: undefined,
      inviteTeamMembers: expect.any(Function),
    });

    // await promise;
    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: testMembershipData,
      inviteTeamMembers: expect.any(Function),
    });
  });

  it('should return error if request fails', async () => {
    // do not call mockGetCollaborators(); to mock returned data
    const { result, waitForNextUpdate } = renderHook(() =>
      useInviteTeamMembers(cloudId, product),
    );

    act(() => {
      result.current.inviteTeamMembers(
        testTeamData.id,
        testProposedMembersData,
      );
    });

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: undefined,
      inviteTeamMembers: expect.any(Function),
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      error: expect.any(Error),
      data: undefined,
      inviteTeamMembers: expect.any(Function),
    });
  });
});
