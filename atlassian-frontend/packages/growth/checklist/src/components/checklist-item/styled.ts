// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentType } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, typography } from '@atlaskit/theme';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize as akGridSize } from '@atlaskit/theme';
import { ACCORDION_CLASS_NAME } from '../..';

const gridSize = akGridSize();

export const ChecklistTitleWrapper = styled.div`
  position: relative;
  padding: 0 ${5 * gridSize}px;
  ${typography.h400()};
  margin-top: 0;
`;

export const ChecklistTitle = styled.h4`
  ${typography.h400()};
  color: ${colors.N800};
  font-weight: 500;
  margin-top: 0;
`;

export const ChecklistTaskDoneIndicator = styled.div`
  display: block;
  width: ${3 * gridSize}px;
  height: ${3 * gridSize}px;
  color: ${(props: { done: boolean }) =>
    props.done ? colors.G300 : colors.N40};
  position: absolute;
  left: 0;
  top: 50%;
  border-radius: 12px;
  transform: translateY(-50%);
`;

export const checklistClosedIndicator = (
  animationDuration: number,
) => styled.div`
  display: block;
  width: ${3 * gridSize}px;
  height: ${3 * gridSize}px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  & > span {
    transform: rotate(90deg);
    transition: transform ${animationDuration}ms;
  }
  .${ACCORDION_CLASS_NAME}-enter & > span {
    transform: rotate(90deg);
  }
  .${ACCORDION_CLASS_NAME}-enter-active & > span {
    transform: rotate(-90deg);
  }
  .${ACCORDION_CLASS_NAME}-enter-done & > span {
    transform: rotate(-90deg);
  }
`;

// This is needed for the animation to work properly in most browsers.
// It has to be an upper bound, but not too high or the animation will lag.
const MAX_DESCRIPTION_HEIGHT = 400;
export const checklistDescriptionWrapper = (animationDuration: number) =>
  styled.div`
    padding: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height ${animationDuration}ms,
      padding ${animationDuration}ms, opacity ${animationDuration}ms;
    max-height: 0;
    box-sizing: content-box;

    .${ACCORDION_CLASS_NAME}-enter & {
      max-height: 0;
      opacity: 0;
      padding: 0;
    }
    .${ACCORDION_CLASS_NAME}-enter-active,
      .${ACCORDION_CLASS_NAME}-enter-done
      & {
      max-height: ${(props) =>
        props.maxHeight !== undefined
          ? props.maxHeight
          : MAX_DESCRIPTION_HEIGHT}px;
      opacity: 1;
      padding: 0;
    }
  ` as ComponentType<{ maxHeight?: number }>;
