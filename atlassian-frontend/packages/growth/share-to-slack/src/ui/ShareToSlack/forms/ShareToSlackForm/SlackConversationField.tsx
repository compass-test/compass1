import React, { useCallback, useMemo } from 'react';

import { ErrorMessage, Field, FieldProps } from '@atlaskit/form';
import AsyncSelect, { createFilter, ValueType } from '@atlaskit/select';

import {
  useSlackConversationSelectClickedEvent,
  useSlackConversationSelectedEvent,
} from '../../../../common/analytics';
import type {
  SlackChannel,
  SlackConversation,
  SlackConversations,
  SlackUser,
} from '../../../../common/types';
import useFormattedMessage from '../../../../common/useFormattedMessage';

import ChannelLabel from './ChannelLabel';
import validateRequired, { REQUIRED } from './validateRequired';

function channelToValue(channel: SlackChannel) {
  return {
    value: channel.id,
    type: channel.type,
    conversation: channel,
  };
}

function directMessageToValue(directMessage: SlackUser) {
  return {
    value: directMessage.id,
    type: directMessage.type,
    conversation: directMessage,
  };
}

type Value =
  | ReturnType<typeof channelToValue>
  | ReturnType<typeof directMessageToValue>;

function formatChannel({ name }: SlackChannel) {
  return `#${name}`;
}

function formatUser({ name, displayName }: SlackUser) {
  return displayName ? `${name} (@${displayName})` : name;
}

function channelToOption(channel: SlackChannel) {
  return {
    value: channel.id,
    label: formatChannel(channel),
    type: channel.type,
    conversation: channel,
  };
}

function userToOption(user: SlackUser) {
  return {
    value: user.id,
    label: formatUser(user),
    type: user.type,
    conversation: user,
  };
}

type Props = {
  isLoading: boolean;
  canShare: boolean;
  conversations?: SlackConversations;
  selectedConversation?: SlackChannel | SlackUser;
  onChangeSelectedConversation: (conversation: SlackConversation) => void;
};

export default function SlackConversationField({
  isLoading,
  canShare,
  conversations,
  selectedConversation,
  onChangeSelectedConversation,
}: Props) {
  const channelsLabel = useFormattedMessage('conversationChannelsLabel');
  const usersLabel = useFormattedMessage('conversationUsersLabel');
  const conversationOptions = useMemo(
    () =>
      conversations
        ? [
            {
              label: channelsLabel,
              options: conversations.channels.map(channelToOption),
            },
            {
              label: usersLabel,
              options: conversations.directMessages.map(userToOption),
            },
          ]
        : [],
    [channelsLabel, conversations, usersLabel],
  );

  const conversationPlaceholder = useFormattedMessage(
    'conversationPlaceholder',
  );
  const errorMessage = useFormattedMessage('conversationRequired');

  const value = useMemo(() => {
    if (!selectedConversation) {
      return undefined;
    }

    if (
      selectedConversation.type === 'public' ||
      selectedConversation.type === 'private'
    ) {
      return channelToValue(selectedConversation);
    }

    if (selectedConversation.type === 'directMessage') {
      return directMessageToValue(selectedConversation);
    }

    return undefined;
  }, [selectedConversation]);

  // Analytics
  const fireConversationSelectOpenedEvent = useSlackConversationSelectClickedEvent();
  const fireConversationSelectedEvent = useSlackConversationSelectedEvent();

  const formatOptionLabel = useCallback(
    (option: Value) =>
      option.type === 'directMessage' ? (
        formatUser(option.conversation)
      ) : (
        <ChannelLabel channel={option.conversation} />
      ),
    [],
  );

  const getOptionValue = useCallback(
    (option: Value) =>
      option.type === 'directMessage'
        ? formatUser(option.conversation)
        : formatChannel(option.conversation),
    [],
  );

  function changeHandler(fieldProps: FieldProps<ValueType<Value>>) {
    return (newOption: ValueType<Value>) => {
      if (newOption && !Array.isArray(newOption)) {
        fieldProps.onChange(newOption);

        const baseConversation = {
          id: newOption.value,
          name: newOption.conversation.name,
          type: newOption.type,
        };

        fireConversationSelectedEvent(newOption.type);

        onChangeSelectedConversation(
          newOption.type === 'directMessage'
            ? {
                ...baseConversation,
                displayName: newOption.conversation.displayName,
                avatarUrl: newOption.conversation.avatarUrl,
              }
            : (baseConversation as SlackChannel),
        );
      } else if (!newOption) {
        fieldProps.onChange(null);
      }
    };
  }

  return (
    <Field<ValueType<Value>>
      name="conversation"
      validate={validateRequired}
      isRequired
      defaultValue={value}
    >
      {({ fieldProps, meta: { valid }, error }) => (
        <div data-testid="share-to-slack-conversations">
          <AsyncSelect<Value>
            {...fieldProps}
            getOptionValue={getOptionValue}
            formatOptionLabel={formatOptionLabel}
            onMenuOpen={fireConversationSelectOpenedEvent}
            maxMenuHeight={150}
            placeholder={conversationPlaceholder}
            filterOption={createFilter({ ignoreAccents: false })}
            spacing="compact"
            options={conversationOptions}
            isLoading={isLoading}
            isDisabled={!canShare}
            value={value}
            onChange={changeHandler(fieldProps)}
          />
          {!valid && error === REQUIRED && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
        </div>
      )}
    </Field>
  );
}
