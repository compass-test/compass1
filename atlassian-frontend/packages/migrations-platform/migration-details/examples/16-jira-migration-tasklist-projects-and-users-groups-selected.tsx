import React from 'react';

import { IntlProvider } from 'react-intl';

import { JiraMigrationTasklist, JiraMigrationTasklistProps } from '../src';

export default (props: Partial<JiraMigrationTasklistProps>) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            numberOfIssues: 1234,
            attachmentsBytesSize: 6000000,
            projectDataMigrationMode: 'All',
          },
          onSkip: () => undefined,
          onSelect: () => undefined,
        }}
        usersAndGroupsTaskData={{
          selection: {
            numberOfUsers: 1045,
            numberOfGroups: 28,
            shouldPreserveMemberships: true,
            includeUsersInGroups: true,
            includeRoleActors: true,
            mode: 'Referenced',
          },
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: () => undefined,
          onSkipUsersAndGroups: () => undefined,
        }}
        onNext={() => undefined}
        progress="progress"
        title="title"
        subtitle="subtitle"
        bannerMessage="banner msg"
        bannerAppearance="warning"
        headerButtons="header buttons"
        onBack={() => undefined}
        onClose={() => undefined}
        {...props}
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};
