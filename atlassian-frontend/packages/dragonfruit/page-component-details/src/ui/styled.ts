import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const COLUMN_LAYOUT_TRANSITION_WIDTH = 832;

export const PageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  justify-content: space-between;

  @media (max-width: ${COLUMN_LAYOUT_TRANSITION_WIDTH}px) {
    flex-direction: column;
  }
`;

export const LeftPanelWrapper = styled.div`
  flex: 0 1 720px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px ${gridSize() * 6}px;
  min-width: 0px;

  @media (max-width: ${COLUMN_LAYOUT_TRANSITION_WIDTH}px) {
    flex: 1 1 auto;
    margin-left: 0px;
    margin-right: 0px;
    min-height: 0px;
    padding: 0px 20px 20px;
  }
`;

export const RightPanelWrapper = styled.div`
  flex: 0 0 440px;
  box-sizing: border-box;
  background-color: ${colors.N10};
  padding: ${gridSize() * 6}px;
  // We should be the same padding everywhere here, but we're invariably setting
  // the bottom margin on panel elements regardless of any :last-child (or the
  // like) selector.
  padding-bottom: 0;
  min-width: 240px;

  @media (max-width: ${COLUMN_LAYOUT_TRANSITION_WIDTH}px) {
    flex: 1 1 auto;
    min-height: 0px;
    padding: 0px 20px 20px;
  }
`;

export const SpinnerContainer = styled.div`
  margin: ${gridSize() * 12}px auto;
  text-align: center;
`;
