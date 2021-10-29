// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import styled from '@emotion/styled';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { elevation as AkElevations, colors } from '@atlaskit/theme';
import {
  borderRadius,
  codeFontFamily,
  gridSize,
} from '@atlaskit/theme/constants';
import { DeploymentStatusIconType } from '@atlassian/pipelines-models';
import { StatusIcon } from '@atlassian/pipelines-status-icon';

// DeploymentModal styles
export const Loading = styled.div`
  text-align: center;
  padding: 100px 0 100px;
`;

export const DeploymentChangesWrapper = styled.div`
  padding-top: 26px;
  header h4 {
    font-weight: 500;
  }
`;

export const ChangesTabs = styled.div`
  margin: 0 -8px 0;
  padding: 10px 0;
`;

// CommitLink styles
const mixin = css`
  font-weight: 600;
  font-family: 'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono',
    'Ubuntu Mono', Menlo, Courier, monospace;
  min-width: 64px;
`;

export const Linked = styled.a`
  ${mixin};
`;

export const Unlinked = styled.span`
  color: ${colors.N800};
  ${mixin};
`;

// DeploymentItemCard styles
export const Card = styled.div<{ isTopCard: boolean; isElevated: boolean }>`
  position: absolute;
  top: ${props => (props.isTopCard ? `65px` : `139px`)};
  left: 9px;
  width: 334px;
  padding: 8px 10px;
  height: 50px;
  background: #fff;
  border-radius: 3px;
  align-items: center;
  ${props => (props.isElevated ? AkElevations.e300 : AkElevations.e100)};
`;

export const DeploymentItemCardHeader = styled.header`
  display: flex;
  align-items: center;
`;

export const CommitMessage = styled.div`
  word-break: break-word !important;
  max-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
  max-width: 280px;
  span {
    display: inline-block;
  }
`;

export const DeploymentDateWrapper = styled.div`
  color: ${colors.N200};
  margin-left: 4px;
  margin-top: 3px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
`;

export const DeploymentAvatar = styled.div`
  position: absolute;
  top: 19px;
  right: 13px;
`;

export const StatusLink = styled.a`
  font-size: 16px;
  display: flex;
  align-items: center;
  svg {
    margin: 0 4px 0 0;
    width: 18px;
    height: 18px;
  }
`;

// DeploymentItem styles
export const DeploymentItemWrapper = styled.div<{
  hasEnvironment?: boolean;
  hasTwoCards?: boolean;
}>`
  width: 370px;
  height: ${props => (props.hasTwoCards ? `214px` : `140px`)};
  position: relative;
  ${props => props.hasEnvironment && `background: ${colors.N20}`};
  border-radius: 5px;
`;

export const DeploymentItemHeader = styled.div<{
  iconType?: DeploymentStatusIconType;
}>`
  display: flex;
  position: relative;
  align-items: center;
  height: 58px;
  background: ${colors.N40};
  width: 100%;
  border-radius: 3px 3px 0px 0px;
  box-sizing: border-box;
  padding: 15px 17px;
  transition: 0.3s;
  color: ${props => (props.iconType ? colors.N0 : colors.N90)};
  ${({ iconType }) => iconType === 'success' && `background: ${colors.G300}`};
  ${({ iconType }) => iconType === 'redeploy' && `background: ${colors.G300}`};
  ${({ iconType }) => iconType === 'building' && `background: ${colors.B300}`};
  ${({ iconType }) => iconType === 'stopped' && `background: ${colors.Y300}`};
  ${({ iconType }) => iconType === 'failed' && `background: ${colors.R300}`};
  ${({ iconType }) =>
    iconType === 'failedRedeploy' && `background: ${colors.R300}`};
  ${({ iconType }) =>
    iconType === 'rerun' &&
    `background: ${colors.G300}; 
    path { 
      fill: ${colors.G300};
    }`};
  ${({ iconType }) =>
    !iconType &&
    `
			padding-left: 49px;
			&:after {
				content: '';
				display: block;
				width: 18px;
				height: 18px;
				border: 3px solid ${colors.N90};
				border-radius: 20px;
				position: absolute;
				left: 16px;
			}`};
`;

export const DeploymentItemStatus = styled(StatusIcon as any)`
  height: 24px;
  width: 24px;
  margin-right: 8px;
  color: inherit !important;
  svg {
    width: 24px;
    height: 24px;
    margin: 0;
  }
  &[data-state='icon-pending'] span {
    width: 24px;
    height: 24px;
    color: ${colors.B300};
    background: ${colors.N0};
    border-radius: 12px;
    &:after {
      height: 96px;
      font-size: 16px;
      top: 4px;
      margin-left: 3px;
    }
  }
` as any;

export const Title = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: inherit;
`;

export const ArrowIcon = styled.div`
  position: absolute;
  top: 98px;
  z-index: 1;
  background-image: linear-gradient(
    to right,
    ${colors.N800} 33%,
    transparent 0%
  );
  background-position: bottom;
  background-size: 6px 2px;
  background-repeat: repeat-x;
  width: 266px;
  height: 2px;
  &:after {
    content: '';
    display: block;
    background: ${colors.N800};
    width: 8px;
    height: 8px;
    position: absolute;
    top: -3px;
    left: -1px;
    border-radius: 5px;
  }
  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 10px solid ${colors.N800};
    right: -1px;
    top: -4px;
  }
`;

export const DeploymentArrowFrom = styled(ArrowIcon)`
  left: -80px;
  width: 273px;
  &:after {
    display: none;
  }
`;

export const DeploymentArrowTo = styled(ArrowIcon)`
  left: 183px;
`;

export const EmptyCard = styled.div`
  position: absolute;
  top: 65px;
  left: 8px;
  width: 356px;
  height: 66px;
  border-radius: 3px;
  box-sizing: border-box;
  background: rgba(23, 43, 77, 0.02);
  border: 3px ${colors.N30} solid;
`;

// DeploymentOverview styles
export const DeploymentOverviewWrapper = styled.div`
  justify-content: center;
`;

export const Deployments = styled.div`
  display: flex;
  width: 812px;
  margin-top: 16px;
  justify-content: space-between;
  position: relative;
  margin: auto;
`;

export const FileContent = styled.div`
  border: solid ${colors.N40};
  border-width: 0 1px 1px;
  border-radius: 0 0 ${`${borderRadius()}px`} ${`${borderRadius()}px`};
  box-sizing: border-box;
`;

export const FileHeader = styled.div`
  align-items: center;
  justify-content: space-between;
  background: ${colors.N20};
  border: 1px solid ${colors.N40};
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;
  display: flex;
  min-height: ${gridSize() * 5}px;
  padding: ${gridSize() / 2}px ${gridSize()}px;
  outline: 0;

  &:focus {
    border: 2px solid ${colors.B100};
  }
`;

export const FilePath = styled.div`
  align-self: center;
  margin-left: ${gridSize()}px;
  word-break: break-word;
  cursor: auto;

  span:last-child {
    font-weight: 600;
  }
`;

const chunkSplitFontColor = colors.N100;
const chunkSplitBackgroundColor = colors.N10;
const chunkSplitBorderColor = colors.N30;
const chunkCodeBorderLeftColor = colors.N40;
const lineNumberColor = colors.N90;
const chunkCodeBackgroundColor = colors.N0;
const chunkRemovedCodeBackgroundColor = colors.R50;
const chunkNormalCodeBackgroundColor = colors.G50;
const conflictContentColor = colors.Y50;
const conflictMarkerColor = colors.Y75;

// Executing these ahead to avoid function interpolation inside Emotion CSS
const GRID_SIZE = gridSize();
const CODE_FONT_FAMILY = codeFontFamily();
// Ak Page widths copied from @atlaskit/page because they can't be imported
const defaultGridColumnWidth = GRID_SIZE * 10; // 80
export const fixedGridPageWidth = `${defaultGridColumnWidth * 12}px`; // 960
// 53 degrees allows the repeating gradient to align correctly on each row
const emptyLineBackground = `repeating-linear-gradient(53deg, transparent, transparent 2px, ${chunkSplitBorderColor} 3px, ${chunkSplitBorderColor} 3px,transparent 4px)`;
export const codeLineHeight = GRID_SIZE * 2.5;

export const composeGutterRule = (rule: string) => (gutterWidth: number) =>
  `${rule}: ${gutterWidth}px`;

export const LINE_COLORS = {
  add: chunkNormalCodeBackgroundColor,
  del: chunkRemovedCodeBackgroundColor,
  normal: chunkCodeBackgroundColor,
  empty: emptyLineBackground,
  loaded: chunkSplitBackgroundColor,
};

export const CONFLICT_COLORS = {
  content: conflictContentColor,
  marker: conflictMarkerColor,
};

export const LINE_BEFORE_CONTENT = {
  add: '+',
  del: '-',
  normal: '',
  empty: '',
  loaded: '',
};

export const LineNumbers = styled.div<{ gutterWidth: number }>`
  height: ${codeLineHeight}px;
  font-family: ${CODE_FONT_FAMILY};
  font-size: ${GRID_SIZE * 1.5}px;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  ${props => composeGutterRule('width')(props.gutterWidth)};
  border-right: 1px solid ${chunkCodeBorderLeftColor};
  padding: 0 ${GRID_SIZE}px;
  line-height: ${GRID_SIZE * 2}px;
  background-color: ${chunkSplitBackgroundColor};
  color: ${lineNumberColor};
`;

export const Code = styled.pre<{ type: keyof typeof LINE_BEFORE_CONTENT }>`
  height: ${codeLineHeight}px;
  line-height: ${codeLineHeight}px;
  font-family: ${CODE_FONT_FAMILY};
  font-size: ${GRID_SIZE * 1.5}px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  padding: ${props =>
    LINE_BEFORE_CONTENT[props.type]
      ? `0 ${GRID_SIZE}px`
      : `0 ${GRID_SIZE}px 0 ${GRID_SIZE * 2}px`};

  &::before {
    content: '${props => LINE_BEFORE_CONTENT[props.type]}';
    padding-right: ${GRID_SIZE}px;
  }

  /* Hack to stop post <pre> gap on empty code lines */
  &::after {
    content: '';
    display: inline-block;
  }

  > del,
  > ins {
    text-decoration: none;
    display: inline-block;
    height: ${codeLineHeight}px;
    vertical-align: middle; /* Ensures any empty tags worddiff might leave don't misalign the code */
  }

  > del {
    background-color: ${colors.R100};
  }

  > ins {
    background-color: ${colors.G100};
  }
`;

export const InlineContent = (
  gutterWidth: number,
  conflictType: keyof typeof CONFLICT_COLORS,
  type: keyof typeof LINE_COLORS,
) => {
  const gutterRule = composeGutterRule('left')(gutterWidth);
  return css`
    display: flex;
    background: ${conflictType
      ? CONFLICT_COLORS[conflictType]
      : LINE_COLORS[type]};
    box-sizing: border-box;
    max-width: ${fixedGridPageWidth};
    position: sticky;
    ${gutterRule};

    &::before {
      background-color: ${chunkSplitBackgroundColor};
      border-right: 1px solid ${chunkCodeBorderLeftColor};
      box-sizing: border-box;
      color: ${lineNumberColor};
      content: ' ';
      display: block;
      flex: 0 0 ${`${gutterWidth}px`};
      margin-left: ${`-${gutterWidth}px`};
    }
  `;
};

export const ChunkHeadingWrapper = styled.div<{ gutterWidth: number }>`
  ${props => composeGutterRule('padding-left')(props.gutterWidth)};
  box-sizing: border-box;

  &:hover i {
    opacity: 1;
  }

  max-height: ${codeLineHeight + 4}px;

  &:not(:last-child) {
    border-bottom: 1px solid ${chunkSplitBorderColor};
  }

  &:last-child {
    border-top: 1px solid ${chunkSplitBorderColor};
  }
`;

export const LineWrapper = styled.div<{
  gutterWidth: number;
  conflictType: keyof typeof CONFLICT_COLORS;
  type: keyof typeof LINE_COLORS;
}>`
  ${props => composeGutterRule('padding-left')(props.gutterWidth)};
  box-sizing: border-box;
  background: ${props =>
    props.conflictType
      ? CONFLICT_COLORS[props.conflictType]
      : LINE_COLORS[props.type]};

  &:hover i {
    opacity: 1;
  }
`;

export const DiffWrapper = styled.div`
  display: flex;
  overflow-y: hidden;
  box-sizing: border-box;

  &:not(:last-child) {
    border-right: 1px solid ${chunkCodeBorderLeftColor};
  }

  & + & {
    border-left: none;
  }
`;

export const SingleDiff = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  background-color: ${chunkCodeBackgroundColor};
`;

export const ChunkHeading = styled.div`
  height: ${codeLineHeight}px;
  box-sizing: border-box;
  line-height: ${codeLineHeight}px;
  min-height: ${codeLineHeight}px;
  padding: 0 ${GRID_SIZE}px;
  background-color: ${chunkSplitBackgroundColor};
  color: ${chunkSplitFontColor};
  font-family: ${CODE_FONT_FAMILY};
  font-size: ${GRID_SIZE * 1.5}px;
  white-space: nowrap;
`;

export const LineNumber = styled.div`
  display: inline-block;
  line-height: ${codeLineHeight}px;
  z-index: 1;
`;

export const Chunk = styled.div`
  width: 100%;
  overflow-x: auto;

  /* FF shows vertical scroll even if overflow-x is set. */
  overflow-y: hidden;

  &:not(:last-child) {
    border-bottom: 1px solid ${chunkSplitBorderColor};
  }
`;

export const CodeScrollContainer = styled.div`
  display: inline-block;
  min-width: 100%;
`;

export const ChunksWrapper = styled.div`
  flex-grow: 1;
  width: 0;
`;

export const LoadedLinesWrapper = styled.div`
  &:first-child {
    border-bottom: 1px solid ${chunkCodeBorderLeftColor};
  }

  &:last-child {
    border-top: 1px solid ${chunkCodeBorderLeftColor};
  }
`;

export const FileDiffWrapper = styled.div`
  width: 100%;
  padding: 16px 0;
`;

export const SingleFileDiffWrapper = styled.div`
  margin: 0 0 16px;
`;

export const FileDiffPlaceholder = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IssueFlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const IssuePaddedFlexContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;

  &:last-child {
    height: 24px;
  }
`;

export const IssueWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
`;

export const IssueCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
`;

export const IssueKey = styled.div`
  a {
    outline: none;
    padding-left: 8px;
    color: ${colors.B400};
    font-weight: 500;
    font-size: 14px;
    min-width: 50px;
    white-space: nowrap;

    &:hover,
    &:active,
    &:visited,
    &:link {
      outline: none;
      color: ${colors.B400};
    }
  }
`;

export const IssueSummary = styled.div`
  padding-left: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const IssuesEmptyWrapper = styled.div`
  width: 100%;
  padding: 50px 0px 0 0;
  text-align: center;
`;

export const AsyncIconPlaceholder = styled.span`
  height: ${({ height }: { height: string; width: string }) => height};
  width: ${({ width }: { height: string; width: string }) => width};
  background-color: ${colors.N30};
  border-radius: 3px;
  display: flex;
`;

export const AsyncIconImage = styled.img`
  overflow: hidden;
`;

export const CommitDiffWrapper = styled.table`
  width: 100%;
  &:first-child {
    margin-top: 8px;
  }
  tbody,
  tfoot {
    border-bottom-width: 0;
  }
  tfoot td {
    text-align: center;
  }
`;

export const CommitDiffRow = styled.tr`
  width: 100%;
  td {
    padding: 8px;
    &:first-child {
      padding-left: 0;
      padding-right: 0;
      width: 28px;
    }
    &:nth-child(2) {
      width: 63px;
      padding-right: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
`;

export const CommitDiffAuthorCell = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 28px;
  height: 28px;
`;

export const CommitDiffMessageCell = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
`;

export const CommitDiffDateCell = styled.div`
  white-space: nowrap;
`;

export const PullRequestWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
`;

export const PullRequestRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

export const PullRequestAuthor = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 8px;
`;

export const PullRequestDescription = styled.div`
  flex: 1 0 auto;
  max-width: calc(100% - 160px);
`;

export const PullRequestTitle = styled.div`
  display: flex;
  a {
    color: ${colors.N800};
    display: block;
    max-width: 50%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  align-items: baseline;
`;

export const PullRequestTargets = styled.div`
  color: ${colors.N300};
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

export const PullRequestState = styled.div`
  margin-left: 8px;
  flex: 1 0 auto;
  text-align: right;
`;
