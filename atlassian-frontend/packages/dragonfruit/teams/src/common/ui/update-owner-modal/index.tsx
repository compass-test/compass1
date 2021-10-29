import React from 'react';

import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import UpdateOwnerForm from './update-owner-form';
import { UpdateOwnerModalProps } from './update-owner-form/types';

function UpdateOwnerModal(props: UpdateOwnerModalProps) {
  const {
    onCancel,
    isEditModal,
    updateOwner,
    componentId,
    defaultValues,
    ...modalProps
  } = props;

  const { formatMessage } = useIntl();

  return (
    <ModalDialog
      testId="dragonfruit-update-component-owner-modal"
      autoFocus={false}
      {...modalProps}
    >
      <ModalHeader>
        <ModalTitle>
          {isEditModal
            ? formatMessage(messages.editOwnerTitle)
            : formatMessage(messages.addOwnerTitle)}
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <UpdateOwnerForm {...props} />
      </ModalBody>
    </ModalDialog>
  );
}

export default UpdateOwnerModal;
