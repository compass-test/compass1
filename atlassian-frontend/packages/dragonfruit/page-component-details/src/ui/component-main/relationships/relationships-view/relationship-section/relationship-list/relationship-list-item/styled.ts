import { Link } from 'react-resource-router';
import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h100 } from '@atlaskit/theme/typography';

const ICON_SIZE = 24;

export const ComponentIconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: ${gridSize() * 3}px;
  margin-right: ${gridSize() * 1.5}px;
`;

export const ComponentNameContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.N800};

  > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ComponentTypeContainer = styled.div`
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  padding-right: ${gridSize()}px;
  height: ${gridSize() * 3}px;
  color: ${colors.N200};
  ${h100};
  margin-top: 0;
`;

export const ComponentDetailsLink = styled(Link)<{ isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  box-shadow: none;
  padding: ${gridSize()}px ${gridSize() * 1.5}px;
  padding-right: ${(props) =>
    props.isDisabled
      ? `${gridSize() * 1.5}px`
      : `${ICON_SIZE + gridSize() * 2}px`};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-radius: 3px;
    box-shadow: inset 0px 0px 0px 2px ${colors.B100};
    overflow: hidden;
  }
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: ${gridSize()}px;
  top: ${gridSize()}px;
  bottom: ${gridSize()}px;
  visibility: hidden;
`;

export const RelationshipListItemWrapper = styled.div`
  &:hover,
  &:focus-within {
    ${DeleteButtonContainer} {
      visibility: visible;
    }
    ${ComponentDetailsLink} {
      background-color: ${colors.N20};
      cursor: pointer;
      outline: none;
    }
  }
`;
