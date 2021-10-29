import {
  AddCompassComponentLabelsInput,
  CompassComponentLabel,
  CompassComponentLabelsFragment,
  CompassComponentLabelsFragmentDoc,
  useAddComponentLabelsMutation,
} from '../../../__generated__/graphql';

export function useAddComponentLabels() {
  const [mutate] = useAddComponentLabelsMutation();

  function handleMutate(
    input: AddCompassComponentLabelsInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    const addedLabels: Array<CompassComponentLabel> = input.labelNames.map(
      (labelName: string): CompassComponentLabel => {
        return {
          __typename: 'CompassComponentLabel',
          name: labelName,
        };
      },
    );

    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          addComponentLabels: {
            __typename: 'AddCompassComponentLabelsPayload',
            success: true,
            errors: null,
            addedLabels,
          },
        },
      },

      update: (proxy, { data }) => {
        if (!data?.compass?.addComponentLabels?.success) {
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
          const labels = compassComponent.labels ?? [];
          proxy.writeFragment({
            id,
            fragment: CompassComponentLabelsFragmentDoc,
            fragmentName: 'CompassComponentLabels',
            data: {
              ...compassComponent,
              // DECISION: Not sort the labels when they are added (for now, subject to change)
              // On query, labels are returned in alphabetical order,
              // When adding, we will add them at the end in the UI which is the place where the user created them
              // When closing the editor we still keep the non-sorted to avoid tags to "jump" in the UI
              // If the user refresh the page they will see the sorted labels now
              labels: labels.concat(addedLabels),
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

export enum AddComponentLabelsHandledErrors {
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
  COMPONENT_LABEL_LIMIT_REACHED = 'COMPONENT_LABEL_LIMIT_REACHED',
  COMPONENT_LABEL_INPUT_CANNOT_BE_EMPTY = 'COMPONENT_LABEL_INPUT_CANNOT_BE_EMPTY',
  COMPONENT_LABEL_INPUT_HAS_TOO_MANY_VALUES = 'COMPONENT_LABEL_INPUT_HAS_TOO_MANY_VALUES',
  COMPONENT_LABEL_NAME_CANNOT_BE_BLANK = 'COMPONENT_LABEL_NAME_CANNOT_BE_BLANK',
  COMPONENT_LABEL_NAME_CONTAINS_INVALID_CHARACTER = 'COMPONENT_LABEL_NAME_CONTAINS_INVALID_CHARACTER',
  COMPONENT_LABEL_NAME_TOO_LONG = 'COMPONENT_LABEL_NAME_TOO_LONG',
  COMPONENT_LABEL_NAME_CANNOT_CONTAIN_WHITESPACE_CHARACTERS = 'COMPONENT_LABEL_NAME_CANNOT_CONTAIN_WHITESPACE_CHARACTERS',
  COMPONENT_LABEL_NAME_CANNOT_CONTAIN_UPPERCASE_CHARACTERS = 'COMPONENT_LABEL_NAME_CANNOT_CONTAIN_UPPERCASE_CHARACTERS',
}
