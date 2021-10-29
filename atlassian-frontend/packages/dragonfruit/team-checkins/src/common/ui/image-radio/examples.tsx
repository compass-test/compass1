import React from 'react';

import { boolean, text } from '@storybook/addon-knobs';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ImageRadio } from './main';

export const ImageRadioExample = () => {
  const label = text('label', 'Label');
  const selected = boolean('selected', false);

  const optionValue = 'foo';
  const value = selected ? optionValue : '';

  return (
    <CompassTestProvider>
      <ImageRadio
        name={'name'}
        value={optionValue}
        currentValue={value}
        image={<div>Hello!</div>}
        label={label}
      />
    </CompassTestProvider>
  );
};
