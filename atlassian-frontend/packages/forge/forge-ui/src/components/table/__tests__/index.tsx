import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { basicTable } from './__fixtures__/mockData';
import { Wrapper } from '../lazyLoadedTable';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

afterEach(() => {
  jest.clearAllMocks();
});

test('displays table data', async () => {
  const { getByText } = render(
    <Suspense fallback={null}>{basicTable}</Suspense>,
  );
  await waitForElement(() => getByText('column 1 heading', { exact: false }));
  expect(getByText('column 1 heading', { exact: false })).toBeTruthy();
});

const errorCases: [string, string, number, boolean][] = [
  [
    're-renders after a findDOMNode exception is thrown once',
    'Unable to find node on an unmounted component.',
    1,
    true,
  ],
  [
    're-renders after a findDOMNode exception is thrown once',
    'Minified React error #188; See',
    1,
    true,
  ],
  [
    'does not re-render after a findDOMNode exception is thrown twice in a row',
    'Unable to find node on an unmounted component.',
    2,
    false,
  ],
  [
    'does not re-render after a non-findDOMNode exception is thrown',
    'Cannot read property goodCode of undefined',
    1,
    false,
  ],
];

test.each(errorCases)(
  'Table %s',
  async (_, errorMessage, errorCount, shouldPass) => {
    let throwCount = 0;
    jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { getByText } = render(
        <Suspense fallback={null}>
          <Wrapper
            Component={() => {
              if (throwCount < errorCount) {
                throwCount++;
                throw new Error(errorMessage);
              } else {
                return <div>hello</div>;
              }
            }}
          />
        </Suspense>,
      );
      await waitForElement(() => getByText('hello'));
      expect(getByText('hello')).toBeTruthy();
    } catch (e) {
      expect(shouldPass).toBe(false);
      expect(e.message).toMatch(errorMessage);
    }
  },
);
