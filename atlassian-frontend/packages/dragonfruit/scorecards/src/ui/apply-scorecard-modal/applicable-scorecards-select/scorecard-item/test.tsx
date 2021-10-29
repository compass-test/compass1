import React from 'react';

import { render } from '@testing-library/react';

import {
  CompassComponentType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardItem, ScorecardLoadingItem } from './index';

describe('ScorecardItem', () => {
  const testId = 'fake-test-id';

  test('should show scorecard name and description', () => {
    const label = 'Test Scorecard Name';
    const description = 'Test Scorecard Description';
    const option = {
      componentType: CompassComponentType.SERVICE,
      label,
      importance: CompassScorecardImportance.REQUIRED,
      description,
      value: '',
    };

    const { getByTestId, getByText } = render(
      <CompassTestProvider>
        <ScorecardItem testId={testId} option={option} />
      </CompassTestProvider>,
    );

    const scorecardItem = getByTestId(testId);
    expect(scorecardItem).toBeInTheDocument();

    const labelText = getByText(label);
    const descriptionText = getByText(description);
    expect(labelText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
  });
});

describe('ScorecardLoadingItem', () => {
  const testId = 'fake-test-id';

  test('should show scorecard loading item', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ScorecardLoadingItem testId={testId} />
      </CompassTestProvider>,
    );

    const scorecardLoadingItem = getByTestId(testId);
    expect(scorecardLoadingItem).toBeInTheDocument();
  });
});
