import {
  refetchGetComponentApplicableScorecardsQuery,
  refetchGetComponentScorecardsWithScoresQuery,
  Scalars,
  useApplyScorecardToComponentMutation,
} from '../../../__generated__/graphql';

export function useApplyScorecardToComponent() {
  const [mutate] = useApplyScorecardToComponentMutation();

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
export enum ApplyScorecardToComponentHandledErrors {
  SCORECARD_REQUIRED_NOT_APPLICABLE = 'SCORECARD_REQUIRED_NOT_APPLICABLE',
  SCORECARD_COMPONENT_TYPE_INCOMPATIBLE = 'SCORECARD_COMPONENT_TYPE_INCOMPATIBLE',
  SCORECARD_ALREADY_APPLIED_TO_COMPONENT = 'SCORECARD_ALREADY_APPLIED_TO_COMPONENT',
  SCORECARD_COMPONENT_APPLICATION_COMPONENT_NOT_FOUND = 'SCORECARD_COMPONENT_APPLICATION_COMPONENT_NOT_FOUND',
  SCORECARD_COMPONENT_APPLICATION_SCORECARD_NOT_FOUND = 'SCORECARD_COMPONENT_APPLICATION_SCORECARD_NOT_FOUND',
  SCORECARD_COMPONENT_APPLICATION_LIMIT_REACHED = 'SCORECARD_COMPONENT_APPLICATION_LIMIT_REACHED',
}
