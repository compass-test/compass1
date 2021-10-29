import React from 'react';

import { SkeletonItem } from '@atlaskit/menu';

import { ICON_SIZE } from './utils';

const cssFn = () => {
  return {
    '&::before': {
      marginLeft: 0,
      marginRight: 12,
      width: ICON_SIZE,
      height: ICON_SIZE,
    },
  };
};

export default function LoadingSkeletonItem() {
  return (
    <SkeletonItem
      hasAvatar
      isShimmering
      cssFn={cssFn}
      testId="people-menu-skeleton-item"
    />
  );
}
