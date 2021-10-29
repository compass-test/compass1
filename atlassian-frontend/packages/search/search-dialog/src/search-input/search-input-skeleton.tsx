/*
 * Skeleton consumed by product-search-dialog only,
 * check the comments in packages/product-search-dialog/src/common/product-search-input/product-search-input-skeleton.tsx.
 */

import React from 'react';
import { IconButton } from '@atlaskit/atlassian-navigation';
import { useTheme } from '../theme';
import {
  MobileSearchIconWrapper,
  DesktopSearchIconWrapper,
  SearchInputContainer,
  SearchInputField,
} from './search-input.styled';
import { SearchAnchorWrapper } from '../search-anchor';
import { SearchIcon, LargeSearchIcon } from '../icons';
import { getInputSkeletonFocus } from './query-store';
import { SSRsearchInput } from './ssr-interactive-search-input';

export interface Props {
  forwardRef?: React.Ref<HTMLInputElement>;
  features?: {
    interactiveSkeleton?: {
      enabled: boolean;
      advancedSearchUrl: string;
      placeholder: string;
    };
  };
}

const MAX_INPUT_LENGTH = 500;

export const SearchInputSkeleton: React.FunctionComponent<Props> = (props) => {
  const theme = useTheme();
  const { forwardRef, features } = props;

  const { enabled, advancedSearchUrl, placeholder } =
    features?.interactiveSkeleton || {};
  if (enabled || getInputSkeletonFocus()) {
    return (
      <SSRsearchInput
        advancedSearchUrl={advancedSearchUrl}
        placeholder={placeholder}
      />
    );
  }

  return (
    <SearchAnchorWrapper>
      <SearchInputContainer {...theme} isExpanded={false}>
        <MobileSearchIconWrapper isExpanded={false}>
          <IconButton tooltip={null} icon={<LargeSearchIcon />} />
        </MobileSearchIconWrapper>
        <DesktopSearchIconWrapper {...theme} isExpanded={false}>
          <SearchIcon />
        </DesktopSearchIconWrapper>
        <SearchInputField
          data-test-id="search-dialog-search-skeleton"
          isExpanded={false}
          placeholder={placeholder}
          ref={forwardRef || undefined}
          disabled
          value=""
          maxLength={MAX_INPUT_LENGTH}
          onChange={() => {}}
          {...theme}
        />
      </SearchInputContainer>
    </SearchAnchorWrapper>
  );
};

export default React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <SearchInputSkeleton {...props} forwardRef={ref} />
));
