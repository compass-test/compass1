import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  mockComponentName,
  mockComponentType,
  mockImportance,
  mockOwnerName,
  mockOwnerPicture,
} from './mocks';

import Details from './index';

describe('Details', () => {
  let result: RenderResult;

  const testId = 'scorecard-full-view-details';

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <Details
          ownerName={mockOwnerName}
          ownerPicture={mockOwnerPicture}
          componentType={mockComponentType}
          componentName={mockComponentName}
          importance={mockImportance}
          testId={testId}
        />
      </CompassTestProvider>,
    );
  });

  test('should be found by testId', async () => {
    expect(result.getByTestId(testId)).toBeInTheDocument();
  });

  test('should have owner name', async () => {
    expect(
      result.getByTestId('scorecard-full-view-details-owner-name'),
    ).toBeInTheDocument();
  });

  test('should have owner picture', async () => {
    expect(
      result.getByTestId('scorecard-full-view-details-owner-picture'),
    ).toBeInTheDocument();
  });

  test('should have component type icon', async () => {
    expect(
      result.getByTestId('scorecard-full-view-details-component-type-icon'),
    ).toBeInTheDocument();
  });

  test('should have component name', async () => {
    expect(
      result.getByTestId('scorecard-full-view-details-component-name'),
    ).toBeInTheDocument();
  });

  test('should have importance', async () => {
    expect(
      result.getByTestId('scorecard-full-view-details-importance'),
    ).toBeInTheDocument();
  });
});
