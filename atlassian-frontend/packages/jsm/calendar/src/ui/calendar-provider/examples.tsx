/** @jsx jsx */
import { ChangeEvent, FunctionComponent, ReactElement, useState } from 'react';

import { jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { button, number, withKnobs } from '@storybook/addon-knobs';
import { IntlProvider } from 'react-intl';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import DeprecatedThemeProvider from '@atlaskit/theme/deprecated-provider-please-do-not-use';

import type { CalendarViewRange, Event } from '../../common/types';

import { generateRandomEvents } from './mocks';
import type { CalendarHookOptions } from './types';

import { useCalendar } from './index';

export default {
  decorators: [
    withKnobs,
    (storyFn: () => ReactElement) => (
      <IntlProvider locale="en">{storyFn()}</IntlProvider>
    ),
  ],
};

const CalendarWithToolbar: FunctionComponent<CalendarHookOptions<{}>> = (
  options,
) => {
  const {
    calendar,
    date,
    view,
    viewRange,
    setView,
    setViewRange,
    navigateToday,
    navigatePrev,
    navigateNext,
    formatDate,
  } = useCalendar({
    onDateRangeChange: action('onDateRangeChange'),
    onEventClick: action('onEventClick'),
    onEventDrag: action('onEventDrag'),
    onEventResize: action('onEventResize'),
    onEventAdd: async (start, end, allDay) => {
      action('onEventAdd')(start, end, allDay);
    },
    ...options,
  });

  let selectedViewOption = '';
  if (view === 'grid') {
    selectedViewOption = viewRange;
  } else {
    selectedViewOption = 'list';
  }

  const onSelectViewOption = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'list') {
      setView('list');
      setViewRange('month');
    } else {
      setView('grid');
      setViewRange(e.target.value as CalendarViewRange);
    }
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '80vw',
        height: '50vw',
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: '0 0 32px',
        }}
      >
        <div
          css={{
            fontWeight: 'bold',
          }}
        >
          {date &&
            formatDate(date, {
              month: 'long',
              year: 'numeric',
            })}
          <select onChange={onSelectViewOption} value={selectedViewOption}>
            <option value="day">Day</option>
            <option value="fiveDay">Five Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="list">List</option>
          </select>
        </div>
        <div>
          <button onClick={navigateToday}>Today</button>
          <button onClick={navigatePrev}>&lt;</button>
          <button onClick={navigateNext}>&gt;</button>
        </div>
      </div>
      <div
        css={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {calendar}
      </div>
    </div>
  );
};

const useRandomEvents = (
  daysBefore: number = 7,
  daysAfter: number = 7,
  minTime: number = 8,
  maxTime: number = 17,
  maxDuration: number = 3,
) => {
  const [events, setEvents] = useState<Event<{}>[]>([]);

  const eventsToAdd = number('Events to add', 5);
  button('Add events', () => {
    setEvents((oldEvents) => [
      ...oldEvents,
      ...generateRandomEvents(eventsToAdd, oldEvents.length),
    ]);

    return false;
  });
  button('Clear events', () => {
    setEvents([]);
  });

  return events;
};

export const BasicLight = () => {
  const events = useRandomEvents();

  return <CalendarWithToolbar events={events} />;
};

export const BasicDark = () => {
  return (
    <DeprecatedThemeProvider mode="dark" provider={StyledThemeProvider}>
      <BasicLight />
    </DeprecatedThemeProvider>
  );
};
