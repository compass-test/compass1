// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { keyframes } from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, elevation, typography } from '@atlaskit/theme';

type StyledChecklistButtonProps = {
  completed: boolean;
  hasDismissButton: boolean;
};

type StyledChecklistButtonWrapperProps = {
  isOpen: boolean;
  hasDismissButton: boolean;
};

export const ChecklistButton = styled.button<StyledChecklistButtonProps>`
  border-radius: 24px;
  font-size: 14px;
  border: none;
  outline: none;
  white-space: nowrap;
  background: ${(props) => (props.completed ? colors.G400 : colors.P300)};
  padding: ${(props) =>
    props.hasDismissButton ? '10px 44px 10px 12px;' : '10px 12px;'};
  ${elevation.e300};
  transition: all 0.8s ease-in-out;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

export const ButtonTitle = styled.h3`
  ${typography.h500()};
  color: ${colors.N0};
  font-weight: 500;
  display: inline;
  margin: 0;
  padding-left: 4px;
  padding-right: 8px;
`;

const fade = keyframes`
    from { opacity: 0 }
    to { opacity: 1 }
`;
const getChecklistButtonWrapperDisplay = (
  props: StyledChecklistButtonWrapperProps,
) => {
  if (props.isOpen) {
    if (props.hasDismissButton) {
      return 'inline-block';
    } else {
      // TODO: Check if we can simplify this logic, and have inline-block always
      // need to check confluence
      return 'block';
    }
  } else {
    return 'none';
  }
};
export const ChecklistButtonWrapper = styled.div<
  StyledChecklistButtonWrapperProps
>`
  ${({ hasDismissButton }) => hasDismissButton && `position: relative;`}
  display: ${(props) => getChecklistButtonWrapperDisplay(props)};
  animation: ${fade} 0.6s ease-in-out;
`;

export const dismissButtonInlineStyles: React.CSSProperties = {
  position: 'absolute',
  right: `6px`,
  top: '50%',
  transform: 'translateY(-50%)',
  borderRadius: '50%',
  width: '34px',
  height: '34px',
};
