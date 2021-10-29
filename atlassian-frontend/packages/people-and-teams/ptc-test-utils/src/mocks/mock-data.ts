import { mapToInvitedUser } from './test-helpers';

// These mock data are used by other packages like @atlassian/people-* packages to run unit test and visual-regression tests.
// If you change value of this mock data, you might want to update snapshot of visual-regression tests and unit test as well.

export const testIconUrl =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iYmFja2dyb3VuZDojZmZmIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMEM3RTYiIGQ9Ik0wIDBoMTI4djEyOEgweiIvPjxwYXRoIGQ9Ik00MC4yODIgMTA5LjY2MmgtMi4xMTlhMy4xOTYgMy4xOTYgMCAwIDEtMy4xODYtMy4xODZWOTMuOTI4YTMuMTk2IDMuMTk2IDAgMCAxIDMuMTg2LTMuMTg2aDIuMTE5YTMuMTk2IDMuMTk2IDAgMCAxIDMuMTg2IDMuMTg2djEyLjU0OGEzLjE5NiAzLjE5NiAwIDAgMS0zLjE4NiAzLjE4NnpNODkuMDMyIDEwOS42NjJoLTIuMTE5YTMuMTk2IDMuMTk2IDAgMCAxLTMuMTg2LTMuMTg2VjkzLjkyOGEzLjE5NiAzLjE5NiAwIDAgMSAzLjE4Ni0zLjE4NmgyLjExOWEzLjE5NiAzLjE5NiAwIDAgMSAzLjE4NiAzLjE4NnYxMi41NDhhMy4xOTYgMy4xOTYgMCAwIDEtMy4xODYgMy4xODZ6IiBmaWxsPSIjNTI0M0FBIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48ZWxsaXBzZSBmaWxsPSIjNjU1NUMwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGN4PSI2My44NDIiIGN5PSI3NC43MDQiIHJ4PSI0My42MjIiIHJ5PSIzMC4wMTMiLz48ZWxsaXBzZSBmaWxsPSIjODc3N0Q5IiBmaWxsLXJ1bGU9Im5vbnplcm8iIGN4PSI2My45NjQiIGN5PSI2Ny42NTciIHJ4PSI1MC4zMDUiIHJ5PSIzMC4wMTMiLz48cGF0aCBkPSJNOTQuNzYyIDQ4LjU3OGMuMDM5LS42MjIuMDY1LTEuMjUzLjA2NS0xLjkwMSAwLTE3LjI0Ny0xMy45ODEtMzEuMjI4LTMxLjIyOC0zMS4yMjgtMTYuOTA1IDAtMzAuNjYzIDEzLjQzNS0zMS4yMDIgMzAuMjA4aC0uMDI2djguMjY4aC4wMjJjLjI2NiA5LjcxMSA1LjA2MiAxNi40NDEgMTIuMzc2IDIwLjM2NmwzNy42NjUuMDAyYzcuNTI5LTQuMDM3IDEyLjM5My0xMS4wNDQgMTIuMzkzLTIxLjIxNyAwLS42NDgtLjAyNi0xLjI5LS4wNjUtMS45Mjh2LTIuNTd6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNMzIuNDc3IDQ0LjI1OGMtLjAzNi40NjQtLjA2NS45My0uMDggMS4zOTloLS4wMjZ2OC4yNjhoLjAyMmMuNDU2IDE2LjY2MSAxNC4yNDcgMjQuNTQ3IDMxLjIwNiAyNC41NDcgMTcuMjQ3IDAgMzEuMjI4LTguMTQ5IDMxLjIyOC0yNS4zOTUgMC0uNjQ4LS4wMjYtMS4yOS0uMDY1LTEuOTI4di0yLjU3Yy4wMzktLjYyMi4wNjUtMS4yNTMuMDY1LTEuOTAxIDAtLjkzNS0uMDQ5LTEuODU4LS4xMjktMi43NzEtOC41MDEtMy45MjEtMTkuMTU3LTYuMjYxLTMwLjczNC02LjI2MS0xMS45MjItLjAwMi0yMi44NjcgMi40NzctMzEuNDg3IDYuNjEyeiIgZmlsbD0iIzdGNENCRiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIuMTUiLz48cGF0aCBkPSJNNjMuNTk5IDI4LjI1M2MtMTAuMzU5IDAtMTguODM0IDguNDc1LTE4LjgzNCAxOC44MzRWNzQuMjg5YzUuMjM2IDIuODA4IDExLjc1OSA0LjE4MiAxOC44MzQgNC4xODIgNy4wNzUgMCAxMy41OTgtMS4zNzQgMTguODM0LTQuMTgyVjQ3LjA4N2MwLTEwLjM1OS04LjQ3NS0xOC44MzQtMTguODM0LTE4LjgzNHoiIGZpbGw9IiMwMEM3RTYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxjaXJjbGUgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBjeD0iNjMuODYiIGN5PSI1MC43MzUiIHI9IjExLjEzOSIvPjxjaXJjbGUgZmlsbD0iIzQwMzI5NCIgZmlsbC1ydWxlPSJub256ZXJvIiBjeD0iNjMuNDcyIiBjeT0iNTAuNjA4IiByPSI0LjQxOCIvPjwvZz48L3N2Zz4=';

export const testTeamData = {
  permission: 'FULL_WRITE',
  id: '76bec70a-8768-4b2b-b28f-6dfff8538f89',
  displayName: 'test team',
  description: '',
  state: 'ACTIVE',
  membershipSettings: 'OPEN',
  discoverable: 'DISCOVERABLE',
  organizationId: '3f97e0d7-a8ca-4263-91bf-3015999c8e64',
  restriction: 'NO_RESTRICTION',
  creatorId: '655363:a5b38060-4fc7-4485-a6ee-ef213480027b',
  creatorDomain:
    'c6080332a525e35ccd7b699a80a128e49a0acce5009e275bfdbc4ad53814eb2b',
  headerImageId: null,
};

export const genTestTeamData = (
  overrideTeamData: Record<string, string | number | undefined> = {},
) => {
  // delete undefined values
  Object.keys(overrideTeamData).forEach((key) => {
    if (overrideTeamData[key] === undefined) {
      delete overrideTeamData[key];
    }
  });

  return {
    ...testTeamData,
    ...overrideTeamData,
  };
};

export const testMembershipData = [
  {
    membershipId: {
      teamId: '76bec70a-8768-4b2b-b28f-6dfff8538f89',
      memberId: '5aa8a33835e5a02a84dea083',
    },
    state: 'FULL_MEMBER',
    role: 'REGULAR',
  },
];

export const testCollaboratorsData = {
  collaborationGraphEntities: [
    {
      entityType: 'USER',
      id: '655363:4c5fe2c9-5a86-48c9-945d-7b07872e320f',
      userProfile: {
        account_id: '655363:4c5fe2c9-5a86-48c9-945d-7b07872e320f',
        email: 'hq@abc.com',
        name: 'Hieu Q',
        picture:
          'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/5.svg',
        account_status: 'active',
        nickname: 'Hieu Q',
        locale: 'en-US',
        account_type: 'atlassian',
        extended_profile: {
          job_title: 'Designer',
          organization: 'Atlassian',
          department: null,
          location: 'San Francisco, United States',
        },
      },
      score: 0.225,
    },
    {
      entityType: 'USER',
      id: '5caad7a510e4f967c3024ad3',
      userProfile: {
        account_id: '5caad7a510e4f967c3024ad3',
        email: null,
        name: 'Jeremy Team Mention Test',
        picture:
          'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/4.svg',
        account_status: 'active',
        nickname: 'Jeremy Team Mention Test',
        locale: 'en-GB',
        account_type: 'atlassian',
        extended_profile: {
          job_title: null,
          organization: null,
          department: null,
          location: null,
        },
      },
      score: 0.075,
    },
    {
      entityType: 'USER',
      id: '557057:2bce73f1-69c6-4520-8c27-54b7b649f63c',
      userProfile: {
        account_id: '557057:2bce73f1-69c6-4520-8c27-54b7b649f63c',
        email: 'ccu@abc.com',
        name: 'Caterina Cu',
        picture:
          'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/3.svg',
        account_status: 'active',
        nickname: 'Caterina Curti',
        locale: 'en-US',
        account_type: 'atlassian',
        extended_profile: {
          job_title: null,
          organization: null,
          department: 'CSS',
          location: 'L2 341, Sydney',
        },
      },
      score: 2.4770000000000003,
    },
    {
      entityType: 'USER',
      id: '557057:d2fe4234-9c00-4cfd-958e-3b1ded09d649',
      userProfile: {
        account_id: '557057:d2fe4234-9c00-4cfd-958e-3b1ded09d649',
        email: 'je@abc.com',
        name: 'Jeremy E',
        picture:
          'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/2.svg',
        account_status: 'active',
        nickname: 'Jeremy E',
        locale: 'en-US',
        account_type: 'atlassian',
        extended_profile: {
          job_title: 'Enthusiastic Button Masher',
          organization: 'Atlassian',
          department: null,
          location: null,
        },
      },
      score: 1.8259999999999998,
    },
    {
      entityType: 'USER',
      id: '557057:5451f351-63b7-47ab-bd89-859dc747829c',
      userProfile: {
        account_id: '557057:5451f351-63b7-47ab-bd89-859dc747829c',
        email: 'os@abc.com',
        name: 'Oliver S',
        picture:
          'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/1.svg',
        account_status: 'active',
        nickname: 'Oliver',
        locale: 'en',
        account_type: 'atlassian',
        extended_profile: {
          job_title: 'Engineering Manager, TWP Team team',
          organization: 'Atlassian',
          department: 'Teamwork Platform',
          location: 'Sydney',
        },
      },
      score: 1.788,
    },
    {
      entityType: 'USER',
      id: '5d8c878f8189fd0dc3ea5021',
      userProfile: {
        account_id: '5d8c878f8189fd0dc3ea5021',
        email: 'ig@abc.com',
        name: 'Iris G',
        picture:
          'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/0.svg',
        account_status: 'active',
        nickname: 'Iris',
        locale: 'en-GB',
        account_type: 'atlassian',
        extended_profile: {
          job_title: 'Software Engineer',
          organization: 'Atlassian',
          department: 'Engineering',
          location: 'Sydney, Australia',
        },
      },
      score: 1.1260000000000001,
    },
  ],
};

export const testMyTeamsData = {
  cursor: '',
  entities: [
    {
      teamAri: '03910ac3-dd09-4429-a9fb-7704037f8e92',
      displayName: 'Team Links Blitz',
      smallHeaderImageUrl: testIconUrl,
    },
    {
      teamAri: '08b1465c-e040-4186-af09-9e8b5e8d4ee2',
      displayName: 'test team 2020/04/03',
      smallHeaderImageUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/0.svg',
    },
    {
      teamAri: '0afeb18b-db38-4396-acab-9faf8e633508',
      displayName: 'test team 1',
      smallHeaderImageUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/0.svg',
    },
    {
      teamAri: '1a8657ed-04e8-446a-8501-3aeac0303340',
      displayName: 'test team name2',
    },
    {
      teamAri: '4d056dda-11ac-4991-a6d9-1b6952bfed51',
      displayName: 'Team Timezone',
      smallHeaderImageUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/6.svg',
    },
    {
      teamAri: '5d6de200-8684-4425-a693-49dc827e186d',
      displayName: 'test team 2',
      smallHeaderImageUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/6.svg',
    },
    {
      teamAri: '63a47c21-9466-4da1-88a0-e159a0a2b1b8',
      displayName: 'Team Blitz',
      smallHeaderImageUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/4.svg',
    },
    {
      teamAri: '6c9ef618-0c62-4a92-b5c7-93078891854a',
      displayName: 'Revoke invite test team',
      smallHeaderImageUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/2.svg',
    },
  ],
};

export const testRecommendationsData = {
  recommendedUsers: [
    {
      entityType: 'USER',
      id: '557057:2bce73f1-69c6-4520-8c27-54b7b649f63c',
      name: 'Caterina C',
      email: 'caterinac@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/1.svg',
      nickname: 'Caterina',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '557057:5451f351-63b7-47ab-bd89-859dc747829c',
      name: 'Oliver S',
      email: 'olivers@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/0.svg',
      nickname: 'Oliver',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '5d8c878f8189fd0dc3ea5021',
      name: 'Iris E',
      email: 'irise@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/1.svg',
      nickname: 'Iris E',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      locale: 'en-GB',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '557058:021cc8e5-fd4d-41d6-bfeb-b1bb722f368d',
      name: 'Cloud Features',
      email: 'releng-fd-bot@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/2.svg',
      nickname: 'Cloud Features',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '5dd4fa7b1173880eebe52c17',
      name: 'David S',
      email: 'davidss@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/3.svg',
      nickname: 'David S',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      locale: 'en-GB',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '557057:d2fe4234-9c00-4cfd-958e-3b1ded09d649',
      name: 'Jeremy E',
      email: 'jeremye@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/4.svg',
      nickname: 'Jeremy E',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '5c07249f2c86c94ac7c759e2',
      name: 'micros-changes-bot',
      email: 'micros-changes-bot@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/5.svg',
      nickname: 'micros-changes-bot',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '557057:c85d1300-b349-4905-84e1-ef247b3ea7e6',
      name: 'Patrick S',
      email: 'patrics@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/6.svg',
      nickname: 'Patrick S',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '5e43ce2a08e2a40c9383e9f4',
      name: 'Zachary Ng',
      email: 'zacharyng@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/0.svg',
      nickname: 'Zachary Ng',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '557057:4e9c26be-e5a1-4861-b0b6-c4dc680ac5f6',
      name: 'Abhi K',
      email: 'abhik@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/1.svg',
      nickname: 'bhi',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Melbourne',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '5d7a02733362320d26a16cdc',
      name: 'Anish D',
      email: 'anishd@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/2.svg',
      nickname: 'Anish D',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      locale: 'en-GB',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '557057:64fea9cd-cac4-484c-afe6-a2391323fd7b',
      name: 'Diego B',
      email: 'diegob@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/3.svg',
      nickname: 'Diego B',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '557057:711ade1d-30f7-4568-b36b-844f96bf90d8',
      name: 'Sergey M',
      email: 'sergeym@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/4.svg',
      nickname: 'Sergey M',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '5bf4af2f628def151b4fc14e',
      name: 'Nicholas H',
      email: 'nickh@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/5.svg',
      nickname: 'nhiebl',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'America/Sao_Paulo',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
    {
      entityType: 'USER',
      id: '5c4907924c070827c2a1d0cd',
      name: 'Dave W',
      email: 'davew@abc.com',
      avatarUrl:
        'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/gradients/6.svg',
      nickname: 'Dave W',
      matchPositions: {},
      accessLevel: 'APPLICATION',
      accountStatus: 'ACTIVE',
      notMentionable: false,
      zoneInfo: 'Australia/Sydney',
      locale: 'en-US',
      userType: 'DEFAULT',
    },
  ],
  errors: [],
};

export const testProposedMembersData = [
  mapToInvitedUser(testRecommendationsData.recommendedUsers[0]),
  mapToInvitedUser(testRecommendationsData.recommendedUsers[1]),
];
