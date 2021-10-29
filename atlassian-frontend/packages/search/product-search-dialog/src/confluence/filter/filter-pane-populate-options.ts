import { CollaborationGraphClient, Site } from '../../common/clients';
import { SpaceContainerType } from '../../common/clients/common-types';
import { MAX_CG_RESULTS } from '../../common/clients/collaboration-graph-client/collaboration-graph-client';
import uniqBy from 'lodash/uniqBy';
import { ConfluenceSearchClient, ConfluenceRecentsClient } from '../clients';
import { SpaceFilterOption, PeopleFilterOption } from '../filter-context';
import {
  FilterOptionSource,
  SiteFilterOption,
} from '../../common/filters/types';
import { UserDetails } from '../../common/user-context/user-context';
import { CurrentSpaceInfo } from '../confluence-features/confluence-features';
import { attemptPrependCurrentSpaceToSpaceFilters } from '../filter/filter-utils';
import { attemptPrependCurrentUserToFilters } from '../../common/filters/filter-utils';

export const getPeopleFilterOptions = async (
  user: UserDetails,
  availableSiteFilters: SiteFilterOption[],
  isMultiSite: boolean | undefined,
  searchClient: ConfluenceSearchClient,
  searchSessionId: string,
  collabGraphClient: CollaborationGraphClient,
  isAnonymousUser: boolean,
): Promise<PeopleFilterOption[]> => {
  if (isAnonymousUser) {
    return Promise.resolve([]);
  }

  const checkedSites = availableSiteFilters.filter(
    (filter) => filter.isChecked,
  );

  let peopleFilters: PeopleFilterOption[];
  if (isMultiSite) {
    peopleFilters = await fetchCollabGraphPeopleOptions(
      collabGraphClient,
      checkedSites,
    );
  } else {
    peopleFilters = await getInterleavedPeopleOptions(
      collabGraphClient,
      searchClient,
      searchSessionId,
      checkedSites,
    );
  }
  return attemptPrependCurrentUserToFilters(user, peopleFilters);
};

export const getSpaceFilterOptions = async (
  collabGraphClient: CollaborationGraphClient,
  recentClient: ConfluenceRecentsClient,
  isMultiSite: boolean | undefined,
  availableSiteFilters: SiteFilterOption[],
  currentSpace?: CurrentSpaceInfo,
) => {
  let spaceFilters: SpaceFilterOption[];
  if (isMultiSite) {
    spaceFilters = await fetchCollabGraphSpaceOptions(
      collabGraphClient,
      availableSiteFilters.filter((filter) => filter.isChecked),
    );
  } else {
    spaceFilters = await getInterleavedSpacesOptions(
      collabGraphClient,
      recentClient,
    );
  }

  return attemptPrependCurrentSpaceToSpaceFilters(spaceFilters, currentSpace);
};

const fetchCollabGraphSpaceOptions = async (
  collaborationGraphClient: CollaborationGraphClient,
  sites: Array<Site> = [],
): Promise<SpaceFilterOption[]> => {
  try {
    return await collaborationGraphClient
      .getContainers([SpaceContainerType], sites)
      .then(({ collaborationGraphEntities }) =>
        collaborationGraphEntities.map((entity) => ({
          spaceName: entity.containerDetails.name,
          id: entity.containerDetails.key,
          iconUrl: entity.containerDetails.iconUrl,
          filterSource: FilterOptionSource.COLLABORATION_GRAPH,
          isChecked: false,
          isVisible: false,
        })),
      );
  } catch (e) {
    return [];
  }
};

const fetchCollabGraphPeopleOptions = async (
  collaborationGraphClient: CollaborationGraphClient,
  sites: Array<Site> = [],
): Promise<PeopleFilterOption[]> => {
  try {
    return await collaborationGraphClient
      .getUsers(sites)
      .then(({ collaborationGraphEntities }) =>
        collaborationGraphEntities.map((entity) => ({
          displayName: entity.userProfile.name,
          id: entity.id,
          avatarUrl: entity.userProfile.picture,
          filterSource: FilterOptionSource.COLLABORATION_GRAPH,
          isChecked: false,
          isVisible: false,
        })),
      );
  } catch (e) {
    return [];
  }
};

const fetchRecentPeopleOptions = async (
  searchClient: ConfluenceSearchClient,
  sessionId: string,
  sites: Site[],
): Promise<PeopleFilterOption[]> => {
  try {
    const recentPeople = await searchClient
      .getRecentPeople({ sessionId, referrerId: null }, sites)
      .promise();

    return recentPeople.items.map(({ userId, avatarUrl, name }) => {
      return {
        displayName: name,
        filterSource: FilterOptionSource.RECENT,
        avatarUrl,
        id: userId,
        isChecked: false,
        isVisible: false,
      };
    });
  } catch (e) {
    return [];
  }
};

const fetchRecentSpacesOptions = async (
  recentsClient: ConfluenceRecentsClient,
): Promise<SpaceFilterOption[]> => {
  try {
    const recentSpaces = await recentsClient.getRecentSpaces().promise();
    return recentSpaces.items.map(({ name, key, avatarUrl }) => {
      return {
        spaceName: name,
        id: key,
        iconUrl: avatarUrl,
        filterSource: FilterOptionSource.RECENT,
        isChecked: false,
        isVisible: false,
      };
    });
  } catch (e) {
    return [];
  }
};

// Exported for testing purposes
export const interleaveCGAndRecentResults = async <T extends {}>(
  collabGraphOptions: T[],
  recentOptionsFetch: () => Promise<T[]>,
  uniqueFn: (opt: T) => string,
): Promise<T[]> => {
  if (collabGraphOptions.length === MAX_CG_RESULTS) {
    return collabGraphOptions;
  } else {
    try {
      const recentOptions = await recentOptionsFetch();
      return uniqBy([...collabGraphOptions, ...recentOptions], uniqueFn);
    } catch (e) {
      return collabGraphOptions;
    }
  }
};

const getInterleavedSpacesOptions = async (
  collabGraphClient: CollaborationGraphClient,
  recentClient: ConfluenceRecentsClient,
) => {
  const collaborationGraphOptions = await fetchCollabGraphSpaceOptions(
    collabGraphClient,
  );
  const interleavedResults = await interleaveCGAndRecentResults(
    collaborationGraphOptions,
    () => fetchRecentSpacesOptions(recentClient),
    (space) => space.id,
  );
  return interleavedResults;
};

const getInterleavedPeopleOptions = async (
  collabGraphClient: CollaborationGraphClient,
  searchClient: ConfluenceSearchClient,
  sessionId: string,
  sites: Site[],
) => {
  const collabGraphOptions = await fetchCollabGraphPeopleOptions(
    collabGraphClient,
  );
  const interleavedResults = await interleaveCGAndRecentResults(
    collabGraphOptions,
    () => fetchRecentPeopleOptions(searchClient, sessionId, sites),
    (person) => person.id,
  );
  return interleavedResults;
};
