import React from 'react';
import { SkeletonItem } from './search-skeleton';

export const Basic = () => <SkeletonItem />;

export const WithShimmering = () => <SkeletonItem isShimmering />;

export const WithSquareIcon = () => <SkeletonItem avatarShape="square" />;

export const WithCircleIcon = () => <SkeletonItem avatarShape="circle" />;

export const WithSmallSquareIcon = () => (
  <SkeletonItem avatarShape="small-square" />
);

export const WithSmallCircleIcon = () => (
  <SkeletonItem avatarShape="small-circle" />
);

export const MultipleItems = () => (
  <>
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </>
);

export const MultipleItemsFixedWidth = () => (
  <>
    <SkeletonItem width={20} />
    <SkeletonItem width={100} />
    <SkeletonItem width={1000} />
  </>
);

export default { title: 'Search Dialog/Search Skeleton' };
