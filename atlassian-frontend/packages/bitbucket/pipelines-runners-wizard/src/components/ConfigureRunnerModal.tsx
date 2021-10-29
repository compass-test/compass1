import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import ModalDialog, {
  ModalBody,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import { Runner } from '@atlassian/pipelines-models';

import {
  CREATE_RUNNER_MODAL_HEADING,
  EDIT_RUNNER_MODAL_HEADING,
} from '../const';
import { CreateRunner, EditRunner, RunnerAction } from '../types';

import AddRunnerView from './AddRunner';
import ConfigureModalHeader from './ConfigureModalHeader';
import EditRunnerView from './EditRunner';

type Props = {
  onCloseModal: (runnerEdited: boolean) => void;
  onCreateRunner: CreateRunner;
  onEditRunner: EditRunner;
  setCreatedRunner: (runner: Runner) => void;
  setRunCommandActioned: (isActioned: boolean) => void;
  repositoryUuid: string;
  workspaceUuid: string;
  environment: string;
  runnerAction: RunnerAction;
  existingRunner?: Runner;
  createdRunner?: Runner;
};

const ConfigureRunner: React.FC<Props> = ({
  onCloseModal,
  onCreateRunner,
  onEditRunner,
  setCreatedRunner,
  setRunCommandActioned,
  repositoryUuid,
  workspaceUuid,
  environment,
  runnerAction,
  existingRunner,
  createdRunner,
}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const sendRunnerActionAnalyticEvent = useCallback(
    (runnerAction: RunnerAction) => {
      createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
        actionSubjectId:
          runnerAction === RunnerAction.CREATE ? 'createRunner' : 'editRunner',
      }).fire();
    },
    [createAnalyticsEvent],
  );

  return (
    <ModalTransition>
      <ModalDialog
        onClose={() => onCloseModal(false)}
        width="small"
        isBlanketHidden
        shouldCloseOnOverlayClick={false}
      >
        <ConfigureModalHeader
          heading={
            runnerAction === RunnerAction.CREATE
              ? CREATE_RUNNER_MODAL_HEADING
              : EDIT_RUNNER_MODAL_HEADING
          }
        />
        <ModalBody>
          {runnerAction === RunnerAction.EDIT && existingRunner ? (
            <EditRunnerView
              existingRunner={existingRunner}
              onEditRunner={onEditRunner}
              setRunnerEdited={() => onCloseModal(true)}
              sendAnalyticEvent={sendRunnerActionAnalyticEvent}
            />
          ) : (
            <AddRunnerView
              onCloseDialog={() => onCloseModal(false)}
              onCreateRunner={onCreateRunner}
              onEditRunner={onEditRunner}
              setCreatedRunner={setCreatedRunner}
              setRunCommandActioned={setRunCommandActioned}
              repositoryUuid={repositoryUuid}
              workspaceUuid={workspaceUuid}
              environment={environment}
              sendAnalyticEvent={sendRunnerActionAnalyticEvent}
              createdRunner={createdRunner}
            />
          )}
        </ModalBody>
      </ModalDialog>
    </ModalTransition>
  );
};

export default React.memo(ConfigureRunner);
