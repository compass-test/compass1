import React from 'react';

import RunnersWizard from '../src';
import {
  createRunner,
  editRunner,
  fetchRunner,
  repositoryUuid,
  workspaceUuid,
} from '../src/mocks';

export default () => (
  <div style={{ height: '900px' }} data-testid="configure-runner">
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
      onCreateRunner={createRunner}
      onEditRunner={editRunner}
      onFetchRunner={fetchRunner}
      runCommandReminderDismissedPreferance={false}
      repositoryUuid={repositoryUuid}
      workspaceUuid={workspaceUuid}
      environment="PRODUCTION"
      windowsEnabled={false}
    />
  </div>
);
