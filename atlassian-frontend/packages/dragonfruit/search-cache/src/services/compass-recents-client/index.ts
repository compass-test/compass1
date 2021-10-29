import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { fetchTeam } from '@atlassian/dragonfruit-rest';
import {
  FetchError,
  readJsonFromLocalStorage,
  writeToLocalStorage,
} from '@atlassian/dragonfruit-utils';

import { bulkFetchComponents, componentNotFound, Team } from '../utilities';

// CompassRecentsStorage is the shape of data we store in local storage.
interface CompassRecentsStorage {
  // Component ARIs to hydrate.
  componentIds: string[];

  // Team IDs to hydrate.
  teamIds: string[];
}

export type RecentlyViewedComponent = Pick<
  CompassComponent,
  '__typename' | 'id' | 'name' | 'ownerId' | 'type'
>;

export type RecentComponentsState = {
  components: RecentlyViewedComponent[];
  loading: boolean;
};

export type RecentlyViewedTeam = Pick<
  Team,
  'id' | 'displayName' | 'smallAvatarImageUrl'
>;

export type RecentTeamsState = {
  teams: RecentlyViewedTeam[];
  loading: boolean;
};

export interface CompassRecentsClientConfig {
  cloudId: string;
  workspaceId: string;
}

// CACHE_KEY builds a key to store and retrieve data from local storage.
export const CACHE_KEY = (cloudId: string, workspaceId: string) =>
  `compassRecentlyViewedCache:${cloudId}:${workspaceId}`;

// CACHE_FALLBACK is a default empty state returned from local storage on error or key not found.
const CACHE_FALLBACK: CompassRecentsStorage = {
  componentIds: [],
  teamIds: [],
};

const MAX_COMPONENT_CACHE_SIZE = 10;
const MAX_TEAM_CACHE_SIZE = 3;

export class CompassRecentsClient {
  public recentlyViewedComponents: RecentComponentsState = {
    components: [],
    loading: true,
  };
  public recentlyViewedTeams: RecentTeamsState = {
    teams: [],
    loading: true,
  };

  private config: CompassRecentsClientConfig;

  constructor(config: CompassRecentsClientConfig) {
    this.config = config;
  }

  public init = async () => {
    const { componentIds, teamIds } = readJsonFromLocalStorage(
      CACHE_KEY(this.config.cloudId, this.config.workspaceId),
      CACHE_FALLBACK,
    ) as CompassRecentsStorage;

    const notFoundComponentIds = await this.hydrateComponents(componentIds);
    const notFoundTeamIds = await this.hydrateTeams(teamIds);

    // Clear out components and teams that were not found.
    this.updateCache(
      componentIds.filter(id => !notFoundComponentIds.includes(id)),
      teamIds.filter(id => !notFoundTeamIds.includes(id)),
    );
  };

  // Store a component in the cache.
  public addRecentComponent = (component: RecentlyViewedComponent) => {
    // Remove duplicates.
    const components = this.recentlyViewedComponents.components.filter(
      recentComponent => recentComponent.id !== component.id,
    );

    this.recentlyViewedComponents = {
      components: [component]
        .concat(components)
        .slice(0, MAX_COMPONENT_CACHE_SIZE),
      loading: false,
    };

    const { componentIds, teamIds } = readJsonFromLocalStorage(
      CACHE_KEY(this.config.cloudId, this.config.workspaceId),
      CACHE_FALLBACK,
    ) as CompassRecentsStorage;

    writeToLocalStorage(
      CACHE_KEY(this.config.cloudId, this.config.workspaceId),
      {
        componentIds: [component.id]
          .concat(componentIds)
          // Remove duplicates.
          .filter(
            (componentId, idx, newArr) => newArr.indexOf(componentId) === idx,
          )
          // Cut to maximum size.
          .slice(0, MAX_COMPONENT_CACHE_SIZE),
        teamIds,
      },
    );
  };

  // Store a team in the cache.
  public addRecentTeam = (team: RecentlyViewedTeam) => {
    // Remove duplicates.
    const teams = this.recentlyViewedTeams.teams.filter(
      recentTeam => recentTeam.id !== team.id,
    );

    this.recentlyViewedTeams = {
      teams: [team].concat(teams).slice(0, MAX_TEAM_CACHE_SIZE),
      loading: false,
    };

    const { componentIds, teamIds } = readJsonFromLocalStorage(
      CACHE_KEY(this.config.cloudId, this.config.workspaceId),
      CACHE_FALLBACK,
    ) as CompassRecentsStorage;

    writeToLocalStorage(
      CACHE_KEY(this.config.cloudId, this.config.workspaceId),
      {
        componentIds,
        teamIds: [team.id]
          .concat(teamIds)
          // Remove duplicates.
          .filter((teamId, idx, newArr) => newArr.indexOf(teamId) === idx)
          // Cut to maximum size.
          .slice(0, MAX_TEAM_CACHE_SIZE),
      },
    );
  };

  // Retrieves full details of components in cache.
  // Returns a list of IDs that were not found and should be evicted.
  private hydrateComponents = async (
    componentIds: string[],
  ): Promise<string[]> => {
    const components = await bulkFetchComponents(componentIds);

    const hydratedComponents = Object.entries(components)
      .filter(
        ([_, component]) =>
          !!component && component.__typename === 'CompassComponent',
      )
      .map(([_, component]) => component as RecentlyViewedComponent);

    this.recentlyViewedComponents = {
      components: hydratedComponents,
      loading: false,
    };

    return Object.entries(components)
      .filter(([_, component]) => componentNotFound(component))
      .map(([componentId]) => componentId);
  };

  // Retrieves full details of teams in cache.
  // Returns a list of IDs that were not found and should be evicted.
  private hydrateTeams = async (teamIds: string[]): Promise<string[]> => {
    return Promise.all(
      teamIds.map(id =>
        fetchTeam(id).catch((e: FetchError) => ({
          id,
          error: e,
        })),
      ),
    ).then((teams: (Team | { id: string; error: any })[]) => {
      this.recentlyViewedTeams = {
        // Filter out teams that return errors.
        teams: teams.filter(v => !('error' in v)).map(v => v as Team),
        loading: false,
      };

      return teams
        .filter(
          team =>
            'error' in team &&
            (team as { error: FetchError }).error.statusCode === 404,
        )
        .map(team => team.id);
    });
  };

  // updateCache writes the current client state into local storage.
  private updateCache = (componentIds: string[], teamIds: string[]) => {
    const item = {
      componentIds,
      teamIds,
    };

    writeToLocalStorage(
      CACHE_KEY(this.config.cloudId, this.config.workspaceId),
      item,
    );
  };
}
