import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import GlobalTheme from '@atlaskit/theme/components';
import type { GlobalThemeTokens } from '@atlaskit/theme/types';
import { WidthObserver } from '@atlaskit/width-detector';
// @atlassian/fullcalendar-react must be imported before other FullCalendar
// imports as it configures FullCalendar to use React
// eslint-disable-next-line import/order
import FullCalendar from '@atlassian/fullcalendar-react';
import type {
  DateInput,
  FormatDateOptions,
  SlotLabelContentArg,
} from '@atlassian/fullcalendar-common';
import allLocales from '@atlassian/fullcalendar-core/locales-all';
import dayGridPlugin from '@atlassian/fullcalendar-daygrid';
import interactionPlugin from '@atlassian/fullcalendar-interaction';
import listPlugin from '@atlassian/fullcalendar-list';
import timezonePlugin from '@atlassian/fullcalendar-moment-timezone';
import timeGridPlugin from '@atlassian/fullcalendar-timegrid';

import type {
  CalendarView,
  CalendarViewProps,
  CalendarViewRange,
  Event,
  EventPopupContext,
} from '../../common/types';
import { usePopupController } from '../../common/ui/popup-controller';
import { useEventStateSync } from '../../controllers/event-state-sync';

import { useAllDayContent } from './all-day-content';
import { useDayCellContent } from './day-cell-content';
import { useDayHeaderContent } from './day-header-content';
import {
  EventContentProps,
  useEventContentWrapper,
} from './event-content-wrapper';
import { useMoreLinkPopup } from './more-link-popup';
import {
  FullCalendarStyledWrapper,
  RelativeWrapper,
  SlotLabel,
} from './styled';
import type {
  CalendarHookOptions,
  CalendarProps,
  CalendarProviderProps,
  EventAddPopupContentProps,
  EventClickPopupContentProps,
  PopupOptions,
} from './types';
import {
  formatTimezone,
  getFcView,
  mapToFcLocale,
  useFcCallbacks,
} from './utils';

export type {
  EventContentProps,
  CalendarProps,
  CalendarHookOptions,
  CalendarProviderProps,
  EventClickPopupContentProps,
  EventAddPopupContentProps,
  PopupOptions,
};

export const eventTimeFormat: FormatDateOptions = {
  hour: 'numeric',
  minute: '2-digit',
  meridiem: 'short',
  omitZeroMinute: true,
};

const SlotLabelWrapper = ({ text }: SlotLabelContentArg) => (
  <SlotLabel>{text}</SlotLabel>
);

export { DefaultEventContent } from './event-content-wrapper';

export const useCalendar = <T extends Record<string, any>>({
  initialView = 'grid',
  initialViewRange = 'month',
  events,
  defaultEventBackgroundColor = '#7AB2FF',
  hideScrollBar,
  hideAllDaySlot,
  EventContent,
  locale = 'en-US',
  timezone = 'local',
  testId,
  onDateRangeChange,
  onEventClick,
  onEventDrag,
  onEventResize,
  onEventAdd,
}: CalendarHookOptions<T>): CalendarProps => {
  const draggable = !!onEventDrag;
  const resizable = !!onEventResize;

  const calendarRef = useRef<FullCalendar>(null);
  const [calendarView, setCalendarView] = useState<CalendarViewProps>({
    view: initialView,
    viewRange: initialViewRange,
    formatDate: (date: DateInput, options: FormatDateOptions) =>
      calendarRef.current?.getApi().formatDate(date, options) ?? '',
  });

  // Provide FullCalendar with event data
  const [placeholderEvents, setPlaceholderEvents] = useState<Event<T>[]>([]);
  const eventMap = useMemo(
    () =>
      new Map(
        [...events, ...placeholderEvents].map((event) => [event.id, event]),
      ),
    [events, placeholderEvents],
  );

  // Callbacks exposed to consumers
  const setView = useCallback((view: CalendarView) => {
    setCalendarView((prevCalendarView) => ({
      ...prevCalendarView,
      view,
    }));
  }, []);
  const setViewRange = useCallback((viewRange: CalendarViewRange) => {
    setCalendarView((prevCalendarView) => ({
      ...prevCalendarView,
      viewRange,
    }));
  }, []);
  const navigateNext = useCallback(() => {
    calendarRef.current?.getApi().next();
  }, []);
  const navigatePrev = useCallback(() => {
    calendarRef.current?.getApi().prev();
  }, []);
  const navigateToday = useCallback(() => {
    calendarRef.current?.getApi().today();
  }, []);
  const setDate = useCallback((date: Date) => {
    calendarRef.current?.getApi().gotoDate(date);
  }, []);

  // Handle updates to the calendar view
  useEffect(() => {
    calendarRef.current
      ?.getApi()
      .changeView(getFcView(calendarView.view, calendarView.viewRange));
  }, [calendarView.view, calendarView.viewRange]);

  // Handle popup rendering
  const popupContext = useMemo(
    () => ({
      calendarView,
      eventMap,
      eventTimeFormat,
    }),
    [calendarView, eventMap],
  );
  const [
    { arePopupsOpen, openPopupIds, popupContainer },
    { openPopup },
  ] = usePopupController<EventPopupContext<T>>(popupContext);

  useEventStateSync({
    calendarApi: calendarRef.current?.getApi() ?? null,
    eventMap,
    openPopupIds,
    globalDraggable: draggable,
    globalResizable: resizable,
    globalBackgroundColor: defaultEventBackgroundColor,
  });

  // Translate FullCalendar callbacks to provided callbacks
  const eventContent = useEventContentWrapper({
    calendarView,
    eventMap,
    EventContent,
  });
  const callbacks = useFcCallbacks({
    calendarView,
    arePopupsOpen,
    openPopup,
    timezone,
    eventMap,
    calendarRef,
    onDateRangeChange,
    onEventClick,
    onEventDrag,
    onEventResize,
    onEventAdd,
    setCalendarView,
    setPlaceholderEvents,
  });
  const { moreLinkClick, moreLinkContent } = useMoreLinkPopup(
    eventTimeFormat,
    callbacks.eventClick,
    openPopup,
    calendarView.formatDate,
    eventContent,
  );

  const formattedTimezone = formatTimezone(timezone);

  const allDayContent = useAllDayContent();
  const dayHeaderContent = useDayHeaderContent(
    calendarView.view,
    calendarView.viewRange,
    calendarView.formatDate,
  );
  const dayCellContent = useDayCellContent(
    calendarView.viewRange,
    timezone,
    calendarView.formatDate,
  );

  const calendar = (
    <GlobalTheme.Consumer>
      {(theme: GlobalThemeTokens) => (
        <FullCalendarStyledWrapper
          theme={theme}
          data-testid={testId}
          hideScrollBar={hideScrollBar || arePopupsOpen}
          hideAllDaySlot={hideAllDaySlot}
          formattedTimezone={formattedTimezone}
        >
          <RelativeWrapper>
            <WidthObserver
              setWidth={() => calendarRef.current?.getApi().updateSize()}
            />
          </RelativeWrapper>
          <FullCalendar
            /*
             * FSD-5171: Set the 'key' prop to the timezone so the FullCalendar remounts
             *           to ensure the current day is highlighted correctly according
             *           to the given timezone and not whatever timezone the calendar
             *           was first rendered with
             */
            key={timezone}
            ref={calendarRef}
            plugins={[
              timezonePlugin,
              interactionPlugin,
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            height="100%"
            slotDuration="00:15:00"
            slotLabelInterval="01:00:00"
            slotLabelContent={SlotLabelWrapper}
            fixedWeekCount={false}
            dayMaxEventRows={calendarView.viewRange === 'month' ? true : 4}
            eventDisplay="block"
            eventTimeFormat={eventTimeFormat}
            listDayFormat={{
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }}
            views={{
              timeGridFiveDay: {
                type: 'timeGrid',
                duration: { days: 5 },
              },
              listFiveDay: {
                type: 'list',
                duration: { days: 5 },
              },
            }}
            listDaySideFormat={false}
            headerToolbar={false}
            // Forces FullCalendar to always provide all-day events with an end
            // value when dragged
            forceEventDuration
            eventStartEditable={draggable}
            eventDurationEditable={resizable}
            selectable={
              onEventAdd &&
              !arePopupsOpen &&
              calendarView.view === 'grid' &&
              calendarView.viewRange !== 'month'
            }
            selectMirror
            initialView={getFcView(initialView, initialViewRange)}
            locales={allLocales}
            locale={mapToFcLocale(locale) ?? 'en'}
            {...callbacks}
            moreLinkClick={moreLinkClick}
            moreLinkContent={moreLinkContent}
            timeZone={timezone}
            allDayContent={allDayContent}
            dayHeaderContent={dayHeaderContent}
            dayCellContent={dayCellContent}
            eventContent={eventContent}
            allDaySlot={!hideAllDaySlot}
            handleWindowResize={false}
          />
          {popupContainer}
        </FullCalendarStyledWrapper>
      )}
    </GlobalTheme.Consumer>
  );

  return {
    calendar,
    ...calendarView,
    setView,
    setViewRange,
    navigateNext,
    navigatePrev,
    navigateToday,
    setDate,
  };
};

export const CalendarProvider = <T extends Record<string, any>>(
  props: CalendarProviderProps<T>,
) => {
  const { children, ...options } = props;
  const calendar = useCalendar(options);

  return <>{children(calendar)}</>;
};
