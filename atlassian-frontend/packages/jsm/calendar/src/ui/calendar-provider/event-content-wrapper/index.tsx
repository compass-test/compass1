import React, { useCallback, useEffect, useState } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import type { Event, EventContentWrapperProps } from '../../../common/types';
import { SimulateClickOnKeydown } from '../../../common/ui/simulate-click-on-keydown';

import messages from './messages';
import {
  ContentWrapper,
  eventWrapperPaddingTop,
  eventWrapperText,
  TimeWrapper,
  TitleWrapper,
} from './styled';
import type { EventContentProps, UseEventContentWrapperOptions } from './types';

export type { EventContentProps };

export const PLACEHOLDER_EVENT_ID = '__placeholder';

export const useEventContentWrapper = <T extends Record<string, any>>({
  calendarView,
  eventMap,
  EventContent,
}: UseEventContentWrapperOptions<T>) =>
  useCallback(
    function EventContentWrapper({
      event,
      timeText,
      textColor,
      isDragging,
      isResizing,
    }: EventContentWrapperProps) {
      const originalEvent: Event<T> = eventMap.get(event.id) ?? {
        id: PLACEHOLDER_EVENT_ID,
        start: event.start!,
        end: event.end!,
        allDay: event.allDay,
        placeholder: true,
      };

      const eventContentProps: EventContentProps<T> = {
        event: originalEvent,
        isDragging: isDragging,
        isResizing: isResizing,
        textColor: textColor,
        timeText: timeText,
        view: calendarView.view,
        viewRange: calendarView.viewRange,
        date: calendarView.date,
        dateStart: calendarView.dateStart,
        dateEnd: calendarView.dateEnd,
        visibleDateStart: calendarView.visibleDateStart,
        visibleDateEnd: calendarView.visibleDateEnd,
        formatDate: calendarView.formatDate,
      };

      const eventContent = EventContent ? (
        <EventContent {...eventContentProps} />
      ) : (
        <DefaultEventContent {...eventContentProps} />
      );

      return originalEvent.placeholder !== true ? (
        <SimulateClickOnKeydown>{eventContent}</SimulateClickOnKeydown>
      ) : (
        eventContent
      );
    },
    [calendarView, eventMap, EventContent],
  );

export const DefaultEventContent = injectIntl(
  <T extends Record<string, any>>({
    event,
    view,
    viewRange,
    timeText,
    intl,
  }: EventContentProps<T> & InjectedIntlProps) => {
    const [shouldWrapText, setShouldWrapText] = useState(false);
    const [shouldShrinkTitle, setShouldShrinkTitle] = useState(false);
    const [shouldDisplayInline, setShouldDisplayInline] = useState(true);
    const [eventTitleMaxHeight, setEventTitleMaxHeight] = useState(0);
    const [eventWrapperHeight, setEventWrapperHeight] = useState(-1);
    const wrapperRefCallback = (element: Element) => {
      if (element) {
        setEventWrapperHeight(element.scrollHeight);
      }
    };

    useEffect(() => {
      if (eventWrapperHeight > 0) {
        const titleLineHeight = eventWrapperText.lineHeight.default;
        const timeLineHeight = eventWrapperText.lineHeight.default;
        const maxNumberTitleLines = Math.floor(
          (eventWrapperHeight - timeLineHeight - eventWrapperPaddingTop) /
            titleLineHeight,
        );
        setEventTitleMaxHeight(
          Math.floor(maxNumberTitleLines * titleLineHeight),
        );
        setShouldShrinkTitle(eventWrapperHeight < titleLineHeight);
        setShouldDisplayInline(
          eventWrapperHeight <=
            titleLineHeight + timeLineHeight - eventWrapperPaddingTop,
        );
        setShouldWrapText(maxNumberTitleLines < 2);
      }
    }, [
      eventWrapperHeight,
      shouldWrapText,
      shouldShrinkTitle,
      shouldDisplayInline,
      eventTitleMaxHeight,
    ]);

    if (event.placeholder && view === 'grid') {
      return <>&nbsp;</>;
    }

    const shouldDisplayTime = view !== 'list' && !!timeText;
    return (
      <ContentWrapper
        innerRef={wrapperRefCallback}
        shouldDisplayInline={shouldDisplayInline}
        shouldShrinkTitle={shouldShrinkTitle}
        textColor={event.textColor}
      >
        <TitleWrapper
          shouldWrapText={shouldWrapText}
          maxHeight={eventTitleMaxHeight}
          shouldDisplayInline={shouldDisplayInline}
          order={viewRange !== 'month' ? 1 : 2}
        >
          {event.title || intl.formatMessage(messages.noTitle)}
        </TitleWrapper>
        {shouldDisplayTime && (
          <TimeWrapper
            shouldDisplayInline={shouldDisplayInline}
            order={viewRange !== 'month' ? 2 : 1}
          >
            {shouldDisplayInline && viewRange !== 'month' && <>,&nbsp;</>}
            {timeText}
          </TimeWrapper>
        )}
      </ContentWrapper>
    );
  },
);
