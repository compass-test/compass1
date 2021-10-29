import { useCallback, useLayoutEffect, useRef } from 'react';

import { di } from 'react-magnetic-di';

import type { CalendarApi } from '@atlassian/fullcalendar-common';

import type { Event } from '../../common/types';
import { getEventClickPopupId } from '../../common/utils';

import {
  decorateFcEventInput,
  DecorateFcEventInputParams,
  fcEventsEqual,
  useToFcEvent,
} from './utils';

export interface EventStateSyncOptions<T> {
  calendarApi: CalendarApi | null;
  eventMap: Map<string, Event<T>>;
  globalDraggable: boolean;
  globalResizable: boolean;
  globalBackgroundColor: string;
  openPopupIds: Set<string>;
}

export const useEventStateSync = <T>({
  calendarApi,
  eventMap,
  globalDraggable,
  globalResizable,
  globalBackgroundColor,
  openPopupIds,
}: EventStateSyncOptions<T>) => {
  di(useToFcEvent, fcEventsEqual);

  const toFcEvent = useToFcEvent(
    globalDraggable,
    globalResizable,
    globalBackgroundColor,
  );

  const toDecoratedFcEvent = useCallback(
    (event: Event<T>, params: DecorateFcEventInputParams) => {
      const fcEventInput = toFcEvent(event);
      decorateFcEventInput(fcEventInput, params);
      return fcEventInput;
    },
    [toFcEvent],
  );

  const lastEventMap = useRef<Map<string, Event<T>> | null>(null);
  const lastCalendarApi = useRef<CalendarApi | null>(null);
  const lastOpenPopupIds = useRef<Set<string>>(new Set<string>());

  useLayoutEffect(() => {
    // Clear lastEventMap if the calendar has remounted
    if (lastCalendarApi.current !== calendarApi) {
      lastEventMap.current = null;
    }

    // Don't do anything before the calendar has mounted
    if (calendarApi == null) {
      return;
    }

    for (const [id, event] of eventMap) {
      if (lastEventMap.current == null || !lastEventMap.current.has(id)) {
        const isPopupOpen = openPopupIds.has(getEventClickPopupId(event));

        // Add new events to the calendar
        calendarApi.addEvent(toDecoratedFcEvent(event, { isPopupOpen }));
      } else {
        // Check if the event has changed since the last render, taking into
        // consideration the start/end values from FullCalendar which may have
        // been updated via a drag/resize
        const fcEvent = calendarApi.getEventById(id);
        const lastEvent = lastEventMap.current.get(id);
        const lastEventWithUpdatedDates = lastEvent && {
          ...lastEvent,
          start: fcEvent?.start ?? lastEvent.start,
          end: fcEvent?.end ?? lastEvent.end,
        };

        const eventPopupId = getEventClickPopupId(event);
        const isPopupOpen = openPopupIds.has(eventPopupId);
        const wasPopupOpen = lastOpenPopupIds.current.has(eventPopupId);

        if (!fcEventsEqual(event, lastEventWithUpdatedDates)) {
          // Update modified events
          fcEvent?.remove();
          calendarApi.addEvent(toDecoratedFcEvent(event, { isPopupOpen }));
        } else if (fcEvent != null && wasPopupOpen !== isPopupOpen) {
          // Update only the classNames of the event if the popup status of the
          // event has changed
          const { classNames } = toDecoratedFcEvent(event, { isPopupOpen });
          if (classNames != null) {
            fcEvent.setProp(
              'classNames',
              typeof classNames === 'string'
                ? classNames
                : classNames.join(' '),
            );
          } else {
            fcEvent.setProp('classNames', '');
          }
        }
      }
    }

    if (lastEventMap.current != null) {
      for (const [id] of lastEventMap.current) {
        if (!eventMap.has(id)) {
          // Remove deleted events
          calendarApi.getEventById(id)?.remove();
        }
      }
    }

    lastEventMap.current = eventMap;
    lastCalendarApi.current = calendarApi;
    lastOpenPopupIds.current = openPopupIds;
  }, [eventMap, calendarApi, openPopupIds, toDecoratedFcEvent]);
};
