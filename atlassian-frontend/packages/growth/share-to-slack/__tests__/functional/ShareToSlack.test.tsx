import React from 'react';

import {
  act,
  cleanup,
  findByTestId,
  findByText,
  render,
} from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { AnalyticsListener } from '@atlaskit/analytics-next';

import DefaultFlagsProvider from '../../helpers/DefaultFlagsProvider';
import { AtlassianProduct } from '../../src/common/types';
import ShareToSlack from '../../src/ui/ShareToSlack/ShareToSlack';
import { conversations, teams } from '../common/_slack-test-data';
import TestSlackService from '../common/_TestSlackService';
import {
  getChannels,
  getDirectMessages,
  openConversationSelectMenu,
  openTeamSelectMenu,
  ticks,
} from '../common/_util';

describe('ShareToSlack', () => {
  const analyticsEventPayloads: Record<string, unknown>[] = [];
  const mockOnClose = jest.fn();
  let slackService: TestSlackService;
  let getConsentSpy: jest.SpyInstance<void, [string, () => void]>;
  let container: HTMLElement;

  function renderShareToSlack(product: AtlassianProduct) {
    const { container } = render(
      <AnalyticsListener
        channel="growth"
        onEvent={(event) => analyticsEventPayloads.push(event.payload)}
      >
        <IntlProvider locale="en">
          <DefaultFlagsProvider>
            {(showFlag) => (
              <ShareToSlack
                showFlag={showFlag}
                product={product}
                createSlackService={() => slackService}
                channel="growth"
                onClose={mockOnClose}
              />
            )}
          </DefaultFlagsProvider>
        </IntlProvider>
      </AnalyticsListener>,
    );

    return container;
  }

  beforeEach(() => {
    slackService = new TestSlackService();
    getConsentSpy = jest.spyOn(slackService, 'getConsent');
  });

  afterEach(() => {
    cleanup();
    mockOnClose.mockReset();
    getConsentSpy?.mockRestore();
    analyticsEventPayloads.length = 0;
  });

  describe('Disabled', () => {
    beforeEach(() => {
      slackService.disable();
      container = renderShareToSlack('jira');
    });

    it('initially shows the loader', async () => {
      expect(await findByTestId(container, 'share-to-slack-loading')).not.toBe(
        null,
      );
    });

    it('shows the disabled dialog after loading', async () => {
      expect(await findByTestId(container, 'share-to-slack-disabled')).not.toBe(
        null,
      );
    });

    describe('click the close button', () => {
      beforeEach(async () => {
        const closeButton = await findByTestId(
          container,
          'share-to-slack-disabled__close',
        );
        act(() => void closeButton.click());
      });

      it('closes the disabled dialog upon clicking the close button', async () => {
        expect(mockOnClose).toBeCalledTimes(1);
      });
    });
  });

  describe('Consent primer', () => {
    beforeEach(() => {
      container = renderShareToSlack('jira');
    });

    it('initially shows the loader', async () => {
      expect(await findByTestId(container, 'share-to-slack-loading')).not.toBe(
        null,
      );
    });

    it('shows the consent primer after loading', async () => {
      expect(await findByTestId(container, 'share-to-slack-primer')).not.toBe(
        null,
      );
    });

    describe('click the close button', () => {
      beforeEach(async () => {
        const closeButton = await findByTestId(
          container,
          'share-to-slack-primer__cancel',
        );
        act(() => void closeButton.click());
      });

      it('closes the consent primer upon clicking the close button', async () => {
        expect(mockOnClose).toBeCalledTimes(1);
      });

      it('doesn’t show the Slack consent popup', () => {
        expect(getConsentSpy).not.toBeCalled();
      });
    });

    describe('click the OK button', () => {
      beforeEach(async () => {
        const okButton = await findByTestId(
          container,
          'share-to-slack-primer__submit',
        );

        act(() => void okButton.click());
      });

      it('shows the Slack consent popup', () => {
        expect(getConsentSpy).toBeCalledTimes(1);
      });

      describe('Slack consent success', () => {
        beforeEach(async () => {
          slackService.fireConsentSuccess(teams[0]);
        });

        it('proceeds to the Share dialog', async () => {
          expect(
            await findByTestId(container, 'share-to-slack-share'),
          ).not.toBe(null);
        });
      });
    });
  });

  describe('Already has connected teams', () => {
    beforeEach(async () => {
      slackService.addSlackTeams(teams[0]);
      container = renderShareToSlack('jira');
    });

    it('initially shows the loader', async () => {
      expect(await findByTestId(container, 'share-to-slack-loading')).not.toBe(
        null,
      );
    });

    it('proceeds to the Share dialog', async () => {
      expect(await findByTestId(container, 'share-to-slack-share')).not.toBe(
        null,
      );
    });
  });

  describe('Share', () => {
    beforeEach(async () => {
      slackService.addSlackTeams(...teams.slice(0, 2));
      container = renderShareToSlack('jira');
      await findByTestId(container, 'share-to-slack-share');
    });

    describe('available teams', () => {
      let teamsMenu: HTMLElement;

      beforeEach(async () => {
        teamsMenu = await openTeamSelectMenu(container);
      });

      it('makes the expected teams available for selection', async () => {
        expect(await findByText(teamsMenu, 'Team 1')).not.toBe(null);
        expect(await findByText(teamsMenu, 'Team 2')).not.toBe(null);
      });
    });

    describe('available conversations', () => {
      let conversationsMenu: HTMLElement;

      beforeEach(async () => {
        conversationsMenu = await openConversationSelectMenu(container);
      });

      it('has a channels group', async () => {
        expect(await findByText(conversationsMenu, 'Channels')).not.toBe(null);
      });

      it('includes the expected channels', async () => {
        expect(await getChannels(conversationsMenu)).toEqual(
          conversations.get(teams[0].id)!.channels.map(({ name }) => name),
        );
      });

      it('has a direct messages group', async () => {
        expect(await findByText(conversationsMenu, 'Direct messages')).not.toBe(
          null,
        );
      });

      it('includes the expected direct messages', async () => {
        expect(await getDirectMessages(conversationsMenu)).toEqual(
          conversations
            .get(teams[0].id)!
            .directMessages.map(({ name, displayName }) =>
              displayName ? `${name} (@${displayName})` : name,
            ),
        );
      });
    });

    // TODO: Fix test (select not opening)
    describe.skip('select another team', () => {
      let conversationsMenu: HTMLElement;

      beforeEach(async () => {
        const teamsMenu = await openTeamSelectMenu(container);
        const team2Option = await findByText(teamsMenu, 'Team 2');

        act(() => {
          team2Option.click();
        });

        await ticks(1);
        conversationsMenu = await openConversationSelectMenu(container);
        await ticks(10);
      });

      it('loads the selected team’s channels', async () => {
        expect(await getChannels(conversationsMenu)).toEqual(
          conversations.get(teams[1].id)!.channels.map(({ name }) => name),
        );
      });

      it('loads the selected team’s direct messages', async () => {
        expect(await getDirectMessages(conversationsMenu)).toEqual(
          conversations
            .get(teams[1].id)!
            .directMessages.map(({ name, displayName }) =>
              displayName ? `${name} (@${displayName})` : name,
            ),
        );
      });
    });
  });
});
