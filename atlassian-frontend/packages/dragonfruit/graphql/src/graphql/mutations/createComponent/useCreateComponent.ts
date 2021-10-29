import {
  CompassComponent,
  Scalars,
  useCreateComponentMutation,
} from '../../../__generated__/graphql';
import { optimisticFields } from '../../../services/optimistic-fields';

type Input = Pick<CompassComponent, 'name' | 'type' | 'ownerId'>;

export function useCreateComponent() {
  const [mutate] = useCreateComponentMutation();

  function handleMutate(
    cloudId: Scalars['ID'],
    input: Input,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { cloudId, input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          createComponent: {
            __typename: 'CreateCompassComponentPayload',
            success: true,
            errors: null,
            componentDetails: {
              __typename: 'CompassComponent',
              // optimisticItemFields sets a fake temporary ID and sets
              // _isOptimistic: true, so that the UI knows this entity only exist optimistically
              // As this is a common set of fields to add its been extracted to a helper function
              ...optimisticFields(),
            },
          },
        },
      },

      // TODO: Add resulting
      // update: (proxy, { data }) => {
      //   Read the data from our cache for a listing query.
      //   Write our data back to the cache with the new component in it
      // },

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}

export enum CreateComponentHandledErrors {
  COMPONENT_DESCRIPTION_TOO_LONG = 'COMPONENT_DESCRIPTION_TOO_LONG',
  COMPONENT_NAME_BLANK = 'COMPONENT_NAME_BLANK',
  COMPONENT_NAME_TOO_LONG = 'COMPONENT_NAME_TOO_LONG',
}
