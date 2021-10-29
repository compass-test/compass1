import React, { useCallback } from 'react';

import GlobalTheme from '@atlaskit/theme/components';
import type { GlobalThemeTokens } from '@atlaskit/theme/types';
import type {
  DayHeaderContentArg,
  FormatDateOptions,
} from '@atlassian/fullcalendar-common';

import type { CalendarView, CalendarViewRange } from '../../../common/types';

import { DayText, GridDayContainer, GridDayNumber } from './styled';

export type DayHeaderContentProps = Pick<
  DayHeaderContentArg,
  'text' | 'date' | 'isPast' | 'isToday'
>;

export const useDayHeaderContent = (
  view: CalendarView,
  viewRange: CalendarViewRange,
  formatDate: (date: Date, options: FormatDateOptions) => string,
) =>
  useCallback(
    function DayHeader({ text, date, isPast, isToday }: DayHeaderContentProps) {
      return (
        <GlobalTheme.Consumer>
          {(theme: GlobalThemeTokens) => {
            if (view === 'list') {
              return text;
            }
            if (viewRange === 'month') {
              return <DayText theme={theme}>{text}</DayText>;
            }
            return (
              <GridDayContainer isPast={isPast}>
                <DayText theme={theme}>
                  {formatDate(date, { weekday: 'short' })}
                </DayText>
                <GridDayNumber theme={theme} isToday={isToday}>
                  {formatDate(date, { day: 'numeric' })}
                </GridDayNumber>
              </GridDayContainer>
            );
          }}
        </GlobalTheme.Consumer>
      );
    },
    [view, viewRange, formatDate],
  );
