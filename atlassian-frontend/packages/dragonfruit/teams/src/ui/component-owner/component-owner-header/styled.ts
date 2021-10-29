import { Link } from 'react-resource-router';
import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

/* Most of this styling is taken directly from the PageHeader component in Atlaskit
 * Unfortunately, there is no provided override some of the styles needed for the owner card
 * If we are ever able to do custom styling through that component, most this can be deleted.
 */

export const Outer = styled.div`
  margin: ${gridSize() * 2}px 0 ${gridSize() * 2}px 0;
`;

export const TitleWrapper = styled.div`
  align-items: flex-start;
  width: 100%;
  display: inline-flex;
`;

export const TitleContainer = styled.div`
  flex: 1 0 auto;
  flex-shrink: 1;
  min-width: 0;
  justify-content: space-between;
`;

export const InlineAvatars = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Error = styled.div`
  color: red;
  display: flex;
  align-items: center;
`;

// The heading wraps the heading text and action button
// because they must be aligned
export const Heading = styled.div`
  display: flex;
  align-items: center;
`;

export const SubHeading = styled.div`
  color: ${colors.N500};
  font-size: ${fontSizeSmall()}px;
  display: flex;
  align-items: center;
  margin-top: 0;
`;

export const StyledLink = styled(Link)`
  ${h400()}
  margin-top: 0;
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:focus,
  &:hover {
    text-decoration: none;
    color: ${colors.textActive};
  }
`;

export const ActionsWrapper = styled.div`
  button,
  button:hover {
    height: ${gridSize() * 3.5}px;
    width: ${gridSize() * 3.5}px;
  }
`;

export const BottomBarWrapper = styled.div`
  margin-top: ${gridSize()}px;
`;

export const ContainerBody = styled.div`
  padding-right: ${gridSize() * 2}px;
  padding-left: ${gridSize() * 2}px;
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: 1;
`;
