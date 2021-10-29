import {
  refetchGetComponentApplicableScorecardsQuery,
  refetchGetComponentScorecardsWithScoresQuery,
  Scalars,
  useRemoveScorecardFromComponentMutation,
} from '../../../__generated__/graphql';

export function useRemoveScorecardFromComponent() {
  const [mutate] = useRemoveScorecardFromComponentMutation();

  function handleMutate(
    scorecardId: Scalars['ID'],
    componentId: Scalars['ID'],
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { scorecardId, componentId },

      refetchQueries: [
        // refetch GetComponentScorecardsWithScoresQuery
        // to trigger update of the ScorecardQuickView
        refetchGetComponentScorecardsWithScoresQuery({ componentId }),

        // refetch applicable scorecards query to update ApplicableScorecardsSelect
        refetchGetComponentApplicableScorecardsQuery({ componentId }),
      ],

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}

// TODO COMPASS-3646: Remove this and replace references with CompassErrorType values once these are integrated into our GraphQL errors
export enum RemoveScorecardFromComponentHandledErrors {
  SCORECARD_NOT_APPLIED_TO_COMPONENT = 'SCORECARD_NOT_APPLIED_TO_COMPONENT',
}
