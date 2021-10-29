import {
  CompassComponentAnnouncementsFragment,
  CompassComponentAnnouncementsFragmentDoc,
  CompassCreateAnnouncementInput,
  useCreateAnnouncementMutation,
} from '../../../__generated__/graphql';

export function useCreateAnnouncement() {
  const [mutate] = useCreateAnnouncementMutation();
  function handleMutate(
    input: CompassCreateAnnouncementInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      update: (proxy, { data }) => {
        if (
          !data?.compass?.createAnnouncement?.success ||
          !data?.compass?.createAnnouncement?.createdAnnouncement
        ) {
          return;
        }

        const componentCacheId = proxy.identify({
          __typename: 'CompassComponent',
          id: input.componentId,
        });

        const announcementsCache = proxy.readFragment<
          CompassComponentAnnouncementsFragment
        >({
          id: componentCacheId,
          fragment: CompassComponentAnnouncementsFragmentDoc,
          fragmentName: 'CompassComponentAnnouncements',
        });

        if (announcementsCache) {
          const announcements = announcementsCache.announcements ?? [];

          proxy.writeFragment({
            id: componentCacheId,
            fragment: CompassComponentAnnouncementsFragmentDoc,
            fragmentName: 'CompassComponentAnnouncements',
            data: {
              ...announcementsCache,
              announcements: announcements.concat(
                data.compass.createAnnouncement.createdAnnouncement,
              ),
            },
          });
        }
      },

      ...options,
    });
  }
  return [handleMutate];
}
