import styled from '@emotion/styled';

import { B200 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const ColorPickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  > div {
    margin: 8px -2px;
    padding: 1px;
  }
  box-sizing: content-box;
`;

export const HelpPointerIconContainer = styled.div<{ isSelected: boolean }>`
  border: 2px solid
    ${(props) =>
      props.isSelected
        ? token('color.border.focus', B200)
        : 'transparent'} !important;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor: pointer !important;
  > button {
    width: 48px;
    height: 48px;
    color: inherit;
    padding: 0;
    cursor: pointer;
  }

  &:hover {
    border-color: ${token('color.border.focus', B200)} !important;
  }
`;
