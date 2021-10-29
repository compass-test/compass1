import React from 'react';

import { IntlProvider } from 'react-intl';

import { JiraMigrationConfiguration } from './index';

export const JiraMigrationConfigurationBasic = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        sourceUrl="http://mpt-test-source.atlassian.com"
        destinationUrl="http://mpt-test-tw1.atlassian.com"
        destinationCloudProducts={[
          { productKey: 'jira-software.ondemand', edition: 'free' },
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
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationMinimumData = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationPreserveGroupMemberships = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
        usersAndGroupsConfig={{
          shouldPreserveMemberships: true,
          includeUsersInGroups: true,
          includeRoleActors: false,
          mode: 'Referenced',
        }}
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationProjectConfigOnly = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
        usersAndGroupsConfig={{
          shouldPreserveMemberships: false,
          mode: 'All',
        }}
        projectsConfig={{
          numberOfProjects: 2,
          attachmentsBytesSize: 0,
          numberOfIssues: 0,
          projectDataMigrationMode: 'ConfigOnly',
        }}
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationProjectAttachmentsOnly = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
        projectsConfig={{
          numberOfProjects: 3,
          attachmentsBytesSize: 2048,
          numberOfIssues: 0,
          projectDataMigrationMode: 'AttachmentsOnly',
        }}
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationProjectAllData = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
        usersAndGroupsConfig={{
          shouldPreserveMemberships: false,
          mode: 'All',
        }}
        projectsConfig={{
          numberOfProjects: 6,
          attachmentsBytesSize: 2048,
          numberOfIssues: 200,
          projectDataMigrationMode: 'All',
        }}
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationProjectSingle = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
        usersAndGroupsConfig={{
          shouldPreserveMemberships: false,
          mode: 'All',
        }}
        projectsConfig={{
          numberOfProjects: 1,
          attachmentsBytesSize: 2048,
          numberOfIssues: 1,
          projectDataMigrationMode: 'All',
        }}
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationWithCustomDestinationHeader = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
        destinationUrl="http://mpt-test-tw1.atlassian.com"
        destinationUrlHeader="Destination site"
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationWithCustomSourceHeader = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[]}
        sourceUrl="http://mpt-test-source.atlassian.com"
        sourceUrlHeader="Source site header"
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationWithCustomDestinationCloudPlanHeader = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[
          { productKey: 'jira-software.ondemand', edition: 'free' },
        ]}
        destinationCloudPlanHeader="Destination Cloud plan"
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationWithEdit = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        destinationCloudProducts={[
          { productKey: 'jira-software.ondemand', edition: 'free' },
        ]}
        destinationCloudPlanHeader="Destination Cloud plan"
        onEdit={() => {}}
      />
    </IntlProvider>
  );
};

export const JiraMigrationConfigurationJiraJSM = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationConfiguration
        migrationName="My migration"
        sourceUrl="http://mpt-test-source.atlassian.com"
        destinationUrl="http://mpt-test-tw1.atlassian.com"
        destinationCloudProducts={[
          { productKey: 'jira-software.ondemand', edition: 'free' },
          { productKey: 'jira-servicedesk.ondemand', edition: 'free' },
        ]}
        projectsConfig={{
          numberOfProjects: 1,
          attachmentsBytesSize: 1024,
          numberOfIssues: 55,
          projectDataMigrationMode: 'All',
          projectStatsOfJSM: {
            totalProjects: 12,
            totalIssues: 200,
            attachments: {
              totalSizeBytes: 256,
            },
          },
          projectStatsOfJira: {
            totalProjects: 12,
            totalIssues: 200,
            attachments: {
              totalSizeBytes: 256,
            },
          },
        }}
        usersAndGroupsConfig={{
          shouldPreserveMemberships: false,
          includeUsersInGroups: true,
          includeRoleActors: false,
          mode: 'Referenced',
        }}
      />
    </IntlProvider>
  );
};
