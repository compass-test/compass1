import React, { Suspense } from 'react';
import { Props } from '..';
import { IconPaths } from './imports';
import { Icon as Glyph } from '@atlassian/forge-ui-types';

interface IconProps {
  size?: 'small' | 'medium' | 'large';
  glyph: Glyph;
}

const Icon = ({ size = 'medium', glyph }: IconProps) => {
  const Component = IconPaths[glyph] as React.LazyExoticComponent<any>;
  if (!Component) {
    return null;
  } // do nothing

  return (
    <Suspense fallback={null}>
      <Component label="Icon" size={size} />
    </Suspense>
  );
};

export default Icon;

export function IconFn({ props }: Props) {
  const { glyph, size } = props as IconProps;
  return <Icon glyph={glyph} size={size} />;
}
