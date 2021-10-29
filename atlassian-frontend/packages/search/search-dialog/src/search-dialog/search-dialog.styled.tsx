import React from 'react';
import styled from '@emotion/styled';
import { N50A, N60A } from '@atlaskit/theme/colors';
import { dialogWidth, dialogPageTakeoverWidth, grid } from '../style-utils';
import { gridSize } from '@atlaskit/theme/constants';
import { N30 } from '@atlaskit/theme/colors';

const SIDEBAR_PANE_WIDTH = gridSize() * 34;
const resultContainerVerticalPadding = gridSize();

export const SearchDialogWrapper = styled.div`
  position: relative;
  width: ${dialogWidth};
  box-shadow: 0 ${grid.multiple(0.5).px} ${grid.px} ${N50A}, 0 0 1px ${N60A};
  border-radius: 3px;
  background-color: #fff;
  overflow: hidden;
  margin-top: ${grid.px};
  :focus {
    outline: none;
  }
  display: flex;
  flex-direction: column;
  height: 100%;

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    max-width: 100%;
    border-radius: 0;
    margin-top: 0;
    flex: 1;
    overflow: auto;
  }
`;

export const ResultContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  max-width: 100%;
  padding: ${resultContainerVerticalPadding}px 0;
  box-sizing: border-box;
`;

/**
 * We split the SidebarContainer to an Outer and Inner wrapper to get the margin on border without affecting the size of the scrollbar.
 */
const SidebarContainerOuter = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 0 0 auto;
  width: ${SIDEBAR_PANE_WIDTH}px;

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: none;
  }
`;

const topBottomMarginSize = gridSize() * 2;
const SidebarContainerInner = styled.div`
  padding: 0 ${gridSize() * 2}px;
  margin: ${topBottomMarginSize}px 0;
  border-left: 1px solid ${N30};
  height: calc(100% - ${topBottomMarginSize * 2}px);
`;

export const SidebarContainer: React.FunctionComponent<{}> = ({ children }) => (
  <SidebarContainerOuter>
    <SidebarContainerInner>{children}</SidebarContainerInner>
  </SidebarContainerOuter>
);

const totalDialogHeightPx = 720 + resultContainerVerticalPadding * 2;
const footerHeight = gridSize() * 6;
const contentHeight = `${totalDialogHeightPx - footerHeight}px`;

const belowDialogSpace = gridSize() * 20;

export const SearchDialogContent = styled.div<{ minHeight?: number }>`
  display: flex;
  max-height: calc(100vh - ${belowDialogSpace}px);
  box-sizing: border-box;
  flex: 1;
  min-height: ${(props) => (props.minHeight ? `${props.minHeight}px` : 'auto')};

  @media screen and (min-height: ${totalDialogHeightPx + belowDialogSpace}px) {
    max-height: ${contentHeight};
  }

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    max-height: initial;
    overflow: auto;
  }
`;
