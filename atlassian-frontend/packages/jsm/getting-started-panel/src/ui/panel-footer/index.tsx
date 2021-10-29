import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AccordionItemLink } from '@atlassiansox/checklist';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { getComponentTestId } from '../../common/util';
import { FooterContainer } from './styled';
import { messages } from './messages';

const actionSubjectId = 'jsmGettingStartedPanelExitQuickStartButton';

interface Props {
  onExitQuickStart: () => void;
}

export const PanelFooter = ({
  intl: { formatMessage },
  onExitQuickStart,
}: Props & InjectedIntlProps) => {
  return (
    <FooterContainer>
      <AccordionItemLink
        onClick={(_, analyticsEvent) => {
          fireUIAnalytics(analyticsEvent, actionSubjectId);
          onExitQuickStart();
        }}
        testId={getComponentTestId('panelFooterCloseButton')}
      >
        {formatMessage(messages.exitYourCoach)}
      </AccordionItemLink>
    </FooterContainer>
  );
};

export default injectIntl(PanelFooter);
