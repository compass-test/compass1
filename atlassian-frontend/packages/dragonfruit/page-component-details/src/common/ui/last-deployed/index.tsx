import React from 'react';

import moment from 'moment';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { G300, N800 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import {
  CompassComponentType,
  CompassDeploymentEvent,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  DataSection,
  Description,
  EnvironmentWrapper,
  Heading,
  Link,
  TextWrapper,
  TooltipWrapper,
} from './styled';

type Props = {
  deploymentEvent: Pick<
    CompassDeploymentEvent,
    'url' | 'lastUpdated' | 'displayName' | 'environment'
  >;
  componentType: CompassComponentType;
};

export function LastDeployed(props: Props) {
  const { componentType, deploymentEvent } = props;
  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const fireUIAnalyticsEventForDeploymentTagClicked = () => {
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'componentDeploymentTag',
      attributes: {
        componentType,
      },
    });
    fireUIAnalytics(event);
  };

  const fireUIAnalyticsEventForDeploymentTagHover = () => {
    const event = createAnalyticsEvent({
      action: 'hovered',
      actionSubject: 'componentDeploymentTag',
      attributes: {
        componentType,
      },
    });
    fireUIAnalytics(event);
  };

  const TooltipContent = () => (
    <TooltipWrapper>
      <DataSection>
        <Heading>{formatMessage(messages.deployment)}</Heading>
        <Description>{deploymentEvent?.displayName ?? ''}</Description>
      </DataSection>
      <DataSection>
        <Heading>{formatMessage(messages.environment)}</Heading>
        <EnvironmentWrapper>
          <CheckCircleIcon
            label="check-circle-icon"
            primaryColor={G300}
            secondaryColor={N800}
            size={'small'}
          />
          <Description>
            {deploymentEvent?.environment?.displayName ?? ''}
          </Description>
        </EnvironmentWrapper>
      </DataSection>
    </TooltipWrapper>
  );

  // Accounting for the nullable field
  if (!deploymentEvent.lastUpdated) {
    return null;
  }

  return (
    <TextWrapper data-testid="component-header.last-deployed">
      <span>{formatMessage(messages.lastDeployed)}</span>
      {/* Add a space between the label and the value */}{' '}
      <Tooltip
        onShow={() => {
          fireUIAnalyticsEventForDeploymentTagHover();
        }}
        tag="span"
        content={<TooltipContent />}
        position="bottom-start"
      >
        <Link
          href={deploymentEvent.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            fireUIAnalyticsEventForDeploymentTagClicked();
          }}
        >
          <time dateTime={deploymentEvent.lastUpdated}>
            {moment(deploymentEvent.lastUpdated).fromNow()}
          </time>
        </Link>
      </Tooltip>
    </TextWrapper>
  );
}
