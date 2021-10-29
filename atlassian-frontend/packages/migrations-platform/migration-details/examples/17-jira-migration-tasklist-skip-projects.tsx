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
            numberOfIssues: 0,
            attachmentsBytesSize: 0,
          },
          onSkip: () => undefined,
          onSelect: () => undefined,
        }}
        usersAndGroupsTaskData={{
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
