import { Waypoint } from 'react-waypoint';

import { NotificationTimeGroup, TimeGroup } from '../../../../common/types';
import messages from '../../../../common/utils/i18n/messages';

export const resolveTimeGroupMessage = (
  timeGroup: TimeGroup,
  onlyOlderTimeGroup: boolean,
) => {
  switch (timeGroup) {
    case TimeGroup.TODAY:
      return messages.timeGroupingToday;
    case TimeGroup.YESTERDAY:
      return messages.timeGroupingYesterday;
    case TimeGroup.OLDER:
      return onlyOlderTimeGroup
        ? messages.timeGroupingLatest
        : messages.timeGroupingOlder;
  }
};

export const calculateAboveGroup = (
  previousPosition: string,
  currentPosition: string,
  index: number,
  timeGroups: NotificationTimeGroup[],
  onlyOlderTimeGroup: boolean,
) => {
  if (
    previousPosition === Waypoint.above &&
    currentPosition === Waypoint.inside
  ) {
    // We need the previous group as the index gives us the group we just left
    // Fallback to the first group if there is only one group.
    const previousGroup =
      index >= 1 ? timeGroups[index - 1].timeGroup : timeGroups[0].timeGroup;
    const timeGroupMessage = resolveTimeGroupMessage(
      previousGroup,
      onlyOlderTimeGroup,
    );
    return timeGroupMessage;
  }
  return;
};

export const calculateBelowGroup = (
  previousPosition: string,
  currentPosition: string,
  index: number,
  timeGroups: NotificationTimeGroup[],
  onlyOlderTimeGroup: boolean,
) => {
  if (
    previousPosition === Waypoint.inside &&
    currentPosition === Waypoint.above
  ) {
    // Here we just need the current group as we have already reached the group we want.
    const nextGroup = timeGroups[index].timeGroup;
    const timeGroupMessage = resolveTimeGroupMessage(
      nextGroup,
      onlyOlderTimeGroup,
    );
    return timeGroupMessage;
  }
  return;
};
