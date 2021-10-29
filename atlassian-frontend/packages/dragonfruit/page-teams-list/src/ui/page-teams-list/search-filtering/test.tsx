import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { SearchFiltering } from './main';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('SearchFiltering', () => {
  let result: RenderResult;
  const testId = 'fake-test-id';
  const toggleYourTeamsEnabled = jest.fn();
  const setSearchText = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    result = render(
      <CompassTestProvider>
        <SearchFiltering
          testId={testId}
          yourTeamsEnabled={false}
          toggleYourTeamsEnabled={toggleYourTeamsEnabled}
          setSearchText={setSearchText}
        />
      </CompassTestProvider>,
    );
  });

  test('render the component', () => {
    expect(result.getByTestId(testId)).toBeInTheDocument();
  });

  test('render the Search Terms field', () => {
    expect(
      result.getByTestId(`${testId}.search-terms-field`),
    ).toBeInTheDocument();
  });

  test('render the Your Teams button', () => {
    expect(
      result.getByTestId(`${testId}.your-teams-button`),
    ).toBeInTheDocument();
  });

  test('clicking the Your Teams button should toggle Your Teams enabled', () => {
    const yourTeamsButton = result.getByTestId(`${testId}.your-teams-button`);
    userEvent.click(yourTeamsButton);
    expect(toggleYourTeamsEnabled).toHaveBeenCalled();
  });

  test('clicking the Your Team button should fire UI analytics event', () => {
    const yourTeamsButton = result.getByTestId(`${testId}.your-teams-button`);
    userEvent.click(yourTeamsButton);
    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'button',
        }),
      }),
      'yourTeams',
    );
  });

  test('clicking the search teams text field should fire UI analytics event', () => {
    const searchTeamsButton = result.getByTestId(
      `${testId}.search-terms-field`,
    );
    userEvent.click(searchTeamsButton);
    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'textField',
        }),
      }),
      'searchTeams',
    );
  });

  test('typing in the Search field should set search text', () => {
    const searchField = result.getByTestId(`${testId}.search-terms-field`);
    userEvent.type(searchField, 'abc');
    expect(setSearchText).toHaveBeenCalledTimes(3);
  });
});
