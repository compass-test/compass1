import fetchMock from 'fetch-mock/cjs/client';
import {
  HaveISeenItClient,
  createHISIDomainFlagKey,
  createHISIOpenInviteFlagKey,
  PROJECT,
} from '../../../clients/HaveISeenItClient';

import {
  HAVE_I_SEEN_IT_URL,
  DEFAULT_STARGATE_SERVICE_URL,
} from '../../../clients/common';

describe('Creating HISI key functions', () => {
  describe('createHISIDomainFlagKey', () => {
    it('should have the correct format', () => {
      const cloudId = 'test-cloud-id';
      const product = 'jira';
      expect(createHISIDomainFlagKey(product, cloudId, 'test')).toEqual(
        `test-cloud-id-jira-viral-options-default-to-checked-domain-test`,
      );
      expect(createHISIDomainFlagKey('', '', '')).toEqual(
        `--viral-options-default-to-checked-domain-`,
      );
    });
  });

  describe('createHISIOpenInviteFlagKey', () => {
    it('should have the correct format', () => {
      const cloudId = 'test-cloud-id';
      const product = 'jira';
      expect(createHISIOpenInviteFlagKey(product, cloudId)).toEqual(
        `test-cloud-id-jira-viral-options-default-to-checked-open-invite`,
      );
      expect(createHISIOpenInviteFlagKey('', '')).toEqual(
        `--viral-options-default-to-checked-open-invite`,
      );
    });
  });
});

describe('HaveISeenItClient', () => {
  const cloudId = 'test-cloud-id';
  const product = 'jira';
  const mockBaseKey: string = `${cloudId}-${product}-${PROJECT}`;
  const mockPostKey = () => {
    fetchMock.post({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}`,
      response: {
        status: 200,
        body: '',
      },
      name: 'post-key',
    });
  };
  const mockPostFailure = () => {
    fetchMock.post({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}`,
      response: {
        status: 500,
        body: {
          err: 'Unexpected error',
        },
      },
      name: 'post-key-failure',
    });
  };

  const mockGetKey = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}?flagKey=${mockBaseKey}-open-invite`,
      response: {
        status: 200,
        body: { status: true, lastSeenDate: '2021-08-25T03:32:33.511Z' },
      },
      name: 'get-key',
    });
  };
  const mockGetKeyNoMatch = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}?flagKey=${mockBaseKey}-open-invite`,
      response: {
        status: 200,
        body: { status: false, lastSeenDate: null },
      },
      name: 'get-key-no-value',
    });
  };
  const mockRepeatGet = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}?flagKey=${mockBaseKey}-open-invite`,
      response: {
        status: 304,
        body: { status: false, lastSeenDate: null },
      },
      name: 'get-key-repeat',
    });
  };
  const mockGetFailureResponse = () => {
    fetchMock.get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}?flagKey=${mockBaseKey}-open-invite`,
      response: {
        status: 500,
        body: {
          err: 'Unexpected error',
        },
      },
      name: 'get-key-failure',
    });
  };

  let haveISeenItClient: HaveISeenItClient;

  beforeEach(() => {
    haveISeenItClient = new HaveISeenItClient();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('Get Flag', () => {
    it('should get the flag from HISI /my', async () => {
      mockGetKey();
      await haveISeenItClient.getFlag(`${mockBaseKey}-open-invite`);
      expect(fetchMock.called('get-key')).toBe(true);
      expect(fetchMock.calls('get-key').length).toEqual(1);
    });
    it('should get the correct values with no existing key from HISI /my', async () => {
      mockGetKeyNoMatch();
      await haveISeenItClient.getFlag(`${mockBaseKey}-open-invite`);
      expect(fetchMock.called('get-key-no-value')).toBe(true);
      expect(fetchMock.calls('get-key-no-value').length).toEqual(1);
    });
    it('should not fail when getting 304 /my', async () => {
      mockRepeatGet();
      await haveISeenItClient.getFlag(`${mockBaseKey}-open-invite`);
      expect(fetchMock.called('get-key-repeat')).toBe(true);
      expect(fetchMock.calls('get-key-repeat').length).toEqual(1);
    });
    it('should return failure response if HISI fails', async () => {
      mockGetFailureResponse();
      expect(
        haveISeenItClient.getFlag(`${mockBaseKey}-open-invite`),
      ).rejects.toMatch('Received error response when fetching flag');
      expect(fetchMock.called('get-key-failure')).toBe(true);
    });
    it('should only call the /my endpoint once due to cache', async () => {
      mockGetKey();
      const firstResult = await haveISeenItClient.getFlag(
        `${mockBaseKey}-open-invite`,
      );
      const secondResult = await haveISeenItClient.getFlag(
        `${mockBaseKey}-open-invite`,
      );
      expect(fetchMock.calls().length).toEqual(1);
      expect(firstResult.response).toEqual(secondResult.response);
      expect(firstResult.cached).toBe(false);
      expect(secondResult.cached).toBe(true);
    });
    it('should not cache errors and call the /my endpoint twice', async () => {
      mockGetFailureResponse();
      expect(
        haveISeenItClient.getFlag(`${mockBaseKey}-open-invite`),
      ).rejects.toMatch('Received error response when fetching flag');
      expect(
        haveISeenItClient.getFlag(`${mockBaseKey}-open-invite`),
      ).rejects.toMatch('Received error response when fetching flag');
      expect(fetchMock.calls().length).toEqual(2);
      expect(fetchMock.called('get-key-failure')).toBe(true);
    });
  });

  describe('Post Flag', () => {
    it('should post to HISI /my with correct values', async () => {
      mockPostKey();
      await haveISeenItClient.postFlag(`${mockBaseKey}-open-invite`);
      expect(fetchMock.called('post-key')).toBe(true);
      expect(fetchMock.calls('post-key').length).toEqual(1);
    });
    it('should return failure response if post endpoint fails', async () => {
      mockPostFailure();
      expect(
        haveISeenItClient.postFlag(`${mockBaseKey}-open-invite`),
      ).rejects.toMatch('Received error response when posting flag');
      expect(fetchMock.called('post-key-failure')).toBe(true);
    });
  });
});
