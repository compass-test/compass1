import React from 'react';

import { radios } from '@storybook/addon-knobs';

import { Size } from '@atlaskit/icon/types';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { COMPONENT_TYPES, SIZES } from './test-utils';

import { ComponentTypeIcon } from './index';

export const ComponentTypeIconExample = () => {
  const label = 'Size';
  const defaultValue = 'small';
  const groupId = 'Size';
  const selectedSize: Size = radios(label, SIZES, defaultValue, groupId);

  return (
    <CompassTestProvider>
      {COMPONENT_TYPES.map((type) => (
        <>
          <ComponentTypeIcon type={type} size={selectedSize} />
          <br />
        </>
      ))}
    </CompassTestProvider>
  );
};

ComponentTypeIconExample.displayName = 'Component Type Icon';
