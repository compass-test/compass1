import React, { useState } from 'react';

import { IntlProvider } from 'react-intl';

import ChooseToMigrateApps from '../src/ui/ChooseToMigrateApps';

export default function ChooseWhatToMigrate() {
  const [value, setValue] = useState<'all' | 'none'>('none');
  return (
    <div style={{ width: 500, margin: '1% auto' }}>
      <IntlProvider locale="en">
        <ChooseToMigrateApps
          selectedValue={value}
          appsCount={0}
          isLoading={false}
          isCoreDataSelected={false}
          onChange={setValue}
          descriptionOnSelectAllEnabled="We will migrate the data of the apps you selected where an automated migration path exists."
          descriptionOnSelectAllDisabled="Assign statuses in your App assessment, and we’ll migrate the data if an automated migration path exists."
          toolTipContentIfCoreDataNotSelected="Select either spaces or groups"
        />
      </IntlProvider>
      <div style={{ paddingTop: '10px' }}>{`Selected value: ${value}`}</div>
    </div>
  );
}
