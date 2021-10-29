/** @jsx jsx */

import { jsx } from '@emotion/core';
import MockDate from 'mockdate';
import { IntlProvider } from 'react-intl';

import { Y500 } from '@atlaskit/theme/colors';

import { useCalendar } from '../src';

export default function CustomEventBorders() {
  MockDate.set('2020-01-01T12:00Z');
  const { calendar } = useCalendar({
    events: [
      {
        id: 'test-border-0',
        title: 'Very short event with border',
        start: new Date('2020-01-01T07:00Z'),
        end: new Date('2020-01-01T07:15Z'),
        textColor: 'white',
        borderColor: Y500,
      },
      {
        id: 'test-border-1',
        title:
          'This event has some warning or error information attached to it',
        start: new Date('2020-01-01T08:00Z'),
        end: new Date('2020-01-01T08:45Z'),
        borderColor: Y500,
      },
      {
        id: 'test-border-2',
        title: 'This event is normal and does not have a custom border',
        start: new Date('2020-01-01T09:30Z'),
        end: new Date('2020-01-01T11:45Z'),
      },
      {
        id: 'test-border-3',
        title: 'This large event has a custom border',
        start: new Date('2020-01-01T09:30Z'),
        end: new Date('2020-01-01T11:45Z'),
        borderColor: 'red',
      },
    ],
    initialView: 'grid',
    initialViewRange: 'day',
    timezone: 'UTC',
    testId: 'calendar',
  });
  return (
    <IntlProvider locale="en">
      <div css={{ width: '800px', height: '600px' }}>{calendar}</div>
    </IntlProvider>
  );
}
