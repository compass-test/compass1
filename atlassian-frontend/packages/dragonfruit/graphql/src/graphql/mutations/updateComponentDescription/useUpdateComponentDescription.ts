import {
  CompassComponent,
  refetchGetComponentScorecardsWithScoresQuery,
  useUpdateComponentDescriptionMutation,
} from '../../../__generated__/graphql';

type Input = Pick<CompassComponent, 'id' | 'description'>;

export function useUpdateComponentDescription() {
  const [mutate] = useUpdateComponentDescriptionMutation();

  function handleMutate(input: Input, options?: Parameters<typeof mutate>[0]) {
    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          updateComponent: {
            __typename: 'UpdateCompassComponentPayload',
            success: true,
            componentDetails: {
              __typename: 'CompassComponent',
              ...input,
            },
          },
        },
      },

      refetchQueries: [
        refetchGetComponentScorecardsWithScoresQuery({ componentId: input.id }),
      ],

      ...options,
    });
  }

  return [handleMutate];
}

export enum UpdateComponentDescriptionHandledErrors {
  COMPONENT_DESCRIPTION_TOO_LONG = 'COMPONENT_DESCRIPTION_TOO_LONG',
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
