import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import CheckinTimestamp from './main';

describe('CheckinTimestamp', () => {
  let testId: string;
  let timestamp: string;
  let result: RenderResult;

  beforeEach(() => {
    testId = 'checkin-timestamp';
    timestamp = 'September 15, 2021';

    result = render(
      <CompassTestProvider>
        <CheckinTimestamp testId={testId} timestamp={timestamp} />
      </CompassTestProvider>,
    );
  });

  it('should have checkinTimestamp icon', () => {
    const checkinTimestamp = result.getByTestId(`${testId}`);

    expect(checkinTimestamp).toBeInTheDocument();
  });

  it('should have calendar icon', () => {
    const calendarIcon = result.getByTestId(`${testId}.calendar-icon`);

    expect(calendarIcon).toBeInTheDocument();
  });

  it('should have timestamp', () => {
    const timestamp = result.getByTestId(`${testId}.timestamp`);

    expect(timestamp).toBeInTheDocument();
  });

  it('should have the correct timestamp', () => {
    const timestamp = result.getByTestId(`${testId}.timestamp`);

    expect(timestamp.textContent).toMatch(/September 15, 2021/);
  });
});
