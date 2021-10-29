import React, { useCallback, useState } from 'react';

import memoize from 'lodash/memoize';

import AkCalendar, { SelectEvent } from '@atlaskit/calendar';

import { useFilters } from '../../../../../services/filters';

import { generateDisabledDateStrArr } from './utils';

const memoizedGenerateDisabledDateStrArr = memoize(
  generateDisabledDateStrArr,
  (date, maxDate) => `${date}:${maxDate}`,
);

export type CalendarProps = {
  onSelect: (event: SelectEvent) => void;
};

interface DateObj {
  day: number;
  month: number;
  year: number;
  iso: string;
}

export const Calendar = ({ onSelect }: CalendarProps) => {
  const [filtersState] = useFilters();

  const [year, month, day] = filtersState.dailyReport.date.split('-');
  const [disabledDates, setDisabledDates] = useState(
    memoizedGenerateDisabledDateStrArr(
      filtersState.dailyReport.date,
      filtersState.dailyReport.maxDate,
    ),
  );

  const [state, setState] = useState({
    disabled: disabledDates,
    selected: [filtersState.dailyReport.date],
    day: parseInt(day, 10),
    month: parseInt(month, 10),
    year: parseInt(year, 10),
  });

  const handleSelect = (selectedDate: DateObj) => {
    if (disabledDates.includes(selectedDate.iso)) {
      return;
    }
    setState({
      ...state,
      selected: [selectedDate.iso],
    });
    onSelect(selectedDate);
  };

  const handleCalendarChange = useCallback(
    (e) => {
      if (e.iso) {
        const { day, month, year, iso } = e;
        setDisabledDates(
          memoizedGenerateDisabledDateStrArr(
            iso,
            filtersState.dailyReport.maxDate,
          ),
        );
        setState({
          ...state,
          day,
          month,
          year,
        });
      }
    },
    [filtersState.dailyReport.maxDate, state],
  );

  return (
    <AkCalendar
      disabled={disabledDates}
      selected={state.selected}
      onSelect={handleSelect}
      onChange={handleCalendarChange}
      day={state.day}
      month={state.month}
      year={state.year}
    />
  );
};
