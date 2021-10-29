import { ConfluenceLogo } from '@atlaskit/logo';
import { N100, N400, N600 } from '@atlaskit/theme/colors';
import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import messages from '../../messages';
import { PoweredBy, ButtonWrapper, LogoWrapper } from './styled';
import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

interface Props {
  onClick?: (ev: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => void;
  href?: string;
}

const PoweredByConfluence = ({
  onClick,
  href,
  intl,
}: Props & InjectedIntlProps) => {
  return (
    <PoweredBy>
      {intl.formatMessage(messages.poweredBy)}
      <ButtonWrapper>
        <Tooltip content={intl.formatMessage(messages.poweredByTooltip)}>
          <Button
            appearance="subtle"
            onClick={onClick}
            href={href}
            target="_blank"
            iconBefore={
              <LogoWrapper>
                <ConfluenceLogo
                  size="xsmall"
                  textColor={N400}
                  iconColor={N100}
                  iconGradientStart={N600}
                  iconGradientStop={N100}
                />
              </LogoWrapper>
            }
          />
        </Tooltip>
      </ButtonWrapper>
    </PoweredBy>
  );
};

export default injectIntl(PoweredByConfluence);
