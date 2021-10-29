import { useCallback } from 'react';

import { N0 } from '@atlaskit/theme/colors';
import type { EventInput } from '@atlassian/fullcalendar-common';

import type { Event } from '../../common/types';

/** Provides a function that turns an Event into a FullCalendar EventInput. */
export const useToFcEvent = (
  globalDraggable: boolean,
  globalResizable: boolean,
  globalBackgroundColor: string,
) =>
  useCallback(
    <T extends Record<string, any>>(event: Event<T>): EventInput => {
      // IMPORTANT: If adding any new event properties here, make sure to also
      // update fcEventsEqual() below!
      const commonProps = {
        id: event.id,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        title: event.title,
        textColor: event.textColor,
        startEditable: event.draggable ?? globalDraggable,
        durationEditable: event.resizable ?? globalResizable,
      };
      if (event.placeholder) {
        return {
          ...commonProps,
          backgroundColor: N0,
          classNames: ['fc-event-placeholder'],
        };
      }
      return {
        ...commonProps,
        borderColor: event.borderColor ?? 'transparent',
        backgroundColor: event.backgroundColor ?? globalBackgroundColor,
        classNames:
          event.borderColor && event.borderColor !== 'transparent'
            ? ['fc-event-custom-border']
            : undefined,
      };
    },
    [globalDraggable, globalResizable, globalBackgroundColor],
  );

/**
 * Determines if two events are equal by value, only considering properties
 * that affect the rendering of the event on the calendar.
 */
export const fcEventsEqual = <T extends Record<string, any>>(
  eventA?: Event<T>,
  eventB?: Event<T>,
): boolean => {
  if (eventA == null || eventB == null) {
    if (eventA == null && eventB == null) {
      // Both are undefined
      return true;
    }

    // Either is undefined
    return false;
  }

  if (
    eventA.id === eventB.id &&
    eventA.start.getTime() === eventB.start.getTime() &&
    eventA.end.getTime() === eventB.end.getTime() &&
    eventA.allDay === eventB.allDay &&
    eventA.title === eventB.title &&
    eventA.draggable === eventB.draggable &&
    eventA.resizable === eventB.resizable &&
    eventA.placeholder === eventB.placeholder &&
    eventA.textColor === eventB.textColor &&
    eventA.backgroundColor === eventB.backgroundColor &&
    eventA.borderColor === eventB.borderColor
  ) {
    return true;
  }

  return false;
};

export type DecorateFcEventInputParams = {
  isPopupOpen: boolean;
};

export const decorateFcEventInput = (
  eventInput: EventInput,
  { isPopupOpen }: DecorateFcEventInputParams,
): void => {
  if (isPopupOpen) {
    eventInput.classNames = (eventInput.classNames ?? []).concat(
      'fc-event-with-open-popup',
    );
  }
};
