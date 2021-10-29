import React from 'react';

import Tag, { RemovableTagProps } from '@atlaskit/tag';

import { getTagColor } from '../../utils/coloring';

export const HashTag = ({
  label,
  ...rest
}: { label: string } & Omit<RemovableTagProps, 'text'>) => {
  return (
    <Tag
      color={getTagColor(label)}
      isRemovable={false}
      {...rest}
      text={'# ' + label}
    />
  );
};
