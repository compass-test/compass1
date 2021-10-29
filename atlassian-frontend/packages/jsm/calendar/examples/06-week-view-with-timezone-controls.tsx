/** @jsx jsx */

import { useState } from 'react';

import { jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import MockDate from 'mockdate';
import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button';

import { useCalendar } from '../src';
import { MOCK_EVENTS } from '../src/common/mocks';

// This Storybook starts showing the calendar in UTC
// It has a button that switches the calendar's timezone to Europe/Helsinki
export default function WeekViewWithTimezoneControls() {
  /*
   * This time is 1am on 1/1/2020 in Helsinki, which means 11pm 31/12/2019 in UTC.
   *     After switching the timezone to Helsinki, we should therefore see the
   *     calendar change to highlight 1/1/2020 instead of the 31st, which is what
   *     it would originally be highlighting since it's initially on UTC.
   */
  MockDate.set('2020-01-01T01:00+0200');
  const [timezone, setTimezone] = useState('UTC');
  const { calendar } = useCalendar({
    events: MOCK_EVENTS,
    initialView: 'grid',
    initialViewRange: 'week',
    timezone,
    testId: 'calendar',
    onEventAdd: async (start, end, allDay) => {
      action('onEventAdd')(start, end, allDay);
    },
  });
  return (
    <IntlProvider locale="en">
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          width: '800px',
          height: '600px',
        }}
      >
        <Button
          testId="timezone-change-button"
          onClick={() => setTimezone('Europe/Helsinki')}
        >
          Move to Helsinki
        </Button>
        <div css={{ flex: '1 1' }}>{calendar}</div>
      </div>
    </IntlProvider>
  );
}
