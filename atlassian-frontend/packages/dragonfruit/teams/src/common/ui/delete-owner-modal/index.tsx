import React, { useCallback } from 'react';

import { ButtonProps } from '@atlaskit/button';
import Button from '@atlaskit/button/standard-button';
import { useFlags } from '@atlaskit/flag';
import ModalDialog, {
  ModalBody,
  ModalDialogProps,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type DeleteOwnerModalProps = {
  // Returns the ID of the created component
  updateOwner: (
    componentId: string,
    ownerId?: string | null,
  ) => Promise<boolean>;
  onCancel?: ButtonProps['onClick'];
  componentId: string;
} & ModalDialogProps;

function DeleteOwnerModal(props: DeleteOwnerModalProps) {
  const { updateOwner, onCancel, componentId, ...modalProps } = props;

  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();

  const Header = () => {
    return (
      <ModalHeader>
        <ModalTitle appearance="danger">
          {formatMessage(messages.deleteOwnerTitle)}
        </ModalTitle>
      </ModalHeader>
    );
  };

  const showErrorFlag = useCallback(() => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'dragonfruit-update-component-owner-modal.ui.update-error',
      title: formatMessage(messages.deleteOwnerErrorFlagTitle),
      description: formatMessage(messages.deleteOwnerErrorFlagContent),
    });
  }, [showFlag, formatMessage]);

  const handleSubmit = useCallback(async () => {
    try {
      const mutationResult = await updateOwner(componentId, null);
      if (mutationResult) {
        showFlag({
          ...BaseSuccessFlagProps,
          id: 'dragonfruit-update-component-owner-modal.ui.update-success',
          title: formatMessage(CommonMessages.success),
          description: formatMessage(messages.deleteOwnerSuccessFlagContent),
        });
      } else {
        showErrorFlag();
      }
    } catch (error) {
      showErrorFlag();
      throw error;
    }
  }, [updateOwner, showFlag, componentId, formatMessage, showErrorFlag]);

  return (
    <ModalDialog
      testId="dragonfruit-update-component-owner-modal"
      {...modalProps}
      autoFocus={false}
    >
      <Header />
      <ModalBody>{formatMessage(messages.deleteOwnerContent)}</ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onCancel}>
          {formatMessage(CommonMessages.cancel)}
        </Button>
        <Button appearance="danger" autoFocus onClick={handleSubmit}>
          {formatMessage(CommonMessages.remove)}
        </Button>
      </ModalFooter>
    </ModalDialog>
  );
}

export default DeleteOwnerModal;
