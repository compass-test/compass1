/** @jsx jsx */

import { jsx } from '@emotion/core';
import MockDate from 'mockdate';
import { IntlProvider } from 'react-intl';

import { useCalendar } from '../src';
import { MOCK_EVENTS } from '../src/common/mocks';

export default function WeekView() {
  MockDate.set('2020-01-01T12:00Z');
  const { calendar } = useCalendar({
    events: MOCK_EVENTS,
    initialView: 'grid',
    initialViewRange: 'week',
    timezone: 'UTC',
    testId: 'calendar',
    hideAllDaySlot: true,
  });
  return (
    <IntlProvider locale="en">
      <div css={{ width: '800px', height: '600px' }}>{calendar}</div>
    </IntlProvider>
  );
}
