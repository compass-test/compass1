import { SentryApiClient } from '../SentryApiClient';
import { syncOwnership, OwnershipDefinition } from '../syncOwnership';
import { defaults } from 'requestretry';
import { logger } from '../logger';
import bunyan from 'bunyan';

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

describe('syncOwnership', () => {
  beforeAll(() => {
    // Don't log info stuff during test runs
    logger.level(bunyan.FATAL + 1);
  });

  it('should sync ownership rules based on the ownership definitions', async () => {
    const sentryClient = new MockSentryClient();
    const ownershipDefinition: OwnershipDefinition = {
      'my-first-team': ['./pattern/number/1/*', './pattern/number/2'],
      'my-second-team': ['./pattern/number/3', './pattern/number/4/*'],
    };
    const currentDate = new Date();
    // @ts-ignore we are stubbing the global Date constructor here
    jest.spyOn(global, 'Date').mockImplementationOnce(() => currentDate);

    await syncOwnership({
      sentryClient,
      projectName: 'my-test-project',
      ownershipDefinition,
    });

    const expectedOwnershipContent = [
      `# generated by sentry-ownership ${currentDate}`,
      'path:./pattern/number/1/* #my-first-team',
      'path:./pattern/number/2 #my-first-team',
      'path:./pattern/number/3 #my-second-team',
      'path:./pattern/number/4/* #my-second-team',
    ].join('\n');

    expect(sentryClient.setOwnershipRules).toHaveBeenCalledWith(
      'my-test-project',
      expectedOwnershipContent,
    );
  });
});
