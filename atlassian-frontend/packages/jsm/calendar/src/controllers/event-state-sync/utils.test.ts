import { renderHook } from '@testing-library/react-hooks';

import { N0 } from '@atlaskit/theme/colors';
import type { EventInput } from '@atlassian/fullcalendar-common';

import type { Event } from '../../common/types';

import { fcEventsEqual, useToFcEvent } from './utils';

const mockEvent = {
  id: 'event-1',
  start: new Date('2020-01-01'),
  end: new Date('2020-01-02'),
  allDay: false,
  title: 'Event 1',
  draggable: false,
  resizable: false,
  placeholder: false,
  textColor: 'black',
  backgroundColor: 'white',
  borderColor: 'orange',
};

describe('useToFcEvent', () => {
  const globalDraggable = true;
  const globalResizable = true;
  const globalBackgroundColor = 'white';

  const toFcEvent: <T>(event: Event<T>) => EventInput = (event) => {
    const { result } = renderHook(() =>
      useToFcEvent(globalDraggable, globalResizable, globalBackgroundColor),
    );
    return result.current(event);
  };

  it('should correctly map a normal event', () => {
    const {
      draggable,
      resizable,
      borderColor,
      backgroundColor,
      ...eventWithoutOptionals
    } = mockEvent;

    expect(toFcEvent(eventWithoutOptionals)).toEqual({
      id: mockEvent.id,
      start: mockEvent.start,
      end: mockEvent.end,
      allDay: mockEvent.allDay,
      title: mockEvent.title,
      textColor: mockEvent.textColor,
      startEditable: globalDraggable,
      durationEditable: globalResizable,
      borderColor: 'transparent',
      backgroundColor: globalBackgroundColor,
      classNames: undefined,
    });
  });

  it('should correctly map a normal event with draggable and resizable properties', () => {
    const {
      borderColor,
      backgroundColor,
      ...eventWithoutOptionals
    } = mockEvent;

    expect(toFcEvent(eventWithoutOptionals)).toEqual({
      id: mockEvent.id,
      start: mockEvent.start,
      end: mockEvent.end,
      allDay: mockEvent.allDay,
      title: mockEvent.title,
      textColor: mockEvent.textColor,
      startEditable: mockEvent.draggable,
      durationEditable: mockEvent.resizable,
      borderColor: 'transparent',
      backgroundColor: globalBackgroundColor,
      classNames: undefined,
    });
  });

  it('should correctly map a normal event with a border and background color', () => {
    const { draggable, resizable, ...eventWithoutOptionals } = mockEvent;

    expect(toFcEvent(eventWithoutOptionals)).toEqual({
      id: mockEvent.id,
      start: mockEvent.start,
      end: mockEvent.end,
      allDay: mockEvent.allDay,
      title: mockEvent.title,
      textColor: mockEvent.textColor,
      startEditable: globalDraggable,
      durationEditable: globalResizable,
      borderColor: mockEvent.borderColor,
      backgroundColor: mockEvent.backgroundColor,
      classNames: ['fc-event-custom-border'],
    });
  });

  it('should correctly map a placeholder event', () => {
    expect(toFcEvent({ ...mockEvent, placeholder: true })).toEqual({
      id: mockEvent.id,
      start: mockEvent.start,
      end: mockEvent.end,
      allDay: mockEvent.allDay,
      title: mockEvent.title,
      textColor: mockEvent.textColor,
      startEditable: mockEvent.draggable,
      durationEditable: mockEvent.resizable,
      backgroundColor: N0,
      classNames: ['fc-event-placeholder'],
    });
  });
});

describe('fcEventsEqual', () => {
  it('should return true if both are undefined', () => {
    expect(fcEventsEqual(undefined, undefined)).toEqual(true);
  });

  it('should return true if both are the same', () => {
    expect(fcEventsEqual({ ...mockEvent }, { ...mockEvent })).toEqual(true);
  });

  it('should return false if the first event is undefined', () => {
    expect(fcEventsEqual(undefined, { ...mockEvent })).toEqual(false);
  });

  it('should return false if the second event is undefined', () => {
    expect(fcEventsEqual({ ...mockEvent }, undefined)).toEqual(false);
  });

  it('should return false if the ID is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, id: 'event-2' }),
    ).toEqual(false);
  });

  it('should return false if the start date is different', () => {
    expect(
      fcEventsEqual(
        { ...mockEvent },
        { ...mockEvent, start: new Date('2019-12-31') },
      ),
    ).toEqual(false);
  });

  it('should return false if the end date is different', () => {
    expect(
      fcEventsEqual(
        { ...mockEvent },
        { ...mockEvent, end: new Date('2020-01-03') },
      ),
    ).toEqual(false);
  });

  it('should return false if the allDay property is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, allDay: true }),
    ).toEqual(false);
  });

  it('should return false if the title is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, title: 'Event 2' }),
    ).toEqual(false);
  });

  it('should return false if the draggable property is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, draggable: true }),
    ).toEqual(false);
  });

  it('should return false if the resizable property is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, resizable: true }),
    ).toEqual(false);
  });

  it('should return false if the placeholder property is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, placeholder: true }),
    ).toEqual(false);
  });

  it('should return false if the textColor property is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, textColor: 'red' }),
    ).toEqual(false);
  });

  it('should return false if the backgroundColor property is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, backgroundColor: 'red' }),
    ).toEqual(false);
  });

  it('should return false if the borderColor property is different', () => {
    expect(
      fcEventsEqual({ ...mockEvent }, { ...mockEvent, borderColor: 'red' }),
    ).toEqual(false);
  });
});
