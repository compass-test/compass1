import React from 'react';

import Button from '@atlaskit/button/custom-theme-button';

import { RepackageAtlaskitEvent } from './utils';

export type TaskActionName = {
  label: string;
};

type TaskActionProps = TaskActionName & {
  onClick: () => void;
  testId?: string;
  actionSubjectId: string;
};

export const TaskAction: React.FC<TaskActionProps> = ({
  onClick,
  actionSubjectId,
  label,
  testId,
}) => (
  <RepackageAtlaskitEvent actionSubjectId={actionSubjectId}>
    <Button onClick={onClick} testId={testId}>
      {label}
    </Button>
  </RepackageAtlaskitEvent>
);

export const TaskCancelAction: React.FC<{
  onCancel: () => void;
  testId?: string;
  actionSubjectId: string;
}> = ({ testId, onCancel, actionSubjectId }) => (
  <TaskAction
    label="Cancel"
    actionSubjectId={actionSubjectId}
    testId={testId}
    onClick={onCancel}
  />
);

export const TaskPrimaryAction: React.FC<{
  onClick: () => void;
  testId?: string;
  label?: string;
  actionSubjectId: string;
  /**
   * While loading button is automatically disabled
   * Field is mandatory as it is often omitted by mistake, if your operation is synchronous set it to be always false
   */
  loading: boolean;
  /**
   * Field is mandatory as it is often omitted by mistake, if your will never fail set it to be always false
   */
  failed: boolean;
  /**
   * If true the transition to the next screen will be disabled
   */
  disabled?: boolean;
}> = ({
  onClick,
  testId,
  actionSubjectId,
  label = 'Save',
  loading,
  disabled = false,
  failed,
}) => {
  const { label: localLabel }: TaskActionName =
    failed && !disabled && !loading // don't show try again if it is not actionable
      ? {
          label: 'Try Again',
        }
      : {
          label,
        };

  return (
    <RepackageAtlaskitEvent actionSubjectId={actionSubjectId}>
      <Button
        appearance="primary"
        type="submit"
        isLoading={loading}
        isDisabled={loading || disabled}
        onClick={onClick}
        testId={testId}
      >
        {localLabel}
      </Button>
    </RepackageAtlaskitEvent>
  );
};
