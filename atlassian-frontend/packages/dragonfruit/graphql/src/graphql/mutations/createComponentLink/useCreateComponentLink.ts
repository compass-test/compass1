import {
  CreateCompassComponentLinkInput,
  refetchGetComponentScorecardsWithScoresQuery,
  useCreateComponentLinkMutation,
} from '../../../__generated__/graphql';

export function useCreateComponentLink() {
  const [mutate] = useCreateComponentLinkMutation();

  function handleMutate(
    input: CreateCompassComponentLinkInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   compass: {
      //     __typename: 'CompassCatalogMutationApi',
      //     createComponentLinks: {
      //       __typename: 'CreateCompassComponentLinksPayload',
      //       success: true,
      //       componentDetails: {
      //         __typename: 'CompassComponent',
      //         __isOptimistic: true,
      //         links: []
      //       },
      //     },
      //   },
      // },

      refetchQueries: [
        refetchGetComponentScorecardsWithScoresQuery({
          componentId: input.componentId,
        }),
      ],

      // Spread the supplied options at the end so that the consumer can override
      ...options,
    });
  }

  return [handleMutate];
}

export enum CreateComponentLinkHandledErrors {
  COMPONENT_LINKS_MAXIMUM_PER_TYPE_REACHED = 'COMPONENT_LINKS_MAXIMUM_PER_TYPE_REACHED',
  COMPONENT_LINK_NAME_TOO_LONG = 'COMPONENT_LINK_NAME_TOO_LONG',
  COMPONENT_LINK_URL_NOT_A_VALID_URL = 'COMPONENT_LINK_URL_NOT_A_VALID_URL',
  COMPONENT_LINK_URL_TOO_LONG = 'COMPONENT_LINK_URL_TOO_LONG',
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
