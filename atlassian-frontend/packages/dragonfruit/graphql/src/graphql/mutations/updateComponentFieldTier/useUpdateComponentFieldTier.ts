import {
  CompassComponent,
  useUpdateComponentFieldTierMutation,
} from '../../../__generated__/graphql';

type Input = {
  componentId: CompassComponent['id'];
  tier: string;
};

export function useUpdateComponentFieldTier() {
  const [mutate] = useUpdateComponentFieldTierMutation();

  function handleMutate(input: Input, options?: Parameters<typeof mutate>[0]) {
    return mutate({
      variables: {
        input: {
          id: input.componentId,
          fields: [
            {
              definition: 'compass:tier',
              value: {
                enum: {
                  value: [input.tier],
                },
              },
            },
          ],
        },
      },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          updateComponent: {
            __typename: 'UpdateCompassComponentPayload',
            success: true,
            errors: null,
            componentDetails: {
              __typename: 'CompassComponent',
              id: input.componentId,
              fields: [
                {
                  __typename: 'CompassEnumField',
                  definition: {
                    __typename: 'CompassFieldDefinition',
                    id: 'compass:tier',
                  },
                  value: [input.tier],
                },
              ],
            },
          },
        },
      },

      ...options,
    });
  }

  return [handleMutate];
}

export enum UpdateComponentFieldTierHandledErrors {
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
