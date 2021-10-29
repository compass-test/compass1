/** @jsx jsx */

import { jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import MockDate from 'mockdate';
import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import { useCalendar } from '../src';
import { MOCK_EVENTS } from '../src/common/mocks';

export default function MonthView() {
  MockDate.set('2020-01-01T12:00Z');
  const { calendar } = useCalendar({
    events: MOCK_EVENTS,
    initialView: 'grid',
    initialViewRange: 'month',
    timezone: 'UTC',
    testId: 'calendar',
    onEventAdd: async (start, end, allDay) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      action('onEventAdd')(start, end, allDay);
    },
    onEventClick: (_, openPopup) => {
      openPopup({
        popupOffset: [0, 16],
        popupPlacement: 'left',
        renderPopupContents: (props) => (
          <div style={{ padding: 8, width: 200 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <h4 style={{ margin: '0 8px 0 4px', alignSelf: 'center' }}>
                {props.event.title}
              </h4>
              <Button
                iconBefore={<CrossIcon label="" size="small" />}
                onClick={props.onClose}
                spacing="compact"
                appearance="subtle"
                testId="close-event-popup"
              />
            </div>
            <p style={{ margin: '0 4px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
              purus dictum, viverra lectus nec, interdum quam. Fusce quis
              pulvinar diam. Praesent ultricies congue malesuada.
            </p>
          </div>
        ),
      });
    },
  });
  return (
    <IntlProvider locale="en">
      <div css={{ width: '800px', height: '600px' }}>{calendar}</div>
    </IntlProvider>
  );
}
