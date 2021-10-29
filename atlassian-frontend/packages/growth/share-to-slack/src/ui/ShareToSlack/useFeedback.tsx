import { useCallback } from 'react';

import { Feedback, Flag, MessageKey } from '../../common/types';
import useMessages from '../../common/useMessages';

import useFlags from './flags/useFlags';

const feedbackMessage: Record<Feedback, MessageKey> = {
  initError: 'initErrorFeedback',
  errorLoadingTeams: 'errorLoadingTeamsFeedback',
  errorLoadingConversations: 'errorLoadingConversationsFeedback',
  copySuccess: 'copySuccessFeedback',
  shareSuccess: 'shareSuccessFeedback',
  shareError: 'shareErrorFeedback',
};

const feedbackType: Record<Feedback, Flag['type']> = {
  initError: 'error',
  errorLoadingTeams: 'error',
  errorLoadingConversations: 'error',
  copySuccess: 'success',
  shareSuccess: 'success',
  shareError: 'error',
};

const feedbackTitle: Record<Flag['type'], MessageKey> = {
  success: 'successFeedbackTitle',
  error: 'errorFeedbackTitle',
};

/**
 * Get a function that shows the specified feedback as a Flag.
 */
export default function useFeedback() {
  const formatMessage = useMessages();
  const { showFlag } = useFlags();

  return useCallback(
    (feedback: Feedback) => {
      const type = feedbackType[feedback];
      const title = formatMessage(feedbackTitle[type]);
      const description = formatMessage(feedbackMessage[feedback]);

      showFlag({ type, title, description });
    },
    [formatMessage, showFlag],
  );
}
