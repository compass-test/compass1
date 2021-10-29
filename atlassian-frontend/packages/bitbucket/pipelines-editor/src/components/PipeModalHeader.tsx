import React from 'react';

import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { useModal } from '@atlaskit/modal-dialog';

const PipeModalHeader: React.FC<{ heading?: string }> = ({ heading }) => {
  const { onClose, titleId } = useModal();
  return (
    <header style={{ padding: heading ? '24px 24px 0' : '0' }}>
      <h2 id={titleId}>{heading}</h2>
      <Button
        onClick={onClose}
        appearance="subtle"
        style={{ position: 'absolute', right: 16, top: 16 }}
        iconBefore={<CrossIcon label="Close Modal" />}
      />
    </header>
  );
};

export default React.memo(PipeModalHeader);
