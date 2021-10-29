import fetchMock from 'fetch-mock/cjs/client';

import {
  CompassComponentType,
  QueryError,
} from '@atlassian/dragonfruit-graphql';

import * as utilities from '../utilities';

import {
  CACHE_KEY,
  CompassRecentsClient,
  CompassRecentsClientConfig,
  RecentlyViewedComponent,
  RecentlyViewedTeam,
} from './index';

const MOCK_CLOUD_ID = 'mockCloudId';
const MOCK_WORKSPACE_ID = 'mockWorkSpaceId';

const store = new Map();
const localStorageMock = (() => ({
  getItem: jest.fn().mockImplementation((key: string): string => {
    return store.get(key);
  }),
  setItem: jest.fn().mockImplementation((key: string, value: string) => {
    store.set(key, value);
  }),
  clear: jest.fn().mockImplementation(() => {
    store.clear();
  }),
  removeItem: jest.fn().mockImplementation((key: string) => {
    store.delete(key);
  }),
}))();

const mockTeams: Record<string, RecentlyViewedTeam> = {
  'id-crux': {
    id: `id-crux`,
    displayName: 'Crux',
    smallAvatarImageUrl: '',
  },
  'id-lodestone': {
    id: `id-lodestone`,
    displayName: 'Lodestone',
    smallAvatarImageUrl: '',
  },
};

const mockBulkFetchComponents = (
  mockResponses: Record<string, RecentlyViewedComponent | QueryError | null>,
) => {
  jest
    .spyOn(utilities, 'bulkFetchComponents')
    .mockImplementation(
      (
        ids: string[],
      ): Promise<Record<string, RecentlyViewedComponent | QueryError | null>> =>
        Promise.resolve(
          Object.assign({}, ...ids.map(id => ({ [id]: mockResponses[id] }))),
        ),
    );
};

const setupClient = async (
  config: CompassRecentsClientConfig,
): Promise<CompassRecentsClient> => {
  const client = new CompassRecentsClient(config);
  await client.init();
  return client;
};

const setupLocalStorage = (
  cacheKey: string,
  componentIds: string[],
  teamIds: string[],
) => {
  localStorageMock.setItem(
    cacheKey,
    JSON.stringify({
      componentIds,
      teamIds,
    }),
  );
};

describe('CompassSearchClient', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes an empty cache when localStorage is empty', async () => {
    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );
    // We've initialized the cache now.
    expect(localStorageMock.setItem).toBeCalledTimes(1);

    expect(client.recentlyViewedComponents.components.length).toEqual(0);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(0);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();
  });

  it('loads initialized but empty cache from localStorage', async () => {
    setupLocalStorage(CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID), [], []);
    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );

    expect(client.recentlyViewedComponents.components.length).toEqual(0);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(0);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();
  });

  it('loads and hydrates components from localStorage', async () => {
    const components: Record<string, RecentlyViewedComponent> = {
      'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f': {
        __typename: 'CompassComponent',
        id:
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f',
        name: 't1',
        type: CompassComponentType.SERVICE,
        ownerId: 'ownerId1',
      },
      'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9e': {
        __typename: 'CompassComponent',
        id:
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9e',
        name: 't2',
        type: CompassComponentType.SERVICE,
        ownerId: 'ownerId2',
      },
    };

    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      Object.keys(components),
      [],
    );

    mockBulkFetchComponents(components);

    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );

    expect(client.recentlyViewedComponents.components.length).toEqual(2);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(0);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // components is an array containing objects matched mocked results.
    expect(client.recentlyViewedComponents.components).toEqual(
      expect.arrayContaining(
        Object.keys(components).map(id =>
          expect.objectContaining({ ...components[id] }),
        ),
      ),
    );
  });

  it('loads and hydrates components from localStorage and removes IDs that error when fetched', async () => {
    const components: Record<string, RecentlyViewedComponent> = {
      'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f': {
        __typename: 'CompassComponent',
        id:
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f',
        name: 't1',
        type: CompassComponentType.SERVICE,
        ownerId: 'ownerId1',
      },
    };

    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      Object.keys(components).concat('this-id-in-localstorage-but-not-found'),
      [],
    );

    mockBulkFetchComponents(components);

    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );

    expect(client.recentlyViewedComponents.components.length).toEqual(1);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(0);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // components is an array containing objects matched mocked results.
    expect(client.recentlyViewedComponents.components).toEqual(
      expect.arrayContaining(
        Object.keys(components).map(id =>
          expect.objectContaining({ ...components[id] }),
        ),
      ),
    );
  });

  it('views a component and stores it into localStorage', async () => {
    const components: RecentlyViewedComponent[] = [
      {
        __typename: 'CompassComponent',
        id:
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f',
        name: 'This one starts in localStorage.',
        type: CompassComponentType.SERVICE,
        ownerId: 'ownerId1',
      },
      {
        __typename: 'CompassComponent',
        id:
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9e',
        name: 'This one is not in localStorage yet.',
        type: CompassComponentType.SERVICE,
        ownerId: 'ownerId2',
      },
    ];

    // Set up localStorage with components[0] only.
    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [components[0].id],
      [],
    );

    // Mock both components.
    mockBulkFetchComponents(
      Object.assign(
        {},
        ...components.map(component => ({ [component.id]: component })),
      ),
    );

    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );
    // We've set up the cache with previous data, and then hydrated and updated the cache again.
    expect(localStorageMock.setItem).toBeCalledTimes(2);

    // 1 component has been stored in cache and hydrated.
    expect(client.recentlyViewedComponents.components.length).toEqual(1);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(0);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // Trigger the view.
    client.addRecentComponent(components[1]);
    expect(client.recentlyViewedComponents.components.length).toEqual(2);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(0);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // Ensure we've stored the component into the cache.
    expect(localStorageMock.setItem).toBeCalledTimes(3);
    expect(localStorageMock.setItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Both components are now in the cache.
        componentIds: components.map(component => component.id).reverse(),
        teamIds: [],
      }),
    );
  });

  it('loads and hydrates teams from localStorage', async () => {
    const mockCrux = fetchMock.get(
      `/gateway/api/v3/teams/id-crux`,
      {
        id: `id-crux`,
        displayName: 'Crux',
        smallAvatarImageUrl: '',
      },
      { overwriteRoutes: true },
    );

    const mockLodestone = fetchMock.get(
      `/gateway/api/v3/teams/id-lodestone`,
      {
        id: `id-lodestone`,
        displayName: 'Lodestone',
        smallAvatarImageUrl: '',
      },
      { overwriteRoutes: true },
    );

    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [],
      Object.keys(mockTeams),
    );

    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );

    expect(client.recentlyViewedComponents.components.length).toEqual(0);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(2);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // teams is an array containing only objects matching mocked teams.
    expect(client.recentlyViewedTeams.teams).toEqual(
      expect.arrayContaining(
        Object.keys(mockTeams).map(id =>
          expect.objectContaining({ ...mockTeams[id] }),
        ),
      ),
    );

    expect(mockCrux.done()).toBeTruthy();
    expect(mockLodestone.done()).toBeTruthy();
  });

  it('loads and hydrates teams from localStorage and removes teams that error', async () => {
    const mockCrux = fetchMock.get(
      `/gateway/api/v3/teams/id-crux`,
      { id: `id-crux`, displayName: 'Crux', smallAvatarImageUrl: '' },
      { overwriteRoutes: true },
    );

    const mockLodestone = fetchMock.get(
      `/gateway/api/v3/teams/id-lodestone`,
      500,
      { overwriteRoutes: true },
    );

    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [],
      Object.keys(mockTeams),
    );

    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );

    expect(client.recentlyViewedComponents.components.length).toEqual(0);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    // Only 1 team was succesfully fetched.
    expect(client.recentlyViewedTeams.teams.length).toEqual(1);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // Cached teams only contains crux.
    expect(client.recentlyViewedTeams.teams).toEqual([mockTeams['id-crux']]);

    expect(mockCrux.done()).toBeTruthy();
    expect(mockLodestone.done()).toBeTruthy();
  });

  it('views a team and stores it into localStorage', async () => {
    const mockCrux = fetchMock.get(
      `/gateway/api/v3/teams/id-crux`,
      {
        id: `id-crux`,
        displayName: 'Crux',
      },
      { overwriteRoutes: true },
    );

    const mockLodestone = fetchMock.get(
      `/gateway/api/v3/teams/id-lodestone`,
      500,
      { overwriteRoutes: true },
    );

    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [],
      [mockTeams['id-crux'].id],
    );

    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );
    // We've set up the cache with previous data, and then hydrated and updated the cache again.
    expect(localStorageMock.setItem).toBeCalledTimes(2);

    // 1 team has been stored in cache and hydrated.
    expect(client.recentlyViewedComponents.components.length).toEqual(0);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(1);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // Trigger the view.
    client.addRecentTeam(mockTeams['id-lodestone']);
    expect(client.recentlyViewedComponents.components.length).toEqual(0);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(2);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // Ensure we've stored the team into the cache.
    expect(localStorageMock.setItem).toBeCalledTimes(3);
    expect(localStorageMock.setItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Both teams are now in the cache.
        componentIds: [],
        teamIds: Object.keys(mockTeams).reverse(),
      }),
    );

    expect(mockCrux.done()).toBeTruthy();
    expect(mockLodestone.done()).toBeTruthy();
  });

  it('should push out the last component when there are more than 10', async () => {
    // Build 25 components in total.
    const components: RecentlyViewedComponent[] = [...Array(25).keys()].map(
      i => ({
        __typename: 'CompassComponent',
        id: `id-${i}`,
        name: `name-${i}`,
        type: CompassComponentType.SERVICE,
        ownerId: `ownerId-${i}`,
      }),
    );

    // Put first 10 components into localStorage.
    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      components.slice(0, 10).map(component => component.id),
      [],
    );

    // Mock the first 10 components, as they'll be hydrated when we initialize the cache.
    mockBulkFetchComponents(
      Object.fromEntries(
        components.slice(0, 10).map(component => [component.id, component]),
      ),
    );

    // Initialize the cache.
    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    // View the 15 remaining components.
    components
      .slice(10, components.length)
      .forEach(component => client.addRecentComponent(component));

    // We should never have more than 10 components.
    expect(client.recentlyViewedComponents.components.length).toEqual(10);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(0);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // Ensure we've stored last 10 components into localStorage.
    // Set item called 17 times: 2 for initial setup, 15 for components viewed.
    expect(localStorageMock.setItem).toBeCalledTimes(17);
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Only the last 10 components are in the cache.
        componentIds: components
          .slice(15, components.length)
          .map(component => component.id)
          .reverse(),
        teamIds: [],
      }),
    );
  });

  it('should push out the last team when there are more than 3', async () => {
    // Build 10 teams in total.
    const teams: RecentlyViewedTeam[] = [...Array(10).keys()].map(i => {
      fetchMock.get(
        `/gateway/api/v3/teams/id-${i}`,
        {
          id: `id-${i}`,
          displayName: `displayName-${i}`,
          smallAvatarImageUrl: '',
        },
        { overwriteRoutes: true },
      );
      return {
        id: `id-${i}`,
        displayName: `displayName-${i}`,
        smallAvatarImageUrl: '',
      };
    });

    // Put first 3 teams into localStorage.
    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [],
      teams.slice(0, 3).map(team => team.id),
    );

    // Initialize the cache.
    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    // View the 7 remaining teams.
    teams.slice(3, teams.length).forEach(team => client.addRecentTeam(team));

    // We should never have more than 3 teams.
    expect(client.recentlyViewedComponents.components.length).toEqual(0);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(3);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // Ensure we've stored last 3 teams into localStorage.
    // Set item called 9 times: 2 for initial setup, 7 for teams viewed.
    expect(localStorageMock.setItem).toBeCalledTimes(9);
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Only the last 3 teams are in the cache.
        componentIds: [],
        teamIds: teams
          .slice(7, teams.length)
          .map(team => team.id)
          .reverse(),
      }),
    );
  });

  it('viewing components and teams should not put duplicates into cache', async () => {
    fetchMock.get(
      `/gateway/api/v3/teams/team-id-1`,
      {
        id: `team-id-1`,
        displayName: `displayName-1`,
        smallAvatarImageUrl: '',
      },
      { overwriteRoutes: true },
    );
    const team = {
      id: `team-id-1`,
      displayName: `displayName-1`,
      smallAvatarImageUrl: '',
    };

    const component: RecentlyViewedComponent = {
      __typename: 'CompassComponent',
      id: `component-id-1`,
      name: `name-1`,
      type: CompassComponentType.SERVICE,
      ownerId: `ownerId-1`,
    };
    mockBulkFetchComponents({ 'component-id-1': component });

    // Put component and team into cache.
    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [component.id],
      [team.id],
    );

    // Initialize the cache.
    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    for (let i = 0; i < 30; i++) {
      client.addRecentComponent(component);
      client.addRecentTeam(team);
    }

    // Expect no duplicates in state.
    expect(client.recentlyViewedComponents.components.length).toEqual(1);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(1);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // No duplicates.
        componentIds: [component.id],
        teamIds: [team.id],
      }),
    );
  });

  it('viewing components and teams that are already in cache should move to top of list', async () => {
    const teams: RecentlyViewedTeam[] = [...Array(3).keys()].map(i => ({
      id: `team-id-${i}`,
      displayName: `team-displayName-${i}`,
      smallAvatarImageUrl: '',
    }));
    const components: RecentlyViewedComponent[] = [...Array(5).keys()].map(
      i => ({
        __typename: 'CompassComponent',
        id: `component-id-${i}`,
        name: `component-name-${i}`,
        type: CompassComponentType.SERVICE,
        ownerId: `component-ownerId-${i}`,
      }),
    );
    mockBulkFetchComponents({ 'component-id-0': components[0] });
    fetchMock.get(
      `/gateway/api/v3/teams/team-id-0`,
      {
        id: `team-id-0`,
        displayName: `team-displayName-0`,
        smallAvatarImageUrl: '',
      },
      { overwriteRoutes: true },
    );

    // Put first component and team into localStorage.
    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [components[0].id],
      [teams[0].id],
    );

    // Initialize the cache.
    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        componentIds: [components[0].id],
        teamIds: [teams[0].id],
      }),
    );

    for (let i = 1; i < 5; i++) {
      client.addRecentComponent(components[i]);
    }
    for (let i = 1; i < 3; i++) {
      client.addRecentTeam(teams[i]);
    }

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Order is important here.
        componentIds: [
          components[4].id,
          components[3].id,
          components[2].id,
          components[1].id,
          components[0].id,
        ],
        teamIds: [teams[2].id, teams[1].id, teams[0].id],
      }),
    );

    client.addRecentComponent(components[0]);
    client.addRecentTeam(teams[0]);

    // Expect component0 and team0 to move to front of list without duplicates.
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Order is important here.
        componentIds: [
          components[0].id,
          components[4].id,
          components[3].id,
          components[2].id,
          components[1].id,
        ],
        teamIds: [teams[0].id, teams[2].id, teams[1].id],
      }),
    );
  });

  it('should work with multiple clients in same storage', async () => {
    const teams: RecentlyViewedTeam[] = [...Array(3).keys()].map(i => ({
      id: `team-id-${i}`,
      displayName: `team-displayName-${i}`,
      smallAvatarImageUrl: '',
    }));
    const components: RecentlyViewedComponent[] = [...Array(5).keys()].map(
      i => ({
        __typename: 'CompassComponent',
        id: `component-id-${i}`,
        name: `component-name-${i}`,
        type: CompassComponentType.SERVICE,
        ownerId: `component-ownerId-${i}`,
      }),
    );

    mockBulkFetchComponents(
      Object.fromEntries(
        components.map(component => [component.id, component]),
      ),
    );
    fetchMock.get(`/gateway/api/v3/teams/${teams[0].id}`, teams[0], {
      overwriteRoutes: true,
    });

    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      [components[0].id],
      [teams[0].id],
    );

    const client1 = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });
    const client2 = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    // Clients initial state is the same
    expect(client1.recentlyViewedComponents).toEqual(
      client2.recentlyViewedComponents,
    );
    expect(client1.recentlyViewedTeams).toEqual(client2.recentlyViewedTeams);

    // Viewing components in 1 client does not transfer to other client.
    client1.addRecentComponent(components[1]);
    client2.addRecentComponent(components[2]);
    client1.addRecentComponent(components[0]);
    expect(client1.recentlyViewedComponents).not.toEqual(
      client2.recentlyViewedComponents,
    );

    const expectedState = [components[0], components[2], components[1]];

    // Local storage should contain both of the new IDs.
    // Expect component0 and team0 to move to front of list without duplicates.
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Order is important here.
        componentIds: expectedState.map(component => component.id),
        teamIds: [teams[0].id],
      }),
    );

    // Test a new client (page refresh, new tab etc.)
    // New client has the latest state.
    const client3 = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });
    expect(client3.recentlyViewedComponents.components).toEqual(expectedState);
  });

  it('should remove Not Found QueryError components and Not Found teams from local storage but keep 500', async () => {
    const components: Record<
      string,
      RecentlyViewedComponent | QueryError | null
    > = {
      'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f': {
        __typename: 'CompassComponent',
        id:
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f',
        name: 't1',
        type: CompassComponentType.SERVICE,
        ownerId: 'ownerId1',
      },
      'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9e': {
        __typename: 'QueryError',
        message: 'Component not found',
        extensions: [{ statusCode: 404, errorType: 'COMPONENT_NOT_FOUND' }],
      },
      'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9g': null,
    };
    mockBulkFetchComponents(components);

    const teams: RecentlyViewedTeam[] = [...Array(3).keys()].map(i => ({
      id: `team-id-${i}`,
      displayName: `team-displayName-${i}`,
      smallAvatarImageUrl: '',
    }));
    fetchMock.get(`/gateway/api/v3/teams/${teams[0].id}`, teams[0], {
      overwriteRoutes: true,
    });
    fetchMock.get(`/gateway/api/v3/teams/${teams[1].id}`, 404, {
      overwriteRoutes: true,
    });
    fetchMock.get(`/gateway/api/v3/teams/${teams[2].id}`, 500, {
      overwriteRoutes: true,
    });

    setupLocalStorage(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      Object.keys(components),
      teams.map(team => team.id),
    );

    const client = await setupClient({
      cloudId: MOCK_CLOUD_ID,
      workspaceId: MOCK_WORKSPACE_ID,
    });

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
    );

    expect(client.recentlyViewedComponents.components.length).toEqual(1);
    expect(client.recentlyViewedComponents.loading).toBeFalsy();
    expect(client.recentlyViewedTeams.teams.length).toEqual(1);
    expect(client.recentlyViewedTeams.loading).toBeFalsy();

    // components and teams contain only hydrated results.
    expect(client.recentlyViewedComponents.components).toEqual([
      components[
        'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f'
      ],
    ]);
    expect(client.recentlyViewedTeams.teams).toEqual([teams[0]]);

    expect(localStorageMock.setItem).toBeCalledTimes(2);
    expect(localStorageMock.setItem).toBeCalledWith(
      CACHE_KEY(MOCK_CLOUD_ID, MOCK_WORKSPACE_ID),
      JSON.stringify({
        // Both components are now in the cache.
        componentIds: [
          // Hydrated component remains in cache.
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9f',
          // 5xx component remains in cache.
          'ari:cloud:compass:212c600b-26af-4461-bfad-402e2f650d67:component/485ba5d6-aa42-4f6c-b003-13e686e40334/0e0d5077-b8ca-4e9e-a842-355030d2fa9g',
        ],
        teamIds: [
          // Hydrated team remains in cache.
          teams[0].id,
          // 5xx team remains in cache.
          teams[2].id,
        ],
      }),
    );
  });
});
