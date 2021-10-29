import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import MoodInfo from './main';

describe('MoodInfo', () => {
  let testId: string = 'mood-info';
  let result: RenderResult;

  const testCases = [
    [1, 'Bad'],
    [2, 'Not great'],
    [3, 'Ok'],
    [4, 'Good'],
    [5, 'Great'],
  ];

  describe('emoji', () => {
    test.each(testCases)(
      `for mood (%s), it should render the (%s) emoji`,
      (mood, expected) => {
        testId = 'mood-info';

        result = render(
          <CompassTestProvider>
            <MoodInfo testId={testId} mood={mood as number} />
          </CompassTestProvider>,
        );

        const emoji = result.getByTestId(`${testId}.emoji-${mood}`);
        expect(emoji).toBeInTheDocument();
      },
    );
  });

  describe('lozenge', () => {
    test.each(testCases)(
      `for mood (%s), it should render the (%s) lozenge`,
      (mood, expected) => {
        testId = 'mood-info';

        result = render(
          <CompassTestProvider>
            <MoodInfo testId={testId} mood={mood as number} />
          </CompassTestProvider>,
        );

        const lozenge = result.getByTestId(`${testId}.lozenge-${mood}`);
        expect(lozenge).toBeInTheDocument();
      },
    );
  });

  describe('text', () => {
    test.each(testCases)(
      `for mood (%s), it should render the (%s) text`,
      (mood, expected) => {
        testId = 'mood-info';

        result = render(
          <CompassTestProvider>
            <MoodInfo testId={testId} mood={mood as number} />
          </CompassTestProvider>,
        );

        const lozenge = result.getByTestId(`${testId}.lozenge-${mood}`);
        expect(lozenge.textContent).toContain(expected);
      },
    );
  });
});
