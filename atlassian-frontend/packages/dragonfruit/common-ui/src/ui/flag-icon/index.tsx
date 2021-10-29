import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import InfoIcon from '@atlaskit/icon/glyph/info';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import * as colors from '@atlaskit/theme/colors';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';

type FlagType = 'error' | 'success' | 'info' | 'warning';

type FlagIconProps = {
  type: FlagType;
};

const IconContainer = styled.span`
  color: ${({ iconColor }: any) => iconColor};
`;

const ERROR_ICON_COLOR = colors.R300;
const SUCCESS_ICON_COLOR = colors.G300;
const INFO_ICON_COLOR = colors.P300;
const WARNING_ICON_COLOR = colors.Y300;

const FlagIcon = injectIntl(
  ({ intl, type }: FlagIconProps & InjectedIntlProps) => {
    const { formatMessage } = intl;

    switch (type) {
      case 'error':
        return (
          <IconContainer iconColor={ERROR_ICON_COLOR}>
            <ErrorIcon label={formatMessage(CommonMessages.error)} />
          </IconContainer>
        );
      case 'success':
        return (
          <IconContainer iconColor={SUCCESS_ICON_COLOR}>
            <SuccessIcon label={formatMessage(CommonMessages.success)} />
          </IconContainer>
        );
      case 'info':
        return (
          <IconContainer iconColor={INFO_ICON_COLOR}>
            <InfoIcon label={formatMessage(CommonMessages.information)} />
          </IconContainer>
        );
      case 'warning':
        return (
          <IconContainer iconColor={WARNING_ICON_COLOR}>
            <WarningIcon label={formatMessage(CommonMessages.warning)} />
          </IconContainer>
        );
    }
  },
);

export const ErrorFlagIcon = <FlagIcon type="error" />;
export const SuccessFlagIcon = <FlagIcon type="success" />;
export const InfoFlagIcon = <FlagIcon type="info" />;
export const WarningFlagIcon = <FlagIcon type="warning" />;
