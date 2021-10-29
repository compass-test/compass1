import {
  DeleteCompassScorecardCriteriasInput,
  useDeleteScorecardCriteriasMutation,
} from '../../../__generated__/graphql';

export function useDeleteScorecardCriterias() {
  const [mutate] = useDeleteScorecardCriteriasMutation();

  function handleMutate(
    scorecardId: string,
    input: DeleteCompassScorecardCriteriasInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: {
        scorecardId: scorecardId,
        input: input,
      },
      ...options,
    });
  }
  return [handleMutate];
}
