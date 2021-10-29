import React from 'react';

import { render } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import DragonfruitCsvImport from './index';

describe('DragonfruitCsvImport', () => {
  test('should be found by data-testid', () => {
    const testId = 'dragonfruit-csv-import';

    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <DragonfruitCsvImport testId={testId} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeTruthy();
  });
});
