import css from '@emotion/css';
import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

const flexedRow = () => css`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > :not(:last-child) {
    margin-right: ${gridSize()}px;
  }
`;

const IconWithText = styled.div`
  ${flexedRow()}

  // Make sure that the icon itself doesn't shrink in response to flex flow.
  & > :first-child:not(:only-child) {
    flex-shrink: 0;
  }
  & > :last-child {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const TeamDisplay = styled(IconWithText)`
  & > :first-child {
    margin-right: ${gridSize() / 2}px;
  }
`;

export const DescriptionStyled = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
