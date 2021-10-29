import styled, { css } from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { G300, P400, N0 } from '@atlaskit/theme/colors';
import { e200 } from '@atlaskit/theme/elevation';

export const Outer = styled.div<{ isComplete?: boolean }>`
  display: flex;
  align-items: center;
  width: ${gridSize() * 40}px;
  background-color: ${({ isComplete }) => (isComplete ? G300 : P400)};
  padding: ${gridSize()}px;
  padding-right: ${gridSize() * 1.5}px;
  border-radius: ${gridSize() * 12.5}px;
  color: ${N0};
  ${e200}
  cursor: pointer;
`;

const IconBorder = css`
  /* Creates a border that doesn't interfere with image sizing */
  &::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid ${N0};
    border-radius: 50%;
  }
`;

export const Icon = styled.div<{ isComplete?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin-right: ${gridSize() * 1.5}px;
  border-radius: 50%;
  overflow: hidden;

  ${({ isComplete }) => !isComplete && IconBorder}

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  /* min-width used to make text truncation work with nested flex children: */
  /* https://css-tricks.com/flexbox-truncated-text/ */
  min-width: 0;
`;

const truncateCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Title = styled.div`
  font-weight: h500;
  font-size: 16px;
  line-height: 20px;
  ${truncateCss}
`;

export const TabName = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  ${truncateCss}
`;

export const TaskName = styled.div`
  font-size: 14px;
  line-height: 20px;
  max-width: min-content;
  ${truncateCss}
`;

export const CloseButtonWrapper = styled.div`
  box-sizing: content-box;
  padding-left: ${gridSize()}px;
  padding-right: ${gridSize()}px;

  flex-shrink: 0;

  button {
    vertical-align: middle;
  }
`;
