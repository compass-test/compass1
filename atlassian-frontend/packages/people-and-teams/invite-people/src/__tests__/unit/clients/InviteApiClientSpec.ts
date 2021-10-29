import fetchMock from 'fetch-mock/cjs/client';
import {
  InviteApiRequest,
  InvitedUser,
  ResourceAri,
  BulkInviteResponse,
  InviteProduct,
  GetDirectAccessSettingResponse,
  GetDirectAccessSettingRequest,
  UpdateDirectAccessSettingRequest,
  UpdateDirectAccessSettingResponse,
  GetDirectAccessSettingSuccessResponse,
} from '../../../types';
import {
  InviteApiClient,
  InviteApiClientImpl,
} from '../../../clients/InviteApiClient';

import {
  DEFAULT_STARGATE_SERVICE_URL,
  BULK_INVITE_URL,
  INVITE_CAPABILITIES,
  DIRECT_ACCESS_URL,
} from '../../../clients/common';

describe('InviteApiClient', () => {
  const mockResource: ResourceAri = 'ari:cloud:platform::site/test-cloud-id';
  const mockJiraResource: ResourceAri =
    'ari:cloud:jira-software::site/test-cloud-id';
  const mockConfluenceResource: ResourceAri =
    'ari:cloud:confluence::site/test-cloud-id';
  const continueUrl = 'http://mock-absolute-url.atlassian.net/wiki';
  const mockInvitedUser1Id = 'test-id-1';
  const mockInvitedUser2Id = 'test-id-2';
  const mockedInvitedUser1Email = 'testemail-1@example.com';
  const mockedInvitedUser2Email = 'testemail-2@example.com';
  const mockInvitedUser1: InvitedUser = {
    id: mockInvitedUser1Id,
    email: mockedInvitedUser1Email,
  };
  const mockInvitedUser2: InvitedUser = {
    id: mockInvitedUser2Id,
    email: mockedInvitedUser2Email,
  };
  const mockCapabilitiesResponse = [
    {
      name: 'Jira Software',
      id: 'jira-software',
      ari: 'ari:cloud:jira-software::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
    },
    {
      name: 'Confluence',
      id: 'confluence',
      ari: 'ari:cloud:confluence::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
    },
  ];
  const getMockDirectInviteResponseBody = (
    domain: string,
    product: string,
  ) => ({
    domain,
    desPromotionEligible: 'true',
    role: `ari:cloud:${product}::role/product/member`,
  });
  const updateMockDirectInviteResponseBody = () => ({
    success: true,
    updateDirectAccessSettings: true,
  });

  const mockPartialSuccessResponse = () => {
    fetchMock.post({
      matcher: DEFAULT_STARGATE_SERVICE_URL + BULK_INVITE_URL,
      response: {
        body: [
          {
            id: mockInvitedUser1Id,
            email: mockedInvitedUser1Email,
            results: {
              'ari:cloud:jira-software::site/test-cloud-id': 'INVITED',
              'ari:cloud:confluence::site/test-cloud-id': 'ERROR',
            },
            errorReasons: {
              'ari:cloud:confluence::site/test-cloud-id': {
                code: 'bad-request',
                message: 'mock error message',
              },
            },
          },
          {
            id: mockInvitedUser2Id,
            email: mockedInvitedUser2Email,
            results: {
              'ari:cloud:jira-software::site/test-cloud-id': 'ERROR',
              'ari:cloud:confluence::site/test-cloud-id':
                'INVITED_PENDING_APPROVAL',
            },
            errorReasons: {
              'ari:cloud:jira-software::site/test-cloud-id': {
                code: 'bad-request',
                message: 'mock error message',
              },
            },
          },
        ],
      },
      name: 'bulk-invite',
    });
  };

  const mockFailureResponse = () => {
    fetchMock.post({
      matcher: DEFAULT_STARGATE_SERVICE_URL + BULK_INVITE_URL,
      response: {
        status: 404,
        body: {
          code: 'licence-exceeded',
          message: 'Licence Exceeded for resources',
        },
      },
      name: 'bulk-invite',
    });
  };

  const mockInviteCapabilitiesResponse = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${INVITE_CAPABILITIES}?resource=${mockResource}`,
      response: {
        status: 200,
        body: {
          directInvite: {
            mode: 'ANYONE',
            permittedResources: [
              'ari:cloud:jira-software::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
              'ari:cloud:confluence::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
            ],
          },
          invitePendingApproval: {
            mode: 'ANYONE',
            permittedResources: [
              'ari:cloud:jira-software::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
              'ari:cloud:confluence::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
            ],
          },
        },
      },
      name: 'invite-capabilities',
    });
  };

  const mockInviteCapabilitiesResponse2 = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${INVITE_CAPABILITIES}?resource=${mockResource}`,
      response: {
        status: 200,
        body: {
          directInvite: {
            mode: 'NONE',
          },
          invitePendingApproval: {
            mode: 'ANYONE',
            permittedResources: [
              'ari:cloud:jira-software::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
              'ari:cloud:confluence::site/8363b59c-fc51-4aa5-8b18-39c6bb2a8522',
            ],
          },
        },
      },
      name: 'invite-capabilities',
    });
  };

  const mockInviteCapabilitiesFailureResponse = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${INVITE_CAPABILITIES}?resource=${mockResource}`,
      response: {
        status: 500,
        body: {
          err: 'Unexpected error',
        },
      },
      name: 'invite-capabilities',
    });
  };

  const mockDirectAccessSuccessResponse = (domain: string, product: string) => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
      response: {
        status: 200,
        body: getMockDirectInviteResponseBody(domain, product),
      },
      name: 'get-direct-access-setting',
      query: {
        domain,
        setting: 'DIRECT_ACCESS',
        resource: `ari:cloud:${product}::site/test-cloud-id`,
      },
    });
  };

  const mockDirectAccessFailureResponse = (domain: string, product: string) => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
      response: {
        status: 409,
      },
      name: 'get-direct-access-setting',
      query: {
        domain,
        setting: 'DIRECT_ACCESS',
        resource: `ari:cloud:${product}::site/test-cloud-id`,
      },
    });
  };

  const mockUpdateDirectAccessSuccessResponse = (
    domain: string,
    product: string,
  ) => {
    fetchMock.post({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
      response: {
        status: 204,
      },
      name: 'update-direct-access-setting',
    });
  };
  const mockUpdateDirectAccessFailureResponse = (
    domain: string,
    product: string,
  ) => {
    fetchMock.post({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
      response: {
        status: 409,
      },
      name: 'update-direct-access-setting',
    });
  };

  let inviteApiClient: InviteApiClient;
  let mockRequest: InviteApiRequest;

  beforeEach(() => {
    inviteApiClient = new InviteApiClientImpl();
    mockRequest = {
      continueUrl,
      users: [mockInvitedUser1, mockInvitedUser2],
      resources: [mockJiraResource, mockConfluenceResource],
    };
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('Invite Users', () => {
    it('should call bulk invite endpoint', async () => {
      mockPartialSuccessResponse();
      await inviteApiClient.inviteUsers(mockRequest);
      expect(fetchMock.called('bulk-invite')).toBe(true);
      expect(fetchMock.calls('bulk-invite').length).toEqual(1);
    });
    it('should call identity client with correct request params', async () => {
      mockPartialSuccessResponse();
      await inviteApiClient.inviteUsers(mockRequest);
      expect(fetchMock.lastOptions().body).toEqual(JSON.stringify(mockRequest));
    });
    it('should return failure response if invite endpoint fails', async () => {
      mockFailureResponse();
      const expectedResponse = {
        failure: {
          code: 'licence-exceeded',
          message: 'Licence Exceeded for resources',
        },
      };
      const response: BulkInviteResponse = await inviteApiClient.inviteUsers(
        mockRequest,
      );
      expect(response).toEqual(expectedResponse);
    });
    it('should return success response if invite endpoint succeeds', async () => {
      mockPartialSuccessResponse();
      const expectedResponse = {
        invited: [mockInvitedUser1],
        accessRequested: [mockInvitedUser2],
        error: [
          {
            ...mockInvitedUser1,
            error: {
              code: 'bad-request',
              message: 'mock error message',
            },
          },
          {
            ...mockInvitedUser2,
            error: {
              code: 'bad-request',
              message: 'mock error message',
            },
          },
        ],
      };
      const response: BulkInviteResponse = await inviteApiClient.inviteUsers(
        mockRequest,
      );
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('Invite capabilities', () => {
    it('should call invite capabilities endpoint', async () => {
      mockInviteCapabilitiesResponse();
      await inviteApiClient.inviteCapabilities('test-cloud-id');
      expect(fetchMock.called('invite-capabilities')).toBe(true);
      expect(fetchMock.calls('invite-capabilities').length).toEqual(1);
    });

    it('should return array of products when direct and pending invite modes are not none', async () => {
      mockInviteCapabilitiesResponse();
      const response: Array<InviteProduct> = await inviteApiClient.inviteCapabilities(
        'test-cloud-id',
      );

      expect(response).toEqual(mockCapabilitiesResponse);
    });

    it('should return array of products direct invite mode is none', async () => {
      mockInviteCapabilitiesResponse2();
      const response: Array<InviteProduct> = await inviteApiClient.inviteCapabilities(
        'test-cloud-id',
      );

      expect(response).toEqual(mockCapabilitiesResponse);
    });

    it('should return empty array if api fails', async () => {
      mockInviteCapabilitiesFailureResponse();
      const response: Array<InviteProduct> = await inviteApiClient.inviteCapabilities(
        'test-cloud-id',
      );

      expect(response).toEqual([]);
    });
  });

  describe('Direct access', () => {
    const domain = 'testdomain.com';
    const product = 'test-product';
    describe('Get Direct access', () => {
      const request: GetDirectAccessSettingRequest = {
        productAri: `ari:cloud:${product}::site/test-cloud-id`,
        domain,
        setting: 'DIRECT_ACCESS',
      };
      it('should match mocked request and return response matching request response', async () => {
        mockDirectAccessSuccessResponse(domain, product);
        const response: GetDirectAccessSettingResponse = await inviteApiClient.getDirectAccessSetting(
          request,
        );
        expect(response).toEqual({
          response: {
            ...getMockDirectInviteResponseBody(domain, product),
            getAccessSuccessReponse: true,
          },
          cached: false,
        });
      });
      it('should only call endpoint once when called multiple times', async () => {
        mockDirectAccessSuccessResponse(domain, product);
        const firstResponse: GetDirectAccessSettingResponse = await inviteApiClient.getDirectAccessSetting(
          request,
        );
        const secondResponse: GetDirectAccessSettingResponse = await inviteApiClient.getDirectAccessSetting(
          request,
        );
        expect(firstResponse).toEqual({
          response: {
            ...getMockDirectInviteResponseBody(domain, product),
            getAccessSuccessReponse: true,
          },
          cached: false,
        });
        const successFirstResponse = firstResponse as GetDirectAccessSettingSuccessResponse;
        const successSecondResponse = secondResponse as GetDirectAccessSettingSuccessResponse;
        expect(successFirstResponse.response).toEqual(
          successSecondResponse.response,
        );
        expect(fetchMock.calls('get-direct-access-setting').length).toEqual(1);
      });

      it('should return an error object if fetch call returns failure response', async () => {
        mockDirectAccessFailureResponse(domain, product);
        const response: GetDirectAccessSettingResponse = await inviteApiClient.getDirectAccessSetting(
          request,
        );
        expect(response).toEqual({
          domain: 'testdomain.com',
          errorMessage: `Received error response when getting direct access setting: Conflict`,
          responseCode: 409,
        });
      });
      it('should not cache error response', async () => {
        mockDirectAccessFailureResponse(domain, product);
        const response: GetDirectAccessSettingResponse = await inviteApiClient.getDirectAccessSetting(
          request,
        );
        await inviteApiClient.getDirectAccessSetting(request);
        expect(response).toEqual({
          domain: 'testdomain.com',
          errorMessage: `Received error response when getting direct access setting: Conflict`,
          responseCode: 409,
        });
        expect(fetchMock.calls('get-direct-access-setting').length).toEqual(2);
      });
    });
    describe('Update Direct access', () => {
      const request: UpdateDirectAccessSettingRequest = {
        product: `jira`,
        domains: ['a.com'],
        location: 'jira.core-invites',
        cloudId: '1234',
      };
      it('should match mocked request and return response matching request response', async () => {
        mockUpdateDirectAccessSuccessResponse(domain, product);
        const response: UpdateDirectAccessSettingResponse = await inviteApiClient.updateDirectAccessSettings(
          request,
        );
        expect(response).toEqual(updateMockDirectInviteResponseBody());
      });

      it('should return an error object if fetch call returns failure response', () => {
        mockUpdateDirectAccessFailureResponse(domain, product);
        expect(
          inviteApiClient.updateDirectAccessSettings(request),
        ).rejects.toMatchObject({
          errorMessage:
            'Received error response when updating direct access setting: Conflict',
          responseCode: 409,
          updateDirectAccessSettingsFailure: true,
        });
      });
    });
  });
});
