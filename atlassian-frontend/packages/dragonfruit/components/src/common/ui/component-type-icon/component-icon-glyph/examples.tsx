import React from 'react';

import { radios } from '@storybook/addon-knobs';

import { Size } from '@atlaskit/icon';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { COMPONENT_TYPES, SIZES } from '../test-utils';

import { ComponentIconGlyph } from './index';

export const ComponentIconGlyphExample = () => {
  const label = 'Size';
  const defaultValue = 'small';
  const groupId = 'Size';
  const selectedSize: Size = radios(label, SIZES, defaultValue, groupId);

  return (
    <CompassTestProvider>
      {COMPONENT_TYPES.map((type) => (
        <>
          <ComponentIconGlyph type={type} size={selectedSize} />
          <br />
        </>
      ))}
    </CompassTestProvider>
  );
};

ComponentIconGlyphExample.displayName = 'Component Icon Glyph';
