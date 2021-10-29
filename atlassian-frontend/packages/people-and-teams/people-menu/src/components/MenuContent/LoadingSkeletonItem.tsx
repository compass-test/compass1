import React from 'react';

import { SkeletonItem } from '@atlaskit/menu';
import { skeleton as skeletonColor } from '@atlaskit/theme/colors';

import { ICON_SIZE } from './utils';

const cssFn = (otherStyles = {}) => {
  return {
    ...otherStyles,
    '&::before': {
      backgroundColor: skeletonColor(),
      borderRadius: '100%',
      flexShrink: 0,
      content: '""',
      marginLeft: 0,
      marginRight: 12,
      width: ICON_SIZE,
      height: ICON_SIZE,
    },
  };
};

export default function LoadingSkeletonItem() {
  return (
    <SkeletonItem hasAvatar cssFn={cssFn} testId="people-menu-skeleton-item" />
  );
}
