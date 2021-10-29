import React from 'react';

import { text } from '@storybook/addon-knobs';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { EmojiInput } from './main';

export const EmojiInputExample = () => {
  const name = text('name', 'mood');
  const testId = text('testId', 'sampleTestId');

  return (
    <CompassTestProvider>
      <EmojiInput name={name} testId={testId} value={'3'} />
    </CompassTestProvider>
  );
};
