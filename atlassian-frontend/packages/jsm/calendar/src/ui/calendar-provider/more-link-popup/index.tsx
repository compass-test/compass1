import React, { ComponentType, ReactElement, useCallback } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { gridSize } from '@atlaskit/theme/constants';
import type { FormatDateOptions } from '@atlassian/fullcalendar-common';
import type {
  MoreLinkArg,
  MoreLinkContentArg,
  MoreLinkSimpleAction,
} from '@atlassian/fullcalendar-daygrid';

import type {
  EventClickCallback,
  EventContentWrapperProps,
  EventPopupContext,
} from '../../../common/types';
import type { PopupControllerActions } from '../../../common/ui/popup-controller';
import { SimulateClickOnKeydown } from '../../../common/ui/simulate-click-on-keydown';
import { getMoreEventsPopupId } from '../../../common/utils';

import messages from './messages';
import {
  EVENT_WIDTH,
  EventBackground,
  PopupDate,
  PopupHeader,
  PopupWrapper,
} from './styled';
import { PopupContentProps } from './types';

export const POPUP_X_OFFSET = EVENT_WIDTH + 2 * gridSize();
export const POPUP_Y_OFFSET = -40;

const PopupContent = ({
  date,
  events,
  formatDate,
  eventClick,
  onClose,
  EventContentWrapper,
  intl,
}: PopupContentProps & InjectedIntlProps) => (
  <PopupWrapper>
    <PopupHeader>
      <PopupDate>
        {formatDate(date, { day: 'numeric', month: 'long' })}
      </PopupDate>
      <Button
        iconBefore={
          <CrossIcon
            label={intl.formatMessage(messages.closeLabel)}
            size="small"
          />
        }
        onClick={onClose}
        spacing="compact"
        appearance="subtle"
      />
    </PopupHeader>

    {events.map(({ borderColor, backgroundColor, ...moreEvent }) => (
      <EventBackground
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        onClick={(e) =>
          eventClick({
            fromMoreLinkPopup: true,
            event: {
              id: moreEvent.event.id,
              start: moreEvent.event.start,
              allDay: moreEvent.event.allDay,
              textColor: moreEvent.textColor,
            },
            jsEvent: {
              target: e.target,
              offsetY: 0,
            },
          })
        }
        key={moreEvent.event.id}
      >
        <EventContentWrapper {...moreEvent} />
      </EventBackground>
    ))}
  </PopupWrapper>
);

const PopupContentIntl = injectIntl(PopupContent);

export const useMoreLinkPopup: <T>(
  eventTimeFormat: FormatDateOptions,
  eventClick: EventClickCallback,
  openPopup: PopupControllerActions<EventPopupContext<T>>['openPopup'],
  formatDate: (date: Date, options: FormatDateOptions) => string,
  EventContentWrapper: ComponentType<EventContentWrapperProps>,
) => {
  moreLinkClick: (arg: MoreLinkArg) => MoreLinkSimpleAction;
  moreLinkContent: ({ text }: Pick<MoreLinkContentArg, 'text'>) => ReactElement;
} = (
  eventTimeFormat,
  eventClick,
  openPopup,
  formatDate,
  EventContentWrapper,
) => {
  const renderPopupContent = useCallback<
    Parameters<typeof openPopup>[0]['renderContents']
  >(
    ({ data, onClose }) => (
      <PopupContentIntl
        date={data.date}
        events={data.events}
        formatDate={formatDate}
        eventClick={eventClick}
        onClose={onClose}
        EventContentWrapper={EventContentWrapper}
      />
    ),
    [EventContentWrapper, eventClick, formatDate],
  );

  const moreLinkClick = useCallback(
    (arg: MoreLinkArg) => {
      const moreLink = (arg.jsEvent.currentTarget as HTMLElement).parentElement;
      if (moreLink != null) {
        const cellWidth = moreLink.parentElement?.offsetWidth ?? 0;
        const cellHeight = moreLink.parentElement?.offsetHeight ?? 0;
        openPopup({
          id: getMoreEventsPopupId(),
          data: {
            date: arg.date,
            events: arg.allSegs.map((seg) => ({
              event: {
                id: seg.event.id,
                start: seg.event.start,
                end: seg.event.end,
                allDay: seg.event.allDay,
                title: seg.event.title,
              },
              timeText:
                seg.event.allDay || seg.event.start === null
                  ? ''
                  : formatDate(
                      seg.isStart ? seg.event.start : seg.start,
                      eventTimeFormat,
                    ),
              textColor: seg.event.textColor,
              backgroundColor: seg.event.backgroundColor,
              borderColor: seg.event.borderColor,
              isMirror: false,
              isDragging: false,
              isResizing: false,
            })),
          },
          offset: [0, -(POPUP_X_OFFSET + cellWidth) / 2],
          mouseOffsetY: -(POPUP_Y_OFFSET + cellHeight) / 2,
          placement: 'left',
          targetRect: moreLink.getBoundingClientRect(),
          targetOffsetWidth: moreLink.offsetWidth,
          renderContents: renderPopupContent,
        });

        // Return a dummy value to prevent FullCalendar from opening its own
        // popup, see https://github.com/fullcalendar/fullcalendar/blob/79ef85decae65a4521447e6a961891da0009fd54/packages/daygrid/src/Table.tsx#L220-L231
        return 1 as any;
      }
    },
    [eventTimeFormat, formatDate, openPopup, renderPopupContent],
  );

  const moreLinkContent = useCallback(
    ({ text }: Pick<MoreLinkContentArg, 'text'>) => (
      <SimulateClickOnKeydown>
        <span aria-haspopup>{text}</span>
      </SimulateClickOnKeydown>
    ),
    [],
  );

  return {
    moreLinkClick,
    moreLinkContent,
  };
};
