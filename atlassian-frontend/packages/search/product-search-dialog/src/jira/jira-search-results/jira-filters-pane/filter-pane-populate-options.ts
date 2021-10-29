import uniqBy from 'lodash/uniqBy';
import { CollaborationGraphClient, Site } from '../../../common/clients';
import { ProjectContainerType } from '../../../common/clients/common-types';
import { MAX_CG_RESULTS } from '../../../common/clients/collaboration-graph-client/collaboration-graph-client';

import {
  ProjectFilterOption,
  AssigneeFilterOption,
} from '../../filter-context';
import { FilterOptionSource } from '../../../common/filters/types';
import { JiraSearchClient } from '../../clients';
import {
  AttributePeople,
  isSingleAvatar,
  Result,
} from '../../clients/response-types';

export const fetchCollabGraphProjectOptions = async (
  collaborationGraphClient: CollaborationGraphClient,
  sites?: Site[],
): Promise<ProjectFilterOption[]> => {
  try {
    return await collaborationGraphClient
      .getContainers([ProjectContainerType], sites)
      .then(({ collaborationGraphEntities }) => {
        return collaborationGraphEntities.map((entity) => ({
          name: entity.containerDetails.name,
          id: entity.containerDetails.id,
          iconUrl: entity.containerDetails.iconUrl,
          filterSource: FilterOptionSource.COLLABORATION_GRAPH,
          isChecked: false,
          isVisible: false,
        }));
      });
  } catch (e) {
    return [];
  }
};

const fetchRecentProjectOptions = async (
  searchClient: JiraSearchClient,
  sessionId: string,
  sites: Site[],
): Promise<ProjectFilterOption[]> => {
  try {
    const recentProjects = await searchClient
      .getRecentProjects({ sessionId, referrerId: null }, sites)
      .promise();
    return recentProjects.items.map(
      ({ name, resultId, attributes: { avatar } }) => {
        return {
          name,
          id: resultId,
          iconUrl: isSingleAvatar(avatar) ? avatar.url : avatar.urls['24x24'],
          filterSource: FilterOptionSource.RECENT,
          isChecked: false,
          isVisible: false,
        };
      },
    );
  } catch (e) {
    return [];
  }
};

const fetchRecentPeople = async (
  searchClient: JiraSearchClient,
  sessionId: string,
  sites: Array<Site> = [],
): Promise<AssigneeFilterOption[]> => {
  try {
    const recentPeople = await searchClient
      .getRecentPeople({ sessionId, referrerId: null }, sites)
      .promise();
    return mapPeopleResultsToAssigneeFilterOption(recentPeople.items);
  } catch (e) {
    return [];
  }
};

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

export const getInterleavedProjectOptions = async (
  collabGraphClient: CollaborationGraphClient,
  searchClient: JiraSearchClient,
  sessionId: string,
  sites: Site[],
) => {
  const collaborationGraphOptions = await fetchCollabGraphProjectOptions(
    collabGraphClient,
  );
  const interleavedResults = await interleaveCGAndRecentResults(
    collaborationGraphOptions,
    () => fetchRecentProjectOptions(searchClient, sessionId, sites),
    (project) => project.id,
  );
  return interleavedResults;
};

export const getAssigneeOptions = async (
  searchClient: JiraSearchClient,
  sessionId: string,
  sites: Array<Site> = [],
  selectedSites: Site[],
): Promise<AssigneeFilterOption[]> => {
  if (selectedSites.length > 0) {
    return await searchClient
      .searchPeople('', { sessionId, referrerId: null }, selectedSites)
      .promise()
      .then((assigneeResults) =>
        mapPeopleResultsToAssigneeFilterOption(assigneeResults.items),
      );
  }
  const results = await fetchRecentPeople(searchClient, sessionId, sites);
  return results;
};

const mapPeopleResultsToAssigneeFilterOption = (
  people: Array<Result<AttributePeople>>,
): Array<AssigneeFilterOption> => {
  return people.map(({ name, attributes: { userId, avatarUrl } }) => {
    const value: AssigneeFilterOption = {
      id: userId,
      displayName: name,
      avatarUrl: avatarUrl,
      filterSource: FilterOptionSource.RECENT,
      isChecked: false,
      isVisible: false,
    };
    return value;
  });
};
