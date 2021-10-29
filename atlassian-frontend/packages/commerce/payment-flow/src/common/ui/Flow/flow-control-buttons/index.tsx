import React, { ReactElement } from 'react';

import { ButtonGroup } from '@atlaskit/button';
import {
  TaskAction,
  TaskActionName,
  TaskCancelAction,
  TaskPrimaryAction,
} from '@atlassian/commerce-layout';

import { FlowControl } from '../../../controllers/use-flow-control/types';

type Props<T> = {
  flowControl: FlowControl<T>;
  /**
   * Allows to setup custom event subject id and label if it is the last step
   * By default it is "Save" and action subject id is "save"
   * If there is next screen label is always "Next" and action subject id is "next"
   * If there was an error label is always "Try Again" and action subject id is "tryAgain"
   */
  lastScreenButtonData?: TaskActionName;
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
  onNext: (flowControl: FlowControl<T>) => void;
  nextButtonTestId?: string;
  entityName: string;
};

export const FlowControlButtons = <T extends unknown>({
  flowControl,
  failed,
  loading,
  lastScreenButtonData,
  disabled,
  onNext,
  entityName,
  nextButtonTestId,
}: Props<T>): ReactElement => {
  const { firstStep, cancel, moveBack } = flowControl;
  const { label }: TaskActionName = flowControl.hasNextStep
    ? {
        label: 'Next',
      }
    : lastScreenButtonData
    ? lastScreenButtonData
    : {
        label: 'Save',
      };

  return (
    <>
      <ButtonGroup>
        {firstStep && cancel && (
          <TaskCancelAction
            onCancel={cancel}
            actionSubjectId={`cancel${entityName}Button`}
          />
        )}
        {!firstStep && (
          <TaskAction
            actionSubjectId={`back${entityName}Button`}
            onClick={() => moveBack()}
            label="Back"
          />
        )}
        <TaskPrimaryAction
          actionSubjectId={`submit${entityName}Button`}
          onClick={() => onNext(flowControl)}
          testId={nextButtonTestId}
          loading={loading}
          disabled={disabled}
          failed={failed}
          label={label}
        />
      </ButtonGroup>
    </>
  );
};
