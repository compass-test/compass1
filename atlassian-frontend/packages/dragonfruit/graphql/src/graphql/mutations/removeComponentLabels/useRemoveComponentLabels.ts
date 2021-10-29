import {
  CompassComponentLabel,
  CompassComponentLabelsFragment,
  CompassComponentLabelsFragmentDoc,
  RemoveCompassComponentLabelsInput,
  useRemoveComponentLabelsMutation,
} from '../../../__generated__/graphql';

export function useRemoveComponentLabels() {
  const [mutate] = useRemoveComponentLabelsMutation();

  function handleMutate(
    input: RemoveCompassComponentLabelsInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          removeComponentLabels: {
            __typename: 'RemoveCompassComponentLabelsPayload',
            success: true,
            errors: null,
            removedLabelNames: input.labelNames,
          },
        },
      },

      update: (proxy, { data }) => {
        if (!data?.compass?.removeComponentLabels?.success) {
          return;
        }

        const id = proxy.identify({
          __typename: 'CompassComponent',
          id: input.componentId,
        });

        const compassComponent = proxy.readFragment<
          CompassComponentLabelsFragment
        >({
          id,
          fragment: CompassComponentLabelsFragmentDoc,
          fragmentName: 'CompassComponentLabels',
        });

        if (compassComponent) {
          const labelNamesToDelete = input.labelNames;
          // Only keep the labels that aren't in `labelNamesToDelete`
          const keepNonDeletedLabels = (
            existingLabel: CompassComponentLabel,
          ) => {
            return (
              existingLabel.name &&
              labelNamesToDelete.indexOf(existingLabel.name) < 0
            );
          };

          proxy.writeFragment({
            id,
            fragment: CompassComponentLabelsFragmentDoc,
            fragmentName: 'CompassComponentLabels',
            data: {
              ...compassComponent,
              labels: compassComponent.labels?.filter(keepNonDeletedLabels),
            },
          });
        }
      },

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}

export enum RemoveComponentLabelsHandledErrors {
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
