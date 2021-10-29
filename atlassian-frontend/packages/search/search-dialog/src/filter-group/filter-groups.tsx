import React from 'react';
import {
  FilterGroupTitle,
  SkeletonContainer,
  FilterGroupContainer,
  FilterResultRowContainer,
} from './filter-group.styled';
import { SkeletonItem, AvatarShape } from '../search-skeleton';

export interface Props {
  /**
   * The title of the filter props
   */
  title: string;
  /**
   * Whether the filters are currently being loaded. This will render a set of placeholder loading filter items.
   */
  isLoading?: boolean;
  /**
   * The shape of the filter icons / avatars. This is used with the placeholder loading filter items and preferably match the icon shape of the actual filter items.
   * This defaults to no avatar.
   */
  avatarShape?: AvatarShape;
}

export const ColumnFilterGroup: React.FunctionComponent<Props> = ({
  children,
  title,
  isLoading,
  avatarShape,
}) => {
  return (
    <FilterGroupContainer>
      <FilterGroupTitle>{title}</FilterGroupTitle>
      {!isLoading ? (
        children
      ) : (
        <SkeletonContainer>
          <SkeletonItem avatarShape={avatarShape} isShimmering />
          <SkeletonItem avatarShape={avatarShape} isShimmering />
          <SkeletonItem avatarShape={avatarShape} isShimmering />
        </SkeletonContainer>
      )}
    </FilterGroupContainer>
  );
};

export const RowFilterGroup: React.FunctionComponent<Props> = ({
  children,
  title,
  isLoading,
  avatarShape = 'none',
}) => {
  return (
    <FilterGroupContainer>
      <FilterGroupTitle>{title}</FilterGroupTitle>
      <FilterResultRowContainer>
        {!isLoading ? (
          children
        ) : (
          <SkeletonContainer>
            <SkeletonItem avatarShape={avatarShape} isShimmering />
          </SkeletonContainer>
        )}
      </FilterResultRowContainer>
    </FilterGroupContainer>
  );
};
