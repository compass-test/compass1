/** @jsx jsx */
import { jsx } from '@emotion/core';
// import React from 'react';
import {
  itemSkeletonCSS,
  avatarSkeletonCSS,
  labelSkeletonCSS,
  AvatarShape,
} from './search-skeleton.styled';

export type AvatarShapeWithNone = 'none' | AvatarShape | AvatarShape[];

export type SkeletonItemProps = {
  avatarShape?: AvatarShapeWithNone;
  width?: number;
  isShimmering?: boolean;
  /**
   * The text height that the skeleton is intended to represent.
   * The actual skeleton will be approximately half of this height by design.
   */
  textHeight?: number;
};

export const SkeletonItem = ({
  avatarShape = 'none',
  width,
  isShimmering,
  textHeight,
}: SkeletonItemProps) => {
  const avatarShapes: AvatarShape[] = Array.isArray(avatarShape)
    ? avatarShape
    : ([avatarShape] as AvatarShape[]);
  return (
    <div css={itemSkeletonCSS()}>
      {avatarShape !== 'none'
        ? // eslint-disable-next-line react/no-array-index-key
          avatarShapes.map((shape, idx) => (
            <span key={idx} css={avatarSkeletonCSS(shape, isShimmering)} />
          ))
        : null}
      <span css={labelSkeletonCSS(width, isShimmering, textHeight)} />
    </div>
  );
};
