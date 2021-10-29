import React from 'react';

import { IntlProvider } from 'react-intl';

import { JiraMigrationTasklist, JiraMigrationTasklistProps } from '../src';

export default (props: Partial<JiraMigrationTasklistProps>) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: { numberOfPlans: 0 },
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans: () => undefined,
        }}
        projectsTaskData={{
          selection: {
            numberOfProjects: 112,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'AttachmentsOnly',
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
