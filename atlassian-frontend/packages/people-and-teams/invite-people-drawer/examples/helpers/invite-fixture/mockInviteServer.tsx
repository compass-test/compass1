const log = (...args: Parameters<typeof console.log>) => console.log(...args);

export const DEFAULT_STARGATE_SERVICE_URL = '/gateway/api';
export const BULK_INVITE_URL = '/invitations/invite';
export const INVITE_CAPABILITIES = '/invitations/capabilities';
export const OPEN_INVITE_URL = '/invitations/v1/settings/open-invite';
export const DIRECT_ACCESS_URL =
  '/invitations/v1/settings/domain-enabled-signup-promotion';

export const productIds = [
  'confluence',
  'jira-software',
  'jira-servicedesk',
  'jira-core',
  'jira-incident-manager',
  'jira',
  'opsgenie',
  'statuspage',
  'trello',
  'bitbucket',
] as const;
export type ProductId = typeof productIds[number];

export type InviteCapability =
  | 'directInvite'
  | 'invitePendingApproval'
  | 'none';

export type InviteResult = 'INVITED' | 'INVITED_PENDING_APPROVAL' | 'ERROR';

export type InviteFixtureForResource = {
  productId: ProductId;
  ari: string;
  capability: InviteCapability;
  result: InviteResult;
};
export type InviteFixtureData = InviteFixtureForResource[];

type InviteRequestBody = {
  users: {
    email: string;
  }[];
  resources: string[];
  continueUrl: string;
  suppressInviteEmail: boolean;
};

export type Invitation = {
  id: string;
  email: string;
  results: { [ari: string]: InviteResult };
  errorReasons?: {
    [ari: string]: {
      code: string;
      message: string;
    };
  };
};

export type InviteResponseMode = 'use-capabilities' | 'general-error';

export const createMockInviteServer = (fixture: InviteFixtureData = []) => {
  let inviteFixture = fixture;

  const mockFixture = (fixture: InviteFixtureData) => {
    inviteFixture = fixture;
  };

  const getInviteCapabilities = (url: string, request: Request) => {
    log('Mock Invite Capabilities: request', request);
    const response = {
      directInvite: {
        mode: 'DOMAIN_RESTRICTED',
        domains: ['some.domain.com', 'another.domain.com'],
        permittedResources: resourcesWith(inviteFixture, 'directInvite'),
      },
      invitePendingApproval: {
        mode: 'ANYONE',
        permittedResources: resourcesWith(
          inviteFixture,
          'invitePendingApproval',
        ),
      },
    };
    log('Mock Invite Capabilities: response', response);
    return response;
  };

  const inviteUsingCapabilities = (url: string, request: Request) => {
    const parsedRequestBody = JSON.parse(
      String(request.body),
    ) as InviteRequestBody;
    log('Mock Invite: request', { ...request, body: parsedRequestBody });
    const response = {
      body: parsedRequestBody.users.map((user, index) =>
        getResultForUser(
          {
            id: `user-${index + 1}`,
            email: user.email,
          },
          parsedRequestBody.resources,
        ),
      ),
    };
    log('Mock Invite: response', response);
    return response;
  };

  const failInviting = (url: string, request: Request) => {
    const parsedRequestBody = JSON.parse(
      String(request.body),
    ) as InviteRequestBody;
    log('Mock Invite: request', { ...request, body: parsedRequestBody });
    const response = {
      body: {
        code: 'licence-exceeded',
        message:
          'Licence Exceeded for resources:[ari:cloud:jira-software::site/test-cloud-id]',
      },
      status: 400,
    };
    log('Mock Invite: response', response);
    return response;
  };

  const getResultByAri = (ari: string) => {
    const resourceCapability = inviteFixture.find((f) => f.ari === ari);
    return resourceCapability?.result;
  };

  const getResultForUser = (
    { id, email }: { id: string; email: string },
    resources: InviteRequestBody['resources'],
  ) => {
    const invitation: Invitation = {
      id,
      email: email,
      results: {},
    };
    for (const ari of resources) {
      let mockResourceResult = getResultByAri(ari);
      let error: string | null = null;
      if (email.includes('error')) {
        error = 'mock user error';
        mockResourceResult = 'ERROR';
      } else if (mockResourceResult === 'ERROR') {
        error = 'mock resource error';
      } else if (!mockResourceResult) {
        error = `no mock response for ARI ${ari}`;
        mockResourceResult = 'ERROR';
      }
      invitation.results = {
        ...invitation.results,
        [ari]: mockResourceResult,
      };
      if (error) {
        invitation.errorReasons = {
          ...invitation.errorReasons,
          [ari]: {
            code: 'bad-request',
            message: error,
          },
        };
      }
    }
    return invitation;
  };
  return {
    mockFixture,
    getInviteCapabilities,
    inviteUsingCapabilities,
    failInviting,
  };
};

export const MOCK_CURRENT_CLOUD_ID = `5e982da0-ca43-4e91-b5ba-6fdadf1df292`;
export const toCurrentAri = (product: ProductId) =>
  `ari:cloud:${product}::site/${MOCK_CURRENT_CLOUD_ID}`;

export const mockResourceAri = `ari:cloud:platform::site/${MOCK_CURRENT_CLOUD_ID}`;

export const mergeInviteFixture = (
  original: InviteFixtureData,
  overrides: InviteFixtureData,
) => {
  const merged = [...original];
  for (const override of overrides) {
    const mergedIndex = merged.findIndex((m) => m.ari === override.ari);
    if (mergedIndex >= 0) {
      merged[mergedIndex] = override;
    } else {
      merged.push(override);
    }
  }
  return merged;
};

export const mockRequestAccess = (
  productId: ProductId,
): InviteFixtureForResource => ({
  productId,
  ari: toCurrentAri(productId),
  capability: 'invitePendingApproval' as const,
  result: 'INVITED_PENDING_APPROVAL' as const,
});

export const mockInvite = (productId: ProductId): InviteFixtureForResource => ({
  productId,
  ari: toCurrentAri(productId),
  capability: 'directInvite' as const,
  result: 'INVITED' as const,
});

export const mockInviteError = (
  productId: ProductId,
): InviteFixtureForResource => ({
  productId,
  ari: toCurrentAri(productId),
  capability: 'directInvite' as const,
  result: 'ERROR' as const,
});

export const getInviteFixtureForAllProducts = (
  overrides: InviteFixtureData = [],
) =>
  mergeInviteFixture(
    productIds.map((productId) => ({
      productId,
      ari: toCurrentAri(productId),
      capability: 'none',
      result: 'ERROR',
    })),
    overrides,
  );

export const getDefaultInviteFixtureForAllProducts = () =>
  getInviteFixtureForAllProducts([
    mockInvite('confluence'),
    mockInvite('jira-software'),
  ]);

const resourcesWith = (
  fixture: InviteFixtureData,
  desiredCapability: InviteCapability,
): string[] =>
  fixture.filter((f) => f.capability === desiredCapability).map((f) => f.ari);
