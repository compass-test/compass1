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
`;

export const ListItemWrapper = styled.div`
  // Set the background color for the container div
  &:hover {
    background-color: ${colors.N30};
  }

  display: block;
  box-shadow: none;

  padding: ${gridSize() * 0.75}px ${gridSize()}px;
  padding-right: ${ICON_SIZE + gridSize() * 2}px;
  div {
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
  margin: ${gridSize() * 0.5}px 0px;
  &:hover,
  &:focus-within {
    ${ButtonWrapper} {
      visibility: visible;
    }
  }
`;
