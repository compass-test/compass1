import styled from 'styled-components';
import { gridSize, layers } from '@atlaskit/theme/constants';
import { N20, N40 } from '@atlaskit/theme/colors';
import { h500 } from '@atlaskit/theme/typography';

// taken from https://stash.atlassian.com/projects/confcloud/repos/confluence-frontend/browse/next/packages/template-preview/src/PreviewFrame.tsx
const PREVIEW_MIN_HEIGHT = 540;
const PREVIEW_MIN_WIDTH = 480;
const TEMPLATE_PANEL_WIDTH = 320;
const DISTANCE_FROM_ITEM = gridSize() * 4;
const VERTICAL_MARGIN = gridSize() * 2;
const TOP_BAR_HEIGHT = 58;

export const HoverPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  z-index: ${layers.tooltip()};

  background: white;
  border: 1px solid ${N20};
  border-radius: 3px;
  box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
    0px 3px 5px rgba(9, 30, 66, 0.2);

  width: 40vw;
  max-width: 600px;
  min-width: ${PREVIEW_MIN_WIDTH}px;

  height: 85vh;
  max-height: 790px;
  min-height: ${PREVIEW_MIN_HEIGHT}px;

  // this fixes preview height when
  // browser window has really small height
  @media screen and (max-height: ${TOP_BAR_HEIGHT +
    VERTICAL_MARGIN * 2 +
    PREVIEW_MIN_HEIGHT}px) {
    height: calc(100vh - ${TOP_BAR_HEIGHT + VERTICAL_MARGIN * 2}px);
    min-height: calc(100vh - ${TOP_BAR_HEIGHT + VERTICAL_MARGIN * 2}px);
  }

  // do not show preview on very narrow devices
  @media screen and (max-width: ${TEMPLATE_PANEL_WIDTH +
    DISTANCE_FROM_ITEM +
    PREVIEW_MIN_WIDTH}px) {
    display: none;
  }
`;

export const TemplateInfo = styled.div`
  height: 53px;
  padding: 14px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${N40};
`;

export const TemplateName = styled.div`
  ${h500()}
  margin: 0 0 0 ${gridSize()}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Icon = styled.div`
  align-self: center;
`;

export const Screenshot = styled.div`
  overflow-y: scroll;
`;
