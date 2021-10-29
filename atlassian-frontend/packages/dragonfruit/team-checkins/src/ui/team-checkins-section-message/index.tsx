import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ClipBoard } from '@atlassian/dragonfruit-common-ui/assets';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  Actions,
  ButtonGroup,
  ContainerStyles,
  ContentContainerStyles,
  ContentDescription,
  Title,
} from './styled';

interface Props {
  onCheckin: () => void;
  onDismiss: () => void;
}

function TeamCheckinsSectionMessage({ onCheckin, onDismiss }: Props) {
  const { formatMessage } = useIntl();

  return (
    <ContainerStyles data-testid={'team-checkins-section-message'}>
      <ContentContainerStyles>
        <img src={ClipBoard} alt="" />
        <ContentDescription>
          <Title>{formatMessage(messages.sectionTitle)}</Title>
          <FormattedMessage
            {...messages.sectionBody}
            values={{
              link: (
                <a
                  // TODO https://softwareteams.atlassian.net/browse/COMPASS-4559
                  // Update the learn more link when design finalizes content
                  href={''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatMessage(messages.sectionBodyLink)}
                </a>
              ),
            }}
          />
        </ContentDescription>
      </ContentContainerStyles>
      <Actions>
        <ButtonGroup>
          <Button
            testId="team-checkins-section-message-close"
            shouldFitContainer
            onClick={onDismiss}
          >
            {formatMessage(CommonMessages.close)}
          </Button>
          <Button
            appearance="primary"
            testId="team-checkins-section-message-check-in"
            shouldFitContainer
            onClick={onCheckin}
          >
            {formatMessage(messages.sectionActionButton)}
          </Button>
        </ButtonGroup>
      </Actions>
    </ContainerStyles>
  );
}

export default withErrorBoundary(TeamCheckinsSectionMessage, {
  componentName: 'teamCheckinsSectionMessage',
});
