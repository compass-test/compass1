import React, { useCallback, useState } from 'react';

import AdminSettings from '../src';
import { Account, BuildConfiguration, Capabilities } from '../src/types';

export default () => {
  const [pipelinesEnabled, setPipelinesEnabled] = useState(false);

  const capabilities = {
    hasFetchedCapabilities: true,
    pipelinesEnabled,
  } as Capabilities;

  const toggleBuilds = useCallback(
    () => setTimeout(() => setPipelinesEnabled(!pipelinesEnabled), 1000),
    [pipelinesEnabled],
  );

  return (
    <div style={{ width: '900px' }} data-testid="admin-settings">
      <AdminSettings
        account={
          {
            hasFetchedUser: true,
            userHas2FaEnabled: true,
          } as Account
        }
        buildConfiguration={
          {
            hasYmlFile: true,
            hasFetchedRawYmlFile: true,
          } as BuildConfiguration
        }
        is2FaRequired={true}
        capabilities={capabilities}
        gettingStartedPageURL={'foo'}
        editConfigurationURL={'bar'}
        onBuildsToggle={toggleBuilds}
      />
    </div>
  );
};
