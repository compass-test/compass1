import React, { useCallback, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import Button from '@atlaskit/button';
import Form from '@atlaskit/form';
import LinkFilledIcon from '@atlaskit/icon/glyph/link-filled';
import { AsyncSelect, ValueType } from '@atlaskit/select';

import {
  useCopyLinkButtonClickedEvent,
  useShareButtonClickedEvent,
} from '../../../../common/analytics';
import skipIfJsdom from '../../../../common/skipIfJsdom';
import type {
  AtlassianProduct,
  Conversation,
  MessageKey,
  ShareToSlackActions,
  ShareToSlackState,
} from '../../../../common/types';
import useFormattedMessage from '../../../../common/useFormattedMessage';
import useFeedback from '../../useFeedback';

import MessageField from './MessageField';
import SlackConversationField from './SlackConversationField';
import SlackTeamField from './SlackTeamField';
import type Team from './Team';

const StyledForm: React.ComponentType<React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>> = styled.form`
  display: grid;
  grid-gap: 16px;
  padding: 2px 24px;
`;

const Heading = styled.h4`
  margin: 0;
  padding: 16px 0 8px;
  font-size: 16px;
  font-weight: 500;
`;

const Buttons = styled.div`
  display: flex;
  padding: 16px 0;
  justify-content: space-between;
`;

const headingKey: { [key in AtlassianProduct]: MessageKey } = {
  jira: 'shareFormTitleJira',
  confluence: 'shareFormTitleConfluence',
};

type SlackContentState = {
  team: ValueType<Team>;
  conversation: ValueType<Conversation>;
  comment?: string;
};

export type ShareToSlackFormProps = ShareToSlackActions &
  Omit<ShareToSlackState, 'page'> & {
    className?: string;
    product: AtlassianProduct;
  };

export default function ShareToSlackForm({
  className,
  product,
  teams,
  selectedTeam,
  onChangeSelectedTeam,
  onAddTeam,
  isLoadingConversations,
  conversations,
  selectedConversation,
  onChangeSelectedConversation,
  share,
  isSharing,
}: ShareToSlackFormProps) {
  const [message, setMessage] = useState('');
  const canShare = !!(selectedTeam && selectedConversation) && !isSharing;
  const showFeedback = useFeedback();

  // Analytics
  const fireCopyLinkButtonClickedEvent = useCopyLinkButtonClickedEvent();
  const fireShareButtonClickedEvent = useShareButtonClickedEvent();

  const onClickCopy = useCallback(async () => {
    fireCopyLinkButtonClickedEvent();
    await navigator.clipboard.writeText(window.location.href);
    showFeedback('copySuccess');
  }, [fireCopyLinkButtonClickedEvent, showFeedback]);

  const onSubmit = useCallback(() => {
    fireShareButtonClickedEvent();
    share({ link: window.location.href, message });
  }, [fireShareButtonClickedEvent, message, share]);

  const heading = useFormattedMessage(headingKey[product]);
  const copyLinkButton = useFormattedMessage('copyLinkButton');
  const submitButton = useFormattedMessage('submitButton');

  // Auto-focus the slack team select so *something* in this form is focused,
  // otherwise the page could arbitrarily scroll to some other element.
  const slackTeamSelectRef = useRef<typeof AsyncSelect>(null);
  useEffect(() => {
    // Skipping this in jsdom tests until I can figure out how to make the focused drop-down open in tests.
    skipIfJsdom(() => {
      // focus() is an internal detail of AtlaskitSelect
      (slackTeamSelectRef.current as { focus?: () => void } | null)?.focus?.();
    });
  }, []);

  return (
    <Form<SlackContentState> onSubmit={onSubmit}>
      {({ formProps }) => (
        <StyledForm
          {...formProps}
          data-testid="share-to-slack-share"
          className={className}
        >
          <Heading>{heading}</Heading>

          <SlackTeamField
            ref={slackTeamSelectRef}
            canShare={canShare}
            teams={teams}
            selectedTeam={selectedTeam}
            onChangeSelectedTeam={onChangeSelectedTeam}
            onAddTeam={onAddTeam}
          />

          <SlackConversationField
            isLoading={isLoadingConversations}
            canShare={canShare}
            conversations={conversations}
            selectedConversation={selectedConversation}
            onChangeSelectedConversation={onChangeSelectedConversation}
          />

          <MessageField
            canShare={canShare}
            message={message}
            onChangeMessage={setMessage}
          />

          <Buttons>
            <Button
              type="button"
              appearance="subtle-link"
              isDisabled={isSharing || !canShare}
              iconBefore={
                <LinkFilledIcon label={copyLinkButton} size="medium" />
              }
              onClick={onClickCopy}
            >
              {copyLinkButton}
            </Button>

            <Button
              type="submit"
              appearance="primary"
              isDisabled={isSharing || !canShare}
            >
              {submitButton}
            </Button>
          </Buttons>
        </StyledForm>
      )}
    </Form>
  );
}
