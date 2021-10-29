import {
  CompassDeleteTeamCheckinInput,
  CompassTeamCheckinCoreFragmentDoc,
  DeleteTeamCheckinMutation,
  MutationError,
  useDeleteTeamCheckinMutation,
} from '../../../__generated__/graphql';

export function useDeleteTeamCheckin() {
  const [mutate] = useDeleteTeamCheckinMutation();

  function handleMutate(
    input: CompassDeleteTeamCheckinInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: {
        input: input,
      },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          deleteTeamCheckin: {
            __typename: 'CompassDeleteTeamCheckinPayload',
            success: true,
            errors: null,
            deletedTeamCheckinId: input.id,
          },
        },
      },

      update: (cache, { data }) => {
        if (
          !data?.compass?.deleteTeamCheckin?.success &&
          // If `TEAM_CHECKIN_NOT_FOUND`, remove teamCheckin from the cache
          !responseContainsSpecificError(
            data,
            DeleteTeamCheckinHandledErrors.TEAM_CHECKIN_NOT_FOUND,
          )
        ) {
          return;
        }

        const id = cache.identify({
          __typename: 'CompassTeamCheckin',
          id: data?.compass?.deleteTeamCheckin?.deletedTeamCheckinId,
        });

        if (!id) {
          return;
        }

        // Find our scorecard with a fragment
        const teamCheckin: any = cache.readFragment({
          id,
          fragment: CompassTeamCheckinCoreFragmentDoc,
        });

        // Write back to the fragment with _isDeleted: true
        if (teamCheckin) {
          cache.writeFragment({
            id,
            fragment: CompassTeamCheckinCoreFragmentDoc,
            data: {
              ...teamCheckin,
              _isDeleted: true,
            },
          });
        }
      },

      ...options,
    });
  }
  return [handleMutate];
}

export enum DeleteTeamCheckinHandledErrors {
  TEAM_CHECKIN_NOT_FOUND = 'TEAM_CHECKIN_NOT_FOUND',
}

function responseContainsSpecificError(
  data: DeleteTeamCheckinMutation | null | undefined,
  targetError: DeleteTeamCheckinHandledErrors,
) {
  const errorsInResponse = data?.compass?.deleteTeamCheckin?.errors;

  return errorsInResponse?.some(
    (error: MutationError) => error.extensions?.errorType === targetError,
  );
}
