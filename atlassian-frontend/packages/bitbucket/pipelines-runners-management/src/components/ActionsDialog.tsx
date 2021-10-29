import React, { useState } from 'react';

import MoreIcon from '@atlaskit/icon/glyph/more';
import InlineDialog from '@atlaskit/inline-dialog';

import { ActionButton, ActionWrapper, ButtonGroup } from './styled';

type Props = {
  runnerUuid: string;
  status: string;
  onEdit: (runnerUuid: string) => void;
  onDelete: (runnerUuid: string) => void;
  onChangeStatus: (runnerUuid: string, newStatus: string) => void;
};

const ActionsDialog: React.FC<Props> = ({
  runnerUuid,
  status,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const showChangeStatusAction = status !== 'UNREGISTERED';
  const action = status === 'DISABLED' ? 'Enable' : 'Disable';
  const newStatus = status === 'DISABLED' ? 'ENABLED' : 'DISABLED';

  return (
    <InlineDialog
      onClose={() => setIsOpen(false)}
      content={
        <ButtonGroup>
          <ActionButton onClick={() => onEdit(runnerUuid)}>Edit</ActionButton>
          {showChangeStatusAction && (
            <ActionButton onClick={() => onChangeStatus(runnerUuid, newStatus)}>
              {action}
            </ActionButton>
          )}
          <ActionButton onClick={() => onDelete(runnerUuid)}>
            Delete
          </ActionButton>
        </ButtonGroup>
      }
      isOpen={isOpen}
    >
      <ActionWrapper onClick={() => setIsOpen(true)}>
        <MoreIcon label="actions" size="medium" />
      </ActionWrapper>
    </InlineDialog>
  );
};

export default React.memo(ActionsDialog);
