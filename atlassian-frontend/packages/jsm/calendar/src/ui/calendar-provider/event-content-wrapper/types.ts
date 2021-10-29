import type { ComponentType } from 'react';

import type { CalendarViewProps, Event } from '../../../common/types';

export interface EventContentProps<T> extends CalendarViewProps {
  /**
   * The event to display.
   */
  readonly event: Event<T>;
  /**
   * Whether or not the event is currently being dragged by the user.
   */
  readonly isDragging: boolean;
  /**
   * Whether or not the event is currently being resized by the user.
   */
  readonly isResizing: boolean;
  /**
   * The text color of the event, as automatically determined based on contrast
   * with the event's background color.
   */
  readonly textColor: string;
  /**
   * A formatted string containing the start and end time of the event. For
   * some views this may only contain the start time of the event.
   */
  readonly timeText: string;
}

export interface UseEventContentWrapperOptions<T> {
  calendarView: CalendarViewProps;
  eventMap: Map<string, Event<T>>;
  EventContent?: ComponentType<EventContentProps<T>>;
}
