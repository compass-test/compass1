import moment from 'moment';

import { CompassAnnouncement } from '@atlassian/dragonfruit-graphql';

type Temp = Pick<CompassAnnouncement, 'targetDate'>;

export function filterAndSortUpcomingAnnouncements<T extends Temp>(
  announcements: T[],
): T[] {
  const now = moment();

  return announcements
    .filter((announcement) => {
      const targetDateMoment = moment(announcement.targetDate);
      const isTargetDateToday = now.diff(targetDateMoment, 'days') === 0;

      return isTargetDateToday || targetDateMoment.isAfter(now);
    })
    .sort(sortAscending);
}

export function filterAndSortPastAnnouncements<T extends Temp>(
  announcements: T[],
): T[] {
  const now = moment();

  return announcements
    .filter((announcement) => {
      const targetDateMoment = moment(announcement.targetDate);
      const isTargetDateToday = now.diff(targetDateMoment, 'days') === 0;

      return !isTargetDateToday && targetDateMoment.isBefore(now);
    })
    .sort(sortDescending);
}

function sortAscending<T extends Temp>(a1: T, a2: T) {
  return new Date(a1.targetDate).getTime() - new Date(a2.targetDate).getTime();
}

function sortDescending<T extends Temp>(a1: T, a2: T) {
  return new Date(a2.targetDate).getTime() - new Date(a1.targetDate).getTime();
}
