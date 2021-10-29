import {
  CompassComponentResult,
  QueryError,
} from '@atlassian/dragonfruit-graphql';
import { fetchJson } from '@atlassian/dragonfruit-utils';

import { RecentlyViewedComponent } from '../compass-recents-client';

const COMPONENT_NOT_FOUND_MESSAGE = 'Component not found';
const COMPONENT_NOT_FOUND_STATUS_CODE = 404;
const COMPONENT_NOT_FOUND_ERROR_TYPE = 'COMPONENT_NOT_FOUND';

export type Team = {
  id: string;
  displayName: string;
  smallAvatarImageUrl: string;
};

type SimpleCompassComponentResponse = {
  data?: {
    compass: {
      [component: string]: CompassComponentResult;
    };
  };
  errors?: Array<{ message: string }>;
};

// Not for external use!
// Retrieve multiple components.
export const bulkFetchComponents = async (
  componentIds: string[],
): Promise<Record<string, RecentlyViewedComponent | QueryError | null>> => {
  if (!componentIds || componentIds.length === 0) {
    return {};
  }

  const queryParts = componentIds.map(
    (id, idx) => `
        component${idx}: component(id: "${id}") {
          ... on CompassComponent {
            id
            name
            type
            ownerId
          }
          ... on QueryError {
            message
          }
          __typename
        }
  `,
  );

  const query = `
    query componentQuery {
      compass {
        ${queryParts.join('')}
      }
    }
  `;

  try {
    const { data } = await fetchJson<SimpleCompassComponentResponse>(
      '/gateway/api/graphql',
      {
        method: 'POST',
        headers: {
          'X-ExperimentalApi': 'compass-beta',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      },
    );

    return Object.entries(data?.compass ?? {}).reduce((acc, [k, v]) => {
      if (v.__typename === 'CompassComponent') {
        acc[v.id] = v;
      }

      if (v.__typename === 'QueryError') {
        const idx = parseInt(k.split('component')[1], 10);
        const componentId = componentIds[idx];
        acc[componentId] = v;
      }

      return acc;
    }, {} as any);
  } catch (e) {
    // Problem fetching components.
    console.error('Failed to bulk fetch components', e);

    return {};
  }
};

// Determines if a component result is Not Found.
export const componentNotFound = (
  component: RecentlyViewedComponent | QueryError | null,
): boolean => {
  if (component?.__typename === 'QueryError') {
    const message = component.message;
    const extensions = component.extensions;

    if (
      message === COMPONENT_NOT_FOUND_MESSAGE &&
      extensions?.find(
        e =>
          e.statusCode === COMPONENT_NOT_FOUND_STATUS_CODE &&
          e.errorType === COMPONENT_NOT_FOUND_ERROR_TYPE,
      )
    ) {
      return true;
    }
  }

  return false;
};
