import { useCallback, useRef } from 'react';

import moment from 'moment-timezone';

import type {
  CalendarApi,
  DateSelectArg,
  DatesSetArg,
  EventApi,
} from '@atlassian/fullcalendar-common';
import type { EventDropArg } from '@atlassian/fullcalendar-core';
import allLocales from '@atlassian/fullcalendar-core/locales-all';
import type {
  DateClickArg,
  EventReceiveArg,
  EventResizeDoneArg,
} from '@atlassian/fullcalendar-interaction';

import type {
  CalendarView,
  CalendarViewRange,
  Event,
  EventClickCallback,
  EventPopupContext,
} from '../../common/types';
import {
  getEventAddPopupId,
  getEventClickPopupId,
  getMoreEventsPopupId,
  toMoment,
} from '../../common/utils';

import {
  EventContentProps,
  PLACEHOLDER_EVENT_ID,
} from './event-content-wrapper';
import type {
  EventAddCallbackOptions,
  EventInteractionCallbackOptions,
  FullCalendarCallbackOptions,
  NavigationCallbackOptions,
} from './types';

export const getFcView = (view: CalendarView, viewRange: CalendarViewRange) => {
  switch (`${view}-${viewRange}`) {
    case 'grid-month':
      return 'dayGridMonth';
    case 'grid-week':
      return 'timeGridWeek';
    case 'grid-day':
      return 'timeGridDay';
    case 'grid-fiveDay':
      return 'timeGridFiveDay';
    case 'list-month':
      return 'listMonth';
    case 'list-week':
      return 'listWeek';
    case 'list-day':
      return 'listDay';
    case 'list-fiveDay':
      return 'listFiveDay';
  }

  return 'dayGridMonth';
};

export const mapToFcLocale = (locale: string) => {
  // en_GB -> en-gb
  let mappedLocale = locale.toLowerCase().replace('_', '-');

  // en-gb -> en (if needed)
  if (
    mappedLocale.includes('-') &&
    !allLocales.some((fcLocale) => fcLocale.code === mappedLocale)
  ) {
    mappedLocale = mappedLocale.split('-')[0];
  }

  if (
    // 'en' is built-in and not in allLocales
    mappedLocale === 'en' ||
    allLocales.some((fcLocale) => fcLocale.code === mappedLocale)
  ) {
    return mappedLocale;
  }

  return undefined;
};

const useFcNavigationCallbacks = <T extends Record<string, any>>({
  calendarView: { view, viewRange },
  calendarRef,
  setCalendarView,
  onDateRangeChange,
}: NavigationCallbackOptions<T>) => {
  const datesSet = useCallback(
    (dateInfo: DatesSetArg) => {
      setCalendarView((prevCalendarView) => ({
        ...prevCalendarView,
        date: calendarRef.current?.getApi().getDate(),
        dateStart: dateInfo.view.currentStart,
        dateEnd: dateInfo.view.currentEnd,
        visibleDateStart: dateInfo.view.activeStart,
        visibleDateEnd: dateInfo.view.activeEnd,
      }));
      onDateRangeChange?.(dateInfo.start, dateInfo.end, view, viewRange);
    },
    // Rule disabled as we depend on calendarRef, which is a ref that shouldn't
    // be included as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [view, viewRange, setCalendarView, onDateRangeChange],
  );

  return { datesSet };
};

const getEventPopupContentProps: <T>(
  event: Event<T>,
  popupContext: EventPopupContext<T>,
) => Omit<EventContentProps<T>, 'textColor'> = (event, popupContext) => ({
  ...popupContext.calendarView,
  event,
  isDragging: false,
  isResizing: false,
  timeText: event.allDay
    ? ''
    : popupContext.calendarView.formatDate(
        event.start,
        popupContext.eventTimeFormat,
      ),
});

const useFcEventInteractionCallbacks = <T extends Record<string, any>>({
  eventMap,
  onEventClick,
  onEventDrag,
  onEventResize,
  openPopup,
}: EventInteractionCallbackOptions<T>) => {
  const eventClick = useCallback<EventClickCallback>(
    (arg) => {
      const event = eventMap.get(arg.event.id);
      if (event) {
        if (
          arg.jsEvent.target instanceof HTMLElement &&
          arg.jsEvent.target.parentElement !== null
        ) {
          const targetRect = arg.jsEvent.target.parentElement.getBoundingClientRect();
          const targetOffsetWidth =
            arg.jsEvent.target.parentElement.offsetWidth;
          onEventClick?.(
            event,
            ({ popupOffset, popupPlacement, renderPopupContents }) => {
              openPopup({
                id: getEventClickPopupId(arg.event),
                data: arg.event.id,
                offset: popupOffset,
                placement: popupPlacement,
                renderContents: ({ context, data: eventId, onClose }) => {
                  const event = context.eventMap.get(eventId);
                  if (event) {
                    return renderPopupContents({
                      ...getEventPopupContentProps(event, context),
                      onClose,
                    });
                  } else {
                    // Close the popup if the event has been removed
                    onClose();
                    return null;
                  }
                },

                targetRect,
                targetOffsetWidth,
                mouseOffsetY: arg.jsEvent.offsetY,
                keepOpenIds: arg.fromMoreLinkPopup
                  ? [getMoreEventsPopupId()]
                  : [],
              });
            },
          );
        }
      }
    },
    [eventMap, onEventClick, openPopup],
  );

  const handleDuplicateEvents = useCallback(
    (event: EventApi, calendarApi: CalendarApi) => {
      // Check if the event has become duplicated - this happens when an event
      // is updated or removed externally while being dragged or resized
      const duplicatedEvents = calendarApi
        .getEvents()
        .filter((fcEvent) => fcEvent.id === event.id);
      if (!eventMap.has(event.id)) {
        event.remove();
      } else if (duplicatedEvents.length > 1 && event.start && event.end) {
        // Correct the start/end of the 'real' event
        const realEvent = duplicatedEvents.find(
          (fcEvent) =>
            fcEvent.start?.getTime() !== event.start?.getTime() ||
            fcEvent.end?.getTime() !== event.end?.getTime(),
        );
        realEvent?.setDates(event.start, event.end);
        event.remove();
      }
    },
    [eventMap],
  );

  // This is normally used to receive external events dropped onto the
  // calendar, but it also sometimes gets fired after events are dropped if the
  // event was externally updated during dragging
  const eventReceive = useCallback(
    (arg: EventReceiveArg) => {
      const event = eventMap.get(arg.event.id);
      handleDuplicateEvents(arg.event, arg.view.calendar);
      event &&
        onEventDrag?.(
          event,
          {
            ...event,
            start: arg.event.start!,
            end: arg.event.end!,
          },
          arg.revert,
        );
    },
    [eventMap, handleDuplicateEvents, onEventDrag],
  );

  const eventDrop = useCallback(
    (arg: EventDropArg) => {
      const event = eventMap.get(arg.event.id);
      handleDuplicateEvents(arg.event, arg.view.calendar);
      event &&
        onEventDrag?.(
          event,
          {
            ...event,
            start: arg.event.start!,
            end: arg.event.end!,
          },
          arg.revert,
        );
    },
    [eventMap, handleDuplicateEvents, onEventDrag],
  );

  const eventResize = useCallback(
    (arg: EventResizeDoneArg) => {
      const event = eventMap.get(arg.event.id);
      handleDuplicateEvents(arg.event, arg.view.calendar);
      event &&
        onEventResize?.(
          event,
          {
            ...event,
            start: arg.event.start!,
            end: arg.event.end!,
          },
          arg.revert,
        );
    },
    [eventMap, handleDuplicateEvents, onEventResize],
  );

  return { eventClick, eventReceive, eventDrop, eventResize };
};

const useFcEventAddCallbacks = <T extends Record<string, any>>({
  calendarView: { view, viewRange },
  arePopupsOpen,
  timezone,
  calendarRef,
  setPlaceholderEvents,
  onEventAdd,
  openPopup,
}: EventAddCallbackOptions<T>) => {
  const eventAddCount = useRef(0);
  const handleEventAdd = useCallback(
    async (
      start: Date,
      end: Date,
      allDay: boolean,
      targetRect: DOMRect,
      targetOffsetWidth: number,
      mouseOffsetY: number,
    ) => {
      if (!onEventAdd) {
        return;
      }

      eventAddCount.current += 1;
      const currentEventAddCount = eventAddCount.current;

      let placeholderVisible = true;
      setPlaceholderEvents([
        {
          id: PLACEHOLDER_EVENT_ID,
          start,
          end,
          allDay,
          placeholder: true,
          draggable: false,
          resizable: false,
        },
      ]);

      await onEventAdd(
        start,
        end,
        allDay,
        ({ popupOffset, popupPlacement, renderPopupContents }) => {
          openPopup({
            id: getEventAddPopupId(),
            data: {
              start,
              end,
              allDay,
            },
            offset: popupOffset,
            placement: popupPlacement,
            renderContents: ({ data, context, onClose }) => {
              if (placeholderVisible) {
                return renderPopupContents({
                  ...context.calendarView,
                  ...data,
                  onClose,
                });
              } else {
                // Close the popup when the placeholder event disappears
                onClose();
                return null;
              }
            },
            targetRect,
            targetOffsetWidth,
            mouseOffsetY,
          });
        },
      );

      placeholderVisible = false;

      // Only remove the placeholder event if another event hasn't already been
      // added.
      if (eventAddCount.current === currentEventAddCount) {
        setPlaceholderEvents([]);
      }
    },
    [onEventAdd, openPopup, setPlaceholderEvents],
  );

  // Handle adding events by clicking and dragging them in day and week grid
  // views, and by clicking on whole dates in other views
  const dateClick = useCallback(
    async (arg: DateClickArg) => {
      if (
        arg.jsEvent.target instanceof HTMLElement &&
        !arePopupsOpen &&
        (view === 'list' || (view === 'grid' && viewRange === 'month'))
      ) {
        // Display a custom placeholder event in cases where FullCalendar
        // doesn't show them
        const targetRect = arg.jsEvent.target.getBoundingClientRect();
        const targetOffsetWidth = arg.jsEvent.target.offsetWidth;
        const offsetY = arg.jsEvent.offsetY;

        const start = toMoment(timezone, arg.date).startOf('day');
        const end = start.clone().add(1, 'days');
        await handleEventAdd(
          start.toDate(),
          end.toDate(),
          true,
          targetRect,
          targetOffsetWidth,
          offsetY,
        );
      }
    },
    [arePopupsOpen, view, viewRange, timezone, handleEventAdd],
  );

  const select = useCallback(
    async (arg: DateSelectArg) => {
      if (
        arg.jsEvent?.target instanceof HTMLElement &&
        view === 'grid' &&
        viewRange !== 'month'
      ) {
        // Get size & position of placeholder event and then remove it
        const targetRect = arg.jsEvent.target.getBoundingClientRect();
        const targetOffsetWidth = arg.jsEvent.target.offsetWidth;
        const offsetY = arg.jsEvent.offsetY;
        calendarRef.current?.getApi().unselect();

        await handleEventAdd(
          arg.start,
          arg.end,
          arg.allDay,
          targetRect,
          targetOffsetWidth,
          offsetY,
        );
      }
    },
    // Rule disabled as we depend on calendarRef, which is a ref that shouldn't
    // be included as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [view, viewRange, handleEventAdd],
  );

  return { dateClick, select };
};

export const useFcCallbacks = <T extends Record<string, any>>(
  options: FullCalendarCallbackOptions<T>,
) => {
  return {
    ...useFcNavigationCallbacks(options),
    ...useFcEventInteractionCallbacks(options),
    ...useFcEventAddCallbacks(options),
  };
};

export const formatTimezone = (timezone: string) =>
  `GMT${moment.tz(timezone).format('Z').replace(/:00$/, '')}`;
