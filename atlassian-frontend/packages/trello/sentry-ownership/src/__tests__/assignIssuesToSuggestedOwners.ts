import { SentryApiClient } from '../SentryApiClient';
import { defaults } from 'requestretry';
import { logger } from '../logger';
import bunyan from 'bunyan';
import { assignIssues } from '../assignIssuesToSuggestedOwners';

class MockSentryClient implements SentryApiClient {
  rateLimitingDelay = 0;
  memberLookupCache = new Map();
  sentryUrl = 'some-url';
  sentryOrg = 'some-org';
  sentryRequest = defaults({});
  getTeamMembers = jest.fn();
  addTeamMember = jest.fn();
  removeTeamMember = jest.fn();
  getMemberId = jest.fn();
  createTeam = jest.fn();
  setOwnershipRules = jest.fn();
  addTeamToProject = jest.fn();
  getProjectTeams = jest.fn();
  deleteTeam = jest.fn();
  assignIssueToTeam = jest.fn();
  assignSuggestedOwnerToIssue = jest.fn();
  getLatestEvent = jest.fn();
  getSuggestedOwner = jest.fn();
  getIssues = jest.fn();
  getUnresolvedIssues = jest.fn();
  getIssueCountForTeam = jest.fn();
}

describe('assignIssuesToSuggestedOwners', () => {
  beforeAll(() => {
    // Don't log info stuff during test runs
    logger.level(bunyan.FATAL + 1);
  });

  it('should fetch issues and attempt to assign them to a suggested owner', async () => {
    const sentryClient = new MockSentryClient();
    sentryClient.getIssues.mockReturnValueOnce(
      Promise.resolve({
        hasMore: true,
        nextCursor: 'page2cursor',
        issues: [{ id: 'issue1' }, { id: 'issue2' }],
      }),
    );
    sentryClient.getIssues.mockReturnValueOnce(
      Promise.resolve({
        hasMore: false,
        nextCursor: 'page3cursor',
        issues: [{ id: 'issue3' }, { id: 'issue4' }],
      }),
    );

    sentryClient.assignSuggestedOwnerToIssue.mockReturnValueOnce(
      Promise.resolve(null),
    );
    sentryClient.assignSuggestedOwnerToIssue.mockReturnValueOnce(
      Promise.resolve('team1'),
    );
    sentryClient.assignSuggestedOwnerToIssue.mockReturnValueOnce(
      Promise.resolve('team2'),
    );
    sentryClient.assignSuggestedOwnerToIssue.mockReturnValueOnce(
      Promise.resolve('team2'),
    );

    const assignedCounts = await assignIssues({
      sentryClient,
      projectName: 'trello-web',
      filterByTimesSeen: 5,
      filterByUnassigned: true,
    });

    expect(sentryClient.getIssues).toHaveBeenCalledTimes(2);
    expect(sentryClient.assignSuggestedOwnerToIssue).toHaveBeenCalledTimes(4);
    expect(assignedCounts).toEqual({
      'N/A': 1,
      team1: 1,
      team2: 2,
    });
  });
});
