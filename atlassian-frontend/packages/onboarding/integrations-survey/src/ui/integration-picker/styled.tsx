import styled, { css } from 'styled-components';

import { B200, B50, DN300A, N0, N60 } from '@atlaskit/theme/colors';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';

const minHeight = gridSize() * 5;
const unselectedBorderThickness = 1;
const focusBorderThickness = 1;

const horizontalPaddingSelected = gridSize() * 1.5;
const horizontalPaddingUnselected =
  horizontalPaddingSelected + unselectedBorderThickness;

const verticalPaddingSelected = 6;
const verticalPaddingUnselected =
  verticalPaddingSelected + unselectedBorderThickness;

const PickerContainerThickBorder = css`
  border: 2px solid ${B200};
  padding: ${verticalPaddingSelected}px ${horizontalPaddingSelected}px;
`;

export const PickerCheckbox = styled.input`
  position: absolute;
  top: ${gridSize}px;
  left: ${gridSize}px;
  opacity: 0;
  cursor: pointer;
`;

const PickerContainerBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  user-select: none;
  min-height: ${minHeight}px;
  border-radius: ${minHeight / 2}px;
`;

const PickerContainerSelected = css`
  ${PickerContainerBase}
  ${PickerContainerThickBorder}
  background-color: ${B50};
`;

const PickerContainerUnselected = css`
  ${PickerContainerBase}
  border: ${unselectedBorderThickness}px solid ${N60};
  background-color: ${N0};
  padding: ${verticalPaddingUnselected}px ${horizontalPaddingUnselected}px;
`;

export const PickerContainer = styled.div<{
  isSelected?: boolean;
}>`
  ${({ isSelected }) =>
    isSelected ? PickerContainerSelected : PickerContainerUnselected}
`;

export const PickerCheckboxLabel = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  border: ${focusBorderThickness}px dotted rgba(0, 0, 0, 0);
  &:focus-within {
    border: ${focusBorderThickness}px dotted ${DN300A};
    border-radius: ${borderRadius}px;
    & > ${PickerContainer} {
      ${PickerContainerThickBorder}
    }
  }
`;
