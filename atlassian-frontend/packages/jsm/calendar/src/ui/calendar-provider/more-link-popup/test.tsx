import React from 'react';

import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';

import type { FormatDateOptions } from '@atlassian/fullcalendar-common';

import { SimulateClickOnKeydown } from '../../../common/ui/simulate-click-on-keydown';
import { getMoreEventsPopupId } from '../../../common/utils';

import { EventBackground } from './styled';

import { POPUP_X_OFFSET, POPUP_Y_OFFSET, useMoreLinkPopup } from './index';

const EventContentWrapper = () => <div id="event-content-wrapper" />;

const TestRoot = (_: ReturnType<typeof useMoreLinkPopup>) => <div data-root />;

const TestContainer = () => {
  const { moreLinkClick, moreLinkContent } = useMoreLinkPopup(
    {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      omitZeroMinute: true,
    },
    eventClick,
    openPopup,
    (date: Date, options: FormatDateOptions) =>
      new Intl.DateTimeFormat('en-US', options).format(date),
    EventContentWrapper,
  );

  return (
    <TestRoot moreLinkClick={moreLinkClick} moreLinkContent={moreLinkContent} />
  );
};

const eventClick = jest.fn();
const openPopup = jest.fn();
const closePopup = jest.fn();

interface EventSegment {
  isStart: boolean;
  start: Date;
  event: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    textColor: string;
    backgroundColor: string;
  };
}

describe('useMoreLinkPopup', () => {
  const render = () => {
    return mount(<TestContainer />);
  };

  const renderPopupContent = () => {
    const lastOpenPopupProps =
      openPopup.mock.calls[openPopup.mock.calls.length - 1][0];
    const Component = () => (
      <IntlProvider locale="en">
        {lastOpenPopupProps.renderContents({
          id: lastOpenPopupProps.id,
          data: lastOpenPopupProps.data,
          onClose: closePopup,
        })}
      </IntlProvider>
    );

    return mount(<Component />);
  };

  const moreLinkClick = (wrapper: ReactWrapper, segments: EventSegment[]) => {
    const target = document.createElement('div');
    const targetParent = document.createElement('div');
    targetParent.appendChild(target);

    act(() => {
      wrapper.find(TestRoot).prop('moreLinkClick')({
        allSegs: segments,
        jsEvent: {
          currentTarget: target,
        },
        date: new Date('2020-01-01'),
      } as any);
    });
    wrapper.update();
  };

  const eventBackgroundAt = (wrapper: ReactWrapper, index: number) =>
    wrapper.find('EventBackground').at(index);

  const eventContentAt = (wrapper: ReactWrapper, index: number) =>
    eventBackgroundAt(wrapper, index).find('EventContentWrapper');

  it('should open the popup when the more link is clicked', () => {
    const wrapper = render();

    moreLinkClick(wrapper, []);

    expect(openPopup).toHaveBeenCalledWith({
      id: getMoreEventsPopupId(),
      data: {
        date: new Date('2020-01-01'),
        events: [],
      },
      offset: [0, -POPUP_X_OFFSET / 2],
      mouseOffsetY: -POPUP_Y_OFFSET / 2,
      placement: 'left',
      targetRect: expect.any(Object),
      targetOffsetWidth: expect.any(Number),
      renderContents: expect.any(Function),
    });
  });

  it('should render the popup content as expected', () => {
    const wrapper = render();
    moreLinkClick(wrapper, [
      {
        isStart: true,
        start: new Date('2020-01-01T00:00'),
        event: {
          id: 'event-1',
          title: 'Test Event',
          start: new Date('2020-01-01T08:00'),
          end: new Date('2020-01-01T09:30'),
          allDay: false,
          textColor: 'black',
          backgroundColor: 'red',
        },
      },
      {
        isStart: true,
        start: new Date('2020-01-01T00:00'),
        event: {
          id: 'event-2',
          title: 'All Day Event',
          start: new Date('2020-01-01T00:00'),
          end: new Date('2020-01-02T00:00'),
          allDay: true,
          textColor: 'white',
          backgroundColor: 'blue',
        },
      },
      {
        isStart: false,
        start: new Date('2020-01-01T00:00'),
        event: {
          id: 'event-3',
          title: 'Event Continuing From Previous Day',
          start: new Date('2019-12-31T10:30'),
          end: new Date('2020-01-02T14:00'),
          allDay: false,
          textColor: 'purple',
          backgroundColor: 'green',
        },
      },
    ]);
    const contentWrapper = renderPopupContent();

    expect(contentWrapper.find('PopupDate').childAt(0).text()).toEqual(
      'January 1',
    );

    expect(eventBackgroundAt(contentWrapper, 0).key()).toEqual('event-1');
    expect(
      eventBackgroundAt(contentWrapper, 0).prop('backgroundColor'),
    ).toEqual('red');
    expect(eventContentAt(contentWrapper, 0).prop('textColor')).toEqual(
      'black',
    );
    expect(eventContentAt(contentWrapper, 0).prop('timeText')).toEqual(
      '8:00 AM',
    );

    expect(eventBackgroundAt(contentWrapper, 1).key()).toEqual('event-2');
    expect(
      eventBackgroundAt(contentWrapper, 1).prop('backgroundColor'),
    ).toEqual('blue');
    expect(eventContentAt(contentWrapper, 1).prop('textColor')).toEqual(
      'white',
    );
    expect(eventContentAt(contentWrapper, 1).prop('timeText')).toEqual('');

    expect(eventBackgroundAt(contentWrapper, 2).key()).toEqual('event-3');
    expect(
      eventBackgroundAt(contentWrapper, 2).prop('backgroundColor'),
    ).toEqual('green');
    expect(eventContentAt(contentWrapper, 2).prop('textColor')).toEqual(
      'purple',
    );
    expect(eventContentAt(contentWrapper, 2).prop('timeText')).toEqual(
      '12:00 AM',
    );
  });

  it('should call eventClick when an event is clicked', () => {
    const wrapper = render();
    moreLinkClick(wrapper, [
      {
        isStart: true,
        start: new Date('2020-01-01T00:00'),
        event: {
          id: 'event-1',
          title: 'Test Event',
          start: new Date('2020-01-01T08:00'),
          end: new Date('2020-01-01T09:30'),
          allDay: false,
          textColor: 'black',
          backgroundColor: 'red',
        },
      },
    ]);
    const contentWrapper = renderPopupContent();

    contentWrapper.find(EventBackground).simulate('click');

    expect(eventClick).toHaveBeenCalledWith({
      fromMoreLinkPopup: true,
      event: {
        id: 'event-1',
        start: new Date('2020-01-01T08:00'),
        allDay: false,
        textColor: 'black',
      },
      jsEvent: {
        target: expect.any(HTMLElement),
        offsetY: 0,
      },
    });
  });

  it('should render more link content as expected', () => {
    const wrapper = render();
    const getMoreLinkContent = wrapper.find(TestRoot).prop('moreLinkContent');

    const moreLinkContent = mount(getMoreLinkContent({ text: '+7 more' }));

    const clickSimulatingElement = moreLinkContent.find(SimulateClickOnKeydown);
    expect(clickSimulatingElement.exists()).toBe(true);

    const contentSpan = clickSimulatingElement
      .find('span')
      .filter({ 'aria-haspopup': true });
    expect(contentSpan.exists()).toBe(true);

    expect(moreLinkContent.render().text()).toBe('+7 more');
  });
});
