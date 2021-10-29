import SlackClient from './notifications/slack/client';

/**
 * Test out sending slack notifications into a dedicated channel.
 *
 * Note: this script exists purely for debugging purposes.
 * It will send the messages into #releases-bot-test.
 * Use this to test when changing the message formatting/wording.
 */
const main = async () => {
  const slackClient = new SlackClient();
  const useTestChannel = true;
  await slackClient.sendDeploymentNotification('OPERATIONAL', useTestChannel);
  await slackClient.sendDeploymentNotification('BROKEN', useTestChannel);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
