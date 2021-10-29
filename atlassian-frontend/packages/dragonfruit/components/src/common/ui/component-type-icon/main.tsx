import React from 'react';

import * as colors from '@atlaskit/theme/colors';

import { ComponentIconBackground } from './component-icon-background';
import {
  ComponentIconGlyph,
  ComponentIconGlyphProps,
} from './component-icon-glyph';

export type ComponentTypeIconProps = Omit<
  ComponentIconGlyphProps,
  'primaryColor' | 'secondaryColor'
>;

export const ComponentTypeIcon = (props: ComponentTypeIconProps) => {
  const { type, testId, size = 'medium', ...forwardProps } = props;

  return (
    <ComponentIconBackground testId={testId} type={type} size={size}>
      <ComponentIconGlyph
        type={type}
        size={size}
        primaryColor={colors.N0}
        {...forwardProps}
      />
    </ComponentIconBackground>
  );
};
