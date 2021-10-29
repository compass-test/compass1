import type {
  EventApi,
  EventClickArg,
  EventContentArg,
  FormatDateOptions,
} from '@atlassian/fullcalendar-common';

/**
 * Defines the view used to display events on the calendar.
 *
 * 'grid' displays events in a grid, similar to Google Calendar.
 *
 * 'list' displays a textual list of events, similar to the schedule or agenda
 * view on Google Calendar. All events in the current time range are shown.
 */
export type CalendarView = 'grid' | 'list';

/**
 * Defines the range of time in which to display events on the calendar.
 */
export type CalendarViewRange = 'month' | 'week' | 'day' | 'fiveDay';

export interface Event<T extends Record<string, any>> {
  /**
   * A unique identifier for the event.
   */
  readonly id: string;
  /**
   * Inclusive start date and time of the event.
   */
  readonly start: Date;
  /**
   * Exclusive end date and time of the event.
   */
  readonly end: Date;
  /**
   * Whether or not the event should be displayed as a all-day event. Defaults
   * to false.
   */
  readonly allDay?: boolean;
  /**
   * The visible title of the event.
   */
  readonly title?: string;
  /**
   * The background CSS colour of the event. Defaults to the default event
   * color.
   */
  readonly backgroundColor?: string;
  /**
   * The text CSS colour of the event. Defaults to either black or white
   * depending on the contrast with the background colour.
   */
  readonly textColor?: string;
  /**
   * The text CSS colour of the event border. Defaults to transparent.
   */
  readonly borderColor?: string;
  /**
   * Whether or not the event can be dragged. Defaults to true if an
   * onEventDrag callback is provided, and false otherwise.
   */
  readonly draggable?: boolean;
  /**
   * Whether or not the event can be resized. Defaults to true if an
   * onEventResize callback is provided, and false otherwise.
   */
  readonly resizable?: boolean;
  /**
   * Setting this will change the styling of event on the calendar to
   * that of a placeholder event.
   */
  readonly placeholder?: boolean;
  /**
   * Optional additional event data. This is not used by the calendar, however
   * is useful if you'd like to attach some additional data to events.
   */
  readonly extendedProps?: T;
}

export interface CalendarViewProps {
  /**
   * The current view of the calendar used to display events.
   */
  readonly view: CalendarView;
  /**
   * The current range of time displayed by the calendar.
   */
  readonly viewRange: CalendarViewRange;
  /**
   * The currently set date of the calendar. When the calendar's viewRange is
   * set to month or week, this will be a date that lies somewhere between the
   * start and end of the month or week.
   *
   * Initially not set before the calendar has initialised.
   */
  readonly date?: Date;
  /**
   * The inclusive start date of the current view. When the calendar's
   * viewRange is set to month or week, this will be the first day of the month
   * or week.
   *
   * Initially not set before the calendar has initialised.
   */
  readonly dateStart?: Date;
  /**
   * The exclusive end date of the current view. When the calendar's viewRange
   * is set to month or week, this will be just past the last day of the month
   * or week.
   *
   * Initially not set before the calendar has initialised.
   */
  readonly dateEnd?: Date;
  /**
   * The same as dateStart, except when additional visible dates are shown on
   * the calendar. This can happen when viewRange is set to month and there are
   * dates from the previous month visible.
   *
   * Initially not set before the calendar has initialised.
   */
  readonly visibleDateStart?: Date;
  /**
   * The same as dateEnd, except when additional visible dates are shown on the
   * calendar. This can happen when viewRange is set to month and there are
   * dates from the next month visible.
   *
   * Initially not set before the calendar has initialised.
   */
  readonly visibleDateEnd?: Date;
  /**
   * Function that formats a given date with the given options, using the
   * calendar's current locale.
   */
  readonly formatDate: (date: Date, options: FormatDateOptions) => string;
}

export type EventPopupContext<T> = {
  calendarView: CalendarViewProps;
  eventMap: Map<string, Event<T>>;
  eventTimeFormat: FormatDateOptions;
};

export type EventContentWrapperProps = Pick<
  EventContentArg,
  'timeText' | 'textColor' | 'isMirror' | 'isDragging' | 'isResizing'
> & { event: Pick<EventApi, 'id' | 'start' | 'end' | 'allDay' | 'title'> };

export type EventClickCallback = (arg: {
  event: Pick<EventClickArg['event'], 'id' | 'textColor' | 'allDay' | 'start'>;
  jsEvent: Pick<EventClickArg['jsEvent'], 'target' | 'offsetY'>;
  fromMoreLinkPopup?: boolean;
}) => void;
