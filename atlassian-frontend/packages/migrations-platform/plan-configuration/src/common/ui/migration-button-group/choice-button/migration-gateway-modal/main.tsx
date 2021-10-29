import React, { FC } from 'react';

import {
  FormattedHTMLMessage,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl';

import { ButtonGroup } from '@atlaskit/button';
import InfoIcon from '@atlaskit/icon/glyph/info';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { B500 } from '@atlaskit/theme/colors';
import { BackButton, ContinueButton } from '@atlassian/mpt-elements';

import messages from './messages';
import * as Styled from './styled';

export type Props = InjectedIntlProps & {
  destination: string;
  isLoading: boolean;
  onContinue: () => void;
  onClose: () => void;
  administrator?: string;
};

const MigrationGatewayModal: FC<Props> = ({
  intl,
  destination,
  isLoading,
  onContinue,
  onClose,
  administrator,
}) => {
  const heading = (
    <Styled.Header>
      <Styled.HeaderIcon>
        <InfoIcon size="medium" label="Info:" primaryColor={B500} />
      </Styled.HeaderIcon>
      <FormattedMessage {...messages.chooseDestination} />
    </Styled.Header>
  );

  const Footer = () => {
    return (
      <ModalFooter>
        <ButtonGroup>
          <BackButton onClick={onClose} />
          <ContinueButton
            autoFocus
            analyticsId="continueButton"
            onClick={onContinue}
            isLoading={isLoading}
          >
            <FormattedMessage {...messages.continueButtonText} />
          </ContinueButton>
        </ButtonGroup>
      </ModalFooter>
    );
  };

  return (
    <ModalDialog onClose={onClose} width={430}>
      <ModalHeader>
        <ModalTitle>{heading}</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <FormattedHTMLMessage
          {...messages.chooseDestinationSummary}
          values={{
            destination,
            administrator:
              administrator || intl.formatMessage(messages.administratorText),
          }}
        />
      </ModalBody>
      <Footer />
    </ModalDialog>
  );
};

export default injectIntl(MigrationGatewayModal);
