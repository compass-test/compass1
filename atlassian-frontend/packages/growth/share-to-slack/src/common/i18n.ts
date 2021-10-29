import { defineMessages } from 'react-intl';

import type { Messages } from './types';

export const messages = defineMessages<Messages>({
  shareFormTitleJira: {
    id: 'share-to-slack.form.title.jira',
    defaultMessage: 'Share',
    description: 'Share to Slack form title - Jira',
  },
  shareFormTitleConfluence: {
    id: 'share-to-slack.form.title.confluence',
    defaultMessage: 'Share page',
    description: 'Share to Slack form title - Confluence',
  },
  teamPlaceholder: {
    id: 'share-to-slack.form.team.placeholder',
    defaultMessage: 'Slack workspace…',
    description: 'Slack team selection placeholder',
  },
  addNewTeamOption: {
    id: 'share-to-slack.form.team.add-new-team',
    defaultMessage: 'Add new workspace',
    description: 'Slack team option - add new team',
  },
  teamRequired: {
    id: 'share-to-slack.form.team.validation.required',
    defaultMessage: 'Select a person or channel.',
    description:
      'Required error message for the channel picker field in Share to Slack form.',
  },
  conversationPlaceholder: {
    id: 'share-to-slack.form.conversation.placeholder',
    defaultMessage: 'Person or channel…',
    description: 'Slack conversation selection placeholder',
  },
  conversationChannelsLabel: {
    id: 'share-to-slack.form.conversation.channels-label',
    defaultMessage: 'Channels',
    description: 'Slack conversations selector - channels label',
  },
  conversationUsersLabel: {
    id: 'share-to-slack.form.conversation.users-label',
    defaultMessage: 'Direct messages',
    description: 'Slack conversations selector - users label',
  },
  consentPrimerHeadingJira: {
    id: 'share-to-slack.form.consent-primer.heading.jira',
    defaultMessage: 'Connect Jira to Slack',
    description: 'Consent primer heading - Confluence',
  },
  consentPrimerHeadingConfluence: {
    id: 'share-to-slack.form.consent-primer.heading.confluence',
    defaultMessage: 'Connect Confluence to Slack',
    description: 'Consent primer heading - Jira',
  },
  consentPrimerMessageJira: {
    id: 'share-to-slack.form.consent-primer.message.jira',
    defaultMessage:
      'Unlock your team’s ability to collaborate by sharing Jira issues on Slack channels.',
    description: 'Consent primer message - Jira',
  },
  consentPrimerMessageConfluence: {
    id: 'share-to-slack.form.consent-primer.message.confluence',
    defaultMessage:
      'Unlock your team’s ability to collaborate by sharing Confluence pages on Slack channels.',
    description: 'Consent primer message - Confluence',
  },
  consentPrimerSubmitButtonJira: {
    id: 'share-to-slack.form.consent-primer.submit.jira',
    defaultMessage: 'Connect Jira to Slack',
    description: 'Consent primer submit button - Jira',
  },
  consentPrimerSubmitButtonConfluence: {
    id: 'share-to-slack.form.consent-primer.submit.confluence',
    defaultMessage: 'Connect Confluence to Slack',
    description: 'Consent primer submit button - Confluence',
  },
  consentPrimerCancelButton: {
    id: 'share-to-slack.form.consent-primer.cancel',
    defaultMessage: 'Not now',
    description: 'Consent primer cancel button',
  },
  conversationRequired: {
    id: 'share-to-slack.form.conversation.validation.required',
    defaultMessage: 'Select a Slack workspace.',
    description:
      'Required error message for the team picker field in Share to Slack form.',
  },
  messagePlaceholder: {
    id: 'share-to-slack.comment.placeholder',
    defaultMessage: 'Add a message…',
    description: 'Placeholder for optional message',
  },
  copyLinkButton: {
    id: 'share-to-slack.form.button.copy-link',
    defaultMessage: 'Copy link',
    description: 'Copy link button text',
  },
  submitButton: {
    id: 'share-to-slack.form.button.submit',
    defaultMessage: 'Share to Slack',
    description: 'Submit button text',
  },
  slackDisabledHeadingJira: {
    id: 'slack-disabled.form.heading.jira',
    defaultMessage: 'Jira Cloud for Slack is disabled',
    description: 'Slack disabled heading heading',
  },
  slackDisabledHeadingConfluence: {
    id: 'slack-disabled.form.heading.confluence',
    defaultMessage: 'Confluence Cloud for Slack is disabled',
    description: 'Slack integration disabled - heading',
  },
  slackDisabledMessageJira: {
    id: 'slack-disabled.form.message.jira',
    defaultMessage:
      'Please ask your site admin to enable Jira Cloud for Slack.',
    description: 'Slack integration disabled - message',
  },
  slackDisabledMessageConfluence: {
    id: 'slack-disabled.form.message.confluence',
    defaultMessage:
      'Please ask your site admin to enable Confluence Cloud for Slack.',
    description: 'Slack integration disabled - message',
  },
  slackDisabledCloseButton: {
    id: 'slack-disabled.form.close-button',
    defaultMessage: 'Close',
    description: 'Slack integration disabled - close button text',
  },
  successFeedbackTitle: {
    id: 'share-to-slack.feedback.success-title',
    defaultMessage: 'Success',
    description: 'Feedback: Success title',
  },
  errorFeedbackTitle: {
    id: 'share-to-slack.feedback.error-title',
    defaultMessage: 'An error occurred',
    description: 'Feedback: Error title',
  },
  initErrorFeedback: {
    id: 'share-to-slack.initialize.feedback.error',
    defaultMessage: 'Couldn’t initialize Slack integration.',
    description:
      'Feedback: Error when checking that Slack is enabled or obtaining a JWT from Connect',
  },
  errorLoadingTeamsFeedback: {
    id: 'share-to-slack.feedback.error-loading-teams',
    defaultMessage: 'Couldn’t load Slack teams.',
    description: 'Feedback: Error loading Slack teams',
  },
  errorLoadingConversationsFeedback: {
    id: 'share-to-slack.feedback.error-loading-conversations',
    defaultMessage: 'Couldn’t load Slack conversations.',
    description: 'Feedback: Error loading Slack teams',
  },
  copySuccessFeedback: {
    id: 'share-to-slack.feedback.copy-success',
    defaultMessage: 'Link copied to clipboard',
    description: 'Feedback: Successfully copied link to Clipboard',
  },
  shareSuccessFeedback: {
    id: 'share-to-slack.feedback.share-success',
    defaultMessage: 'Page shared successfully',
    description: 'Feedback: Page shared to Slack successfully',
  },
  shareErrorFeedback: {
    id: 'share-to-slack.feedback.share-error',
    defaultMessage: 'Couldn’t share this page to Slack.',
    description: 'Feedback: Error sharing page to Slack',
  },
  publicChannelLabel: {
    id: 'share-to-slack.form.channel.public.label',
    defaultMessage: 'Public channel',
    description: 'Public channel icon label',
  },
  privateChannelLabel: {
    id: 'share-to-slack.form.channel.private.label',
    defaultMessage: 'Private channel',
    description: 'Private channel icon label',
  },
});
