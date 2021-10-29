import {
  CompassComponent,
  CompassComponentAnnouncementsFragment,
  CompassComponentAnnouncementsFragmentDoc,
  CompassDeleteAnnouncementInput,
  DeleteAnnouncementMutation,
  MutationError,
  useDeleteAnnouncementMutation,
} from '../../../__generated__/graphql';

export function useDeleteAnnouncement() {
  const [mutate] = useDeleteAnnouncementMutation();

  function handleMutate(
    input: CompassDeleteAnnouncementInput,
    sourceComponentId: CompassComponent['id'],
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },

      update: (proxy, { data }) => {
        if (
          !data?.compass?.deleteAnnouncement?.success &&
          // If `ANNOUNCEMENT_NOT_FOUND`, remove announcement from the cache
          !responseContainsSpecificError(
            data,
            DeleteComponentAnnouncementHandledErrors.ANNOUNCEMENT_NOT_FOUND,
          )
        ) {
          return;
        }

        const componentCacheId = proxy.identify({
          __typename: 'CompassComponent',
          id: sourceComponentId,
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
              announcements: announcements.filter(
                (existingAnn) => existingAnn.id !== input.id,
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

export enum DeleteComponentAnnouncementHandledErrors {
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
  ANNOUNCEMENT_NOT_FOUND = 'ANNOUNCEMENT_NOT_FOUND',
}

function responseContainsSpecificError(
  data: DeleteAnnouncementMutation | null | undefined,
  targetError: DeleteComponentAnnouncementHandledErrors,
) {
  const errorsInResponse = data?.compass?.deleteAnnouncement?.errors;

  return errorsInResponse?.some(
    (error: MutationError) => error.extensions?.errorType === targetError,
  );
}
