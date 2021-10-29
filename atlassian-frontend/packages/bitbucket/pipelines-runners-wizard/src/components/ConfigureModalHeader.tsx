import React from 'react';

import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { ModalHeader, ModalTitle, useModal } from '@atlaskit/modal-dialog';

const ConfigureModalHeader: React.FC<{ heading?: string }> = ({ heading }) => {
  const { onClose } = useModal();
  return (
    <ModalHeader>
      <ModalTitle>{heading}</ModalTitle>
      <Button
        onClick={onClose}
        appearance="subtle-link"
        spacing="none"
        name="closeModal"
      >
        <EditorCloseIcon label={'Close modal'} />
      </Button>
    </ModalHeader>
  );
};

export default React.memo(ConfigureModalHeader);
