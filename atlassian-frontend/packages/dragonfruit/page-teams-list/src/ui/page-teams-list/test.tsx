import React from 'react';

import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { PageTeamsList } from './index';

describe('PageTeamsList', () => {
  let result: RenderResult;
  const testId = 'fake-test-id';

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <PageTeamsList testId={testId} />
      </CompassTestProvider>,
    );
  });

  test('render the component', () => {
    expect(result.getByTestId(testId)).toBeInTheDocument();
  });

  describe('Invite to Compass', () => {
    test('render the Invite to Compass button within the header', () => {
      expect(
        result.getByTestId(`${testId}.header.invite-compass-button`),
      ).toBeInTheDocument();
    });

    test("'Invite to Compass' button displays invite modal", () => {
      expect(
        result.queryByTestId(`${testId}.teams-list.invite-people-modal`),
      ).not.toBeInTheDocument();

      const inviteButton = result.getByTestId(
        `${testId}.header.invite-compass-button`,
      );

      act(() => {
        userEvent.click(inviteButton);
      });

      expect(
        result.getByTestId(`${testId}.teams-list.invite-people-modal`),
      ).toBeInTheDocument();
    });
  });

  test('render the Start a Team within the header', () => {
    expect(
      result.getByTestId(`${testId}.header.start-team-button`),
    ).toBeInTheDocument();
  });

  test('Clicking start team button successfully opens start a team modal', async () => {
    const startTeamButton = result.getByTestId(
      `${testId}.header.start-team-button`,
    );
    // Click "Start team"
    userEvent.click(startTeamButton);

    // Look for team name input (only element with a testId)
    const teamInput = await result.findByTestId('team-name-input');
    expect(teamInput).toBeInTheDocument();
  });
});
