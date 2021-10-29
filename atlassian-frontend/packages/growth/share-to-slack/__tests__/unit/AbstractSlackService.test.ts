import fetchMock from 'fetch-mock/cjs/client';

import AbstractSlackService from '../../src/common/slack-service/AbstractSlackService';
import { SlackService } from '../../src/common/SlackService';
import { GetSlackConsentUrlResult } from '../../src/common/types';
import { conversations, teams } from '../common/_slack-test-data';

describe('AbstractSlackService', () => {
  let slackService: SlackService;

  beforeEach(() => {
    fetchMock.mock('/_edge/tenant_info', {
      body: { cloudId: 'fake-cloud-id' },
      status: 200,
    });

    slackService = new TestSlackService();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('isSlackEnabled', () => {
    describe('success (enabled)', () => {
      beforeEach(() => {
        fetchMock.mock(
          '/gateway/api/slack/jira/enabled?cloudId=fake-cloud-id',
          {
            body: { enabled: true },
            status: 200,
          },
        );
      });

      it('returns the expected result', async () => {
        expect(await slackService.isSlackEnabled()).toEqual({
          ok: true,
          result: true,
        });
      });
    });

    describe('success (disabled)', () => {
      beforeEach(() => {
        fetchMock.mock(
          '/gateway/api/slack/jira/enabled?cloudId=fake-cloud-id',
          {
            body: { enabled: false },
            status: 200,
          },
        );
      });

      it('returns the expected result', async () => {
        expect(await slackService.isSlackEnabled()).toEqual({
          ok: true,
          result: false,
        });
      });
    });

    describe('403', () => {
      beforeEach(() => {
        fetchMock.mock(
          '/gateway/api/slack/jira/enabled?cloudId=fake-cloud-id',
          {
            body: {
              code: 'FORBIDDEN',
              message: 'You don’t have access to this',
            },
            status: 403,
          },
        );
      });

      it('returns the expected result', async () => {
        expect(await slackService.isSlackEnabled()).toEqual({
          ok: false,
          aborted: false,
          status: 403,
          code: 'FORBIDDEN',
          message: 'You don’t have access to this',
        });
      });
    });

    describe('500', () => {
      beforeEach(() => {
        fetchMock.mock(
          '/gateway/api/slack/jira/enabled?cloudId=fake-cloud-id',
          {
            body: {
              code: 'OOPS',
              message: 'Something broke',
            },
            status: 500,
          },
        );
      });

      it('returns the expected result', async () => {
        expect(await slackService.isSlackEnabled()).toEqual({
          ok: false,
          aborted: false,
          status: 500,
          code: 'OOPS',
          message: 'Something broke',
        });
      });
    });
  });

  describe('getTeams', () => {
    describe('success', () => {
      beforeEach(() => {
        fetchMock.mock('/gateway/api/slack/jira/teams?cloudId=fake-cloud-id', {
          body: {
            teams,
          },
          status: 200,
        });
      });

      it('returns the expected result', async () => {
        expect(await slackService.getTeams()).toEqual({
          ok: true,
          result: teams,
        });
      });
    });

    describe('403', () => {
      beforeEach(() => {
        fetchMock.mock('/gateway/api/slack/jira/teams?cloudId=fake-cloud-id', {
          body: {
            code: '403',
            message: 'Forbidden',
          },
          status: 403,
        });
      });

      it('returns the expected result', async () => {
        expect(await slackService.getTeams()).toEqual({
          ok: false,
          aborted: false,
          status: 403,
          code: '403',
          message: 'Forbidden',
          page: 0,
        });
      });
    });

    describe('500', () => {
      beforeEach(() => {
        fetchMock.mock('/gateway/api/slack/jira/teams?cloudId=fake-cloud-id', {
          body: {
            code: '500',
            message: 'Internal Server Error',
          },
          status: 500,
        });
      });

      it('returns the expected result', async () => {
        expect(await slackService.getTeams()).toEqual({
          ok: false,
          aborted: false,
          status: 500,
          code: '500',
          message: 'Internal Server Error',
          page: 0,
        });
      });
    });
  });

  describe('getConversations', () => {
    describe('success', () => {
      beforeEach(() => {
        fetchMock.mock(
          `/gateway/api/slack/jira/channels?cloudId=fake-cloud-id&teamId=${teams[0].id}`,
          {
            body: {
              channels: conversations.get(teams[0].id)!.channels,
            },
            status: 200,
          },
        );
        fetchMock.mock(
          `/gateway/api/slack/jira/recipients?cloudId=fake-cloud-id&teamId=${teams[0].id}`,
          {
            body: {
              recipients: conversations.get(teams[0].id)!.directMessages,
            },
            status: 200,
          },
        );
      });

      it('returns the expected result', async () => {
        expect(await slackService.getConversations(teams[0]!.id)).toEqual({
          ok: true,
          result: {
            channels: conversations.get(teams[0].id)!.channels,
            directMessages: conversations.get(teams[0].id)!.directMessages,
          },
        });
      });
    });

    describe('404', () => {
      beforeEach(() => {
        fetchMock.mock(
          `/gateway/api/slack/jira/channels?cloudId=fake-cloud-id&teamId=${teams[0].id}`,
          {
            body: {
              channels: conversations.get(teams[0].id)!.channels,
            },
            status: 200,
          },
        );
        fetchMock.mock(
          `/gateway/api/slack/jira/recipients?cloudId=fake-cloud-id&teamId=${teams[0].id}`,
          {
            body: {},
            status: 404,
          },
        );
      });

      it('returns the expected result', async () => {
        expect(await slackService.getConversations(teams[0]!.id)).toEqual({
          ok: false,
          aborted: false,
          status: 404,
          code: '404',
          message: 'Not Found',
          page: 0,
        });
      });
    });

    describe('500', () => {
      beforeEach(() => {
        fetchMock.mock(
          `/gateway/api/slack/jira/channels?cloudId=fake-cloud-id&teamId=${teams[0].id}`,
          {
            body: {
              code: 'OOPS',
              message: 'Something broke',
            },
            status: 500,
          },
        );
        fetchMock.mock(
          `/gateway/api/slack/jira/recipients?cloudId=fake-cloud-id&teamId=${teams[0].id}`,
          {
            body: {
              recipients: conversations.get(teams[0].id)!.directMessages,
            },
            status: 200,
          },
        );
      });

      it('returns the expected result', async () => {
        expect(await slackService.getConversations(teams[0]!.id)).toEqual({
          ok: false,
          aborted: false,
          status: 500,
          code: '500',
          message: 'Internal Server Error',
          page: 0,
        });
      });
    });
  });

  describe('share', () => {
    describe('success', () => {
      beforeEach(() => {
        fetchMock.mock({
          matcher: '/gateway/api/slack/jira/share',
          method: 'POST',
          matchPartialBody: {
            cloudId: 'fake-cloud-id',
            teamId: teams[0].id,
            conversation: {
              id: conversations.get(teams[0].id)!.channels[0].id,
              type: conversations.get(teams[0].id)!.channels[0].type,
            },
            message: 'Hello',
          },
          response: {
            status: 201,
          },
        });
      });

      it('returns the expected result', async () => {
        expect(
          await slackService.share({
            teamId: teams[0].id,
            conversationId: conversations.get(teams[0].id)!.channels[0].id,
            conversationType: conversations.get(teams[0].id)!.channels[0].type,
            link: 'https://hello.atlassian.net/browse/ABCD-1234',
            message: 'Hello',
          }),
        ).toEqual({
          ok: true,
          result: {
            product: 'jira',
            id: expect.any(String),
          },
        });
      });
    });

    describe('403', () => {
      beforeEach(() => {
        fetchMock.mock({
          matcher: '/gateway/api/slack/jira/share',
          method: 'POST',
          matchPartialBody: {
            cloudId: 'fake-cloud-id',
            teamId: teams[0].id,
            conversation: {
              id: conversations.get(teams[0].id)!.channels[0].id,
              type: conversations.get(teams[0].id)!.channels[0].type,
            },
            message: 'Hello',
          },
          response: {
            status: 403,
            body: {
              code: '403',
              message: 'Forbidden',
            },
          },
        });
      });

      it('returns the expected result', async () => {
        expect(
          await slackService.share({
            teamId: teams[0].id,
            conversationId: conversations.get(teams[0].id)!.channels[0].id,
            conversationType: conversations.get(teams[0].id)!.channels[0].type,
            link: 'https://hello.atlassian.net/browse/ABCD-1234',
            message: 'Hello',
          }),
        ).toEqual({
          ok: false,
          aborted: false,
          status: 403,
          code: '403',
          message: 'Forbidden',
        });
      });
    });

    describe('500', () => {
      beforeEach(() => {
        fetchMock.mock({
          matcher: '/gateway/api/slack/jira/share',
          method: 'POST',
          matchPartialBody: {
            cloudId: 'fake-cloud-id',
            teamId: teams[0].id,
            conversation: {
              id: conversations.get(teams[0].id)!.channels[0].id,
              type: conversations.get(teams[0].id)!.channels[0].type,
            },
            message: 'Hello',
          },
          response: {
            status: 500,
            body: {
              code: '500',
              message: 'Internal Server Error',
            },
          },
        });
      });

      it('returns the expected result', async () => {
        expect(
          await slackService.share({
            teamId: teams[0].id,
            conversationId: conversations.get(teams[0].id)!.channels[0].id,
            conversationType: conversations.get(teams[0].id)!.channels[0].type,
            link: 'https://hello.atlassian.net/browse/ABCD-1234',
            message: 'Hello',
          }),
        ).toEqual({
          ok: false,
          aborted: false,
          status: 500,
          code: '500',
          message: 'Internal Server Error',
        });
      });
    });
  });
});

class TestSlackService extends AbstractSlackService {
  constructor() {
    super('jira', {
      onFetchChannelsFailed(): void {},
      onFetchChannelsSucceeded(): void {},
      onFetchTeamsFailed(): void {},
      onFetchTeamsSucceeded(): void {},
      onFetchUsersFailed(): void {},
      onFetchUsersSucceeded(): void {},
      onGetEnabledFailed(): void {},
      onGetEnabledSucceeded(): void {},
      onShareFailed(): void {},
      onShareSucceeded(): void {},
    });
  }

  getConsentUrl(
    location: Pick<Location, 'hostname' | 'pathname'>,
    signal?: AbortSignal,
  ): Promise<GetSlackConsentUrlResult> {
    return Promise.resolve({ ok: true, result: 'fake-consent-url' });
  }
}
