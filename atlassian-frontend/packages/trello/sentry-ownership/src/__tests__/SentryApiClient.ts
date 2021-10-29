import { SentryApiClient } from '../SentryApiClient';
import { logger } from '../logger';
import bunyan from 'bunyan';

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockDelete = jest.fn();
const mockPut = jest.fn();

jest.mock('requestretry', () => ({
  defaults: () => ({
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
  }),
}));

describe('SentryApiClient', () => {
  let client: SentryApiClient;
  beforeAll(() => {
    // Don't log info stuff during test runs
    logger.level(bunyan.FATAL + 1);
  });

  beforeEach(() => {
    client = new SentryApiClient({
      sentryUrl: 'test.url',
      sentryOrg: 'testorg',
      sentryAuthToken: 'abc123',
      rateLimitingDelay: 0,
    });
    jest.resetAllMocks();
  });

  describe('getTeamMembers', () => {
    it('should make the request using the correct URL', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [{ id: 'member1', email: 'member1@gmail.com' }],
      });

      await client.getTeamMembers('test-team');

      expect(mockGet).toHaveBeenCalledWith(
        'test.url/api/0/teams/testorg/test-team/members/',
      );
    });

    it('should return null when a 404 is received from sentry', async () => {
      mockGet.mockReturnValue({
        statusCode: 404,
      });

      const result = await client.getTeamMembers('test-team');

      expect(result).toBe(null);
    });

    it('should throw an error for statusCode < 200', async () => {
      mockGet.mockReturnValue({
        statusCode: 199,
      });

      await expect(client.getTeamMembers('test-team')).rejects.toThrow(
        'Expected 2xx status code retrieving team members for test-team, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockGet.mockReturnValue({
        statusCode: 300,
      });

      await expect(client.getTeamMembers('test-team')).rejects.toThrow(
        'Expected 2xx status code retrieving team members for test-team, but got 300',
      );
    });

    it('should return the sentry member array when the request is successful', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [
          { id: 'member1', email: 'member1@gmail.com' },
          { id: 'member2', email: 'member2@gmail.com' },
        ],
      });

      const result = await client.getTeamMembers('test-team');

      expect(result).toEqual([
        { id: 'member1', email: 'member1@gmail.com' },
        { id: 'member2', email: 'member2@gmail.com' },
      ]);
    });
  });

  describe('addTeamMember', () => {
    it('should make the request using the correct URL', async () => {
      mockPost.mockReturnValue({
        statusCode: 200,
      });

      await client.addTeamMember('test-team', 'member1');

      expect(mockPost).toHaveBeenCalledWith(
        'test.url/api/0/organizations/testorg/members/member1/teams/test-team/',
      );
    });

    it('should throw an error for statusCode < 200', async () => {
      mockPost.mockReturnValue({
        statusCode: 199,
      });

      await expect(
        client.addTeamMember('test-team', 'member1'),
      ).rejects.toThrow(
        'Expected 2xx status code adding member member1 to team test-team, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockPost.mockReturnValue({
        statusCode: 300,
      });

      await expect(
        client.addTeamMember('test-team', 'member1'),
      ).rejects.toThrow(
        'Expected 2xx status code adding member member1 to team test-team, but got 300',
      );
    });
  });

  describe('removeTeamMember', () => {
    it('should make the request using the correct URL', async () => {
      mockDelete.mockReturnValue({
        statusCode: 200,
      });

      await client.removeTeamMember('test-team', 'member1');

      expect(mockDelete).toHaveBeenCalledWith(
        'test.url/api/0/organizations/testorg/members/member1/teams/test-team/',
      );
    });

    it('should throw an error for statusCode < 200', async () => {
      mockDelete.mockReturnValue({
        statusCode: 199,
      });

      await expect(
        client.removeTeamMember('test-team', 'member1'),
      ).rejects.toThrow(
        'Expected 2xx status code removing member member1 from team test-team, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockDelete.mockReturnValue({
        statusCode: 300,
      });

      await expect(
        client.removeTeamMember('test-team', 'member1'),
      ).rejects.toThrow(
        'Expected 2xx status code removing member member1 from team test-team, but got 300',
      );
    });
  });

  describe('getMemberId', () => {
    it('should make the request using the correct URL when the member is not in the cache', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [{ id: 'member1', email: 'member1@gmail.com' }],
      });

      await client.getMemberId('member1@gmail.com');

      expect(mockGet).toHaveBeenCalledWith(
        'test.url/api/0/organizations/testorg/members/?query=member1%40gmail.com',
      );
    });

    it('should throw an error if more than 1 member comes back from the request', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [
          { id: 'member1', email: 'member1@gmail.com' },
          { id: 'member2', email: 'member2@gmail.com' },
        ],
      });

      await expect(client.getMemberId('member1@gmail.com')).rejects.toThrow(
        'Only expected to find one result in search for member1@gmail.com, but found 2',
      );
    });

    it('should return null if no members come back from the request', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [],
      });

      const result = await client.getMemberId('member1@gmail.com');

      expect(result).toBe(null);
    });

    it('should return the memberId if the request was successful', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [{ id: 'member1', email: 'member1@gmail.com' }],
      });

      const result = await client.getMemberId('member1@gmail.com');

      expect(result).toBe('member1');
    });

    it('should cache the memberId for subsequent calls', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [{ id: 'member1', email: 'member1@gmail.com' }],
      });

      const result = await client.getMemberId('member1@gmail.com');

      // Make another request, this should hit the cache
      const result2 = await client.getMemberId('member1@gmail.com');

      expect(result).toBe('member1');
      expect(result2).toBe('member1');

      // Only 1 network request as the second hit the cache
      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTeam', () => {
    it('should make the request using the correct URL and body', async () => {
      mockPost.mockReturnValue({
        statusCode: 200,
      });

      await client.createTeam('test-team');

      expect(mockPost).toHaveBeenCalledWith(
        'test.url/api/0/organizations/testorg/teams/',
        {
          body: { slug: 'test-team' },
        },
      );
    });

    it('should throw an error for statusCode < 200', async () => {
      mockPost.mockReturnValue({
        statusCode: 199,
      });

      await expect(client.createTeam('test-team')).rejects.toThrow(
        'Expected 2xx status code when creating team test-team but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockPost.mockReturnValue({
        statusCode: 300,
      });

      await expect(client.createTeam('test-team')).rejects.toThrow(
        'Expected 2xx status code when creating team test-team but got 300',
      );
    });
  });

  describe('setOwnershipRules', () => {
    it('should make the request using the correct URL and body', async () => {
      mockPut.mockReturnValue({
        statusCode: 200,
      });

      await client.setOwnershipRules(
        'web-trello',
        'path:./app/src/components/* #trello-frontend-platform',
      );

      expect(mockPut).toHaveBeenCalledWith(
        'test.url/api/0/projects/testorg/web-trello/ownership/',
        {
          body: {
            raw: 'path:./app/src/components/* #trello-frontend-platform',
          },
        },
      );
    });

    it('should throw an error for statusCode < 200', async () => {
      mockPut.mockReturnValue({
        statusCode: 199,
        body: 'bad response',
      });

      await expect(
        client.setOwnershipRules(
          'web-trello',
          'path:./app/src/components/* #trello-frontend-platform',
        ),
      ).rejects.toThrow(
        'Expected 2xx status code when updating ownership rules for web-trello, but got 199: "bad response"',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockPut.mockReturnValue({
        statusCode: 300,
        body: 'bad response',
      });

      await expect(
        client.setOwnershipRules(
          'web-trello',
          'path:./app/src/components/* #trello-frontend-platform',
        ),
      ).rejects.toThrow(
        'Expected 2xx status code when updating ownership rules for web-trello, but got 300: "bad response"',
      );
    });
  });

  describe('addTeamToProject', () => {
    it('should make the request using the correct URL', async () => {
      mockPost.mockReturnValue({
        statusCode: 200,
      });

      await client.addTeamToProject('web-trello', 'trello-frontend-platform');

      expect(mockPost).toHaveBeenCalledWith(
        'test.url/api/0/projects/testorg/web-trello/teams/trello-frontend-platform/',
      );
    });

    it('should throw an error for statusCode < 200', async () => {
      mockPost.mockReturnValue({
        statusCode: 199,
      });

      await expect(
        client.addTeamToProject('web-trello', 'trello-frontend-platform'),
      ).rejects.toThrow(
        'Expected 2xx status code when adding team trello-frontend-platform to web-trello, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockPost.mockReturnValue({
        statusCode: 300,
      });

      await expect(
        client.addTeamToProject('web-trello', 'trello-frontend-platform'),
      ).rejects.toThrow(
        'Expected 2xx status code when adding team trello-frontend-platform to web-trello, but got 300',
      );
    });
  });

  describe('getProjectTeams', () => {
    it('should make the request using the correct URL', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [{ id: 'team1', name: 'trello-frontend-platform' }],
      });

      await client.getProjectTeams('web-trello');

      expect(mockGet).toHaveBeenCalledWith(
        'test.url/api/0/projects/testorg/web-trello/teams/',
      );
    });

    it('should throw an error for statusCode < 200', async () => {
      mockGet.mockReturnValue({
        statusCode: 199,
      });

      await expect(client.getProjectTeams('web-trello')).rejects.toThrow(
        'Expected 2xx status code when getting teams for project web-trello, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockGet.mockReturnValue({
        statusCode: 300,
      });

      await expect(client.getProjectTeams('web-trello')).rejects.toThrow(
        'Expected 2xx status code when getting teams for project web-trello, but got 300',
      );
    });

    it('should return the team names when the request is successful', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: [
          { id: 'team1', name: 'trello-frontend-platform' },
          { id: 'team2', name: 'trello-data-eng' },
        ],
      });

      const result = await client.getProjectTeams('web-trello');

      expect(result).toEqual([
        { id: 'team1', name: 'trello-frontend-platform' },
        { id: 'team2', name: 'trello-data-eng' },
      ]);
    });
  });

  describe('deleteTeam', () => {
    it('should make the request using the correct URL', async () => {
      mockDelete.mockReturnValue({
        statusCode: 200,
      });

      await client.deleteTeam('trello-funnel-vision');

      expect(mockDelete).toHaveBeenCalledWith(
        'test.url/api/0/teams/testorg/trello-funnel-vision/',
      );
    });

    it('should throw an error for statusCode < 200', async () => {
      mockDelete.mockReturnValue({
        statusCode: 199,
      });

      await expect(client.deleteTeam('trello-funnel-vision')).rejects.toThrow(
        'Expected 2xx status code deleting team trello-funnel-vision, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockDelete.mockReturnValue({
        statusCode: 300,
      });

      await expect(client.deleteTeam('trello-funnel-vision')).rejects.toThrow(
        'Expected 2xx status code deleting team trello-funnel-vision, but got 300',
      );
    });
  });

  describe('getIssues', () => {
    it('should make the request using the correct URL and parse the response link header', async () => {
      mockGet.mockReturnValue({
        body: [{ id: 'issue1' }, { id: 'issue2' }],
        headers: {
          link:
            '<https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunassigned&cursor=1590161976541:0:1>; rel="previous"; results="false"; cursor="1590161976541:0:1", <https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunassigned&cursor=1590158121869:0:0>; rel="next"; results="true"; cursor="1590158121869:0:0"',
        },
      });

      const result = await client.getIssues('trello');

      expect(mockGet).toHaveBeenCalledWith(
        'test.url/api/0/projects/testorg/trello/issues/?query=is%3Aunassigned%20timesSeen%3A%3E5&cursor=',
      );
      expect(result.issues).toEqual([{ id: 'issue1' }, { id: 'issue2' }]);
      expect(result.hasMore).toBe(true);
      expect(result.nextCursor).toBe('1590158121869:0:0');
    });

    it('should throw an error for statusCode < 200', async () => {
      mockGet.mockReturnValue({
        statusCode: 199,
      });

      await expect(client.getIssues('trello')).rejects.toThrow(
        'Expected 2xx status code when getting issues for project trello, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockGet.mockReturnValue({
        statusCode: 300,
      });

      await expect(client.getIssues('trello')).rejects.toThrow(
        'Expected 2xx status code when getting issues for project trello, but got 300',
      );
    });
  });

  describe('getLatestEvent', () => {
    it('should make the request using the correct URL', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: { id: 'event1' },
      });

      const result = await client.getLatestEvent('issue1');

      expect(mockGet).toHaveBeenCalledWith(
        'test.url/api/0/issues/issue1/events/latest/',
      );
      expect(result).toEqual({ id: 'event1' });
    });

    it('should throw an error for statusCode < 200', async () => {
      mockGet.mockReturnValue({
        statusCode: 199,
      });

      await expect(client.getLatestEvent('issue1')).rejects.toThrow(
        'Expected 2xx status code when getting latest event for issue issue1, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockGet.mockReturnValue({
        statusCode: 300,
      });

      await expect(client.getLatestEvent('issue1')).rejects.toThrow(
        'Expected 2xx status code when getting latest event for issue issue1, but got 300',
      );
    });
  });

  describe('getSuggestedOwner', () => {
    it('should make the request using the correct URL', async () => {
      mockGet.mockReturnValue({
        statusCode: 200,
        body: {
          owners: [{ type: 'team', id: 'team1', name: 'trello-funnel-vision' }],
        },
      });

      const result = await client.getSuggestedOwner('trello', 'event1');

      expect(mockGet).toHaveBeenCalledWith(
        'test.url/api/0/projects/testorg/trello/events/event1/owners/',
      );
      expect(result).toEqual({
        type: 'team',
        id: 'team1',
        name: 'trello-funnel-vision',
      });
    });

    it('should throw an error for statusCode < 200', async () => {
      mockGet.mockReturnValue({
        statusCode: 199,
      });

      await expect(
        client.getSuggestedOwner('trello', 'event1'),
      ).rejects.toThrow(
        'Expected 2xx status code when getting owners for event event1, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockGet.mockReturnValue({
        statusCode: 300,
      });

      await expect(
        client.getSuggestedOwner('trello', 'event1'),
      ).rejects.toThrow(
        'Expected 2xx status code when getting owners for event event1, but got 300',
      );
    });
  });

  describe('assignIssueToTeam', () => {
    it('should make the request using the correct URL and body', async () => {
      mockPut.mockReturnValue({
        statusCode: 200,
      });

      await client.assignIssueToTeam('issue1', 'team1');

      expect(mockPut).toHaveBeenCalledWith('test.url/api/0/issues/issue1/', {
        body: {
          assignedTo: 'team:team1',
        },
      });
    });

    it('should throw an error for statusCode < 200', async () => {
      mockPut.mockReturnValue({
        statusCode: 199,
        body: 'bad response',
      });

      await expect(client.assignIssueToTeam('issue1', 'team1')).rejects.toThrow(
        'Expected 2xx status code when assigning issue issue1 to team team1, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockPut.mockReturnValue({
        statusCode: 300,
        body: 'bad response',
      });

      await expect(client.assignIssueToTeam('issue1', 'team1')).rejects.toThrow(
        'Expected 2xx status code when assigning issue issue1 to team team1, but got 300',
      );
    });
  });

  describe('getUnresolvedIssues', () => {
    it('should make the request using the correct URL and parse the response link header', async () => {
      mockGet.mockReturnValue({
        body: [{ id: 'issue1' }, { id: 'issue2' }],
        headers: {
          link:
            '<https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunresolved%20assigned%3A%23teamtaco1&cursor=1591900332:0:1>; rel="previous"; results="false"; cursor="1591900332:0:1", <https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunresolved%20assigned%3A%23teamtaco1&cursor=1591899044:0:0>; rel="next"; results="true"; cursor="1591899044:0:0"',
        },
      });

      const result = await client.getUnresolvedIssues('trello', 'teamtaco');

      expect(mockGet).toHaveBeenCalledWith(
        'test.url/api/0/projects/testorg/trello/issues/?query=is%3Aunresolved%20assigned%3A%23teamtaco&cursor=',
      );
      expect(result.issues).toEqual([{ id: 'issue1' }, { id: 'issue2' }]);
      expect(result.hasMore).toBe(true);
      expect(result.nextCursor).toBe('1591899044:0:0');
    });

    it('should throw an error for statusCode < 200', async () => {
      mockGet.mockReturnValue({
        statusCode: 199,
      });

      await expect(
        client.getUnresolvedIssues('trello', 'teamtaco'),
      ).rejects.toThrow(
        'Expected 2xx status code when getting issues for project trello, but got 199',
      );
    });

    it('should throw an error for statusCode >= 300', async () => {
      mockGet.mockReturnValue({
        statusCode: 300,
      });

      await expect(
        client.getUnresolvedIssues('trello', 'teamtaco'),
      ).rejects.toThrow(
        'Expected 2xx status code when getting issues for project trello, but got 300',
      );
    });
  });

  describe('getIssueCountForTeam', () => {
    it('should return the number of unassigned issues for the specified team name', async () => {
      mockGet.mockReturnValue({
        body: [{ id: 'issue1' }, { id: 'issue2' }],
        headers: {
          // manually set "results" to false so that we don't get stuck in a infinite loop with `hasMore`
          link:
            '<https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunresolved%20assigned%3A%23teamtaco1&cursor=1591900332:0:1>; rel="previous"; results="false"; cursor="1591900332:0:1", <https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunresolved%20assigned%3A%23teamtaco1&cursor=1591899044:0:0>; rel="next"; results="false"; cursor="1591899044:0:0"',
        },
      });
      const result = await client.getIssueCountForTeam('trello', 'teamtaco');
      expect(result).toEqual(2);
    });

    it('should return 0 if there are no issues for the specified team name', async () => {
      mockGet.mockReturnValue({
        body: [],
        headers: {
          // manually set "results" to false so that we don't get stuck in a infinite loop with `hasMore`
          link:
            '<https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunresolved%20assigned%3A%23teamtaco1&cursor=1591900332:0:1>; rel="previous"; results="false"; cursor="1591900332:0:1", <https://sentry.prod.atl-paas.net/api/0/projects/atlassian/trello-web/issues/?query=is%3Aunresolved%20assigned%3A%23teamtaco1&cursor=1591899044:0:0>; rel="next"; results="false"; cursor="1591899044:0:0"',
        },
      });
      const result = await client.getIssueCountForTeam('trello', 'teamtaco');
      expect(result).toEqual(0);
    });
  });
});
