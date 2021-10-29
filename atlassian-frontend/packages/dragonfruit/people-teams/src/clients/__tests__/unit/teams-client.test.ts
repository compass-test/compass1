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
    } = require('../../../../src/clients/team-client');

    // action
    await postInviteTeamMembers(testTeamId, selectedUsers, originQuery);

    // assert
    expect(mockPostJson).toHaveBeenCalledWith(
      buildInviteTeamMembersUrl(testTeamId, originQuery),
      {
        emailAddresses: ['newEmail@example.com', 'normalUser@example.com'],
        atlassianAccounts: ['hiddenUser'],
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
    } = require('../../../../src/clients/team-client');

    // action
    await postInviteTeamMembers(testTeamId, selectedUsers, originQuery);

    // assert
    expect(mockPostJson).toHaveBeenCalledWith(
      buildInviteTeamMembersUrl(testTeamId, originQuery),
      {
        emailAddresses: ['newEmail@example.com', 'normalUser@example.com'],
        atlassianAccounts: ['hiddenUser'],
      },
    );
  });
});

describe('create team', () => {
  it('should create team with correct options', async () => {
    const {
      postCreateTeam,
      buildTeamCreateUrl,
    } = require('../../../../src/clients/team-client');

    // action
    await postCreateTeam(testTeamName, originQuery);

    // assert
    expect(mockPostJson).toHaveBeenCalledWith(buildTeamCreateUrl(originQuery), {
      displayName: testTeamName,
      description: '',
      state: TeamState.ACTIVE,
      membershipSettings: TeamMembershipSettings.OPEN,
      discoverable: TeamDiscoverability.DISCOVERABLE,
      restriction: TeamRestriction.NO_RESTRICTION,
    });
  });
});
