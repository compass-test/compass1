import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import {
  borderRadius,
  colors,
  fontSize,
  gridSize,
  layers,
} from '@atlaskit/theme';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: calc(100vh - 300px);
  min-height: 500px;
`;

export const SidebarWrapper = styled.div<{
  isCollapsed: boolean;
}>`
  position: relative;
  display: flex;
  padding: ${gridSize() * 2}px ${gridSize()}px;
  min-width: ${({ isCollapsed }) =>
    isCollapsed ? `${gridSize() * 4}px` : '450px'};
  width: ${({ isCollapsed }) =>
    isCollapsed ? `${gridSize() * 4}px` : '450px'};
  background: ${colors.N20};
  border-left: 1px ${colors.N40} solid;
`;

export const Panel = styled.section`
  background-color: ${colors.N0};
  border-radius: ${borderRadius()}px;
  text-align: left;
  width: 100%;
  margin: 0 0 ${gridSize() * 1.5}px;
`;

export const PanelHeading = styled.button<{
  isCollapsed: boolean;
  isExpandable: boolean;
}>`
  align-items: center;
  background-color: ${colors.N0};
  border: 0 none transparent;
  border-radius: ${({ isCollapsed }) =>
    isCollapsed
      ? `${borderRadius()}px`
      : `${borderRadius()}px ${borderRadius()}px 0 0`};
  box-sizing: border-box;
  color: inherit; /* needed to prevent Safari setting to "activebuttontext" (white) */
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  min-height: ${gridSize() * 5}px;
  padding: ${gridSize()}px;
  text-align: left;
  font-size: ${fontSize()}px;
  width: 100%;
  outline: none;
  line-height: inherit;
  z-index: 1;
  position: relative;

  &:hover {
    box-shadow: ${({ isCollapsed, isExpandable }) =>
      isExpandable && isCollapsed ? `0 0 0 1px ${colors.B200}` : 'none'};
  }

  &:focus,
  &:active {
    box-shadow: ${({ isExpandable }) =>
      isExpandable ? `0 0 0 1px ${colors.B200}` : 'none'};
  }
`;

export const PanelHeadingLabel = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Icon = styled.span`
  display: flex;
  margin-right: 4px;
`;
export const Chevron = styled.span`
  display: flex;
  margin-left: auto;
`;

type PanelBodyProps = {
  isOverflowVisible?: boolean;
};

export const PanelBody = styled.div`
  border-radius: 0 0 ${borderRadius()}px ${borderRadius()}px;
  flex-flow: column;
  overflow: ${({ isOverflowVisible }: PanelBodyProps) =>
    isOverflowVisible ? 'visible' : 'hidden'};
  padding: ${gridSize()}px;
  background-color: ${colors.N0};
  margin-left: ${gridSize()}px;
`;

export const ConfigureTabWrapper = styled.div`
  width: 100%;
  border-radius: 0 0 ${borderRadius()}px ${borderRadius()}px;
  overflow: auto;
  padding: 1px 1px 3px 1px;
  margin-top: ${gridSize() * 2}px;
`;

export const TemplateListWrapper = styled.div`
  position: relative;
  z-index: 500;
  p {
    font-size: 11px;
    margin-bottom: ${gridSize() * 2}px;
  }
`;

export const PipeListWrapper = styled.div``;

export const DeploymentStepCopyWrapper = styled.div`
  padding-top: ${gridSize()}px;
  p {
    font-size: 11px;
  }
  code {
    font-size: 11px;
  }
  h4 {
    font-size: 12px;
  }
`;

export const PipeItem = styled.div`
  margin-top: 2px;
  border-radius: 5px;
  display: flex;

  h4 {
    font-size: 14px;
  }

  :hover {
    background-color: ${colors.N20};
  }
`;

export const CopyTextIconContainer = styled.div`
  border-radius: 3px;
  width: ${gridSize() * 3}px;
  height: ${gridSize() * 3}px;
  margin-top: ${gridSize() * 1.5}px;
  background-color: ${colors.N30};
  cursor: pointer;
`;

export const CopyTextIcon = styled.div`
  padding-top: ${gridSize() * 0.5}px;
  padding-left: ${gridSize() * 0.5}px;
`;

export const PipeText = styled.div`
  cursor: pointer;
  max-width: ${gridSize() * 40}px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const PipeTitle = styled.div`
  justify-content: space-between;
  align-items: center;
`;

export const PipeDescription = styled.div`
  color: ${colors.N100};
  justify-content: space-between;
  align-items: center;
  min-width: 0px;
  font-size: 12px;
  margin-top: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const PipeIcon = styled.div`
  margin: 7px;
  height: 34px;
  width: 34px;
  min-width: 34px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 5px;

  img {
    height: 34px;
    width: 34px;
  }
`;

export const PipeDetailWrapper = styled.div`
  margin: 20px 0 0 10px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  min-height: calc(90vh - 137px);
  max-height: calc(90vh - 137px);
`;

export const PipeDetailHeader = styled.div`
  display: flex;
  flex: 0 0 auto;
`;

export const PipeDetailHeading = styled.div`
  margin: auto 0;
  h2 {
    margin-bottom: 8px;
  }
`;

export const PipeDetailInfo = styled.div`
  display: flex;
  margin: 10px 0 0 -8px;
  min-height: 0px;
`;

export const PipeDetailIcon = styled.div`
  margin-right: 20px;
  width: 80px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 5px;

  img {
    width: 80px;
    height: 80px;
  }
`;

export const PipeDetailStepIcon = styled.div`
  margin-right: 20px;
  width: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 5px;
`;

export const PipeDetailMaintainer = styled.span`
  margin-left: 5px;
`;

export const CopyableCodeWrapper = styled.div`
  margin: 10px 0;
  position: relative;

  button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
  }
`;

export const PipeSearchWrapper = styled.div`
  display: flex;
  margin: 0 0 16px;
  form {
    width: 100%;
  }
  input {
    background: transparent;
    border: 0;
    outline: none;
    font-size: 14px;
    width: 100%;

    ::placeholder {
      color: ${colors.DN300};
      opacity: 1;
    }
  }
`;

export const PipeSearchIcon = styled.div`
  color: ${colors.N400};
  height: 24px;
  margin-right: 2px;
`;

export const ExplorePipesButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

export const DiscoverPipesWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
`;

export const DiscoverPipesSidebar = styled.div`
  width: 250px;
  flex: 0 0 auto;
  margin: 6px 10px 0 0;
  overflow: auto;
`;

export const DiscoverPipesSearchWrapper = styled.div`
  margin: 0 0 8px 6px;
`;

export const DiscoverPipesCategories = styled.ul`
  list-style: none;
  margin: 0 10px;
  padding: 0;
`;

export const DiscoverPipesCategoryLink = styled.a`
  display: block;
  line-height: 20px;
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ isActive }: { isActive?: boolean; isCustom?: boolean }) =>
    isActive &&
    `
		background-color: ${colors.N20};
		font-weight: bold;
		color: ${colors.N800}
		&:hover {
			text-decoration: none;
			color: ${colors.N800}
		}
	`};
  ${({ isCustom }) =>
    isCustom &&
    `
		font-weight: bold;
	`};
`;

export const DiscoverPipesListWrapper = styled.div`
  min-width: 600px;
  width: 100%;
  height: 100%;
`;

export const DiscoverPipesList = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
`;

export const DiscoverPipesSuggestPipeWrapper = styled.li`
  border-top: 2px ${colors.N20} solid;
  margin-top: 8px;
  padding-top: 8px;
  a {
    display: block;
    line-height: 20px;
    padding: 8px;
  }
`;

export const DiscoverPipesPromoMessage = styled.div`
  background: ${colors.P50};
  padding: 16px 0 16px 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  margin: 0 14px 10px 6px;
  line-height: 24px;
  flex-wrap: wrap;
  button {
    margin: 0 4px;
  }
  a {
    margin-left: 4px;
  }
`;

export const DiscoverPipesPromoText = styled.div`
  &:first-of-type {
    margin: 0 8px;
  }
  display: flex;
  align-items: center;
`;

export const PipeEmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const PipeEmptyMessage = styled.div`
  text-align: center;
  margin-bottom: 40px;

  p {
    margin: 24px 0;
  }

  ${({ hasSmallIcon }: { hasSmallIcon?: boolean }) =>
    hasSmallIcon &&
    `
  	svg {
		transform: scale(0.5);
		margin: -30px 0;
	}`}
`;

export const SuggestPipeWrapper = styled.div``;

export const SuggestPipeHeader = styled.header`
  height: 40px;
  padding: 20px 0 0;
`;

export const SuggestPipeInlineWrapper = styled.div`
  display: flex;
  button {
    margin-left: 8px;
  }
`;

export const PipeCardCopyButton = styled.div`
  display: flex;
  flex: 0 0 auto;

  button {
    visibility: hidden;
  }
`;

export const PipeCardWrapper = styled.div`
  width: calc(50% - 44px);
  height: 160px;
  border: 1px ${colors.N30} solid;
  margin: 6px 10px 10px 6px;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  transition: box-shadow 0.25s ease-in-out;
  position: relative;

  &:hover {
    box-shadow: 0 3px 6px rgba(9, 30, 66, 0.08);

    button {
      visibility: visible;
    }
  }
`;

export const PipeCardIcon = styled.div`
  margin-right: 8px;
  width: 32px;

  img {
    width: 32px;
    height: 32px;
  }
`;

export const PipeCardHeader = styled.header`
  margin: auto 0;
  display: flex;
  flex-wrap: wrap;
  height: 36spx;
`;

export const PipeCardTitle = styled.div`
  flex: 1;
  h5 {
    padding: 2px 0 0;
  }
`;

export const PipeCardVersion = styled.span`
  display: block;
  font-size: 12px;
  color: ${colors.N100};
  width: 100%;
  margin-top: 2px;
`;

export const PipeCardDescription = styled.p`
  overflow: hidden;
  @supports (-webkit-line-clamp: 3) {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
  }
`;

export const PipeCardTags = styled.ul`
  overflow: hidden;
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  bottom: 0;
  position: absolute;
  flex-wrap: wrap;
  max-height: 54px;
`;

export const PipeCardTagItem = styled.li`
  margin: 0 8px 8px 0;
`;

export const StepTabsContent = styled.div`
  width: 100%;
`;

export const StepTabsDescription = styled.div`
  margin: 20px 0;
`;

export const PipeTabsContent = styled.div`
  width: 100%;
  padding: 20px 0;
  overflow: scroll;
  overflow-x: hidden;
`;

export const PipeTabsText = styled.div`
  /* style inline code */
  code {
    max-width: 100%;
    padding: 2px 4px;
    word-break: break-all;
    background: ${colors.N20};
    border-radius: 3px;
    font-size: 12px;
    overflow-x: auto;
  }

  img {
    max-width: 100%;
  }
`;

export const DocumentationWrapper = styled.div`
  padding-top: ${gridSize()}px;
  h4 {
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
  }
  p {
    font-size: 11px;
    line-height: 14px;
  }
`;

export const DocumentationLinks = styled.div`
  margin-left: -${gridSize() * 1.5}px;
  font-size: 11px;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${gridSize() * 2}px 0 0;
  p {
    max-width: 300px;
  }
`;

export const SectionTitleHeader = styled.h4`
  color: ${colors.N500};
  font-weight: 700;
  line-height: 21px;
  padding-right: 6px;
  font-size: 12px;
`;

export const SectionTitleMessage = styled.div`
  flex: 1 1 auto;
  position: relative;
`;

export const VariablesHeader = styled.div`
  font-size: 12px;
`;

export const EnvironmentName = styled.h5`
  color: ${colors.N500};
  font-weight: 500;
  font-size: 12px;
  padding: 16px 0 0;
  margin: 0;
`;

const TRANSITION_DURATION_BASE = 0.2;
const TRANSITION_DURATION = `${TRANSITION_DURATION_BASE}s`;

export const CollapsedIcon = styled.span<{
  isSelected: boolean;
}>`
  display: flex;
  padding: ${gridSize() * 0.5}px;
  margin-top: ${gridSize() * 0.25}px;
  margin-bottom: ${gridSize() * 0.5}px;
  border-radius: ${borderRadius()}px;
  background-color: ${({ isSelected }) => (isSelected ? colors.N40 : '')};
  cursor: pointer;
  :hover {
    background-color: ${colors.N40};
  }
`;

export const CollapsedSidebarWrapper = styled.div`
  margin-left: -${gridSize() * 0.25}px;
`;

export const CollapsedSidebar = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  left: ${gridSize() * 20}px;
`;

export const SidebarContainer = styled.section`
  overflow: hidden;
  width: 100%;
`;

export const Sidebar = styled.div`
  display: flex;
  min-width: 64px;
  height: 100%;
  width: 100%;
  background-color: ${colors.N20};
  transition: all ${TRANSITION_DURATION} ease-out;
  outline: none;
`;

// The z-index here is set to 100 to be greater
// than the number of cards in the sidebar.
// see: src/components/sidebar/src/utils/wrap-child.js
export const SidebarControls = styled.div`
  position: absolute;
  left: -${gridSize()}px;
  top: 0;
  height: 100%;
  width: 12px;
  user-select: none;
  z-index: ${layers.card()};
`;

export const Divider = styled.div`
  height: 3px;
  background-color: ${colors.N40};
  width: ${gridSize() * 2}px;
  margin-top: ${gridSize()}px;
  margin-bottom: ${gridSize()}px;
  margin-left: auto;
  margin-right: auto;
`;

/* stylelint-disable a11y/media-prefers-reduced-motion */
export const Arrow = styled.button<{ isCollapsed: boolean }>`
  background: none;
  border: none;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: ${gridSize() * 2}px;
  left: -${gridSize() * 1.5}px;
  padding-right: ${gridSize()}px;
  cursor: pointer;

  &::-moz-focus-inner {
    border: 0;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${colors.B100};
    outline: none;
  }

  /* In order to get rid of explicit definition of
   classnames ::before and ::after pseudo elements are used. */
  &::before,
  &::after {
    content: '';
    display: block;
    position: relative;
    margin-right: 0;
    margin-left: auto;
    width: 2px;
    height: 8px;
    background-color: ${colors.B200};
    border-radius: 5px;
    transition: all 0.15s ease-out;
    transform: rotate(0deg);
  }

  &::before {
    top: 2px;
    transform-origin: 1px 6px;
  }

  &::after {
    top: 0;
    transform-origin: 1px 2px;
  }

  &:hover,
  &:focus {
    opacity: 100;

    &::before {
      /* prettier-ignore */
      transform:
        rotate(
          ${({ isCollapsed }) =>
        isCollapsed ? '45deg' : '-45deg'}
        );
    }

    &::after {
      /* prettier-ignore */
      transform:
        rotate(
          ${({ isCollapsed }) =>
        isCollapsed ? '-45deg' : '45deg'}
        );
    }
  }

  /* stylelint-disable selector-type-no-unknown, a11y/selector-pseudo-class-focus */
  ${SidebarControls}:hover & {
    opacity: 1;
    transition: all ${TRANSITION_DURATION} ease-out;
  }
  /* stylelint-enable */
`;
/* stylelint-enable */

export const SplitBar = styled.div<{ isCollapsed: boolean }>`
  height: 100%;
  width: 100%;
  cursor: ${({ isCollapsed }) => (isCollapsed ? `w-resize` : 'e-resize')};
  position: absolute;

  &::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 0;
    display: table;
    width: 2px;
    height: 100%;
  }

  &:hover::after,
  &:focus::after {
    background-color: ${colors.B200};
  }

  &:active::after {
    background-color: ${colors.B200};
  }
`;
