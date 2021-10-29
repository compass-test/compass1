import {
  CompassScorecard,
  UpdateCompassScorecardInput,
  useUpdateScorecardMutation,
} from '../../../__generated__/graphql';

type Input = {
  scorecardId: CompassScorecard['id'];
  compassScorecardInput: UpdateCompassScorecardInput;
};

export function useUpdateScorecard() {
  const [mutate] = useUpdateScorecardMutation();

  function handleMutate(input: Input, options?: Parameters<typeof mutate>[0]) {
    return mutate({
      variables: {
        scorecardId: input.scorecardId,
        input: input.compassScorecardInput,
      },

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}
