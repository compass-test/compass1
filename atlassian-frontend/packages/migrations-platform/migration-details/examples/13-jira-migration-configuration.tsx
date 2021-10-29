import React from 'react';

import { IntlProvider } from 'react-intl';

import { JiraMigrationConfiguration } from '../src';

export default () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        sourceUrl="http://mpt-test-source.atlassian.com"
        destinationUrl="http://mpt-test-tw1.atlassian.com"
        destinationCloudProducts={[
          { productKey: 'jira-core.ondemand', edition: 'free' },
        ]}
        projectsConfig={{
          numberOfProjects: 1,
          attachmentsBytesSize: 1024,
          numberOfIssues: 55,
          projectDataMigrationMode: 'All',
        }}
        usersAndGroupsConfig={{
          shouldPreserveMemberships: false,
          includeUsersInGroups: true,
          includeRoleActors: false,
          mode: 'Referenced',
        }}
        appData={2}
      />
    </IntlProvider>
  );
};
