import React from 'react';

import { FormattedMessage } from 'react-intl';
import { useRouterActions } from 'react-resource-router';

import Button from '@atlaskit/button';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { NoThirdPartyConnections } from '@atlassian/dragonfruit-common-ui/assets';
import { CONFIG_AS_CODE_DAC_LINK } from '@atlassian/dragonfruit-external-component-management/constants';
import { routes } from '@atlassian/dragonfruit-routes';
import {
  useIntl,
  withErrorBoundary,
  writeToLocalStorage,
} from '@atlassian/dragonfruit-utils';

import { DATA_MANAGER_SECTION_MESSAGE_SEEN_STORAGE_KEY } from '../../../../common/constants';

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
  dismissMessage: () => void;
}

function ManagedComponentSectionMessage(props: Props) {
  const { formatMessage } = useIntl();
  const { push } = useRouterActions();

  return (
    <ContainerStyles data-testid={'managed-component-section-message'}>
      <ContentContainerStyles>
        <img src={NoThirdPartyConnections} alt="" />
        <ContentDescription>
          <Title>{formatMessage(messages.sectionTitle)}</Title>
          <FormattedMessage
            {...messages.sectionBody}
            values={{
              link: (
                <a
                  href={CONFIG_AS_CODE_DAC_LINK}
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
            testId="managed-component-section-message-close"
            shouldFitContainer
            onClick={props.dismissMessage}
          >
            {formatMessage(CommonMessages.close)}
          </Button>
          <Button
            appearance="primary"
            testId="managed-component-section-message-set-up"
            shouldFitContainer
            onClick={() => {
              writeToLocalStorage(
                DATA_MANAGER_SECTION_MESSAGE_SEEN_STORAGE_KEY,
                'true',
              );
              push(routes.APPS());
            }}
          >
            {formatMessage(messages.sectionActionButton)}
          </Button>
        </ButtonGroup>
      </Actions>
    </ContainerStyles>
  );
}

export default withErrorBoundary(ManagedComponentSectionMessage, {
  componentName: 'managedComponentSectionMessage',
});
