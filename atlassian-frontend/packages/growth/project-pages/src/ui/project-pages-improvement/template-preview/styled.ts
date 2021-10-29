import styled from 'styled-components';
import { gridSize, fontSizeSmall } from '@atlaskit/theme/constants';
import { N800, N30, N20 } from '@atlaskit/theme/colors';

export const PreviewWrapper = styled.div`
  min-width: 320px;
  margin-top: ${gridSize() * 2}px;
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 4px;
`;

export const TopBar = styled.div`
  display: flex;
  padding: 7px ${gridSize()}px;
  border-radius: 4px 4px 0 0;
  background-color: ${N800};
`;

export const TopBarDot = styled.div`
  background-color: #fff;
  margin-right: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

export const Content = styled.div`
  min-height: 346px;
  overflow-y: scroll;
  height: calc(
    100vh - 297px
  ); /* consume most of the remaining space taking into account nav, title, margins etc */
  max-height: 800px;
`;

export const BottomBar = styled.div`
  padding: ${gridSize()}px ${gridSize() * 1.5}px;
  border-top: 1px solid ${N30};
  border-radius: 0 0 4px 4px;
  background-color: ${N20};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PreviewTeaser = styled.p`
  font-size: ${fontSizeSmall()}px;
`;

export const PoweredByWrapper = styled.div`
  flex: 1 1 auto;
`;
