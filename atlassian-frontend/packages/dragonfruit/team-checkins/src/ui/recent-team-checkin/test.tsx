import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MockDelete, MockEdit, MockTeamCheckin } from '../../common/ui/mocks';
import { TeamCheckin } from '../../common/ui/types';

import { RecentTeamCheckin } from './main';

describe('PastTeamCheckins', () => {
  let testId: string;
  let onEdit: (teamCheckinId: string) => void;
  let onDelete: (teamCheckinId: string) => void;
  let teamCheckin: TeamCheckin;
  let result: RenderResult;

  beforeEach(() => {
    testId = 'past-team-checkins';
    onEdit = MockEdit;
    onDelete = MockDelete;
    teamCheckin = MockTeamCheckin;

    result = render(
      <CompassTestProvider>
        <RecentTeamCheckin
          testId={testId}
          onEdit={onEdit}
          onDelete={onDelete}
          teamCheckin={teamCheckin}
        />
      </CompassTestProvider>,
    );
  });

  it('should render the recent team checkin', () => {
    const recentTeamCheckin = result.getByTestId(`${testId}`);

    expect(recentTeamCheckin).toBeInTheDocument();
  });

  it('should render the expected heading for recent team checkin', () => {
    const headingTestid = result.getByTestId(`${testId}.heading`);

    expect(headingTestid).toBeInTheDocument();
    expect(headingTestid.textContent).toMatch(/Team check-in/);
  });

  it('should render the individual recent team checkin', () => {
    const recentTeamCheckin = result.getByTestId(`${testId}.team-checkin`);

    expect(recentTeamCheckin).toBeInTheDocument();
  });
});
