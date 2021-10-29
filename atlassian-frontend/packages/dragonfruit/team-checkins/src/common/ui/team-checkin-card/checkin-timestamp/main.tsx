import React from 'react';

import CalendarIcon from '@atlaskit/icon/glyph/calendar';

import { CheckinTimestampWrapper, Timestamp } from './styled';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  timestamp: string;
}

function CheckinTimestamp({ testId = 'checkin-timestamp', timestamp }: Props) {
  const checkinTimestampTestId = testId;
  const calendarIconTestId = testId && `${testId}.calendar-icon`;
  const timestampTestId = testId && `${testId}.timestamp`;

  return (
    <CheckinTimestampWrapper data-testid={checkinTimestampTestId}>
      <CalendarIcon label="calendar" testId={calendarIconTestId} />
      <Timestamp data-testid={timestampTestId}>{timestamp}</Timestamp>
    </CheckinTimestampWrapper>
  );
}

export default CheckinTimestamp;
