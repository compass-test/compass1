import React, { ComponentType } from 'react';
import { injectIntl } from 'react-intl';

import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { getComponentTestId } from '../../../common/util';
import { messages as footerMessages } from '../../panel-footer/messages';
import { messages } from './messages';
import { StyledButtonWrapper } from './styled';

const actionSubjectIds = {
  close: 'jsmGettingStartedPanelLozengeCloseButton',
};

export interface Props {
  onClose: () => void;
}

export const CloseButton: ComponentType<Props> = injectIntl(
  ({ intl, onClose }) => {
    return (
      <Tooltip content={intl.formatMessage(footerMessages.exitYourCoach)}>
        <StyledButtonWrapper>
          <Button
            spacing="none"
            onClick={(e, analyticsEvent) => {
              e.stopPropagation();
              fireUIAnalytics(analyticsEvent, actionSubjectIds.close);
              onClose();
            }}
            iconBefore={
              <CrossIcon
                label={intl.formatMessage(messages.close)}
                primaryColor="white"
                size="small"
              />
            }
            appearance="subtle"
            testId={getComponentTestId('lozengeCloseButton')}
          />
        </StyledButtonWrapper>
      </Tooltip>
    );
  },
);
