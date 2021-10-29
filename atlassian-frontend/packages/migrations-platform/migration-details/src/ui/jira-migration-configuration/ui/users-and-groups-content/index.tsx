import React, { FC, ReactNode } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { UsersAndGroupsConfig } from '../../../../common/types';

import messages from './messages';

type Props = {
  usersAndGroupsConfig: UsersAndGroupsConfig;
};

const getModeMessage = (
  usersAndGroupsConfig: UsersAndGroupsConfig,
): FormattedMessage.MessageDescriptor => {
  const {
    mode,
    includeRoleActors,
    includeUsersInGroups,
  } = usersAndGroupsConfig;

  if (mode === 'All') {
    return messages.allUsersAndGroups;
  }

  if (includeRoleActors || includeUsersInGroups) {
    return messages.referencedUsersAndGroupsWithOptions;
  }

  return messages.referencedUsersAndGroups;
};

const getReferencedOptionsMessages = (
  includeRoleActors?: boolean,
  includeUsersInGroups?: boolean,
): FormattedMessage.MessageDescriptor[] => {
  const referencedOptionsMessages: FormattedMessage.MessageDescriptor[] = [];
  if (includeRoleActors) {
    referencedOptionsMessages.push(messages.includeRoleActors);
  }

  if (includeUsersInGroups) {
    referencedOptionsMessages.push(messages.includeUsersInGroups);
  }

  return referencedOptionsMessages;
};

const UsersAndGroupsContent: FC<InjectedIntlProps & Props> = ({
  usersAndGroupsConfig,
  intl,
}) => {
  const { includeRoleActors, includeUsersInGroups } = usersAndGroupsConfig;
  const usersAndGroupsContent: ReactNode[] = [
    intl.formatMessage(getModeMessage(usersAndGroupsConfig)),
  ];
  const referencedOptionsMessages = getReferencedOptionsMessages(
    includeRoleActors,
    includeUsersInGroups,
  );

  if (referencedOptionsMessages.length > 0) {
    usersAndGroupsContent.push(
      <ul key="referencedOptionsList">
        {referencedOptionsMessages.map((message, ix) => (
          <li key={ix}>{intl.formatMessage(message)}</li>
        ))}
      </ul>,
    );
  }

  return <>{usersAndGroupsContent}</>;
};

export default injectIntl(UsersAndGroupsContent);
