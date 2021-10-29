import React, { useCallback, useState } from 'react';

import Button from '@atlaskit/button';
import Modal, {
  ModalBody,
  ModalDialogProps,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTitleProps,
  ModalTransition,
  OnCloseHandler,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

type ModalControls = ({
  isOpen,
}?: {
  isOpen?: boolean;
}) => [{ isOpen: boolean }, { open: () => void; close: () => void }];

type ModalPropsBase = {
  children?: React.ReactNode;
  heading: string;
  isOpen: boolean;
  onClose: OnCloseHandler;
  onSubmit: () => void;
};

type ModalButtonProps = {
  closeButton: string;
  submitButton: string;
};

type ModalProps = ModalPropsBase &
  ModalButtonProps &
  Pick<ModalTitleProps, 'appearance'> &
  Omit<ModalDialogProps, 'onClose'>;

/**
 * Yields state values and mutators for modal display and display control.
 *
 * @param {boolean} isOpen - The initial state value for whether or not the
 * modal is open.
 */
export const useModalControls: ModalControls = ({
  isOpen: isOpenInitial = false,
} = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenInitial);
  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return [
    {
      isOpen: isOpen,
    },
    {
      open,
      close,
    },
  ];
};

/**
 * Returns a consistent modal that contains a header, body content, close button and submit button.
 * ModalDialogProps can be used to customise the Modal.
 * @param {React.ReactNode} [children] - content for the main body of the modal
 * @param {string} heading - the main heading of the modal
 * @param {boolean} isOpen - determines whether the modal is open or not
 * @param {OnCloseHandler} onClose - callback to handle when a user attempts to close the modal.
 * @param {() => void} onSubmit - callback to handle when a user submits the confirmation modal.
 * @param {string} closeButton - text to be displayed in the close button.
 * @param {string} submitButton - text to be displayed in the submit button.
 */
export const ConfirmationModal = (props: ModalProps) => {
  const {
    closeButton,
    children,
    heading,
    isOpen,
    onClose,
    onSubmit,
    submitButton,
    appearance,
    ...rest
  } = props;

  const Footer = () => (
    <ModalFooter>
      <Button appearance="subtle" onClick={onClose}>
        {closeButton}
      </Button>
      <Button
        appearance={appearance ?? 'primary'}
        onClick={onSubmit}
        autoFocus
        testId="pollinator.confirmation-modal.submit-button"
      >
        {submitButton}
      </Button>
    </ModalFooter>
  );

  return (
    <ModalTransition>
      {isOpen && (
        <Modal autoFocus={false} onClose={onClose} {...rest}>
          <ModalHeader>
            <ModalTitle appearance={appearance}>{heading}</ModalTitle>
          </ModalHeader>

          <ModalBody>{children}</ModalBody>
          <Footer />
        </Modal>
      )}
    </ModalTransition>
  );
};

/**
 * Returns a consistent delete modal that contains a header, body content, close button and submit button.
 * @param {React.ReactNode} [children] - content for the main body of the modal
 * @param {string} heading - the main heading of the modal
 * @param {boolean} isOpen - determines whether the modal is open or not
 * @param {OnCloseHandler} onClose - callback to handle when a user attempts to close the modal.
 * @param {() => void} onSubmit - callback to handle when a user submits the confirmation modal.
 * @param {string} [closeButton] - optional text to be displayed in the close button.
 * @param {string} [submitButton] - optional text to be displayed in the submit button.
 */
export const DeleteModal = (
  props: ModalPropsBase & Partial<ModalButtonProps>,
) => {
  const {
    children,
    heading,
    isOpen,
    onClose,
    onSubmit,
    closeButton,
    submitButton,
  } = props;
  const { formatMessage } = useIntl();

  return (
    <ConfirmationModal
      appearance="warning"
      heading={heading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      closeButton={closeButton ?? formatMessage(CommonMessages.cancel)}
      submitButton={submitButton ?? formatMessage(CommonMessages.remove)}
    >
      {children}
    </ConfirmationModal>
  );
};
