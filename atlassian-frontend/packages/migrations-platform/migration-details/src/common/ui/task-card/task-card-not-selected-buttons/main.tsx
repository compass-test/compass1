import React, { FC } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';

import SelectButton from './select-button';
import SkipButton from './skip-button';

type Props = {
  taskName: string;
  onSelect: () => void;
  onSkip?: () => void;
  // Skip button text override. This defaults to using the taskName
  skipButtonText?: string;
  isDisabled?: boolean;
  isSkipLoading?: boolean;
  isSelectLoading?: boolean;
  shouldAllowSkip?: boolean;
};

const TaskCardNotSelectedButtons: FC<Props> = ({
  taskName,
  onSelect,
  onSkip,
  skipButtonText,
  isDisabled,
  isSkipLoading,
  isSelectLoading,
  shouldAllowSkip,
}) => {
  return (
    <ButtonGroup>
      <SelectButton
        onClick={onSelect}
        isDisabled={isDisabled || isSkipLoading}
        isLoading={isSelectLoading}
      />
      {shouldAllowSkip && onSkip && !isDisabled && (
        <SkipButton
          taskName={taskName}
          onClick={onSkip}
          isDisabled={isDisabled || isSelectLoading}
          isLoading={isSkipLoading}
          text={skipButtonText}
        />
      )}
    </ButtonGroup>
  );
};

export default TaskCardNotSelectedButtons;
