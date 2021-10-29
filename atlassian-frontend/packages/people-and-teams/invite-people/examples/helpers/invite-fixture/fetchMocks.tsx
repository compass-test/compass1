import fetchMock from 'fetch-mock/cjs/client';

import {
  BULK_INVITE_URL,
  DEFAULT_STARGATE_SERVICE_URL,
  INVITE_CAPABILITIES,
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
