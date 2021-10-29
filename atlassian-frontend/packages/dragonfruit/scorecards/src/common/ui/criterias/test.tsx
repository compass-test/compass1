import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { mockCriterias } from './mocks';

import Criterias from './index';

describe('Criterias', () => {
  let result: RenderResult;

  const testId = 'fake-test-id';

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <Criterias
          criterias={mockCriterias}
          testId={testId}
          headingCase={'upperCase'}
        />
      </CompassTestProvider>,
    );
  });

  test('should be found by the provided testId', async () => {
    expect(result.getByTestId(`${testId}.criterias`)).toBeInTheDocument();
  });

  test('should have not completed criteria', async () => {
    expect(result.getByText('NOT COMPLETED')).toBeInTheDocument();
    expect(result.getByText('Service has an owner team')).toBeInTheDocument();
    expect(result.getByText('Service has a dashboard')).toBeInTheDocument();
    expect(result.getByText('Service has a project')).toBeInTheDocument();
  });

  test('should have completed criteria', async () => {
    expect(result.getByText('COMPLETED')).toBeInTheDocument();
    expect(result.getByText('Service has a description')).toBeInTheDocument();
    expect(result.getByText('Service has a chat channel')).toBeInTheDocument();
    expect(result.getByText('Service has documentation')).toBeInTheDocument();
    expect(result.getByText('Service has a repository')).toBeInTheDocument();
  });
});

describe('headingCase', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <Criterias criterias={mockCriterias} headingCase={'sentenceCase'} />
      </CompassTestProvider>,
    );
  });

  describe('when sentenceCase', () => {
    test('should render in sentenceCase', async () => {
      expect(result.getByText('Not completed')).toBeInTheDocument();
      expect(result.getByText('Completed')).toBeInTheDocument();
    });
  });

  describe('when upperCase', () => {
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <Criterias criterias={mockCriterias} headingCase={'upperCase'} />
        </CompassTestProvider>,
      );
    });

    test('should render in upperCase', async () => {
      expect(result.getByText('NOT COMPLETED')).toBeInTheDocument();
      expect(result.getByText('COMPLETED')).toBeInTheDocument();
    });
  });
});
