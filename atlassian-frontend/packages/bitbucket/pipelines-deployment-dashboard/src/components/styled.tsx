import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import * as elevation from '@atlaskit/theme/elevation';
import StatusIcon from '@atlassian/pipelines-status-icon';

import { CardTransition } from '../const';

export const Wrapper = styled.div`
  margin: 0px -${gridSize() * 2.5}px 0px ${gridSize() * 5}px;
  display: flex;
  min-width: 330px;
  @media (max-width: 600px) {
    margin: 0 0 0 0;
    padding-right: 20px;
  }
`;

export const Loading = styled.div`
  position: relative;
  width: 100%;
  padding: ${gridSize() * 3} 0;
  text-align: center;
`;

export const Dashboard = styled.div<{ state: string }>`
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
  padding-right: 60px;
  transition: width 250ms ease-in-out;
  ${({ state }) =>
    (({
      entering: `width: 100%`,
      entered: `width: calc(100% - 440px)`,
    } as any)[state])};
  @media (max-width: 600px) {
    padding-right: 0;
    ${({ state }) =>
      (({
        entering: `width: 100%`,
        entered: `width: 100%; display: none;`,
      } as any)[state])};
  }
  @media (min-width: 1400px) {
    ${({ state }) =>
      (({
        entering: `width: 100%`,
        entered: `width: calc(100% - 600px)`,
      } as any)[state])};
  }
`;

export const History = styled.div<{ state: string }>`
  margin-top: -94px;
  margin-bottom: -20px;
  transition: transform 250ms ease-in-out;
  transform: translateX(0);
  height: 100vh;
  min-height: 100vh;
  background-color: ${colors.N20};
  position: fixed;
  right: 0;
  width: 400px;
  margin-right: -400px;

  ${({ state }) =>
    (({
      entering: `transform: translateX(0)`,
      entered: `transform: translateX(-400px)`,
    } as any)[state])};
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    display: none;
    ${({ state }) =>
      (({
        entering: `display: none; transform: translateX(0);`,
        entered: `display: block; transform: translateX(0);`,
      } as any)[state])}
  }
  @media (min-width: 1400px) {
    width: 600px;
    margin-right: -600px;
    ${({ state }) =>
      (({
        entering: `transform: translateX(0)`,
        entered: `transform: translateX(-600px)`,
      } as any)[state])}
  }
`;

export const SettingsButton = styled.div`
  float: right;
  margin-top: -70px;
  margin-right: 16px;
`;

export const HistoryWrapper = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
`;

export const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: space-between;
  box-sizing: border-box;
  padding: 8px 8px 8px 16px;
  margin: -8px 0 8px;
`;

export const EnvironmentName = styled.div`
  box-sizing: border-box;
  color: #172b4d;
  font-size: 22px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 3px;
  padding-top: 20px;
`;

export const HistoryTitle = styled.div`
  box-sizing: border-box;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 3px;
  margin-bottom: 8px;
`;

export const HistoryList = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  height: calc(100vh - 130px);
  padding: 2px 2px 15px;
  & > div {
    height: auto;
    position: relative;
  }
`;

export const HistoryLoading = styled.div`
  position: relative;
  width: 100%;
  padding: 24px 0;
  text-align: center;
`;

export const HistoryCloseButton = styled.div`
  margin-left: auto;
`;

export const HistoryShowMoreButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const slideUp = keyframes`
	0% { transform: translateY(105px); }
	80% { transform: translateY(-15px); }
	100% { transform: translateY(0px); }
`;

const slideDown = keyframes`
	0% { transform: translateY(0); pointer-events: none; }
	20% { transform: translateY(-15px); pointer-events: none; }
	100% { transform: translateY(105px); pointer-events: none; }
`;

const slideOut = keyframes`
	0% { transform: translateY(0px); }
	20% { transform: translateY(15px); }
	100% { transform: translateY(-42px); height: calc(100% - 16px); }
`;

const fadeIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;

export const CardWrapper = styled.div<{
  isOverlayCard: boolean;
  transition: CardTransition;
}>`
  margin: 8px;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 8px;
  min-height: 120px;
  transition: 0.3s;
  transform: translate3d(0, 0, 0);
  position: absolute;
  width: calc(100% - 16px);

  ${({ isOverlayCard, transition }) =>
    isOverlayCard && transition !== CardTransition.SwapCards
      ? `box-shadow: 0 -2px 8px -2px rgba(9,30,66,0.25), 0 0 1px rgba(9,30,66,0.31);`
      : elevation.e100};
  ${({ isOverlayCard }) =>
    isOverlayCard
      ? `height: calc(100% - 58px); min-height: 50px; top: 42px`
      : `top: 0; height: calc(100% - 16px);`};
  ${({
    isOverlayCard,
    transition,
  }: {
    isOverlayCard: boolean;
    transition: string;
  }) =>
    isOverlayCard &&
    ({
      [CardTransition.None]: css`
        animation: ${slideUp} 500ms ease-in-out 1 forwards;
      `,
      [CardTransition.ShowOverlayCard]: css`
        animation: ${slideUp} 500ms ease-in-out 1 forwards;
      `,
      [CardTransition.HideOverlayCard]: css`
        animation: ${slideDown} 500ms ease-in-out 1 forwards;
      `,
      [CardTransition.SwapCards]: css`
        animation: ${slideOut} 500ms ease-in-out 1 forwards;
      `,
    } as any)[transition]};

  &:hover {
    background-color: ${colors.N30};
    cursor: pointer;
  }
`;

export const Status = styled.div`
  display: flex;
  text-indent: 0;
  padding: 3px 4px 3px 3px;
  svg {
    margin: 0;
    width: 18px;
    height: 18px;
  }
`;

export const BuildNumber = styled.h5`
  position: absolute;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  top: 8px;
  display: flex;
  align-items: center;
  text-indent: 4px;
  cursor: pointer;
`;

export const PipelineLink = styled.a`
  &,
  &:hover {
    color: ${colors.N800};
  }
`;

export const DisabledPipeline = styled.span`
  color: ${colors.N70};
`;

export const CommitMessage = styled.div<{
  shouldTransition: boolean;
  clamp: number;
}>`
  margin-top: 32px;
  word-break: break-word !important;

  ${({ shouldTransition }: { shouldTransition: boolean; clamp: number }) =>
    shouldTransition &&
    css`
      animation: ${fadeIn} 500ms ease-in-out 1 forwards;
    `};

  max-height: ${({ clamp }) => `${clamp * 20}px`};
  overflow: hidden;
  text-overflow: ellipsis;

  @supports (-webkit-line-clamp: 3) {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: ${({ clamp }) => clamp};
  }

  span {
    display: inline-block;
  }
`;

// export const StyledDeploymentDate = styled(DeploymentDate)`
export const StyledDeploymentDate = styled.div`
  position: absolute;
  bottom: 8px;
  text-transform: uppercase;
  color: ${colors.N200};
`;

export const DeployerAvatar = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
`;

export const CardActionsWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`;

export const CommitLink = styled.span`
  font-weight: 600;
  font-family: 'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono',
    'Ubuntu Mono', Menlo, Courier, monospace;
  min-width: 64px;
  color: ${colors.N800};
`;

export const ItemWrapper = styled.div`
  margin-bottom: 18px;
`;

const getStateColor = (color: string, hoverColor: string) => `
	background: ${color};
	&:hover { 
		background: ${hoverColor}; 
		& > span {
			display: inline-block;
		}
	}
`;

export const EnvironmentHeaderWrapper = styled.div`
  ${({ isSelected }: { isSelected: boolean }) =>
    isSelected &&
    `
			box-sizing: border-box;
			border: 3px solid #4c9aff;
			border-radius: 7px;
			margin: -3px;
		`};
`;

export const EnvironmentHeaderEmptyState = styled.div``;

export const EnvironmentHeaderTitle = styled.div<{
  state?: any;
  isSelected?: boolean;
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
  cursor: ${({ state }: { state?: any; isSelected?: boolean }) =>
    state ? 'pointer' : 'default'};
  color: ${({ state, isSelected }) =>
    state ? (isSelected ? colors.N800 : colors.N0) : colors.N90};
  ${({ state, isSelected }) =>
    !isSelected &&
    state === 'success' &&
    getStateColor(colors.G300, colors.G400)};
  ${({ state, isSelected }) =>
    !isSelected &&
    state === 'redeploy' &&
    getStateColor(colors.G300, colors.G400)};
  ${({ state, isSelected }) =>
    !isSelected &&
    state === 'building' &&
    getStateColor(colors.B300, colors.B400)};
  ${({ state, isSelected }) =>
    !isSelected &&
    state === 'stopped' &&
    getStateColor(colors.Y300, colors.Y400)};
  ${({ state, isSelected }) =>
    !isSelected &&
    state === 'failed' &&
    getStateColor(colors.R300, colors.R400)};
  ${({ state, isSelected }) =>
    !isSelected &&
    state === 'failedRedeploy' &&
    getStateColor(colors.R300, colors.R400)};
  ${({ isSelected }) => isSelected && getStateColor(colors.B50, colors.B75)};
  ${({ state }) =>
    !state &&
    ` 
			padding-left: 49px;
			&:after {
				content: '';
				display: block;
				width: 18px;
				height: 18px
				border: 3px solid ${colors.N90};
				border-radius: 20px;
				position: absolute;
				left: 16px;
			}`};
`;

export const EnvrionmentHeaderStatus = styled(StatusIcon as any)`
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

export const EnvironmentHeaderName = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: inherit;
`;

export const EnvironmentHeaderIcon = styled.span`
  flex: 1 0 auto;
  text-align: right;
  opacity: 0.5;
  margin-right: -6px;
  display: none;
`;

const fadeOut = keyframes`
	from { opacity: 1; }
	to { opacity: 0.5; transform: scale(0.97); }
`;

export const EnvironmentHeaderCardWrapper = styled.div<{
  transition?: CardTransition;
  isSelected?: boolean;
}>`
  height: 160px;
  width: 100%;
  background: ${colors.N20};
  border-radius: 0px 0px 5px 5px;
  box-sizing: border-box;
  transition: 0.3s;
  position: relative;
  display: flex;
  overflow: ${({
    transition,
  }: {
    transition?: CardTransition;
    isSelected?: boolean;
  }) => (transition === CardTransition.SwapCards ? 'visible' : 'hidden')};
  & > div:first-child {
    ${({ transition }) =>
      transition === CardTransition.SwapCards &&
      css`
        animation: ${fadeOut} 500ms ease-in-out 1 forwards;
      `};
  }
  ${({ isSelected }) => isSelected && `background: ${colors.B50}`};
`;

export const EnvironmentHeaderEmptyMessage = styled.h5`
  color: ${colors.N90};
  font-size: 11px;
  align-self: center;
  text-align: center;
  width: 100%;
  user-select: none;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: block;
`;
