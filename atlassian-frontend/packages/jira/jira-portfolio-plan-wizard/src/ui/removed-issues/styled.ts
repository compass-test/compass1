import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

// AKSelect/ReactSelect is just very hard to style
export const CONTROLS_HEIGHT = 32;
export const AK_SELECT_PADDING_ADJUST = 4;
export const CONTROLS_ZINDEX = 10;

export const ControlsContainer = styled.div`
  background-color: white;
  top: 0px;
  z-index: ${CONTROLS_ZINDEX};
  padding: 1em 0;
  position: sticky;
  display: flex;
  align-items: center;
  > *:last-child {
    margin-left: auto;
    flex: none;
  }
`;

export const HierarchyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 ${gridSize()}px;
  > * {
    margin: 0 ${gridSize()}px;
  }
`;

export const LabelContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;

  & > *:first-child {
    border-radius: 3px;
    margin-right: ${gridSize()}px;
    background: white;
    height: ${gridSize() * 2}px;
    width: ${gridSize() * 2}px;
  }
`;
