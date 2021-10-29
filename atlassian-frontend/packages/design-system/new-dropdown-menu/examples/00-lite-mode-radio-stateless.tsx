import React, { useState } from 'react';

import DropdownMenu, {
  DropdownItemRadio,
  DropdownItemRadioGroup,
} from '../src';

const DropdownMenuRadioStateless = () => {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ margin: '20px' }}>
      <DropdownMenu trigger="Choices" testId="lite-mode-ddm">
        <DropdownItemRadioGroup id="oversea-cities" title="Oversea cities">
          <DropdownItemRadio
            id="london"
            isSelected={selected === 'london'}
            onClick={() => setSelected('london')}
          >
            London
          </DropdownItemRadio>
          <DropdownItemRadio
            id="berlin"
            isSelected={selected === 'berlin'}
            onClick={() => setSelected('berlin')}
          >
            Berlin
          </DropdownItemRadio>
        </DropdownItemRadioGroup>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuRadioStateless;
