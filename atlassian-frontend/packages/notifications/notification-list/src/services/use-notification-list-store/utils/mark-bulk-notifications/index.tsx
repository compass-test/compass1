import {
  MarkRequestReadState,
  ReadState as RenderableReadState,
  RequestReadState,
} from '../../../../common/types';
import { RenderableNotification } from '../../types';

export default function markBulkNotifications(
  currentNotifications: RenderableNotification[],
  notificationsToMark: RenderableNotification[],
  toState: MarkRequestReadState,
  readStateFilter: RequestReadState,
): RenderableNotification[] {
  const currentNotificationsMap = currentNotifications.reduce(
    (indexes, notif) => {
      indexes.set(notif.id, notif);
      return indexes;
    },
    new Map<string, RenderableNotification>(),
  );
  const notificationsToMarkMap = notificationsToMark.reduce(
    (indexes, notif) => {
      indexes.set(notif.id, notif);
      return indexes;
    },
    new Map<string, RenderableNotification>(),
  );

  let updatedList = currentNotifications.map((currentNotification) => {
    if (notificationsToMarkMap.has(currentNotification.id)) {
      return {
        ...currentNotification,
        readState: requestReadStateToRender(toState),
      };
    }
    return currentNotification;
  });

  if (
    readStateFilter === RequestReadState.UNREAD &&
    toState === MarkRequestReadState.UNREAD
  ) {
    const notificationsToAdd = notificationsToMark
      .filter((notificationToMark) => {
        const exists = !!currentNotificationsMap.get(notificationToMark.id);
        return !exists;
      })
      .map((currentNotification) => {
        return {
          ...currentNotification,
          readState: requestReadStateToRender(toState),
        };
      });

    updatedList = updatedList
      .concat(notificationsToAdd)
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  }

  return updatedList;
}

function requestReadStateToRender(
  requestReadState: MarkRequestReadState,
): RenderableReadState {
  if (requestReadState === MarkRequestReadState.READ) {
    return RenderableReadState.READ;
  }
  return RenderableReadState.UNREAD;
}
