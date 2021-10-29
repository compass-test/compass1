import React from 'react';

import {
  render,
  RenderResult,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  getMockCompassTeamMembersRest,
  mockGetCompassTeamUsersDataSuccess,
  mockGetTeamsFailure,
  mockGetTeamsNoResults,
  mockGetTeamsOfUserFailure,
  mockGetTeamsOfUserSuccess,
  mockGetTeamsSuccess,
  TeamsMembershipResponse,
  TeamsSearchResponse,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  fetchMockGet,
  MOCK_COMPASS_TEAM_ID,
  MOCK_COMPASS_TEAM_ID_2,
} from '@atlassian/dragonfruit-testing';

import { TeamsList } from './main';

describe('TeamsList', () => {
  let result: RenderResult;
  const testId = 'fake-test-id';

  describe('When teams of user call succeeds', () => {
    beforeEach(async () => {
      fetchMockGet(mockGetTeamsOfUserSuccess);
      fetchMockGet<TeamsMembershipResponse>(getMockCompassTeamMembersRest());

      result = render(
        <CompassTestProvider>
          <TeamsList testId={testId} yourTeamsEnabled={true} searchText="" />
        </CompassTestProvider>,
      );
      await waitForElementToBeRemoved(() =>
        result.getByTestId(`${testId}--loadingSpinner`),
      );
    });

    it('should render the page content', () => {
      expect(result.getByTestId(`${testId}--table`)).toBeTruthy();
    });

    it('should render a row for each team', () => {
      expect(
        result.getByTestId(`${testId}--row-team-row.${MOCK_COMPASS_TEAM_ID}`),
      ).toBeInTheDocument();
    });

    it('should render team name and description', () => {
      expect(result.getByText('Lodestone')).toBeInTheDocument();
      expect(result.getByText('Team description')).toBeInTheDocument();
    });
  });
  describe('When teams of user call fails', () => {
    beforeEach(async () => {
      fetchMockGet(mockGetTeamsOfUserFailure);

      result = render(
        <CompassTestProvider>
          <TeamsList testId={testId} yourTeamsEnabled={true} searchText="" />
        </CompassTestProvider>,
      );
    });

    it('should render error state', () => {
      expect(result.getByTestId(`${testId}.error`)).toBeTruthy();
    });
  });

  describe('When search teams call succeeds', () => {
    beforeEach(async () => {
      fetchMockGet<TeamsSearchResponse>(mockGetTeamsSuccess());
      fetchMockGet<TeamsMembershipResponse>(getMockCompassTeamMembersRest());
      fetchMockGet<TeamsMembershipResponse>(
        getMockCompassTeamMembersRest(MOCK_COMPASS_TEAM_ID_2),
      );

      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mockGetCompassTeamUsersDataSuccess}>
            <TeamsList testId={testId} yourTeamsEnabled={false} searchText="" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
      await waitForElementToBeRemoved(() =>
        result.getByTestId(`${testId}--loadingSpinner`),
      );
    });

    it('should render the page content', () => {
      expect(result.getByTestId(`${testId}--table`)).toBeTruthy();
    });

    it('should render a row for each team', () => {
      expect(
        result.getByTestId(`${testId}--row-team-row.${MOCK_COMPASS_TEAM_ID}`),
      ).toBeInTheDocument();
      expect(
        result.getByTestId(`${testId}--row-team-row.${MOCK_COMPASS_TEAM_ID_2}`),
      ).toBeInTheDocument();
    });

    it('should render team name and description', () => {
      expect(result.getByText('Compass Crux')).toBeInTheDocument();
      expect(result.getAllByText('Great team')).toHaveLength(2);
    });

    it('should render team avatar group', async () => {
      await waitForElement(() => result.getByTestId(`${testId}--avatar-group`));
      expect(result.getByTestId(`${testId}--avatar-0`)).toBeInTheDocument();
    });
  });
  describe('When search teams call returns no teams', () => {
    beforeEach(async () => {
      fetchMockGet<TeamsSearchResponse>(mockGetTeamsNoResults());

      result = render(
        <CompassTestProvider>
          <TeamsList testId={testId} yourTeamsEnabled={false} searchText="" />
        </CompassTestProvider>,
      );
      await waitForElementToBeRemoved(() =>
        result.getByTestId(`${testId}--loadingSpinner`),
      );
    });

    it('should render empty state', () => {
      expect(result.getByTestId(`${testId}.no-teams`)).toBeTruthy();
    });
  });

  describe('When search teams call fails', () => {
    beforeEach(async () => {
      fetchMockGet<number>(mockGetTeamsFailure());

      result = render(
        <CompassTestProvider>
          <TeamsList testId={testId} yourTeamsEnabled={false} searchText="" />
        </CompassTestProvider>,
      );
      await waitForElementToBeRemoved(() =>
        result.getByTestId(`${testId}--loadingSpinner`),
      );
    });

    it('should render error state', () => {
      expect(result.getByTestId(`${testId}.error`)).toBeTruthy();
    });
  });
});
