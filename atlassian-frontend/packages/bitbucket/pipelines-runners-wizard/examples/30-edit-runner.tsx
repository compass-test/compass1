import React from 'react';

import RunnersWizard from '../src';
import {
  createRunnerError,
  editRunner,
  fetchRunnerError,
  repositoryUuid,
  runner,
  workspaceUuid,
} from '../src/mocks';

export default () => (
  <div style={{ height: '650px' }} data-testid="configure-runner">
    <RunnersWizard
      onCloseWizard={(
        runnerCreated,
        runnerEdited,
        copyCommandDismissed,
        runnerUuid,
      ) => {
        console.log('close wizard');
        console.log('runnerCreated: ', runnerCreated);
        console.log('runnerEdited: ', runnerEdited);
        console.log('copyCommandDismissed: ', copyCommandDismissed);
      }}
      onCreateRunner={createRunnerError}
      onEditRunner={editRunner}
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
