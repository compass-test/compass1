import React from 'react';
import {
  SearchDialogAnchor,
  SearchAnchorWrapper,
  AbsoluteContainer,
} from './search-anchor.styled';

export interface Props {
  /**
   * Callback that is called when the focus leaves this component and its children
   */
  onBlur?: () => void;
  /**
   * Callback that is called when the focus enters this component and its children
   */
  onFocus?: () => void;
  /**
   * Callback that is called when a key is pressed while the focus is on this component or one its children.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * Whether the search dialog is open or not.
   */
  isExpanded: boolean;
}

export const SearchAnchor: React.FunctionComponent<Props> = ({
  children,
  onBlur,
  onFocus,
  onKeyDown,
  isExpanded,
}) => (
  <SearchAnchorWrapper>
    <AbsoluteContainer isExpanded={isExpanded}>
      <SearchDialogAnchor
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        isExpanded={isExpanded}
      >
        {children}
      </SearchDialogAnchor>
    </AbsoluteContainer>
  </SearchAnchorWrapper>
);
