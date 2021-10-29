import React, { ReactNode } from 'react';

import {
  mockGetTeamByIdAccessRestricted,
  mockGetTeamByIdFailure,
  mockGetTeamByIdNotFound,
  mockGetTeamByIdSuccess,
  mockGetTeamsFailure,
  mockGetTeamsNoResults,
  mockGetTeamsSuccess,
  TeamDetails,
  TeamsSearchResponse,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  fetchMockGet,
  MOCK_COMPASS_TEAM_ID,
  MOCK_ORG_ID,
} from '@atlassian/dragonfruit-testing';

import { TeamSelect } from './index';

export default {
  decorators: [
    (storyFn: () => ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

const mockTeamAri = `ari:cloud:teams::team/${MOCK_COMPASS_TEAM_ID}`;

const mockTeamsSuccess = () => {
  fetchMockGet<TeamsSearchResponse>(mockGetTeamsSuccess());
};

const mockTeamsFailure = () => {
  fetchMockGet<number>(mockGetTeamsFailure());
};

const mockTeamsSuccessWithNoResults = () => {
  fetchMockGet<TeamsSearchResponse>(mockGetTeamsNoResults());
};

const mockTeamByIdSuccess = () => {
  fetchMockGet<TeamDetails>(mockGetTeamByIdSuccess(MOCK_COMPASS_TEAM_ID));
};

const mockTeamByIdFailure = () => {
  fetchMockGet<number>(mockGetTeamByIdFailure(MOCK_COMPASS_TEAM_ID));
};

const mockTeamByIdForbidden = () => {
  fetchMockGet<number>(mockGetTeamByIdAccessRestricted(MOCK_COMPASS_TEAM_ID));
};

const mockTeamByIdNotFoundFailure = () => {
  fetchMockGet<number>(mockGetTeamByIdNotFound(MOCK_COMPASS_TEAM_ID));
};

/**
 * Regular happy path
 */
export const TeamSelectSuccess = () => {
  mockTeamsSuccess();

  return <TeamSelect orgId={MOCK_ORG_ID} />;
};

TeamSelectSuccess.displayName = 'Team Select';

/**
 * Success, but with no results.
 */
export const TeamSelectNoResults = () => {
  mockTeamsSuccessWithNoResults();

  return <TeamSelect orgId={MOCK_ORG_ID} />;
};

TeamSelectNoResults.displayName = 'Team Select - No Results';

/**
 * Success, with a default selected team.
 */
export const TeamSelectWithDefault = () => {
  mockTeamsSuccess();
  mockTeamByIdSuccess();

  return <TeamSelect defaultTeamId={mockTeamAri} orgId={MOCK_ORG_ID} />;
};

TeamSelectWithDefault.displayName = 'Team Select - With Default';

/**
 * Failed to load the list of options.
 */
export const TeamSelectFailureLoadingOptions = () => {
  mockTeamsFailure();

  return <TeamSelect orgId={MOCK_ORG_ID} />;
};

TeamSelectFailureLoadingOptions.displayName =
  'Team Select - Failure loading options';

/**
 * Failed to load the default selected team.
 */
export const TeamSelectWithDefaultGenericError = () => {
  mockTeamsSuccess();
  mockTeamByIdFailure();

  return <TeamSelect defaultTeamId={mockTeamAri} orgId={MOCK_ORG_ID} />;
};

TeamSelectWithDefaultGenericError.displayName =
  'Team Select - Default Generic Error';

/**
 * User does not have access to load the default selected team.
 */
export const TeamSelectWithDefaultForbidden = () => {
  mockTeamsSuccess();
  mockTeamByIdForbidden();

  return <TeamSelect defaultTeamId={mockTeamAri} orgId={MOCK_ORG_ID} />;
};

TeamSelectWithDefaultForbidden.displayName =
  'Team Select - Default Access Restricted';

/**
 * The default selected team was not found.
 */
export const TeamSelectWithDefaultNotFound = () => {
  mockTeamsSuccess();
  mockTeamByIdNotFoundFailure();

  return <TeamSelect defaultTeamId={mockTeamAri} orgId={MOCK_ORG_ID} />;
};

TeamSelectWithDefaultNotFound.displayName = 'Team Select - Default Not Found';
