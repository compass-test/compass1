import React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';

import Tooltip from '@atlaskit/tooltip';
import { N200, N700, R50, N20 } from '@atlaskit/theme/colors';
import styled from 'styled-components';
import UnlinkIcon from '@atlaskit/icon/glyph/unlink';
import CogIcon from '@atlaskit/icon/glyph/settings';

import { triggerAnalyticsForClickIntegrationSettingsButton } from '../analytics';
import { messages } from '../i18n';
import { GOOGLE_SERVICE, MICROSOFT_SERVICE, SLACK_SERVICE } from './constants';
import { getManageAppsUrl } from './utils';
import { GoogleIcon } from './images/google';
import { MicrosoftIcon } from './images/microsoft';
import { SlackIcon } from './images/slack';
import { useThirdPartyState } from './context';

const MIN_INTEGRATIONS_WITH_LABEL = 4;

const ThirdPartyConnectedToWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: ${N200};
  font-size: 12px;
`;

const MessageWrapper = styled.span`
  margin: 0px 6px;
`;

const ConnectedIntegrationWrapper = styled.span<{
  integration: string;
}>`
  border-radius: 2px;
  margin: 0px 6px;
  height: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  :hover {
    ${({ integration }) =>
      `background-color: ${integration === SLACK_SERVICE ? N20 : R50};`}
  }
`;

const ConnectedIntegrationText = styled.span`
  color: ${N700};
  margin: 0px 4px;
`;

interface OwnProps {
  onManagePage?: () => void;
}

const ConnectedIntegration: React.FC<
  {
    integration: string;
    onManagePage?: () => void;
    shouldShowLabel?: boolean;
  } & InjectedIntlProps
> = ({ integration, onManagePage, intl, shouldShowLabel = true }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const { openSlackConnectDialog } = useThirdPartyState();
  const [hover, setHover] = React.useState(false);

  let icon: JSX.Element | null = null;
  let text: string | null = null;
  let toolTip: string | null = null;
  switch (integration) {
    case SLACK_SERVICE:
      icon = <SlackIcon height={16} width={16} key={integration} />;
      text = intl.formatMessage(messages.slackThirdPartyButton);
      toolTip = intl.formatMessage(messages.slackThirdPartyConnectedTooltip);
      break;
    case GOOGLE_SERVICE:
      icon = <GoogleIcon height={16} width={16} key={integration} />;
      text = intl.formatMessage(messages.googleThirdPartyButton);
      toolTip = intl.formatMessage(messages.googleThirdPartyConnectedTooltip);
      break;
    case MICROSOFT_SERVICE:
      icon = <MicrosoftIcon height={16} width={16} key={integration} />;
      text = intl.formatMessage(messages.microsoftThirdPartyButton);
      toolTip = intl.formatMessage(
        messages.microsoftThirdPartyConnectedTooltip,
      );
      break;
  }

  if (hover) {
    if (integration === SLACK_SERVICE) {
      icon = (
        <CogIcon
          primaryColor={N700}
          size={'small'}
          label={'settings'}
          key={integration}
        />
      );
    } else {
      icon = (
        <UnlinkIcon
          primaryColor={N700}
          size={'small'}
          label={'unlink'}
          key={integration}
        />
      );
    }
  }

  const onMouseOver = React.useCallback(() => {
    setHover(true);
  }, []);

  const onMouseOut = React.useCallback(() => {
    setHover(false);
  }, []);

  const onClick = React.useCallback(() => {
    triggerAnalyticsForClickIntegrationSettingsButton(
      integration,
      createAnalyticsEvent,
    );

    if (integration === SLACK_SERVICE) {
      openSlackConnectDialog();
    } else {
      const manageAppsUrl = getManageAppsUrl();
      window.open(manageAppsUrl);
      if (onManagePage) {
        onManagePage();
      }
    }
  }, [integration, createAnalyticsEvent, openSlackConnectDialog, onManagePage]);

  return (
    <ConnectedIntegrationWrapper
      integration={integration}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <Tooltip position="bottom" content={toolTip}>
        <span>{icon}</span>
      </Tooltip>
      {shouldShowLabel && (
        <ConnectedIntegrationText>{text}</ConnectedIntegrationText>
      )}
    </ConnectedIntegrationWrapper>
  );
};

const ThirdPartyConnectedTo: React.FC<OwnProps & InjectedIntlProps> = ({
  onManagePage,
  intl,
}) => {
  const { integrations } = useThirdPartyState();
  return (
    <ThirdPartyConnectedToWrapper>
      <MessageWrapper>
        <FormattedMessage {...messages.thirdPartyConnectedTo} />
      </MessageWrapper>
      {integrations.map((integration) => (
        <ConnectedIntegration
          intl={intl}
          integration={integration}
          key={integration}
          onManagePage={onManagePage}
          shouldShowLabel={integrations.length < MIN_INTEGRATIONS_WITH_LABEL}
        />
      ))}
    </ThirdPartyConnectedToWrapper>
  );
};
export default injectIntl(ThirdPartyConnectedTo);
