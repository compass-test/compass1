import {
  CompassComponentAnnouncementFragment,
  CompassComponentAnnouncementFragmentDoc,
  CompassUpdateAnnouncementInput,
  useUpdateAnnouncementMutation,
} from '../../../__generated__/graphql';

export function useUpdateAnnouncement() {
  const [mutate] = useUpdateAnnouncementMutation();

  function handleMutate(
    input: CompassUpdateAnnouncementInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      update: (proxy, { data }) => {
        if (
          !data?.compass?.updateAnnouncement?.success ||
          !data?.compass?.updateAnnouncement?.updatedAnnouncement
        ) {
          return;
        }

        const announcementCacheId = proxy.identify({
          __typename: 'CompassComponentAnnouncement',
          id: input.id,
        });

        const announcementCache = proxy.readFragment<
          CompassComponentAnnouncementFragment
        >({
          id: announcementCacheId,
          fragment: CompassComponentAnnouncementFragmentDoc,
          fragmentName: 'CompassComponentAnnouncement',
        });

        if (announcementCache) {
          proxy.writeFragment({
            id: announcementCacheId,
            fragment: CompassComponentAnnouncementFragmentDoc,
            fragmentName: 'CompassComponentAnnouncement',
            data: data.compass.updateAnnouncement.updatedAnnouncement,
          });
        }
      },

      ...options,
    });
  }
  return [handleMutate];
}

export enum UpdateComponentAnnouncementHandledErrors {
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
  ANNOUNCEMENT_NOT_FOUND = 'ANNOUNCEMENT_NOT_FOUND',
}
