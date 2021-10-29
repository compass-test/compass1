import type { SlackConversations, SlackTeam } from '../../src/common/types';

import slackConversationsData from './slack-conversations-data.json';
import slackWorkspacesData from './slack-workspaces-data.json';

export const teams = slackWorkspacesData.teams as SlackTeam[];

export const conversations = new Map(
  teams.map(({ id }, index) => [
    id,
    {
      channels: slackConversationsData.channels.slice(index, index + 2),
      directMessages: slackConversationsData.dms.slice(
        index * 25,
        (index + 1) * 25,
      ),
    } as SlackConversations,
  ]),
);
