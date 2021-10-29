import React, { FC } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';

import EditButton from './edit-button';
import FixErrorButton from './fix-error-button';

type Props = {
  onSelect: () => void;
  isError?: boolean;
  onFixError?: () => void;
  fixErrorButtonText?: string;
};

const TaskCardSelectedButtons: FC<Props> = ({
  onSelect,
  isError,
  fixErrorButtonText,
  onFixError,
}) => {
  return (
    <ButtonGroup>
      <EditButton onClick={onSelect} />
      {isError && onFixError ? (
        <FixErrorButton text={fixErrorButtonText} onClick={onFixError} />
      ) : null}
    </ButtonGroup>
  );
};

export default TaskCardSelectedButtons;
