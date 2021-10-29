import React from 'react';

import { render } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import type { Event } from '../../common/types';

import { fcEventsEqual, useToFcEvent } from './utils';

import { EventStateSyncOptions, useEventStateSync } from './index';

describe('useEventStateSync', () => {
  const mockToFcEvent = jest.fn();
  const mockUseToFcEvent = jest.fn();
  const mockFcEventsEqual = jest.fn();
  const mockCalendarApi = {
    addEvent: jest.fn(),
    getEventById: jest.fn(),
  };

  const renderHook = (initialOptions = {}) => {
    const Container = ({
      options = {},
    }: {
      options: Partial<EventStateSyncOptions<{}>>;
    }) => {
      useEventStateSync({
        calendarApi: mockCalendarApi as any,
        eventMap: new Map(),
        globalDraggable: false,
        globalResizable: false,
        globalBackgroundColor: 'white',
        openPopupIds: new Set(),
        ...options,
      });
      return null;
    };

    const di = [
      injectable(useToFcEvent, mockUseToFcEvent),
      injectable(fcEventsEqual, mockFcEventsEqual),
    ];

    // Can't use renderHook since it doesn't work with react-magnetic-di
    const { rerender } = render(
      <DiProvider use={di}>
        <Container options={initialOptions} />
      </DiProvider>,
    );

    return {
      rerender: (newOptions: Partial<EventStateSyncOptions<{}>>) =>
        rerender(
          <DiProvider use={di}>
            <Container options={newOptions} />
          </DiProvider>,
        ),
    };
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockUseToFcEvent.mockReturnValue(mockToFcEvent);
    mockFcEventsEqual.mockImplementation(fcEventsEqual);
  });

  it('should add events to the calendar', () => {
    const { rerender } = renderHook({
      eventMap: new Map(),
    });

    expect(mockCalendarApi.addEvent).toBeCalledTimes(0);
    expect(mockCalendarApi.getEventById).toBeCalledTimes(0);

    mockCalendarApi.addEvent.mockClear();
    mockCalendarApi.getEventById.mockClear();
    const inputEvent = {
      id: 'event-1',
      start: new Date('2020-01-01'),
      end: new Date('2020-01-02'),
    };
    const outputEvent = {
      ...inputEvent,
    };
    mockToFcEvent.mockReturnValue(outputEvent);
    rerender({
      eventMap: new Map([['event-1', inputEvent]]),
    });

    expect(mockToFcEvent).toBeCalledTimes(1);
    expect(mockToFcEvent.mock.calls[0][0]).toBe(inputEvent);
    expect(mockCalendarApi.addEvent).toBeCalledTimes(1);
    expect(mockCalendarApi.addEvent.mock.calls[0][0]).toBe(outputEvent);
    expect(mockCalendarApi.getEventById).toBeCalledTimes(0);
  });

  it('should add events to the calendar on a remount', () => {
    const inputEvent = {
      id: 'event-1',
      start: new Date('2020-01-01'),
      end: new Date('2020-01-02'),
    };
    const outputEvent = {
      ...inputEvent,
    };
    mockToFcEvent.mockReturnValue(outputEvent);
    const eventMap = new Map([['event-1', inputEvent]]);
    const { rerender } = renderHook({
      eventMap,
    });

    expect(mockToFcEvent).toBeCalledTimes(1);
    expect(mockToFcEvent.mock.calls[0][0]).toBe(inputEvent);
    expect(mockCalendarApi.addEvent).toBeCalledTimes(1);
    expect(mockCalendarApi.addEvent.mock.calls[0][0]).toBe(outputEvent);
    expect(mockCalendarApi.getEventById).toBeCalledTimes(0);

    mockToFcEvent.mockClear();
    mockCalendarApi.addEvent.mockClear();
    rerender({
      eventMap,
      calendarApi: { ...mockCalendarApi } as any,
    });

    expect(mockToFcEvent).toBeCalledTimes(1);
    expect(mockToFcEvent.mock.calls[0][0]).toBe(inputEvent);
    expect(mockCalendarApi.addEvent).toBeCalledTimes(1);
    expect(mockCalendarApi.addEvent.mock.calls[0][0]).toBe(outputEvent);
    expect(mockCalendarApi.getEventById).toBeCalledTimes(0);
  });

  it('should update events on the calendar', () => {
    const inputEvent = {
      id: 'event-1',
      title: 'old title',
      start: new Date('2020-01-01'),
      end: new Date('2020-01-02'),
    };
    const outputEvent = {
      ...inputEvent,
      remove: jest.fn(),
    };
    mockToFcEvent.mockReturnValue(outputEvent);
    const { rerender } = renderHook({
      eventMap: new Map([['event-1', inputEvent]]),
    });

    expect(mockFcEventsEqual).toBeCalledTimes(0);
    expect(mockCalendarApi.getEventById).toBeCalledTimes(0);

    const newInputEvent = {
      ...inputEvent,
      title: 'new title',
    };
    const newOutputEvent = {
      ...newInputEvent,
    };
    mockToFcEvent.mockReturnValue(newOutputEvent);
    mockFcEventsEqual.mockReturnValue(false);
    mockCalendarApi.getEventById.mockReturnValue({
      ...outputEvent,
      // Simulate an event after it has been dragged
      start: new Date('2020-01-03'),
      end: new Date('2020-01-04'),
    });
    mockCalendarApi.addEvent.mockClear();
    mockToFcEvent.mockClear();
    rerender({
      eventMap: new Map([['event-1', newInputEvent]]),
    });

    expect(mockCalendarApi.getEventById).toBeCalledTimes(1);
    expect(mockCalendarApi.getEventById).toBeCalledWith('event-1');
    expect(mockFcEventsEqual).toBeCalledTimes(1);
    expect(mockFcEventsEqual.mock.calls[0][0]).toBe(newInputEvent);
    expect(mockFcEventsEqual.mock.calls[0][1]).toEqual({
      ...inputEvent,
      // Check that we're using the latest start/end from FullCalendar
      start: new Date('2020-01-03'),
      end: new Date('2020-01-04'),
    });
    expect(outputEvent.remove).toBeCalledTimes(1);
    expect(mockCalendarApi.addEvent).toBeCalledTimes(1);
    expect(mockCalendarApi.addEvent.mock.calls[0][0]).toBe(newOutputEvent);
  });

  it('should skip updating events on the calendar', () => {
    const inputEvent = {
      id: 'event-1',
      title: 'old title',
      start: new Date('2020-01-01'),
      end: new Date('2020-01-02'),
    };
    const outputEvent = {
      ...inputEvent,
      remove: jest.fn(),
    };
    mockToFcEvent.mockReturnValue(outputEvent);
    const { rerender } = renderHook({
      eventMap: new Map([['event-1', inputEvent]]),
    });

    expect(mockFcEventsEqual).toBeCalledTimes(0);
    expect(mockCalendarApi.getEventById).toBeCalledTimes(0);

    const newInputEvent = {
      ...inputEvent,
      // Simulate an event being updated to the same date stored in FullCalendar
      start: new Date('2020-01-03'),
      end: new Date('2020-01-04'),
    };
    const newOutputEvent = {
      ...newInputEvent,
    };
    mockToFcEvent.mockReturnValue(newOutputEvent);
    mockCalendarApi.getEventById.mockReturnValue({
      ...outputEvent,
      // Simulate an event after it has been dragged
      start: new Date('2020-01-03'),
      end: new Date('2020-01-04'),
    });
    mockCalendarApi.addEvent.mockClear();
    mockToFcEvent.mockClear();
    rerender({
      eventMap: new Map([['event-1', newInputEvent]]),
    });

    expect(mockCalendarApi.getEventById).toBeCalledTimes(1);
    expect(mockCalendarApi.getEventById).toBeCalledWith('event-1');
    expect(mockFcEventsEqual).toBeCalledTimes(1);
    expect(mockFcEventsEqual.mock.calls[0][0]).toBe(newInputEvent);
    expect(mockFcEventsEqual.mock.calls[0][1]).toEqual({
      ...inputEvent,
      // Check that we're using the latest start/end from FullCalendar
      start: new Date('2020-01-03'),
      end: new Date('2020-01-04'),
    });
    expect(outputEvent.remove).toBeCalledTimes(0);
    expect(mockCalendarApi.addEvent).toBeCalledTimes(0);
  });

  it('should remove events from the calendar', () => {
    const inputEvent = {
      id: 'event-1',
    };
    const outputEvent = {
      ...inputEvent,
      remove: jest.fn(),
    };
    mockToFcEvent.mockReturnValue(outputEvent);
    const { rerender } = renderHook({
      eventMap: new Map([['event-1', inputEvent]]),
    });

    expect(mockCalendarApi.getEventById).toBeCalledTimes(0);

    mockCalendarApi.getEventById.mockReturnValue(outputEvent);
    rerender({
      eventMap: new Map(),
    });

    expect(mockCalendarApi.getEventById).toBeCalledTimes(1);
    expect(mockCalendarApi.getEventById).toBeCalledWith('event-1');
    expect(outputEvent.remove).toBeCalledTimes(1);
  });

  describe('opening/closing popups', () => {
    let rerender: ReturnType<typeof renderHook>['rerender'];
    const mockRemoveEvent = jest.fn();
    const mockSetProp = jest.fn();

    const inputEvent: Event<{}> = {
      id: 'event-1',
      start: new Date('2020-01-01'),
      end: new Date('2020-01-02'),
      borderColor: 'red',
    };
    const outputEvent = {
      ...inputEvent,
      classNames: ['fc-event-custom-border'],
      remove: mockRemoveEvent,
      setProp: mockSetProp,
    };
    const eventMap = new Map<string, Event<{}>>([[inputEvent.id, inputEvent]]);

    const resetCalendarEventMocks = () => {
      mockToFcEvent.mockClear();
      mockCalendarApi.addEvent.mockClear();
      mockCalendarApi.getEventById.mockClear();
      mockRemoveEvent.mockClear();

      mockToFcEvent.mockImplementation(() => ({ ...outputEvent }));
      mockCalendarApi.getEventById.mockImplementation(() => ({
        ...outputEvent,
      }));
    };

    beforeEach(() => {
      mockToFcEvent.mockImplementation(() => ({ ...outputEvent }));
      rerender = renderHook({ eventMap }).rerender;

      resetCalendarEventMocks();
    });

    it('should not change event when popup status not changed', () => {
      rerender({ eventMap, openPopupIds: new Set() });
      rerender({ eventMap, openPopupIds: new Set() });

      expect(mockCalendarApi.addEvent).not.toHaveBeenCalled();
      expect(mockRemoveEvent).not.toHaveBeenCalled();
    });

    it('should add .fc-event-with-open-popup for newly opened popup', () => {
      rerender({ eventMap, openPopupIds: new Set() });
      rerender({
        eventMap,
        openPopupIds: new Set(['event-click-popup:event-1']),
      });

      expect(mockRemoveEvent).not.toHaveBeenCalled();
      expect(mockCalendarApi.addEvent).not.toHaveBeenCalled();
      expect(mockSetProp).toHaveBeenCalledWith(
        'classNames',
        'fc-event-custom-border fc-event-with-open-popup',
      );
    });

    it('should remove .fc-event-with-open-popup for newly closed popup', () => {
      rerender({
        eventMap,
        openPopupIds: new Set(['event-click-popup:event-1']),
      });
      resetCalendarEventMocks();

      rerender({ eventMap, openPopupIds: new Set() });

      expect(mockRemoveEvent).not.toHaveBeenCalled();
      expect(mockCalendarApi.addEvent).not.toHaveBeenCalled();
      expect(mockSetProp).toHaveBeenCalledWith(
        'classNames',
        'fc-event-custom-border',
      );
    });
  });
});
