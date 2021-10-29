import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import PipelinesRunnersManagement from '../src';
import { sampleRunners } from '../src/sampleData';

export default () => {
  return (
    <div style={{ width: '880px' }} data-testid="manage-runners">
      <IntlProvider locale="en">
        <PipelinesRunnersManagement
          onDeleteRunner={() => console.log('delete runner dialog')}
          onEditRunner={() => console.log('editing runner dialog')}
          runners={sampleRunners}
          onChangeStatus={(runnerUuid, newStatus) => console.log(newStatus)}
        />
      </IntlProvider>
    </div>
  );
};
