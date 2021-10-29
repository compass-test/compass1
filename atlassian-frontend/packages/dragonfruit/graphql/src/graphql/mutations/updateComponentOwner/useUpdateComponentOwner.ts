import {
  CompassComponent,
  refetchGetComponentScorecardsWithScoresQuery,
  useUpdateComponentOwnerMutation,
} from '../../../__generated__/graphql';

type Input = Pick<CompassComponent, 'id' | 'ownerId'>;

export function useUpdateComponentOwner() {
  const [mutate] = useUpdateComponentOwnerMutation();

  function handleMutate(input: Input, options?: Parameters<typeof mutate>[0]) {
    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          updateComponent: {
            __typename: 'UpdateCompassComponentPayload',
            success: true,
            errors: null,
            componentDetails: {
              __typename: 'CompassComponent',
              ...input,
            },
          },
        },
      },

      refetchQueries: [
        refetchGetComponentScorecardsWithScoresQuery({ componentId: input.id }),
      ],

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}
