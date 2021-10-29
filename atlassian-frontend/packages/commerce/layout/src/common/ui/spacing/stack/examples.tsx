import React from 'react';

import { B400 } from '@atlaskit/theme/colors';

import { SpacingScale } from '../../../constants';
import { UIScaleExtendedIncrements } from '../../../types';
import { Inset } from '../inset';

import {
  LargeStackLayout,
  SmallStackLayout,
  Stack,
  StackLayout,
} from './index';

const BlueBox: React.FC = ({ children }) => (
  <Inset
    style={{
      backgroundColor: B400,
      height: 50,
      lineHeight: '50px',
      minWidth: 50,
      color: 'white',
    }}
  >
    {children}
  </Inset>
);

export const StackContainerExample = () => (
  <LargeStackLayout>
    {Object.keys(SpacingScale).map((size) => (
      <div key={size}>
        <strong>Stack layout {size}</strong>
        <StackLayout size={size as UIScaleExtendedIncrements}>
          {[1, 2, 3, 4].map((index) => (
            <BlueBox key={index} />
          ))}
        </StackLayout>
      </div>
    ))}
  </LargeStackLayout>
);

export const HorizonalStackContainerExample = () => (
  <LargeStackLayout>
    {Object.keys(SpacingScale).map((size) => (
      <div key={size}>
        <strong>Stack layout {size}</strong>
        <StackLayout
          size={size as UIScaleExtendedIncrements}
          direction="HORIZONTAL"
        >
          {[1, 2, 3, 4].map((index) => (
            <BlueBox key={index} />
          ))}
        </StackLayout>
      </div>
    ))}
  </LargeStackLayout>
);

export const NestedStacklayoutExample = () => (
  <StackLayout size="LARGE">
    <strong>Nested layout example</strong>
    {[1, 2, 3, 4].map((index) => (
      <Inset style={{ border: '1px solid black' }} key={index}>
        <StackLayout size="SMALL">
          {[1, 2, 3].map((boxIndex) => (
            <BlueBox key={boxIndex} />
          ))}
        </StackLayout>
      </Inset>
    ))}
  </StackLayout>
);

export const StackStandAloneExample = () => (
  <SmallStackLayout>
    <strong>Standalone Stack</strong>
    {Object.keys(SpacingScale).map((size) => (
      <Stack size={size as UIScaleExtendedIncrements} key={size}>
        <BlueBox>{size}</BlueBox>
      </Stack>
    ))}
  </SmallStackLayout>
);

export default () => (
  <StackLayout size="LARGE">
    <StackContainerExample />
    <HorizonalStackContainerExample />
    <NestedStacklayoutExample />
    <StackStandAloneExample />
  </StackLayout>
);
