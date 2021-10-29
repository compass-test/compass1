import cloneDeep from 'lodash/cloneDeep';

import {
  CreateCompassScorecardInput,
  GetScorecardsDocument,
  useCreateScorecardMutation,
} from '../../../__generated__/graphql';

type Input = Pick<
  CreateCompassScorecardInput,
  | 'name'
  | 'description'
  | 'componentType'
  | 'importance'
  | 'criterias'
  | 'ownerId'
> & { ownerName: string };

export function useCreateScorecard() {
  const [mutate] = useCreateScorecardMutation();

  function handleMutate(
    cloudId: string,
    input: Input,
    options?: Parameters<typeof mutate>[0],
  ) {
    // ownerName required to build optimistic response but not as input to mutation
    const { ownerName, ...restInput } = input;

    return mutate({
      variables: { cloudId, input: restInput },

      update: (cache, { data }) => {
        // Read the data from our cache for this query.
        // Requires variables that match the one used in original query
        // otherwise will have MissingFieldError
        const queryResult: any = cache.readQuery({
          query: GetScorecardsDocument,
          variables: { cloudId: cloudId },
        });

        const currentScorecardId =
          data?.compass?.createScorecard?.scorecardDetails?.id;
        // destructuring input manually to match query result type exactly
        const currentScorecard = {
          componentType: input.componentType,
          description: input.description,
          id: currentScorecardId,
          importance: input.importance,
          name: input.name,
          // ownerID = undefined if no input
          owner: input.ownerId
            ? {
                name: ownerName,
                accountId: input.ownerId,
              }
            : null,
          __typename: 'CompassScorecard',
          // Add these fields for delete to take effect in UI without page refresh
          _isDeleted: false,
          _isOptimistic: false,
        };

        const updatedQueryResult = cloneDeep(queryResult);

        updatedQueryResult?.compass?.scorecards?.nodes?.push(currentScorecard);

        // Write back to include new scorecard and existing ones.
        cache.writeQuery({
          query: GetScorecardsDocument,
          variables: { cloudId: cloudId },
          data: updatedQueryResult,
        });
      },

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}
