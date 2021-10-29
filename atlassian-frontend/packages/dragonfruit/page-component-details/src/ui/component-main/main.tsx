import React from 'react';

import { ApolloQueryResult } from '@apollo/client';
import { Redirect } from 'react-resource-router';

import {
  useActivityFeedListViewEnabled,
  useCompassComponentAnnouncementsEnabled,
  useJiraComponentPage,
  useNewComponentDataManagerExperienceEnabled,
} from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentDetailViewFragment,
  GetComponentDependencyAnnouncementsQuery,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { ComponentDetailPageUrlParam } from '@atlassian/dragonfruit-utils';

import { ExtensionSideBarInfo } from '../../common/ui/left-sidebar-links/types';

import { ActivityFeed } from './activity-feed';
import { Announcements } from './announcements';
import { ComponentSettings } from './component-settings';
import { ExtensionPointPage } from './extension-point-page';
import { JiraComponentPage } from './jira';
import { Overview } from './overview';
import { Relationships } from './relationships';

type ComponentMainProps = {
  component: CompassComponentDetailViewFragment;
  pageType?: ComponentDetailPageUrlParam | null;
  extensionId?: string | null;
  componentPageApps: ExtensionSideBarInfo[];
  dependencyAnnouncementData?: GetComponentDependencyAnnouncementsQuery;
  unacknowledgedAnnouncementCount?: number;
  refetchDependencyAnnouncementData?: (variables?: {
    id: string;
  }) =>
    | Promise<ApolloQueryResult<GetComponentDependencyAnnouncementsQuery>>
    | undefined;
};

export const ComponentMain: React.FC<ComponentMainProps> = ({
  component,
  pageType,
  extensionId,
  componentPageApps,
  dependencyAnnouncementData,
  unacknowledgedAnnouncementCount,
  refetchDependencyAnnouncementData,
}) => {
  const isAnnouncementsFeatureFlagEnabled = useCompassComponentAnnouncementsEnabled();
  const isNewDataManagerFeatureFlagEnabled = useNewComponentDataManagerExperienceEnabled();
  const isJiraComponentPageEnabled = useJiraComponentPage();
  const isActivityFeedListViewEnabled = useActivityFeedListViewEnabled();

  if (pageType === ComponentDetailPageUrlParam.DEPENDENCIES) {
    return (
      <Relationships
        currentComponent={component}
        dataManager={component.dataManager}
      />
    );
  }

  if (
    pageType === ComponentDetailPageUrlParam.ACTIVITY &&
    isActivityFeedListViewEnabled
  ) {
    return <ActivityFeed currentComponent={component} />;
  }

  if (
    pageType === ComponentDetailPageUrlParam.SETTINGS &&
    isNewDataManagerFeatureFlagEnabled
  ) {
    return <ComponentSettings currentComponent={component} />;
  }

  if (
    pageType === ComponentDetailPageUrlParam.ANNOUNCEMENTS &&
    isAnnouncementsFeatureFlagEnabled
  ) {
    const selectedTab = window.location.hash;

    return (
      <Announcements
        currentComponent={component}
        dependencyAnnouncementData={dependencyAnnouncementData}
        unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
        onTabChange={() => {
          if (refetchDependencyAnnouncementData) {
            refetchDependencyAnnouncementData({
              id: component.id,
            });
          }
        }}
        selectedTab={selectedTab}
      />
    );
  }

  if (
    pageType === ComponentDetailPageUrlParam.JIRA &&
    isJiraComponentPageEnabled
  ) {
    return <JiraComponentPage component={component} />;
  }

  if (extensionId) {
    return (
      <ExtensionPointPage
        component={component}
        extensionId={extensionId}
        componentPageApps={componentPageApps}
      />
    );
  }

  // If there's no sub-page then we're on the component details homepage/overview
  if (pageType === undefined) {
    return <Overview component={component} />;
  }

  // Unmatched, redirect to the overview
  return <Redirect to={routes.COMPONENT_DETAILS(component.id)} />;
};
