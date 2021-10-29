import React from 'react';

import { FilledFieldsExample } from '../src/common/ui/address-form/examples';
import { LoadingForm } from '../src/common/ui/loading-form/examples';

const Example = () => {
  return (
    <div
      data-testid="vr-loading-state"
      style={{ width: '800px', margin: 'auto', display: 'flex' }}
    >
      <div style={{ width: '400px' }}>
        <FilledFieldsExample />
      </div>
      <LoadingForm />
    </div>
  );
};

export default () => <Example />;
