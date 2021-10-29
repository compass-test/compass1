import React from 'react';

import { B400 } from '@atlaskit/theme/colors';

import { SpacingScale } from '../../../constants';
import { UIScaleExtendedIncrements } from '../../../types';
import { StackLayout } from '../stack';

import { Inset, InsetType } from './index';

const BlueBox: React.FC = ({ children }) => (
  <div style={{ backgroundColor: B400, height: 50, minWidth: 50 }}>
    {children}
  </div>
);

export const InsetExample = () => (
  <StackLayout>
    <strong>Inset Example Size variation</strong>

    {Object.keys(SpacingScale).map((size) => (
      <Inset
        size={size as UIScaleExtendedIncrements}
        style={{ border: '1px solid gray' }}
        key={size}
      >
        <p>
          this is a container that guarantees padding size{' '}
          <strong>{size}</strong>
        </p>
        <BlueBox />
      </Inset>
    ))}
  </StackLayout>
);

export const InsetModeExample = () => (
  <StackLayout>
    <strong>Inset Example Size and mode variation</strong>

    {Object.keys(SpacingScale).map((size) =>
      (['SQUARE', 'SQUISH', 'STRETCH'] as InsetType[]).map((mode) => (
        <Inset
          size={size as UIScaleExtendedIncrements}
          type={mode}
          style={{ border: '1px solid gray' }}
          key={`${mode}-${size}`}
        >
          <p>
            this is a container that guarantees padding size{' '}
            <strong>{size}</strong> and mode <strong>{mode}</strong>
          </p>
          <BlueBox />
        </Inset>
      )),
    )}
  </StackLayout>
);

export default () => {
  return (
    <StackLayout size="LARGE">
      <InsetExample />
      <InsetModeExample />
    </StackLayout>
  );
};
