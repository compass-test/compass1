import React from 'react';

import RunnersWizard from '../src';
import {
  createRunnerError,
  editRunnerError,
  fetchRunnerError,
} from '../src/mocks';

export default () => (
  <div style={{ height: '800px' }} data-testid="configure-runner">
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
      onEditRunner={editRunnerError}
      onFetchRunner={fetchRunnerError}
      runCommandReminderDismissedPreferance={true}
      repositoryUuid="{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}"
      workspaceUuid="{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}"
      environment="DDEV"
      windowsEnabled={false}
    />
  </div>
);
