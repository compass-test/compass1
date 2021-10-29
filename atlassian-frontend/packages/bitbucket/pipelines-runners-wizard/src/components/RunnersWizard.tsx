import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Runner } from '@atlassian/pipelines-models';

import { CreateRunner, EditRunner, FetchRunner, RunnerAction } from '../types';
import { detectRunnerSystemFromLabels } from '../utils';

import ConfigureRunnerModal from './ConfigureRunnerModal';
import { FlagProvider } from './FlagContext';
import RunCommandReminderModal from './RunCommandReminderModal';

type Props = {
  onCloseWizard: (
    runnerCreated: boolean,
    runnerEdited: boolean,
    copyCommandDialogDismissed: boolean,
    runnerUuid: string | undefined,
  ) => void;
  onCreateRunner: CreateRunner;
  onEditRunner: EditRunner;
  onFetchRunner: FetchRunner;
  runCommandReminderDismissedPreferance: boolean;
  repositoryUuid: string;
  workspaceUuid: string;
  environment: string;
  existingRunner?: Runner;
  windowsEnabled: boolean;
};

const RunnersWizard: React.FC<Props> = ({
  onCloseWizard,
  onCreateRunner,
  onEditRunner,
  onFetchRunner,
  runCommandReminderDismissedPreferance,
  repositoryUuid,
  workspaceUuid,
  environment,
  existingRunner,
  windowsEnabled,
}) => {
  const runnerAction = existingRunner ? RunnerAction.EDIT : RunnerAction.CREATE;
  const [
    showRunCommandReminderDialog,
    setShowRunCommandReminderDialog,
  ] = useState(false);
  const [createdRunner, setCreatedRunner] = useState<Runner | undefined>(
    undefined,
  );
  const [fetchedLatestRunner, setFetchedLatestRunner] = useState<boolean>(
    false,
  );
  const [runCommandActioned, setRunCommandActioned] = useState(false);
  const [
    runCommandReminderDismissed,
    setRunCommandReminderDismissed,
  ] = useState(runCommandReminderDismissedPreferance);

  const getAppropriateRunnerUuid = () => {
    if (runnerAction === RunnerAction.EDIT) {
      return existingRunner?.uuid;
    } else {
      return createdRunner ? createdRunner.uuid : undefined;
    }
  };

  const viewRunStep = (dismissDialogChecked: boolean) => {
    setRunCommandReminderDismissed(dismissDialogChecked);
    setShowRunCommandReminderDialog(false);
  };

  const asyncFetchRunner = useCallback(async () => {
    if (!createdRunner) {
      return;
    }

    try {
      const latestRunner: Runner = await onFetchRunner(createdRunner.uuid);
      const originalOAuthClient = createdRunner.oauth_client;
      setCreatedRunner({
        ...latestRunner,
        oauth_client: originalOAuthClient,
      });
    } catch (error) {} // if there's an error, we'll just use the current runner that we have knowledge of
    setFetchedLatestRunner(true);
  }, [createdRunner, onFetchRunner]);

  const onClose = (runnerEdited: boolean) => {
    if (createdRunner && !runCommandActioned && !runCommandReminderDismissed) {
      asyncFetchRunner();
    } else {
      onCloseWizard(
        !!createdRunner,
        runnerEdited,
        runCommandReminderDismissed,
        getAppropriateRunnerUuid(),
      );
    }
  };

  const determineShowingCopyCommandModal = useCallback(() => {
    if (createdRunner?.state.status === 'UNREGISTERED') {
      setShowRunCommandReminderDialog(true);
    } else {
      onCloseWizard(
        !!createdRunner,
        false,
        runCommandReminderDismissed,
        createdRunner?.uuid,
      );
    }
  }, [runCommandReminderDismissed, createdRunner, onCloseWizard]);

  useEffect(() => {
    if (fetchedLatestRunner) {
      setFetchedLatestRunner(false);
      determineShowingCopyCommandModal();
    }
  }, [determineShowingCopyCommandModal, fetchedLatestRunner]);

  const runnerSystem = useMemo(() => {
    const system = detectRunnerSystemFromLabels(
      windowsEnabled,
      createdRunner ? createdRunner.labels : [],
    );
    return system;
  }, [windowsEnabled, createdRunner]);

  return (
    <FlagProvider initialFlags={{ windowsEnabled: windowsEnabled }}>
      {showRunCommandReminderDialog ? (
        <RunCommandReminderModal
          onCloseModal={(dismissDialogChecked) =>
            onCloseWizard(
              !!createdRunner,
              false,
              dismissDialogChecked,
              getAppropriateRunnerUuid(),
            )
          }
          viewRunStep={viewRunStep}
          runnerSystem={runnerSystem}
        />
      ) : (
        <ConfigureRunnerModal
          onCloseModal={onClose}
          onCreateRunner={onCreateRunner}
          onEditRunner={onEditRunner}
          setCreatedRunner={setCreatedRunner}
          setRunCommandActioned={setRunCommandActioned}
          repositoryUuid={repositoryUuid}
          workspaceUuid={workspaceUuid}
          environment={environment}
          runnerAction={runnerAction}
          existingRunner={existingRunner}
          createdRunner={createdRunner}
        />
      )}
    </FlagProvider>
  );
};

export default React.memo(RunnersWizard);
