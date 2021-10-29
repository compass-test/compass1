import React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Button, {
  CustomThemeButtonProps,
} from '@atlaskit/button/custom-theme-button';
import Tooltip from '@atlaskit/tooltip';
import { gridSize } from '@atlaskit/theme/constants';
import { N0, N200, N40 } from '@atlaskit/theme/colors';
import styled from 'styled-components';
import { e100, e200 } from '@atlaskit/theme/elevation';

import { messages } from '../i18n';
import { GOOGLE_SERVICE, MICROSOFT_SERVICE, SLACK_SERVICE } from './constants';
import { GoogleIcon } from './images/google';
import { MicrosoftIcon } from './images/microsoft';
import { SlackIcon } from './images/slack';
import { useThirdPartyState } from './context';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const ThirdPartyConnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${N200};
  font-size: 12px;
  margin-top: 24px;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  svg {
    margin: 8px;
  }
`;

const OrContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${N200};
  font-size: 12px;
  line-height: ${gridSize() * 2}px;
  margin-top: 24px;
`;

const Line = styled.span`
  margin: 0px ${gridSize()}px;
  width: 41px;
  height: 0px;
  border: 1px solid ${N40};
`;

function StyledComponentsButton(props: CustomThemeButtonProps) {
  return <Button {...props} />;
}

const ConnectButton: any = styled(StyledComponentsButton)`
  && {
    flex: 1 1;
    margin: 3px 4px;
    padding: 0px !important;
    height: 40px !important;
    ${e100}
    display: flex;
    align-items: center;
    color: ${N200} !important;
    background-color: ${N0};
    &:hover,
    :active,
    :focus {
      align-items: center;
      background-color: ${N0};
      ${e200}
    }
  }
`;

const ConditionalTooltip = ({
  shouldShowTooltip,
  content,
  children,
}: {
  shouldShowTooltip: boolean;
  content: string;
  children: React.ReactNode;
}) => (
  <>
    {shouldShowTooltip ? (
      <Tooltip tag={'span'} position={'bottom'} content={content}>
        {children}
      </Tooltip>
    ) : (
      children
    )}
  </>
);

const ThirdPartyConnect: React.FC<InjectedIntlProps> = ({ intl }) => {
  const { enabledIntegrations, onConnectProvider } = useThirdPartyState();
  const showIntegrationLabel = enabledIntegrations.length < 4;
  return (
    <>
      <ThirdPartyConnectWrapper>
        <HeaderWrapper>
          <FormattedMessage {...messages.thirdPartyConnectTeammates} />
        </HeaderWrapper>
        <ButtonGroup>
          {enabledIntegrations.includes(GOOGLE_SERVICE) && (
            <ConnectButton
              shouldFitContainer
              onClick={() => {
                if (onConnectProvider) {
                  onConnectProvider(GOOGLE_SERVICE);
                }
              }}
              testId="testId-invite-people-connect-google"
            >
              <Tooltip
                tag={'span'}
                position={'bottom'}
                content={intl.formatMessage(messages.googleUserTooltipContent)}
              >
                <ButtonContent>
                  <GoogleIcon />
                  {showIntegrationLabel &&
                    intl.formatMessage(messages.googleThirdPartyButton)}
                </ButtonContent>
              </Tooltip>
            </ConnectButton>
          )}
          {enabledIntegrations.includes(SLACK_SERVICE) && (
            <ConnectButton
              shouldFitContainer
              onClick={() => {
                if (onConnectProvider) {
                  onConnectProvider(SLACK_SERVICE);
                }
              }}
              testId="testId-invite-people-connect-slack"
            >
              <ConditionalTooltip
                shouldShowTooltip={!showIntegrationLabel}
                content={intl.formatMessage(messages.slackThirdPartyButton)}
              >
                <ButtonContent>
                  <SlackIcon />
                  {showIntegrationLabel &&
                    intl.formatMessage(messages.slackThirdPartyButton)}
                </ButtonContent>
              </ConditionalTooltip>
            </ConnectButton>
          )}
          {enabledIntegrations.includes(MICROSOFT_SERVICE) && (
            <ConnectButton
              shouldFitContainer
              onClick={() => {
                if (onConnectProvider) {
                  onConnectProvider(MICROSOFT_SERVICE);
                }
              }}
              testId="testId-invite-people-connect-microsoft"
            >
              <ConditionalTooltip
                shouldShowTooltip={!showIntegrationLabel}
                content={intl.formatMessage(messages.microsoftThirdPartyButton)}
              >
                <ButtonContent>
                  <MicrosoftIcon />
                  {showIntegrationLabel &&
                    intl.formatMessage(messages.microsoftThirdPartyButton)}
                </ButtonContent>
              </ConditionalTooltip>
            </ConnectButton>
          )}
        </ButtonGroup>
      </ThirdPartyConnectWrapper>
      <OrContainerWrapper>
        <Line />
        {intl.formatMessage(messages.thirdPartyOr)}
        <Line />
      </OrContainerWrapper>
    </>
  );
};

export default injectIntl(ThirdPartyConnect);
