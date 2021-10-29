import React from 'react';

import { B400 } from '@atlaskit/theme/colors';

import { SpacingScale } from '../../../constants';
import { UIScaleExtendedIncrements } from '../../../types';
import { Inset } from '../inset';
import { LargeStackLayout, SmallStackLayout } from '../stack';

import { Inline, InlineLayout } from './index';

const BlueBox: React.FC = ({ children }) => (
  <Inset
    style={{
      backgroundColor: B400,
      height: 50,
      lineHeight: '50px',

      color: 'white',
    }}
  >
    {children}
  </Inset>
);

export const InlineLayoutExample = () => (
  <SmallStackLayout>
    {Object.keys(SpacingScale).map((size) => (
      <div key={size}>
        <strong>Inline layout {size}</strong>
        <InlineLayout size={size as UIScaleExtendedIncrements}>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <BlueBox key={index}>
              {index % 2 === 0 ? 'Lorem' : 'lorem ipsum'}
            </BlueBox>
          ))}
        </InlineLayout>
      </div>
    ))}
  </SmallStackLayout>
);

export const InlineStandAloneExample = () => (
  <SmallStackLayout>
    <strong>Standalone Inline</strong>
    <div style={{ display: 'flex' }}>
      {Object.keys(SpacingScale).map((size) => (
        <Inline size={size as UIScaleExtendedIncrements} key={size}>
          <BlueBox>{size}</BlueBox>
        </Inline>
      ))}
    </div>
  </SmallStackLayout>
);

export default () => (
  <LargeStackLayout>
    <InlineLayoutExample />
    <InlineStandAloneExample />
  </LargeStackLayout>
);
