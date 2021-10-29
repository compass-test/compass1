import { ReactNode } from 'react';

import type OriginTracer from '@atlassiansox/origin-tracing';

export type AtlassianProduct = 'jira' | 'confluence';

export type Environment = 'prod' | 'staging';

import type { FlagProps } from '@atlaskit/flag';

export type Flag = Pick<FlagProps, 'title' | 'description'> & {
  type: Extract<FlagProps['appearance'], 'success' | 'error'>;
};

export type FlagAPI = {
  showFlag: (flag: Flag) => void;
};

export type Feedback =
  | 'initError'
  | 'errorLoadingTeams'
  | 'errorLoadingConversations'
  | 'copySuccess'
  | 'shareSuccess'
  | 'shareError';

export type FailureResult = {
  ok: false;
  aborted: false;
  status: number;
  code: string;
  message: string;
};

export type AbortedResult = {
  ok: false;
  aborted: true;
};

export type SuccessResult<RESULT> = {
  ok: true;
  result: RESULT;
};

export type Result<PAYLOAD> =
  | SuccessResult<PAYLOAD>
  | FailureResult
  | AbortedResult;

export type IsSlackEnabledResult = Result<boolean>;

export type GetSlackConsentUrlResult = Result<string>;

export type GetSlackTeamsResult = Result<SlackTeam[]>;

export type GetSlackChannelsResult = Result<SlackChannel[]>;

export type GetSlackUsersResult = Result<SlackUser[]>;

export type GetSlackConversationsResult = Result<SlackConversations>;

export type ShareToSlackResult = Result<OriginTracer>;

export type Conversation = {
  label: ReactNode;
  value: string;
};

export type SlackTeamsServiceResponse = {
  teams: SlackTeam[];
  nextCursor?: string;
};

export type ChannelAndUser = {
  value: string;
  label: string;
};

export type SlackConversationsResponse = Array<{
  label: string;
  options: ChannelAndUser[];
}>;

export type SlackConversations = {
  channels: SlackChannel[];
  directMessages: SlackUser[];
};

export type SlackChannelsResponse = {
  channels: SlackChannel[];
  nextCursor?: string;
};

export type SlackUsersResponse = {
  recipients: SlackUser[];
  nextCursor?: string;
};

export type SlackChannel = {
  id: string;
  name: string;
  type: 'public' | 'private';
};

export type SlackUser = {
  id: string;
  name: string;
  displayName: string;
  avatarUrl: string;
  type: 'directMessage';
};

export type SlackConversation = SlackChannel | SlackUser;

export type SlackTeam = {
  id: string;
  name: string;
  avatar: string;
};

// i18n

type Message = {
  id: string;
  defaultMessage: string;
  description: string;
};

export type MessageKey =
  | 'shareFormTitleJira'
  | 'shareFormTitleConfluence'
  | 'consentPrimerHeadingJira'
  | 'consentPrimerHeadingConfluence'
  | 'consentPrimerMessageJira'
  | 'consentPrimerMessageConfluence'
  | 'consentPrimerSubmitButtonJira'
  | 'consentPrimerSubmitButtonConfluence'
  | 'consentPrimerCancelButton'
  | 'teamPlaceholder'
  | 'addNewTeamOption'
  | 'teamRequired'
  | 'conversationPlaceholder'
  | 'conversationChannelsLabel'
  | 'conversationUsersLabel'
  | 'conversationRequired'
  | 'messagePlaceholder'
  | 'copyLinkButton'
  | 'submitButton'
  | 'slackDisabledHeadingJira'
  | 'slackDisabledHeadingConfluence'
  | 'slackDisabledMessageJira'
  | 'slackDisabledMessageConfluence'
  | 'slackDisabledCloseButton'
  | 'successFeedbackTitle'
  | 'errorFeedbackTitle'
  | 'initErrorFeedback'
  | 'errorLoadingTeamsFeedback'
  | 'errorLoadingConversationsFeedback'
  | 'copySuccessFeedback'
  | 'shareSuccessFeedback'
  | 'shareErrorFeedback'
  | 'publicChannelLabel'
  | 'privateChannelLabel';

export type Messages = {
  [key in MessageKey]: Message;
};

export type GetSlackConversationsRequest = {
  /**
   * The Slack team's ID
   */
  teamId: string;
};

export type ShareToSlackRequest = {
  /**
   * The Slack team's ID
   */
  teamId: string;

  /**
   * ID of the Slack conversation to share to
   */
  conversationId: string;

  /**
   * Type of Slack conversation to share to
   */
  conversationType: SlackChannel['type'] | SlackUser['type'];

  /**
   * Link to share
   */
  link: string;

  /**
   * Message to include with the link
   */
  message: string;
};

export type SlackConsentParams = {
  url: string;
  onSuccess: () => void;
};

export type SlackConsentUrlParams = {
  product: AtlassianProduct;
  location: Pick<Location, 'hostname' | 'pathname'>;
};

export type Page =
  | 'none'
  | 'loading'
  | 'consentPrimer'
  | 'slackDisabled'
  | 'share';

export type ShareToSlackState = {
  page: Page;
  isLoadingTeams: boolean;
  teams: SlackTeam[] | undefined;
  selectedTeam: SlackTeam | undefined;
  isLoadingConversations: boolean;
  conversations: SlackConversations | undefined;
  selectedConversation: SlackChannel | SlackUser | undefined;
  isSharing: boolean;
};

export type ShareToSlackActions = {
  onAddTeam: () => void;
  onChangeSelectedTeam: (team: SlackTeam) => void;
  onChangeSelectedConversation: (
    conversation: SlackChannel | SlackUser,
  ) => void;
  share: ({ link, message }: { link: string; message: string }) => void;
};
