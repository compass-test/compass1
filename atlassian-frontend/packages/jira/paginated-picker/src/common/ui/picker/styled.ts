import styled from 'styled-components';

import { N30A, N50, N70, R50 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

export const DropdownIndicatorWrapper = styled.div`
  margin-right: 2px;
  text-align: center;
  width: 32px;
`;

interface StyledBoxProps {
  height?: number;
  iconSize?: number;
}

export const StyledBox = styled.div<StyledBoxProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${props => props.height || 128}px;
  justify-content: center;

  ${({ iconSize }) =>
    iconSize
      ? `svg {
          width: ${iconSize}px;
          height: ${iconSize}px;
        }`
      : ''}
`;

export const StyledText = styled.div`
  ${h400};
  margin-top: ${gridSize()}px;
`;

export const StyledControl = styled.div`
  box-shadow: 0 2px 0 ${N30A};
  display: flex;
  padding: 4px;
`;

export const CloseIconWrapper = styled.div`
  cursor: pointer;
  color: ${N50};
  &:hover,
  &:focus {
    color: ${N70};
  }
`;

interface DisplayWrapperProps {
  displayFlag?: boolean;
}

export const DisplayWrapper = styled.div<DisplayWrapperProps>`
  display: ${props => (props.displayFlag ? 'block' : 'none')};
`;

export const StyledInvalidCheckboxOption = styled.div`
  background-color: ${R50};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: ${gridSize()}px;
  & > * {
    background-color: inherit !important;
  }
`;
