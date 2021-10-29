import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MockTeamCheckin } from '../mocks';
import { TeamCheckin } from '../types';

import TeamCheckinCard from './main';

describe('TeamCheckinCard', () => {
  let testId: string;
  let onEdit: (teamCheckinId: string) => void;
  let onDelete: (teamCheckinId: string) => void;
  let teamCheckin: TeamCheckin;
  let result: RenderResult;

  beforeEach(() => {
    testId = 'team-checkin-card';
    onEdit = jest.fn();
    onDelete = jest.fn();
    teamCheckin = MockTeamCheckin;

    result = render(
      <CompassTestProvider>
        <TeamCheckinCard
          testId={testId}
          onEdit={onEdit}
          onDelete={onDelete}
          teamCheckin={teamCheckin}
        />
      </CompassTestProvider>,
    );
  });

  it('should have the team checkin card', () => {
    const teamCheckinCard = result.getByTestId(`${testId}`);

    expect(teamCheckinCard).toBeInTheDocument();
  });

  it('should have the heading', () => {
    const heading = result.getByTestId(`${testId}.heading`);

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/Mood this week/);
  });

  it('should have the mood info', () => {
    const moodInfo = result.getByTestId(`${testId}.mood-info`);

    expect(moodInfo).toBeInTheDocument();
  });

  it('should have the timestamp', () => {
    const timestamp = result.getByTestId(`${testId}.timestamp`);

    expect(timestamp).toBeInTheDocument();
    expect(timestamp.textContent).toMatch(/September 15, 2021/);
  });

  it('should have the body', () => {
    const body = result.getByTestId(`${testId}.body`);

    expect(body).toBeInTheDocument();
  });

  it('should have the responses', () => {
    const body = result.getByTestId(`${testId}.body`);

    expect(body.textContent).toMatch(/What went well?/);
    expect(body.textContent).toMatch(teamCheckin.response1 as string);

    expect(body.textContent).toMatch(/Where can we get better?/);
    expect(body.textContent).toMatch(teamCheckin.response2 as string);

    expect(body.textContent).toMatch(/Where did we get lucky?/);
    expect(body.textContent).toMatch(teamCheckin.response3 as string);
  });
});
