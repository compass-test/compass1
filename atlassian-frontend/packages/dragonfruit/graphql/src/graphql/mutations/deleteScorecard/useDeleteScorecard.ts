import {
  CompassScorecardCoreFragmentDoc,
  useDeleteScorecardMutation,
} from '../../../__generated__/graphql';

export function useDeleteScorecard() {
  const [mutate] = useDeleteScorecardMutation();

  function handleMutate(
    scorecardId: string,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { scorecardId: scorecardId },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          deleteScorecard: {
            __typename: 'DeleteCompassScorecardPayload',
            success: true,
            errors: null,
            scorecardId: scorecardId,
          },
        },
      },

      update: (cache, { data }) => {
        const id = cache.identify({
          __typename: 'CompassScorecard',
          id: data?.compass?.deleteScorecard?.scorecardId,
        });

        if (!id) {
          return;
        }

        // Find our scorecard with a fragment
        const scorecard: any = cache.readFragment({
          id,
          fragment: CompassScorecardCoreFragmentDoc,
        });

        // Write back to the fragment with _isDeleted: true
        if (scorecard) {
          cache.writeFragment({
            id,
            fragment: CompassScorecardCoreFragmentDoc,
            data: {
              ...scorecard,
              _isDeleted: true,
            },
          });
        }
      },

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}
