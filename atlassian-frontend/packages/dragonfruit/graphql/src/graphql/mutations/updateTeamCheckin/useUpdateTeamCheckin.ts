import {
  CompassUpdateTeamCheckinInput,
  useUpdateTeamCheckinMutation,
} from '../../../__generated__/graphql';

export function useUpdateTeamCheckin() {
  const [mutate] = useUpdateTeamCheckinMutation();
  const now = new Date();

  function handleMutate(
    input: CompassUpdateTeamCheckinInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          updateTeamCheckin: {
            __typename: 'CompassUpdateTeamCheckinPayload',
            success: true,
            errors: null,
            updatedTeamCheckin: {
              __typename: 'CompassTeamCheckin',
              _isOptimistic: true,
              changeMetadata: {
                __typename: 'CompassChangeMetadata',
                createdAt: now,
                lastUserModificationAt: now,
              },
              id: input.id,
              mood: input.mood,
              response1: input.response1,
              response2: input.response2,
              response3: input.response3,
            },
          },
        },
      },

      ...options,
    });
  }

  return [handleMutate];
}
