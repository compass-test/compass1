import {
  CompassComponent,
  useUpdateComponentNameMutation,
} from '../../../__generated__/graphql';

type Input = Pick<CompassComponent, 'id' | 'name'>;

export function useUpdateComponentName() {
  const [mutate] = useUpdateComponentNameMutation();

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

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}

export enum UpdateComponentNameHandledErrors {
  COMPONENT_NAME_BLANK = 'COMPONENT_NAME_BLANK',
  COMPONENT_NAME_TOO_LONG = 'COMPONENT_NAME_TOO_LONG',
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
