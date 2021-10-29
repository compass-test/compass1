/** @jsx jsx */

import { useEffect } from 'react';

import { jsx } from '@emotion/core';
import MockDate from 'mockdate';
import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button';

import { useCalendar } from '../src';
import { MOCK_EVENTS } from '../src/common/mocks';

const EventAddPopup = ({
  onClose,
  onEventAdded,
}: {
  onClose: () => void;
  onEventAdded?: () => void;
}) => {
  useEffect(() => {
    return () => {
      onEventAdded?.();
    };
  }, [onEventAdded]);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={onClose} appearance="primary" testId="close-popup">
        Close me
      </Button>
    </div>
  );
};

export default function WeekView() {
  MockDate.set('2020-01-01T12:00Z');
  const { calendar } = useCalendar({
    events: MOCK_EVENTS,
    initialView: 'grid',
    initialViewRange: 'week',
    timezone: 'UTC',
    testId: 'calendar',
    onEventAdd: async (start, end, allDay, openPopup) => {
      let onEventAdded: () => void;
      openPopup({
        popupPlacement: 'right',
        renderPopupContents: ({ onClose }) => (
          <EventAddPopup onClose={onClose} onEventAdded={onEventAdded} />
        ),
      });
      await new Promise((resolve) => {
        onEventAdded = () => {
          resolve(undefined);
        };
      });
    },
  });
  return (
    <IntlProvider locale="en">
      <div css={{ width: '800px', height: '600px' }}>{calendar}</div>
    </IntlProvider>
  );
}
