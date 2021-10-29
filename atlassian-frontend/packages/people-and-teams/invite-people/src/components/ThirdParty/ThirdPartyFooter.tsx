import React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import Button, {
  CustomThemeButtonProps,
} from '@atlaskit/button/custom-theme-button';
import Tooltip from '@atlaskit/tooltip';
import { N20A, N200, N10 } from '@atlaskit/theme/colors';
import { e100, e200 } from '@atlaskit/theme/elevation';
import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

import { messages } from '../i18n';
import { GOOGLE_SERVICE, MICROSOFT_SERVICE, SLACK_SERVICE } from './constants';

import { GoogleIcon } from './images/google';
import { MicrosoftIcon } from './images/microsoft';
import { SlackIcon } from './images/slack';
import { useThirdPartyState } from './context';

const HeaderWrapper = styled.div`
  margin: 4px 0px;
`;

const ThirdPartyFooterWrapper = styled.div`
  display: flex;
  background-color: ${N20A};
  color: ${N200};
  font-size: 12px;
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const FoooterContent = styled.div`
  display: flex;
  flex: 1;
  max-width: ${gridSize() * 44.25}px;
  flex-direction: column;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  button:not(:last-child) {
    margin-right: 8px;
  }
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

function StyledComponentsButton(props: CustomThemeButtonProps) {
  return <Button {...props} />;
}

const ConnectButton: any = styled(StyledComponentsButton)`
  && {
    height: 40px !important;
    ${e100}
    display: flex;
    align-items: center;
    justify-content: 'center';
    color: ${N200} !important;
    background-color: ${N10} !important;
    &:hover,
    :active,
    :focus {
      align-items: center;
      ${e200}
    }
  }
`;

const ThirdPartyFooter: React.FC<InjectedIntlProps> = ({ intl }) => {
  const {
    enabledIntegrations,
    integrations,
    onConnectProvider,
  } = useThirdPartyState();

  return (
    <ThirdPartyFooterWrapper>
      <FoooterContent>
        <HeaderWrapper>
          <FormattedMessage {...messages.thirdPartyConnect} />
        </HeaderWrapper>
        <ButtonGroup>
          {/* only show google button if google integration is enabled but
              not connected */}
          {enabledIntegrations.includes(GOOGLE_SERVICE) &&
            !integrations.includes(GOOGLE_SERVICE) && (
              <ConnectButton
                shouldFitContainer
                onClick={() => {
                  onConnectProvider(GOOGLE_SERVICE);
                }}
              >
                <Tooltip
                  tag={'span'}
                  position={'bottom'}
                  content={intl.formatMessage(
                    messages.googleUserTooltipContent,
                  )}
                >
                  <ButtonContent>
                    <GoogleIcon />
                    {intl.formatMessage(messages.googleThirdPartyButton)}
                  </ButtonContent>
                </Tooltip>
              </ConnectButton>
            )}
          {/* only show slack button if slack integration is enabled but not connected */}
          {enabledIntegrations.includes(SLACK_SERVICE) &&
            !integrations.includes(SLACK_SERVICE) && (
              <ConnectButton
                shouldFitContainer
                onClick={() => {
                  if (onConnectProvider) {
                    onConnectProvider(SLACK_SERVICE);
                  }
                }}
              >
                <ButtonContent>
                  <SlackIcon />
                  {intl.formatMessage(messages.slackThirdPartyButton)}
                </ButtonContent>
              </ConnectButton>
            )}
          {/* only show microsoft button if microsoft integration is enabled but not connected */}
          {enabledIntegrations.includes(MICROSOFT_SERVICE) &&
            !integrations.includes(MICROSOFT_SERVICE) && (
              <ConnectButton
                shouldFitContainer
                onClick={() => {
                  if (onConnectProvider) {
                    onConnectProvider(MICROSOFT_SERVICE);
                  }
                }}
              >
                <ButtonContent>
                  <MicrosoftIcon />
                  {intl.formatMessage(messages.microsoftThirdPartyButton)}
                </ButtonContent>
              </ConnectButton>
            )}
        </ButtonGroup>
      </FoooterContent>
    </ThirdPartyFooterWrapper>
  );
};

export default injectIntl(ThirdPartyFooter);
