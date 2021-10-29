import {
  CompassRelationshipCoreFragment,
  CompassRelationshipCoreFragmentDoc,
  DeleteCompassRelationshipInput,
  refetchGetComponentDetailsQuery,
  useDeleteRelationshipMutation,
} from '../../../__generated__/graphql';

export function useDeleteRelationship() {
  const [mutate] = useDeleteRelationshipMutation();

  function handleMutate(
    input: DeleteCompassRelationshipInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      // This is needed for the config-as-code yaml setup modal so that it has the newly updated list of relationships.
      refetchQueries: [
        refetchGetComponentDetailsQuery({ id: input.startNodeId }),
      ],

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          deleteRelationship: {
            __typename: 'DeleteCompassRelationshipPayload',
            success: true,
            errors: null,
          },
        },
      },

      update: (proxy, { data }) => {
        // Don't do anything if the query failed
        if (!data?.compass?.deleteRelationship?.success) {
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

        // Mark it as deleted
        if (relationship) {
          proxy.writeFragment({
            id: relationshipCacheId,
            fragment: CompassRelationshipCoreFragmentDoc,
            data: {
              ...relationship,
              _isDeleted: true,
            },
          });
        }
      },

      ...options,
    });
  }

  return [handleMutate];
}

export enum DeleteRelationshipHandledErrors {
  RELATIONSHIP_NOT_FOUND = 'RELATIONSHIP_NOT_FOUND',
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
