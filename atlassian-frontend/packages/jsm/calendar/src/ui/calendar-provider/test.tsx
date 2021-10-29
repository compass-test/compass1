import React, { ReactNode } from 'react';

import { mount } from 'enzyme';
import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';

import type { CalendarOptions } from '@atlassian/fullcalendar-common';
import FullCalendar from '@atlassian/fullcalendar-react';

import { MOCK_EVENTS, MOCK_NO_EVENTS } from '../../common/mocks';
import {
  CalendarView,
  CalendarViewRange,
  Event,
  EventPopupContext,
} from '../../common/types';
import {
  PopupControllerActions,
  PopupControllerData,
  usePopupController,
} from '../../common/ui/popup-controller';
import { getEventAddPopupId, getEventClickPopupId } from '../../common/utils';

import { PLACEHOLDER_EVENT_ID } from './event-content-wrapper';
import { formatTimezone, mapToFcLocale } from './utils';

import {
  CalendarHookOptions,
  CalendarProps,
  CalendarProvider,
  EventAddPopupContentProps,
  EventClickPopupContentProps,
  eventTimeFormat,
  PopupOptions,
} from './index';

interface FullCalendarMock {
  next: jest.Mock<void, []>;
  prev: jest.Mock<void, []>;
  today: jest.Mock<void, []>;
  gotoDate: jest.Mock<void, [Date]>;
  changeView: jest.Mock<void, [string]>;
  getDate: jest.Mock<Date, []>;
  updateSize: jest.Mock<void, []>;
  unselect: jest.Mock<void, []>;
  getEvents: jest.Mock<any[], []>;
  getEventById: jest.Mock<any, [string]>;
  addEvent: jest.Mock<void, [any]>;
  formatDate: jest.Mock<string, []>;
}

jest.mock('@atlassian/fullcalendar-react', () => {
  const React = require('react');

  const calendarMock: FullCalendarMock = {
    next: jest.fn(),
    prev: jest.fn(),
    today: jest.fn(),
    gotoDate: jest.fn(),
    changeView: jest.fn(),
    getDate: jest.fn(),
    updateSize: jest.fn(),
    unselect: jest.fn(),
    getEvents: jest.fn(),
    getEventById: jest.fn(),
    addEvent: jest.fn(),
    formatDate: jest.fn().mockImplementation(() => ''),
  };

  const FullCalendar = class FullCalendar extends React.Component<
    CalendarOptions
  > {
    constructor(props: CalendarOptions) {
      super(props);
    }

    render() {
      return <div id="calendar" />;
    }

    getApi() {
      return calendarMock;
    }

    static get calendarMock() {
      return calendarMock;
    }
  };

  return {
    __esModule: true,
    default: FullCalendar,
  };
});
jest.mock('@atlassian/fullcalendar-common', () => ({
  __esModule: true,
  css: '',
}));
jest.mock('@atlassian/fullcalendar-daygrid', () => ({
  __esModule: true,
  default: {},
  css: '',
}));
jest.mock('@atlassian/fullcalendar-interaction', () => ({
  __esModule: true,
  default: {},
}));
jest.mock('@atlassian/fullcalendar-list', () => ({
  __esModule: true,
  default: {},
  css: '',
}));
jest.mock('@atlassian/fullcalendar-moment-timezone', () => ({
  __esModule: true,
  default: {},
}));
jest.mock('@atlassian/fullcalendar-timegrid', () => ({
  __esModule: true,
  default: {},
  css: '',
}));
jest.mock('@atlassian/fullcalendar-core/locales-all', () => ({
  __esModule: true,
  default: [{ code: 'fr' }, { code: 'zh-cn' }, { code: 'zh' }],
}));

const mockOpenPopup = jest.fn();
let mockOpenPopupIds = new Set();
jest.mock('../../common/ui/popup-controller', () => {
  const usePopupController = jest.fn();
  usePopupController.mockImplementation(() => [
    {
      arePopupsOpen: false,
      openPopupIds: mockOpenPopupIds,
      popupContainer: <></>,
    },
    {
      openPopup: mockOpenPopup,
    },
  ]);
  return {
    usePopupController,
    mockOpenPopup,
  };
});

const mockUsePopupController = usePopupController as jest.Mock<
  [PopupControllerData, PopupControllerActions<EventPopupContext<{}>>],
  [EventPopupContext<{}>]
>;

describe('useCalendar', () => {
  const calendarMock: FullCalendarMock = (FullCalendar as any).calendarMock;

  const renderCalendar = (options: CalendarHookOptions<{}>) => {
    const childRenderFunc: jest.Mock<
      ReactNode,
      [CalendarProps]
    > = jest.fn().mockImplementation(({ calendar }) => <>{calendar}</>);

    const Provider = (props: CalendarHookOptions<{}>) => (
      <IntlProvider locale="en">
        <CalendarProvider timezone="UTC" {...props}>
          {childRenderFunc}
        </CalendarProvider>
      </IntlProvider>
    );

    const wrapper = mount(<Provider {...options} />);
    return {
      provider: wrapper,
      calendar() {
        return wrapper.find(FullCalendar);
      },
      childProps() {
        return childRenderFunc.mock.calls[
          childRenderFunc.mock.calls.length - 1
        ][0];
      },
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    calendarMock.getEvents.mockReturnValue([]);
    calendarMock.getEventById.mockReturnValue(undefined);
  });

  it('should provide working navigation callbacks', () => {
    const { childProps } = renderCalendar({ events: MOCK_NO_EVENTS });

    childProps().navigateNext();
    expect(calendarMock.next).toBeCalledTimes(1);

    childProps().navigatePrev();
    expect(calendarMock.prev).toBeCalledTimes(1);

    childProps().navigateToday();
    expect(calendarMock.today).toBeCalledTimes(1);

    const date = new Date('2020-01-01T06:00Z');
    childProps().setDate(date);
    expect(calendarMock.gotoDate).toBeCalledWith(date);
  });

  it('should correctly set the view', () => {
    const { childProps } = renderCalendar({
      events: MOCK_NO_EVENTS,
      initialView: 'list',
      initialViewRange: 'day',
    });

    act(() => {
      childProps().setView('grid');
      childProps().setViewRange('month');
    });
    expect(calendarMock.changeView).toBeCalledWith('dayGridMonth');

    act(() => {
      childProps().setView('grid');
      childProps().setViewRange('week');
    });
    expect(calendarMock.changeView).toBeCalledWith('timeGridWeek');

    act(() => {
      childProps().setView('grid');
      childProps().setViewRange('day');
    });
    expect(calendarMock.changeView).toBeCalledWith('timeGridDay');

    act(() => {
      childProps().setView('grid');
      childProps().setViewRange('fiveDay');
    });
    expect(calendarMock.changeView).toBeCalledWith('timeGridFiveDay');

    act(() => {
      childProps().setView('list');
      childProps().setViewRange('fiveDay');
    });
    expect(calendarMock.changeView).toBeCalledWith('listFiveDay');

    act(() => {
      childProps().setView('list');
      childProps().setViewRange('month');
    });
    expect(calendarMock.changeView).toBeCalledWith('listMonth');

    act(() => {
      childProps().setView('list');
      childProps().setViewRange('week');
    });
    expect(calendarMock.changeView).toBeCalledWith('listWeek');

    act(() => {
      childProps().setView('list');
      childProps().setViewRange('day');
    });
    expect(calendarMock.changeView).toBeCalledWith('listDay');
  });

  it('should pass the correct context to usePopupController', () => {
    renderCalendar({
      events: [MOCK_EVENTS[0]],
      initialView: 'grid',
      initialViewRange: 'month',
    });

    expect(usePopupController).toBeCalledWith({
      calendarView: {
        view: 'grid',
        viewRange: 'month',
        formatDate: expect.any(Function),
      },
      eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
      eventTimeFormat,
    });
  });

  it('should correctly translate onDateRangeChange callbacks', () => {
    const onDateRangeChange: jest.Mock<
      void,
      [Date, Date, CalendarView, CalendarViewRange]
    > = jest.fn();
    const { calendar } = renderCalendar({
      events: MOCK_NO_EVENTS,
      onDateRangeChange,
    });

    expect(calendar().props().datesSet).toBeDefined();
    act(() => {
      calendar().props().datesSet!({
        start: new Date('2019-12-29T00:00Z'),
        end: new Date('2020-02-02T00:00Z'),
        view: {
          currentStart: new Date('2020-01-01T00:00Z'),
          currentEnd: new Date('2020-02-01T00:00Z'),
          activeStart: new Date('2019-12-29T00:00Z'),
          activeEnd: new Date('2020-02-02T00:00Z'),
        },
      } as any);
    });
    expect(onDateRangeChange).toBeCalledWith(
      new Date('2019-12-29T00:00Z'),
      new Date('2020-02-02T00:00Z'),
      'grid',
      'month',
    );
  });

  it('should correctly translate onEventClick callbacks', () => {
    const onEventClick: jest.Mock<void, [Event<{}>]> = jest.fn();
    const { calendar } = renderCalendar({
      events: MOCK_EVENTS,
      onEventClick,
    });
    const target = document.createElement('div');
    const targetParent = document.createElement('div');
    targetParent.appendChild(target);

    expect(calendar().props().eventClick).toBeDefined();
    act(() => {
      calendar().props().eventClick!({
        event: {
          id: MOCK_EVENTS[0].id,
          textColor: MOCK_EVENTS[0].textColor ?? 'black',
          allDay: MOCK_EVENTS[0].allDay ?? false,
          start: MOCK_EVENTS[0].start,
        },
        jsEvent: {
          target,
        },
      } as any);
    });
    expect(onEventClick).toBeCalledTimes(1);
    expect(onEventClick.mock.calls[0][0]).toBe(MOCK_EVENTS[0]);
  });

  it('should open a popup when an event is clicked', () => {
    // Render the calendar with a mocked event click callback
    const onEventClick: jest.Mock<
      void,
      [
        Event<{}>,
        (options: PopupOptions<EventClickPopupContentProps<{}>>) => void,
      ]
    > = jest.fn();
    const { calendar } = renderCalendar({
      events: MOCK_EVENTS,
      onEventClick,
    });
    const target = document.createElement('div');
    const targetParent = document.createElement('div');
    targetParent.appendChild(target);

    // Trigger an event click from FullCalendar
    expect(calendar().props().eventClick).toBeDefined();
    act(() => {
      calendar().props().eventClick!({
        event: {
          id: MOCK_EVENTS[0].id,
          textColor: MOCK_EVENTS[0].textColor ?? 'black',
          allDay: MOCK_EVENTS[0].allDay ?? false,
          start: MOCK_EVENTS[0].start,
        },
        jsEvent: {
          target,
        },
      } as any);
    });

    // Call the openPopup callback to open the popup
    expect(onEventClick).toBeCalledTimes(1);
    onEventClick.mock.calls[0][1]({
      renderPopupContents: () => <></>,
      popupOffset: [0, 0],
      popupPlacement: 'top',
    });

    // Check that the popup is opened
    expect(mockOpenPopup).toBeCalledTimes(1);
    expect(mockOpenPopup).toBeCalledWith({
      id: getEventClickPopupId(MOCK_EVENTS[0]),
      data: MOCK_EVENTS[0].id,
      offset: [0, 0],
      placement: 'top',
      renderContents: expect.any(Function),
      targetRect: targetParent.getBoundingClientRect(),
      targetOffsetWidth: targetParent.offsetWidth,
      keepOpenIds: [],
    });
  });

  it('should render an event popup correctly', () => {
    // Render the calendar with a mocked event click callback
    const onEventClick: jest.Mock<
      void,
      [
        Event<{}>,
        (options: PopupOptions<EventClickPopupContentProps<{}>>) => void,
      ]
    > = jest.fn();
    const { calendar } = renderCalendar({
      events: MOCK_EVENTS,
      initialView: 'grid',
      initialViewRange: 'month',
      onEventClick,
    });
    const target = document.createElement('div');
    const targetParent = document.createElement('div');
    targetParent.appendChild(target);

    // Trigger an event click from FullCalendar
    act(() => {
      calendar().props().eventClick!({
        event: {
          id: MOCK_EVENTS[0].id,
          textColor: MOCK_EVENTS[0].textColor ?? 'black',
          allDay: MOCK_EVENTS[0].allDay ?? false,
          start: MOCK_EVENTS[0].start,
        },
        jsEvent: {
          target,
        },
      } as any);
    });

    // Call the openPopup callback to open the popup
    expect(onEventClick).toBeCalledTimes(1);
    const renderEventPopupContentsMock = jest.fn().mockReturnValue(<></>);
    onEventClick.mock.calls[0][1]({
      renderPopupContents: renderEventPopupContentsMock,
    });

    // Check that the popup is opened
    expect(mockOpenPopup).toBeCalledTimes(1);

    // Check that the popup is rendered with the correct props
    const onCloseMock = jest.fn();
    mockOpenPopup.mock.calls[0][0].renderContents({
      id: getEventClickPopupId(MOCK_EVENTS[0]),
      data: MOCK_EVENTS[0].id,
      context: mockUsePopupController.mock.calls[0][0],
      onClose: onCloseMock,
    });
    expect(renderEventPopupContentsMock).toBeCalledWith({
      ...mockUsePopupController.mock.calls[0][0].calendarView,
      event: MOCK_EVENTS[0],
      isDragging: false,
      isResizing: false,
      timeText: expect.any(String),
      onClose: onCloseMock,
    });
  });

  it('should close an event popup if the event is removed', () => {
    // Render the calendar with a mocked event click callback
    const onEventClick: jest.Mock<
      void,
      [
        Event<{}>,
        (options: PopupOptions<EventClickPopupContentProps<{}>>) => void,
      ]
    > = jest.fn();
    const { calendar, provider } = renderCalendar({
      events: MOCK_EVENTS,
      initialView: 'grid',
      initialViewRange: 'month',
      onEventClick,
    });
    const target = document.createElement('div');
    const targetParent = document.createElement('div');
    targetParent.appendChild(target);

    // Trigger an event click from FullCalendar
    act(() => {
      calendar().props().eventClick!({
        event: {
          id: MOCK_EVENTS[0].id,
          textColor: MOCK_EVENTS[0].textColor ?? 'black',
          allDay: MOCK_EVENTS[0].allDay ?? false,
          start: MOCK_EVENTS[0].start,
        },
        jsEvent: {
          target,
        },
      } as any);
    });

    // Call the openPopup callback to open the popup
    expect(onEventClick).toBeCalledTimes(1);
    onEventClick.mock.calls[0][1]({
      renderPopupContents: () => <></>,
    });

    // Perform the first render of the popup
    const onCloseMock = jest.fn();
    mockOpenPopup.mock.calls[0][0].renderContents({
      id: getEventClickPopupId(MOCK_EVENTS[0]),
      data: MOCK_EVENTS[0].id,
      context: mockUsePopupController.mock.calls[0][0],
      onClose: onCloseMock,
    });
    expect(onCloseMock).toBeCalledTimes(0);

    // Check that the popup is closed after its event is removed
    provider.setProps({
      events: MOCK_NO_EVENTS,
    });
    mockOpenPopup.mock.calls[0][0].renderContents({
      id: getEventClickPopupId(MOCK_EVENTS[0]),
      data: MOCK_EVENTS[0].id,
      context: mockUsePopupController.mock.calls[1][0],
      onClose: onCloseMock,
    });
    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('should correctly translate onEventDrag callbacks', () => {
    const onEventDrag: jest.Mock<
      void,
      [Event<{}>, Event<{}>, () => void]
    > = jest.fn();
    const { calendar } = renderCalendar({ events: MOCK_EVENTS, onEventDrag });

    const revert = () => {};
    expect(calendar().props().eventDrop).toBeDefined();
    act(() => {
      calendar().props().eventDrop!({
        event: {
          ...MOCK_EVENTS[0],
          start: new Date('2020-01-01T09:00Z'),
          end: new Date('2020-01-01T10:00Z'),
        },
        view: {
          calendar: calendarMock,
        },
        revert,
      } as any);
    });
    expect(onEventDrag).toBeCalledTimes(1);
    expect(onEventDrag.mock.calls[0][0]).toBe(MOCK_EVENTS[0]);
    expect(onEventDrag.mock.calls[0][1]).toEqual({
      ...MOCK_EVENTS[0],
      start: new Date('2020-01-01T09:00Z'),
      end: new Date('2020-01-01T10:00Z'),
    });
    expect(onEventDrag.mock.calls[0][2]).toBe(revert);
  });

  it('should correctly translate onEventResize callbacks', () => {
    const onEventResize: jest.Mock<
      void,
      [Event<{}>, Event<{}>, () => void]
    > = jest.fn();
    const { calendar } = renderCalendar({ events: MOCK_EVENTS, onEventResize });

    const revert = () => {};
    expect(calendar().props().eventResize).toBeDefined();
    act(() => {
      calendar().props().eventResize!({
        event: {
          ...MOCK_EVENTS[0],
          start: new Date('2020-01-01T10:00Z'),
          end: new Date('2020-01-01T12:00Z'),
        },
        view: {
          calendar: calendarMock,
        },
        revert,
      } as any);
    });
    expect(onEventResize).toBeCalledTimes(1);
    expect(onEventResize.mock.calls[0][0]).toBe(MOCK_EVENTS[0]);
    expect(onEventResize.mock.calls[0][1]).toEqual({
      ...MOCK_EVENTS[0],
      start: new Date('2020-01-01T10:00Z'),
      end: new Date('2020-01-01T12:00Z'),
    });
    expect(onEventResize.mock.calls[0][2]).toBe(revert);
  });

  it('should handle duplicate events after dragging', async () => {
    const onEventDrag: jest.Mock<
      void,
      [Event<{}>, Event<{}>, () => void]
    > = jest.fn();
    const [, ...mockEventsExceptFirst] = MOCK_EVENTS;
    const originalEvent = {
      ...MOCK_EVENTS[0],
      setDates: jest.fn(),
    };
    const newEvent = {
      ...MOCK_EVENTS[0],
      start: new Date('2020-01-01T09:00Z'),
      end: new Date('2020-01-01T10:00Z'),
      remove: jest.fn(),
    };
    const { calendar } = renderCalendar({ events: MOCK_EVENTS, onEventDrag });

    calendarMock.getEvents.mockReturnValue([
      originalEvent,
      newEvent,
      ...mockEventsExceptFirst,
    ]);

    act(() => {
      calendar().props().eventDrop!({
        event: newEvent,
        view: {
          calendar: calendarMock,
        },
      } as any);
    });

    expect(originalEvent.setDates).toBeCalledTimes(1);
    expect(originalEvent.setDates).toBeCalledWith(newEvent.start, newEvent.end);
    expect(newEvent.remove).toBeCalledTimes(1);
  });

  it('should handle duplicate events after dragging when the original event has been removed', async () => {
    const onEventDrag: jest.Mock<
      void,
      [Event<{}>, Event<{}>, () => void]
    > = jest.fn();
    const [, ...mockEventsExceptFirst] = MOCK_EVENTS;
    const originalEvent = {
      ...MOCK_EVENTS[0],
      setDates: jest.fn(),
    };
    const newEvent = {
      ...MOCK_EVENTS[0],
      start: new Date('2020-01-01T09:00Z'),
      end: new Date('2020-01-01T10:00Z'),
      remove: jest.fn(),
    };
    const { calendar } = renderCalendar({
      events: mockEventsExceptFirst,
      onEventDrag,
    });

    calendarMock.getEvents.mockReturnValue([
      newEvent,
      ...mockEventsExceptFirst,
    ]);

    act(() => {
      calendar().props().eventDrop!({
        event: newEvent,
        view: {
          calendar: calendarMock,
        },
      } as any);
    });

    expect(originalEvent.setDates).toBeCalledTimes(0);
    expect(newEvent.remove).toBeCalledTimes(1);
  });

  it('should correctly translate onEventAdd callbacks when dragging', async () => {
    let resolve: (() => void) | null = null;
    const onEventAdd: jest.Mock<
      Promise<void>,
      [Date, Date, boolean]
    > = jest
      .fn()
      .mockImplementationOnce(() => new Promise<void>((r) => (resolve = r)));
    const { provider, calendar } = renderCalendar({
      events: MOCK_NO_EVENTS,
      onEventAdd,
      initialView: 'grid',
      initialViewRange: 'week',
    });

    let selectPromise: Promise<void> | null = null;
    expect(calendar().props().select).toBeDefined();
    act(() => {
      selectPromise = (calendar().props().select!({
        start: new Date('2020-01-05T09:00Z'),
        end: new Date('2020-01-05T09:30Z'),
        allDay: false,
        jsEvent: {
          target: document.createElement('div'),
        },
      } as any) as unknown) as Promise<void>;
    });
    expect(onEventAdd).toBeCalledWith(
      new Date('2020-01-05T09:00Z'),
      new Date('2020-01-05T09:30Z'),
      false,
      expect.any(Function),
    );

    // Check that a placeholder event was created
    provider.update();
    expect(calendarMock.addEvent).toBeCalledWith(
      expect.objectContaining({
        id: PLACEHOLDER_EVENT_ID,
        classNames: ['fc-event-placeholder'],
      }),
    );
    expect(calendarMock.unselect).toBeCalled();

    // Resolve onEventAdd
    const placeholderMock = {
      remove: jest.fn(),
    };
    calendarMock.getEventById.mockReturnValueOnce(placeholderMock);
    resolve!();
    await selectPromise;

    // Check that the placeholder event was removed
    provider.setProps({});
    expect(calendarMock.getEventById).toBeCalledWith(PLACEHOLDER_EVENT_ID);
    expect(placeholderMock.remove).toBeCalledTimes(1);
  });

  it('should correctly translate onEventAdd callbacks when clicking', async () => {
    let resolve: (() => void) | null = null;
    const onEventAdd: jest.Mock<
      Promise<void>,
      [Date, Date, boolean]
    > = jest
      .fn()
      .mockImplementationOnce(() => new Promise<void>((r) => (resolve = r)));
    const { provider, calendar } = renderCalendar({
      events: MOCK_NO_EVENTS,
      onEventAdd,
      initialView: 'grid',
      initialViewRange: 'month',
    });

    let dateClickPromise: Promise<void> | null = null;
    expect(calendar().props().dateClick).toBeDefined();
    act(() => {
      dateClickPromise = (calendar().props().dateClick!({
        date: new Date('2020-01-05T00:00Z'),
        jsEvent: {
          target: document.createElement('div'),
        },
      } as any) as unknown) as Promise<void>;
    });
    expect(onEventAdd).toBeCalledWith(
      new Date('2020-01-05T00:00Z'),
      new Date('2020-01-06T00:00Z'),
      true,
      expect.any(Function),
    );

    // Check that a placeholder event was created
    provider.update();
    expect(calendarMock.addEvent).toBeCalledWith(
      expect.objectContaining({
        id: PLACEHOLDER_EVENT_ID,
        classNames: ['fc-event-placeholder'],
      }),
    );

    // Resolve onEventAdd
    const placeholderMock = {
      remove: jest.fn(),
    };
    calendarMock.getEventById.mockReturnValueOnce(placeholderMock);
    resolve!();
    await dateClickPromise;

    // Check that the placeholder event was removed
    provider.setProps({});
    expect(calendarMock.getEventById).toBeCalledWith(PLACEHOLDER_EVENT_ID);
    expect(placeholderMock.remove).toBeCalledTimes(1);
  });

  it('should render a popup correctly when adding an event', () => {
    // Render the calendar with a mocked event add callback
    const onEventAdd: jest.Mock<
      Promise<void>,
      [
        Date,
        Date,
        boolean,
        (options: PopupOptions<EventAddPopupContentProps>) => void,
      ]
    > = jest.fn().mockImplementationOnce(async () => {});
    const { calendar } = renderCalendar({
      events: MOCK_NO_EVENTS,
      onEventAdd,
      initialView: 'grid',
      initialViewRange: 'week',
    });
    const target = document.createElement('div');

    // Trigger an event add from FullCalendar
    act(() => {
      calendar().props().select!({
        start: new Date('2020-01-05T09:00Z'),
        end: new Date('2020-01-05T09:30Z'),
        allDay: false,
        jsEvent: {
          target,
        },
      } as any);
    });

    // Call the openPopup callback to open the popup
    expect(onEventAdd).toBeCalledTimes(1);
    const renderPopupContentsMock = jest.fn().mockReturnValue(<></>);
    onEventAdd.mock.calls[0][3]({
      renderPopupContents: renderPopupContentsMock,
      popupOffset: [0, 0],
      popupPlacement: 'top',
    });

    // Check that the popup is opened
    expect(mockOpenPopup).toBeCalledTimes(1);
    expect(mockOpenPopup).toBeCalledWith({
      id: getEventAddPopupId(),
      data: {
        start: new Date('2020-01-05T09:00Z'),
        end: new Date('2020-01-05T09:30Z'),
        allDay: false,
      },
      offset: [0, 0],
      placement: 'top',
      renderContents: expect.any(Function),
      targetRect: target.getBoundingClientRect(),
      targetOffsetWidth: target.offsetWidth,
    });

    // Check that the popup is rendered with the correct props
    const onCloseMock = jest.fn();
    mockOpenPopup.mock.calls[0][0].renderContents({
      id: getEventAddPopupId(),
      data: {
        start: new Date('2020-01-05T09:00Z'),
        end: new Date('2020-01-05T09:30Z'),
        allDay: false,
      },
      context: mockUsePopupController.mock.calls[0][0],
      onClose: onCloseMock,
    });
    expect(renderPopupContentsMock).toBeCalledWith({
      ...mockUsePopupController.mock.calls[0][0].calendarView,
      start: new Date('2020-01-05T09:00Z'),
      end: new Date('2020-01-05T09:30Z'),
      allDay: false,
      onClose: onCloseMock,
    });
  });

  it('should close the popup after an event is added', async () => {
    // Render the calendar with a mocked event add callback
    let resolve: () => void;
    const onEventAdd: jest.Mock<
      Promise<void>,
      [
        Date,
        Date,
        boolean,
        (options: PopupOptions<EventAddPopupContentProps>) => void,
      ]
    > = jest
      .fn()
      .mockImplementationOnce(() => new Promise<void>((r) => (resolve = r)));
    const { calendar } = renderCalendar({
      events: MOCK_NO_EVENTS,
      onEventAdd,
      initialView: 'grid',
      initialViewRange: 'week',
    });
    const target = document.createElement('div');

    // Trigger an event add from FullCalendar
    let selectPromise: Promise<void> | null = null;
    act(() => {
      selectPromise = (calendar().props().select!({
        start: new Date('2020-01-05T09:00Z'),
        end: new Date('2020-01-05T09:30Z'),
        allDay: false,
        jsEvent: {
          target,
        },
      } as any) as unknown) as Promise<void>;
    });

    // Call the openPopup callback to open the popup
    expect(onEventAdd).toBeCalledTimes(1);
    onEventAdd.mock.calls[0][3]({
      renderPopupContents: () => <></>,
    });

    // Perform the first render of the popup
    const onCloseMock = jest.fn();
    mockOpenPopup.mock.calls[0][0].renderContents({
      id: getEventAddPopupId(),
      data: {
        start: new Date('2020-01-05T09:00Z'),
        end: new Date('2020-01-05T09:30Z'),
        allDay: false,
      },
      context: mockUsePopupController.mock.calls[0][0],
      onClose: onCloseMock,
    });
    expect(onCloseMock).toBeCalledTimes(0);

    // Check that the popup is closed after the placeholder event is removed
    resolve!();
    await selectPromise;
    mockOpenPopup.mock.calls[0][0].renderContents({
      id: getEventAddPopupId(),
      data: {
        start: new Date('2020-01-05T09:00Z'),
        end: new Date('2020-01-05T09:30Z'),
        allDay: false,
      },
      context: mockUsePopupController.mock.calls[0][0],
      onClose: onCloseMock,
    });
    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('should correctly map the en-US locale', () => {
    expect(mapToFcLocale('en-us')).toEqual('en');
  });

  it('should correctly map a locale with a region code', () => {
    expect(mapToFcLocale('zh_CN')).toEqual('zh-cn');
  });

  it('should correctly map a locale with an unknown region code', () => {
    expect(mapToFcLocale('zh_TW')).toEqual('zh');
  });

  it('should correctly map a locale with no region code', () => {
    expect(mapToFcLocale('fr')).toEqual('fr');
  });

  it('should map an unknown locale to undefined', () => {
    expect(mapToFcLocale('ru')).toBeUndefined();
  });
});

describe('formatTimezone', () => {
  beforeAll(() => {
    MockDate.set('2021-01-01T12:00Z');
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should format 4 digits timezone', () => {
    const formattedTimezone = formatTimezone('Australia/Adelaide');
    expect(formattedTimezone).toEqual('GMT+10:30');
  });

  it('should format 2 digits timezone', () => {
    const formattedTimezone = formatTimezone('America/Sao_Paulo');
    expect(formattedTimezone).toEqual('GMT-03');
  });
});
