import { SentryApiClient } from '../SentryApiClient';
import { syncTeams } from '../syncTeams';
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

describe('syncTeams', () => {
  beforeAll(() => {
    // Don't log info stuff during test runs
    logger.level(bunyan.FATAL + 1);
  });

  describe('team syncing', () => {
    it('should remove teams from sentry than no longer exist in the team definitions', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      const teamsDefinition = {};

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
      });

      expect(sentryClient.deleteTeam).toHaveBeenCalledWith('my-existing-team');
      expect(sentryClient.createTeam).not.toHaveBeenCalled();
      expect(sentryClient.addTeamToProject).not.toHaveBeenCalled();
    });

    it('should add teams to sentry that exist in the team definitions but are not yet in sentry', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      const teamsDefinition = {
        'my-existing-team': { contributors: ['tlockheart'] },
        'my-team': { contributors: ['bwallace', 'cstrife'] },
      };

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
      });

      expect(sentryClient.deleteTeam).not.toHaveBeenCalled();
      expect(sentryClient.createTeam).toHaveBeenCalledWith('my-team');
      expect(sentryClient.addTeamToProject).toHaveBeenCalledWith(
        'my-project',
        'my-team',
      );
    });

    it('should ignore removal of teams that are included in the ignoredTeamNames argument', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      const teamsDefinition = {};

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
        ignoredTeamNames: ['my-existing-team'],
      });

      expect(sentryClient.deleteTeam).not.toHaveBeenCalled();
      expect(sentryClient.createTeam).not.toHaveBeenCalled();
      expect(sentryClient.addTeamToProject).not.toHaveBeenCalled();
    });
  });

  describe('team membership syncing', () => {
    it('should add team members that exist in the team definitions but are not yet a member of the team in sentry', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      sentryClient.getTeamMembers.mockReturnValue(
        Promise.resolve([{ email: 'cstrife@atlassian.com', id: 'id1' }]),
      );
      sentryClient.getMemberId.mockReturnValue(Promise.resolve('id2'));
      const teamsDefinition = {
        'my-existing-team': {
          contributors: ['cstrife', 'bwallace'],
        },
      };

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
      });

      expect(sentryClient.removeTeamMember).not.toHaveBeenCalled();
      expect(sentryClient.addTeamMember).toHaveBeenCalledWith(
        'my-existing-team',
        'id2',
      );
    });

    it('should remove team members that exist in the sentry team but are no longer in the team definition', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      sentryClient.getTeamMembers.mockReturnValue(
        Promise.resolve([
          { email: 'cstrife@atlassian.com', id: 'id1' },
          { email: 'bwallace@atlassian.com', id: 'id2' },
        ]),
      );
      const teamsDefinition = {
        'my-existing-team': {
          contributors: ['cstrife'],
        },
      };

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
      });

      expect(sentryClient.addTeamMember).not.toHaveBeenCalled();
      expect(sentryClient.removeTeamMember).toHaveBeenCalledWith(
        'my-existing-team',
        'id2',
      );
    });

    it('should do nothing for team members that already exist in sentry and in the team definition', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      sentryClient.getTeamMembers.mockReturnValue(
        Promise.resolve([
          { email: 'cstrife@atlassian.com', id: 'id1' },
          { email: 'bwallace@atlassian.com', id: 'id2' },
        ]),
      );
      const teamsDefinition = {
        'my-existing-team': {
          contributors: ['cstrife', 'bwallace'],
        },
      };

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
      });

      expect(sentryClient.addTeamMember).not.toHaveBeenCalled();
      expect(sentryClient.removeTeamMember).not.toHaveBeenCalledWith();
    });

    it('should do nothing when the team members could not be fetched from sentry', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      sentryClient.getTeamMembers.mockReturnValue(Promise.resolve(null));
      const teamsDefinition = {
        'my-existing-team': {
          contributors: ['cstrife', 'bwallace'],
        },
      };

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
      });

      expect(sentryClient.addTeamMember).not.toHaveBeenCalled();
      expect(sentryClient.removeTeamMember).not.toHaveBeenCalledWith();
    });

    it('should do nothing for members that do not exist in sentry', async () => {
      const sentryClient = new MockSentryClient();
      sentryClient.getProjectTeams.mockReturnValue(
        Promise.resolve([{ name: 'my-existing-team' }]),
      );
      sentryClient.getTeamMembers.mockReturnValue(
        Promise.resolve([{ email: 'cstrife@atlassian.com', id: 'id1' }]),
      );
      sentryClient.getMemberId.mockReturnValue(Promise.resolve(null));
      const teamsDefinition = {
        'my-existing-team': {
          contributors: ['cstrife', 'bwallace'],
        },
      };

      await syncTeams({
        sentryClient,
        projectName: 'my-project',
        teamsDefinition,
      });

      expect(sentryClient.removeTeamMember).not.toHaveBeenCalled();
      expect(sentryClient.addTeamMember).not.toHaveBeenCalled();
    });
  });
});
