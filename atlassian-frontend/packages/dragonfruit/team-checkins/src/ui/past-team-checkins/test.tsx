import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MockDelete,
  MockEdit,
  MockTeamCheckin,
  MockTeamCheckinLongForm,
} from '../../common/ui/mocks';
import { TeamCheckin } from '../../common/ui/types';

import { PastTeamCheckins } from './main';

describe('PastTeamCheckins', () => {
  let testId: string;
  let onEdit: (teamCheckinId: string) => void;
  let onDelete: (teamCheckinId: string) => void;
  let teamCheckins: TeamCheckin[];
  let result: RenderResult;

  beforeEach(() => {
    testId = 'past-team-checkins';
    onEdit = MockEdit;
    onDelete = MockDelete;
    teamCheckins = [MockTeamCheckin, MockTeamCheckinLongForm];

    result = render(
      <CompassTestProvider>
        <PastTeamCheckins
          testId={testId}
          onEdit={onEdit}
          onDelete={onDelete}
          teamCheckins={teamCheckins}
        />
      </CompassTestProvider>,
    );
  });

  it('should render the past team checkins', () => {
    const pastTeamCheckinsTestId = result.getByTestId(`${testId}`);

    expect(pastTeamCheckinsTestId).toBeInTheDocument();
  });

  it('should render the expected heading for past team checkins', () => {
    const headingTestid = result.getByTestId(`${testId}.heading`);

    expect(headingTestid).toBeInTheDocument();
    expect(headingTestid.textContent).toMatch(/Previous week's check-ins/);
  });

  it('should render the individual past team checkins', () => {
    [...Array(teamCheckins.length).keys()].map(index => {
      const pastTeamCheckinTestId = result.getByTestId(
        `${testId}.team-checkin-${index}`,
      );

      expect(pastTeamCheckinTestId).toBeInTheDocument();
    });
  });
});
