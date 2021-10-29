import React from 'react';

import Icon from '@atlaskit/icon';
import { GlyphProps } from '@atlaskit/icon/types';

import { CompassIconsProps, DependencyGlyph } from '../../assets';

export const DependencyIcon = (props: CompassIconsProps & GlyphProps) => {
  const { ...forwardProps } = props;

  // The order of the props is important so that they can be overwritten by forwardProps
  return <Icon glyph={DependencyGlyph} {...forwardProps} />;
};
