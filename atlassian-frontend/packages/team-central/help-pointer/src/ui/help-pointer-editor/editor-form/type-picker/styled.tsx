import styled from '@emotion/styled';

import { B200, N10, N20, N200, N30, N40, N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const DisabledCursorWrapper = styled.div<{ isDisabled: boolean }>`
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'default')};
`;
export const HelpPointerTypeWrapper = styled.div<{ isDisabled: boolean }>`
  width: 100%;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'default')};
  opacity: ${(props) => (props.isDisabled ? '0.5' : '1')};
  * {
    user-select: ${(props) => (props.isDisabled ? 'none' : 'default')};
  }
`;

export const HelpPointerTypeButton = styled.button<{ isSelected: boolean }>`
  border: ${(props) =>
    props.isSelected
      ? '2px solid ' + token('color.border.focus', B200)
      : '1px solid ' + token('color.border.neutral', N30)};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  cursor: pointer;
  margin-top: 8px;
  padding: 0 ${(props) => (props.isSelected ? '11px' : '12px')};
  box-sizing: border-box;
  background-color: ${token('color.background.default', 'white')};
  text-align: inherit;
  color: inherit;
  font: inherit;
  outline: inherit;

  &:hover {
    border-width: 2px;
    background-color: ${token(
      'color.background.transparentNeutral.hover',
      N10,
    )};
    padding: 0 11px;
  }
`;

export const TypeIconContainer = styled.div<{ isSelected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${token('color.background.subtleNeutral.resting', N20)};
`;

export const TextContainer = styled.div`
  padding: 0 12px;
`;

export const TextHeader = styled.div`
  font-size: 14px;
  color: ${token('color.text.highEmphasis', N800)};
`;

export const TextDescription = styled.div`
  font-size: 11px;
  color: ${token('color.text.lowEmphasis', N200)};
`;

export const RadioButtonWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RadioButton = styled.div<{ isSelected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: ${(props) =>
    props.isSelected
      ? '5px solid ' + token('color.border.focus', B200)
      : '2px solid ' + token('color.border.neutral', N40)};
  box-sizing: border-box;
`;
