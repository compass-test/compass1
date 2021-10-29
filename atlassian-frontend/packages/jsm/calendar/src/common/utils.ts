import moment from 'moment-timezone';

import { EventApi } from '@atlassian/fullcalendar-common';

export const toMoment = (timezone: string, date: Date) => {
  if (timezone === 'local') {
    return moment(date);
  }
  return moment.tz(date, timezone);
};

// Helper functions to ensure we use the same ID for popups everywhere
export const getEventClickPopupId = (event: Pick<EventApi, 'id'>) =>
  `event-click-popup:${event.id}`;
export const getEventAddPopupId = () => 'event-add-popup';
export const getMoreEventsPopupId = () => 'more-link-popup';
