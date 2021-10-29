import React, { useState } from 'react';

import { boolean } from '@storybook/addon-knobs';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TierPicker } from './main';
import { Props } from './types';

export default {
  excludeStories: 'TierPickerTemplate',
};

export const TierPickerTemplate = ({ isDisabled = false }: Partial<Props>) => {
  const [currentTier, setCurrentTier] = useState<string>('4');
  const options = ['1', '2', '3', '4'];

  return (
    <CompassTestProvider locale="en">
      <TierPicker
        currentValue={currentTier}
        options={options}
        onChange={(tier: string) => setCurrentTier(tier)}
        isDisabled={isDisabled}
      />
    </CompassTestProvider>
  );
};

export const TierPickerExample = () => {
  const isDisabled = boolean('isDisabled?', false, 'Props');

  return <TierPickerTemplate isDisabled={isDisabled} />;
};
