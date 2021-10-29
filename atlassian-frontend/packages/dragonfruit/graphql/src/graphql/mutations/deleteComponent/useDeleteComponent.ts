import {
  CompassComponentCoreFragment,
  CompassComponentCoreFragmentDoc,
  DeleteCompassComponentInput,
  useDeleteComponentMutation,
} from '../../../__generated__/graphql';

export function useDeleteComponent() {
  const [mutate] = useDeleteComponentMutation();

  function handleMutate(
    input: DeleteCompassComponentInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          deleteComponent: {
            __typename: 'DeleteCompassComponentPayload',
            deletedComponentId: input.id,
            success: true,
            errors: null,
            _isOptimistic: true,
          },
        },
      },

      update: (proxy, { data }) => {
        const id = proxy.identify({
          __typename: 'CompassComponent',
          id: data?.compass?.deleteComponent?.deletedComponentId,
        });

        if (!id) {
          return;
        }

        const component = proxy.readFragment<CompassComponentCoreFragment>({
          id,
          fragment: CompassComponentCoreFragmentDoc,
        });

        if (component) {
          proxy.writeFragment({
            id,
            fragment: CompassComponentCoreFragmentDoc,
            data: {
              ...component,
              _isOptimistic:
                data?.compass?.deleteComponent?._isOptimistic ?? false,
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

export enum DeleteComponentHandledErrors {
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
