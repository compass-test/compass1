import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { typography, gridSize, colors } from '@atlaskit/theme';

export const SidebarWrapper = styled.div`
  width: 320px;
  // Make sure sidebar height is VH minus navbar height
  height: calc(100vh - 56px);
  box-sizing: border-box;
  position: absolute;
  right: 0;
  padding: 0 ${gridSize() * 2}px;
  box-shadow: -2px 0px 0px ${colors.N30};
  background-color: #fff;
  overflow-y: auto;
  z-index: 10;
  // We need to override styling from EP message here
  margin-left: 2px !important;
  margin-right: -12px !important;
`;

export const Title = styled.div`
  ${typography.h500}
  margin-left: ${gridSize() * 2}px;
`;

export const Subtitle = styled.div`
  ${typography.h100}
  margin-top: ${gridSize() / 2}px;
  margin-left: ${gridSize() * 2}px;
  color: ${colors.N60};
  text-transform: uppercase;
`;

export const HeaderBlanket = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  opacity: 0.5;
  background-color: #fff;
`;

export const HeaderContainer = styled.div`
  position: relative;
`;
