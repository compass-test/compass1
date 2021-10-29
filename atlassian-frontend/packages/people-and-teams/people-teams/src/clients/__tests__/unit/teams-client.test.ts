import { testMembershipData } from '@atlassian/ptc-test-utils';

import {
  TeamDiscoverability,
  TeamMembershipSettings,
  TeamRestriction,
  TeamState,
} from '../../../types/team';

const testTeamId = 'someTeamId';
const testTeamName = 'awesome-team';
const selectedUsers = [
  {
    id: null,
    email: 'newEmail@example.com',
  },
  {
    id: 'hiddenUser',
    email: null,
  },
  {
    id: 'normalUser',
    email: 'normalUser@example.com',
  },
];

const originQuery = {
  cloudId: 'test-<cloud>-"id"',
  product: 'confluence',
};

let mockPostJson: () => void;

beforeEach(() => {
  mockPostJson = jest.fn(() => Promise.resolve(testMembershipData));

  jest.doMock('../../../utils/fetch', () => {
    return {
      ...jest.requireActual<Object>('../../../utils/fetch'),
      postJson: mockPostJson,
    };
  });
});

afterEach(() => {
  jest.resetModules();
});

describe('invite team member', () => {
  it('should split user objects into emails and aaIds', async () => {
    const {
      postInviteTeamMembers,
      buildInviteTeamMembersUrl,
    } = require('../../team-client');

    // action
    await postInviteTeamMembers(testTeamId, selectedUsers, originQuery);

    // assert
    expect(mockPostJson).toHaveBeenCalledWith(
      buildInviteTeamMembersUrl(testTeamId, originQuery),
      {
        emailAddresses: ['newEmail@example.com'],
        atlassianAccounts: ['hiddenUser', 'normalUser'],
      },
    );
  });

  it('should not send origin.product query if it is not defined ', async () => {
    // mock
    const originQuery = {
      cloudId: 'test-cloud-id',
    };
    const {
      postInviteTeamMembers,
      buildInviteTeamMembersUrl,
    } = require('../../team-client');

    // action
    await postInviteTeamMembers(testTeamId, selectedUsers, originQuery);

    // assert
    expect(mockPostJson).toHaveBeenCalledWith(
      buildInviteTeamMembersUrl(testTeamId, originQuery),
      {
        emailAddresses: ['newEmail@example.com'],
        atlassianAccounts: ['hiddenUser', 'normalUser'],
      },
    );
  });

  it('should call V3 endpoint if orgId is sent ', async () => {
    // mock
    const originQuery = {
      cloudId: 'test-cloud-id',
      orgId: 'test-org-id',
    };
    const {
      postInviteTeamMembers,
      buildInviteTeamMembersUrl,
      STARGATE_ENDPOINT_TEAMS_V3,
    } = require('../../team-client');

    const url = buildInviteTeamMembersUrl(testTeamId, originQuery);

    // action
    await postInviteTeamMembers(testTeamId, selectedUsers, originQuery);

    // assert
    expect(url).toContain(STARGATE_ENDPOINT_TEAMS_V3);
    expect(mockPostJson).toHaveBeenCalledWith(url, {
      emailAddresses: ['newEmail@example.com'],
      atlassianAccounts: ['hiddenUser', 'normalUser'],
    });
  });
});

describe('create team', () => {
  const expectTeam = {
    displayName: testTeamName,
    description: '',
    state: TeamState.ACTIVE,
    membershipSettings: TeamMembershipSettings.OPEN,
    discoverable: TeamDiscoverability.DISCOVERABLE,
    restriction: TeamRestriction.NO_RESTRICTION,
  };

  it('should create team with correct options', async () => {
    const { postCreateTeam, buildTeamCreateUrl } = require('../../team-client');

    // action
    await postCreateTeam(testTeamName, originQuery);

    // assert
    expect(mockPostJson).toHaveBeenCalledWith(
      buildTeamCreateUrl(originQuery),
      expectTeam,
    );
  });

  it('should create team with orgId and call Legion V3 endpoint', async () => {
    const {
      postCreateTeam,
      buildTeamCreateUrl,
      STARGATE_ENDPOINT_TEAMS_V3,
    } = require('../../team-client');

    const optionsQuery = {
      ...originQuery,
      orgId: 'test-org-id',
    };

    await postCreateTeam(testTeamName, optionsQuery);
    const url = buildTeamCreateUrl(optionsQuery);

    // assert
    expect(url).toContain(STARGATE_ENDPOINT_TEAMS_V3);
    expect(mockPostJson).toHaveBeenCalledWith(url, {
      ...expectTeam,
      organizationId: 'test-org-id',
    });
  });
});
