import React, { useState } from 'react';

import { Link, useRouter } from 'react-resource-router';

import Badge from '@atlaskit/badge';
import DetailViewIcon from '@atlaskit/icon/glyph/detail-view';
import FeedbackIcon from '@atlaskit/icon/glyph/feedback';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import RoadmapIcon from '@atlaskit/icon/glyph/roadmap';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import { CustomItem } from '@atlaskit/side-navigation';
import { DependencyIcon } from '@atlassian/dragonfruit-components';
import {
  useActivityFeedListViewEnabled,
  useCompassComponentAnnouncementsEnabled,
  useJiraComponentPage,
  useNewComponentDataManagerExperienceEnabled,
} from '@atlassian/dragonfruit-feature-flags';
import {
  ComponentDetailPageUrlParam,
  encodeURIParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { ForgeAppIcon } from './styled';
import { LeftSidebarLinksProps } from './types';

export function LeftSidebarLinks(props: LeftSidebarLinksProps) {
  const {
    componentId,
    componentPageApps,
    unacknowledgedAnnouncementCount,
  } = props;

  const emptyErrorsMap: { [key: string]: boolean } = {};
  const [imageErrors, setImageErrors] = useState(emptyErrorsMap);

  const componentPageAppsWithTitle = componentPageApps.filter(
    (app) => app.title,
  );

  const { formatMessage } = useIntl();
  const [{ match }] = useRouter();

  const isAnnouncementsFeatureFlagEnabled = useCompassComponentAnnouncementsEnabled();
  const isNewDataManagerFeatureFlagEnabled = useNewComponentDataManagerExperienceEnabled();
  const isJiraComponentPageEnabled = useJiraComponentPage();
  const isActivityFeedListViewEnabled = useActivityFeedListViewEnabled();

  const selectedPage = match.params.componentPage;
  const selectedApp = match.params.extensionId;

  const defaultIcon = (
    <DetailViewIcon label={formatMessage(messages.overview)} />
  );

  return (
    <>
      <CustomItem
        testId="dragonfruit-page-component-details.left-sidebar-links.overview"
        component={Link}
        iconBefore={<OverviewIcon label={formatMessage(messages.overview)} />}
        isSelected={selectedPage === undefined && selectedApp === undefined}
        href={routes.COMPONENT_DETAILS(componentId)}
      >
        {formatMessage(messages.overview)}
      </CustomItem>
      {isActivityFeedListViewEnabled && (
        <CustomItem
          testId="dragonfruit-page-component-details.left-sidebar-links.activity"
          component={Link}
          iconBefore={<RoadmapIcon label={formatMessage(messages.activity)} />}
          isSelected={selectedPage === ComponentDetailPageUrlParam.ACTIVITY}
          href={routes.COMPONENT_DETAILS(
            componentId,
            ComponentDetailPageUrlParam.ACTIVITY,
          )}
        >
          {formatMessage(messages.activity)}
        </CustomItem>
      )}
      <CustomItem
        testId="dragonfruit-page-component-details.left-sidebar-links.dependencies"
        component={Link}
        iconBefore={
          <DependencyIcon label={formatMessage(messages.dependencies)} />
        }
        isSelected={selectedPage === ComponentDetailPageUrlParam.DEPENDENCIES}
        href={routes.COMPONENT_DETAILS(
          componentId,
          ComponentDetailPageUrlParam.DEPENDENCIES,
        )}
      >
        {formatMessage(messages.dependencies)}
      </CustomItem>
      {isJiraComponentPageEnabled && (
        <CustomItem
          testId="dragonfruit-page-component-details.left-sidebar-links.jira"
          component={Link}
          iconBefore={<IssuesIcon label={formatMessage(messages.jira)} />}
          isSelected={selectedPage === ComponentDetailPageUrlParam.JIRA}
          href={routes.COMPONENT_DETAILS(
            componentId,
            ComponentDetailPageUrlParam.JIRA,
          )}
        >
          {formatMessage(messages.jira)}
        </CustomItem>
      )}
      {componentPageAppsWithTitle.map((extensionInfo) => {
        return (
          <CustomItem
            testId={`dragonfruit-page-component-details.left-sidebar-links.${extensionInfo.id}`}
            key={extensionInfo.id}
            component={Link}
            iconBefore={
              extensionInfo.icon && !imageErrors[extensionInfo.icon] ? (
                <ForgeAppIcon
                  src={extensionInfo.icon}
                  alt={'app icon'}
                  onError={() => {
                    const newErrors = { ...imageErrors };
                    newErrors[extensionInfo.icon] = true;
                    setImageErrors(newErrors);
                  }}
                />
              ) : (
                defaultIcon
              )
            }
            isSelected={selectedApp === encodeURIParam(extensionInfo.id)}
            href={routes.COMPONENT_DETAILS_APP(componentId, extensionInfo.id)}
          >
            {extensionInfo.title}
          </CustomItem>
        );
      })}
      {isAnnouncementsFeatureFlagEnabled && (
        <CustomItem
          testId="dragonfruit-page-component-details.left-sidebar-links.announcements"
          component={Link}
          iconBefore={<FeedbackIcon label={'Announcements'} />}
          isSelected={
            selectedPage === ComponentDetailPageUrlParam.ANNOUNCEMENTS
          }
          href={routes.COMPONENT_DETAILS(
            componentId,
            ComponentDetailPageUrlParam.ANNOUNCEMENTS,
          )}
          {...(unacknowledgedAnnouncementCount
            ? {
                iconAfter: (
                  <Badge appearance="primary">
                    {unacknowledgedAnnouncementCount}
                  </Badge>
                ),
              }
            : {})}
        >
          Announcements
        </CustomItem>
      )}
      {isNewDataManagerFeatureFlagEnabled && (
        <CustomItem
          testId="dragonfruit-page-component-details.left-sidebar-links.settings"
          component={Link}
          iconBefore={<SettingsIcon label={formatMessage(messages.settings)} />}
          isSelected={selectedPage === ComponentDetailPageUrlParam.SETTINGS}
          href={routes.COMPONENT_DETAILS(
            componentId,
            ComponentDetailPageUrlParam.SETTINGS,
          )}
        >
          {formatMessage(messages.settings)}
        </CustomItem>
      )}
    </>
  );
}
