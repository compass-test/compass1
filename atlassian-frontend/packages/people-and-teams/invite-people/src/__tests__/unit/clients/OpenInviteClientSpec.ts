import fetchMock from 'fetch-mock/cjs/client';
import { ResourceAri } from '../../../types';
import { OpenInviteClient } from '../../../clients/OpenInviteClient';

import {
  OPEN_INVITE_URL,
  DEFAULT_STARGATE_SERVICE_URL,
} from '../../../clients/common';

describe('OpenInviteClient', () => {
  const mockResource: ResourceAri = 'ari:cloud:jira::site/test-cloud-id';
  const cloudId = 'test-cloud-id';
  const product = 'jira';
  const mockEnableOpenInvite = () => {
    fetchMock.put({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}`,
      response: {
        status: 200,
        body: {
          mode: 'DIRECT_ACCESS',
        },
      },
      name: 'enable-open-invite',
    });
  };
  const mockEnableOpenInviteFailure = () => {
    fetchMock.put({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}`,
      response: {
        status: 500,
        body: {
          mode: 'DIRECT_ACCESS',
        },
      },
      name: 'enable-open-invite-failure',
    });
  };

  const mockGetOpenInviteState = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=${mockResource}`,
      response: {
        status: 200,
        body: {
          mode: 'NONE',
        },
      },
      name: 'get-open-invite',
    });
  };

  const mockGetOpenInviteStateFailureResponse = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=ari:cloud:jira::site/invalid-resource`,
      response: {
        status: 500,
        body: {
          err: 'Unexpected error',
        },
      },
      name: 'get-open-invite',
    });
  };

  let openInviteClient: OpenInviteClient;

  beforeEach(() => {
    openInviteClient = new OpenInviteClient();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('Get Open Invite State', () => {
    it('should get from /open-invite to fetch open invite state', async () => {
      mockGetOpenInviteState();
      await openInviteClient.getOpenInviteState(product, cloudId);
      expect(fetchMock.called('get-open-invite')).toBe(true);
      expect(fetchMock.calls('get-open-invite').length).toEqual(1);
    });
    it('should get the state already fetched from /open-invite when called twice', async () => {
      mockGetOpenInviteState();
      const firstResult = await openInviteClient.getOpenInviteState(
        product,
        cloudId,
      );
      const secondResult = await openInviteClient.getOpenInviteState(
        product,
        cloudId,
      );
      expect(fetchMock.called('get-open-invite')).toBe(true);
      expect(firstResult.response).toEqual(secondResult.response);
      expect(firstResult.cached).toBe(false);
      expect(secondResult.cached).toBe(true);
      expect(fetchMock.calls('get-open-invite').length).toEqual(1);
    });
    it('should return failure response if invite endpoint fails', async () => {
      mockGetOpenInviteStateFailureResponse();
      expect(
        openInviteClient.getOpenInviteState(product, 'invalid-resource'),
      ).rejects.toMatch(
        'Received error response when getting open invite setting',
      );
      expect(fetchMock.called('get-open-invite')).toBe(true);
    });
    it('should not use cached value if the invite endpoint fails', async () => {
      mockGetOpenInviteStateFailureResponse();
      expect(
        openInviteClient.getOpenInviteState(product, 'invalid-resource'),
      ).rejects.toMatch(
        'Received error response when getting open invite setting',
      );
      expect(
        openInviteClient.getOpenInviteState(product, 'invalid-resource'),
      ).rejects.toMatch(
        'Received error response when getting open invite setting',
      );
      expect(fetchMock.called('get-open-invite')).toBe(true);
      expect(fetchMock.calls('get-open-invite').length).toEqual(2);
    });
  });

  describe('Should enable open invite', () => {
    it('should post to /open-invite with correct values', async () => {
      mockEnableOpenInvite();
      await openInviteClient.enableOpenInvite(product, 'test-cloud-id');
      expect(fetchMock.called('enable-open-invite')).toBe(true);
      expect(fetchMock.calls('enable-open-invite').length).toEqual(1);
    });

    it('should return failure response if post endpoint fails', async () => {
      mockEnableOpenInviteFailure();
      expect(
        openInviteClient.enableOpenInvite(product, 'test-cloud-id'),
      ).rejects.toMatch(
        'Received error response when updating open invite setting',
      );
      expect(fetchMock.called('enable-open-invite-failure')).toBe(true);
    });
  });
});
