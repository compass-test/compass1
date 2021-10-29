import React, { ComponentType } from 'react';

import { cleanup } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { MOCK_EVENTS } from '../../../common/mocks';
import type {
  CalendarViewProps,
  Event,
  EventContentWrapperProps,
} from '../../../common/types';
import { SimulateClickOnKeydown } from '../../../common/ui/simulate-click-on-keydown';

import { TimeWrapper, TitleWrapper } from './styled';

import {
  DefaultEventContent,
  EventContentProps,
  PLACEHOLDER_EVENT_ID,
  useEventContentWrapper,
} from './index';

jest.mock('react', () => ({
  ...(jest.requireActual('react') as any),
  useCallback: (callback: any) => callback,
  useEffect: jest.fn(),
  useState: (initial: any) => [initial, jest.fn()],
}));

const DEFAULT_VIEW_PROPS: CalendarViewProps = {
  view: 'grid',
  viewRange: 'week',
  date: new Date('2020-01-01T00:00Z'),
  dateStart: new Date('2019-12-29T00:00Z'),
  dateEnd: new Date('2020-01-05T00:00Z'),
  visibleDateStart: new Date('2019-12-29T00:00Z'),
  visibleDateEnd: new Date('2020-01-05T00:00Z'),
  formatDate: () => '',
};

const toFcEvent = (event: Event<{}>): EventContentWrapperProps['event'] => ({
  ...event,
  allDay: MOCK_EVENTS[0].allDay ?? false,
  title: MOCK_EVENTS[0].title ?? '',
});

afterEach(() => cleanup());

describe('useEventContentWrapper', () => {
  const render = (
    {
      calendarView = {},
      eventMap = new Map(),
      EventContent,
    }: {
      calendarView?: Partial<CalendarViewProps>;
      eventMap?: Map<string, Event<{}>>;
      EventContent?: ComponentType<EventContentProps<{}>>;
      isClickable?: boolean;
    },
    props: EventContentWrapperProps,
  ) => {
    const Component = () => {
      const EventContentWrapper = useEventContentWrapper({
        calendarView: {
          ...DEFAULT_VIEW_PROPS,
          ...calendarView,
        },
        eventMap,
        EventContent,
      });
      return <EventContentWrapper {...props} />;
    };

    return shallow(<Component />).dive();
  };

  const mountWithIntl = (element: React.ReactElement) => {
    return mount(<IntlProvider locale="en">{element}</IntlProvider>);
  };

  it('should render a custom EventContent component', () => {
    const EventContent = (_: EventContentProps<{}>) => <></>;
    const wrapper = render(
      {
        eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
        EventContent,
      },
      {
        event: toFcEvent(MOCK_EVENTS[0]),
        timeText: 'timeText',
        textColor: 'textColor',
        isMirror: false,
        isDragging: false,
        isResizing: false,
      },
    );
    const contentWrapper = wrapper.find(EventContent);
    expect(contentWrapper.props()).toEqual({
      event: MOCK_EVENTS[0],
      isDragging: false,
      isResizing: false,
      textColor: 'textColor',
      timeText: 'timeText',
      ...DEFAULT_VIEW_PROPS,
    });
    expect(contentWrapper.props().event).toBe(MOCK_EVENTS[0]);
    expect(contentWrapper.find(DefaultEventContent).exists()).toBe(false);
  });

  it('should render a custom placeholder EventContent component', () => {
    const EventContent = (_: EventContentProps<{}>) => <></>;
    const wrapper = render(
      {
        eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
        EventContent,
      },
      {
        event: {
          ...toFcEvent(MOCK_EVENTS[0]),
          id: PLACEHOLDER_EVENT_ID,
        },
        timeText: 'timeText',
        textColor: 'textColor',
        isMirror: false,
        isDragging: false,
        isResizing: false,
      },
    );
    const contentWrapper = wrapper.find(EventContent);
    expect(contentWrapper.props()).toEqual({
      event: {
        id: PLACEHOLDER_EVENT_ID,
        start: MOCK_EVENTS[0].start,
        end: MOCK_EVENTS[0].end,
        allDay: MOCK_EVENTS[0].allDay ?? false,
        placeholder: true,
      },
      isDragging: false,
      isResizing: false,
      textColor: 'textColor',
      timeText: 'timeText',
      ...DEFAULT_VIEW_PROPS,
    });
  });

  it('should not render a resizing event as a placeholder event', () => {
    const EventContent = (_: EventContentProps<{}>) => <></>;
    const wrapper = render(
      {
        eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
        EventContent,
      },
      {
        event: toFcEvent(MOCK_EVENTS[0]),
        timeText: 'timeText',
        textColor: 'textColor',
        isMirror: true,
        isDragging: false,
        isResizing: true,
      },
    );
    const contentWrapper = wrapper.find(EventContent);
    expect(contentWrapper.props()).toEqual({
      event: MOCK_EVENTS[0],
      isDragging: false,
      isResizing: true,
      textColor: 'textColor',
      timeText: 'timeText',
      ...DEFAULT_VIEW_PROPS,
    });
  });

  it('should not render a dragging event as a placeholder event', () => {
    const EventContent = (_: EventContentProps<{}>) => <></>;
    const wrapper = render(
      {
        eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
        EventContent,
      },
      {
        event: toFcEvent(MOCK_EVENTS[0]),
        timeText: 'timeText',
        textColor: 'textColor',
        isMirror: true,
        isDragging: true,
        isResizing: false,
      },
    );
    const contentWrapper = wrapper.find(EventContent);
    expect(contentWrapper.props()).toEqual({
      event: MOCK_EVENTS[0],
      isDragging: true,
      isResizing: false,
      textColor: 'textColor',
      timeText: 'timeText',
      ...DEFAULT_VIEW_PROPS,
    });
  });

  it('default content wrapper should not render time for placeholder event', () => {
    const placeholderEvent = {
      id: PLACEHOLDER_EVENT_ID,
      start: MOCK_EVENTS[0].start,
      end: MOCK_EVENTS[0].end,
      allDay: false,
      placeholder: true,
    };
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={placeholderEvent}
        view={'grid'}
        viewRange={'week'}
        timeText={'8am - 9pm'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );
    expect(wrapper.find(TimeWrapper).exists()).toBe(false);
  });

  it('default content wrapper should not render title for placeholder event', () => {
    const placeholderEvent = {
      id: PLACEHOLDER_EVENT_ID,
      start: MOCK_EVENTS[0].start,
      end: MOCK_EVENTS[0].end,
      allDay: false,
      placeholder: true,
    };
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={placeholderEvent}
        view={'grid'}
        viewRange={'week'}
        timeText={'8am - 9pm'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );
    expect(wrapper.find(TitleWrapper).exists()).toBe(false);
  });

  it('should render the default event content when no event content is provided', () => {
    const wrapper = render(
      {
        eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
        EventContent: undefined,
      },
      {
        event: toFcEvent(MOCK_EVENTS[0]),
        timeText: '8am - 9am',
        textColor: 'textColor',
        isMirror: false,
        isDragging: false,
        isResizing: false,
      },
    );

    expect(wrapper.find(DefaultEventContent).exists()).toBe(true);
  });

  it('default content wrapper should render time when view != list and timeText is defined', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={MOCK_EVENTS[2]}
        view={'grid'}
        viewRange={'week'}
        timeText={'8am - 9pm'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    expect(wrapper.find(TimeWrapper).exists()).toBe(true);
  });

  it('default content wrapper should not render time when view == list and timeText is defined', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={MOCK_EVENTS[2]}
        view={'list'}
        viewRange={'week'}
        timeText={'8am - 9pm'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    expect(wrapper.find(TimeWrapper).exists()).toBe(false);
  });

  it('default content wrapper should not render time when view != list and timeText is not defined', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={MOCK_EVENTS[2]}
        view={'list'}
        viewRange={'week'}
        timeText={''}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    expect(wrapper.find(TimeWrapper).exists()).toBe(false);
  });

  it('default content wrapper should not add separator when viewrange == month', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={MOCK_EVENTS[2]}
        view={'grid'}
        viewRange={'month'}
        timeText={'9am'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    let timeWrapper = wrapper.find(TimeWrapper);
    expect(timeWrapper.exists()).toBe(true);
    expect(timeWrapper.text()).toBe('9am');
  });

  it('default content wrapper should add separator when viewrange !== month', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={MOCK_EVENTS[2]}
        view={'grid'}
        viewRange={'week'}
        timeText={'9am'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    let timeWrapper = wrapper.find(TimeWrapper);
    expect(timeWrapper.exists()).toBe(true);
    expect(timeWrapper.text()).toBe(', 9am');
  });

  it('default content wrapper should render time before title when viewrange == month', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={MOCK_EVENTS[2]}
        view={'grid'}
        viewRange={'month'}
        timeText={'9am'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    let timeWrapper = wrapper.find(TimeWrapper);
    expect(timeWrapper.exists()).toBe(true);
    expect(timeWrapper.props().order).toBe(1);
    let titleWrapper = wrapper.find(TitleWrapper);
    expect(titleWrapper.exists()).toBe(true);
    expect(titleWrapper.props().order).toBe(2);
  });

  it('default content wrapper should render title before before when viewrange !== month', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={MOCK_EVENTS[2]}
        view={'grid'}
        viewRange={'week'}
        timeText={'9am'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    let timeWrapper = wrapper.find(TimeWrapper);
    expect(timeWrapper.exists()).toBe(true);
    expect(timeWrapper.props().order).toBe(2);
    let titleWrapper = wrapper.find(TitleWrapper);
    expect(titleWrapper.exists()).toBe(true);
    expect(titleWrapper.props().order).toBe(1);
  });

  it('default content wrapper should render placeholder title when no event title is provided', () => {
    const wrapper = mountWithIntl(
      <DefaultEventContent
        event={{
          id: 'untitled-event',
          title: '',
          allDay: false,
          start: new Date('2020-01-04T00:00Z'),
          end: new Date('2020-01-04T10:00Z'),
        }}
        view={'grid'}
        viewRange={'week'}
        timeText={'9am'}
        isDragging={false}
        isResizing={false}
        textColor={'blue'}
        formatDate={() => ''}
      />,
    );

    let timeWrapper = wrapper.find(TimeWrapper);
    expect(timeWrapper.exists()).toBe(true);
    expect(timeWrapper.props().order).toBe(2);
    let titleWrapper = wrapper.find(TitleWrapper);
    expect(titleWrapper.exists()).toBe(true);
    expect(titleWrapper.props().order).toBe(1);
    expect(titleWrapper.text()).toEqual('(No title)');
  });

  describe('SimulateClickOnKeydown', () => {
    it('should wrap when using custom EventContent', () => {
      const EventContent = () => <div id="custom-event-content" />;
      const wrapper = render(
        {
          eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
          EventContent,
        },
        {
          event: toFcEvent(MOCK_EVENTS[0]),
          timeText: 'timeText',
          textColor: 'textColor',
          isMirror: false,
          isDragging: false,
          isResizing: false,
        },
      );

      expect(wrapper.find(SimulateClickOnKeydown).exists()).toBe(true);
      expect(
        wrapper.find(SimulateClickOnKeydown).find(EventContent).exists(),
      ).toBe(true);
    });

    it('should wrap when using default event content', () => {
      const wrapper = render(
        {
          eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
          EventContent: undefined,
        },
        {
          event: toFcEvent(MOCK_EVENTS[0]),
          timeText: 'timeText',
          textColor: 'textColor',
          isMirror: false,
          isDragging: false,
          isResizing: false,
        },
      );

      expect(wrapper.find(SimulateClickOnKeydown).exists()).toBe(true);
      expect(
        wrapper.find(SimulateClickOnKeydown).find(DefaultEventContent).exists(),
      ).toBe(true);
    });

    it('should not wrap custom event content when its a placeholder event', () => {
      const EventContent = () => <div id="custom-event-content" />;
      const wrapper = render(
        {
          eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
          EventContent,
        },
        {
          event: {
            ...toFcEvent(MOCK_EVENTS[0]),
            id: PLACEHOLDER_EVENT_ID,
          },
          timeText: 'timeText',
          textColor: 'textColor',
          isMirror: false,
          isDragging: false,
          isResizing: false,
        },
      );

      expect(wrapper.find(SimulateClickOnKeydown).exists()).toBe(false);
      expect(wrapper.find(EventContent).exists()).toBe(true);
    });

    it('should not wrap default event content when its a placeholder event', () => {
      const wrapper = render(
        {
          eventMap: new Map([[MOCK_EVENTS[0].id, MOCK_EVENTS[0]]]),
          EventContent: undefined,
        },
        {
          event: {
            ...toFcEvent(MOCK_EVENTS[0]),
            id: PLACEHOLDER_EVENT_ID,
          },
          timeText: 'timeText',
          textColor: 'textColor',
          isMirror: false,
          isDragging: false,
          isResizing: false,
        },
      );

      expect(wrapper.find(SimulateClickOnKeydown).exists()).toBe(false);
      expect(wrapper.find(DefaultEventContent).exists()).toBe(true);
    });
  });
});
