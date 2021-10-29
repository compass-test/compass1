import React, { FC } from 'react';

import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import Tooltip from '@atlaskit/tooltip';

import MigrationStatusIcon from '../migration-status-icon';

import {
  Message,
  MessageDisabled,
  TooltipIconContainer,
  Wrapper,
} from './styled';

export type Props = {
  status:
    | 'ready'
    | 'warning'
    | 'error-lite'
    | 'error'
    | 'complete'
    | 'running'
    | 'disabled';
  message: string;
  tooltip?: string;
};

const MigrationProgressMessage: FC<Props> = ({ status, message, tooltip }) => {
  return (
    <Wrapper>
      <MigrationStatusIcon status={status} />
      {status === 'disabled' ? (
        <MessageDisabled>{message}</MessageDisabled>
      ) : (
        <Message>{message}</Message>
      )}
      {tooltip && (
        <Tooltip content={tooltip}>
          <TooltipIconContainer>
            <EditorPanelIcon label="tooltip" size="medium" />
          </TooltipIconContainer>
        </Tooltip>
      )}
    </Wrapper>
  );
};

export default MigrationProgressMessage;
