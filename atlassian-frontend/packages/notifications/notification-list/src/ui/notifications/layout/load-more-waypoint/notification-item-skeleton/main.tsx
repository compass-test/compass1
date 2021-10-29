import React from 'react';

import { TextSkeleton } from '../../../../../common/ui/text-skeleton';

import { AvatarContainer, Column, SkeletonWrapper } from './styled';

export const NotificationItemSkeleton = () => {
  return (
    <SkeletonWrapper
      data-testid="notification-item-skeleton"
      aria-hidden={true}
    >
      <AvatarContainer />
      <Column>
        <TextSkeleton height="16px" />
        <TextSkeleton width="344px" marginBottom="6px" />
        <TextSkeleton width="100px" height="12px" />
      </Column>
    </SkeletonWrapper>
  );
};
