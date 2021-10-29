import {
  CompassCreateTeamCheckinInput,
  useCreateTeamCheckinMutation,
} from '../../../__generated__/graphql';
import { optimisticFields } from '../../../services/optimistic-fields';

export function useCreateTeamCheckin() {
  const [mutate] = useCreateTeamCheckinMutation();

  const now = new Date();

  function handleMutate(
    input: CompassCreateTeamCheckinInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          createTeamCheckin: {
            __typename: 'CompassCreateTeamCheckinPayload',
            success: true,
            errors: null,
            createdTeamCheckin: {
              __typename: 'CompassTeamCheckin',
              ...optimisticFields(),
              changeMetadata: {
                __typename: 'CompassChangeMetadata',
                createdAt: now,
                lastUserModificationAt: now,
              },
              teamId: input.teamId,
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
