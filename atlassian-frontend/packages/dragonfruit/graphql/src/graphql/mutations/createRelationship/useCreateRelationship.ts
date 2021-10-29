import {
  CompassRelationshipCoreFragment,
  CompassRelationshipCoreFragmentDoc,
  CreateCompassRelationshipInput,
  refetchGetComponentDetailsQuery,
  useCreateRelationshipMutation,
} from '../../../__generated__/graphql';

export function useCreateRelationship() {
  const [mutate] = useCreateRelationshipMutation();

  function handleMutate(
    input: CreateCompassRelationshipInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      // This is needed for the config-as-code yaml setup modal so that it has the newly updated list of relationships.
      refetchQueries: [
        refetchGetComponentDetailsQuery({ id: input.startNodeId }),
      ],

      ...options,

      update: (proxy, { data }) => {
        // Don't do anything if the query failed
        if (!data?.compass?.createRelationship?.success) {
          return;
        }

        // Get the ID of the relationship
        const relationshipCacheId = proxy.identify({
          __typename: 'CompassRelationship',
          type: input.type,
          startNode: { id: input.startNodeId },
          endNode: { id: input.endNodeId },
        });

        if (!relationshipCacheId) {
          return;
        }

        // Find the relationship in cache
        const relationship = proxy.readFragment<
          CompassRelationshipCoreFragment
        >({
          id: relationshipCacheId,
          fragment: CompassRelationshipCoreFragmentDoc,
        });

        // set _isDeleted = false
        if (relationship) {
          proxy.writeFragment({
            id: relationshipCacheId,
            fragment: CompassRelationshipCoreFragmentDoc,
            data: {
              ...relationship,
              _isDeleted: false,
            },
          });
        }

        if (options?.update) {
          options.update(proxy, { data });
        }
      },
    });
  }

  return [handleMutate];
}

export enum CreateRelationshipHandledErrors {
  RELATIONSHIP_ALREADY_EXISTS = 'RELATIONSHIP_ALREADY_EXISTS',
  RELATIONSHIP_LIMIT_REACHED = 'RELATIONSHIP_LIMIT_REACHED',
  RELATIONSHIP_START_NODE_NOT_FOUND = 'RELATIONSHIP_START_NODE_NOT_FOUND',
  RELATIONSHIP_END_NODE_NOT_FOUND = 'RELATIONSHIP_END_NODE_NOT_FOUND',
  RELATIONSHIP_NODES_SELF_REFERENCING_ERROR = 'RELATIONSHIP_NODES_SELF_REFERENCING_ERROR',
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
