import fetchMock from 'fetch-mock/cjs/client';

export { mockGetCollaborators } from './mocks/mock-collabs';
export { mockGetRecommendations } from './mocks/mock-recommendations';
export {
  testTeamData,
  testMembershipData,
  testMyTeamsData,
  testRecommendationsData,
  testProposedMembersData,
  testCollaboratorsData,
} from './mocks/mock-data';
export {
  mockGetTeams,
  mockCreateTeam,
  mockInviteTeamMembers,
} from './mocks/mock-teams';

export function resetFetchMock() {
  fetchMock.reset();
}
