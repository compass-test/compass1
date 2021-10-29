import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardMetadata } from './index';

describe('ScorecardMetadata', () => {
  let result: RenderResult;
  const testId = 'test-id';
  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <ScorecardMetadata
          ownerId="test-owner"
          ownerName="Owner Name"
          importance={CompassScorecardImportance.REQUIRED}
          testId={testId}
        />
      </CompassTestProvider>,
    );
  });

  test('Should display metadata component', async () => {
    expect(result.getByTestId(testId)).toBeInTheDocument();
  });

  test('Should display owner name', async () => {
    expect(result.getByText('Owner Name')).toBeInTheDocument();
  });

  test('Should display correct icon for scorecard importance', async () => {
    expect(
      result.getByTestId(
        'page-scorecard-templates.ui.scorecard-summary.required-standard-icon',
      ),
    ).toBeInTheDocument();
    expect(result.getByText('Required')).toBeInTheDocument();
  });
});
