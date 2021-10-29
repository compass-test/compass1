// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentType } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, elevation, typography } from '@atlaskit/theme';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import {
  gridSize as akGridSize,
  borderRadius as akBorderRadius,
} from '@atlaskit/theme';
import { ACCORDION_CLASS_NAME } from './AccordionItem';

const borderRadius = akBorderRadius();
const gridSize = akGridSize();

export const AccordionWrapper = styled.div`
  background: ${colors.N0};
  padding: ${2 * gridSize}px;
  line-height: 20px;
  ${elevation.e100};
  transition: height 2000ms;
  cursor: pointer;
  &:first-child {
    border-top-right-radius: ${borderRadius + 1}px;
    border-top-left-radius: ${borderRadius + 1}px;
  }
  &:last-child {
    border-bottom-right-radius: ${borderRadius + 1}px;
    border-bottom-left-radius: ${borderRadius + 1}px;
  }
`;

export const AccordionHeaderWrapper = styled.div`
  position: relative;
  ${typography.h400()};
  margin-top: 0;
`;

// This is needed for the animation to work properly in most browsers.
// It has to be an upper bound, but not too high or the animation will lag.
const MAX_DESCRIPTION_HEIGHT = 400;
export const accordionDescriptionWrapper = (animationDuration: number) =>
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
    }
    .${ACCORDION_CLASS_NAME}-enter-active,
      .${ACCORDION_CLASS_NAME}-enter-done
      & {
      max-height: ${(props) =>
        props.maxHeight !== undefined
          ? props.maxHeight
          : MAX_DESCRIPTION_HEIGHT}px;
      opacity: 1;
    }
  ` as ComponentType<{ maxHeight?: number }>;

export const AccordionItemButtonText = styled.p`
  font-size: 14px;
`;

export const AccordionItemContainer = styled.div`
  padding: 10px;
  cursor: auto;
`;

export const AccordionItemSubtitle = styled.p`
  font-weight: 500;
`;

export const AccordionItemContent = styled.p`
  padding-bottom: 15px;
`;
