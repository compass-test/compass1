// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize as akGridSize } from '@atlaskit/theme';
import { completeColors, inProgressColors } from './ChecklistBackground';

const gridSize = akGridSize();
const FADE_DURATION = '0.5s';
export const CHECKLIST_BACKGROUND_HEIGHT = 140;
const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test((navigator as Navigator).userAgent);

export const OverflowWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  background: #f4f5f7;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: auto;

  #Rectangle {
    fill: ${(props: { done?: boolean }) =>
      props.done
        ? completeColors.mainFillColor
        : inProgressColors.mainFillColor};
    transition: all ${FADE_DURATION} ease-in-out;
  }
  #linearGradient {
    stop:first-child {
      stop-color: ${(props: { done?: boolean }) =>
        props.done
          ? completeColors.gradientFillColor
          : inProgressColors.gradientFillColor};
      transition: all ${FADE_DURATION} ease-in-out;
    }
    stop:last-child {
      stop-color: ${(props: { done?: boolean }) =>
        props.done
          ? completeColors.gradientFillColor
          : inProgressColors.gradientFillColor};
      transition: all ${FADE_DURATION} ease-in-out;
    }
  }
`;

export const FlexContent = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  z-index: ${isSafari() ? 'initial' : 1};
  position: relative;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${gridSize}px;
`;

export const ChecklistTitle = styled.h3`
  color: ${colors.N0};
  padding: 0 20px;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: normal;
  font-size: 24px;
  text-align: center;
  line-height: initial;
`;

export const BodyWrapper = styled.div`
  padding: 0px 20px ${gridSize * 6}px;
`;

export const Footer = styled.div`
  background: #f4f5f7;
  padding-top: 15px;
  padding-bottom: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
`;

export const FooterTitle = styled.p`
  padding-bottom: 10px;
`;

export const FooterDismissLink = styled.a`
  color: ${colors.P300};
  font-size: 14px;
  &:hover {
    color: ${colors.P300};
    text-decoration: none;
  }
`;

export const DismissButtonWrapper = styled.div`
  flex-shrink: 0;
`;
