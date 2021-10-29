import { Filter } from '../../confluence/clients/confluence-search-client';

export const CONFLUENCE_ITEM_ENTITIES = [
  'ati:cloud:confluence:page',
  'ati:cloud:confluence:attachment',
  'ati:cloud:confluence:blogpost',
];

const SEARCH_QUERY = `
query($query: String, $entities:[String!]!, $locations: [String!]!, $confluenceFilters: SearchConfluenceFilter, $experience: String!){
  search{
    search(
      query: $query
      filters: {entities: $entities, locations: $locations, confluenceFilters: $confluenceFilters}
      analytics: {searchSessionId: "graphql"}
      experience: $experience
    ) {
      edges {
        node {
          id
          title
          url
          description
          type
          lastModifiedDate
          __typename
          ... on SearchConfluencePageBlogAttachment {
            type
            space {
              key
              iconUrl
            }
          }
        }
      }
    }
  }
}`;

const sitesToLocations = (sites: string[], cloudId: string): String[] => {
  const cloudIds = sites.length > 0 ? sites : [cloudId];
  const locations = cloudIds.map(
    (cloudId) => `ari:cloud:confluence::site/${cloudId}`,
  );
  return locations;
};

export interface ConfluenceGraphQLFilters {
  spaceFilter?: string[];
  contributorsFilter?: string[];
}

const confluenceFilterToGraphQLFilters = (
  filters: Filter[],
): ConfluenceGraphQLFilters => {
  return {
    spaceFilter: filters
      .filter((filter) => filter.type === 'space')
      .map((filter) => filter.id),
    contributorsFilter: filters
      .filter((filter) => filter.type === 'contributor')
      .map((filter) => filter.id),
  };
};

export { sitesToLocations, confluenceFilterToGraphQLFilters, SEARCH_QUERY };
