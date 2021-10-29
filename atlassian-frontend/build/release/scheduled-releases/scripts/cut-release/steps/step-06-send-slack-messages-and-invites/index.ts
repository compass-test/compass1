import chalk from 'chalk';

import { stripAuthors, stripTeams } from '../../utils';
import { logger } from '../../index';
import { StepSendMessages } from './types';

export const sendMessagesAndInvites: StepSendMessages = async (
  { currRelease, authors, teams, client },
  { dev },
) => {
  logger.start('#️⃣ Creating Slack channel');
  const channel = await client.createChannel(currRelease);
  const channelLink = chalk.underline(channel.url);
  logger.finish(`✅ Slack channel created! Check ${channelLink}`);

  const allAuthors = dev ? stripAuthors(authors) : authors;
  const allTeams = dev ? stripTeams(teams) : teams;

  logger.start(`💳 Inviting all commit authors in release`);
  await client.inviteUsers(channel, allAuthors);
  logger.start(`💬 Sending message to all commit authors in release`);
  await client.messageUsers(currRelease, channel, allAuthors);
  logger.start(`💬 Sending message to all teams in release`);
  await client.messageTeams(currRelease, channel, allTeams);
  logger.finish(`✅ Messages sent! Go and poke more people!`);
  return channel;
};
