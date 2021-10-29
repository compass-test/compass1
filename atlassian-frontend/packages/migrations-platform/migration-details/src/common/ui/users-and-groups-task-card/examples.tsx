import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import UsersAndGroupsTaskCard, { Props } from './index';

export const NoSelection = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={undefined}
        onSelect={() => undefined}
        isDisabled={false}
        disabledDescription={undefined}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={false}
        isNotMigratingAnyProjects={true}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const MigratingAllUsersAndGroupsPreservingGroupMembership: FC<Partial<
  Props
>> = ({ isNotMigratingAnyProjects = false }) => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={{
          mode: 'All',
          shouldPreserveMemberships: true,
          numberOfUsers: 1435,
          numberOfGroups: 10,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={isNotMigratingAnyProjects}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const MigratingAllUsersAndGroupsButMigrateUsersAndGroupsSeparately = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={{
          mode: 'All',
          shouldPreserveMemberships: false,
          numberOfUsers: 1435,
          numberOfGroups: 10,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={false}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const MigratingReferencedUsersAndGroups: FC<Partial<Props>> = ({
  isNotMigratingAnyProjects = false,
  onSelectAllUsersAndGroups = () => undefined,
}) => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={{
          mode: 'Referenced',
          shouldPreserveMemberships: false,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={isNotMigratingAnyProjects}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={onSelectAllUsersAndGroups}
      />
    </IntlProvider>
  );
};

export const MigratingReferencedUsersAndGroupsIncludingThoseReferencedInRoles = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={{
          mode: 'Referenced',
          shouldPreserveMemberships: false,
          includeRoleActors: true,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={false}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const MigratingReferencedUsersAndGroupsIncludingThoseReferencedInRolesAndAllUsersReferencedInIncludedGroups = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={{
          mode: 'Referenced',
          shouldPreserveMemberships: false,
          includeRoleActors: true,
          includeUsersInGroups: true,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={false}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const MigratingReferencedUsersAndGroupsIncludingAllUsersReferencedInIncludedGroups = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={{
          mode: 'Referenced',
          shouldPreserveMemberships: false,
          includeUsersInGroups: true,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={false}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const DisabledWithCustomReason = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={undefined}
        onSelect={() => undefined}
        isDisabled={true}
        disabledDescription="Some specific reason why this is disabled"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={false}
        isMigratingProjectAttachmentsOnly={false}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const DisabledForAttachmentsOnly = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={undefined}
        onSelect={() => undefined}
        isDisabled={false} // Not explicitly disabled
        disabledDescription="This description should have been overridden"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={false}
        isMigratingProjectAttachmentsOnly={true}
        onSkipUsersAndGroups={() => undefined}
        onSelectAllUsersAndGroups={() => undefined}
      />
    </IntlProvider>
  );
};

export const MigratingUsersAndGroupsButProjectAttachmentsOnly: FC<Partial<
  Props
>> = ({
  selection = {
    mode: 'Referenced',
    shouldPreserveMemberships: false,
  },
  onSkipUsersAndGroups = () => undefined,
  onSelectAllUsersAndGroups = () => undefined,
}) => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsTaskCard
        selection={selection}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={true}
        isNotMigratingAnyProjects={false}
        isMigratingProjectAttachmentsOnly={true}
        onSkipUsersAndGroups={onSkipUsersAndGroups}
        onSelectAllUsersAndGroups={onSelectAllUsersAndGroups}
      />
    </IntlProvider>
  );
};
