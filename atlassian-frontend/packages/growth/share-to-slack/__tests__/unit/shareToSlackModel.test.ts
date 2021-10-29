import type OriginTracer from '@atlassiansox/origin-tracing';
import last from 'lodash/last';
import noop from 'lodash/noop';
import sortBy from 'lodash/sortBy';

import type {
  Feedback,
  Result,
  ShareToSlackRequest,
  ShareToSlackResult,
  ShareToSlackState,
  SlackConversations,
  SlackTeam,
} from '../../src/common/types';
import {
  getInitialShareToSlackState,
  ShareToSlackModel,
  shareToSlackModel,
} from '../../src/ui/ShareToSlack/shareToSlackModel';
import { conversations, teams } from '../common/_slack-test-data';
import TestSlackService from '../common/_TestSlackService';
import { ticks } from '../common/_util';

const location = {
  hostname: 'hello.atlassian.net',
  pathname: '/wiki/spaces/FOO/pages/1234/Hello+World',
};

describe('getInitialShareToSlackState', () => {
  it('indicates that the Share to Slack UI is initially loading', () => {
    expect(getInitialShareToSlackState().page).toBe('loading');
  });

  it('indicates that teams are loading before they’ve loaded', () => {
    expect(getInitialShareToSlackState().isLoadingTeams).toBe(true);
  });

  it('starts with no teams', () => {
    expect(getInitialShareToSlackState().teams).toBeUndefined();
  });

  it('indicates that no team is selected initially', () => {
    expect(getInitialShareToSlackState().selectedTeam).toBeUndefined();
  });

  it('indicates that conversations are loading before they’ve been loaded', () => {
    expect(getInitialShareToSlackState().isLoadingConversations).toBe(true);
  });

  it('starts with no conversations', () => {
    expect(getInitialShareToSlackState().conversations).toBeUndefined();
  });

  it('indicates that no conversation is selected initially', () => {
    expect(getInitialShareToSlackState().selectedConversation).toBeUndefined();
  });

  it('indicates that a share request is not initially in progress', () => {
    expect(getInitialShareToSlackState().isSharing).toBe(false);
  });
});

describe('shareToSlackModel', () => {
  let slackService: TestSlackService;
  let model: ShareToSlackModel;
  let state: ShareToSlackState | undefined;
  let unsubscribe: () => void;
  let startSpy: jest.SpyInstance<void, []>;
  let getConsentUrlSpy: jest.SpyInstance<
    Promise<Result<string>>,
    [Pick<Location, 'hostname' | 'pathname'>]
  >;
  let getConsentSpy: jest.SpyInstance<void, [string, () => void]>;
  let isSlackEnabledSpy: jest.SpyInstance<Promise<Result<boolean>>, []>;
  let getTeamsSpy: jest.SpyInstance<
    Promise<Result<SlackTeam[]>>,
    [AbortSignal?]
  >;
  let getDefaultTeamIdSpy: jest.SpyInstance<Promise<string | undefined>, []>;
  let getConversationsSpy: jest.SpyInstance<
    Promise<Result<SlackConversations>>,
    [string, AbortSignal?]
  >;
  let shareSpy: jest.SpyInstance<
    Promise<ShareToSlackResult>,
    [ShareToSlackRequest]
  >;
  let showFeedbackMock: jest.Mock<void, [Feedback]>;
  let onSlackTeamConnectedMock: jest.Mock<void, [string]>;
  let onSharedMock: jest.Mock<void, [OriginTracer]>;

  async function setup(
    setupSlackService?: (slackService: TestSlackService) => void,
  ) {
    slackService = new TestSlackService();
    setupSlackService?.(slackService);

    startSpy = jest.spyOn(slackService, 'start');
    getConsentUrlSpy = jest.spyOn(slackService, 'getConsentUrl');
    getConsentSpy = jest.spyOn(slackService, 'getConsent');
    isSlackEnabledSpy = jest.spyOn(slackService, 'isSlackEnabled');
    getTeamsSpy = jest.spyOn(slackService, 'getTeams');
    getDefaultTeamIdSpy = jest.spyOn(slackService, 'getDefaultTeamId');
    getConversationsSpy = jest.spyOn(slackService, 'getConversations');
    shareSpy = jest.spyOn(slackService, 'share');
    showFeedbackMock = jest.fn();
    onSlackTeamConnectedMock = jest.fn();
    onSharedMock = jest.fn();

    state = undefined;
    model = shareToSlackModel({
      slackService,
      location,
      showFeedback: showFeedbackMock,
      onSlackTeamConnected: onSlackTeamConnectedMock,
      onShared: onSharedMock,
    });
    unsubscribe = model.subscribe((newState) => {
      state = newState;
    });
  }

  afterEach(() => {
    startSpy?.mockRestore();
    getConsentUrlSpy?.mockRestore();
    getConsentSpy?.mockRestore();
    isSlackEnabledSpy.mockRestore();
    getTeamsSpy.mockRestore();
    getDefaultTeamIdSpy.mockRestore();
    getConversationsSpy.mockRestore();
    shareSpy.mockRestore();
    unsubscribe();
  });

  describe('subscribe', () => {
    beforeEach(async () => {
      await setup();
    });

    it('starts the Slack service upon subscription', () => {
      expect(slackService.start).toBeCalledTimes(1);
    });

    it('gets the consent URL upon subscription', () => {
      expect(slackService.getConsentUrl).toBeCalledTimes(1);
      expect(slackService.getConsentUrl).toBeCalledWith(
        location,
        expect.any(AbortSignal),
      );
    });

    it('checks if Slack integration is enabled upon subscription', async () => {
      expect(slackService.isSlackEnabled).toBeCalledTimes(1);
      expect(slackService.isSlackEnabled).toBeCalledWith(
        expect.any(AbortSignal),
      );
    });

    it('fetches Slack teams upon subscription', async () => {
      await ticks(1); // integration enabled check
      expect(slackService.getTeams).toBeCalledTimes(1);
    });

    it('gets the default team ID', async () => {
      slackService.addSlackTeams(teams[0]);
      await ticks(2); // integration enabled check, fetch teams
      expect(slackService.getDefaultTeamId).toBeCalledTimes(1);
    });

    it('selects the default team if one is saved and is found in the list', async () => {
      slackService.addSlackTeams(...teams.slice(0, 2));
      slackService.setDefaultTeamId('1').then(noop);
      await ticks(3); // integration enabled check, fetch teams, load default team
      expect(state?.selectedTeam?.id).toBe('1');
    });

    it('selects the first team if the default team was saved but is not found in the list', async () => {
      slackService.addSlackTeams(...teams.slice(0, 2));
      slackService.setDefaultTeamId('5').then(noop);
      await ticks(3); // integration enabled check, fetch teams, load default team
      expect(state?.selectedTeam?.id).toBe('0');
    });

    it('selects the first team if the default team wasn’t saved', async () => {
      slackService.addSlackTeams(...teams.slice(0, 2));
      await ticks(3); // integration enabled check, fetch teams, load default team
      expect(state?.selectedTeam?.id).toBe('0');
    });

    it('navigates to the share page if there is at least one team', async () => {
      slackService.addSlackTeams(teams[0]);
      await ticks(3); // integration enabled check, fetch teams, load default team
      expect(state?.page).toBe('share');
    });

    it('navigates to the consent primer page if there are no teams', async () => {
      await ticks(3); // integration enabled check, fetch teams, load default team
      expect(state?.page).toBe('consentPrimer');
    });

    it('indicates that teams have loaded after they’ve loaded', async () => {
      slackService.addSlackTeams(teams[0]);
      await ticks(3); // integration enabled check, fetch teams, load default team
      expect(state?.isLoadingTeams).toBe(false);
    });

    it('indicates that conversations have loaded after teams have loaded', async () => {
      slackService.addSlackTeams(teams[0]);
      await ticks(3); // integration enabled check, fetch teams, load default team
      expect(state?.isLoadingConversations).toBe(false);
    });
  });

  describe('Slack disabled form', () => {
    beforeEach(async () => {
      await setup((slackService) => slackService.disable());
    });

    it('indicates that Slack is disabled', async () => {
      await ticks(1); // integration enabled check
      expect(state?.page).toBe('slackDisabled');
    });
  });

  describe('Consent primer', () => {
    beforeEach(async () => {
      await setup();
    });

    it('opens a Slack consent popup when the user clicks OK', async () => {
      await ticks(20); // integration enabled check, fetch teams

      // Click OK button.
      model.onAddTeam();

      expect(getConsentSpy).toBeCalledTimes(1);
      expect(last(getConsentSpy.mock.calls)?.[0]).toBe('fake-consent-url');
      expect(typeof last(getConsentSpy.mock.calls)?.[1]).toBe('function');
    });

    it('loads teams when Slack consent completes successfully', async () => {
      await ticks(2); // integration enabled check, fetch teams
      model.onAddTeam();
      slackService.fireConsentSuccess(teams[0]);
      await ticks(1); // fetch teams
      expect(slackService.getTeams).toBeCalledTimes(2);
    });

    it('navigates to the share page after teams have loaded', async () => {
      await ticks(2); // integration enabled check, fetch teams
      model.onAddTeam();
      slackService.fireConsentSuccess(teams[0]);
      await ticks(2); // fetch teams, load default team
      expect(state?.page).toBe('share');
    });
  });

  describe('Share form', () => {
    beforeEach(async () => {
      await setup((slackService) => {
        slackService.addSlackTeams(...teams.slice(0, 2));
      });
      await ticks(4); // integration enabled check, fetch teams, load default team
    });

    describe('load conversations when opened', () => {
      it('fetches the selected team’s conversations', () => {
        expect(getConversationsSpy).toBeCalledTimes(1);
      });

      it('loads the expected conversations', async () => {
        await ticks(1); // fetch conversations

        const expectedTeam = conversations.get(teams[0].id)!;
        const expectedConversations = {
          channels: sortBy(expectedTeam.channels, [
            ({ name }) => name.toLowerCase(),
          ]),
          directMessages: sortBy(expectedTeam.directMessages, [
            ({ name }) => name.toLowerCase(),
          ]),
        };

        expect(state?.conversations).toEqual(expectedConversations);
      });

      it('selects the first conversation', async () => {
        await ticks(1);
        expect(state?.selectedConversation).toEqual(
          conversations.get(teams[0].id)!.channels[0],
        );
      });
    });

    describe('select team', () => {
      beforeEach(async () => {
        await ticks(1); // fetch conversations
        model.onChangeSelectedTeam(teams[1]);
        await ticks(2); // fetch conversations (again)
      });

      it('fetches the selected team’s conversations', () => {
        expect(getConversationsSpy).toBeCalledTimes(2);
      });

      it('loads the expected conversations', async () => {
        const expectedTeam = conversations.get(teams[1].id)!;
        const expectedConversations = {
          channels: sortBy(expectedTeam.channels, [
            ({ name }) => name.toLowerCase(),
          ]),
          directMessages: sortBy(expectedTeam.directMessages, [
            ({ name }) => name.toLowerCase(),
          ]),
        };

        expect(state?.conversations).toEqual(expectedConversations);
      });

      it('selects the first conversation', async () => {
        await ticks(1);
        expect(state?.selectedConversation).toEqual(
          conversations.get(teams[1].id)!.channels[0],
        );
      });
    });

    // Add new team via share dialog
    describe('add new team', () => {
      beforeEach(async () => {
        await ticks(1); // fetch conversations
        model.onAddTeam();
      });

      it('requests Slack consent', () => {
        expect(getConsentSpy).toBeCalledTimes(1);
        expect(last(getConsentSpy.mock.calls)?.[0]).toBe('fake-consent-url');
        expect(typeof last(getConsentSpy.mock.calls)?.[1]).toBe('function');
      });

      it('remains on the share page', () => {
        expect(state?.page).toBe('share');
      });

      describe('Slack consent success', () => {
        beforeEach(async () => {
          slackService.fireConsentSuccess(teams[2]);
          await ticks(2); // fetch teams, load default team
        });

        it('remains on the share page', () => {
          expect(state?.page).toBe('share');
        });

        it('loads teams', () => {
          expect(getTeamsSpy).toBeCalledTimes(2);
        });

        it('has the expected teams', () => {
          expect(state?.teams).toEqual(teams);
        });

        it('selects the new team', async () => {
          await ticks(1);
          expect(state?.selectedTeam).toEqual(teams[2]);
        });
      });
    });

    describe('click share button', () => {
      beforeEach(async () => {
        await ticks(1); // fetch conversations
        model.share({
          message: 'Bla bla',
          link:
            'https://hello.atlassian.net/wiki/spaces/FOO/pages/1234/Hello+World',
        });
      });

      it('shares the link to the Slack integration service', () => {
        expect(shareSpy).toBeCalledTimes(1);
        expect(shareSpy).toBeCalledWith({
          teamId: teams[0].id,
          conversationId: conversations.get(teams[0].id)!.channels[0].id,
          conversationType: 'public',
          link:
            'https://hello.atlassian.net/wiki/spaces/FOO/pages/1234/Hello+World',
          message: 'Bla bla',
          signal: expect.any(AbortSignal),
        });
      });

      it('indicates that the message is being shared via the Slack integration service', () => {
        expect(state?.isSharing).toBe(true);
      });

      it('waits until the message is shared successfully before closing the share dialog', () => {
        expect(state?.page).toBe('share');
      });

      it('closes the share dialog on success', async () => {
        await ticks(1);
        expect(state?.page).toBe('none');
      });

      it('shows feedback on success', async () => {
        await ticks(1);
        expect(showFeedbackMock).toBeCalledTimes(1);
        expect(showFeedbackMock).toBeCalledWith('shareSuccess');
      });
    });
  });

  describe('Errors', () => {
    describe('Error checking Slack enabled/disabled status', () => {
      beforeEach(async () => {
        await setup((slackService) => {
          slackService.errorCheckingEnabledStatus = true;
        });
        await ticks(2); // integration enabled check
      });

      it('closes the Share to Slack dialog', () => {
        expect(state?.page).toBe('none');
      });

      it('shows an error message', () => {
        expect(showFeedbackMock).toBeCalledTimes(1);
        expect(showFeedbackMock).toBeCalledWith('initError');
      });
    });

    describe('Error obtaining consent URL', () => {
      beforeEach(async () => {
        await setup((slackService) => {
          slackService.errorObtainingConsentUrl = true;
        });
        await ticks(2); // integration enabled check
      });

      it('closes the Share to Slack dialog', () => {
        expect(state?.page).toBe('none');
      });

      it('shows an error message', () => {
        expect(showFeedbackMock).toBeCalledTimes(1);
        expect(showFeedbackMock).toBeCalledWith('initError');
      });
    });

    describe('Error loading teams at start', () => {
      beforeEach(async () => {
        await setup((slackService) => {
          slackService.errorOnLoadingTeams = true;
        });
        await ticks(3); // load teams
      });

      it('proceeds to the consent primer', () => {
        expect(state?.page).toBe('consentPrimer');
      });

      it('doesn’t show an error message', () => {
        expect(showFeedbackMock).not.toBeCalled();
      });
    });

    describe('Error loading teams after adding a new workspace', () => {
      beforeEach(async () => {
        await setup((slackService) => slackService.addSlackTeams(teams[0]));
        await ticks(3); // load teams

        // Add new team
        model.onAddTeam();

        slackService.errorOnLoadingTeams = true;
        slackService.fireConsentSuccess(teams[1]);
        await ticks(1); // fetch teams
      });

      it('stays on the share screen', () => {
        expect(state?.page).toBe('share');
      });

      it('shows an error message', () => {
        expect(showFeedbackMock).toBeCalledTimes(1);
        expect(showFeedbackMock).toBeCalledWith('errorLoadingTeams');
      });
    });

    describe('Error sharing', () => {
      beforeEach(async () => {
        await setup((slackService) => slackService.addSlackTeams(teams[0]));
        await ticks(3); // load teams

        slackService.errorOnShare = true;
        model.share({ link: 'https://example.com/home', message: '' });
        await ticks(1); // share
      });

      it('stays on the share screen', () => {
        expect(state?.page).toBe('share');
      });

      it('shows an error message', () => {
        expect(showFeedbackMock).toBeCalledTimes(1);
        expect(showFeedbackMock).toBeCalledWith('shareError');
      });
    });
  });
});
