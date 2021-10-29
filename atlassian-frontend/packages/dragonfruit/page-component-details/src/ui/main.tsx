import React, { useEffect } from 'react';

import * as Sentry from '@sentry/react';
import { Helmet } from 'react-helmet';

import EmptyState from '@atlaskit/empty-state';
import {
  Content,
  LeftSidebar,
  Main,
  RightSidebar,
} from '@atlaskit/page-layout';
import Spinner from '@atlaskit/spinner';
import {
  ContextualAnalyticsData,
  FireTrackAnalytics,
} from '@atlassian/analytics-bridge';
import { useCompassRecents } from '@atlassian/compass-search-cache';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useCompassComponentAnnouncementsEnabled } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassLinkType,
  GetComponentDependencyAnnouncementsQuery,
  useGetComponentDependencyAnnouncementsLazyQuery,
  useGetComponentDetailsQuery,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  ComponentDetailPageUrlParam,
  useIntl,
} from '@atlassian/dragonfruit-utils';

import { filterAndSortUpcomingAnnouncements } from '../common/utils/announcements';
import useGetComponentDetailApps from '../services/get-component-detail-apps/main';

import { ComponentMain } from './component-main';
import { LeftSidebar as ComponentLeftSidebar } from './left-sidebar';
import messages from './messages';
import { RightSidebar as ComponentRightSidebar } from './right-sidebar';
import { SpinnerContainer } from './styled';

const ANALYTICS_VIEWED_EVENT_NAME = 'component viewed';

type Props = {
  componentId: string;
  pageType?: ComponentDetailPageUrlParam | null;
  extensionId?: string | null;
};

const ComponentDetailsPage: React.FC<Props> = ({
  componentId,
  pageType,
  extensionId,
}) => {
  const { formatMessage } = useIntl();
  const { cloudId } = useTenantInfo();
  const { appData: componentPageApps } = useGetComponentDetailApps(cloudId);

  const { addRecentComponent } = useCompassRecents();

  const isComponentAnnouncementsEnabled = useCompassComponentAnnouncementsEnabled();
  const [
    getComponentDependenciesAnnouncements,
    { data: dependencyAnnouncementData, refetch },
  ] = useGetComponentDependencyAnnouncementsLazyQuery();

  const { data, loading } = useGetComponentDetailsQuery({
    variables: { id: componentId },
    // With errorPolicy "all", both data and error.graphQLErrors are populated,
    // allowing use to render partial results.
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (isComponentAnnouncementsEnabled) {
      getComponentDependenciesAnnouncements({
        variables: { id: componentId },
      });
    }
  }, [
    componentId,
    getComponentDependenciesAnnouncements,
    isComponentAnnouncementsEnabled,
  ]);

  useEffect(() => {
    if (
      loading ||
      !addRecentComponent ||
      data?.compass?.component?.__typename !== 'CompassComponent'
    ) {
      return;
    }

    addRecentComponent(data.compass.component);
  }, [data, loading, addRecentComponent]);

  if (loading) {
    return (
      <Content>
        <SpinnerContainer>
          <Spinner
            testId="component-details-page.loading-spinner"
            size="large"
          />
        </SpinnerContainer>
      </Content>
    );
  }

  if (data?.compass?.component?.__typename !== 'CompassComponent') {
    return (
      <Content>
        <EmptyState
          header={formatMessage(messages.errorStateHeading)}
          description={formatMessage(messages.componentRetrievalErrorMessage)}
          imageUrl={ErrorIcon}
        />
      </Content>
    );
  }

  let attributes = {};
  try {
    attributes = {
      componentType: data.compass.component.type,
      hasOwner: data.compass.component.ownerId != null,
      repoCount: data.compass.component.links?.filter(
        (it) => it.type === CompassLinkType.REPOSITORY,
      )?.length,
      documentCount: data.compass.component.links?.filter(
        (it) => it.type === CompassLinkType.DOCUMENT,
      )?.length,
      dashboardCount: data.compass.component.links?.filter(
        (it) => it.type === CompassLinkType.DASHBOARD,
      )?.length,
      weblinkCounter: data.compass.component.links?.filter(
        (it) => it.type === CompassLinkType.OTHER_LINK,
      )?.length,
    };
  } catch (err) {
    Sentry.captureException('Failed to assemble attributes for analytics', err);
  }

  const unacknowledgedAnnouncementCount = getUnacknowledgedAnnouncementCount(
    componentId,
    dependencyAnnouncementData,
  );

  return (
    <ContextualAnalyticsData
      containerType="component"
      containerId={componentId}
      attributes={attributes}
    >
      <FireTrackAnalytics eventName={ANALYTICS_VIEWED_EVENT_NAME} />
      <Helmet>
        <title>{`${data.compass.component.name} - Compass`}</title>
      </Helmet>

      <Content testId="dragonfruit-page-component-details.ui.content">
        <LeftSidebar
          id="left-sidebar"
          skipLinkTitle={formatMessage(messages.leftSidebarSkipLinkTitle)}
        >
          <ComponentLeftSidebar
            componentId={data.compass.component.id ?? componentId}
            componentType={data.compass.component.type}
            componentName={data.compass.component.name}
            componentPageApps={componentPageApps}
            unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
          />
        </LeftSidebar>

        <Main
          testId="dragonfruit-page-component-details.ui.main"
          id="main"
          skipLinkTitle={formatMessage(messages.mainSkipLinkTitle)}
        >
          <ComponentMain
            component={data.compass.component}
            pageType={pageType}
            extensionId={extensionId}
            componentPageApps={componentPageApps}
            dependencyAnnouncementData={dependencyAnnouncementData}
            unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
            refetchDependencyAnnouncementData={refetch}
          />
        </Main>

        {pageType !== ComponentDetailPageUrlParam.SETTINGS &&
          pageType !== ComponentDetailPageUrlParam.ACTIVITY && (
            <RightSidebar
              testId="dragonfruit-page-component-details.ui.right-sidebar"
              id="right-sidebar"
              skipLinkTitle={formatMessage(messages.rightSidebarSkipLinkTitle)}
              isFixed={false}
            >
              <ComponentRightSidebar component={data.compass.component} />
            </RightSidebar>
          )}
      </Content>
    </ContextualAnalyticsData>
  );
};

function getUnacknowledgedAnnouncementCount(
  acknowledgingComponentId: string,
  data?: GetComponentDependencyAnnouncementsQuery | null,
): number {
  if (!data) {
    return 0;
  }

  // This is horrible and I'm so so very sorry...
  const component = data?.compass?.component;

  const relationships =
    component?.__typename === 'CompassComponent' &&
    component.relationships?.__typename === 'CompassRelationshipConnection'
      ? component.relationships.nodes ?? []
      : [];

  const announcements = relationships
    .flatMap((relationship) => relationship.endNode?.announcements)
    .filter(notEmpty);

  const upcomingAnnouncements = filterAndSortUpcomingAnnouncements(
    announcements,
  );

  return upcomingAnnouncements.reduce((count, announcement) => {
    const acknowledgements = announcement.acknowledgements ?? [];

    const acknowledgement = acknowledgements.find(
      (item) => item.component?.id === acknowledgingComponentId,
    );

    const isAcknowledged = acknowledgement?.hasAcknowledged ?? false;

    return !isAcknowledged ? count + 1 : count;
  }, 0);
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export default ComponentDetailsPage;
