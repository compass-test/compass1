import { gql, useQuery } from '@apollo/client';

import type { Response, Variables } from './types';

// @ts-ignore: Function implicitly has return type 'any'
const getRecursiveRelationshipsQuery = (levels: number = 2) =>
  `
    id
    name
    type
    ${
      levels > 0
        ? `
        relationships {
          nodes {
            id
            type
            startNode {
              ${getRecursiveRelationshipsQuery(levels - 1)}
            }
            endNode {
              ${getRecursiveRelationshipsQuery(levels - 1)}
            }
          }
        }
    `
        : ''
    }
`;

const queryInner = getRecursiveRelationshipsQuery(2);

export const GET_COMPONENT_RELATIONSHIPS_QUERY = gql`
  query compassComponentRelationships($id: ID!) {
    compass {
      component(id: $id) {
        ${queryInner}
      }
    }
  }
`;

const useGetComponentRelationships = (id: string) => {
  const { data, loading, error, refetch } = useQuery<Response, Variables>(
    GET_COMPONENT_RELATIONSHIPS_QUERY,
    {
      variables: { id },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
  );

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useGetComponentRelationships;
