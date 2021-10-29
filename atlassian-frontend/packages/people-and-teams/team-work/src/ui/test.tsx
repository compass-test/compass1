import React from 'react';

import { render } from '@testing-library/react';

import { AppWrapper } from '../mocks';

import { TeamWorkProps } from './types';

import TeamWork from './index';

describe('Team Work', () => {
  const testId = 'team-work-test';
  const wrapper = (props: TeamWorkProps) =>
    render(
      <AppWrapper mocks={{}}>
        <TeamWork testId={testId} {...props} />
      </AppWrapper>,
    );

  test('should render when jiraAvailable=true and !cloudId', async () => {
    const { queryByTestId } = wrapper({
      teamId: 'test-teamId',
      jiraAvailable: true,
    });
    expect(queryByTestId(testId)).toBeTruthy();
  });

  test('should not render when jiraAvailable=false and !cloudId', async () => {
    const { queryByTestId } = wrapper({
      teamId: 'test-teamId',
      jiraAvailable: false,
    });
    expect(queryByTestId(testId)).toBeFalsy();
  });
});
