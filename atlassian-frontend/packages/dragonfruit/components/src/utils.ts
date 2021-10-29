import {
  CompassQueryFieldFilter,
  CompassQuerySort,
  CompassQuerySortOrder,
  CompassSearchComponentNodeFragment,
  useSearchComponentsQuery,
} from '@atlassian/dragonfruit-graphql';

// TODO: Replace this with an import from the teams package
// This was added to remove the cyclical dependency between teams, services-components, components packages
export type TeamInfo = {
  id: string;
  displayName: string;
  description: string;
  largeAvatarImageUrl: string;
  largeHeaderImageUrl: string;
  smallAvatarImageUrl: string;
  smallHeaderImageUrl: string;
  organizationId: string;
  permission: string;
  restriction: string;
  state: string;
};

import { ComponentRow } from './types';

export const DEFAULT_LOAD_MORE = 100;

export const DEFAULT_SORT_FIELD = 'title';

type SearchComponentsQueryParameters = Parameters<
  typeof useSearchComponentsQuery
>;

// The options are the first parameter provided to useSearchComponentsQuery
type SearchComponentsQueryOptions = SearchComponentsQueryParameters[0];

export function getSearchQuery(
  cloudId: string,
  filters?: Array<CompassQueryFieldFilter>,
  after?: string,
  sorts: CompassQuerySort[] = [
    { name: DEFAULT_SORT_FIELD, order: CompassQuerySortOrder.ASC },
  ],
): SearchComponentsQueryOptions {
  return {
    variables: {
      cloudId,
      query: {
        first: DEFAULT_LOAD_MORE,
        after,
        fieldFilters: filters,
        sort: sorts,
      },
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  };
}

export const injectOwnerNameIntoComponents = (
  nodes: CompassSearchComponentNodeFragment[],
  teams: Record<string, TeamInfo | Error>,
): ComponentRow[] => {
  return nodes.map((n) => {
    if (!n.component) {
      return n;
    }
    const ownerId = n.component?.ownerId;

    return {
      ...n,
      component: {
        ...n.component,
        ownerName: ownerId
          ? (teams[ownerId] as TeamInfo)?.displayName ?? null
          : '',
      },
    };
  });
};
