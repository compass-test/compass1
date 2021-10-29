import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

import { FooterStyle } from './styled';

interface FooterProps {
  previousWizardStep: () => void;
  nextWizardStep: () => void;
  editing?: boolean;
  disableNextStep?: boolean;
  confirming?: boolean;
}

export const Footer = observer(
  ({
    previousWizardStep,
    nextWizardStep,
    editing,
    disableNextStep = false,
    confirming = false,
  }: FooterProps) => {
    return (
      <FooterStyle>
        <ButtonGroup>
          <Button onClick={previousWizardStep}>
            <FormattedMessage {...IntlCommonMessages[CommonMessage.Back]} />
          </Button>
          <Button
            appearance="primary"
            onClick={nextWizardStep}
            isDisabled={disableNextStep}
          >
            {!confirming ? (
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Next]} />
            ) : editing ? (
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Save]} />
            ) : (
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Create]} />
            )}
          </Button>
        </ButtonGroup>
      </FooterStyle>
    );
  },
);
