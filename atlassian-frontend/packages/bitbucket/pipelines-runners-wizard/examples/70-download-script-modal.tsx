import React from 'react';

import RunCommandReminderModal from '../src/components/RunCommandReminderModal';

export default () => (
  <div style={{ height: '500px' }} data-testid="configure-runner">
    <RunCommandReminderModal
      onCloseModal={() => console.log('close')}
      viewRunStep={() => console.log('viewRunStep')}
      runnerSystem={'windows'}
    />
  </div>
);
