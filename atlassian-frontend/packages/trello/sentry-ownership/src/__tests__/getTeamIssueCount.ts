import bunyan from 'bunyan';
import { logger } from '../logger';
import { SentryApiClient } from '../SentryApiClient';
import { getTeamIssueCount } from '../getTeamIssueCount';

jest.mock('../SentryApiClient', () => {
  const { defaults } = require('requestretry');
  return {
    SentryApiClient: jest.fn().mockImplementation(() => {
      return {
        rateLimitingDelay: 0,
        memberLookupCache: new Map(),
        sentryUrl: 'some-url',
        sentryOrg: 'some-org',
        sentryRequest: defaults({}),
        getTeamMembers: jest.fn(),
        addTeamMember: jest.fn(),
        removeTeamMember: jest.fn(),
        getMemberId: jest.fn(),
        createTeam: jest.fn(),
        setOwnershipRules: jest.fn(),
        addTeamToProject: jest.fn(),
        getProjectTeams: jest.fn(),
        deleteTeam: jest.fn(),
        assignIssueToTeam: jest.fn(),
        assignSuggestedOwnerToIssue: jest.fn(),
        getLatestEvent: jest.fn(),
        getSuggestedOwner: jest.fn(),
        getIssues: jest.fn(),
        getUnresolvedIssues: jest.fn(),
        getIssueCountForTeam: jest
          .fn()
          .mockResolvedValue(null)
          .mockResolvedValueOnce(5)
          .mockResolvedValueOnce(10)
          .mockResolvedValueOnce(15),
      };
    }),
  };
});
const teamsDefinition = {
  'my-existing-team': {
    contributors: ['tlockheart'],
    'directly-responsible-individual': 'squareenix',
    slack: 'ff-vii',
    project: 'https://beep.boop',
  },
  'my-team': {
    contributors: ['bwallace', 'cstrife'],
    'directly-responsible-individual': 'squareenix',
    slack: 'ff-vii',
    project: 'https://beep.boop',
  },
  'my-blitzball-team': {
    contributors: ['tidus'],
    'directly-responsible-individual': 'squareenix',
    slack: 'ff-x',
    project: 'https://beep.boop',
  },
};

describe('getTeamIssueCount', () => {
  beforeAll(() => {
    // Don't log info stuff during test runs
    logger.level(bunyan.FATAL + 1);
  });

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (SentryApiClient as jest.MockedClass<typeof SentryApiClient>).mockClear();
  });

  it('should fetch unresolved issues for each team', async () => {
    const teamIssueCount = await getTeamIssueCount({
      sentryUrl: 'test.url',
      sentryOrg: 'estorg',
      sentryAuthToken: 'abc123',
      projectName: 'trello-web',
      teamsDefinition,
    });
    expect(SentryApiClient).toHaveBeenCalled();

    expect(teamIssueCount).toEqual({
      'my-existing-team': 5,
      'my-team': 10,
      'my-blitzball-team': 15,
    });
  });
});
