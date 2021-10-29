import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TimeCell } from './index';

describe('TimeCell', () => {
  describe('UTC timezone', () => {
    beforeEach(() => {
      Date.now = jest.fn(() => Date.parse('2021-10-19T00:00:00.000Z'));
    });

    it.each`
      eventTime                     | expectedTimeCellValue
      ${'2021-10-19T00:00:00.000Z'} | ${'Today, 12:00 AM'}
      ${'2021-10-19T23:59:00.000Z'} | ${'Today, 11:59 PM'}
      ${'2021-10-18T23:59:00.000Z'} | ${'Oct 18, 2021 11:59 PM'}
      ${'2021-10-15T23:59:00.000Z'} | ${'Oct 15, 2021 11:59 PM'}
    `(
      'time cell should render the date in the correct format',
      ({ eventTime, expectedTimeCellValue }) => {
        render(
          <CompassTestProvider>
            <TimeCell eventLastUpdated={eventTime} />
          </CompassTestProvider>,
        );
        expect(screen.getByText(expectedTimeCellValue)).toBeInTheDocument();
      },
    );
  });

  describe('AEST timezone', () => {
    beforeEach(() => {
      Date.now = jest.fn(() => Date.parse('2021-10-19T10:00:00.000+10:00'));
    });

    it.each`
      eventTime                     | expectedTimeCellValue
      ${'2021-10-19T00:00:00.000Z'} | ${'Today, 12:00 AM'}
      ${'2021-10-19T23:59:00.000Z'} | ${'Today, 11:59 PM'}
      ${'2021-10-18T23:59:00.000Z'} | ${'Oct 18, 2021 11:59 PM'}
      ${'2021-10-15T23:59:00.000Z'} | ${'Oct 15, 2021 11:59 PM'}
    `(
      'time cell should render the date in the correct format',
      ({ eventTime, expectedTimeCellValue }) => {
        render(
          <CompassTestProvider>
            <TimeCell eventLastUpdated={eventTime} />
          </CompassTestProvider>,
        );
        expect(screen.getByText(expectedTimeCellValue)).toBeInTheDocument();
      },
    );
  });
});
