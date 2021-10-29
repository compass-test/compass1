import styled from 'styled-components';

import {
  B300,
  background,
  DN200,
  DN50A,
  DN60A,
  DN80,
  N0,
  N100,
  N40,
  N50A,
  N60A,
} from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';
import { gridSize } from '@atlaskit/theme/constants';
import { e200 } from '@atlaskit/theme/elevation';
import { h100 } from '@atlaskit/theme/typography';
import { css as fcCommonCss } from '@atlassian/fullcalendar-common';
import { css as fcDayGridCss } from '@atlassian/fullcalendar-daygrid';
import { css as fcListCss } from '@atlassian/fullcalendar-list';
import { css as fcTimeGridCss } from '@atlassian/fullcalendar-timegrid';

/**
 * Size in pixels of a 15 minutes slot on the calendar
 **/
const SLOT_HEIGHT = `${gridSize() * 1.75}px`;
const SLOT_HEADER_WIDTH = `${gridSize() * 9}px`;
const borderColor = themed({
  light: N40,
  dark: DN80,
});
const slotTextColor = themed({
  light: N100,
  dark: DN200,
});
const e200Subtle = themed({
  light: `box-shadow: 1px 1px 8px -2px ${N50A}, 1px 0 1px ${N60A};`,
  dark: `box-shadow: 1px 1px 8px -2px ${DN50A}, 1px 0 1px ${DN60A};`,
});

const e200SubtleInverted = themed({
  light: `box-shadow: 0 -1px 8px -2px ${N50A}, 0 0 1px ${N60A};`,
  dark: `box-shadow: 0 -1px 8px -2px ${DN50A}, 0 0 1px ${DN60A};`,
});

const raisedEventElevation = themed({
  light: `box-shadow: 0 4px 8px 0 ${N50A}, 0 0 1px 0 ${N60A};`,
  dark: `box-shadow: 0 4px 8px 0 ${DN50A}, 0 0 1px 0 ${DN60A};`,
});

export const SlotLabel = styled.div`
  height: ${SLOT_HEIGHT};
  overflow: visible;
`;

export const RelativeWrapper = styled.div`
  position: relative;
`;

export const FullCalendarStyledWrapper = styled.div<{
  hideScrollBar: boolean | undefined;
  hideAllDaySlot: boolean | undefined;
  formattedTimezone: string;
}>`
  height: 100%;

  & {
    ${fcCommonCss}
    ${fcDayGridCss}
    ${fcListCss}
    ${fcTimeGridCss}

    .fc {
      /* Style time slots */
      .fc-timegrid-slot {
        height: ${SLOT_HEIGHT};
      }
      .fc-timegrid-slot:empty::before {
        content: none;
      }
      .fc-timegrid-slot-label-frame {
        position: absolute;
        height: ${gridSize() * 2}px;
        right: ${gridSize()}px;
        top: -${gridSize()}px;

        &::after {
          content: '';
          display: block;
          position: absolute;
          right: -${gridSize()}px;
          top: 50%;
          width: ${gridSize()}px;
          height: 1px;
          background-color: ${borderColor};
        }
      }
      .fc-timegrid-axis,
      .fc-timegrid-slot-label {
        position: relative;
        ${h100}
        margin-top: 0;
        font-weight: normal;
        color: ${slotTextColor};
      }
      .fc-col-header col,
      .fc-timegrid-slots col,
      .fc-daygrid-body col,
      .fc-timegrid-cols col {
        width: ${SLOT_HEADER_WIDTH}!important;
      }
      .fc-timegrid-axis-cushion {
        max-width: none;
      }

      /* Move the first time slot label down slightly */
      .fc-timegrid-slots tr:first-of-type .fc-timegrid-slot-label-frame {
        /* Hide the label if the all-day row is hidden */
        display: ${({ hideAllDaySlot }) =>
          hideAllDaySlot ? 'none' : 'visible'};

        top: 0;

        &::after {
          top: 0;
        }
      }

      /* Style grid borders */
      td {
        border: 1px solid ${borderColor};
      }
      .fc-timegrid {
        table {
          border-collapse: separate;
        }
        td {
          border-right-width: 0;
        }
        tr:not(:last-of-type) td,
        .fc-scrollgrid-section.fc-scrollgrid-section-body:last-of-type > td {
          ${({ hideAllDaySlot }) =>
            hideAllDaySlot
              ? 'border-bottom-color: transparent;'
              : 'border-bottom-width: 0;'}
        }
        .fc-timegrid-slot-minor {
          border-top: 0;
        }
      }
      .fc-daygrid {
        .fc-scrollgrid-section > td {
          border-right-width: 0;
        }
        .fc-scrollgrid-section.fc-scrollgrid-section-body > td {
          border-radius: ${gridSize() * 0.375}px;
          border-top-width: 1px;
          border-left-width: 1px;
        }
      }
      tbody,
      th,
      td.fc-timegrid-axis,
      td.fc-timegrid-slot-label,
      .fc-scrollgrid {
        border: none;
      }
      .fc-scrollgrid-section.fc-scrollgrid-section-body > td {
        border-right-width: 1px;
      }

      /* Hide divider under all day events */
      .fc-timegrid-axis-cushion {
        flex-shrink: 1;
        text-align: right;
      }
      .fc-timegrid {
        tbody .fc-scrollgrid-section:nth-of-type(2) {
          height: 0;
        }
        .fc-timegrid-divider {
          display: none;
        }
      }

      /* Add drop shadow to day and week grid views */
      .fc-timegrid {
        .fc-scrollgrid-section.fc-scrollgrid-section-body {
          &:last-of-type > td {
            overflow: hidden;
            position: relative;

            &::before,
            &::after {
              content: '';
              display: block;
              position: absolute;
              height: ${gridSize()}px;
              right: 0;
            }

            &::before {
              top: -${gridSize()}px;
              ${e200Subtle};
              z-index: 1;
            }

            &::after {
              bottom: -${gridSize()}px;
              ${e200SubtleInverted};
            }
          }
        }
      }

      /* Add dropshadow to events with open popups to make them feel more connected to the popups */
      .fc-event-with-open-popup {
        ${raisedEventElevation}
      }

      /* Add styling for placeholder events */
      .fc-timegrid-event.fc-event-mirror:not(.fc-event-resizing):not(.fc-event-dragging),
      .fc-daygrid-event.fc-event-placeholder,
      .fc-timegrid-event.fc-event-placeholder {
        background-color: ${N0};
        border: 2px solid ${B300};
        ${e200}
      }
      .fc-timegrid-event.fc-event-mirror:not(.fc-event-resizing):not(.fc-event-dragging) {
        margin-right: -${gridSize()}px;
      }
      .fc-event-custom-border {
        border-width: 2px;
      }

      /* Hide scrollbar for header and all day events */
      .fc-timegrid {
        .fc-scrollgrid-section.fc-scrollgrid-section-header .fc-scroller,
        .fc-scrollgrid-section.fc-scrollgrid-section-body .fc-scroller {
          overflow-y: ${({ hideScrollBar }) =>
            hideScrollBar ? 'hidden' : 'visible'} !important;
        }

        .fc-scrollgrid-section.fc-scrollgrid-section-body > td {
          position: relative;

          &::before {
            content: '';
            display: block;
            position: absolute;
            height: ${gridSize()}px;
            left: ${SLOT_HEADER_WIDTH};
            right: 0;
            top: 0;
            height: 1px;
            background-color: ${borderColor};
          }
        }
      }

      /* Remove highlighting of current date */
      .fc-daygrid-day.fc-day-today,
      .fc-timegrid-col.fc-day-today {
        background-color: transparent;
      }

      /* Add right margin to events and remove padding */
      .fc-timegrid-col-events {
        margin-left: 0;
        margin-right: ${gridSize()}px;
      }
      .fc-timegrid-event .fc-event-main {
        padding: unset;
      }

      /* Remove underlines from dates */
      a.fc-col-header-cell-cushion,
      a.fc-daygrid-day-number {
        &:hover {
          text-decoration: none;
        }
      }

      /* Style days of month */
      .fc-daygrid-day-top {
        flex-direction: row;
      }
      .fc-col-header-cell-cushion {
        padding-bottom: ${gridSize()}px;
      }
      .fc-daygrid-day-number {
        padding: ${gridSize() / 2}px ${gridSize()}px 0 ${gridSize()}px;
      }
      .fc-day-other .fc-daygrid-day-top {
        opacity: 1;
      }

      /* Style timezone */
      .fc-timegrid .fc-scrollgrid-section.fc-scrollgrid-section-header {
        .fc-timegrid-axis {
          z-index: 2;
        }

        .fc-timegrid-axis-frame::after {
          content: '${(props) => props.formattedTimezone}';
          background-color: ${background};
          position: absolute;
          padding-right: ${gridSize()}px;
          bottom: ${-gridSize()}px;
          right: 0;
        }

        /* Set overflow to allow timezone to be visible */
        .fc-scroller-harness {
          overflow: visible;

          .fc-scroller,
          .fc-timegrid-axis-frame {
            overflow: visible !important;
          }
        }
      }
    }
  }
`;
