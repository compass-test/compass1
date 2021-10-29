import React, { useCallback, useState } from 'react';

import { Runner } from '@atlassian/pipelines-models';

import { EditRunner, RunnerAction } from '../types';

import ConfigureStep from './ConfigureStep';

type Props = {
  onEditRunner: EditRunner;
  setRunnerEdited: (existingRunnerUuid: string) => void;
  sendAnalyticEvent: (runnerAction: RunnerAction) => void;
  existingRunner: Runner;
};

const ConfigureRunner: React.FC<Props> = ({
  onEditRunner,
  setRunnerEdited,
  sendAnalyticEvent,
  existingRunner,
}) => {
  const [runnerActionError, setRunnerActionError] = useState<boolean | string>(
    false,
  );

  const asyncEditRunner = useCallback(
    async (newRunnerName: string, newRunnerLabels: string[]) => {
      try {
        await onEditRunner(existingRunner.uuid, newRunnerName, newRunnerLabels);
        setRunnerEdited(existingRunner.uuid);
        setRunnerActionError(false);
      } catch (error) {
        setRunnerActionError(true);
      }
    },
    [onEditRunner, existingRunner.uuid, setRunnerEdited],
  );

  const onSubmit = useCallback(
    (newRunnerName: string, newRunnerLabels: string[]) => {
      sendAnalyticEvent(RunnerAction.EDIT);
      asyncEditRunner(newRunnerName, newRunnerLabels);
    },
    [asyncEditRunner, sendAnalyticEvent],
  );

  return (
    <ConfigureStep
      onSubmit={onSubmit}
      runnerActionError={runnerActionError}
      customName={existingRunner.name}
      customLabels={existingRunner.labels}
      runnerAction={RunnerAction.EDIT}
      isReconfiguringRunner={true}
    />
  );
};

export default React.memo(ConfigureRunner);
