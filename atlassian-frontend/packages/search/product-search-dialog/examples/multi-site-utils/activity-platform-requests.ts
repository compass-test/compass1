import { Products } from '../../src';
import {
  ConfItemResults,
  ConfluenceObjectResult,
  ConfluenceContentType,
  RecentConfluence,
} from '../../src';

const RECENTLY_VIEWED_REQUEST = `
query start_Activities($first: Int = 10) {
  activities {
    myActivities {
      viewed(first: $first, filters: [{arguments:{products: [CONFLUENCE], objectTypes: [BLOGPOST, PAGE]}}] ) {
        nodes {
          id
          timestamp
          object {
            id
            localResourceId
            name
            cloudId
            product
            url
            iconUrl
            type
            containers {
              name
              type
              id
            }
            contributors {
              profile {
                accountId
                name
                picture
              }
            }
            events {
              eventType
            }
          }
        }
      }
    }
  }
}
`;

enum ContainerType {
  site = 'SITE',
  space = 'SPACE',
}

interface Container {
  name: string;
  type: ContainerType;
}

enum ObjectType {
  blog = 'BLOGPOST',
  page = 'PAGE',
}

interface Node {
  id: string;
  object: {
    containers: Array<Container>;
    localResourceId: string;
    name: string;
    type: ObjectType;
    url: string;
    product: Products;
  };
}

interface GrapQlResponse {
  data: {
    activities: {
      myActivities: {
        viewed: {
          nodes: Array<Node>;
        };
      };
    };
  };
}

const GRAPHQL_STG_PATH = 'https://pug.jira-dev.com/gateway/api/graphql';

let recentItems: GrapQlResponse | null = null;

const getRecents = async () => {
  if (recentItems) {
    return recentItems;
  }
  const response = await window.fetch(GRAPHQL_STG_PATH, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'start_Activities',
      query: RECENTLY_VIEWED_REQUEST,
    }),
  });

  recentItems = await response.json();
  return recentItems;
};

const filterResults = async (product: Products) => {
  const items = await getRecents();
  return items?.data.activities.myActivities.viewed.nodes.filter(
    (item: Node) => item.object.product === product,
  );
};

export const getConfluenceRecents: () => Promise<
  ConfItemResults
> = async () => {
  try {
    const confItems = await filterResults(Products.confluence);

    if (confItems) {
      const items = confItems.map((confItem: Node) => {
        return {
          resultId: confItem.object.localResourceId,
          name: confItem.object.name,
          href: confItem.object.url,
          containerName:
            confItem.object.containers.find(
              (container) => container.type === ContainerType.space,
            )?.name || '',
          analyticsType: RecentConfluence,
          resultType: ConfluenceObjectResult,
          contentType: `confluence-${
            confItem.object.type === ObjectType.blog ? 'blog' : 'page'
          }` as ConfluenceContentType,
          containerId: '',
          isRecentResult: true,
          lastModified: undefined, // not available for recent results}
        };
      });

      return Promise.resolve({ totalSize: items.length, items, timings: 0 });
    }
  } catch (e) {
    console.error(
      '1. Pls launch browser in non secure mode: \n https://stackoverflow.com/a/6083677/2427266 \n 2. Login to pug, jdog, sdog',
    );
  }
  return Promise.resolve({ totalSize: 0, items: [], timings: 0 });
};
