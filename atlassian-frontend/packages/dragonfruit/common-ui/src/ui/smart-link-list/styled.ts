import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const ICON_SIZE = 16;

/**
 * Styles the smart link to look like a list item
 */
export const SmartLinkWrapper = styled.div`
  // Set the color as white because we will change the anchor tag to transparent
  background-color: ${colors.N0};
  // Set the background color for the container div
  &:hover {
    background-color: ${colors.N30};
  }
  a {
    display: block;
    box-shadow: none;
    border-radius: 0;

    padding: ${gridSize()}px ${gridSize() * 1.5}px;
    padding-right: ${ICON_SIZE + gridSize() * 2}px;

    // Had to override the color as transparent to show hover when focus on the button
    background-color: transparent;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  right: ${gridSize()}px;
  top: ${gridSize()}px;
  bottom: ${gridSize()}px;

  display: flex;
  align-items: center;

  visibility: hidden;
`;

export const Wrapper = styled.div`
  &:hover,
  &:focus-within {
    ${ButtonWrapper} {
      visibility: visible;
    }
  }
`;
