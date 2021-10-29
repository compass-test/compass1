import type {
  ComponentType,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';

import type { PopupProps } from '@atlaskit/popup/types';
import type FullCalendar from '@atlassian/fullcalendar-react';

import type {
  CalendarView,
  CalendarViewProps,
  CalendarViewRange,
  Event,
  EventPopupContext,
} from '../../common/types';
import type { PopupControllerActions } from '../../common/ui/popup-controller';

import type { EventContentProps } from './event-content-wrapper';

export type EventClickPopupContentProps<T> = Omit<
  EventContentProps<T>,
  'textColor'
>;

export interface EventAddPopupContentProps extends CalendarViewProps {
  /** The start date and time of the event added. */
  readonly start: Date;
  /** The end date and time of the event added. */
  readonly end: Date;
  /** Whether or not the event added is an all-day event. */
  readonly allDay: boolean;
}

export interface PopupOptions<T = {}> {
  /** The `offset` prop passed to the popup. */
  readonly popupOffset?: PopupProps['offset'];
  /** The `placement` prop passed to the popup. */
  readonly popupPlacement?: PopupProps['placement'];
  /**
   * A render function to render the contents of the popup.
   */
  readonly renderPopupContents: (
    props: T & { onClose: () => void },
  ) => ReactNode;
}

export interface CalendarProps extends CalendarViewProps {
  /**
   * The actual calendar element. This should be rendered by implementations of
   * this component to display the calendar.
   */
  readonly calendar: ReactNode;
  /**
   * Function to set the view of the calendar.
   */
  readonly setView: (view: CalendarView) => void;
  /**
   * Function to set the time range of the calendar.
   */
  readonly setViewRange: (viewRange: CalendarViewRange) => void;
  /**
   * Function that moves the calendar to the next view range (i.e. the next
   * month, week or day).
   */
  readonly navigateNext: () => void;
  /**
   * Function that moves the calendar to the previous view range (i.e. the
   * previous month, week or day).
   */
  readonly navigatePrev: () => void;
  /**
   * Function that moves the calendar to today's date.
   */
  readonly navigateToday: () => void;
  /**
   * Function to set the current date of the calendar.
   */
  readonly setDate: (date: Date) => void;
}

export interface CalendarHookOptions<T> {
  /**
   * Determines the initial view used to display events.
   */
  readonly initialView?: CalendarView;
  /**
   * Determines the initial range of time displayed by the calendar.
   */
  readonly initialViewRange?: CalendarViewRange;
  /**
   * An array of events to display on the calendar.
   */
  readonly events: ReadonlyArray<Event<T>>;
  /**
   * Background color that will be used in case the backgroundColour property is not informed for an event.
   * E.g.: #7AB2FF
   */
  readonly defaultEventBackgroundColor?: string;
  /**
   * Property used to hide scroll bar of calendar body.
   */
  readonly hideScrollBar?: boolean;
  /**
   * Property used to hide the all-day events slot from the day/five-days/week views.
   *
   * Enabling this will cause all-day events to be hidden along with the all-day slot.
   */
  readonly hideAllDaySlot?: boolean;
  /**
   * The component to render inside each event in the calendar.
   *
   * By default the time and title of each event is rendered.
   */
  readonly EventContent?: ComponentType<EventContentProps<T>>;
  /**
   * The locale of the calendar, used to determine date formatting, some
   * translations, the first day of the week, and the first week of the year.
   * The language and region code may be separated by either a hyphen or
   * underscore. Defaults to 'en-US'.
   */
  readonly locale?: string;
  /**
   * The timezone of the calendar. This is a TZ database timezone name.
   */
  readonly timezone?: string;
  /**
   * Callback for when the visible dates on the calendar have changed. This can
   * be used to fetch additional events to display on the calendar in the
   * provided date range.
   *
   * @param start     the inclusive lower bound of the date range.
   * @param end       the exclusive upper bound of the date range.
   * @param view      the currently selected view of the calendar.
   * @param viewRange the currently selected view range of the calendar.
   */
  readonly onDateRangeChange?: (
    start: Date,
    end: Date,
    view: CalendarView,
    viewRange: CalendarViewRange,
  ) => void;
  /**
   * Callback for when an event is clicked.
   *
   * @param event the clicked event.
   * @param openPopup a function which can be called to open a popup next to
   *                  the event clicked.
   */
  readonly onEventClick?: (
    event: Event<T>,
    openPopup: (options: PopupOptions<EventClickPopupContentProps<T>>) => void,
  ) => void;
  /**
   * Callback for when an event has been dragged to a new date/time.
   *
   * Setting this prop enables the dragging of events. This can be overridden
   * per event with the draggable option.
   *
   * @param event     the state of the event after modification
   * @param prevEvent the previous state of the event
   * @param revert    a function to revert the change on the calendar, useful
   *                  for cases where a backend operation fails and the change
   *                  needs to be reverted on the frontend.
   */
  readonly onEventDrag?: (
    event: Event<T>,
    prevEvent: Event<T>,
    revert: () => void,
  ) => void;
  /**
   * Callback for when an event has been resized, changing its duration.
   *
   * Setting this prop enables the resizing of events. This can be overridden
   * per event with the resizable option.
   *
   * @param event     the state of the event after modification.
   * @param prevEvent the previous state of the event.
   * @param revert    a function to revert the change on the calendar, useful
   *                  for cases where a backend operation fails and the change
   *                  needs to be reverted on the frontend.
   */
  readonly onEventResize?: (
    event: Event<T>,
    prevEvent: Event<T>,
    revert: () => void,
  ) => void;
  /**
   * Callback for when an event is added to the calendar. When this callback
   * resolves or rejects, the temporary event placeholder on the calendar will
   * be removed.
   *
   * Setting this prop enables events to be created by clicking and dragging on
   * empty portions of the calendar.
   *
   * @param start  the start date and time of the event.
   * @param end    the end date and time of the event.
   * @param allDay whether or not the event was created by dragging on all-day
   *               cells.
   * @param openPopup a function which can be called to open a popup next to
   *                  the event added.
   */
  readonly onEventAdd?: (
    start: Date,
    end: Date,
    allDay: boolean,
    openPopup: (options: PopupOptions<EventAddPopupContentProps>) => void,
  ) => Promise<void>;
  /**
   * The data-testid attribute to set on the calendar.
   */
  readonly testId?: string;
}

export interface CalendarProviderProps<T> extends CalendarHookOptions<T> {
  readonly children: (props: CalendarProps) => ReactNode;
}

export type NavigationCallbackOptions<T> = {
  calendarRef: RefObject<FullCalendar | null>;
  calendarView: CalendarViewProps;
  setCalendarView: Dispatch<SetStateAction<CalendarViewProps>>;
} & Pick<CalendarHookOptions<T>, 'onDateRangeChange'>;

export type EventInteractionCallbackOptions<T> = Pick<
  CalendarHookOptions<T>,
  'onEventClick' | 'onEventDrag' | 'onEventResize'
> &
  Pick<PopupControllerActions<EventPopupContext<T>>, 'openPopup'> & {
    eventMap: Map<string, Event<T>>;
  };

export type EventAddCallbackOptions<T> = {
  calendarRef: RefObject<FullCalendar | null>;
  arePopupsOpen: boolean;
  timezone: string;
  calendarView: CalendarViewProps;
  setPlaceholderEvents: Dispatch<SetStateAction<Event<T>[]>>;
} & Pick<CalendarHookOptions<T>, 'onEventAdd'> &
  Pick<PopupControllerActions<EventPopupContext<T>>, 'openPopup'>;

export type FullCalendarCallbackOptions<T> = NavigationCallbackOptions<T> &
  EventInteractionCallbackOptions<T> &
  EventAddCallbackOptions<T>;
