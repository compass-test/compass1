import { css } from '@emotion/core';
import { gridSize, layers } from '@atlaskit/theme/constants';
import { N900, N200, N20, P300 } from '@atlaskit/theme/colors';

const GRID_UNIT = gridSize();

const AkGrid = (num: number = 1) => ({
  px: `${num * GRID_UNIT}px`,
  unitless: num * GRID_UNIT,
  multiple: (multiplier: number) => AkGrid(multiplier * num),
  half: () => AkGrid(0.5 * num),
  twice: () => AkGrid(2 * num),
});

export const zIndex = {
  searchDialog: layers.dialog(),
};

export const grid = AkGrid(1);

export const atlassianNavigationHeight = '56px';

export const collapsedSearchInputWidth = '200px';
export const filterLabelWidth = '150px';

export const dialogWidth = '780px';
export const dialogPageTakeoverWidth: number = 780;
export const dialogPageCentreWidth = '1130px';

export const inputFieldHeight = grid.multiple(4);

export const primaryTextColour = N900;
export const itemLinkSecondaryColor = N200;
export const itemHighlightColor = N20;
export const visitedLinkColor = P300;

export const nowrapEllipsis = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 10px;
`;
