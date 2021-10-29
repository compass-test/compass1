import React from 'react';

import RunnersWizard from '../src';
import {
  createRunner,
  editRunnerError,
  fetchRunnerError,
  repositoryUuid,
  runner,
  workspaceUuid,
} from '../src/mocks';

export default () => (
  <div style={{ height: '800px' }} data-testid="configure-runner">
    <RunnersWizard
      onCloseWizard={(runnerCreated, runnerEdited, runnerUuid) => {
        console.log('close wizard');
        console.log('runnerCreated: ', runnerCreated);
        console.log('runnerEdited: ', runnerEdited);
      }}
      onCreateRunner={createRunner}
      onEditRunner={editRunnerError}
      onFetchRunner={fetchRunnerError}
      runCommandReminderDismissedPreferance={true}
      repositoryUuid={repositoryUuid}
      workspaceUuid={workspaceUuid}
      existingRunner={runner}
      environment="DDEV"
      windowsEnabled={false}
    />
  </div>
);
