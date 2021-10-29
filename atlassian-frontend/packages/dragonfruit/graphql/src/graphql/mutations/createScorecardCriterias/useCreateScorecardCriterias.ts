import {
  CreateCompassScorecardCriteriasInput,
  useCreateScorecardCriteriasMutation,
} from '../../../__generated__/graphql';

export function useCreateScorecardCriterias() {
  const [mutate] = useCreateScorecardCriteriasMutation();

  function handleMutate(
    scorecardId: string,
    input: CreateCompassScorecardCriteriasInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { scorecardId: scorecardId, input: input },
      ...options,
    });
  }

  return [handleMutate];
}
