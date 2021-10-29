import styled, { css } from 'styled-components';

import { N500 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

const lineClamp = (lines: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

export const DividerWrapper = styled.div`
  margin: ${gridSize()}px 0;
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled text for the ExpandingCard heading.
export const PrimaryText = styled.div`
  ${h400()}
  ${lineClamp(1)}

  margin: 0;
`;

// Styled text for the `ExpandingCard` sub-heading. This text will only be
// visible if there is `secondaryText` supplied to the `ExpandingCard`.
export const SecondaryText = styled.div`
  ${lineClamp(2)}

  color: ${N500};
  font-size: 11px;
`;

// Composition of `PrimaryText` and a toggle chevron that indicates expansion
// state. The toggle chevron is right aligned by virtue of the expand-to-fill
// behavior on `PrimaryText`.
export const TitleHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// Composition of `TitleHeading` and `SecondaryText`. `TitleHeading` is
// rendered directly above `SecondaryText`.
export const SummaryText = styled.div`
  flex-grow: 1;
`;

// Composition of `SummaryText` the `icon` supplied to `ExpandingCard`.
export const SummaryContent = styled.button`
  /**
  * Reset default CSS button styles
  */
  border: none;
  background: none;
  text-align: inherit;
  font: inherit;

  /**
  * Reset margins to ensure button is flush with card so that entire area is clickable.
  */
  margin: -${gridSize() * 2}px;

  /**
  * Re-introduce padding for consistency with expanded Divider and Details components.
  */
  padding: ${gridSize() * 2}px;

  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;

  flex: 1;

  & > :not(:last-child) {
    margin-right: 8px;
  }
`;
