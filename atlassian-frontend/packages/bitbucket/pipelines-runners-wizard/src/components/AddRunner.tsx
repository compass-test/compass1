import React, { useCallback, useEffect, useState } from 'react';

import { ProgressTracker, Stages } from '@atlaskit/progress-tracker';
import { Runner, SELF_HOSTED_LABEL } from '@atlassian/pipelines-models';

import { LINUX_SYSTEM_OPTION } from '../const';
import { CreateRunner, EditRunner, RunnerAction } from '../types';

import ConfigureStep from './ConfigureStep';
import RunStep from './RunStep';
import UseStep from './UseStep';

const progressSteps = ['Configure', 'Run', 'Use'];

type Props = {
  onCloseDialog: () => void;
  onCreateRunner: CreateRunner;
  onEditRunner: EditRunner;
  setCreatedRunner: (runner: Runner) => void;
  setRunCommandActioned: (isActioned: boolean) => void;
  sendAnalyticEvent: (runnerAction: RunnerAction) => void;
  repositoryUuid: string;
  workspaceUuid: string;
  environment: string;
  createdRunner?: Runner; // We store the created runner in the parent as it allows us to determine whether we need to show the copy command modal and hence also come back to the run step
};

const AddRunner: React.FC<Props> = ({
  onCloseDialog,
  onCreateRunner,
  onEditRunner,
  setCreatedRunner,
  setRunCommandActioned,
  sendAnalyticEvent,
  repositoryUuid,
  workspaceUuid,
  environment,
  createdRunner,
}) => {
  const initProgressItems: Stages = [
    {
      id: '0',
      label: 'Configure',
      percentageComplete: createdRunner ? 100 : 0,
      status: createdRunner ? 'visited' : 'current',
      noLink: true,
    },
    {
      id: '1',
      label: 'Run',
      percentageComplete: 0,
      status: createdRunner ? 'current' : 'disabled',
      noLink: true,
    },
    {
      id: '2',
      label: 'Use',
      percentageComplete: 0,
      status: 'disabled',
      noLink: true,
    },
  ];
  const [progressItems, setProgressItems] = useState(initProgressItems);
  const [currentStep, setCurrentStep] = useState(
    createdRunner ? progressSteps[1] : progressSteps[0],
  );
  const [isReconfiguringRunner, setIsReconfiguringRunner] = useState(false);

  const [isEditingRunner, setIsEditingRunner] = useState<boolean>(false);
  const [isCreatingRunner, setIsCreatingRunner] = useState<boolean>(false);
  const [runnerActionError, setRunnerActionError] = useState<boolean | string>(
    false,
  );

  const asyncEditRunner = useCallback(
    async (newRunnerName: string, newRunnerLabels: string[]) => {
      if (!createdRunner) {
        setRunnerActionError(true);
        return;
      }

      setIsEditingRunner(true);
      try {
        const editedRunner: Runner = await onEditRunner(
          createdRunner.uuid,
          newRunnerName,
          newRunnerLabels,
        );
        setCreatedRunner({
          ...createdRunner,
          name: editedRunner.name,
          labels: editedRunner.labels,
        });
        setRunnerActionError(false);
        setIsEditingRunner(false);
        setIsReconfiguringRunner(false);
      } catch (error) {
        setRunnerActionError(error?.body?.message || true);
        setIsEditingRunner(false);
      }
    },
    [createdRunner, onEditRunner, setCreatedRunner],
  );

  const asyncCreateRunner = useCallback(
    async (runnerName: string, newRunnerLabels: string[]) => {
      setIsCreatingRunner(true);
      try {
        const runner: Runner = await onCreateRunner(
          runnerName,
          newRunnerLabels,
        );
        setRunnerActionError(false);
        setCreatedRunner(runner);
        setIsCreatingRunner(false);
      } catch (error) {
        setRunnerActionError(error?.body?.message || true);
        setIsCreatingRunner(false);
      }
    },
    [onCreateRunner, setCreatedRunner],
  );

  const onSubmit = useCallback(
    (newRunnerName: string, newRunnerLabels: string[]) => {
      if (isReconfiguringRunner && !isEditingRunner) {
        sendAnalyticEvent(RunnerAction.EDIT);
        asyncEditRunner(newRunnerName, newRunnerLabels);
      }
      if (!isReconfiguringRunner && !isCreatingRunner) {
        sendAnalyticEvent(RunnerAction.CREATE);
        asyncCreateRunner(newRunnerName, newRunnerLabels);
      }
    },
    [
      asyncCreateRunner,
      asyncEditRunner,
      sendAnalyticEvent,
      isCreatingRunner,
      isEditingRunner,
      isReconfiguringRunner,
    ],
  );

  const updateProgressItemsBackwards = () => {
    setIsReconfiguringRunner(true);
    const currentStatusIndex = progressItems.findIndex(
      (item) => item.status === 'current',
    );
    const newCurrent = currentStatusIndex - 1;
    setCurrentStep(progressSteps[newCurrent]);

    const newProgressList: Stages = progressSteps.map((item, key) => {
      return {
        id: `${key}`,
        label: item,
        percentageComplete: newCurrent > key ? 100 : 0,
        status:
          key === newCurrent
            ? 'current'
            : currentStatusIndex > key
            ? 'visited'
            : 'unvisited',
        noLink: true,
      };
    });
    setProgressItems(newProgressList);
  };

  const updateProgressItemsForwards = useCallback(() => {
    const currentStatusIndex = progressItems.findIndex(
      (item) => item.status === 'current',
    );

    if (currentStatusIndex === progressSteps.length - 1) {
      onCloseDialog();
    } else {
      const newCurrent = currentStatusIndex + 1;
      setCurrentStep(progressSteps[newCurrent]);
      const newProgressList: Stages = progressSteps.map((item, key) => {
        return {
          id: `${key}`,
          label: item,
          percentageComplete: currentStatusIndex >= key ? 100 : 0,
          status:
            key === newCurrent
              ? 'current'
              : currentStatusIndex >= key
              ? 'visited'
              : 'unvisited',
          noLink: true,
        };
      });
      setProgressItems(newProgressList);
    }
  }, [onCloseDialog, progressItems]);

  useEffect(() => {
    if (
      !isCreatingRunner &&
      !isEditingRunner &&
      currentStep === progressSteps[0] &&
      !isReconfiguringRunner &&
      !runnerActionError &&
      createdRunner
    ) {
      updateProgressItemsForwards();
    }
  }, [
    isReconfiguringRunner,
    createdRunner,
    isCreatingRunner,
    isEditingRunner,
    runnerActionError,
    updateProgressItemsForwards,
    currentStep,
  ]);

  return (
    <>
      <ProgressTracker items={progressItems} />
      {currentStep === progressSteps[0] && (
        <ConfigureStep
          onSubmit={onSubmit}
          runnerActionError={runnerActionError}
          customName={createdRunner ? createdRunner.name : ''}
          customLabels={
            createdRunner
              ? createdRunner.labels
              : [SELF_HOSTED_LABEL, LINUX_SYSTEM_OPTION.value]
          }
          runnerAction={RunnerAction.CREATE}
          isReconfiguringRunner={isReconfiguringRunner}
        />
      )}
      {!runnerActionError &&
        createdRunner &&
        currentStep === progressSteps[1] && (
          <RunStep
            onSubmit={updateProgressItemsForwards}
            onBack={updateProgressItemsBackwards}
            setRunCommandActioned={setRunCommandActioned}
            repositoryUuid={repositoryUuid}
            workspaceUuid={workspaceUuid}
            environment={environment}
            runner={createdRunner}
          />
        )}
      {createdRunner && currentStep === progressSteps[2] && (
        <UseStep
          onSubmit={updateProgressItemsForwards}
          labels={createdRunner.labels}
          onBack={updateProgressItemsBackwards}
        />
      )}
    </>
  );
};

export default React.memo(AddRunner);
