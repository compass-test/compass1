import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';

import { RenderableNotification, TimeGroup } from '../../../../common/types';

export default function timeGroupNotifications(
  renderableNotifications: RenderableNotification[],
) {
  const notificationMap: Map<
    TimeGroup,
    Array<RenderableNotification>
  > = new Map([
    [TimeGroup.TODAY, []],
    [TimeGroup.YESTERDAY, []],
    [TimeGroup.OLDER, []],
  ]);

  renderableNotifications.reduce(timeGroupNotification, notificationMap);
  const groupedNotifications = Array.from(
    notificationMap,
    ([timeGroup, notifications]) => {
      return { timeGroup, notifications };
    },
  );

  return groupedNotifications;
}

function timeGroupNotification(
  notificationMap: Map<TimeGroup, Array<RenderableNotification>>,
  currentNotification: RenderableNotification,
) {
  let timeGroup;
  if (isToday(new Date(currentNotification.timestamp))) {
    timeGroup = TimeGroup.TODAY;
  } else if (isYesterday(new Date(currentNotification.timestamp))) {
    timeGroup = TimeGroup.YESTERDAY;
  } else {
    timeGroup = TimeGroup.OLDER;
  }

  const currentNotifications = notificationMap.get(timeGroup);
  if (currentNotifications) {
    currentNotifications.push(currentNotification);
  }

  return notificationMap;
}
