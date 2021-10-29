import React from 'react';

import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';

type ModalSkeletonProps = {
  modalHeader: React.FC;
  modalBody: React.FC;
  modalFooter?: React.FC;
  onCloseModal?: () => void;
  closeEnabled?: boolean;
  closeOnOverlayClick?: boolean;
};

export const ModalSkeleton = ({
  modalHeader: ModalHeader,
  modalBody: ModalBody,
  modalFooter: ModalFooter = () => <></>,
  onCloseModal,
  closeEnabled = true,
  closeOnOverlayClick = false,
}: ModalSkeletonProps): React.ReactElement => {
  return (
    <ModalTransition>
      <ModalDialog
        onClose={onCloseModal}
        shouldCloseOnOverlayClick={closeOnOverlayClick}
        shouldCloseOnEscapePress={closeEnabled}
        width={700}
        shouldScrollInViewport
      >
        <ModalHeader />
        <ModalBody />
        <ModalFooter />
      </ModalDialog>
    </ModalTransition>
  );
};
