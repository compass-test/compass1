import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import { AdvancedRoadmapsConfig } from '../../common/types';

import { JiraMigrationTasklist } from './index';

export const InitialState = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: undefined,
          onSkip: () => undefined,
          onSelect: () => undefined,
        }}
        usersAndGroupsTaskData={{
          selection: undefined,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const SelectedProjects = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
          },
          onSkip: () => undefined,
          onSelect: () => undefined,
        }}
        usersAndGroupsTaskData={{
          selection: undefined,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const SelectedProjectsAndUsersGroups = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const SkippedProjects = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 0,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const CardsLoading = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          onSkip: () => undefined,
          onSelect: () => undefined,
          isLoading: true,
        }}
        usersAndGroupsTaskData={{
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: () => undefined,
          onSkipUsersAndGroups: () => undefined,
          isLoading: true,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const CardsSelectLoading = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          onSkip: () => undefined,
          onSelect: () => undefined,
          isSelectLoading: true,
        }}
        usersAndGroupsTaskData={{
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: () => undefined,
          onSkipUsersAndGroups: () => undefined,
          isSelectLoading: true,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const CardsSkipLoading = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          onSkip: () => undefined,
          onSelect: () => undefined,
          isSkipLoading: true,
        }}
        usersAndGroupsTaskData={{
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: () => undefined,
          onSkipUsersAndGroups: () => undefined,
          isSelectLoading: true,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const ErrorSkipProjectsButReferencedUsersSelected: FC<{
  onSelectAllUsersAndGroups?: () => void;
  onSkipUsersAndGroups?: () => void;
}> = ({ onSelectAllUsersAndGroups = () => {} }) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 0,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
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
          onSelectAllUsersAndGroups,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const ErrorAttachmentsOnlyButUsersSelected: FC<{
  onSelectAllUsersAndGroups?: () => void;
  onSkipUsersAndGroups?: () => void;
}> = ({
  onSelectAllUsersAndGroups = () => {},
  onSkipUsersAndGroups = () => {},
}) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
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
            mode: 'Referenced',
          },
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: onSelectAllUsersAndGroups,
          onSkipUsersAndGroups: onSkipUsersAndGroups,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const InitialStateWithUsersAndGroupsDisabled = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: undefined,
          onSkip: () => undefined,
          onSelect: () => undefined,
        }}
        usersAndGroupsTaskData={{
          selection: undefined,
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: () => undefined,
          isDisabled: true,
          disabledDescription:
            'Feature flag enabled - no users, groups, or group membership can be migrated',
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
        children="children"
      />
    </IntlProvider>
  );
};

export const SelectedProjectsWithUsersAndGroupsDisabled = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
          },
          onSkip: () => undefined,
          onSelect: () => undefined,
        }}
        usersAndGroupsTaskData={{
          selection: undefined,
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: () => undefined,
          onSkipUsersAndGroups: () => undefined,
          isDisabled: true,
          disabledDescription:
            'Feature flag enabled - no users, groups, or group membership can be migrated',
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithARInitialState = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans: () => undefined,
        }}
        projectsTaskData={{
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithoutApps = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const WithNoAppSelectionMade = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
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
        appsMigrationTaskData={{
          selection: undefined,
          onSelect: () => undefined,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const WithAppsCountZero = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
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
        appsMigrationTaskData={{
          selection: {
            numberOfApps: 0,
          },
          onSelect: () => undefined,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const WithAppsCountMoreThanZero = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
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
        appsMigrationTaskData={{
          selection: {
            numberOfApps: 0,
          },
          onSelect: () => undefined,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

export const WithARSelectedPlans = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: { numberOfPlans: 22 },
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans: () => undefined,
        }}
        projectsTaskData={{
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithARSelectedPlansAndProjects = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: { numberOfPlans: 22 },
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans: () => undefined,
        }}
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'All',
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithARSelectedPlansAndProjectsAndUsers = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: { numberOfPlans: 22 },
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans: () => undefined,
        }}
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithARSkippedPlansAttachmentsOnly = () => {
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
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'AttachmentsOnly',
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithARSkippedPlansConfigOnly = () => {
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
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithARSkippedPlansSelectedUsersConfigOnly = () => {
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
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
          },
          onSkip: () => undefined,
          onSelect: () => undefined,
        }}
        usersAndGroupsTaskData={{
          selection: {
            numberOfUsers: 1045,
            numberOfGroups: 28,
            shouldPreserveMemberships: true,
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
        children="children"
      />
    </IntlProvider>
  );
};

// Corresponds to 23-jira-migration-tasklist-....tsx in Storybook examples folder
export const WithARErrorAttachmentsOnlyButPlansAndUsersSelected = () => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: { numberOfPlans: 22 },
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans: () => undefined,
        }}
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

// Corresponds to 24-jira-migration-tasklist-....tsx in Storybook examples folder
export const WithARErrorAttachmentsOnlyButUsersSelected: FC<{
  onSelectAllUsersAndGroups?: () => void;
  onSkipUsersAndGroups?: () => void;
  advancedRoadmapsTaskDataSelection?: AdvancedRoadmapsConfig;
}> = ({
  onSelectAllUsersAndGroups = () => {},
  onSkipUsersAndGroups = () => {},
  advancedRoadmapsTaskDataSelection = undefined,
}) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: advancedRoadmapsTaskDataSelection,
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
            mode: 'All',
          },
          onSelect: () => undefined,
          onSelectAllUsersAndGroups: onSelectAllUsersAndGroups,
          onSkipUsersAndGroups: onSkipUsersAndGroups,
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
      >
        children
      </JiraMigrationTasklist>
    </IntlProvider>
  );
};

// Corresponds to 25-jira-migration-tasklist-....tsx in Storybook examples folder
export const WithARErrorAttachmentsOnlyButPlansSelected: FC<{
  onUnselectAllPlans?: () => void;
}> = ({ onUnselectAllPlans = () => {} }) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: { numberOfPlans: 22 },
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans,
        }}
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'AttachmentsOnly',
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
        children="children"
      />
    </IntlProvider>
  );
};

export const WithARErrorConfigOnlyButPlansSelected: FC<{
  onUnselectAllPlans?: () => void;
}> = ({ onUnselectAllPlans = () => {} }) => {
  return (
    <IntlProvider locale="en">
      <JiraMigrationTasklist
        advancedRoadmapsTaskData={{
          selection: { numberOfPlans: 22 },
          onSelect: () => undefined,
          onSkip: () => undefined,
          onUnselectAllPlans,
        }}
        projectsTaskData={{
          selection: {
            numberOfProjects: 12,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
            projectDataMigrationMode: 'ConfigOnly',
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
        children="children"
      />
    </IntlProvider>
  );
};
