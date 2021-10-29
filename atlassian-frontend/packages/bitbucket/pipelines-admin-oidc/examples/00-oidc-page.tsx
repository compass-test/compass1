import React from 'react';

import PipelinesAdminOidc from '../src';

export default () => {
  const environments = [
    {
      label: 'Other',
      options: [{ label: 'No environment', value: 'no environment', uuid: '' }],
    },
    {
      label: 'Test Environments',
      options: [
        {
          label: 'foo',
          value: 'bar',
          uuid: '{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}',
        },
      ],
    },
  ];
  return (
    <div style={{ width: '880px' }} data-testid="oidc">
      <PipelinesAdminOidc
        accountUuid="{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}"
        accountName="test"
        repositoryUuid="{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}"
        connectEnvironment="PRODUCTION"
        deploymentEnvironments={environments}
      />
    </div>
  );
};
