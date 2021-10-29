import {
  fontSize,
  borderRadius,
  skeletonShimmer,
} from '@atlaskit/theme/constants';
import { skeleton as skeletonColor } from '@atlaskit/theme/colors';
import { CSSObject, keyframes } from '@emotion/core';
import { grid } from '../style-utils';

const smallItemElemSpacing = grid.multiple(1.5).unitless;
const itemElemSpacing = grid.multiple(1).unitless;
const itemElemSize = grid.multiple(3).unitless;
const itemMinHeight = grid.multiple(5).unitless;

const skeletonContentHeight = grid.multiple(1.75).unitless / 2;

const shimmer = skeletonShimmer();
const shimmerKeyframes = keyframes(shimmer.keyframes);

type SmallAvatarShape = 'small-circle' | 'small-square';
export type AvatarShape = 'circle' | 'square' | SmallAvatarShape;

const isSmallAvatar = (avatarShape: AvatarShape) => {
  return avatarShape.indexOf('small') === 0;
};

const isCircleAvatar = (avatarShape: AvatarShape) => {
  return avatarShape.indexOf('circle') !== -1;
};

export const avatarSkeletonCSS = (
  avatarShape: AvatarShape,
  isShimmering?: boolean,
): CSSObject => ({
  // This will render a skeleton in the "elemBefore" position.
  backgroundColor: skeletonColor(),
  ...(isShimmering && {
    ...shimmer.css,
    animationName: `${shimmerKeyframes}`,
  }),
  marginRight: isSmallAvatar(avatarShape)
    ? smallItemElemSpacing
    : itemElemSpacing,
  width: isSmallAvatar(avatarShape) ? '14px' : itemElemSize,
  height: isSmallAvatar(avatarShape) ? '14px' : itemElemSize,
  borderRadius: isCircleAvatar(avatarShape) ? '100%' : borderRadius(),
  flexShrink: 0,
  display: 'inline-block',
});

const itemCSS = (): CSSObject => ({
  cursor: 'pointer',
  fontSize: fontSize(),
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0,
  margin: 0,
});

export const labelSkeletonCSS = (
  width?: string | number,
  isShimmering?: boolean,
  textHeight?: number,
) => ({
  // This will render the skeleton "text".
  backgroundColor: skeletonColor(),
  ...(isShimmering && {
    ...shimmer.css,
    animationName: `${shimmerKeyframes}`,
  }),
  height: `${textHeight ? textHeight / 2 : skeletonContentHeight}px`,
  borderRadius: borderRadius(),
  flexBasis: width || '100%',
});

export const itemSkeletonCSS = (): CSSObject => ({
  ...itemCSS(),
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  minHeight: itemMinHeight,
});
