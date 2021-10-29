import fetchMock from 'fetch-mock/cjs/client';

import {
  BULK_INVITE_URL,
  DEFAULT_STARGATE_SERVICE_URL,
  INVITE_CAPABILITIES,
  MOCK_CURRENT_CLOUD_ID,
  OPEN_INVITE_URL,
  DIRECT_ACCESS_URL,
  createMockInviteServer,
  InviteFixtureData,
  InviteResponseMode,
  mockResourceAri,
} from './mockInviteServer';

const inviteApiMockMatcher = DEFAULT_STARGATE_SERVICE_URL + BULK_INVITE_URL;
const inviteCapabilitiesApiMockMatcher = `${DEFAULT_STARGATE_SERVICE_URL}${INVITE_CAPABILITIES}?resource=${mockResourceAri}`;

export const mockInviteCapabilitiesResponse = (
  inviteFixture: InviteFixtureData,
) => {
  fetchMock.get({
    overwriteRoutes: true,
    matcher: inviteCapabilitiesApiMockMatcher,
    delay: 1000,
    response: (url: string, req: Request) =>
      createMockInviteServer(inviteFixture).getInviteCapabilities(url, req),
  });
};

export const mockInviteResponse = (
  inviteCapabilities: InviteFixtureData,
  result: InviteResponseMode,
) => {
  if (result === 'use-capabilities') {
    mockInviteResponseFromCapabilities(inviteCapabilities);
  } else if (result === 'general-error') {
    mockInviteFailureResponse();
  }
};

export const mockInviteResponseFromCapabilities = (
  inviteCapabilities: InviteFixtureData,
) => {
  fetchMock.post({
    overwriteRoutes: true,
    matcher: inviteApiMockMatcher,
    response: (url: string, request: Request) =>
      createMockInviteServer(inviteCapabilities).inviteUsingCapabilities(
        url,
        request,
      ),
    name: 'bulk-invite',
  });
};

export const mockInviteFailureResponse = () => {
  fetchMock.post({
    overwriteRoutes: true,
    matcher: inviteApiMockMatcher,
    response: (url: string, request: Request) =>
      createMockInviteServer().failInviting(url, request),
    name: 'bulk-invite',
  });
};

export const mockGetDirectAccessSetting = (product: string) => {
  fetchMock.get({
    overwriteRoutes: true,
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
    response: {
      status: 200,
      body: {
        domain: 'atlassian.com',
        desPromotionEligible: 'true',
        role: `ari:cloud:${product}::role/product/member`,
      },
    },
    name: 'get-direct-access-setting',
    query: {
      setting: 'DIRECT_ACCESS',
    },
  });
};

export const mockGetOpenInviteSetting = (product: string) => {
  fetchMock.get({
    overwriteRoutes: true,
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=ari:cloud:${product}::site/${MOCK_CURRENT_CLOUD_ID}`,
    response: {
      status: 200,
      body: {
        mode: 'REQUEST_ACCESS',
      },
    },
  });
};

export const mockPutOpenInviteSetting = () => {
  fetchMock.put({
    overwriteRoutes: true,
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}`,
    response: {
      status: 200,
      body: {
        mode: 'REQUEST_ACCESS',
      },
    },
  });
};

export const mockPostDirectAccessSetting = () => {
  fetchMock.post({
    overwriteRoutes: true,
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
    response: {
      status: 204,
    },
    name: 'update-direct-access-setting',
  });
};

export function mockViralSettings() {
  mockGetDirectAccessSetting('confluence');
  mockGetOpenInviteSetting('confluence');
  mockPutOpenInviteSetting();
  mockPostDirectAccessSetting();
}
