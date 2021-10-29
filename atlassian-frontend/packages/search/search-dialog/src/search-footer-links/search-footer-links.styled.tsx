import { B100, N900 } from '@atlaskit/theme/colors';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';
import styled from '@emotion/styled';
import React from 'react';
import { Link, LinkComponentProps } from '../search-link-component';
import { dialogWidth } from '../style-utils';

export const SearchFooterLinksContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
  flex-direction: row;
  padding: ${1.5 * gridSize()}px ${2 * gridSize()}px;
  align-items: center;
  max-width: ${dialogWidth};
  color: ${N900};
`;

export const LabelContainer = styled.div`
  margin-right: ${gridSize() * 0.5}px;
  flex-shrink: 0;
`;

export const TruncatedTextDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PrimaryButtonWrapper = styled.div`
  flex: 1 1 0;
  overflow: hidden;
  max-width: max-content;
  margin-right: ${0.5 * gridSize() - 2}px;
`;

export const PrimaryButtonStyledLink = styled(Link)<
  LinkComponentProps & {
    onClick?: (e: React.MouseEvent<HTMLElement>) => any;
  }
>`
  display: flex;
  text-overflow: ellipsis;

  border-radius: ${borderRadius}px;
  transition-duration: 0.2s;
  transition: box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${B100} inset;
  }
  :hover {
    text-decoration: none;
  }
`;

export const DropownMenuLink = styled(Link)<
  LinkComponentProps & {
    onClick?: (e: React.MouseEvent<HTMLElement>) => any;
  }
>`
  display: block;
  position: relative;

  :focus {
    outline: 2px solid ${B100};
    outline-offset: -2px;
  }

  :hover {
    text-decoration: none;
  }
`;
