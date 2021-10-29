import React, { FC } from 'react';

import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';

import { UsersAndGroupsConfig, UsersAndGroupsMode } from '../../types';
import { Selection, TaskCard } from '../task-card';

import messages from './messages';

export type Props = {
  // When this is null or undefined, it means the customer has not made their selection yet
  selection?: UsersAndGroupsConfig;
  // Method to execute when customer hits Select button (when no selection yet) and Edit button (after selection has been made)
  onSelect: () => void;
  isDisabled?: boolean;
  disabledDescription?: string;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  isSkipLoading?: boolean;
  hasMadeProjectsSelection?: boolean;
  isNotMigratingAnyProjects?: boolean;
  isMigratingProjectAttachmentsOnly?: boolean;
  onSkipUsersAndGroups?: () => void;
  onSelectAllUsersAndGroups?: () => void;
};

const getMembershipSelection = (
  shouldPreserveMemberships: boolean,
  intl: InjectedIntl,
): Selection => {
  if (shouldPreserveMemberships) {
    return {
      title: intl.formatMessage(messages.preserveGroupMembershipTitle),
      description: intl.formatMessage(
        messages.preserveGroupMembershipDescription,
      ),
    };
  }
  return {
    title: intl.formatMessage(messages.migrateUsersGroupsSeparatelyTitle),
    description: intl.formatMessage(
      messages.migrateUsersGroupsSeparatelyDescription,
    ),
  };
};

const getReferencedDescription = (
  includeRoleActors: boolean | undefined,
  includeUsersInGroups: boolean | undefined,
  intl: InjectedIntl,
) => {
  if (includeRoleActors && includeUsersInGroups) {
    return (
      <>
        {intl.formatMessage(messages.referencedUsersAndGroupsWithOptions)}
        <br />
        {intl.formatMessage(messages.includeRoleActors)}
        <br />
        {intl.formatMessage(messages.includeUsersInGroups)}
      </>
    );
  }
  if (includeRoleActors) {
    return (
      <>
        {intl.formatMessage(messages.referencedUsersAndGroupsWithOptions)}
        <br />
        {intl.formatMessage(messages.includeRoleActors)}
      </>
    );
  }
  if (includeUsersInGroups) {
    return (
      <>
        {intl.formatMessage(messages.referencedUsersAndGroupsWithOptions)}
        <br />
        {intl.formatMessage(messages.includeUsersInGroups)}
      </>
    );
  }
  return intl.formatMessage(messages.referencedUsersAndGroupsMinimum);
};

const getUsersGroupsSelection = (
  selection: UsersAndGroupsConfig,
  intl: InjectedIntl,
): Selection => {
  if (selection.mode === 'All') {
    return {
      title: intl.formatMessage(messages.allUsersAndGroups),
      description: intl.formatMessage(messages.usersAndGroupsCounts, {
        usersCount: selection.numberOfUsers,
        groupsCount: selection.numberOfGroups,
      }),
    };
  } else {
    return {
      title: intl.formatMessage(messages.referencedUsersAndGroupsTitle),
      description: getReferencedDescription(
        selection.includeRoleActors,
        selection.includeUsersInGroups,
        intl,
      ),
    };
  }
};

const getUsersGroupsErrorData = (
  intl: InjectedIntl,
  isSkipMigratingProject: boolean,
  isMigratingProjectAttachmentsOnly: boolean,
  selectionMode?: UsersAndGroupsMode,
  onSkipUsersAndGroups?: () => void,
  onSelectAllUsersAndGroups?: () => void,
): {
  hasError: boolean;
  fixErrorButtonText?: string;
  onFixError?: () => void;
} => {
  if (!!selectionMode && !!isMigratingProjectAttachmentsOnly) {
    return {
      hasError: true,
      fixErrorButtonText: intl.formatMessage(
        messages.skipAllUsersAndGroupsButtonText,
      ),
      onFixError: onSkipUsersAndGroups,
    };
  }

  if (selectionMode === 'Referenced' && !!isSkipMigratingProject) {
    return {
      hasError: true,
      fixErrorButtonText: intl.formatMessage(
        messages.selectAllUsersAndGroupsButtonText,
      ),
      onFixError: onSelectAllUsersAndGroups,
    };
  }

  return {
    hasError: false,
  };
};

const UsersAndGroupsTaskCard: FC<Props & InjectedIntlProps> = ({
  intl,
  selection,
  onSelect,
  isDisabled,
  disabledDescription,
  isLoading,
  isSelectLoading,
  isSkipLoading,
  hasMadeProjectsSelection,
  isNotMigratingAnyProjects,
  isMigratingProjectAttachmentsOnly,
  onSkipUsersAndGroups,
  onSelectAllUsersAndGroups,
}) => {
  let selections: Selection[] = [];
  if (selection) {
    selections = [
      getUsersGroupsSelection(selection, intl),
      getMembershipSelection(selection.shouldPreserveMemberships, intl),
    ];
  }

  const errorData = getUsersGroupsErrorData(
    intl,
    !!isNotMigratingAnyProjects,
    !!isMigratingProjectAttachmentsOnly,
    selection?.mode,
    onSkipUsersAndGroups,
    onSelectAllUsersAndGroups,
  );

  const shouldDisable =
    isDisabled ||
    !hasMadeProjectsSelection ||
    isMigratingProjectAttachmentsOnly;

  return (
    <TaskCard
      taskName={intl.formatMessage(messages.taskName)}
      selections={selections}
      noSelectionDescription={intl.formatMessage(messages.noSelectionText)}
      shouldAllowSkip={false}
      onSelect={onSelect}
      isDisabled={shouldDisable}
      disabledDescription={
        isMigratingProjectAttachmentsOnly
          ? intl.formatMessage(messages.attachmentsOnlyDisabledDescription)
          : disabledDescription
      }
      isLoading={isLoading}
      isSelectLoading={isSelectLoading}
      isSkipLoading={isSkipLoading}
      isError={errorData.hasError}
      onFixError={errorData.onFixError}
      fixErrorButtonText={errorData.fixErrorButtonText}
    />
  );
};

export default injectIntl(UsersAndGroupsTaskCard);
