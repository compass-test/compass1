import React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { FooterWrapper } from './styled';

type Props = {
  onClose: () => void;
  onSubmit: () => void;
  name: string | undefined;
};

const DeleteConfirmationDialog: React.FC<Props> = ({
  onClose,
  onSubmit,
  name,
}) => {
  const { formatMessage } = useIntl();

  const Footer = () => (
    <ModalFooter>
      <FooterWrapper>
        <ButtonGroup>
          <Button
            appearance="subtle"
            onClick={onClose}
            testId="page-scorecard-templates.ui.delete-confirmation-dialog.button-close"
          >
            {formatMessage(CommonMessages.cancel)}
          </Button>
          <Button
            appearance="danger"
            onClick={onSubmit}
            testId="page-scorecard-templates.ui.delete-confirmation-dialog.button-remove"
          >
            {formatMessage(CommonMessages.delete)}
          </Button>
        </ButtonGroup>
      </FooterWrapper>
    </ModalFooter>
  );

  return (
    <ModalTransition>
      <ModalDialog
        autoFocus={false}
        width="medium"
        onClose={onClose}
        testId="page-scorecard-templates.ui.delete-confirmation-dialog"
      >
        <ModalHeader>
          <ModalTitle appearance="danger">
            {formatMessage(messages.ConfirmationHeader, {
              scorecardName: name,
            })}
          </ModalTitle>
        </ModalHeader>

        <ModalBody>{formatMessage(messages.ConfirmationMessage)}</ModalBody>
        <Footer />
      </ModalDialog>
    </ModalTransition>
  );
};

export default DeleteConfirmationDialog;
