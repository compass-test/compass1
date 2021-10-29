import {
  CompassComponentLinkCommonFragment,
  CompassComponentLinkCommonFragmentDoc,
  DeleteCompassComponentLinkInput,
  refetchGetComponentScorecardsWithScoresQuery,
  useDeleteComponentLinkMutation,
} from '../../../__generated__/graphql';

export function useDeleteComponentLink() {
  const [mutate] = useDeleteComponentLinkMutation();

  function handleMutate(
    input: DeleteCompassComponentLinkInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      optimisticResponse: {
        __typename: 'Mutation',
        compass: {
          __typename: 'CompassCatalogMutationApi',
          deleteComponentLink: {
            __typename: 'DeleteCompassComponentLinkPayload',
            success: true,
            errors: null,
            deletedCompassLinkId: input.link,
          },
        },
      },

      refetchQueries: [
        refetchGetComponentScorecardsWithScoresQuery({
          componentId: input.componentId,
        }),
      ],

      update: (proxy, { data }) => {
        const linkId = data?.compass?.deleteComponentLink?.deletedCompassLinkId;
        if (!linkId) {
          return;
        }
        const linkCacheId = proxy.identify({
          __typename: 'CompassLink',
          id: linkId,
        });

        const link = proxy.readFragment<CompassComponentLinkCommonFragment>({
          id: linkCacheId,
          fragment: CompassComponentLinkCommonFragmentDoc,
        });

        if (link) {
          proxy.writeFragment({
            id: linkCacheId,
            fragment: CompassComponentLinkCommonFragmentDoc,
            data: {
              ...link,
              _isDeleted: true,
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

export enum DeleteComponentLinkHandledErrors {
  COMPONENT_LINK_DOES_NOT_EXIST = 'COMPONENT_LINK_DOES_NOT_EXIST',
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
}
