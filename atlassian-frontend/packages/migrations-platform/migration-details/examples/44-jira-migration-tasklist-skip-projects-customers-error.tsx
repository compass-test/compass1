import React from 'react';

import { IntlProvider } from 'react-intl';

import { JiraMigrationTasklist, JiraMigrationTasklistProps } from '../src';

export default (props: Partial<JiraMigrationTasklistProps>) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 0,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'All',
            projectStatsOfJSM: {
              totalProjects: 12,
              totalIssues: 200,
              attachments: {
                totalSizeBytes: 600000,
              },
            },
            projectStatsOfJira: {
              totalProjects: 24,
              totalIssues: 200,
              attachments: {
                totalSizeBytes: 80000,
              },
            },
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
            mode: 'All',
          },
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: () => undefined,
          onSkipUsersAndGroups: () => undefined,
        }}
        customersMigrationTaskData={{
          selection: {
            shouldMigrateProjects: true,
            customersCount: 300,
            mode: 'REFERENCED',
          },
          onSelect: () => undefined,
          onSelectAllCustomers: () => undefined,
          onSkipAllCustomers: () => undefined,
          isBeta: true,
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
