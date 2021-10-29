import React, { useState } from 'react';

import { integrationsKeys } from '../src/common/constants';
import { IntegrationPicker } from '../src/ui/integration-picker';

function _keys<T>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

// This is a wrapper just for storybook to demonstrate the clicking interaction of the picker
const IntegrationPickerWrapper = ({ id }: { id: string }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <IntegrationPicker
      id={id}
      isSelected={isSelected}
      onChange={() => {
        setIsSelected(!isSelected);
      }}
    />
  );
};

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {_keys(integrationsKeys).map((integrationsKey) => {
        const id = integrationsKeys[integrationsKey];
        return <IntegrationPickerWrapper key={id} id={id} />;
      })}
    </div>
  );
}
