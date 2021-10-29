import React, { useCallback } from 'react';

import GlobalTheme from '@atlaskit/theme/components';
import type { GlobalThemeTokens } from '@atlaskit/theme/types';
import type {
  DayHeaderContentArg,
  FormatDateOptions,
} from '@atlassian/fullcalendar-common';

import type { CalendarViewRange } from '../../../common/types';
import { toMoment } from '../../../common/utils';

import { DayContainer, DayNumber, DayText } from './styled';

export type DayCellContentProps = Pick<
  DayHeaderContentArg,
  'date' | 'isPast' | 'isToday'
>;

export const useDayCellContent = (
  viewRange: CalendarViewRange,
  timezone: string,
  formatDate: (date: Date, options: FormatDateOptions) => string,
) =>
  useCallback(
    function DayHeader({ date, isPast, isToday }: DayCellContentProps) {
      if (viewRange !== 'month') {
        return <></>;
      }
      const dateMoment = toMoment(timezone, date);
      return (
        <GlobalTheme.Consumer>
          {(theme: GlobalThemeTokens) => (
            <DayContainer>
              {dateMoment.date() === 1 && (
                <DayText isPast={isPast} isToday={isToday} theme={theme}>
                  {formatDate(date, { month: 'short' })}
                </DayText>
              )}
              <DayNumber isPast={isPast} isToday={isToday} theme={theme}>
                {formatDate(date, { day: 'numeric' })}
              </DayNumber>
            </DayContainer>
          )}
        </GlobalTheme.Consumer>
      );
    },
    [viewRange, timezone, formatDate],
  );
