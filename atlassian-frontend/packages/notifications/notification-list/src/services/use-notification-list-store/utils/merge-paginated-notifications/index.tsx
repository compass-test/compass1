import { LoadingState, RenderableNotification } from '../../../../common/types';

const mergePaginatedNotifications = (
  currentNotifications: RenderableNotification[],
  newNotifications: RenderableNotification[],
): RenderableNotification[] => {
  const newNotificationsMap = newNotifications.reduce((indexes, notif) => {
    indexes.set(notif.id, notif);
    return indexes;
  }, new Map<string, RenderableNotification>());

  const currentIndexesMap = currentNotifications.reduce((indexes, notif) => {
    indexes.set(notif.id, notif);
    return indexes;
  }, new Map<string, RenderableNotification>());

  const updatedCurrentNotifications = currentNotifications.map(
    (notification) =>
      updateNotificationDocuments(
        notification,
        newNotificationsMap.get(notification.id),
      ) ?? notification,
  );

  const notificationsToAdd = newNotifications.filter((newNotification) => {
    const exists = !!currentIndexesMap.get(newNotification.id);
    return !exists;
  });

  return updatedCurrentNotifications
    .concat(notificationsToAdd)
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
};

const updateNotificationDocuments = (
  currentNotification: RenderableNotification,
  updatedNotification?: RenderableNotification,
): RenderableNotification | null => {
  function getUpdatedBody():
    | { body: RenderableNotification['content']['body'] }
    | undefined {
    if (!updatedNotification?.content.body) {
      return undefined;
    }
    if (
      updatedNotification?.content.body.items.length >
      (currentNotification?.content.body?.items.length ?? -Infinity)
    ) {
      return { body: updatedNotification.content.body };
    }
    return { body: currentNotification.content.body };
  }

  if (!updatedNotification) {
    return null;
  }
  if (currentNotification.loadingState === LoadingState.COMPLETE) {
    return currentNotification;
  }
  return {
    ...currentNotification,
    content: {
      ...currentNotification.content,
      ...getUpdatedBody(),
    },
    loadingState: updatedNotification.loadingState,
  };
};

export default mergePaginatedNotifications;
