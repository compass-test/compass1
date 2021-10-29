import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { N0, N40, N200, B50, B100, B400 } from '@atlaskit/theme/colors';
import { e200 } from '@atlaskit/theme/elevation';
import { h400 } from '@atlaskit/theme/typography';

export const HeaderCardContainer = styled.div`
  ${e200};

  /* Keep the header card and it's drop shadow above the item cards when scrolling */
  z-index: 1;

  background: ${N0};

  box-sizing: border-box;
  width: ${gridSize() * 40}px;

  /* 20px and 8px padding top and bottom when you include the 1px border */
  /* This calculation is done automatically for the width since it is fixed at 320px */
  padding: 19px ${gridSize() * 2}px 7px;
  border: 1px solid ${N40};
  border-radius: 0 0 ${gridSize() * 2}px ${gridSize() * 2}px;

  & > * {
    box-sizing: content-box;
    width: 100%;
  }
`;

// Specify height to smooth out decimals introduced by rounded corners.
const progressBarThickness = 5;
export const ActiveTabContainer = styled.div`
  display: flex;

  box-sizing: border-box;
  width: 100%;
  height: ${gridSize() * 7 + progressBarThickness}px;
  padding: ${gridSize()}px ${gridSize() * 1.5}px ${gridSize() / 2}px;

  margin-bottom: ${gridSize()}px;
`;

// Specify height to smooth out decimals introduced by rounded corners.
const borderThickness = gridSize() / 4;
export const InactiveTabContainer = styled.button`
  display: flex;

  box-sizing: border-box;
  width: 100%;
  height: ${gridSize() * 7}px;
  padding: ${gridSize() - borderThickness}px
    ${gridSize() * 1.5 - borderThickness}px;

  text-align: left;
  border: ${borderThickness}px solid rgba(0, 0, 0, 0);
  border-radius: ${gridSize() / 2}px;
  background: none;

  cursor: pointer;

  &:hover {
    background: ${N40};
  }

  &:active {
    background: ${B50};
    color: ${B400};
  }

  &:active:focus {
    border: ${borderThickness}px solid rgba(0, 0, 0, 0);
    outline: none;
    box-shadow: none;
  }

  &:focus {
    border: ${borderThickness}px solid ${B100};
    outline: none;
    box-shadow: none;
  }
`;

// Note the override in TabDataContainer, for compatibility
// with OpsGenie base styles. `h4${TabHeading}`
export const TabHeading = styled.h4`
  ${h400};

  font-size: 14px;
`;

export const TabDataContainer = styled.div`
  flex-grow: 1;
  margin-left: ${gridSize() * 1.5}px;

  h4${TabHeading} {
    margin-top: 0;
    padding-top: ${gridSize() / 2}px;
  }
`;

export const TabParagraph = styled.p`
  color: ${N200};

  font-size: 12px;

  margin: ${gridSize() / 4}px 0 0;
`;

export const ProgressBarWrapper = styled.div`
  box-sizing: content-box;
  width: ${gridSize() * 25.5}px;

  margin-top: ${gridSize() / 2}px;

  & div {
    outline: none;
  }
`;

export const InactiveTabList = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: ${(props) => (props.isExpanded ? gridSize() : 0)}px;
`;

export const Footer = styled.div`
  display: flex;
  height: ${gridSize() * 4}px;
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;
