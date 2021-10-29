import { CollaborationGraphClient, Site } from '../../common/clients';
import { MAX_CG_RESULTS } from '../../common/clients/collaboration-graph-client/collaboration-graph-client';
import uniqBy from 'lodash/uniqBy';
import { ConfluenceSearchClient } from '../clients';
import { PeopleFilterOption } from '../filter-context';
import {
  FilterOptionSource,
  SiteFilterOption,
} from '../../common/filters/types';
import { UserDetails } from '../../common/user-context/user-context';
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
