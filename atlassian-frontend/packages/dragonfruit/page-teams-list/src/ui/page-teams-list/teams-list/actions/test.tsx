import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Actions } from './main';

describe('Actions', () => {
  const teamId = 'test-account-id';
  const testId = 'fake-id';

  it('should render the actions menu', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <Actions teamName="test-name" testId={testId} accountId={teamId} />
      </CompassTestProvider>,
    );

    const menu = getByTestId(`${testId}.menu`);

    expect(menu).toBeInTheDocument();
  });

  it('should open new tab with atlassian team profile when edit profile action is clicked', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <Actions teamName="test-name" testId={testId} accountId={teamId} />
      </CompassTestProvider>,
    );

    const menu = getByTestId(`${testId}.menu`);

    expect(menu).toBeInTheDocument();
    fireEvent.click(menu);

    const windowSpy = jest.spyOn(window, 'open');

    const editProfileButton = getByTestId(`${testId}.edit-profile`);

    editProfileButton.click();
    expect(windowSpy).toHaveBeenCalledWith(
      `${window.location.origin}/people/team/${teamId}?ref=compass&src=teamDashboard&returnTo=compass`,
      '_blank',
      'noopener,noreferrer',
    );
  });
});
