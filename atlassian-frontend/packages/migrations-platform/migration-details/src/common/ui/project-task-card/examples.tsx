import React from 'react';

import { IntlProvider } from 'react-intl';

import ProjectTaskCard from './index';

export const ProjectTaskCardWithOneProject = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 12,
          projectDataMigrationMode: 'All',
          numberOfIssues: 895,
          attachmentsBytesSize: 6500003,
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardWithOneProjectAndSelectedAdvancedRoadmaps = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 1,
          projectDataMigrationMode: 'All',
          numberOfIssues: 895,
          attachmentsBytesSize: 6500003,
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        isAdvancedRoadmapsSelected={true}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardWithMultipleProjects = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 5,
          projectDataMigrationMode: 'All',
          numberOfIssues: 895,
          attachmentsBytesSize: 6500003,
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardWithMultipleProjectsAndConfigOnly = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 5,
          numberOfIssues: 0,
          attachmentsBytesSize: 0,
          projectDataMigrationMode: 'ConfigOnly',
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardWithMultipleProjectsAndAttachmentsOnly = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 5,
          numberOfIssues: 0,
          attachmentsBytesSize: 2048,
          projectDataMigrationMode: 'AttachmentsOnly',
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardNoSelection = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={undefined}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardNotMigrating = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 0,
          numberOfIssues: 0,
          attachmentsBytesSize: 0,
          projectDataMigrationMode: undefined,
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardWithNoAttachments = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 2,
          numberOfIssues: 3,
          attachmentsBytesSize: 0,
          projectDataMigrationMode: 'All',
        }}
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const ProjectTaskCardWithJiraJsmProjects = () => {
  return (
    <IntlProvider locale="en">
      <ProjectTaskCard
        selection={{
          numberOfProjects: 1,
          projectDataMigrationMode: 'All',
          numberOfIssues: 895,
          attachmentsBytesSize: 6500003,
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
        onSelect={() => undefined}
        onSkip={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};
