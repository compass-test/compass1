import { act, renderHook } from '@testing-library/react-hooks';

// reduce flakiness of this test file.
jest.retryTimes(3);

import {
  mockGetCollaborators,
  mockGetTeams,
  resetFetchMock,
  testCollaboratorsData,
  testMyTeamsData,
} from '@atlassian/ptc-test-utils';

import useUsersTeamsData, {
  mapDataCache,
  TEAMS_CACHE_KEY,
  USERS_CACHE_KEY,
} from '../../useUsersTeamsData';
// TODO: https://product-fabric.atlassian.net/browse/PTC-4104
describe.skip('useUsersTeamsData', () => {
  const cloudId = 'test-cloud-id';
  const userId = 'test-user-id';
  const product = 'jira';

  const delay = (timeout = 1) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

  beforeEach(async () => {
    mockGetCollaborators(100);
    mockGetTeams(userId, cloudId, product, '', 100);
    jest.resetAllMocks();
    mapDataCache.clear();

    // make sure no ongoing requests
    await delay();
  });

  afterEach(async () => {
    resetFetchMock();
    // make sure no ongoing requests
    await delay();
  });

  const renderTestHook = () => {
    return renderHook(() => useUsersTeamsData(cloudId, userId, product, '', 0));
  };

  it('should return correct initial data when cache is empty', () => {
    const { result } = renderTestHook();
    expect(result.current).toEqual({
      users: undefined,
      teams: undefined,
      errorTeams: undefined,
      errorUsers: undefined,
      isLoading: true,
    });
  });

  it('should return data from cache first', () => {
    // Make these take extra long so they don't finish during the test
    resetFetchMock();
    mockGetCollaborators(15000);
    mockGetTeams(userId, cloudId, product, '', 15000);

    const usersInCache = [{ id: 'a1' }];
    const teamsInCache = [{ id: 'b1' }];
    mapDataCache.set(USERS_CACHE_KEY, usersInCache);
    mapDataCache.set(TEAMS_CACHE_KEY, teamsInCache);

    const { result } = renderTestHook();

    // expect returning data from cache first and then reuturning data from remote
    expect(result.current).toEqual({
      users: usersInCache,
      teams: teamsInCache,
      errorTeams: undefined,
      errorUsers: undefined,
      isLoading: true,
    });
  });

  it('should return the latest data from services eventually', async () => {
    const usersInCache = [{ id: 'a1' }];
    const teamsInCache = [{ id: 'b1' }];
    mapDataCache.set(USERS_CACHE_KEY, usersInCache);
    mapDataCache.set(TEAMS_CACHE_KEY, teamsInCache);

    const { result, waitForNextUpdate } = renderTestHook();

    // expect returning data from cache first and then returning data from remote
    expect(result.current).toEqual({
      users: usersInCache,
      teams: teamsInCache,
      errorTeams: undefined,
      errorUsers: undefined,
      isLoading: true,
    });

    await waitForNextUpdate();
    await waitForNextUpdate();

    act(() => {});

    // expect to return data from remote eventually
    expect(result.current).toEqual({
      users: expect.any(Array),
      teams: expect.any(Array),
      errorTeams: undefined,
      errorUsers: undefined,
      isLoading: false,
    });
    expect(result.current.users).toHaveLength(
      testCollaboratorsData.collaborationGraphEntities.length,
    );
    expect(result.current.teams).toHaveLength(testMyTeamsData.entities.length);
    expect(mapDataCache.get(USERS_CACHE_KEY)).toHaveLength(
      testCollaboratorsData.collaborationGraphEntities.length,
    );
    expect(mapDataCache.get(TEAMS_CACHE_KEY)).toHaveLength(
      testMyTeamsData.entities.length,
    );
  });
});
