import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import DynamicTable from '@atlaskit/dynamic-table';
import { RowType } from '@atlaskit/dynamic-table/types';
import EmptyState from '@atlaskit/empty-state';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import Lozenge from '@atlaskit/lozenge';
import PageHeader from '@atlaskit/page-header';
import { G300 } from '@atlaskit/theme/colors';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import { CONFIG_AS_CODE_DAC_LINK } from '@atlassian/dragonfruit-external-component-management/constants';
import {
  CompassComponentCommonDetailFragment,
  CompassEventType,
  GetComponentEventsQuery,
  useGetComponentEventsQuery,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { default as ConfiguredIcon } from '../../../common/assets/Configured.svg';
import { default as UnconfiguredIcon } from '../../../common/assets/Unconfigured.svg';
import { ComponentBreadcrumbs } from '../../../common/ui/breadcrumbs';

import messages from './messages';
import {
  Description,
  EnvironmentContainer,
  EnvironmentText,
  EventTableWrapper,
} from './styled';
import { TimeCell } from './time-cell';

export type ActivityFeedProps = {
  currentComponent: CompassComponentCommonDetailFragment;
};

export function ActivityFeed(props: ActivityFeedProps) {
  const { currentComponent } = props;

  const { formatMessage } = useIntl();

  const { loading, data } = useGetComponentEventsQuery({
    variables: { id: currentComponent.id, query: { first: 20 } },
  });

  const head = {
    cells: [
      {
        key: 'time',
        content: formatMessage(messages.time),
        width: 15,
      },
      {
        key: 'status',
        content: formatMessage(messages.status),
        width: 10,
      },
      {
        key: 'event',
        content: formatMessage(messages.event),
        shouldTruncate: true,
        width: 10,
      },
      {
        key: 'description',
        content: formatMessage(messages.description),
        shouldTruncate: true,
      },
      {
        key: 'environment',
        content: formatMessage(messages.environment),
        shouldTruncate: true,
        width: 20,
      },
    ],
  };

  const breadcrumbs = (
    <ComponentBreadcrumbs
      componentId={currentComponent.id}
      componentName={currentComponent.name}
      componentType={currentComponent.type}
    />
  );

  const configuredView = (
    <EmptyState
      header={formatMessage(messages.emptyStateConfiguredTitle)}
      description={formatMessage(messages.emptyStateConfiguredDescription)}
      imageUrl={ConfiguredIcon}
    />
  );

  const unconfiguredView = (
    <EmptyState
      header={formatMessage(messages.emptyStateUnconfiguredTitle)}
      description={
        <>
          {formatMessage(messages.emptyStateUnonfiguredDescription)}{' '}
          <a href={CONFIG_AS_CODE_DAC_LINK} target="_blank" rel="noopener">
            {formatMessage(messages.learnMore)}
          </a>
        </>
      }
      imageUrl={UnconfiguredIcon}
    />
  );

  return (
    <MainContainer>
      <PageHeader breadcrumbs={breadcrumbs}>
        {formatMessage(messages.pageHeader)}
      </PageHeader>
      <Description>{formatMessage(messages.pageDescription)}</Description>
      <EventTableWrapper>
        <DynamicTable
          head={head}
          rows={eventDataTable(data)}
          loadingSpinnerSize="large"
          isLoading={loading}
          isFixedSize
          emptyView={
            currentComponent.dataManager ? configuredView : unconfiguredView
          }
        />
      </EventTableWrapper>
    </MainContainer>
  );
}

function eventDataTable(data: GetComponentEventsQuery | undefined): RowType[] {
  const component = data?.compass?.component;

  if (component?.__typename !== 'CompassComponent') {
    return [];
  }

  const eventsConnection = component?.events;

  if (eventsConnection?.__typename !== 'CompassEventConnection') {
    return [];
  }

  const events = eventsConnection.nodes;

  if (!events) {
    return [];
  }
  return events.map((event) => {
    return {
      cells: [
        { content: <TimeCell eventLastUpdated={event.lastUpdated} /> },
        { content: <Lozenge appearance="success">{event.state}</Lozenge> },
        {
          content: (
            <EventCell displayName={event.displayName} url={event.url} />
          ),
        },
        {
          content: <>{event.description}</>,
        },
        {
          content: (
            <EnvironmentContainer>
              <CheckCircleIcon primaryColor={G300} label="Info" />
              <EnvironmentText>
                {event.environment?.displayName}
              </EnvironmentText>
            </EnvironmentContainer>
          ),
        },
      ],
    };
  });
}

type EventCellProps = {
  displayName: string;
  url: string;
};

function EventCell(props: EventCellProps) {
  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const { url, displayName } = props;

  const fireUIAnalyticsEventForEventLinkClicked = () => {
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'componentEvent',
      attributes: {
        eventType: CompassEventType.DEPLOYMENT,
        activityFeedView: 'table',
      },
    });
    fireUIAnalytics(event);
  };
  return (
    <a
      href={url}
      rel="noopener"
      target="_blank"
      onClick={() => {
        fireUIAnalyticsEventForEventLinkClicked();
      }}
    >
      {formatMessage(messages.deploymentLinkText, { displayName: displayName })}
    </a>
  );
}
