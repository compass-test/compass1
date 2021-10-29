import {
  UpdateCompassScorecardCriteriasInput,
  useUpdateScorecardCriteriaMutation,
} from '../../../__generated__/graphql';

export function useUpdateScorecardCriterias() {
  const [mutate] = useUpdateScorecardCriteriaMutation();

  function handleMutate(
    scorecardId: string,
    input: UpdateCompassScorecardCriteriasInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { scorecardId: scorecardId, input: input },
      ...options,
    });
  }

  return [handleMutate];
}
