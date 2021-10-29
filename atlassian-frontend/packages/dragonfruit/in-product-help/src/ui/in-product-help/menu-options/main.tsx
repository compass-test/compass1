import React from 'react';

import CommentIcon from '@atlaskit/icon/glyph/comment';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import FeedbackIcon from '@atlaskit/icon/glyph/feedback';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import * as colors from '@atlaskit/theme/colors';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

const COMMUNITY_LINK =
  'https://community.atlassian.com/t5/Compass-Alpha/cmp-p/grouphub%3Acompass-alpha';
const STATUSPAGE_LINK = 'http://compass.status.atlassian.com/';
const DAC_LINK = 'https://developer.atlassian.com/cloud/compass/';

const readHelpArticles = (text: string) => {
  return {
    id: 'read-help-articles',
    text: text,
    href: DAC_LINK,
    icon: <DocumentsIcon primaryColor={colors.N600} size="medium" label="" />,
  };
};

const askTheCommunity = (text: string) => {
  return {
    id: 'ask-the-community',
    text: text,
    href: COMMUNITY_LINK,
    icon: <CommentIcon primaryColor={colors.N600} size="medium" label="" />,
  };
};

const statusPage = (text: string) => {
  return {
    id: 'status-page',
    text: `Status page`,
    href: STATUSPAGE_LINK,
    icon: <WarningIcon primaryColor={colors.N600} size="medium" label="" />,
  };
};

const giveFeedback = ({ onClick }: { onClick: () => void }, text: string) => {
  return {
    id: 'give-feedback',
    onClick: onClick,
    text: `Give feedback`,
    icon: <FeedbackIcon primaryColor={colors.N600} size="medium" label="" />,
  };
};

export const HomeOptions = ({
  openFeedbackModal,
}: {
  openFeedbackModal: () => void;
}) => {
  const { formatMessage } = useIntl();
  return [
    readHelpArticles(formatMessage(messages.readHelpArticlesLink)),
    askTheCommunity(formatMessage(messages.askCommunityLink)),
    giveFeedback(
      { onClick: openFeedbackModal },
      formatMessage(messages.giveFeedbackLink),
    ),
    statusPage(formatMessage(messages.statuspageArticlesLink)),
  ];
};
