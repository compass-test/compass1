import {
  refetchGetComponentScorecardsWithScoresQuery,
  UpdateCompassComponentLinkInput,
  useUpdateComponentLinkMutation,
} from '../../../__generated__/graphql';

export function useUpdateComponentLink() {
  const [mutate] = useUpdateComponentLinkMutation();

  function handleMutate(
    input: UpdateCompassComponentLinkInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   compass: {
      //     __typename: 'CompassCatalogMutationApi',
      //     deleteComponentLinks: {
      //       __typename: 'UpdateCompassComponentLinksPayload',
      //       success: true,
      //       componentDetails: {
      //         __typename: 'CompassComponent',
      //         __isOptimistic: true,
      //         links: []
      //       },
      //     },
      //   },
      // },

      refetchQueries: [
        refetchGetComponentScorecardsWithScoresQuery({
          componentId: input.componentId,
        }),
      ],

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }
  return handleMutate;
}
