import React from 'react';

import Button from '@atlaskit/button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { AddShortcutModalProps } from '../../src/model/AddShortcutModalProps';

export const AddShortcutModal = (props: AddShortcutModalProps) => (
  <Modal>
    <ModalHeader>
      <ModalTitle>Add a shortcut...</ModalTitle>
    </ModalHeader>
    <ModalBody>This modal will be provided.</ModalBody>
    <ModalFooter>
      <Button onClick={props.onCompleted} autoFocus>
        Add
      </Button>
    </ModalFooter>
  </Modal>
);
