import React from 'react';

import { IntlProvider } from 'react-intl';

import UsersAndGroupsContent from './index';

export const UsersAndGroupsAll = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsContent
        usersAndGroupsConfig={{
          mode: 'All',
          shouldPreserveMemberships: false,
        }}
      />
    </IntlProvider>
  );
};

export const UsersAndGroupsMin = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsContent
        usersAndGroupsConfig={{
          mode: 'Referenced',
          shouldPreserveMemberships: false,
        }}
      />
    </IntlProvider>
  );
};

export const UsersAndGroupsMinPlusRoles = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsContent
        usersAndGroupsConfig={{
          mode: 'Referenced',
          includeRoleActors: true,
          shouldPreserveMemberships: false,
        }}
      />
    </IntlProvider>
  );
};

export const UsersAndGroupsMinPlusGroups = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsContent
        usersAndGroupsConfig={{
          mode: 'Referenced',
          includeUsersInGroups: true,
          shouldPreserveMemberships: false,
        }}
      />
    </IntlProvider>
  );
};

export const UsersAndGroupsMinPlusRolesPlusGroups = () => {
  return (
    <IntlProvider locale="en">
      <UsersAndGroupsContent
        usersAndGroupsConfig={{
          mode: 'Referenced',
          includeRoleActors: true,
          includeUsersInGroups: true,
          shouldPreserveMemberships: false,
        }}
      />
    </IntlProvider>
  );
};
