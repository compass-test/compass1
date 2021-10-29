import React from 'react';

import { integrations } from '../src/common/constants';
import { IntegrationDetails } from '../src/ui/integration-picker/integration-details';

export default function () {
  return (
    <div>
      {Object.keys(integrations).map((id) => {
        return <IntegrationDetails key={id} id={id}></IntegrationDetails>;
      })}
    </div>
  );
}
